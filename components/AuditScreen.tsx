
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Bot, X, ShieldAlert, ShieldCheck, Send, Paperclip, Image as ImageIcon, Trash2, Loader2, Key } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

// Definice rozhraní pro globální objekt aistudio podle pravidel
// Fix: Use AIStudio interface name to match existing global definitions and avoid type mismatch errors.
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    aistudio: AIStudio;
  }
}

interface Props {
  onBack: () => void;
}

interface AuditItem {
  id: string;
  label: string;
  aiPrompt: string;
}

interface AuditSection {
  title: string;
  items: AuditItem[];
}

const AUDIT_DATA: AuditSection[] = [
  {
    title: "Sekce 1: Počítač (Windows/macOS)",
    items: [
      { id: "pc_updates", label: "Automatické aktualizace jsou zapnuté", aiPrompt: "Nastavení automatických aktualizací systému." },
      { id: "pc_firewall", label: "Firewall je aktivní", aiPrompt: "Kontrola a zapnutí Firewallu." },
      { id: "pc_antivir", label: "Antivir/Windows Defender je zapnutý", aiPrompt: "Ověření funkčnosti antiviru." },
      { id: "pc_encryption", label: "Šifrování disku je aktivní (BitLocker/FileVault)", aiPrompt: "Nastavení šifrování disku (BitLocker/FileVault)." },
      { id: "pc_user_account", label: "Používám standardní účet pro každodenní práci", aiPrompt: "Nastavení standardního uživatelského účtu." },
      { id: "pc_startup", label: "Kontroloval jsem spouštěné aplikace při startu", aiPrompt: "Správa aplikací po spuštění." },
    ]
  },
  {
    title: "Sekce 2: Telefon (Android/iPhone)",
    items: [
      { id: "mob_biometrics", label: "Biometrická ochrana je zapnutá (otisk/Face ID)", aiPrompt: "Nastavení biometrie (Face ID/Touch ID)." },
      { id: "mob_updates", label: "Automatické aktualizace jsou povolené", aiPrompt: "Nastavení aktualizací iOS/Android." },
      { id: "mob_findmy", label: "Find My Device/iPhone je aktivní", aiPrompt: "Aktivace služby Najít zařízení." },
      { id: "mob_permissions", label: "Zkontroloval jsem oprávnění aplikací", aiPrompt: "Kontrola oprávnění aplikací." },
      { id: "mob_backup", label: "Mám nastavené automatické zálohy", aiPrompt: "Nastavení cloudu a záloh." },
    ]
  },
  {
    title: "Sekce 3: Domácí síť",
    items: [
      { id: "net_password", label: "Změnil jsem výchozí heslo routeru", aiPrompt: "Změna administrátorského hesla routeru." },
      { id: "net_wpa", label: "Wi-Fi používá WPA2 nebo WPA3 šifrování", aiPrompt: "Nastavení šifrování WPA2/WPA3." },
      { id: "net_wifi_pass", label: "Wi-Fi heslo má minimálně 16 znaků", aiPrompt: "Nastavení silného hesla k Wi-Fi." },
      { id: "net_wps", label: "WPS je vypnutý", aiPrompt: "Vypnutí funkce WPS." },
      { id: "net_firmware", label: "Firmware routeru je aktuální", aiPrompt: "Aktualizace firmware routeru." },
      { id: "net_guest", label: "Mám nastavenou Guest network", aiPrompt: "Nastavení sítě pro hosty." },
    ]
  },
  {
    title: "Sekce 4: Zálohy",
    items: [
      { id: "back_local", label: "Mám lokální zálohu na externím disku", aiPrompt: "Vytvoření lokální zálohy dat." },
      { id: "back_cloud", label: "Mám cloudovou zálohu důležitých dat", aiPrompt: "Výběr a nastavení cloudové zálohy." },
      { id: "back_auto", label: "Zálohy jsou automatické (ne manuální)", aiPrompt: "Automatizace zálohování." },
      { id: "back_test", label: "Testoval jsem obnovení ze zálohy", aiPrompt: "Postup obnovy dat ze zálohy." },
    ]
  }
];

interface Message {
  role: 'user' | 'model';
  text: string;
  images?: string[];
}

interface Attachment {
  file: File;
  preview: string;
}

