
import { Block, Video } from './types';

export const cyberVideos: Video[] = [
  { id: 1, title: "Kybernetická bezpečnost - Úvod", description: "Základní principy ochrany digitální identity.", youtubeId: "PE8nf8Tmf78" },
  { id: 2, title: "Jak si nenechat vyluxovat účet", description: "Praktické rady pro ochranu bankovnictví.", youtubeId: "wkfXUF0-F7Q" },
  { id: 3, title: "Hrozby na internetu", description: "Přehled aktuálních hrozeb a kyberkriminality.", youtubeId: "T6FRDPBApaE" },
  { id: 4, title: "Sociální inženýrství", description: "Jak útočníci manipulují s lidskou psychikou.", youtubeId: "gsw5jBeuaL8" },
  { id: 5, title: "Silná a bezpečná hesla", description: "Návod na tvorbu a správu hesel.", youtubeId: "4rNCgLfqfQw" },
  { id: 6, title: "Dvoufaktorové ověření (2FA)", description: "Nejdůležitější vrstva vaší digitální obrany.", youtubeId: "P0Pmiqe9rQg" },
  { id: 7, title: "Veřejné Wi-Fi sítě", description: "Rizika bezplatného internetu v kavárnách.", youtubeId: "UuLCdnZihI4" },
  { id: 8, title: "Zabezpečení mobilního telefonu", description: "Nastavení soukromí ve vašem smartphonu.", youtubeId: "iNmS1ahVWUs" },
  { id: 9, title: "Pravidla zálohování", description: "Jak nepřijít o svá data při útoku.", youtubeId: "dGJTQgrEc2Y" }
];

export const aiVideos: Video[] = [
  { id: 1, title: "Co je to Generativní AI?", description: "Vysvětlení principů LLM a budoucnosti.", youtubeId: "hfUIWp0xpg0" },
  { id: 2, title: "ChatGPT: Tipy a triky", description: "Efektivní využití ChatGPT pro produktivitu.", youtubeId: "L_Guz73e6fw" }
];

