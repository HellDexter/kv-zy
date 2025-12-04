
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Bot, X, ShieldAlert, ShieldCheck, Send, Paperclip, Image as ImageIcon, Trash2, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

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
      { id: "pc_updates", label: "Automatické aktualizace jsou zapnuté", aiPrompt: "Nastavení automatických aktualizací systému." },
      { id: "pc_firewall", label: "Firewall je aktivní", aiPrompt: "Kontrola a zapnutí Firewallu." },
      { id: "pc_antivir", label: "Antivir/Windows Defender je zapnutý", aiPrompt: "Ověření funkčnosti antiviru." },
      { id: "pc_encryption", label: "Šifrování disku je aktivní (BitLocker/FileVault)", aiPrompt: "Nastavení šifrování disku (BitLocker/FileVault)." },
      { id: "pc_user_account", label: "Používám standardní účet pro každodenní práci", aiPrompt: "Nastavení standardního uživatelského účtu." },
      { id: "pc_startup", label: "Kontroloval jsem spouštěné aplikace při startu", aiPrompt: "Správa aplikací po spuštění." },
    ]
  },
  {
    title: "Section 2: Telefon (Android/iPhone)",
    items: [
      { id: "mob_biometrics", label: "Biometrická ochrana je zapnutá (otisk/Face ID)", aiPrompt: "Nastavení biometrie (Face ID/Touch ID)." },
      { id: "mob_updates", label: "Automatické aktualizace jsou povolené", aiPrompt: "Nastavení aktualizací iOS/Android." },
      { id: "mob_findmy", label: "Find My Device/iPhone je aktivní", aiPrompt: "Aktivace služby Najít zařízení." },
      { id: "mob_permissions", label: "Zkontroloval jsem oprávnění aplikací", aiPrompt: "Kontrola oprávnění aplikací." },
      { id: "mob_backup", label: "Mám nastavené automatické zálohy", aiPrompt: "Nastavení cloudu a záloh." },
    ]
  },
  {
    title: "Section 3: Domácí síť",
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
    title: "Section 4: Zálohy",
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
  images?: string[]; // Array of base64 strings for display
}

interface Attachment {
  file: File;
  preview: string;
}

