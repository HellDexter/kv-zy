
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Bot, X, ShieldAlert, ShieldCheck, Send, Loader2, Key, Info, AlertTriangle, Shield, HelpCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

interface AuditItem {
  id: string;
  label: string;
  why: string;
  risk: string;
  aiPrompt: string;
}

interface AuditSection {
  title: string;
  description: string;
  items: AuditItem[];
}

const AUDIT_DATA: AuditSection[] = [
  {
    title: "Sekce 1: Počítač (Windows/macOS)",
    description: "Váš počítač je hlavní branou k vaší digitální identitě a financím. Základní ochrana systému je nezbytným minimem.",
    items: [
      { 
        id: "pc_updates", 
        label: "Automatické aktualizace systému", 
        why: "Vývojáři neustále opravují bezpečnostní díry, o kterých hackeři vědí.",
        risk: "Útočníci zneužívají staré chyby k tichému ovládnutí vašeho PC bez vašeho vědomí.",
        aiPrompt: "Jak zapnout automatické aktualizace ve Windows a macOS?" 
      },
      { 
        id: "pc_firewall", 
        label: "Aktivní Firewall", 
        why: "Funguje jako digitální vrátný, který filtruje veškerý příchozí a odchozí provoz.",
        risk: "Bez firewallu jsou vaše otevřené síťové porty viditelné komukoliv na internetu.",
        aiPrompt: "Jak ověřím, že je můj systémový firewall zapnutý?" 
      },
      { 
        id: "pc_antivir", 
        label: "Funkční Antivirus (Defender)", 
        why: "Skenuje soubory na pozadí a blokuje známé škodlivé kódy dříve, než se spustí.",
        risk: "Infekce ransomwarem může zašifrovat všechna vaše data během několika sekund.",
        aiPrompt: "Jak provést kompletní kontrolu počítače pomocí Windows Defenderu?" 
      },
      { 
        id: "pc_encryption", 
        label: "Šifrování disku (BitLocker/FileVault)", 
        why: "Zajišťuje, že se k datům nikdo nedostane ani po fyzické krádeži disku nebo notebooku.",
        risk: "Bez šifrování stačí útočníkovi vyjmout disk a přečíst si všechna vaše hesla a dokumenty v jiném PC.",
        aiPrompt: "Co je BitLocker nebo FileVault a jak je nastavit?" 
      }
    ]
  },
  {
    title: "Sekce 2: Telefon (Android/iPhone)",
    description: "Mobilní telefon dnes obsahuje více citlivých dat než počítač. Je to váš klíč k bankovnictví a komunikaci.",
    items: [
      { 
        id: "mob_biometrics", 
        label: "Biometrická ochrana (otisk/obličej)", 
        why: "Zajišťuje, že nikdo nepovolaný neodemkne telefon při fyzické manipulaci.",
        risk: "Snadno odhadnutelné gesto nebo PIN umožní zloději okamžitý přístup k vašemu e-mailu.",
        aiPrompt: "Proč je FaceID nebo čtečka otisků bezpečnější než kód 1234?" 
      },
      { 
        id: "mob_findmy", 
        label: "Služba 'Najít zařízení' aktivní", 
        why: "Umožňuje vzdáleně lokalizovat, uzamknout nebo kompletně smazat telefon při ztrátě.",
        risk: "Při ztrátě nechráněného telefonu přicházíte o data a dáváte je k dispozici nálezci.",
        aiPrompt: "Jak nastavit 'Najít iPhone' nebo 'Najít moje zařízení' na Androidu?" 
      },
      { 
        id: "mob_permissions", 
        label: "Kontrola oprávnění aplikací", 
        why: "Omezuje aplikacím přístup ke kameře, mikrofonu a kontaktům, které nepotřebují.",
        risk: "Hry nebo kalkulačky s přístupem ke kontaktům mohou vaše data prodávat dál.",
        aiPrompt: "Jak zkontrolovat, které aplikace mají přístup k mé poloze a mikrofonu?" 
      }
    ]
  },
  {
    title: "Sekce 3: Domácí síť a Wi-Fi",
    description: "Váš router je prvním bodem obrany. Špatně nastavená síť ohrožuje všechna zařízení v domě.",
    items: [
      { 
        id: "net_password", 
        label: "Změna výchozího hesla routeru", 
        why: "Výrobci používají stejná hesla (admin/admin), která jsou veřejně dohledatelná.",
        risk: "Útočník může ovládnout váš router a přesměrovat vás na falešné stránky banky.",
        aiPrompt: "Jak se přihlásit do administrace routeru a změnit heslo?" 
      },
      { 
        id: "net_wifi_pass", 
        label: "Silné heslo k Wi-Fi (16+ znaků)", 
        why: "Dlouhé heslo odolá útokům hrubou silou, které zkoušejí miliony kombinací.",
        risk: "Sousedé nebo lidé před domem mohou zneužívat vaše připojení k nelegální činnosti.",
        aiPrompt: "Jak vytvořit silné heslo pro Wi-Fi, které si zapamatuji?" 
      }
    ]
  },
  {
    title: "Sekce 4: Zálohy a obnova",
    description: "Jedinou 100% obranou proti ztrátě dat je jejich pravidelné a automatické zálohování.",
    items: [
      { 
        id: "back_auto", 
        label: "Automatické zálohy (Cloud/Disk)", 
        why: "Manuální zálohování lidé často zapomínají. Automatika běží neustále.",
        risk: "Při selhání disku nebo útoku ransomwarem přijdete o všechny fotky a dokumenty navždy.",
        aiPrompt: "Jak nastavit automatické zálohování na Google Disk nebo iCloud?" 
      }
    ]
  }
];

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AuditScreen: React.FC<Props> = ({ onBack }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [activeItem, setActiveItem] = useState<AuditItem | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const totalItemsCount = AUDIT_DATA.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalItemsCount) * 100);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, showChat, loading]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const startAiConsultant = async (item: AuditItem) => {
    setLoading(true);
    setActiveItem(item);
    setChatTitle(item.label);
    setChatHistory([]);
    setShowChat(true);

    try {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `Jsi Kyber-GURU, expert na bezpečnost. Tvým úkolem je vysvětlit uživateli problematiku: "${item.label}". 
      Piš srozumitelně jako k laikovi. Používej odrážky. Vysvětli nejdřív proč je to kritické a pak dej návod.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: item.aiPrompt }] }],
        config: { systemInstruction }
      });

      if (response.text) {
        setChatHistory([{ role: 'model', text: response.text }]);
      }
    } catch (error: any) {
      console.error("AI Error:", error);
      setChatHistory([{ role: 'model', text: "Omlouvám se, nastala technická chyba při spojení s expertem. Zkontrolujte prosím své připojení nebo API klíč." }]);
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

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contents = newHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { systemInstruction: `Jsi expert na kyberbezpečnost. Radíš s tématem: ${activeItem.label}` }
      });
      if (response.text) setChatHistory(prev => [...prev, { role: 'model', text: response.text! }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Chyba při odesílání zprávy." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative z-10 min-h-screen pb-32">
      
      {/* Header Panel */}
      <div className="mb-10 animate-fade-in-up">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-all flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-8 font-mono group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zpět do menu
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-display text-white mb-3 uppercase leading-none">
              Bezpečný <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">Občan</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Ověřte si úroveň své digitální ochrany. Projděte si body a u těch, kterým nerozumíte, využijte našeho <span className="text-pink-400 font-bold">AI konzultanta</span>.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-3xl border border-white/5 min-w-[160px]">
            <div className="text-4xl font-bold text-white mb-1 font-mono tracking-tighter">{percentage}%</div>
            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3">Zabezpečeno</div>
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div className={`h-full transition-all duration-1000 ${percentage === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-pink-500'}`} style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Content */}
      <div className="space-y-10">
        {AUDIT_DATA.map((section, sIdx) => (
          <div key={sIdx} className="animate-fade-in-up" style={{ animationDelay: `${sIdx * 100}ms` }}>
            <div className="mb-6">
              <h2 className="text-xl font-display text-white uppercase mb-2 tracking-wide flex items-center gap-3">
                <Shield className="w-5 h-5 text-pink-500" /> {section.title}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {section.items.map((item) => (
                <div 
                  key={item.id} 
                  className={`group relative overflow-hidden transition-all duration-500 border rounded-2xl ${expandedItem === item.id ? 'bg-[#111] border-pink-500/40 ring-1 ring-pink-500/20' : 'bg-[#0a0a0a]/60 border-white/5 hover:border-white/20'}`}
                >
                  <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                    {/* Checkbox Area */}
                    <button 
                      onClick={() => toggleCheck(item.id)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${checkedItems[item.id] ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] border-emerald-500' : 'bg-white/5 border border-white/10 hover:border-pink-500/50'}`}
                    >
                      {checkedItems[item.id] && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <div className="flex-grow">
                       <h3 className={`text-base font-bold transition-all ${checkedItems[item.id] ? 'text-gray-500 line-through' : 'text-white'}`}>
                         {item.label}
                       </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${expandedItem === item.id ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                      >
                        <Info className="w-3 h-3" /> {expandedItem === item.id ? 'Skrýt detaily' : 'Vzdělávání'}
                      </button>

                      <button 
                        onClick={() => startAiConsultant(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 hover:bg-pink-500 text-pink-500 hover:text-white border border-pink-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        <Bot className="w-3 h-3" /> AI Konzultant
                      </button>
                    </div>
                  </div>

                  {/* Expanded Educational Content */}
                  {expandedItem === item.id && (
                    <div className="px-6 pb-6 pt-2 animate-fade-in-up border-t border-white/5 bg-black/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                          <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase mb-2 tracking-widest">
                             <ShieldCheck className="w-4 h-4" /> Proč je to důležité?
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{item.why}</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
                          <div className="flex items-center gap-2 text-rose-400 text-[10px] font-bold uppercase mb-2 tracking-widest">
                             <AlertTriangle className="w-4 h-4" /> Jaké hrozí riziko?
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{item.risk}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowChat(false)}></div>
          <div className="relative w-full max-w-2xl h-full md:h-[80vh] bg-[#0d0d0d] border border-white/10 md:rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden animate-fade-in-up">
             {/* Modal Header */}
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111]">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                      <Bot className="w-7 h-7 text-white" />
                   </div>
                   <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">AI Bezpečnostní Konzultant</h3>
                      <p className="text-[10px] text-pink-500/70 truncate max-w-[200px] font-mono">{chatTitle}</p>
                   </div>
                </div>
                <button onClick={() => setShowChat(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"><X className="w-5 h-5" /></button>
             </div>

             {/* Chat Messages */}
             <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === 'model' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'bg-white/5 text-gray-400'}`}>
                      {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${msg.role === 'model' ? 'bg-[#1a1a1a] text-gray-200 border border-white/5' : 'bg-pink-600 text-white'}`}>
                      <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center mt-1 border border-pink-500/20"><Bot className="w-5 h-5 text-pink-500" /></div>
                    <div className="bg-[#1a1a1a] rounded-2xl px-5 py-4 flex gap-2 items-center border border-white/5"><span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></span><span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span></div>
                  </div>
                )}
                <div ref={chatEndRef} />
             </div>

             {/* Chat Input */}
             <div className="p-6 bg-[#111] border-t border-white/5">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    placeholder="Zeptejte se na doplňující detaily..." 
                    className="flex-grow bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-gray-700"
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !inputMessage.trim()} 
                    className="w-14 h-14 bg-pink-600 text-white rounded-2xl hover:bg-pink-500 disabled:opacity-30 transition-all flex items-center justify-center shadow-lg shadow-pink-500/20"
                  >
                     <Send className="w-6 h-6" />
                  </button>
                </form>
             </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="fixed bottom-0 left-0 w-full p-6 pointer-events-none">
         <div className="max-w-5xl mx-auto flex justify-end">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 text-[10px] font-mono tracking-widest text-gray-500">
               <HelpCircle className="w-4 h-4 text-pink-500" /> STAV AUDITU: AKTIVNÍ MODUL "BEZPEČNÝ OBČAN"
            </div>
         </div>
      </div>
    </div>
  );
};

export default AuditScreen;