export const courseData: Block[] = [
  {
    id: 1, title: "Blok 1: Úvod do kyberbezpečnosti", description: "Psychologie útoků a CIA triáda.", icon: "ShieldAlert",
    questions: [
      { id: 1, question: "Jaká je základní myšlenka útoků?", options: ["Technologie", "Člověk", "Hardware", "Servery"], correctAnswer: 1, hint: "Útočník prolamuje člověka, ne systém." },
      { id: 2, question: "Co znamená zkratka CIA?", options: ["Agentura", "Důvěrnost, Integrita, Dostupnost", "Počítače", "Audit"], correctAnswer: 1, hint: "Confidentiality, Integrity, Availability." },
      { id: 3, question: "Co je porušení Integrity?", options: ["Únik dat", "Změna dat", "Výpadek", "Heslo"], correctAnswer: 1, hint: "Neoprávněná úprava obsahu." },
      { id: 4, question: "Kolik útoků začíná lidskou chybou?", options: ["10%", "50%", "90%", "0%"], correctAnswer: 2, hint: "Naprostá většina." },
      { id: 5, question: "Které emoce se zneužívají?", options: ["Radost", "Strach a spěch", "Nuda", "Láska"], correctAnswer: 1, hint: "Tlak a urgence." },
      { id: 6, question: "Co je Phishing?", options: ["Ryby", "Podvodné maily", "Antivirus", "Marketing"], correctAnswer: 1, hint: "Snaha vylákat údaje." },
      { id: 7, question: "Co je Vishing?", options: ["Video", "Podvodný hovor", "Rybaření", "Vir"], correctAnswer: 1, hint: "Voice Phishing." },
      { id: 8, question: "Co je Ransomware?", options: ["Čistič", "Vyděračský kód", "Ochrana", "Hudba"], correctAnswer: 1, hint: "Zašifruje data za výkupné." },
      { id: 9, question: "Útok na důvěrnost?", options: ["Únik hesel", "Změna webu", "Výpadek", "Zpomalení"], correctAnswer: 0, hint: "Data vidí nepovolaný." },
      { id: 10, question: "Proč útočí na lidi?", options: ["Nuda", "Nemají data", "Levné a efektivní", "Omyl"], correctAnswer: 2, hint: "Automatizace a škálovatelnost." }
    ]
  },
  {
    id: 2, title: "Blok 2: Základy internetu", description: "HTTPS, domény a ochrana účtů.", icon: "Globe",
    questions: [
      { id: 1, question: "Zámeček v prohlížeči znamená bezpečí?", options: ["Ano", "Ne, jen šifrování", "Ano, od Google", "Bez virů"], correctAnswer: 1, hint: "Šifrovaný může být i podvodný web." },
      { id: 2, question: "Která doména je podezřelá pro banku?", options: ["banka.cz", "ib.banka.cz", "banka-overeni.cz", "platby.banka.cz"], correctAnswer: 2, hint: "Falešná hlavní doména." },
      { id: 3, question: "Co je DNS?", options: ["Doprava", "Překlad jmen na IP", "Antivirus", "Notář"], correctAnswer: 1, hint: "Telefonní seznam internetu." },
      { id: 4, question: "Proč zkracovače odkazů?", options: ["Místo", "Zmatení oběti", "Levnější", "Rychlost"], correctAnswer: 1, hint: "Skrytí cílové adresy." },
      { id: 5, question: "Silné heslo?", options: ["Jméno", "Krátké", "Dlouhé a unikátní", "Stejné všude"], correctAnswer: 2, hint: "Délka je klíčová." },
      { id: 6, question: "Správce hesel?", options: ["Pamatuje si a generuje", "Mění hesla", "Posílá maily", "Hledá viry"], correctAnswer: 0, hint: "Trezor na hesla." },
      { id: 7, question: "Co je 2FA?", options: ["Dvě hesla", "Heslo + další faktor", "Dva PC", "Pravopis"], correctAnswer: 1, hint: "Dva nezávislé způsoby." },
      { id: 8, question: "NENÍ znakem phishingu?", options: ["Urgencne", "Adresa", "Osobní oslovení", "Chyby"], correctAnswer: 2, hint: "Masový útok je neosobní." },
      { id: 9, question: "Ukládání v prohlížeči?", options: ["Bezpečné", "Riziko malwaru", "Trezor", "Pohodlné"], correctAnswer: 1, hint: "Viry je umí vybrat." },
      { id: 10, question: "uBlock Origin?", options: ["Blokování reklam", "Video", "Hesla", "Krypto"], correctAnswer: 0, hint: "Odstraňuje rizikový obsah." }
    ]
  },
  { id: 3, title: "Blok 3: Zařízení a sítě", description: "Zabezpečení PC a Wi-Fi.", icon: "Wifi", questions: [
    { id: 1, question: "Aktualizace jsou k čemu?", options: ["Vzhled", "Oprava chyb", "Zpomalení", "Emoji"], correctAnswer: 1, hint: "Zalepují díry pro hackery." },
    { id: 2, question: "Firewall?", options: ["Hudba", "Kontrola provozu", "Antivir", "Chlazení"], correctAnswer: 1, hint: "Síto pro data." },
    { id: 3, question: "Stačí Defender?", options: ["Ne", "Ano, dobrý základ", "Placený", "Jen offline"], correctAnswer: 1, hint: "Dnes velmi silný." },
    { id: 4, question: "Nový router?", options: ["Zapojit", "Změnit hesla", "Schovat", "Nic"], correctAnswer: 1, hint: "Výchozí hesla jsou známá." },
    { id: 5, question: "Kdy VPN?", options: ["Vždy", "Veřejná Wi-Fi", "Hry", "Rychlost"], correctAnswer: 1, hint: "Šifruje tunel." },
    { id: 6, question: "Pravidlo 3-2-1?", options: ["3 kopie, 2 média, 1 jinde", "3 disky", "3 hesla", "Odpočet"], correctAnswer: 0, hint: "Zálohovací klasika." },
    { id: 7, question: "Ztráta mobilu?", options: ["Nový", "Smazat a blokovat", "Facebook", "Čekat"], correctAnswer: 1, hint: "Vzdálená správa." },
    { id: 8, question: "Wi-Fi šifrování?", options: ["WEP", "WPA", "WPA3", "Žádné"], correctAnswer: 2, hint: "Nejnovější je nejlepší." },
    { id: 9, question: "IoT rizika?", options: ["Slabé zabezpečení", "Cena", "Spotřeba", "Vzhled"], correctAnswer: 0, hint: "Často chybí aktualizace." },
    { id: 10, question: "Guest Network?", options: ["Rychlost", "Oddělení návštěv", "Hry", "K ničemu"], correctAnswer: 1, hint: "Návštěvník nevidí váš PC." }
  ]},
  { id: 4, title: "Blok 4: Bankovnictví", description: "Ochrana karet a financí.", icon: "CreditCard", questions: [
    { id: 1, question: "Vishing?", options: ["Vir", "Hovor", "Mail", "Krypto"], correctAnswer: 1, hint: "Podvodný telefonát." },
    { id: 2, question: "Chce banka heslo?", options: ["Ano", "Nikdy", "U potíží", "Občas"], correctAnswer: 1, hint: "Nikdy ho nepotřebují." },
    { id: 3, question: "Bazar podvod?", options: ["Cena", "Falešný kurýr", "Předání", "Dobírka"], correctAnswer: 1, hint: "Chtějí údaje o kartě k 'příjmu'." },
    { id: 4, question: "3D Secure?", options: ["Krása", "Potvrzení v mobilu", "Sleva", "Pojištění"], correctAnswer: 1, hint: "Druhý faktor." },
    { id: 5, question: "Podvodná faktura?", options: ["Adresa", "Změna účtu", "DPH", "Splatnost"], correctAnswer: 1, hint: "Změněné číslo účtu." },
    { id: 6, question: "Neposílat mailem?", options: ["Fotky", "OP a kartu", "Odkazy", "Úkoly"], correctAnswer: 1, hint: "Citlivé doklady." },
    { id: 7, question: "Podezření na podvod?", options: ["Smazat", "Blokovat hned", "Policie mail", "Čekat"], correctAnswer: 1, hint: "Čas je kritický." },
    { id: 8, question: "Neznámý e-shop?", options: ["Ano", "Recenze", "Vždy", "Zámeček"], correctAnswer: 1, hint: "Vždy ověřit." },
    { id: 9, question: "Investiční podvod?", options: ["Akcie", "Garantovaný zisk", "Spoření", "Dluhopis"], correctAnswer: 1, hint: "Nereálné sliby." },
    { id: 10, question: "Syn v nouzi?", options: ["Klíče", "Peníze z jiného čísla", "Reklama", "Škola"], correctAnswer: 1, hint: "Vždy volat zpět na staré číslo." }
  ]},
  { id: 5, title: "Blok 5: Kryptoměny", description: "Blockchain a peněženky.", icon: "Bitcoin", questions: [
    { id: 1, question: "Vratné platby?", options: ["Ano", "Ne", "Bitcoin", "Banka"], correctAnswer: 1, hint: "Jsou definitivní." },
    { id: 2, question: "Co je Seed?", options: ["Mince", "12-24 slov", "Heslo k app", "Burza"], correctAnswer: 1, hint: "Klíč k obnově." },
    { id: 3, question: "Kam Seed?", options: ["Mail", "Papír offline", "Mobil", "USB"], correctAnswer: 1, hint: "Jen offline." },
    { id: 4, question: "HW peněženka?", options: ["Kůže", "Trezor (offline)", "Burza", "Karta"], correctAnswer: 1, hint: "Klíče v bezpečí." },
    { id: 5, question: "Chce podpora Seed?", options: ["Ano", "Nikdy", "U údržby", "U ztráty"], correctAnswer: 1, hint: "Kdo chce seed, je podvodník." },
    { id: 6, question: "Rug Pull?", options: ["Výměna", "Útěk s penězi", "Nákup", "Graf"], correctAnswer: 1, hint: "Vypaření projektu." },
    { id: 7, question: "QR kód zdarma?", options: ["Zisk", "Drainer (vykradení)", "Nic", "Sleva"], correctAnswer: 1, hint: "Schválení transakce výběru." },
    { id: 8, question: "Custodial?", options: ["Moje", "Cizí (burza)", "Papír", "HW"], correctAnswer: 1, hint: "Nemáte klíče." },
    { id: 9, question: "Podvod v kryptu?", options: ["Registrace", "Garantovaný zisk", "Riziko", "Licence"], correctAnswer: 1, hint: "Nic není jisté." },
    { id: 10, question: "Pig Butchering?", options: ["Těžba", "Budování důvěry", "NFT", "Jídlo"], correctAnswer: 1, hint: "Dlouhý podvod." }
  ]},
  { id: 6, title: "Blok 6: Incidenty", description: "První pomoc při útoku.", icon: "Siren", questions: [
    { id: 1, question: "Pravidlo č. 1?", options: ["Smazat", "Nepanikařit", "Vypnout proud", "Křičet"], correctAnswer: 1, hint: "Klid." },
    { id: 2, question: "Napadený PC?", options: ["Nechat", "Odpojit síť", "Restart", "Prodat"], correctAnswer: 1, hint: "Izolace." },
    { id: 3, question: "Kde měnit heslo?", options: ["Stejný PC", "Jiný bezpečný", "Nikde", "Poznámky"], correctAnswer: 1, hint: "Keylogger v napadeném PC." },
    { id: 4, question: "Have I Been Pwned?", options: ["Hra", "Kontrola úniku", "Antivir", "Sítě"], correctAnswer: 1, hint: "Databáze úniků." },
    { id: 5, question: "Ransomware?", options: ["Platit", "Neplatit", "Smazat", "Čekat"], correctAnswer: 1, hint: "Bez záruky dat." },
    { id: 6, question: "Ztráta karty?", options: ["Mail", "Blokovat v app", "Hledat", "Nic"], correctAnswer: 1, hint: "Okamžitě." },
    { id: 7, question: "Odhlásit vše?", options: ["Smazání", "Vyhození útočníka", "Wi-Fi", "Paušál"], correctAnswer: 1, hint: "Zrušení session." },
    { id: 8, question: "Mazat logy?", options: ["Ano", "Nikdy", "Staré", "Velké"], correctAnswer: 1, hint: "Důkazy." },
    { id: 9, question: "Hlášení v ČR?", options: ["Rodině", "NÚKIB / Policie", "FB", "Nikam"], correctAnswer: 1, hint: "Oficiální místa." },
    { id: 10, question: "Reinstalace?", options: ["Ano", "Ne", "Jen Windows", "Bez zálohy"], correctAnswer: 0, hint: "Jediná jistota." }
  ]},
  { id: 7, title: "Blok 7: Pravidla", description: "Zálohování a hygiena.", icon: "ClipboardCheck", questions: [
    { id: 1, question: "Nejdůležitější?", options: ["HW", "Systém a návyky", "Internet", "Vzhled"], correctAnswer: 1, hint: "Lidé." },
    { id: 2, question: "Minimální oprávnění?", options: ["Nikdo", "Jen co potřebuje", "Admin vše", "Uživatel"], correctAnswer: 1, hint: "Omezení škod." },
    { id: 3, question: "Nucená změna hesla?", options: ["Ano", "Ne (rizikové)", "Měsíc", "Děti"], correctAnswer: 1, hint: "Působí frustraci." },
    { id: 4, question: "Audit log?", options: ["Kniha", "Záznam aktivity", "Hesla", "Vir"], correctAnswer: 1, hint: "Historie akcí." },
    { id: 5, question: "Odchod kolegy?", options: ["Oslava", "Zrušit přístup", "Nechat", "Jméno"], correctAnswer: 1, hint: "Bezpečnost." },
    { id: 6, question: "Offsite záloha?", options: ["Disk", "Mimo budovu", "Smazaná", "Papír"], correctAnswer: 1, hint: "Proti požáru." },
    { id: 7, question: "Sdílení odkazy?", options: ["Ano", "Ne, únik", "Fotky", "Vždy"], correctAnswer: 1, hint: "Raději jmenovitě." },
    { id: 8, question: "Klasifikace dat?", options: ["Abeceda", "Dle citlivosti", "Mazání", "Komprese"], correctAnswer: 1, hint: "Úroveň ochrany." },
    { id: 9, question: "Je to jednorázové?", options: ["Ano", "Ne, proces", "Antivir", "Jen IT"], correctAnswer: 1, hint: "Stálá změna." },
    { id: 10, question: "Shadow IT?", options: ["Tma", "Neschválený SW", "Hacking", "Úspora"], correctAnswer: 1, hint: "Osobní maily v práci." }
  ]},
  { id: 8, title: "Blok 8: NIS2", description: "Legislativa a povinnosti.", icon: "Scale", questions: [
    { id: 1, question: "Co je NIS2?", options: ["Vir", "EU směrnice", "HW", "Program"], correctAnswer: 1, hint: "Zpřísnění pravidel." },
    { id: 2, question: "Koho se týká?", options: ["Armády", "Tisíců firem", "Jen IT", "Lidí"], correctAnswer: 1, hint: "Klíčové sektory." },
    { id: 3, question: "Co je NÚKIB?", options: ["Banka", "Úřad pro kyber. bezp.", "PC", "Zkratka"], correctAnswer: 1, hint: "Regulátor ČR." },
    { id: 4, question: "Risk management?", options: ["Pojištění", "Analýza hrozeb", "Sázky", "Chyby"], correctAnswer: 1, hint: "Základ povinností." },
    { id: 5, question: "Hrozí pokuty?", options: ["Ne", "Ano", "Varování", "Praha"], correctAnswer: 1, hint: "Velmi vysoké." },
    { id: 6, question: "Hlášení firem?", options: ["Nic", "Incidenty do 24h", "Dovolená", "PC"], correctAnswer: 1, hint: "Sdílení varování." },
    { id: 7, question: "I dodavatelé?", options: ["Ne", "Ano", "Velcí", "Po roce"], correctAnswer: 1, hint: "Supply chain." },
    { id: 8, question: "Kdo nese odpovědnost?", options: ["IT", "Vedení", "Všichni", "Stát"], correctAnswer: 1, hint: "Manažerské téma." },
    { id: 9, question: "Cíl NIS2?", options: ["Zisk", "Odolnost EU", "Nákup", "Sledování"], correctAnswer: 1, hint: "Fungování státu." },
    { id: 10, question: "Dopad na lidi?", options: ["Ne", "Bezpečnější služby", "Certifikát", "Nesmí web"], correctAnswer: 1, hint: "Ochrana infrastruktury." }
  ]},
  { id: 9, title: "Blok 9: Role AI", description: "Deepfakes a budoucnost.", icon: "Bot", questions: [
    { id: 1, question: "AI a Phishing?", options: ["Horší", "Bez chyb a osobní", "Nijak", "Nechodí"], correctAnswer: 1, hint: "Kvalita textů." },
    { id: 2, question: "Voice Cloning?", options: ["Echo", "Klonování hlasu", "Odposlech", "Záznam"], correctAnswer: 1, hint: "Stačí krátký vzorek." },
    { id: 3, question: "Deepfake?", options: ["Spánek", "Falešné video", "Fotka", "Monitor"], correctAnswer: 1, hint: "Syntetické médium." },
    { id: 4, question: "Obrana hlasu?", options: ["Věřit", "Zavěsit a volat staré číslo", "Peníze", "Antivir"], correctAnswer: 1, hint: "Ověření." },
    { id: 5, question: "AI v obraně?", options: ["Ne", "Detekce anomálií", "Apple", "Zpomalení"], correctAnswer: 1, hint: "Analýza logů." },
    { id: 6, question: "Syntetické identity?", options: ["Roboti", "Lidé vytvoření AI", "Hra", "Karty"], correctAnswer: 1, hint: "Falešné profily." },
    { id: 7, question: "Prompt Injection?", options: ["Vakcína", "Útok na AI model", "Psaní", "Tisk"], correctAnswer: 1, hint: "Obejití pravidel." },
    { id: 8, question: "AI malware?", options: ["Ne", "Zrychluje vývoj", "Windows", "Samo"], correctAnswer: 1, hint: "Pomocník hackerů." },
    { id: 9, question: "Obrana?", options: ["HW", "Kritické myšlení", "Nic", "Strach"], correctAnswer: 1, hint: "Skepticismus." },
    { id: 10, question: "Liar's Dividend?", options: ["Odměna", "Popírání pravdy (fejk)", "Pokuta", "Bonus"], correctAnswer: 1, hint: "Eroze důvěry." }
  ]}
];