// Define the part interface expected by the SDK
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
  const [isDragging, setIsDragging] = useState(false);
  
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
  }, [chatHistory, showChat, loading, attachments]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to convert File to Base64 Part
  const fileToGenerativePart = async (file: File): Promise<Part> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Extract raw base64 data (remove data:image/jpeg;base64, prefix)
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
    setChatTitle(item.label);
    setChatHistory([]);
    setAttachments([]);
    setInputMessage("");
    setShowChat(true);
    setLoading(true);

    try {
      // Check for API Key presence safely
      let apiKey = "";
      try {
        apiKey = process.env.API_KEY || "";
      } catch (e) {
        console.error("Environment access error:", e);
      }

      if (!apiKey) {
        console.error("API_KEY is missing. Please set process.env.API_KEY.");
        throw new Error("Missing API Key");
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      const systemInstruction = `
        Jsi trpělivý bezpečnostní průvodce (AI agent). Tvým úkolem je provést uživatele nastavením bodu: "${item.label}".
        
        PŘÍSNÁ PRAVIDLA KOMUNIKACE:
        1. NEGENERUJ CELÝ NÁVOD NAJEDNOU. Musíš postupovat krok za krokem.
        2. KROK 1 (Iniciace): Pozdrav uživatele a zeptej se ho na zařízení/OS (např. "Máte Windows nebo Mac?", "Jaký máte router?"), pokud to není zřejmé.
        3. KROK 2 (Instrukce): Jakmile znáš kontext, napiš PRVNÍ krok co má uživatel udělat.
        4. Čekej na potvrzení uživatele, že krok zvládl, nebo na jeho dotaz.
        5. Pokud uživatel pošle obrázek (screenshot), analyzuj ho a řekni mu přesně, kam má kliknout.
        6. Buď stručný, nápomocný a lidský.
      `;

      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemInstruction,
        }
      });

      chatSessionRef.current = chat;

      // Trigger the first response (Greeting + Context Question)
      const result = await chat.sendMessage({ message: "Jsem připraven. Pozdrav mě a zeptej se na potřebné informace pro tento úkol." });
      const responseText = result.text;

      // Safe access to text
      if (responseText) {
          setChatHistory([{ role: 'model', text: responseText }]);
      } else {
          setChatHistory([{ role: 'model', text: "Zdravím! S čím vám mohu pomoci ohledně tohoto nastavení?" }]);
      }

    } catch (error) {
      console.error("AI Init Error:", error);
      let errorMessage = "Omlouvám se, ale nepodařilo se navázat spojení s AI expertem. Zkuste to prosím později.";
      if (error instanceof Error && error.message.includes("Missing API Key")) {
        errorMessage = "Chyba konfigurace: Chybí API klíč (API_KEY).";
      }
      setChatHistory([{ role: 'model', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputMessage.trim() && attachments.length === 0) || loading || !chatSessionRef.current) return;

    const currentMessage = inputMessage;
    const currentAttachments = [...attachments];
    
    // Optimistic update
    const userMessageDisplay: Message = {
      role: 'user',
      text: currentMessage,
      images: currentAttachments.map(a => a.preview)
    };

    setChatHistory(prev => [...prev, userMessageDisplay]);
    setInputMessage("");
    setAttachments([]);
    setLoading(true);

    try {
      // Prepare parts for API
      const parts: Part[] = [];
      
      // Add text if exists
      if (currentMessage.trim()) {
        parts.push({ text: currentMessage });
      }

      // Add images if exist
      for (const att of currentAttachments) {
        const part = await fileToGenerativePart(att.file);
        parts.push(part);
      }
      
      // Send to Gemini
      // If no text but images, parts is valid. If text only, parts is valid.
      const result = await chatSessionRef.current.sendMessage({
         message: parts
      });

      const responseText = result.text;
      if (responseText) {
        setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'model', text: "Omlouvám se, nerozuměl jsem. Můžete to zkusit znovu?" }]);
      }

    } catch (error) {
      console.error("Send Error:", error);
      setChatHistory(prev => [...prev, { role: 'model', text: "Došlo k chybě při zpracování odpovědi. Zkuste to prosím znovu." }]);
    } finally {
      setLoading(false);
    }
  };

  // File Handling
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    const newAttachments = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Drag & Drop
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
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
                    Proveďte kompletní kontrolu. Zaškrtněte splněné bod.
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
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 group">
                            <div className="flex items-start gap-4 flex-grow cursor-pointer" onClick={() => toggleCheck(item.id)}>
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
                                className="ml-10 sm:ml-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-400 hover:text-white bg-pink-500/10 hover:bg-pink-500/20 px-3 py-1.5 rounded-full transition-all border border-pink-500/20 hover:border-pink-500/40 whitespace-nowrap w-fit"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowChat(false)}></div>
            
            {/* Chat Container */}
            <div 
              className={`relative bg-[#111] border border-white/10 w-full md:max-w-2xl h-full md:h-[80vh] md:rounded-2xl shadow-2xl flex flex-col animate-fade-in-up overflow-hidden ${isDragging ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)]' : ''}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
                
                {/* Drag Overlay with instruction */}
                {isDragging && (
                  <div className="absolute inset-0 bg-pink-500/20 z-50 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                    <div className="bg-[#111] p-6 rounded-xl border border-pink-500 text-pink-400 font-bold flex flex-col items-center gap-3 shadow-2xl scale-110 transition-transform">
                       <div className="p-3 bg-pink-500/20 rounded-full">
                         <ImageIcon className="w-8 h-8" />
                       </div>
                       <span>Pusťte soubor pro vložení do chatu</span>
                    </div>
                  </div>
                )}

                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1a1a1a] flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              Bezpečnostní Průvodce
                              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400 font-mono">AI</span>
                            </h3>
                            <p className="text-xs text-gray-400 truncate max-w-[200px] sm:max-w-xs">{chatTitle}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#050505]">
                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === 'model' ? 'bg-pink-500/20 text-pink-400' : 'bg-white/10 text-white'}`}>
                                {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            
                            <div className="flex flex-col gap-2 max-w-[85%]">
                              {/* Render Images if any */}
                              {msg.images && msg.images.length > 0 && (
                                <div className={`flex flex-wrap gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                  {msg.images.map((img, imgIdx) => (
                                    <img 
                                      key={imgIdx} 
                                      src={img} 
                                      alt="Uploaded content" 
                                      className="max-w-[150px] max-h-[150px] rounded-lg border border-white/10 object-cover" 
                                    />
                                  ))}
                                </div>
                              )}

                              <div className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.role === 'model' ? 'bg-[#1a1a1a] text-gray-200 border border-white/5 rounded-tl-none' : 'bg-pink-600 text-white rounded-tr-none'}`}>
                                  <div className="markdown-body" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                              </div>
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="flex gap-4 animate-fade-in-up">
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
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-[#1a1a1a] flex-shrink-0">
                    
                    {/* Attachments Preview */}
                    {attachments.length > 0 && (
                      <div className="flex gap-3 mb-3 overflow-x-auto pb-2">
                        {attachments.map((att, idx) => (
                          <div key={idx} className="relative group flex-shrink-0">
                            <img src={att.preview} alt="preview" className="w-16 h-16 rounded-lg object-cover border border-white/20" />
                            <button 
                              onClick={() => removeAttachment(idx)}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="p-3 text-gray-400 hover:text-pink-400 hover:bg-white/5 rounded-xl transition-colors"
                          title="Nahrát obrázek (screenshot)"
                        >
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          multiple 
                          onChange={handleFileSelect}
                        />

                        <textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Napište zprávu nebo přetáhněte screenshot..."
                          className={`flex-grow bg-[#0a0a0a] border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500/50 resize-none max-h-32 min-h-[44px] transition-colors ${isDragging ? 'border-pink-500 bg-pink-500/10' : 'border-white/10'}`}
                          rows={1}
                        />
                        
                        <button 
                          type="submit"
                          disabled={loading || (!inputMessage.trim() && attachments.length === 0)}
                          className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </form>
                    <p className="text-[10px] text-gray-500 text-center mt-2">
                       AI může dělat chyby. Citlivá data na screenshotech začerněte.
                    </p>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default AuditScreen;
