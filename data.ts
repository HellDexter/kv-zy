
import { Block } from './types';

export const courseData: Block[] = [
  {
    id: 1,
    title: "Blok 1: Úvod do kyberbezpečnosti",
    description: "Psychologie útoků, CIA triáda a proč je člověk hlavním cílem.",
    icon: "ShieldAlert",
    gammaUrl: "https://gamma.app/embed/2iu9jifo4h854di",
    questions: [
      {
        id: 1,
        question: "Jaká je základní myšlenka moderních kybernetických útoků?",
        options: ["Útočník prolamuje technologii, ne lidi.", "Útočník neprolamuje zabezpečení, prolamuje člověka.", "Útoky cílí pouze na servery velkých firem.", "Hlavním cílem je zničit hardware."],
        correctAnswer: 1,
        hint: "Technologie jsou dnes silné, proto útočníci cílí na nejslabší článek – lidské emoce a chyby."
      },
      {
        id: 2,
        question: "Co znamená zkratka CIA v kontextu kyberbezpečnosti?",
        options: ["Central Intelligence Agency", "Computer Internet Access", "Confidentiality, Integrity, Availability (Důvěrnost, Integrita, Dostupnost)", "Control, Inspect, Audit"],
        correctAnswer: 2,
        hint: "Jedná se o tři pilíře bezpečnosti. Pokud selže jeden, dojde k incidentu."
      },
      {
        id: 3,
        question: "Co znamená porušení 'Integrity' dat?",
        options: ["Data unikla na veřejnost.", "Data byla neoprávněně změněna nebo upravena (např. číslo účtu na faktuře).", "Služba je nedostupná.", "Heslo bylo prozrazeno."],
        correctAnswer: 1,
        hint: "Představte si, že někdo přepíše obsah dokumentu bez vašeho vědomí."
      },
      {
        id: 4,
        question: "Kolik procent útoků přibližně začíná lidskou chybou (např. kliknutím)?",
        options: ["Asi 10 %", "Kolem 50 %", "Až 90 %", "Méně než 1 %"],
        correctAnswer: 2,
        hint: "Většina útoků vyžaduje aktivní zapojení oběti, jako je otevření přílohy."
      },
      {
        id: 5,
        question: "Jaké emoce útočníci nejčastěji zneužívají?",
        options: ["Radost a klid", "Strach, urgentnost (spěch), zvědavost a autoritu", "Nudu a lhostejnost", "Lásku k technologiím"],
        correctAnswer: 1,
        hint: "Útočník vás chce dostat pod tlak, abyste přestali racionálně myslet."
      },
      {
        id: 6,
        question: "Co je to Phishing?",
        options: ["Lov ryb na internetu", "Falešné e-maily vydávající se za důvěryhodné instituce", "Druh antiviru", "Legální marketingová strategie"],
        correctAnswer: 1,
        hint: "Cílem je 'ułowit' vaše hesla nebo údaje o kartě pomocí podvodné zprávy."
      },
      {
        id: 7,
        question: "Co je to Vishing?",
        options: ["Video hovor", "Podvodný telefonát (Voice Phishing)", "Virtuální rybaření", "Vir v počítači"],
        correctAnswer: 1,
        hint: "Pachatel vám volá a vydává se například za bankéře nebo policistu."
      },
      {
        id: 8,
        question: "Co je to Ransomware?",
        options: ["Software na čištění PC", "Škodlivý kód, který zašifruje data a žádá výkupné", "Ochrana proti phishingu", "Program pro stahování hudby"],
        correctAnswer: 1,
        hint: "Útočník vaše data 'unese' a chce zaplatit za jejich vrácení."
      },
      {
        id: 9,
        question: "Co je typickým znakem útoku na 'důvěrnost' (Confidentiality)?",
        options: ["Únik hesel z databáze", "Změna obsahu webu", "Výpadek e-mailové služby", "Zpomalení počítače"],
        correctAnswer: 0,
        hint: "Data vidí někdo, kdo k nim nemá mít přístup."
      },
      {
        id: 10,
        question: "Proč útočníci cílí na běžné uživatele?",
        options: ["Protože nemají co dělat", "Protože běžní uživatelé nemají data", "Protože nástroje pro útoky jsou levné a automatizované", "Je to omyl, cílí jen na vlády"],
        correctAnswer: 2,
        hint: "Každý má cenná data (identitu, finance) a útoky lze provádět hromadně."
      }
    ]
  },
  {
    id: 2,
    title: "Blok 2: Základy bezpečnosti na internetu",
    description: "Domény, HTTPS, rozpoznání podvodů a ochrana účtů.",
    icon: "Globe",
    gammaUrl: "https://gamma.app/embed/gtqi1rkuvdn8gp9",
    questions: [
      {
        id: 1,
        question: "Znamená zelený zámeček (HTTPS) v prohlížeči, že je web bezpečný a poctivý?",
        options: ["Ano, vždy.", "Ne, znamená pouze to, že komunikace je šifrovaná.", "Ano, garantuje to Google.", "Znamená to, že web neobsahuje viry."],
        correctAnswer: 1,
        hint: "I podvodná stránka může mít certifikát zdarma a mít zámeček."
      },
      {
        id: 2,
        question: "Která z těchto domén je s největší pravděpodobností podvodná (pokud hledáte ČSOB)?",
        options: ["www.csob.cz", "ib.csob.cz", "csob-overeni.cz/login", "platby.csob.cz"],
        correctAnswer: 2,
        hint: "Oficiální subdomény jsou před hlavní doménou. 'csob-overeni.cz' je úplně jiná doména."
      },
      {
        id: 3,
        question: "Co je to DNS?",
        options: ["Doručovací služba", "Systém překládající názvy webů (např. banka.cz) na IP adresy", "Druh antiviru", "Digitální Notářský Systém"],
        correctAnswer: 1,
        hint: "Funguje jako telefonní seznam internetu."
      },
      {
        id: 4,
        question: "Proč útočníci používají ve falešných odkazech zkracovače nebo překlepy?",
        options: ["Aby ušetřili místo", "Aby vás zmátli a vy jste si nevšimli, že nejste na oficiálním webu", "Je to levnější", "Aby se web rychleji načetl"],
        correctAnswer: 1,
        hint: "Doufají, že přehlédnete rozdíl mezi 'banka.cz' a 'banka-login.com'."
      },
      {
        id: 5,
        question: "Jaké je hlavní pravidlo pro silné heslo?",
        options: ["Jméno a rok narození", "Krátké, aby se dalo zapamatovat", "Dlouhé (14+ znaků), unikátní a složité", "Stejné pro všechny účty"],
        correctAnswer: 2,
        hint: "Délka je důležitější než složitost, ale unikátnost je klíčová."
      },
      {
        id: 6,
        question: "Co je úkolem správce hesel (Password Manager)?",
        options: ["Pamatovat si všechna vaše hesla a generovat nová silná", "Automaticky měnit hesla každý týden", "Posílat hesla e-mailem", "Jen kontrolovat viry"],
        correctAnswer: 0,
        hint: "Vy si pamatujete jen jedno 'master' heslo, on zbytek."
      },
      {
        id: 7,
        question: "Co je to 2FA (Dvoufaktorové ověřování)?",
        options: ["Přihlášení dvěma hesly", "Přihlášení heslem + druhým faktorem (např. aplikace v mobilu)", "Přihlášení na dvou počítačích", "Dvojitá kontrola pravopisu"],
        correctAnswer: 1,
        hint: "Zvyšuje bezpečnost tím, že útočníkovi nestačí ukrást jen heslo."
      },
      {
        id: 8,
        question: "Co NENÍ znakem phishingového e-mailu?",
        options: ["Naléhavá výzva k akci (do 24 hodin)", "Podezřelá adresa odesílatele", "Osobní oslovení a perfektní znalost vaší historie", "Gramatické chyby a špatná čeština"],
        correctAnswer: 2,
        hint: "Phishing je většinou masový a neosobní. Pokud zná detaily, může jít o cílený spear-phishing (vzácnější)."
      },
      {
        id: 9,
        question: "Je bezpečné ukládat hesla přímo do prohlížeči bez ochrany?",
        options: ["Ano, je to pohodlné", "Ne, malware je může snadno vykrást", "Ano, prohlížeč je trezor", "Záleží na značce počítače"],
        correctAnswer: 1,
        hint: "Prohlížeče často ukládají hesla slabě zabezpečená."
      },
      {
        id: 10,
        question: "K čemu slouží rozšíření 'uBlock Origin'?",
        options: ["K blokování reklam a škodlivých skriptů", "K přehrávání videí", "K tvorbě hesel", "K těžbě kryptoměn"],
        correctAnswer: 0,
        hint: "Blokováním reklam snižujete riziko, že kliknete na podvodný banner."
      }
    ]
  },
  {
    id: 3,
    title: "Blok 3: Ochrana zařízení a sítě",
    description: "Zabezpečení PC, mobilu, routeru, Wi-Fi a zálohování.",
    icon: "Wifi",
    gammaUrl: "https://gamma.app/embed/sw8fkuzsjvzw8hs",
    questions: [
      { id: 1, question: "Proč je důležité instalovat aktualizace systému?", options: ["Aby byl systém hezčí", "Opravují bezpečnostní chyby", "Zpomalují počítač", "Přidávají nové emoji"], correctAnswer: 1, hint: "Aktualizace odstraňují zranitelnosti, které hackeři využívají k průniku." },
      { id: 2, question: "Co je to Firewall?", options: ["Program na hudbu", "Ochranná bariéra kontrolující síťový provoz", "Antivirus", "Chlazení PC"], correctAnswer: 1, hint: "Funguje jako síto, které pouští jen bezpečnou komunikaci." },
      { id: 3, question: "Stačí Windows Defender pro běžnou práci?", options: ["Ne, je k ničemu", "Ano, je to kvalitní základní ochrana", "Nutně vyžaduje placený modul", "Funguje jen offline"], correctAnswer: 1, hint: "Pro běžného uživatele je dnes Defender velmi schopný nástroj." },
      { id: 4, question: "Co je nejdůležitější u nového routeru?", options: ["Zapojit ho", "Změnit výchozí hesla", "Schovat ho do skříně", "Nic"], correctAnswer: 1, hint: "Výchozí hesla jsou veřejně dohledatelná a snadno napadnutelná." },
      { id: 5, question: "Kdy používat VPN?", options: ["Vždy", "Na veřejných Wi-Fi sítích", "Jen u her", "Když chci rychlejší internet"], correctAnswer: 1, hint: "VPN šifruje vaše spojení, což je klíčové na nezabezpečených veřejných sítích." },
      { id: 6, question: "Co je pravidlo 3-2-1?", options: ["3 kopie, 2 média, 1 mimo domov", "3 disky, 2 hesla, 1 uživatel", "3 hesla, 2 maily, 1 mobil", "Odpočítávání"], correctAnswer: 0, hint: "Zajišťuje přežití dat i při požáru nebo krádeži hardwaru." },
      { id: 7, question: "Co dělat při ztrátě mobilu?", options: ["Koupit nový", "Vzdáleně ho smazat a blokovat SIM", "Nahlásit na Facebook", "Čekat"], correctAnswer: 1, hint: "Funkce 'Najít zařízení' umožní ochránit vaše data i po ztrátě fyzického přístupu." },
      { id: 8, question: "Které šifrování Wi-Fi je nejlepší?", options: ["WEP", "WPA", "WPA3", "Žádné"], correctAnswer: 2, hint: "WPA3 je nejmodernější and nejbezpečnější standard." },
      { id: 9, question: "Co je rizikem IoT (chytrých) zařízení?", options: ["Slabé zabezpečení a absence aktualizací", "Cena", "Spotřeba", "Design"], correctAnswer: 0, hint: "Chytré žárovky či kamery bývají často vstupní branou pro hackery." },
      { id: 10, question: "K čemu slouží Guest Network?", options: ["Pro rychlejší stahování", "K oddělení návštěv od soukromých dat", "Pro hry", "K ničemu"], correctAnswer: 1, hint: "Návštěvník se svým (možná zavirovaným) mobilem nevidí váš počítač či NAS." }
    ]
  },
  {
    id: 4,
    title: "Blok 4: Bankovnictví a nákupy",
    description: "Vishing, podvody na bazarech, ochrana karet a osobních údajů.",
    icon: "CreditCard",
    gammaUrl: "https://gamma.app/embed/50rktgysrfatwbu",
    questions: [
      { id: 1, question: "Co je to Vishing?", options: ["Virus", "Podvodný telefonát", "Phishing e-mailem", "Druh kryptoměny"], correctAnswer: 1, hint: "Útočník volá a vydává se za bankéře nebo policistu." },
      { id: 2, question: "Chce banka někdy heslo po telefonu?", options: ["Ano", "Nikdy", "Jen při potížích", "Občas"], correctAnswer: 1, hint: "Banka už vaše údaje má, nepotřebuje je od vás získávat takto." },
      { id: 3, question: "Jak poznat podvod na bazaru?", options: ["Nízká cena", "Odkaz na falešného kurýra vyžadující kartu", "Osobní předání", "Platba dobírkou"], correctAnswer: 1, hint: "Nikdy nezadávejte údaje o kartě, abyste peníze 'přijali'." },
      { id: 4, question: "K čemu je 3D Secure?", options: ["Pro hezčí platbu", "Potvrzení platby v mobilu", "Sleva na nákup", "Pojištění karty"], correctAnswer: 1, hint: "Druhý faktor, který zabrání zneužití karty při krádeži čísel." },
      { id: 5, question: "Co je podvod s fakturou?", options: ["Spatná adresa", "Změna čísla účtu v zachyceném mailu", "Dvojí DPH", "Faktura po splatnosti"], correctAnswer: 1, hint: "Útočník podvrhne své číslo účtu na legitimní fakturu dodavatele." },
      { id: 6, question: "Co neposílat mailem?", options: ["Fotky z dovolené", "Fotku OP a karty", "Odkazy na YouTube", "Pracovní úkoly"], correctAnswer: 1, hint: "Tyto dokumenty umožní kompletní krádež identity." },
      { id: 7, question: "Co dělat při podezření na podvod?", options: ["Smazat mail", "Ihned volat banku a blokovat kartu", "Napsat policii mail", "Čekat do rána"], correctAnswer: 1, hint: "V bankovnictví rozhodují minuty." },
      { id: 8, question: "Je bezpečné platit na neznámém e-shopu?", options: ["Ano", "Ne bez ověření recenzí", "Vždy", "Pokud mají zámeček"], correctAnswer: 1, hint: "Vždy hledejte nezávislé recenze (např. Heureka)." },
      { id: 9, question: "Co je investiční podvod?", options: ["Nákup akcií", "Slib nereálných zisků bez rizika", "Spoření", "Státní dluhopisy"], correctAnswer: 1, hint: "Pokud někdo slibuje 300 % ročně bez rizika, je to podvod." },
      { id: 10, question: "Jak funguje podvod 'Syn v nouzi'?", options: ["Ztráta klíčů", "Zpráva z cizího čísla s prosbou o peníze", "Reklama", "Mail od školy"], correctAnswer: 1, hint: "Vždy ověřte identitu voláním na staré, známé číslo." }
    ]
  },
  {
    id: 5,
    title: "Blok 5: Kryptoměny",
    description: "Blockchain, peněženky, seed a jak se nenechat okrást.",
    icon: "Bitcoin",
    gammaUrl: "https://gamma.app/embed/c2gss863zymwaa3",
    questions: [
        { id: 1, question: "Jsou krypto platby vratné?", options: ["Ano", "Ne, jsou nezvratné", "Jen u Bitcoinu", "Po schválení bankou"], correctAnswer: 1, hint: "Blockchain nemá centrální autoritu, která by platbu stornovala." },
        { id: 2, question: "Co je to Seed?", options: ["Název coinu", "12-24 slov pro obnovu peněženky", "Heslo k aplikaci", "Druh burzy"], correctAnswer: 1, hint: "Kdo má seed, má vaše peníze. Navždy." },
        { id: 3, question: "Kam Seed uložit?", options: ["Do mailu", "Na papír offline do trezoru", "Vyfotit do mobilu", "Na USB disk"], correctAnswer: 1, hint: "Digitální stopa je rizikem, papír/kov offline je nejbezpečnější." },
        { id: 4, question: "Co je hardware peněženka?", options: ["Kožená peněženka", "Zařízení jako Trezor (klíče offline)", "Burza", "Bankovní karta"], correctAnswer: 1, hint: "Klíče nikdy neopouští zařízení, viry je neukradnou." },
        { id: 5, question: "Může podpora chtít váš Seed?", options: ["Ano", "Nikdy", "Při aktualizaci", "Při ztrátě hesla"], correctAnswer: 1, hint: "Kdo chce seed, je 100% podvodník." },
        { id: 6, question: "Co je Rug Pull?", options: ["Výměna mincí", "Podvod, kde vývojáři utečou s penězi", "Rychlý nákup", "Druh grafu"], correctAnswer: 1, hint: "Vytvoření projektu jen za účelem vybrání peněz od lidí." },
        { id: 7, question: "Co hrozí u QR kódů 'krypto zdarma'?", options: ["Zisk peněz", "Vykradení peněženky (drainer)", "Nic", "Sleva"], correctAnswer: 1, hint: "QR kód může potvrdit transakci k výběru všech vašich prostředků." },
        { id: 8, question: "Co je 'Custodial' peněženka?", options: ["Moje vlastní", "Klíče drží někdo jiný (např. burza)", "Papírová", "Hardware"], correctAnswer: 1, hint: "Nemáte plnou kontrolu. 'Not your keys, not your coins'." },
        { id: 9, question: "Jak poznat krypto podvod?", options: ["Chce registraci", "Slibuje garantovaný zisk", "Upozorňuje na riziko", "Má licenci"], correctAnswer: 1, hint: "V kryptu neexistuje garantovaný výnos." },
        { id: 10, question: "Co je Pig Butchering?", options: ["Těžba", "Dlouhodobý podvod budující důvěru", "Nákup NFT", "Recept"], correctAnswer: 1, hint: "Útočník si vás 'vykrmuje' měsíce přátelstvím, než vás okrade." }
    ]
  },
  {
    id: 6,
    title: "Blok 6: Řešení incidentů",
    description: "První pomoc při útoku: co dělat hned a co nedělat.",
    icon: "Siren",
    gammaUrl: "https://gamma.app/embed/47zu26hursvze6w",
    questions: [
        { id: 1, question: "Co je první pravidlo incidentu?", options: ["Smazat PC", "Nepanikařit", "Vypnout proud", "Křičet"], correctAnswer: 1, hint: "Klid umožní jednat podle plánu." },
        { id: 2, question: "Co s napadeným zařízením?", options: ["Nechat běžet", "Odpojit od sítě", "Restartovat", "Prodat"], correctAnswer: 1, hint: "Zamezíte šíření viru na další zařízení v síti." },
        { id: 3, question: "Kde změnit heslo po úniku?", options: ["Na stejném PC", "Na jiném bezpečném zařízení", "Nikde", "V poznámkách"], correctAnswer: 1, hint: "Na napadeném PC může být keylogger, který ukradne i nové heslo." },
        { id: 4, question: "Co je 'Have I Been Pwned'?", options: ["Hra", "Web pro kontrolu úniku mailu/hesla", "Antivirus", "Sociální síť"], correctAnswer: 1, hint: "Zjistíte tam, zda vaše data kolují v databázích hackerů." },
        { id: 5, question: "Co u Ransomwaru?", options: ["Hned platit", "Neplatit (není záruka dat)", "Smazat vše", "Čekat"], correctAnswer: 1, hint: "Platba motivuje zločince a data nemusíte stejně získat." },
        { id: 6, question: "Co dělat při ztrátě karty?", options: ["Psát mail", "Blokovat v appce/volat banku", "Hledat týden", "Nic"], correctAnswer: 1, hint: "Okamžitá blokace je nejdůležitější." },
        { id: 7, question: "K čemu je 'Odhlásit všechna zařízení'?", options: ["Smaže mail", "Vyhodí útočníka z mých účtů", "Vypne wi-fi", "Zruší paušál"], correctAnswer: 1, hint: "Zajistí, že útočník ztratí přístup i přes ukradenou session." },
        { id: 8, question: "Mám mazat logy při incidentu?", options: ["Ano", "Nikdy (jsou důkazem)", "Jen ty staré", "Pokud jsou velké"], correctAnswer: 1, hint: "Logy pomáhají zjistit, co se stalo." },
        { id: 9, question: "Kam hlásit kyberútok v ČR?", options: ["Jen rodině", "IT oddělení nebo Policii ČR", "Na Facebook", "Nikam"], correctAnswer: 1, hint: "Hlášením můžete pomoci ostatním." },
        { id: 10, question: "Je re-instalace systému řešením?", options: ["Ano, po záloze dat a důkazů", "Ne", "Jen u Windows", "Vždy bez zálohy"], correctAnswer: 0, hint: "Je to nejčistší cesta k jistotě, že v PC nic nezbylo." }
    ]
  },
  {
    id: 7,
    title: "Blok 7: Implementace a pravidla",
    description: "Systematická bezpečnost, 3-2-1 zálohování a firemní kultura.",
    icon: "ClipboardCheck",
    gammaUrl: "https://gamma.app/embed/him3c2lvp8rtr3p",
    questions: [
        { id: 1, question: "Co je nejdůležitější v bezpečnosti?", options: ["Drahý firewall", "Systém a návyky lidí", "Rychlý internet", "Design"], correctAnswer: 1, hint: "Bezpečnostní kultura je silnější než jakýkoliv software." },
        { id: 2, question: "Co je princip minimálních oprávnění?", options: ["Nikdo nemá přístup", "Každý má co potřebuje", "Admin má vše", "Uživatel rozhoduje"], correctAnswer: 1, hint: "Zamezíte tím velkým škodám při napadení jednoho účtu." },
        { id: 3, question: "Je nucená změna hesla dobrá?", options: ["Ano", "Ne (vede k papírkům a slabým heslům)", "Vždy po měsíci", "Jen u dětí"], correctAnswer: 1, hint: "Měňte jen při podezření na únik." },
        { id: 4, question: "Co je audit log?", options: ["Kniha přání", "Záznam aktivit v systému", "Seznam hesel", "Druh viru"], correctAnswer: 1, hint: "Umožní dohledat, kdo a kdy co změnil." },
        { id: 5, question: "Co dělat při odchodu kolegy?", options: ["Slavit", "Zrušit přístupy", "Nechat účet", "Změnit jméno"], correctAnswer: 1, hint: "Aktivní účty ex-zaměstnanců jsou častou dírou." },
        { id: 6, question: "Co je offsite záloha?", options: ["Záloha na disku", "Záloha fyzicky mimo budovu", "Smazaná data", "Vytištěné maily"], correctAnswer: 1, hint: "Ochrání data i při požáru kanceláře." },
        { id: 7, question: "Mám sdílet soubory přes odkazy pro všechny?", options: ["Ano", "Ne, hrozí únik dat", "Jen fotky", "Vždy"], correctAnswer: 1, hint: "Raději sdílejte konkrétním lidem přes e-mail." },
        { id: 8, question: "Co je klasifikace dat?", options: ["Abeceda", "Rozdělení podle citlivosti", "Mazání", "Komprese"], correctAnswer: 1, hint: "Různá data vyžadují různou úroveň ochrany." },
        { id: 9, question: "Je bezpečnost jednorázová akce?", options: ["Ano", "Ne, je to proces", "Stačí koupit antivir", "Jen pro IT"], correctAnswer: 1, hint: "Hrozby se mění, obrana musí také." },
        { id: 10, question: "Co je 'Shadow IT'?", options: ["Tmavé monitory", "Neschválený SW/HW v práci", "Hacking", "Úspora energie"], correctAnswer: 1, hint: "Když lidé používají soukromé maily pro práci, IT nad tím nemá kontrolu." }
    ]
  },
  {
    id: 8,
    title: "Blok 8: Legislativa a NIS2",
    description: "Zákon o kybernetické bezpečnosti, povinnosti firem a hrozby.",
    icon: "Scale",
    gammaUrl: "https://gamma.app/embed/kly8j6dfnxfii4k",
    questions: [
        { id: 1, question: "Co je NIS2?", options: ["Virus", "Evropská směrnice o bezpečnosti", "Druh hardwaru", "Program"], correctAnswer: 1, hint: "Zpřísňuje pravidla pro kritickou infrastrukturu a služby." },
        { id: 2, question: "Koho se NIS2 týká?", options: ["Jen armády", "Tisíců firem v klíčových sektorech", "Jen IT firem", "Občanů"], correctAnswer: 1, hint: "Energetika, banky, zdravotnictví a mnoho dalších." },
        { id: 3, question: "Co je NÚKIB?", options: ["Banka", "Národní úřad pro kyber. bezpečnost", "Druh PC", "Zkratka hesla"], correctAnswer: 1, hint: "Hlavní regulátor bezpečnosti v ČR." },
        { id: 4, question: "Co je risk management?", options: ["Pojištění", "Analýza hrozeb a opatření", "Sázení", "Ignorování chyb"], correctAnswer: 1, hint: "Základní povinnost vědět, co nás ohrožuje." },
        { id: 5, question: "Hrozí pokuty za NIS2?", options: ["Ne", "Ano, velmi vysoké", "Jen varování", "Jen v Praze"], correctAnswer: 1, hint: "Pokuty mohou být likvidační a postihují i vedení." },
        { id: 6, question: "Co musí firma hlásit?", options: ["Nic", "Významné incidenty do 24h", "Dovolenou", "Počet PC"], correctAnswer: 1, hint: "Rychlé info pomáhá varovat ostatní." },
        { id: 7, question: "Je NIS2 i pro dodavatele?", options: ["Ne", "Ano (Security supply chain)", "Jen pro velké", "Po roce"], correctAnswer: 1, hint: "Velké firmy musí hlídat bezpečnost svých partnerů." },
        { id: 8, question: "Kdo nese odpovědnost ve firmě?", options: ["IT správce", "Vedení (statutární orgán)", "Všichni stejně", "Stát"], correctAnswer: 1, hint: "Bezpečnost je manažerské téma." },
        { id: 9, question: "Co je cílem NIS2?", options: ["Zisk", "Odolnost EU proti kyberútokům", "Nákup SW", "Sledování lidí"], correctAnswer: 1, hint: "Zajištění fungování státu a služeb i při útoku." },
        { id: 10, question: "Má zákon dopad na občany?", options: ["Ne přímo", "Ano, bezpečnější služby (banky, weby)", "Musí mít certifikát", "Nesmí na web"], correctAnswer: 1, hint: "Bezpečnější infrastruktura chrání data nás všech." }
    ]
  },
  {
    id: 9,
    title: "Blok 9: Role AI v kyberbezpečnosti",
    description: "Deepfakes, voice cloning, automatizace útoků a obrana.",
    icon: "Bot",
    gammaUrl: "https://gamma.app/embed/da2nk7b93e89j4z",
    questions: [
        { id: 1, question: "Jak AI změnila phishing?", options: ["Zhoršila ho", "Je bez chyb a personalizovaný", "Nijak", "Už nechodí"], correctAnswer: 1, hint: "Útočník vygeneruje dokonalý text za vteřinu." },
        { id: 2, question: "Co je Voice Cloning?", options: ["Echo", "Klonování hlasu pomocí AI", "Hlasitý odposlech", "Záznamník"], correctAnswer: 1, hint: "Stačí pár vteřin nahrávky a AI mluví jako váš blízký." },
        { id: 3, question: "Co je Deepfake?", options: ["Hluboký spánek", "Falešné video vypadající jako pravé", "Špatná fotka", "Druh monitoru"], correctAnswer: 1, hint: "Zneužívá se k dezinformacím a podvodům." },
        { id: 4, question: "Jak se bránit falešnému hlasu?", options: ["Věřit mu", "Zavěsit a zavolat na staré číslo", "Poslat peníze", "Koupit antivirus"], correctAnswer: 1, hint: "Vždy ověřte jiným komunikačním kanálem." },
        { id: 5, question: "Pomáhá AI v obraně?", options: ["Ne", "Ano, detekuje útoky v reálném čase", "Jen u Applu", "Zpomaluje PC"], correctAnswer: 1, hint: "AI analýzuje miliony logů a najde anomálie." },
        { id: 6, question: "Co jsou syntetické identity?", options: ["Roboti", "Lidé vytvoření AI pro podvody", "Hra", "Plastové karty"], correctAnswer: 1, hint: "Profily na sítích, které vypadají reálně, ale neexistují." },
        { id: 7, question: "Co je Prompt Injection?", options: ["Vakcína", "Útok textem na AI model", "Rychlé psaní", "Tisk"], correctAnswer: 1, hint: "Snaží se donutit AI ignorovat její pravidla." },
        { id: 8, question: "Může AI psát malware?", options: ["Ne", "Ano, zrychluje vývoj škodlivého kódu", "Jen u Windows", "Samo od sebe"], correctAnswer: 1, hint: "Zkracuje čas mezi nálezem chyby a jejím zneužitím." },
        { id: 9, question: "Co je nejdůležitější obranou?", options: ["Kupovat HW", "Zdravá skepse a ověřování", "Nepoužívat web", "Bát se"], correctAnswer: 1, hint: "Technologie selže, kritické myšlení ne." },
        { id: 10, question: "Co je Liar's Dividend?", options: ["Zisk z akcií", "Popírání pravdy tvrzením, že je to Deepfake", "Pokuta", "Bonus"], correctAnswer: 1, hint: "Eroze důvěry, kdy nikdo nevěří ani reálným záznamům." }
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
      { id: 7, question: "Co AI umí nejlépe?", options: ["Vařit kávu", "Shrnování, vysvětlování a generování textů", "Zaručit pravdu", "Předvídat budoucnost"], correctAnswer: 1, hint: "AI je skvělý asistent pro práci s informacemi." },
      { id: 8, question: "Může AI udělat faktickou chybu?", options: ["Nikdy", "Ano, může se mýlit, i když působí sebejistě", "Jen u matematiky", "Jen když nemá proud"], correctAnswer: 1, hint: "AI negarantuje přesnost, pouze pravděpodobnost." },
      { id: 9, question: "Co AI neumí?", options: ["Psát maily", "Chápat kontext lidsky a cítit emoce", "Vysvětlit pojem", "Učit se"], correctAnswer: 1, hint: "AI postrádá lidskou intuici a kulturní nuance." },
      { id: 10, question: "Kdo nese konečnou odpovědnost za výstup z AI?", options: ["Programátor", "Uživatel (člověk)", "Model", "Firma OpenAI"], correctAnswer: 1, hint: "AI je nástroj, člověk musí výsledek vždy zkontrolovat." }
    ]
  },
  {
    id: 2,
    title: "Blok 2: ChatGPT pro začátečníky",
    description: "Orientace v rozhraní, historie konverzací a Custom Instructions.",
    icon: "MessageSquare",
    gammaUrl: "https://gamma.app/embed/ry2p2651fxgrdix", 
    questions: [
      { id: 1, question: "Co je ChatGPT?", options: ["Operační systém", "Webové rozhraní pro práci s LLM modely", "Nový typ počítače", "Hra"], correctAnswer: 1, hint: "Umožňuje přirozenou konverzaci s AI." },
      { id: 2, question: "Jak funguje historie konverzací?", options: ["Maže se hned", "Seznam všech předchozích chatů, ke kterým se lze vrátit", "Jen pro placené uživatele", "Je tajná"], correctAnswer: 1, hint: "Své starší konverzace můžete kdykoliv znovu otevřít a pokračovat." },
      { id: 3, question: "K čemu slouží ikona sponky?", options: ["K smazání textu", "K nahrání dokumentů a obrázků", "K propojení s mailem", "K vypnutí AI"], correctAnswer: 1, hint: "Umožňuje AI analyzovat vaše vlastní soubory." },
      { id: 4, question: "Co jsou 'Custom Instructions'?", options: ["Příručka v PDF", "Trvalá nastavení, jak má AI odpovídat a co o mně má vědět", "Zákazy od administrátora", "Druhy hesel"], correctAnswer: 1, hint: "Ušetří čas, protože nemusíte v každém chatu opakovat, kdo jste." },
      { id: 5, question: "Umí ChatGPT analyzovat obrázek?", options: ["Ne", "Ano (Obrazový vstup)", "Jen barvy", "Jen texty"], correctAnswer: 1, hint: "ChatGPT dokáže popsat fotku nebo přečíst text z obrázku." },
      { id: 6, question: "Co je funkce 'Memory'?", options: ["Ukládání hesel", "Schopnost pamatovat si info napříč různými chaty", "Zvýšení výkonu PC", "Záloha disku"], correctAnswer: 1, hint: "AI se postupně přizpůsobuje vašim preferencím." },
      { id: 7, question: "Co nesmí AI ukládat do paměti?", options: ["Moje jméno", "Citlivá data (hesla, firemní tajemství)", "Recepty", "Maily"], correctAnswer: 1, hint: "Ochrana soukromí je prioritou, nikdy tam nedávejte tajná data." },
      { id: 8, question: "Co jsou 'GPTs'?", options: ["Nové modely", "Specializovaní asistenti pro konkrétní úkoly (např. Analytik dat)", "Hry", "Předplatné"], correctAnswer: 1, hint: "Přednastavené konfigurace ChatGPT pro specifické role." },
      { id: 9, question: "Jak opravit chybu v odpovědi?", options: ["Vypnout prohlížeč", "Napsat doplňující prompt s upřesněním nebo opravou", "Smazat celý chat", "Napsat na podporu"], correctAnswer: 1, hint: "AI si pamatuje kontext, stačí říct 'udělej to jinak'." },
      { id: 10, question: "Je rozhraní ChatGPT v češtině?", options: ["Ne", "Ano, přizpůsobí se podle vašeho dotazu", "Jen placená verze", "Musí se nainstalovat"], correctAnswer: 1, hint: "ChatGPT rozumí a komunikuje česky velmi dobře." }
    ]
  },
  {
    id: 3,
    title: "Blok 3: Gemini: Asistent od Googlu",
    description: "Ekosystém Google, integrace do Workspace a verze modelů.",
    icon: "Layout",
    gammaUrl: "https://gamma.app/embed/m7sja5e9ghweqem", 
    questions: [
      { id: 1, question: "Která společnost vyvinula Gemini?", options: ["OpenAI", "Google", "Microsoft", "Apple"], correctAnswer: 1, hint: "Gemini je přímý konkurent ChatGPT od Googlu." },
      { id: 2, question: "V čem vyniká Gemini?", options: ["Je rychlejší", "Integrace do Google Workspace (Gmail, Dokumenty)", "Má lepší barvy", "Je jen pro Android"], correctAnswer: 1, hint: "Umožňuje pracovat s daty přímo v aplikacích od Googlu." },
      { id: 3, question: "Který model Gemini je nejvýkonnější pro analýzy?", options: ["Nano", "2.0 Pro", "Flash", "Basic"], correctAnswer: 1, hint: "Pro verze je určena pro komplexní úkoly a delší texty." },
      { id: 4, question: "Co je Gemini Nano?", options: ["Druh procesoru", "Model běžící lokálně přímo v telefonu", "Webová stránka", "Placená verze"], correctAnswer: 1, hint: "Funguje i offline na vybraných mobilních zařízeních." },
      { id: 5, question: "Jak pomáhá Gemini v Gmailu?", options: ["Maže spamy", "Návrh e-mailu, přeformulování nebo dokončení zprávy", "Změní barvu mailu", "Posílá maily sám"], correctAnswer: 1, hint: "Ušetří čas při psaní rutinních nebo složitých odpovědí." },
      { id: 6, question: "Provádí Gemini v Tabulkách automatické výpočty?", options: ["Ano", "Ne, má poradenskou roli (návrh struktur, popis dat)", "Vždy", "Jen u financí"], correctAnswer: 1, hint: "Pomáhá s organizací dat, ale matematiku nechte na vzorcích." },
      { id: 7, question: "Co znamená 'multimodalita' u Gemini?", options: ["Více barev", "Práce s textem, obrázky i dokumenty najednou", "Rychlejší internet", "Více uživatelů"], correctAnswer: 1, hint: "Můžete se ptát textem na obsah nahraného obrázku." },
      { id: 8, question: "V čem se Gemini liší od ChatGPT?", options: ["Nic", "Zaměření na ekosystém Google a jiný styl odpovědí", "Je jen v angličtině", "Je dražší"], correctAnswer: 1, hint: "Gemini dává strukturovanější a často stručnější odpovědi." },
      { id: 9, question: "Garantuje Gemini 100% přesnost v dokumentech?", options: ["Ano", "Ne, výstupy je třeba vždy ověřit", "Jen u PDF", "Garantuje Google"], correctAnswer: 1, hint: "I Gemini může při zpracování dlouhých textů něco vynechat." },
      { id: 10, question: "Kde najdete historii v Gemini?", options: ["V pravém rohu", "V levém panelu konverzací", "V nastavení účtu", "Nikde"], correctAnswer: 1, hint: "Stejně jako u ostatních nástrojů je historie v bočním menu." }
    ]
  },
  {
    id: 4,
    title: "Blok 4: Jak správně zadávat úkoly AI",
    description: "Struktura promptu, role, kontext a iterativní vylepšování.",
    icon: "Command",
    gammaUrl: "https://gamma.app/embed/qx8gqshqjx2hl4j", 
    questions: [
      { id: 1, question: "Co je to 'prompt'?", options: ["Druh viru", "Instrukce nebo zadání pro AI nástroj", "Výsledek z AI", "Značka počítače"], correctAnswer: 1, hint: "Vše, co do AI napíšete, je prompt." },
      { id: 2, question: "Jaký je základní princip fungování AI komunikace?", options: ["Pochopení", "Vstup -> Zpracování -> Výstup", "Čtení myšlenek", "Náhoda"], correctAnswer: 1, hint: "AI nezná vaši situaci, dokud ji nenapíšete." },
      { id: 3, question: "Kterých 5 základních prvků obsahuje univerzální struktura promptu?", options: ["Jméno, Datum, Čas, Místo, Důvod", "Role, Úkol, Kontext, Formát, Omezení", "Pozdrav, Otázka, Poděkování, Podpis, PS", "Předmět, Text, Příloha, Adresa, Razítko"], correctAnswer: 1, hint: "Čím více prvků dodáte (Role, Úkol, Kontext, Formát, Omezení), tím lepší bude výsledek." },
      { id: 4, question: "Proč definovat 'Roli' v promptu?", options: ["Není to potřeba", "Pomáhá AI přizpůsobit tón a úroveň odbornosti", "Aby AI věděla moje jméno", "Je to zábava"], correctAnswer: 1, hint: "Příklad: 'Jsi zkušený copywriter' vs 'Jsi učitel matematiky'." },
      { id: 5, question: "Co se stane, když je prompt příliš obecný?", options: ["AI ho odmítne", "Výsledek bude nekvalitní a generický", "AI si domyslí detaily", "Bude to stát víc"], correctAnswer: 1, hint: "AI nečte myšlenky, potřebuje přesné zadání." },
      { id: 6, question: "Jak zpřesňovat odpovědi AI?", options: ["Napsat nový chat", "Doplňujícím promptem s požadavkem na změnu", "Smazat prohlížeč", "Stěžovat si"], correctAnswer: 1, hint: "Iterace je přirozenou součástí práce s AI." },
      { id: 7, question: "Je iterativní přístup v pořádku?", options: ["Ne, AI musí odpovědět hned napoprvé", "Ano, vede k lepším výsledkům", "Jen u složitých úkolů", "Jen v angličtině"], correctAnswer: 1, hint: "Ladění odpovědi je normální proces." },
      { id: 8, question: "Co znamená v promptu 'Kontext'?", options: ["Délka textu", "Relevantní informace, ze kterých má AI vycházet (např. cílová skupina)", "Typ písma", "Moje nálada"], correctAnswer: 1, hint: "Informace o cílové skupině, situaci nebo účelu." },
      { id: 9, question: "Který prompt je lepší?", options: ["'Napiš e-mail.'", "'Napiš stručný formální e-mail klientovi s omluvou za zpoždění.'", "'Udělej text.'", "'Ahoj AI.'"], correctAnswer: 1, hint: "Konkrétní cíl a formát vyhrává." },
      { id: 10, question: "Můžete chtít po AI vysvětlení pro laika?", options: ["Ne", "Ano, stačí to specifikovat v promptu", "Jen u vědy", "Musí se připlatit"], correctAnswer: 1, hint: "AI umí zjednodušit i velmi složitá témata." }
    ]
  },
  {
    id: 5,
    title: "Blok 5: Praktické využití AI pro texty",
    description: "E-maily, zprávy, shrnutí a zápisy z porad.",
    icon: "FileText",
    gammaUrl: "https://gamma.app/embed/s62qbw3cc9whs18", 
    questions: [
      { id: 1, question: "Jak AI pomáhá při psaní e-mailů?", options: ["Sama je odesílá", "Návrh struktury, úprava tónu, zkrácení/prodloužení", "Maže spamy", "Zkontroluje banku"], correctAnswer: 1, hint: "AI je pomocník při formulaci, nikoliv náhrada za rozhodnutí." },
      { id: 2, question: "Co je 'Shrnutí hlavních bodů'?", options: ["Nové téma", "Extrakce klíčových informací do přehledného seznamu", "Smazání textu", "Vytištění PDF"], correctAnswer: 1, hint: "Ideální pro rychlé pochopení dlouhých e-mailových vláken." },
      { id: 3, question: "Dokáže AI převést neformální text na profesionální?", options: ["Ne", "Ano, přizpůsobí slovní zásobu a strukturu vět", "Jen v angličtině", "Jen u placených verzí"], correctAnswer: 1, hint: "AI rozpozná kontext a navrhne vhodnější formulace." },
      { id: 4, question: "Co AI potřebuje pro vytvoření dobrého zápisu z meetingu?", options: ["Nahrávku zvuku", "Vaše textové poznámky", "Video", "Nic"], correctAnswer: 1, hint: "Většina textových AI pracuje s tím, co jí dodáte jako text." },
      { id: 5, question: "Můžete chtít od AI několik variant tónu jedné zprávy?", options: ["Ne", "Ano (pro vedení, pro kolegy, pro partnery)", "Jen jednu", "Jen vtipnou"], correctAnswer: 1, hint: "Jedno sdělení lze různě 'zabalit' podle příjemce." },
      { id: 6, question: "Co je největší chybou při psaní textů s AI podle prezentace?", options: ["Dlouhý prompt", "Příliš obecný prompt (např. 'Napiš e-mail')", "Použití češtiny", "Použití mobilu"], correctAnswer: 1, hint: "Chybějící formát a kontext vedou k nepoužitelným výsledkům." },
      { id: 7, question: "Dokáže AI opravit gramatické chyby?", options: ["Ne", "Ano, a navíc vylepší stylistiku", "Jen čárky", "Jen u Wordu"], correctAnswer: 1, hint: "Je to jeden z nejlepších nástrojů pro kontrolu textu." },
      { id: 8, question: "Může AI vymyslet neexistující informace v e-mailu?", options: ["Nikdy", "Ano, pokud jí nedáte fakta (halucinace)", "Jen u jmen", "Jen v noci"], correctAnswer: 1, hint: "Dodejte fakta, jinak si je AI zkusí domyslet." },
      { id: 9, question: "Jak zkrátit dlouhý dokument pomocí AI?", options: ["Smazat půlku", "Požádat AI o shrnutí do určitého počtu slov", "Vytisknout ho", "Zmenšit písmo"], correctAnswer: 1, hint: "Specifikujte přesný rozsah (např. do 100 slov)." },
      { id: 10, question: "Můžete AI požádat o tvorbu osnovy prezentace?", options: ["Ne", "Ano, navrhne logické celky a body", "Jen u PowerPointu", "Jen grafiku"], correctAnswer: 1, hint: "AI je skvělá na strukturování informací." }
    ]
  },
  {
    id: 6,
    title: "Blok 6: AI v kancelářských nástrojích",
    description: "Google Workspace, Microsoft 365 a funkce Copilot.",
    icon: "Briefcase",
    gammaUrl: "https://gamma.app/embed/bx5vgz2luhhcd3f", 
    questions: [
      { id: 1, question: "Jak se jmenuje AI asistent od Microsoftu?", options: ["Cortana", "Copilot", "Siri", "Alexa"], correctAnswer: 1, hint: "Copilot je integrován přímo do balíku Office." },
      { id: 2, question: "Co umí Copilot ve Wordu?", options: ["Jen psát", "Generovat návrh dokumentu, shrnutí a tvorbu osnovy", "Maže soubory", "Tiskne papíry"], correctAnswer: 1, hint: "Pomáhá s tvorbou obsahu přímo v textovém editoru." },
      { id: 3, question: "K čemu slouží Copilot v Excelu?", options: ["K hraní her", "Popis dat, analýza tabulek a návrh vizualizací", "Smaže tabulku", "Píše maily"], correctAnswer: 1, hint: "Usnadňuje pochopení dat bez hluboké znalosti vzorců." },
      { id: 4, question: "Provádí Copilot automatické odesílání e-mailů bez potvrzení?", options: ["Ano", "Nikdy", "Jen v Outlooku", "V noci"], correctAnswer: 1, hint: "Vždy vyžaduje kontrolu a potvrzení člověkem." },
      { id: 5, question: "Umí Gemini v Dokumentech Google vytvořit první verzi textu?", options: ["Ne", "Ano, na základě zadaného tématu a bodů", "Jen u placených verzí", "Jen anglicky"], correctAnswer: 1, hint: "Urychluje start psaní nového dokumentu." },
      { id: 6, question: "Co Gemini v Tabulkách Google NEUMÍ podle prezentace?", options: ["Popis obsahu", "Vytvářet automatické vzorce a provádět výpočty", "Navrhnout kategorii", "Organizovat data"], correctAnswer: 1, hint: "AI v tabulkách má poradenskou a organizační roli, neprovádí výpočty." },
      { id: 7, question: "Může AI v Outlooku navrhnout odpověď na mail?", options: ["Ne", "Ano, na základě kontextu původní zprávy", "Jen smazat mail", "Jen přeložit"], correctAnswer: 1, hint: "Funkce 'Návrh odpovědi' šetří čas u běžné agendy." },
      { id: 8, question: "Garantuje Copilot právní správnost dokumentů?", options: ["Ano", "Ne, vyžadují lidský dohled a kontrolu", "Garantuje Microsoft", "Jen u smluv"], correctAnswer: 1, hint: "AI není právník, za obsah ručíte vy." },
      { id: 9, question: "K čemu je dobré 'Shrnutí přílohy' u Copilota?", options: ["Ušetří místo na disku", "Ušetří čas čtením dlouhých dokumentů v mailu", "Smaže přílohu", "Nic"], correctAnswer: 1, hint: "Rychle zjistíte, co je v dokumentu důležité." },
      { id: 10, question: "Musí být uživatel u práce s AI v Office pozorný?", options: ["Ne", "Ano, AI je nástroj, který vyžaduje kontrolu a rozhodování", "Jen u her", "Jen začátečník"], correctAnswer: 1, hint: "AI může chybovat nebo vynechat nuance." }
    ]
  },
  {
    id: 7,
    title: "Blok 7: NotebookLM: Průvodce pro začátečníky",
    description: "Analýza dokumentů, shrnutí a interaktivní studijní nástroje.",
    icon: "BookOpen",
    gammaUrl: "https://gamma.app/embed/zb3vm9jzjkyxvpo", 
    questions: [
      { id: 1, question: "Co je hlavní funkcí NotebookLM?", options: ["Hraní her", "Analýza vašich nahraných dokumentů", "Psaní kódu", "Editace fotek"], correctAnswer: 1, hint: "Pracuje výhradně s vašimi zdroji." },
      { id: 2, question: "Odkud čerpá NotebookLM odpovědi?", options: ["Z celého internetu", "Výhradně z vašich nahraných zdrojů", "Z Wikipedie", "Z hlavy"], correctAnswer: 1, hint: "Je to personalizovaný expert na vaše data." },
      { id: 3, question: "Jaké formáty NotebookLM podporuje?", options: ["Jen text", "PDF, Google Docs, Slides, webové odkazy, YouTube videa, audio", "Jen obrázky", "Žádné"], correctAnswer: 1, hint: "Podpora široké škály vzdělávacích zdrojů." },
      { id: 4, question: "Co je 'Audio Overview'?", options: ["Nahrávání hovoru", "Podcast-like diskuze vytvořená AI o vašich dokumentech", "Rádio", "Hudba"], correctAnswer: 1, hint: "AI vytvoří audio debatu dvou mluvčích o vašem tématu." },
      { id: 5, question: "Doplňuje NotebookLM fakta, která v dokumentu nejsou?", options: ["Ano", "Ne, odpovědi jsou omezeny obsahem nahraných zdrojů", "Jen v angličtině", "Podle nálady"], correctAnswer: 1, hint: "Drží se striktně dodaných podkladů." },
      { id: 6, question: "Umí NotebookLM citovat zdroje?", options: ["Ne", "Ano, každá odpověď obsahuje odkazy na konkrétní části dokumentu", "Jen někdy", "Jen u PDF"], correctAnswer: 1, hint: "Tím zvyšuje důvěryhodnost a umožňuje ověření." },
      { id: 7, question: "Může NotebookLM nahradit odborné poradenství?", options: ["Ano", "Ne, není určen pro právní či lékařské rady", "Jen u práva", "Vždy"], correctAnswer: 1, hint: "Vždy se obraťte na kvalifikovaného odborníka." },
      { id: 8, question: "Jak AI v NotebookLM vytváří shrnutí?", options: ["Smaže text", "Identifikuje podstatné body a přehledně je prezentuje", "Přeloží text", "Vymyslí si ho"], correctAnswer: 1, hint: "Rychlá orientace v obsahu bez zdlouhavého čtení." },
      { id: 9, question: "Co se stane, když je v mém dokumentu chyba?", options: ["AI ji opraví", "AI ji převezme, protože neověřuje fakta mimo dokumenty", "AI se vypne", "Nahlásí to"], correctAnswer: 1, hint: "NotebookLM věří tomu, co mu předložíte." },
      { id: 10, question: "Lze NotebookLM používat k týmové spolupráci?", options: ["Ne", "Ano, přes sdílení notebooků", "Jen u her", "Jen v USA"], correctAnswer: 1, hint: "Sdílení materiálů s kolegy či spolužáky je podporováno." }
    ]
  },
  {
    id: 8,
    title: "Blok 8: AI vyhledávač Perplexity",
    description: "Vyhledávání s citacemi, režimy práce a formulace dotazů.",
    icon: "Search",
    gammaUrl: "https://gamma.app/embed/4vdh5433b53x9ri", 
    questions: [
      { id: 1, question: "Co je Perplexity?", options: ["Prohlížeč", "AI vyhledávač s citacemi zdrojů", "Sociální síť", "E-shop"], correctAnswer: 1, hint: "Kombinuje vyhledávání s inteligencí LLM." },
      { id: 2, question: "V čem je Perplexity jiný než ChatGPT?", options: ["Není jiný", "Aktivně vyhledává čerstvé info a uvádí zdroje u každého tvrzení", "Je dražší", "Je pomalejší"], correctAnswer: 1, hint: "Vždy víte, odkud informace pochází." },
      { id: 3, question: "Co je režim 'Quick'?", options: ["Smazání historie", "Základní režim vyhledávání pro rychlé odpovědi", "Placená verze", "Druh písma"], correctAnswer: 1, hint: "Vhodný pro běžné dotazy a základní přehled o tématu." },
      { id: 4, question: "Co nabízí režim 'Pro'?", options: ["Barvy", "Hlubší analýzu a vyhledávání ve více zdrojích", "Nic navíc", "Jen hudbu"], correctAnswer: 1, hint: "Pro komplexní dotazy vyžadující podrobnější odpovědi." },
      { id: 5, question: "Jak správně formulovat dotaz v Perplexity?", options: ["Krátce", "Konkrétně, s časovým obdobím a typem informací", "Vtipně", "Vůbec"], correctAnswer: 1, hint: "Místo 'marketing' napište 'nejpoužívanější nástroje pro email marketing v roce 2024'." },
      { id: 6, question: "Garantuje Perplexity pravdivost zdrojů?", options: ["Ano", "Ne, pouze cituje nalezené články (mohou být i zavádějící)", "Vždy", "U placené verze"], correctAnswer: 1, hint: "Vždy kontrolujte autoritu původního zdroje." },
      { id: 7, question: "Lze originální články v Perplexity přímo otevřít?", options: ["Ne", "Ano, jedním kliknutím na číselnou citaci", "Jen v noci", "Jen u Seznamu"], correctAnswer: 1, hint: "Umožňuje to rychlou kontrolu kontextu." },
      { id: 8, question: "Co Perplexity nedělá podle prezentace?", options: ["Nehledá na webu", "Neověřuje pravdivost zdrojů (cituje, ale nekontroluje)", "Neodpovídá česky", "Nepíše texty"], correctAnswer: 1, hint: "Systém cituje články, ale neví, zda autor článku nelže." },
      { id: 9, question: "Je registrace v Perplexity povinná?", options: ["Ano", "Ne (možnost používat bez registrace)", "Jen pro muže", "V Česku ano"], correctAnswer: 1, hint: "Základní vyhledávání funguje i bez účtu." },
      { id: 10, question: "K čemu je Perplexity ideální?", options: ["K hraní her", "K rychlému pochopení tématu a srovnání technologií", "K vaření", "K nákupu bot"], correctAnswer: 1, hint: "Skvělý asistent pro faktické rešerše." }
    ]
  },
  {
    id: 9,
    title: "Blok 9: Bezpečné používání AI v práci",
    description: "Halucinace, ochrana dat (GDPR) a etické limity.",
    icon: "ShieldCheck",
    gammaUrl: "https://gamma.app/embed/2tswqrc5k3kngc9", 
    questions: [
      { id: 1, question: "Co je to 'halucinace' u AI?", options: ["Pěkný sen", "Přesvědčivá, ale fakticky nesprávná odpověď", "Vypnutí modelu", "Chyba internetu"], correctAnswer: 1, hint: "AI model predikuje slova, ne pravdu." },
      { id: 2, question: "Proč halucinace vznikají?", options: ["AI je unavená", "Kvůli pravděpodobnostnímu generování textu bez ověření faktů", "Virus", "Špatný monitor"], correctAnswer: 1, hint: "Model vybírá slova, která statisticky 'sedí', i když lžou." },
      { id: 3, question: "Patří osobní údaje do AI systémů?", options: ["Ano, pro lepší pomoc", "Nikdy (jména, rodná čísla, adresy, telefony)", "Jen u kolegů", "Občas"], correctAnswer: 1, hint: "Vkládání PII (osobních údajů) může vést k úniku dat a porušení GDPR." },
      { id: 4, question: "Můžete nahrávat interní firemní dokumenty do veřejné AI?", options: ["Ano", "Ne bez výslovného povolení", "Jen maily", "Vždy"], correctAnswer: 1, hint: "Riskujete únik strategických plánů nebo mzdových údajů." },
      { id: 5, question: "Je AI výstup automaticky originální dílo?", options: ["Ano", "Ne, uživatel musí ověřit originalitu a autorská práva", "Vždy u textu", "Garantuje to AI"], correctAnswer: 1, hint: "AI modely se učí na milionech existujících děl." },
      { id: 6, question: "Může AI rozhodovat o lidech (např. o náboru)?", options: ["Ano, je objektivní", "Ne, rozhodnutí musí vždy provést kvalifikovaná osoba", "Jen u IT", "V Americe ano"], correctAnswer: 1, hint: "AI nesmí autonomně rozhodovat o náboru, hodnocení nebo mzdách." },
      { id: 7, question: "Co je to 'Prompt Injection'?", options: ["Vakcína", "Útok textem na AI model pro obejití pravidel", "Rychlé psaní", "Tisk"], correctAnswer: 1, hint: "Pokus o manipulaci s chováním AI." },
      { id: 8, question: "Jak se vyhnout halucinacím podle prezentace?", options: ["Neklást otázky", "Vždy ověřovat všechny informace mimo AI systém", "Být vtipný", "Nepoužívat AI"], correctAnswer: 1, hint: "Používejte AI pouze jako výchozí bod, ne jako konečný zdroj pravdy." },
      { id: 9, question: "Co je Liar's Dividend?", options: ["Odměna", "Popírání pravdy tvrzením, že jde o AI generovaný fejk", "Pokuta", "Zisk"], correctAnswer: 1, hint: "Eroze důvěry, kdy viníci popírají realitu s tím, že jde o Deepfake." },
      { id: 10, question: "Co je prioritou před jakýmkoli přínosem AI?", options: ["Rychlost", "Ochrana dat a soukromí", "Design", "Cena"], correctAnswer: 1, hint: "Bezpečnost nesmí být obětována pohodlí." }
    ]
  },
  {
    id: 10,
    title: "Blok 10: NotebookLM: AI asistent pro práci s dokumenty",
    description: "Maximální využití zdrojů, aktivní učení a personalizovaný expert.",
    icon: "Zap",
    gammaUrl: "https://gamma.app/embed/oht0u0yzkamdh6u", 
    questions: [
      { id: 1, question: "Kolik zdrojů lze nahrát do jednoho notebooku v NotebookLM?", options: ["5", "Až 50", "Neomezeně", "Pouze 1"], correctAnswer: 1, hint: "Umožňuje to analyzovat velmi rozsáhlé studijní materiály najednou." },
      { id: 2, question: "Transformuje NotebookLM pasivní čtení?", options: ["Ne", "Ano, na interaktivní učební zkušenost", "Jen u PDF", "Zpomaluje čtení"], correctAnswer: 1, hint: "Díky generování otázek a vysvětlování pojmů." },
      { id: 3, question: "Které typy otázek NotebookLM generuje?", options: ["Jen náhodné", "Kontrolní, Konceptuální, Aplikační a Kritické", "Žádné", "Jen pravda/nepravda"], correctAnswer: 1, hint: "Různé typy otázek pomáhají hlubšímu pochopení látky." },
      { id: 4, question: "Jsou vaše data v NotebookLM použita k tréninku AI modelů Google?", options: ["Ano", "Ne, data zůstávají soukromá a nepoužívají se k tréninku", "V noci ano", "Jen u neplacených"], correctAnswer: 1, hint: "Zásadní informace pro ochranu firemních a osobních dat." },
      { id: 5, question: "Může AI v NotebookLM porovnávat dva dokumenty?", options: ["Ne", "Ano, umí informace propojovat a hledat rozdíly", "Jen maily", "Jen obrázky"], correctAnswer: 1, hint: "Ideální pro srovnání verzí smluv nebo vědeckých studií." },
      { id: 6, question: "Co je 'Export poznámek' v NotebookLM?", options: ["Smazání", "Uložení nebo sdílení vytvořených materiálů do preferovaného formátu", "Tisk", "Odeslání do banky"], correctAnswer: 1, hint: "Své výpisky si můžete vzít s sebou kamkoliv." },
      { id: 7, question: "Jak NotebookLM pomáhá s nejasnými pojmy?", options: ["Maže je", "Poskytne kontextová vysvětlení přímo z nahraných dokumentů", "Hledá je na Google", "Ignoruje je"], correctAnswer: 1, hint: "Stačí termín označit a AI ho vysvětlí v rámci kontextu vašich dat." },
      { id: 8, question: "Je NotebookLM dostupný zdarma pro uživatele s Google účtem?", options: ["Ne", "Ano, je zdarma dostupný", "Jen pro školy", "Jen v USA"], correctAnswer: 1, hint: "Aktuálně jde o bezplatný nástroj pro všechny majitele Google účtu." },
      { id: 9, question: "K čemu slouží interaktivní studijní nástroje v NotebookLM?", options: ["K hraní pokeru", "Kvízy s vysvětleními, Flashcards a Reports", "K placení", "Ke kreslení"], correctAnswer: 1, hint: "Pomůcka pro efektivní učení a zopakování klíčových pojmů." },
      { id: 10, question: "Může NotebookLM nahradit lidskou expertízu?", options: ["Ano", "Ne, je to partner pro zjednodušení práce, ne konečná autorita", "Jen u studentů", "Nikdy v ničem"], correctAnswer: 1, hint: "AI partner, který transformuje způsob, jakým se učíme, ale vyžaduje dohled." }
    ]
  }
];