export const aiCourseData: Block[] = [
  { id: 1, title: "Blok 1: AI Pracuje pro Vás", description: "Základy a LLM modely.", icon: "Cpu", questions: [
    { id: 1, question: "Základ textových AI?", options: ["HW", "LLM", "Web", "Disk"], correctAnswer: 1, hint: "Large Language Models." },
    { id: 2, question: "Co je token?", options: ["Mince", "Jednotka textu", "Heslo", "Ikona"], correctAnswer: 1, hint: "Slova se dělí na tokeny." }
  ]},
  { id: 2, title: "Blok 2: ChatGPT", description: "Rozhraní a historie.", icon: "MessageSquare", questions: [
    { id: 1, question: "Co je ChatGPT?", options: ["OS", "Webové LLM", "PC", "Hra"], correctAnswer: 1, hint: "Rozhraní pro konverzaci." }
  ]},
  { id: 3, title: "Blok 3: Gemini", description: "Ekosystém Google.", icon: "Layout", questions: [
    { id: 1, question: "Kdo vyvinul Gemini?", options: ["OpenAI", "Google", "MS", "Apple"], correctAnswer: 1, hint: "Google." }
  ]},
  { id: 4, title: "Blok 4: Prompty", description: "Struktura zadání.", icon: "Command", questions: [
    { id: 1, question: "Co je prompt?", options: ["Vir", "Instrukce", "Výstup", "Značka"], correctAnswer: 1, hint: "Zadání." }
  ]},
  { id: 5, title: "Blok 5: Praktické texty", description: "Maily a shrnutí.", icon: "FileText", questions: [
    { id: 1, question: "AI a maily?", options: ["Sama", "Návrh a úprava", "Spam", "Banka"], correctAnswer: 1, hint: "Pomocník." }
  ]},
  { id: 6, title: "Blok 6: Kancelář", description: "Office a Workspace.", icon: "Briefcase", questions: [
    { id: 1, question: "MS AI?", options: ["Cortana", "Copilot", "Siri", "Alexa"], correctAnswer: 1, hint: "Copilot." }
  ]},
  { id: 7, title: "Blok 7: NotebookLM", description: "Analýza dokumentů.", icon: "BookOpen", questions: [
    { id: 1, question: "Funkce?", options: ["Hry", "Analýza vašich dat", "Kód", "Fotky"], correctAnswer: 1, hint: "Vlastní zdroje." }
  ]},
  { id: 8, title: "Blok 8: Perplexity", description: "AI Vyhledávač.", icon: "Search", questions: [
    { id: 1, question: "Co je?", options: ["Prohlížeč", "Vyhledávač s citacemi", "Sít", "Shop"], correctAnswer: 1, hint: "Vždy cituje." }
  ]},
  { id: 9, title: "Blok 9: Bezpečnost", description: "GDPR a data.", icon: "ShieldCheck", questions: [
    { id: 1, question: "Halucinace?", options: ["Sen", "Nepravda", "Vypnutí", "Internet"], correctAnswer: 1, hint: "Faktická chyba." }
  ]}
];
