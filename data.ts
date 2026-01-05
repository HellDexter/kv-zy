
import { Block, Video } from './types';

export const cyberVideos: Video[] = [
  {
    id: 1,
    title: "Kybernetická bezpečnost - Úvod",
    description: "Základní principy ochrany digitální identity a proč je důležité se vzdělávat v dnešní době.",
    youtubeId: "PE8nf8Tmf78"
  },
  {
    id: 2,
    title: "Jak si nenechat vyluxovat účet",
    description: "Praktické rady, jak chránit své bankovnictví před moderními metodami podvodníků.",
    youtubeId: "wkfXUF0-F7Q"
  },
  {
    id: 3,
    title: "Hrozby na internetu a kyberkriminalita",
    description: "Přehled aktuálních hrozeb, na které může narazit každý občan při běžném surfování.",
    youtubeId: "T6FRDPBApaE"
  },
  {
    id: 4,
    title: "Jak funguje Phishing?",
    description: "Detailní pohled na nejčastější metodu útoku a jak ji včas rozpoznat v e-mailu či SMS.",
    youtubeId: "Y7zNlEMDmI8"
  },
  {
    id: 5,
    title: "Sociální inženýrství",
    description: "Jak útočníci manipulují s lidskou psychikou, aby získali přístup k citlivým datům.",
    youtubeId: "gsw5jBeuaL8"
  },
  {
    id: 6,
    title: "Silná a bezpečná hesla",
    description: "Návod na tvorbu a správu hesel, která odolají moderním útokům hrubou silou.",
    youtubeId: "4rNCgLfqfQw"
  },
  {
    id: 7,
    title: "Dvoufaktorové ověření (2FA)",
    description: "Proč je druhé heslo v mobilu nejdůležitější vrstvou vaší digitální obrany.",
    youtubeId: "P0Pmiqe9rQg"
  },
  {
    id: 8,
    title: "Veřejné Wi-Fi sítě",
    description: "Rizika bezplatného internetu v kavárnách a jak se bezpečně připojit na cestách.",
    youtubeId: "UuLCdnZihI4"
  },
  {
    id: 9,
    title: "Zabezpečení mobilního telefonu",
    description: "Praktické tipy pro nastavení soukromí a bezpečnosti ve vašem smartphonu.",
    youtubeId: "iNmS1ahVWUs"
  },
  {
    id: 10,
    title: "Pravidla bezpečného zálohování",
    description: "Jak nepřijít o svá data při útoku ransomware nebo poruše hardwaru.",
    youtubeId: "dGJTQgrEc2Y"
  }
];

export const aiVideos: Video[] = [
  {
    id: 1,
    title: "Co je to Generativní AI?",
    description: "Vysvětlení principů LLM a budoucnosti práce s umělou inteligencí.",
    youtubeId: "hfUIWp0xpg0"
  },
  {
    id: 2,
    title: "ChatGPT: Tipy a triky",
    description: "Jak efektivně využívat ChatGPT pro každodenní produktivitu.",
    youtubeId: "L_Guz73e6fw"
  }
];

