
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Square, HelpCircle, Bot, Send, X, ShieldAlert, ShieldCheck } from 'lucide-react';
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
    title: "Section 1: Počítač (Windows/macOS)",
    items: [
      { id: "pc_updates", label: "Automatické aktualizace jsou zapnuté", aiPrompt: "Jak zapnout automatické aktualizace na Windows a macOS? Napiš stručný návod." },
      { id: "pc_firewall", label: "Firewall je aktivní", aiPrompt: "Jak zkontrolovat, zda je zapnutý Firewall na Windows a macOS?" },
      { id: "pc_antivir", label: "Antivir/Windows Defender je zapnutý", aiPrompt: "Jak ověřit, že běží Windows Defender nebo jiný antivirus?" },
      { id: "pc_encryption", label: "Šifrování disku je aktivní (BitLocker/FileVault)", aiPrompt: "Co je BitLocker a FileVault a jak je zapnout pro šifrování disku?" },
      { id: "pc_user_account", label: "Používám standardní účet pro každodenní práci", aiPrompt: "Proč je bezpečnější používat pro běžnou práci standardní uživatelský účet místo administrátorského?" },
      { id: "pc_startup", label: "Kontroloval jsem spouštěné aplikace při startu", aiPrompt: "Jak zkontrolovat a zakázat programy po spuštění ve Windows a macOS?" },
    ]
  },
  {
    title: "Section 2: Telefon (Android/iPhone)",
    items: [
      { id: "mob_biometrics", label: "Biometrická ochrana je zapnutá (otisk/Face ID)", aiPrompt: "Jak nastavit Face ID nebo otisk prstu na Androidu a iPhone?" },
      { id: "mob_updates", label: "Automatické aktualizace jsou povolené", aiPrompt: "Kde najdu nastavení automatických aktualizací systému pro iOS a Android?" },
      { id: "mob_findmy", label: "Find My Device/iPhone je aktivní", aiPrompt: "Jak zapnout funkci Najít můj iPhone nebo Najít moje zařízení na Androidu?" },
      { id: "mob_permissions", label: "Zkontroloval jsem oprávnění aplikací", aiPrompt: "Jak zkontrolovat a odebrat oprávnění aplikacím na iOS a Androidu?" },
      { id: "mob_backup", label: "Mám nastavené automatické zálohy", aiPrompt: "Jak zapnout zálohování telefonu na iCloud nebo Google Drive?" },
    ]
  },
  {
    title: "Section 3: Domácí síť",
    items: [
      { id: "net_password", label: "Změnil jsem výchozí heslo routeru", aiPrompt: "Proč a jak změnit výchozí heslo do administrace routeru? Napiš obecný postup." },
      { id: "net_wpa", label: "Wi-Fi používá WPA2 nebo WPA3 šifrování", aiPrompt: "Jak nastavit WPA2 nebo WPA3 šifrování na routeru?" },
      { id: "net_wifi_pass", label: "Wi-Fi heslo má minimálně 16 znaků", aiPrompt: "Jak vytvořit silné heslo pro Wi-Fi síť?" },
      { id: "net_wps", label: "WPS je vypnutý", aiPrompt: "Co je WPS na routeru a proč bych ho měl z bezpečnostních důvodů vypnout?" },
      { id: "net_firmware", label: "Firmware routeru je aktuální", aiPrompt: "Jak aktualizovat firmware routeru? Obecný postup." },
      { id: "net_guest", label: "Mám nastavenou Guest network", aiPrompt: "Co je Guest network na routeru a proč ji používat pro návštěvy?" },
    ]
  },
  {
    title: "Section 4: Zálohy",
    items: [
      { id: "back_local", label: "Mám lokální zálohu na externím disku", aiPrompt: "Jak provést lokální zálohu počítače na externí disk (Windows Backup/Time Machine)?" },
      { id: "back_cloud", label: "Mám cloudovou zálohu důležitých dat", aiPrompt: "Jaké jsou bezpečné cloudové služby pro zálohování dat?" },
      { id: "back_auto", label: "Zálohy jsou automatické (ne manuální)", aiPrompt: "Jak nastavit automatické zálohování souborů?" },
      { id: "back_test", label: "Testoval jsem obnovení ze zálohy", aiPrompt: "Proč je důležité testovat obnovu dat ze zálohy?" },
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
  const chatEndRef = useRef<HTMLDivElement>(null);

  const totalItems = AUDIT_DATA.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalItems) * 100);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, showChat]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openAiHelp = async (item: AuditItem) => {
    setChatTitle(item.label);
    setChatHistory([]); // Clear history for new topic
    setShowChat(true);
    setLoading(true);

    try {
        let responseText = "";
        // Hardcoded API Key for demo purposes
        const apiKey = "AIzaSyBYgQJYyKsnOZpzmvweBR9hj00NzAn56Dk";

        const ai = new GoogleGenAI({ apiKey });
        
        // Correct usage: call generateContent on models directly
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `Jsi expert na kybernetickou bezpečnost. Uživatel provádí bezpečnostní audit. Položka, kterou řeší je: "${item.label}".
                        
                        Uživatel potřebuje poradit s tímto: "${item.aiPrompt}".
                        
                        Poskytni jasný, stručný a praktický návod krok za krokem. Mluv česky. Formátuj odpověď pomocí odrážek.` }
                    ]
                }
            ]
        });

        // Access the text property directly
        if (result.text) {
             responseText = result.text;
        } else {
             responseText = "Omlouvám se, nepodařilo se získat odpověď.";
        }

        setChatHistory([{ role: 'model', text: responseText }]);
    } catch (error) {
        console.error("AI Error:", error);
        setChatHistory([{ role: 'model', text: "Omlouvám se, ale momentálně se nemohu spojit s AI serverem. Zkuste to prosím později." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative z-10 min-h-screen pb-24">
      
      {/* Header & Progress */}
      <div className="mb-8 animate-fade-in-up">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group mb-6"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Zpět</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-serif-display text-white mb-2">
                    Audit <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">zabezpečení</span>
                </h1>
                <p className="text-gray-400 text-sm">
                    Proveďte kompletní kontrolu za 30 minut. Zaškrtněte splněné body.
                </p>
            </div>
            
            <div className="text-right">
                <div className="text-4xl font-bold text-white mb-1 font-mono">
                    {percentage}%
                </div>
                <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ${percentage < 80 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>

        {/* Warning Banner */}
        <div className={`p-4 rounded-xl border ${percentage < 80 ? 'bg-rose-950/30 border-rose-500/30 text-rose-200' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'} transition-colors duration-500 flex items-start gap-3`}>
            {percentage < 80 ? <ShieldAlert className="w-6 h-6 flex-shrink-0 mt-0.5" /> : <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />}
            <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">
                    {percentage < 80 ? "Kritické bezpečnostní mezery" : "Výborná úroveň zabezpečení"}
                </h3>
                <p className="text-sm opacity-90">
                    {percentage < 80 
                        ? "Pokud jste zaškrtli méně než 80 % bodů, máte kritické bezpečnostní mezery. Začněte s nejdůležitějšími: aktualizace, šifrování a zálohy."
                        : "Skvělá práce! Vaše zařízení a data jsou dobře chráněna. Nezapomínejte na pravidelnou údržbu."}
                </p>
            </div>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-6">
        {AUDIT_DATA.map((section, sIndex) => (
            <div key={sIndex} className="bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: `${sIndex * 100}ms` }}>
                <h2 className="text-xl font-bold text-pink-400 mb-6 font-serif-display">{section.title}</h2>
                <div className="space-y-4">
                    {section.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 group">
                            <button 
                                onClick={() => toggleCheck(item.id)}
                                className={`mt-0.5 w-6 h-6 rounded border flex items-center justify-center transition-all duration-200 ${checkedItems[item.id] ? 'bg-pink-500 border-pink-500 text-white' : 'bg-transparent border-white/20 hover:border-pink-400/50'}`}
                            >
                                {checkedItems[item.id] && <Check className="w-4 h-4" />}
                            </button>
                            
                            <div className="flex-grow">
                                <p className={`text-sm transition-colors ${checkedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                    {item.label}
                                </p>
                            </div>

                            <button 
                                onClick={() => openAiHelp(item)}
                                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-400 hover:text-white bg-pink-500/10 hover:bg-pink-500/20 px-3 py-1.5 rounded-full transition-all border border-pink-500/20 hover:border-pink-500/40 whitespace-nowrap"
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

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowChat(false)}></div>
            
            <div className="relative bg-[#111] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[80vh] animate-fade-in-up overflow-hidden">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1a1a1a]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white">AI Asistent</h3>
                            <p className="text-xs text-gray-400 truncate max-w-[200px] sm:max-w-md">{chatTitle}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-[#050505]">
                    {loading && (
                        <div className="flex gap-3 animate-pulse">
                            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex-shrink-0"></div>
                            <div className="space-y-2 w-full">
                                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                <div className="h-4 bg-white/10 rounded w-1/2"></div>
                            </div>
                        </div>
                    )}
                    
                    {!loading && chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'model' ? 'bg-pink-500/20 text-pink-400' : 'bg-white/10 text-white'}`}>
                                {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <div className={`rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'model' ? 'bg-[#1a1a1a] text-gray-200 border border-white/5' : 'bg-pink-600 text-white'}`}>
                                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input (Disabled/ReadOnly as it's a guide) */}
                <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
                    <p className="text-xs text-center text-gray-500">
                        AI Asistent generuje odpovědi pomocí modelu Gemini. Vždy ověřujte kritické informace.
                    </p>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default AuditScreen;