interface Part {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

const AuditScreen: React.FC<Props> = ({ onBack }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showChat, setShowChat] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [activeItem, setActiveItem] = useState<AuditItem | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const totalItems = AUDIT_DATA.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalItems) * 100);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, showChat, loading]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenKeySelection = async () => {
    try {
      await window.aistudio.openSelectKey();
      if (activeItem) {
        setNeedsApiKey(false);
        initChat(activeItem);
      }
    } catch (err) {
      console.error("Key selection failed", err);
    }
  };

  const fileToGenerativePart = async (file: File): Promise<Part> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const initChat = async (item: AuditItem) => {
    setActiveItem(item);
    setChatTitle(item.label);
    setChatHistory([]);
    setAttachments([]);
    setInputMessage("");
    setShowChat(true);
    setLoading(true);
    setNeedsApiKey(false);

    // Kontrola, zda máme klíč
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      setNeedsApiKey(true);
      setLoading(false);
      return;
    }

    try {
      // Create a fresh GoogleGenAI instance for the chat session
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        Jsi trpělivý bezpečnostní průvodce (AI agent). Tvým úkolem je provést uživatele nastavením bodu: "${item.label}".
        PŘÍSNÁ PRAVIDLA KOMUNIKACE:
        1. NEGENERUJ CELÝ NÁVOD NAJEDNOU. Postupuj krok za krokem.
        2. KROK 1: Pozdrav uživatele a zeptej se na zařízení/OS (např. "Máte Windows nebo Mac?").
        3. KROK 2: Jakmile znáš kontext, napiš PRVNÍ krok.
        4. Čekej na potvrzení uživatele, než napíšeš další.
        5. Analyzuj screenshoty, pokud je uživatel pošle.
        6. Buď stručný a nápomocný.
      `;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemInstruction,
        }
      });

      chatSessionRef.current = chat;
      const result = await chat.sendMessage({ message: "Jsem připraven. Pozdrav mě a zeptej se na potřebné informace pro tento úkol." });
      
      if (result.text) {
          setChatHistory([{ role: 'model', text: result.text }]);
      }
    } catch (error: any) {
      console.error("AI Init Error:", error);
      if (error.message?.includes("Requested entity was not found") || error.message?.includes("API key")) {
        setNeedsApiKey(true);
      } else {
        setChatHistory([{ role: 'model', text: "Omlouvám se, ale spojení s AI expertem selhalo. Zkontrolujte prosím své internetové připojení a zkuste to znovu." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputMessage.trim() && attachments.length === 0) || loading || !chatSessionRef.current) return;

    const currentMessage = inputMessage;
    const currentAttachments = [...attachments];
    
    setChatHistory(prev => [...prev, {
      role: 'user',
      text: currentMessage,
      images: currentAttachments.map(a => a.preview)
    }]);
    
    setInputMessage("");
    setAttachments([]);
    setLoading(true);

    try {
      const parts: Part[] = [];
      if (currentMessage.trim()) parts.push({ text: currentMessage });
      for (const att of currentAttachments) {
        parts.push(await fileToGenerativePart(att.file));
      }
      
      const result = await chatSessionRef.current.sendMessage({ message: parts });
      if (result.text) {
        setChatHistory(prev => [...prev, { role: 'model', text: result.text }]);
      }
    } catch (error: any) {
      console.error("Send Error:", error);
      if (error.message?.includes("Requested entity was not found")) {
        setNeedsApiKey(true);
      } else {
        setChatHistory(prev => [...prev, { role: 'model', text: "Došlo k chybě při odesílání zprávy. Zkuste to prosím znovu." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validFiles = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
      setAttachments(prev => [...prev, ...validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 relative z-10 min-h-screen pb-24">
      <div className="mb-6 md:mb-8 animate-fade-in-up">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2 md:gap-3 text-xs font-bold tracking-widest uppercase group mb-6 font-mono"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Zpět</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
                <h1 className="text-2xl md:text-4xl font-display text-white mb-2 uppercase">
                    Audit <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">zabezpečení</span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm">
                    Proveďte kompletní kontrolu. Zaškrtněte splněné body.
                </p>
            </div>
            
            <div className="flex items-center justify-between md:block md:text-right">
                <span className="text-sm font-mono text-gray-500 md:hidden">CELKEM HOTOVO</span>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                    {percentage}%
                </div>
                <div className="w-full md:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ${percentage < 80 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>

        <div className={`p-4 rounded-xl border ${percentage < 80 ? 'bg-rose-950/30 border-rose-500/30 text-rose-200' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'} transition-colors duration-500 flex flex-col md:flex-row items-start gap-3`}>
            {percentage < 80 ? <ShieldAlert className="w-6 h-6 flex-shrink-0 mt-0.5" /> : <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />}
            <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1 font-display">
                    {percentage < 80 ? "Kritické bezpečnostní mezery" : "Výborná úroveň zabezpečení"}
                </h3>
                <p className="text-xs md:text-sm opacity-90 leading-relaxed">
                    {percentage < 80 
                        ? "Máte kritické mezery. Začněte s nejdůležitějšími body: aktualizace, šifrování a zálohy."
                        : "Skvělá práce! Vaše zařízení jsou dobře chráněna. Nezapomínejte na pravidelné kontroly."}
                </p>
            </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {AUDIT_DATA.map((section, sIndex) => (
            <div key={sIndex} className="bg-[#0a0a0a]/80 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 animate-fade-in-up" style={{ animationDelay: `${sIndex * 100}ms` }}>
                <h2 className="text-lg md:text-xl font-bold text-pink-400 mb-4 md:mb-6 font-display uppercase">{section.title}</h2>
                <div className="space-y-4">
                    {section.items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 group">
                            <div className="flex items-start gap-3 md:gap-4 flex-grow cursor-pointer" onClick={() => toggleCheck(item.id)}>
                                <button 
                                    className={`mt-0.5 w-6 h-6 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${checkedItems[item.id] ? 'bg-pink-500 border-pink-500 text-white' : 'bg-transparent border-white/20 hover:border-pink-400/50'}`}
                                >
                                    {checkedItems[item.id] && <Check className="w-4 h-4" />}
                                </button>
                                <div className="flex-grow">
                                    <p className={`text-sm transition-colors ${checkedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => initChat(item)}
                                className="mt-2 sm:mt-0 ml-0 w-full sm:w-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-400 hover:text-white bg-pink-500/10 hover:bg-pink-500/20 px-3 py-2 md:py-1.5 rounded-full transition-all border border-pink-500/20 hover:border-pink-500/40 whitespace-nowrap justify-center sm:justify-start font-mono"
                            >
                                <Bot className="w-3 h-3" />
                                Jak na to
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>

      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowChat(false)}></div>
            <div className="relative bg-[#111] border-0 md:border border-white/10 w-full md:max-w-2xl h-full md:h-[80vh] md:rounded-2xl shadow-2xl flex flex-col animate-fade-in-up overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1a1a1a] flex-shrink-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20 flex-shrink-0">
                            <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-2 font-display uppercase truncate">Bezpečnostní Průvodce</h3>
                            <p className="text-[10px] md:text-xs text-gray-400 truncate">{chatTitle}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-4 md:space-y-6 bg-[#050505] flex flex-col">
                    {needsApiKey ? (
                        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
                            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
                                <Key className="w-8 h-8 text-pink-400" />
                            </div>
                            <h3 className="text-lg font-display text-white mb-3 uppercase">Vyžadována aktivace AI</h3>
                            <p className="text-sm text-gray-400 mb-8 max-w-sm leading-relaxed">
                                Pro používání AI asistenta je nutné vybrat váš vlastní API klíč z placeného projektu Google Cloud.
                            </p>
                            <button 
                                onClick={handleOpenKeySelection}
                                className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] font-display flex items-center gap-3"
                            >
                                <Bot className="w-4 h-4" /> Aktivovat AI asistenta
                            </button>
                            <a 
                                href="https://ai.google.dev/gemini-api/docs/billing" 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-6 text-[10px] text-gray-500 hover:text-pink-400 underline transition-colors font-mono"
                            >
                                Dokumentace o placených klíčích
                            </a>
                        </div>
                    ) : (
                        <>
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === 'model' ? 'bg-pink-500/20 text-pink-400' : 'bg-white/10 text-white'}`}>
                                        {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                    <div className="flex flex-col gap-2 max-w-[85%]">
                                    {msg.images?.map((img, imgIdx) => (
                                        <img key={imgIdx} src={img} className="max-w-[120px] rounded-lg border border-white/10 object-cover" />
                                    ))}
                                    <div className={`rounded-2xl p-3 md:p-4 text-xs md:text-sm leading-relaxed shadow-sm ${msg.role === 'model' ? 'bg-[#1a1a1a] text-gray-200 border border-white/5 rounded-tl-none' : 'bg-pink-600 text-white rounded-tr-none'}`}>
                                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                                    </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                                        <Bot className="w-5 h-5 text-pink-400" />
                                    </div>
                                    <div className="bg-[#1a1a1a] rounded-2xl rounded-tl-none p-4 border border-white/5 flex gap-2 items-center">
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></span>
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    <div ref={chatEndRef} />
                </div>
                {!needsApiKey && (
                  <div className="p-3 md:p-4 border-t border-white/10 bg-[#1a1a1a] flex-shrink-0">
                      {attachments.length > 0 && (
                        <div className="flex gap-3 mb-3 overflow-x-auto pb-2">
                          {attachments.map((att, idx) => (
                            <div key={idx} className="relative group flex-shrink-0">
                              <img src={att.preview} className="w-16 h-16 rounded-lg object-cover border border-white/20" />
                              <button onClick={() => setAttachments(p => p.filter((_, i) => i !== idx))} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow-md">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <form onSubmit={handleSendMessage} className="flex gap-2 md:gap-3 items-end">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-400 hover:text-pink-400 hover:bg-white/5 rounded-xl transition-colors">
                            <Paperclip className="w-5 h-5" />
                          </button>
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFileSelect} />
                          <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                            placeholder="Zpráva..."
                            className="flex-grow bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500/50 resize-none max-h-32 min-h-[44px]"
                            rows={1}
                          />
                          <button type="submit" disabled={loading || (!inputMessage.trim() && attachments.length === 0)} className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-500 disabled:opacity-50 transition-all">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                          </button>
                      </form>
                  </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default AuditScreen;