export const courseData: Block[] = [
  {
    id: 1,
    title: "Blok 1: Úvod do kyberbezpečnosti",
    description: "Psychologie útoků, CIA triáda a proč je člověk hlavním cílem.",
    icon: "ShieldAlert",
    gammaUrl: "https://gamma.app/embed/2iu9jifo4h854di",
    questions: [
      { id: 1, question: "Jaká je základní myšlenka moderních kybernetických útoků?", options: ["Útočník prolamuje technologii, ne lidi.", "Útočník neprolamuje zabezpečení, prolamuje člověka.", "Útoky cílí pouze na servery velkých firem.", "Hlavním cílem je zničit hardware."], correctAnswer: 1, hint: "Technologie jsou dnes silné, proto útočníci cílí na nejslabší článek – lidské emoce a chyby." },
      { id: 2, question: "Co znamená zkratka CIA v kontextu kyberbezpečnosti?", options: ["Central Intelligence Agency", "Computer Internet Access", "Confidentiality, Integrity, Availability (Důvěrnost, Integrita, Dostupnost)", "Control, Inspect, Audit"], correctAnswer: 2, hint: "Jedná se o tři pilíře bezpečnosti. Pokud selže jeden, dojde k incidentu." },
      { id: 3, question: "Co znamená porušení 'Integrity' dat?", options: ["Data unikla na veřejnost.", "Data byla neoprávněně změněna nebo upravena (např. číslo účtu na faktuře).", "Služba je nedostupná.", "Heslo bylo prozrazeno."], correctAnswer: 1, hint: "Představte si, že někdo přepíše obsah dokumentu bez vašeho vědomí." },
      { id: 4, question: "Kolik procent útoků přibližně začíná lidskou chybou (např. kliknutím)?", options: ["Asi 10 %", "Kolem 50 %", "Až 90 %", "Méně než 1 %"], correctAnswer: 2, hint: "Většina útoků vyžaduje aktivní zapojení oběti, jako je otevření přílohy." },
      { id: 5, question: "Jaké emoce útočníci nejčastěji zneužívají?", options: ["Radost a klid", "Strach, urgentnost (spěch), zvědavost a autoritu", "Nudu a lhostejnost", "Lásku k technologiím"], correctAnswer: 1, hint: "Útočník vás chce dostat pod tlak, abyste přestali racionálně myslet." },
      { id: 6, question: "Co je to Phishing?", options: ["Lov ryb na internetu", "Falešné e-maily vydávající se za důvěryhodné instituce", "Druh antiviru", "Legální marketingová strategie"], correctAnswer: 1, hint: "Cílem je 'ułowit' vaše hesla nebo údaje o kartě pomocí podvodné zprávy." },
      { id: 7, question: "Co je to Vishing?", options: ["Video hovor", "Podvodný telefonát (Voice Phishing)", "Virtuální rybaření", "Vir v počítači"], correctAnswer: 1, hint: "Pachatel vám volá a vydává se například za bankéře nebo policistu." },
      { id: 8, question: "Co je to Ransomware?", options: ["Software na čištění PC", "Škodlivý kód, který zašifruje data a žádá výkupné", "Ochrana proti phishingu", "Program pro stahování hudby"], correctAnswer: 1, hint: "Útočník vaše data 'unese' a chce zaplatit za jejich vrácení." },
      { id: 9, question: "Co je typickým znakem útoku na 'důvěrnost' (Confidentiality)?", options: ["Únik hesel z databáze", "Změna obsahu webu", "Výpadek e-mailové služby", "Zpomalení počítače"], correctAnswer: 0, hint: "Data vidí někdo, kdo k nim nemá mít přístup." },
      { id: 10, question: "Proč útočníci cílí na běžné uživatele?", options: ["Protože nemají co dělat", "Protože běžní uživatelé nemají data", "Protože nástroje pro útoky jsou levné a automatizované", "Je to omyl, cílí jen na vlády"], correctAnswer: 2, hint: "Každý má cenná data (identitu, finance) a útoky lze provádět hromadně." }
    ]
  },
  {
    id: 2,
    title: "Blok 2: Základy bezpečnosti na internetu",
    description: "Domény, HTTPS, rozpoznání podvodů a ochrana účtů.",
    icon: "Globe",
    gammaUrl: "https://gamma.app/embed/gtqi1rkuvdn8gp9",
    questions: [
      { id: 1, question: "Znamená zelený zámeček (HTTPS) v prohlížeči, že je web bezpečný a poctivý?", options: ["Ano, vždy.", "Ne, znamená pouze to, že komunikace je šifrovaná.", "Ano, garantuje to Google.", "Znamená to, že web neobsahuje viry."], correctAnswer: 1, hint: "I podvodná stránka může mít certifikát zdarma a mít zámeček." },
      { id: 2, question: "Která z těchto domén je s největší pravděpodobností podvodná (pokud hledáte ČSOB)?", options: ["www.csob.cz", "ib.csob.cz", "csob-overeni.cz/login", "platby.csob.cz"], correctAnswer: 2, hint: "Oficiální subdomény jsou před hlavní doménou. 'csob-overeni.cz' je úplně jiná doména." },
      { id: 3, question: "Co je to DNS?", options: ["Doručovací služba", "Systém překládající názvy webů (např. banka.cz) na IP adresy", "Druh antiviru", "Digitální Notářský Systém"], correctAnswer: 1, hint: "Funguje jako telefonní seznam internetu." },
      { id: 4, question: "Proč útočníci používají ve falešných odkazech zkracovače nebo překlepy?", options: ["Aby ušetřili místo", "Aby vás zmátli a vy jste si nevšimli, že nejste na oficiálním webu", "Je to levnější", "Aby se web rychleji načetl"], correctAnswer: 1, hint: "Doufají, že přehlédnete rozdíl mezi 'banka.cz' a 'banka-login.com'." },
      { id: 5, question: "Jaké je hlavní pravidlo pro silné heslo?", options: ["Jméno a rok narození", "Krátké, aby se dalo zapamatovat", "Dlouhé (14+ znaků), unikátní a složité", "Stejné pro všechny účty"], correctAnswer: 2, hint: "Délka je důležitější než složitost, ale unikátnost je klíčová." },
      { id: 6, question: "Co je úkolem správce hesel (Password Manager)?", options: ["Pamatovat si všechna vaše hesla a generovat nová silná", "Automaticky měnit hesla každý týden", "Posílat hesla e-mailem", "Jen kontrolovat viry"], correctAnswer: 0, hint: "Vy si pamatujete jen jedno 'master' heslo, on zbytek." },
      { id: 7, question: "Co je to 2FA (Dvoufaktorové ověřování)?", options: ["Přihlášení dvěma hesly", "Přihlášení heslem + druhým faktorem (např. aplikace v mobilu)", "Přihlášení na dvou počítačích", "Dvojitá kontrola pravopisu"], correctAnswer: 1, hint: "Zvyšuje bezpečnost tím, že útočníkovi nestačí ukrást jen heslo." },
      { id: 8, question: "Co NENÍ znakem phishingového e-mailu?", options: ["Naléhavá výzva k akci (do 24 hodin)", "Podezřelá adresa odesílatele", "Osobní oslovení a perfektní znalost vaší historie", "Gramatické chyby a špatná čeština"], correctAnswer: 2, hint: "Phishing je většinou masový a neosobní. Pokud zná detaily, může jít o cílený spear-phishing (vzácnější)." },
      { id: 9, question: "Je bezpečné ukládat hesla přímo do prohlížeči bez ochrany?", options: ["Ano, je to pohodlné", "Ne, malware je může snadno vykrást", "Ano, prohlížeč je trezor", "Záleží na značce počítače"], correctAnswer: 1, hint: "Prohlížeče často ukládají hesla slabě zabezpečená." },
      { id: 10, question: "K čemu slouží rozšíření 'uBlock Origin'?", options: ["K blokování reklam a škodlivých skriptů", "K přehrávání videí", "K tvorbě hesel", "K těžbě kryptoměn"], correctAnswer: 0, hint: "Blokováním reklam snižujete riziko, že kliknete na podvodný banner." }
    ]
  }
];

