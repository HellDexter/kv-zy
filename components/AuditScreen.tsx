
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Bot, X, ShieldAlert, ShieldCheck, Send, Paperclip, Loader2, Key, RefreshCw, AlertCircle } from 'lucide-react';
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
}

const AuditScreen: React.FC<Props> = ({ onBack }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showChat, setShowChat] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<AuditItem | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  const handleForceOpenKey = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setErrorDetails(null);
      if (activeItem) initChat(activeItem);
    } catch (e) {
      console.error(e);
    }
  };

  const initChat = async (item: AuditItem) => {
    // 1. Hardcore kontrola klíče hned na začátku
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    setActiveItem(item);
    setChatTitle(item.label);
    setChatHistory([]);
    setInputMessage("");
    setShowChat(true);
    setLoading(true);
    setErrorDetails(null);

    try {
      // Vytvoření AI instance přímo v místě potřeby
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = 'gemini-3-flash-preview';
      
      const systemInstruction = `Jsi bezpečnostní expert. Pomoz s: "${item.label}". Piš česky, stručně, v krocích. Nejdřív se zeptej na zařízení (Windows, iOS atd.).`;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: "Ahoj, začni instrukcí." }] }],
        config: { systemInstruction }
      });

      if (response.text) {
        setChatHistory([{ role: 'model', text: response.text }]);
      }
    } catch (error: any) {
      console.error("AI Error:", error);
      setErrorDetails(error.message || "Neznámá chyba API");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || loading || !activeItem) return;

    const userText = inputMessage;
    const newHistory: Message[] = [...chatHistory, { role: 'user', text: userText }];
    
    setChatHistory(newHistory);
    setInputMessage("");
    setLoading(true);
    setErrorDetails(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `Jsi bezpečnostní expert pro: "${activeItem.label}". Piš česky a srozumitelně.`;

      // Převod historie na formát pro generateContent
      const contents = newHistory.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { systemInstruction }
      });

      if (response.text) {
        setChatHistory(prev => [...prev, { role: 'model', text: response.text! }]);
      }
    } catch (error: any) {
      console.error("Send Error:", error);
      setErrorDetails(error.message || "Chyba při odesílání");
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
                <h1 className="text-2xl md:text-4xl font-display text-white mb-2 uppercase text-shadow-glow">
                    Audit <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">zabezpečení</span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm">Klikněte na "Jak na to" pro spuštění AI průvodce.</p>
            </div>
            <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono tracking-tighter">{percentage}%</div>
                <div className="w-full md:w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full transition-all duration-700 ${percentage < 80 ? 'bg-rose-500' : 'bg-emerald-500'} shadow-[0_0_10px_rgba(244,63,94,0.3)]`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AUDIT_DATA.map((section, sIdx) => (
            <div key={sIdx} className="bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: `${sIdx * 100}ms` }}>
                <h2 className="text-xs font-bold text-pink-500/80 mb-4 font-mono uppercase tracking-[0.2em]">{section.title}</h2>
                <div className="space-y-3">
                    {section.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors group">
                            <button 
                              onClick={() => toggleCheck(item.id)}
                              className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${checkedItems[item.id] ? 'bg-pink-600 border-pink-600' : 'border-white/10 group-hover:border-white/30'}`}
                            >
                                {checkedItems[item.id] && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <span className={`text-sm flex-grow transition-opacity ${checkedItems[item.id] ? 'text-gray-600 line-through opacity-50' : 'text-gray-300'}`}>{item.label}</span>
                            <button onClick={() => initChat(item)} className="p-2 bg-pink-500/10 text-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-500/20" title="Jak na to">
                                <Bot className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>

      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowChat(false)}></div>
            <div className="relative bg-[#0d0d0d] border-0 md:border border-white/10 w-full md:max-w-2xl h-full md:h-[85vh] md:rounded-3xl shadow-3xl flex flex-col overflow-hidden animate-fade-in-up">
                
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-display">AI Bezpečnostní Průvodce</h3>
                            <p className="text-[10px] text-pink-500/70 truncate max-w-[200px]">{chatTitle}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-white p-2 transition-colors"><X className="w-5 h-5" /></button>
                </div>

                {/* Body */}
                <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-grid-pattern bg-[length:30px_30px]">
                    {errorDetails ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-shake">
                            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-rose-500" />
                            </div>
                            <h3 className="text-lg font-display text-white mb-2 uppercase">Chyba Spojení</h3>
                            <code className="text-[10px] text-rose-400 bg-rose-500/5 px-2 py-1 rounded mb-6 font-mono block max-w-xs break-words">
                                ERROR: {errorDetails}
                            </code>
                            <div className="flex flex-col gap-3 w-full max-w-xs">
                                <button onClick={() => initChat(activeItem!)} className="bg-white text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 transition-all font-display">
                                    <RefreshCw className="w-4 h-4" /> Zkusit znovu
                                </button>
                                <button onClick={handleForceOpenKey} className="bg-rose-600/20 border border-rose-600/30 text-rose-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-600/30 transition-all font-display">
                                    <Key className="w-4 h-4" /> Resetovat API klíč
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === 'model' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                                        {msg.role === 'model' ? <Bot className="w-4 h-4" /> : <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'model' ? 'bg-[#1a1a1a] text-gray-200 border border-white/5' : 'bg-pink-600 text-white'}`}>
                                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center mt-1 border border-pink-500/20"><Bot className="w-4 h-4 text-pink-500" /></div>
                                    <div className="bg-[#1a1a1a] rounded-2xl px-4 py-3 flex gap-2 items-center border border-white/5"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></span><span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span></div>
                                </div>
                            )}
                        </>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Footer */}
                {!errorDetails && (
                  <div className="p-4 border-t border-white/5 bg-[#111]">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                          <input 
                            value={inputMessage} 
                            onChange={(e) => setInputMessage(e.target.value)} 
                            placeholder="Napište odpověď..." 
                            className="flex-grow bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all font-light" 
                          />
                          <button 
                            type="submit" 
                            disabled={loading || !inputMessage.trim()} 
                            className="w-12 h-12 bg-pink-600 text-white rounded-xl hover:bg-pink-500 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center shadow-lg"
                          >
                             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                          </button>
                      </form>
                      <p className="text-[9px] text-gray-600 mt-3 text-center uppercase tracking-widest font-mono">End-to-End Encrypted AI Session via Google Gemini</p>
                  </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default AuditScreen;
