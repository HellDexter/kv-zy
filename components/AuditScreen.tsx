
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Bot, X, ShieldAlert, ShieldCheck, Send, Paperclip, Loader2, Key } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

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
  const chatSessionRef = useRef<any>(null);

  const totalItemsCount = AUDIT_DATA.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentage = totalItemsCount > 0 ? Math.round((checkedCount / totalItemsCount) * 100) : 0;

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
      // @ts-ignore
      await window.aistudio.openSelectKey();
      if (activeItem) {
        setNeedsApiKey(false);
        // Po otevření dialogu předpokládáme úspěch a zkusíme znovu
        initChat(activeItem);
      }
    } catch (err) {
      console.error("Key selection failed", err);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
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

    try {
      // Vždy vytvoříme novou instanci přímo před voláním
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `
        Jsi bezpečnostní expert pro kurz 'Bezpečný občan'. Pomoz uživateli s: "${item.label}".
        Tvým úkolem je vysvětlit PROČ a JAK to nastavit.
        Postupuj krok za krokem. Nejdřív se zeptej na operační systém (Windows, macOS, Android, iOS).
        Piš česky, věcně a srozumitelně.
      `;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { systemInstruction }
      });

      chatSessionRef.current = chat;
      const result = await chat.sendMessage({ message: "Ahoj, jsem tvůj AI průvodce. Pomůžu ti s nastavením bezpečnosti. Jaký operační systém nebo zařízení právě používáš?" });
      
      if (result.text) {
          setChatHistory([{ role: 'model', text: result.text }]);
      }
    } catch (error: any) {
      console.error("AI Init Error:", error);
      const errorMsg = error.message || "";
      if (errorMsg.includes("API key") || errorMsg.includes("403") || errorMsg.includes("not found") || errorMsg.includes("entity")) {
        setNeedsApiKey(true);
      } else {
        setChatHistory([{ role: 'model', text: "Omlouvám se, ale spojení s AI selhalo. Zkuste to prosím znovu za chvíli." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputMessage.trim() && attachments.length === 0) || loading || !chatSessionRef.current) return;

    const currentMsg = inputMessage;
    const currentAtts = [...attachments];
    
    setChatHistory(prev => [...prev, {
      role: 'user',
      text: currentMsg,
      images: currentAtts.map(a => a.preview)
    }]);
    
    setInputMessage("");
    setAttachments([]);
    setLoading(true);

    try {
      // Poznámka: sendMessage v ChatSession podle guidelines přijímá pouze parametr 'message'
      const result = await chatSessionRef.current.sendMessage({ message: currentMsg.trim() || "Analyzuj prosím tento přiložený obsah." });
      
      if (result.text) {
        setChatHistory(prev => [...prev, { role: 'model', text: result.text }]);
      }
    } catch (error: any) {
      console.error("Send Error:", error);
      const errorMsg = error.message || "";
      if (errorMsg.includes("not found") || errorMsg.includes("entity")) {
        setNeedsApiKey(true);
      } else {
        setChatHistory(prev => [...prev, { role: 'model', text: "Chyba při odesílání zprávy. Zkuste to prosím znovu." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 relative z-10 min-h-screen pb-24">
      <div className="mb-6 md:mb-8 animate-fade-in-up">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group mb-6 font-mono">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Zpět</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-4xl font-display text-white mb-2 uppercase">
                    Audit <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">zabezpečení</span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm">Zaškrtněte splněné body a u ostatních využijte AI průvodce.</p>
            </div>
            <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">{percentage}%</div>
                <div className="w-full md:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${percentage < 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {AUDIT_DATA.map((section, sIdx) => (
            <div key={sIdx} className="bg-[#0a0a0a]/80 border border-white/10 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: `${sIdx * 100}ms` }}>
                <h2 className="text-lg font-bold text-pink-400 mb-4 font-display uppercase">{section.title}</h2>
                <div className="space-y-4">
                    {section.items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 group">
                            <div className="flex items-start gap-4 flex-grow cursor-pointer" onClick={() => toggleCheck(item.id)}>
                                <button className={`mt-0.5 w-6 h-6 rounded border flex items-center justify-center transition-all ${checkedItems[item.id] ? 'bg-pink-500 border-pink-500 text-white' : 'bg-transparent border-white/20'}`}>
                                    {checkedItems[item.id] && <Check className="w-4 h-4" />}
                                </button>
                                <p className={`text-sm ${checkedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{item.label}</p>
                            </div>
                            <button onClick={() => initChat(item)} className="w-full sm:w-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20 hover:bg-pink-500/20 transition-all font-mono justify-center">
                                <Bot className="w-3 h-3" /> Jak na to
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>

      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowChat(false)}></div>
            <div className="relative bg-[#111] border-0 md:border border-white/10 w-full md:max-w-2xl h-full md:h-[80vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1a1a1a]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="text-sm font-bold text-white font-display uppercase truncate">AI Průvodce</h3>
                            <p className="text-[10px] text-gray-400 truncate">{chatTitle}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-[#050505]">
                    {needsApiKey ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6"><Key className="w-8 h-8 text-pink-400" /></div>
                            <h3 className="text-lg font-display text-white mb-2 uppercase">Vyžadována aktivace AI</h3>
                            <p className="text-sm text-gray-400 mb-8 max-w-sm">Pro používání asistenta musíte potvrdit svůj API klíč z placeného projektu Google Cloud (Billing Enabled).</p>
                            <button onClick={handleOpenKeySelection} className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all shadow-lg font-display">Aktivovat asistenta</button>
                        </div>
                    ) : (
                        <>
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === 'model' ? 'bg-pink-500/20 text-pink-400' : 'bg-white/10 text-white'}`}>
                                        {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                    <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'model' ? 'bg-[#1a1a1a] text-gray-200 rounded-tl-none' : 'bg-pink-600 text-white rounded-tr-none'}`}>
                                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                                        {msg.images?.map((img, i) => <img key={i} src={img} className="mt-2 rounded-lg max-w-full h-auto border border-white/10" />)}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mt-1"><Bot className="w-5 h-5 text-pink-400" /></div>
                                    <div className="bg-[#1a1a1a] rounded-2xl rounded-tl-none p-4 flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></span><span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span></div>
                                </div>
                            )}
                        </>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {!needsApiKey && (
                  <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
                      {attachments.length > 0 && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                          {attachments.map((att, idx) => (
                            <div key={idx} className="relative flex-shrink-0">
                              <img src={att.preview} className="w-12 h-12 rounded-lg object-cover border border-white/20" />
                              <button onClick={() => setAttachments(p => p.filter((_, i) => i !== idx))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><X className="w-2 h-2" /></button>
                            </div>
                          ))}
                        </div>
                      )}
                      <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-400 hover:text-pink-400 rounded-xl transition-colors"><Paperclip className="w-5 h-5" /></button>
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={(e) => {
                              if (e.target.files) {
                                  // Fix: Argument of type 'unknown' is not assignable to parameter of type 'Blob | MediaSource'.
                                  const files = Array.from(e.target.files).map((file: File) => ({ file, preview: URL.createObjectURL(file) }));
                                  setAttachments(prev => [...prev, ...files]);
                              }
                          }} />
                          <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }} placeholder="Zadejte dotaz..." className="flex-grow bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500/50 resize-none h-[44px]" rows={1} />
                          <button type="submit" disabled={loading || (!inputMessage.trim() && attachments.length === 0)} className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-500 disabled:opacity-50 transition-all">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}</button>
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