export const aiCourseData: Block[] = [
  {
    id: 1,
    title: "Blok 1: AI Pracuje pro Vás",
    description: "Základy generativní AI, modely velkého jazyka (LLM) a principy fungování.",
    icon: "Cpu",
    gammaUrl: "https://gamma.app/embed/axkx3j1bfk33ut7",
    questions: [
      { id: 1, question: "Co je základem dnešních AI nástrojů pro generování textu?", options: ["Hardware", "LLM modely (Large Language Models)", "Internetový prohlížeč", "Pevný disk"], correctAnswer: 1, hint: "LLM modely využívají statistické vztahy mezi slovy." },
      { id: 2, question: "Dokáže AI model pro text generovat obrázky?", options: ["Ano, automaticky", "Ne, každý typ obsahu vyžaduje specifický model", "Vždy", "Jen ve Windows"], correctAnswer: 1, hint: "Textové modely fungují jinak než obrazové modely." },
      { id: 3, question: "Co je to 'token'?", options: ["Mince", "Základní jednotka textu (slovo, část slova, znaménko)", "Druh hesla", "Ikona na ploše"], correctAnswer: 1, hint: "AI nečte slova jako my, ale rozkládá je na tokeny." },
      { id: 4, question: "Rozumí AI model realitě a významu slov?", options: ["Ano, plně", "Ne, pouze reprodukuje statistické vzorce z dat", "Rozumí jen česky", "Víc než člověk"], correctAnswer: 1, hint: "AI model je pokročilý statistický prediktor, nikoliv vědomí." },
      { id: 5, question: "Jaký je rozdíl mezi modelem a aplikací?", options: ["Není žádný", "Model je technologie (mozek), aplikace je rozhraní pro uživatele", "Model je hardware", "Aplikace je zdarma"], correctAnswer: 1, hint: "Příklad: GPT-4o je model, ChatGPT je aplikace." },
      { id: 6, question: "Z čeho se AI model učí?", options: ["Z baterií", "Z obrovských objemů dat (internet, knihy, články)", "Jen ze školních učebnic", "Samo od sebe v noci"], correctAnswer: 1, hint: "Učí se na stovkách gigabajtů až terabajtů textu." },
      { id: 7, question: "Co AI umí nejlépe?", options: ["Vařit kávu", "Shrnování, vysvětlování a generování textů", "Zaručit pravdu", "Předvídat budoucnost"], correctAnswer: 1, hint: "AI is skvělý asistent pro práci s informacemi." },
      { id: 8, question: "Může AI udělat faktickou chybu?", options: ["Nikdy", "Ano, může se mýlit, i když působí sebejistě", "Jen u matematiky", "Jen když nemá proud"], correctAnswer: 1, hint: "AI negarantuje přesnost, pouze pravděpodobnost." },
      { id: 9, question: "Co AI neumí?", options: ["Psát maily", "Chápat kontext lidsky a cítit emoce", "Vysvětlit pojem", "Učit se"], correctAnswer: 1, hint: "AI postrádá lidskou intuici a kulturní nuance." },
      { id: 10, question: "Kdo nese konečnou odpovědnost za výstup z AI?", options: ["Programátor", "Uživatel (člověk)", "Model", "Firma OpenAI"], correctAnswer: 1, hint: "AI je nástroj, člověk musí výsledek vždy zkontrolovat." }
    ]
  }
];
