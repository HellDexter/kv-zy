
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Bot, X, ShieldAlert, ShieldCheck, Send, Loader2, Key, Info, AlertTriangle, Shield, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
    description: "Zabezpečení operačního systému je první linií obrany proti útočníkům.",
    items: [
      { 
        id: "pc_updates", 
        label: "Automatické aktualizace systému", 
        why: "Zajišťují, že máte nejnovější bezpečnostní záplaty proti známým zranitelnostem.",
        risk: "Hackeři využívají nezáplatované chyby k ovládnutí počítače na dálku během sekund.",
        aiPrompt: "Vysvětli, jak zkontrolovat aktualizace ve Windows a macOS a proč je neodkládat." 
      },
      { 
        id: "pc_firewall", 
        label: "Aktivní Firewall", 
        why: "Funguje jako síťový vrátný, který filtruje nebezpečný internetový provoz.",
        risk: "Bez firewallu jsou vaše data a sdílené složky přímo dostupné komukoliv v síti.",
        aiPrompt: "Co přesně dělá firewall a jak ho zapnout?" 
      },
      { 
        id: "pc_antivir", 
        label: "Funkční Antivirus / Defender", 
        why: "Identifikuje a blokuje škodlivý software (malware) před jeho spuštěním.",
        risk: "Ransomware může zašifrovat všechna vaše rodinná data a chtít výkupné.",
        aiPrompt: "Stačí mi Windows Defender nebo potřebuji placený antivirus?" 
      },
      { 
        id: "pc_encryption", 
        label: "Šifrování disku (BitLocker/FileVault)", 
        why: "Chrání data v případě fyzické krádeže zařízení.",
        risk: "Bez šifrování stačí zloději vyjmout disk a přečíst si všechna vaše data na jiném PC.",
        aiPrompt: "Jak funguje BitLocker a jak ho bezpečně aktivovat?" 
      }
    ]
  },
  {
    title: "Sekce 2: Telefon (Android/iPhone)",
    description: "Váš mobilní telefon obsahuje více soukromí než vaše peněženka. Chraňte ho.",
    items: [
      { 
        id: "mob_biometrics", 
        label: "Biometrická ochrana (otisk/obličej)", 
        why: "Nejrychlejší a nejbezpečnější způsob, jak zabránit neoprávněnému vstupu.",
        risk: "Jednoduchý číselný PIN nebo gesto lze snadno odkoukat zpoza ramene.",
        aiPrompt: "Proč je biometrie bezpečnější než kód a jak ji nastavit?" 
      },
      { 
        id: "mob_findmy", 
        label: "Aktivní služba 'Najít zařízení'", 
        why: "Umožňuje vzdálené smazání dat při ztrátě nebo krádeži telefonu.",
        risk: "Zloděj získá přístup k vašemu e-mailu, bankovnictví a všem fotkám.",
        aiPrompt: "Jak funguje vzdálené vymazání telefonu a jak ho připravit?" 
      },
      { 
        id: "mob_permissions", 
        label: "Kontrola oprávnění aplikací", 
        why: "Zabraňuje podvodným aplikacím v odposlechu nebo sledování polohy.",
        risk: "Některé aplikace tajně nahrávají zvuk nebo odesílají vaše kontakty na servery.",
        aiPrompt: "Jak omezit přístup aplikací k mé poloze a mikrofonu?" 
      }
    ]
  },
  {
    title: "Sekce 3: Domácí síť a Wi-Fi",
    description: "Router je brána do vašeho domova. Špatné nastavení ohrožuje všechna zařízení v síti.",
    items: [
      { 
        id: "net_password", 
        label: "Změna výchozího hesla routeru", 
        why: "Výchozí hesla (admin/admin) jsou veřejně dohledatelná v manuálech.",
        risk: "Útočník může ovládnout router a přesměrovat veškerý váš provoz na falešné weby.",
        aiPrompt: "Jak změnit administrátorské heslo k routeru a proč je to důležité?" 
      },
      { 
        id: "net_wifi_pass", 
        label: "Silné heslo k Wi-Fi (16+ znaků)", 
        why: "Dlouhé heslo odolá automatizovaným útokům hrubou silou.",
        risk: "Sousedé nebo útočníci před domem mohou sledovat vaši aktivitu a krást identitu.",
        aiPrompt: "Jak vytvořit silné heslo k WiFi a jak ho bezpečně sdílet s návštěvou?" 
      },
      { 
        id: "net_wps", 
        label: "Vypnuté WPS", 
        why: "Protokol WPS je technicky zastaralý a obsahuje kritickou chybu v návrhu.",
        risk: "Útočník může prolomit vaše WiFi heslo během pár hodin pomocí jednoduchého programu.",
        aiPrompt: "Co je to WPS a proč by mělo být v nastavení routeru vypnuté?" 
      },
      { 
        id: "net_firmware", 
        label: "Aktuální firmware routeru", 
        why: "Výrobci vydávají opravy pro díry, které hackeři aktivně zneužívají.",
        risk: "Zastaralý router může sloužit jako trvalý odposlech pro vše, co v síti děláte.",
        aiPrompt: "Jak zkontrolovat a aktualizovat firmware na běžném domácím routeru?" 
      },
      { 
        id: "net_guest", 
        label: "Síť pro hosty (Guest Network)", 
        why: "Odděluje návštěvy od vašich soukromých dat a chytrých zařízení.",
        risk: "Návštěva s nakaženým telefonem může nevědomky infikovat váš počítač v téže síti.",
        aiPrompt: "Jak nastavit Guest WiFi a k čemu je to dobré?" 
      }
    ]
  },
  {
    title: "Sekce 4: Zálohování a obnova",
    description: "Záloha je jedinou 100% jistotou, že o svá data nepřijdete při útoku nebo havárii.",
    items: [
      { 
        id: "back_local", 
        label: "Lokální záloha na externím disku", 
        why: "Máte fyzickou kontrolu nad daty a jejich obnova je velmi rychlá.",
        risk: "Při selhání vnitřního disku počítače přijdete o všechna data, pokud nejsou jinde.",
        aiPrompt: "Jak správně zálohovat na externí disk a jak ho uchovávat?" 
      },
      { 
        id: "back_cloud", 
        label: "Cloudová záloha (OneDrive/iCloud/Disk)", 
        why: "Data jsou chráněna i v případě požáru nebo krádeže celého domova.",
        risk: "Pokud shoří dům i s diskem, přijdete o celoživotní vzpomínky bez cloudu.",
        aiPrompt: "Který cloud je nejvhodnější pro zálohu fotek a dokumentů?" 
      },
      { 
        id: "back_auto", 
        label: "Automatizace záloh", 
        why: "Lidé jsou zapomnětliví. Automatický systém běží bez vašeho zásahu.",
        risk: "Manuální záloha stará půl roku je při útoku ransomwarem téměř k ničemu.",
        aiPrompt: "Jak nastavit Time Machine na Macu nebo Zálohování ve Windows?" 
      },
      { 
        id: "back_test", 
        label: "Test obnovy ze zálohy", 
        why: "Záloha, která nejde obnovit, není záloha, ale jen zabrané místo.",
        risk: "Zjistit, že je záloha poškozená až v momentě, kdy ji potřebujete, je tragédie.",
        aiPrompt: "Jak si vyzkoušet, že moje zálohy skutečně fungují a data jdou přečíst?" 
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
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

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const startAiConsultant = async (item: AuditItem, e: React.MouseEvent) => {
    e.stopPropagation();
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
      const systemInstruction = `Jsi Kyber-GURU, tvým úkolem je pomoci uživateli s bezpečnostním auditem: "${item.label}". 
      Informace čerpej z kontextu: Proč je to důležité: ${item.why}, Riziko: ${item.risk}. 
      Vysvětli to v bodech, česky a srozumitelně. Nejdřív uveď riziko a pak přesný návod pro běžného uživatele.`;

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
      setChatHistory([{ role: 'model', text: "Nastala technická chyba. Zkontrolujte prosím API klíč v nastavení platformy." }]);
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
        config: { systemInstruction: `Jsi kybernetický poradce. Pomáháš laikovi s tématem: ${activeItem.label}. Odpovídej věcně a s důrazem na bezpečnost.` }
      });
      if (response.text) setChatHistory(prev => [...prev, { role: 'model', text: response.text! }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Omlouvám se, spojení s AI modelem bylo přerušeno." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative z-10 min-h-screen pb-32">
      
      {/* Header Panel */}
      <div className="mb-12 animate-fade-in-up">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-all flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-10 font-mono group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zpět do menu
        </button>

        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <h1 className="text-3xl md:text-5xl font-display text-white mb-4 uppercase tracking-tighter">
              Audit <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">Zabezpečení</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light max-w-lg leading-relaxed">
              Kompletní kontrolní seznam pro bezpečný život online. Projděte si všechny sekce a ujistěte se, že vaše digitální stopa je chráněna.
            </p>
          </div>
          <div className="bg-black/40 border border-white/5 p-6 rounded-3xl text-center min-w-[180px] backdrop-blur-md">
            <div className="text-5xl font-bold text-white mb-1 font-mono tracking-tighter">{percentage}%</div>
            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3">Zabezpečeno</div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div className={`h-full transition-all duration-1000 ${percentage === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-pink-600'}`} style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Content */}
      <div className="space-y-12">
        {AUDIT_DATA.map((section, sIdx) => (
          <div key={sIdx} className="animate-fade-in-up" style={{ animationDelay: `${sIdx * 100}ms` }}>
            <div className="mb-6 border-l-4 border-pink-500 pl-4 py-1">
              <h2 className="text-xl font-display text-white uppercase tracking-wider mb-1">{section.title}</h2>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-mono">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {section.items.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleExpand(item.id)}
                  className={`group relative overflow-hidden transition-all duration-300 border rounded-2xl cursor-pointer ${expandedItems[item.id] ? 'bg-[#1a1a1a] border-pink-500/50 ring-1 ring-pink-500/20' : 'bg-[#0a0a0a]/60 border-white/5 hover:border-white/20'}`}
                >
                  <div className="p-5 md:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-grow">
                        <button 
                          onClick={(e) => toggleCheck(item.id, e)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all border ${checkedItems[item.id] ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white/5 border-white/10 group-hover:border-pink-500/30'}`}
                        >
                          {checkedItems[item.id] && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <h3 className={`text-base font-bold transition-all ${checkedItems[item.id] ? 'text-gray-600 line-through opacity-50' : 'text-white'}`}>
                          {item.label}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => startAiConsultant(item, e)}
                          className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 hover:bg-pink-500 text-pink-500 hover:text-white border border-pink-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm group/btn"
                        >
                          <Bot className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" /> <span className="hidden sm:inline">AI Poradce</span>
                        </button>
                        <div className="text-gray-600 group-hover:text-pink-400 transition-colors px-2">
                           {expandedItems[item.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                    </div>
                  </div>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-6 pt-2 animate-fade-in-up border-t border-white/5 bg-black/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                          <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase mb-3 tracking-widest font-mono">
                             <ShieldCheck className="w-4 h-4" /> Význam a přínos
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed font-light">{item.why}</p>
                        </div>
                        <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                          <div className="flex items-center gap-2 text-rose-400 text-[10px] font-bold uppercase mb-3 tracking-widest font-mono">
                             <AlertTriangle className="w-4 h-4" /> Kritické riziko
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed font-light">{item.risk}</p>
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
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowChat(false)}></div>
          <div className="relative w-full max-w-2xl h-full md:h-[85vh] bg-[#0d0d0d] border border-white/10 md:rounded-[3rem] shadow-[0_0_100px_rgba(244,63,94,0.15)] flex flex-col overflow-hidden animate-fade-in-up">
             
             {/* Modal Header */}
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111]">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                      <Bot className="w-7 h-7 text-white" />
                   </div>
                   <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-display">AI Konzultant</h3>
                      <p className="text-[10px] text-pink-500 font-mono truncate max-w-[200px]">{chatTitle}</p>
                   </div>
                </div>
                <button onClick={() => setShowChat(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"><X className="w-5 h-5" /></button>
             </div>

             {/* Chat History */}
             <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-1 border ${msg.role === 'model' ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                      {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm leading-relaxed ${msg.role === 'model' ? 'bg-[#181818] text-gray-200 border border-white/5' : 'bg-pink-600 text-white shadow-lg'}`}>
                      <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mt-1"><Bot className="w-5 h-5 text-pink-500" /></div>
                    <div className="bg-[#181818] rounded-2xl px-5 py-4 flex gap-2 items-center border border-white/5"><span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></span><span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span></div>
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
                    placeholder="Máte doplňující otázku?" 
                    className="flex-grow bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all font-light"
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !inputMessage.trim()} 
                    className="w-14 h-14 bg-pink-600 text-white rounded-2xl hover:bg-pink-500 disabled:opacity-30 transition-all flex items-center justify-center shadow-lg"
                  >
                     <Send className="w-6 h-6" />
                  </button>
                </form>
                <div className="mt-4 flex justify-center">
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-gray-600 uppercase">Model: Gemini 3 Flash Expert System</div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditScreen;
