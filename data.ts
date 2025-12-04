
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
        question: "Je bezpečné ukládat hesla přímo do prohlížeče bez ochrany?",
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
      {
        id: 1,
        question: "Proč je důležité instalovat aktualizace systému?",
        options: ["Aby byl systém hezčí", "Opravují bezpečnostní chyby, které zneužívají útočníci", "Zpomalují počítač", "Přidávají jen nové emoji"],
        correctAnswer: 1,
        hint: "Neaktualizovaný systém je jako dům s otevřenými okny."
      },
      {
        id: 2,
        question: "Co je to Firewall?",
        options: ["Program na vypalování CD", "Ochranná zeď kontrolující příchozí a odchozí provoz", "Antivirus", "Hardware pro chlazení"],
        correctAnswer: 1,
        hint: "Blokuje nechtěné spojení z internetu do vašeho počítače."
      },
      {
        id: 3,
        question: "Stačí pro běžného uživatele Windows Defender?",
        options: ["Ne, je potřeba drahý antivirus", "Ano, spolu s rozumným chováním je dostatečný", "Antivirus není potřeba vůbec", "Jen pro offline práci"],
        correctAnswer: 1,
        hint: "Moderní vestavěné antiviry jsou velmi kvalitní."
      },
      {
        id: 4,
        question: "Co udělat jako první s novým Wi-Fi routerem?",
        options: ["Zapojit a používat", "Změnit výchozí heslo administrace a Wi-Fi sítě", "Napsat heslo na router", "Vypnout ho"],
        correctAnswer: 1,
        hint: "Výchozí hesla (admin/admin) jsou veřejně známá."
      },
      {
        id: 5,
        question: "Kdy byste měli používat VPN?",
        options: ["Doma na zabezpečené síti", "Na veřejné Wi-Fi (kavárna, letiště)", "Vždy, když píšu e-mail", "Když chci rychlejší internet"],
        correctAnswer: 1,
        hint: "Na veřejné Wi-Fi může kdokoli odposlouchávat váš provoz. VPN to šifruje."
      },
      {
        id: 6,
        question: "Co znamená pravidlo zálohování 3-2-1?",
        options: ["3 kopie dat, 2 různá média, 1 kopie mimo domov", "3 disky, 2 počítače, 1 cloud", "3 hesla, 2 účty, 1 uživatel", "Odpočítávání do startu"],
        correctAnswer: 0,
        hint: "Chráníte vás to před selháním disku, krádeží i požárem."
      },
      {
        id: 7,
        question: "Co dělat při ztrátě telefonu?",
        options: ["Koupit nový", "Vzdáleně ho uzamknout/vymazat (Find My Device) a blokovat SIM", "Nahlásit na Facebooku", "Nic"],
        correctAnswer: 1,
        hint: "Rychlá reakce zabrání zneužití vašich dat a účtů."
      },
      {
        id: 8,
        question: "Jaký je bezpečný standard pro šifrování Wi-Fi?",
        options: ["WEP", "WPA", "WPA2 nebo WPA3", "Žádné (Open)"],
        correctAnswer: 2,
        hint: "WEP je zastaralý a lze ho prolomit za minuty."
      },
      {
        id: 9,
        question: "Co je to 'IoT' zařízení a proč je rizikové?",
        options: ["Internet of Things (chytré žárovky, kamery) – často mají slabé zabezpečení", "Interní obchodní tým", "Nový typ počítače", "Bezpečnostní protokol"],
        correctAnswer: 0,
        hint: "Levná chytrá zařízení se často neaktualizují a mohou být vstupní branou do sítě."
      },
      {
        id: 10,
        question: "Proč oddělovat síť pro hosty (Guest Network)?",
        options: ["Aby měli pomalejší internet", "Aby se návštěva (nebo její zavirovaný mobil) nedostala k vašim datům", "Je to slušnost", "Nemá to smysl"],
        correctAnswer: 1,
        hint: "Chráníte tím svá citlivá data před zařízeními, kterým plně nedůvěřujete."
      }
    ]
  },
  {
    id: 4,
    title: "Blok 4: Bankovnictví a nákupy",
    description: "Vishing, podvody na bazarech, ochrana karet a osobních údajů.",
    icon: "CreditCard",
    gammaUrl: "https://gamma.app/embed/50rktgysrfatwbu",
    questions: [
      {
        id: 1,
        question: "Co je to 'Vishing'?",
        options: ["Podvodný e-mail", "Podvodný telefonát (Voice Phishing) vydávající se za banku/policii", "Virus v mobilu", "Nákup akcií"],
        correctAnswer: 1,
        hint: "Útočník volá a snaží se vás vystrašit, že vám mizí peníze z účtu."
      },
      {
        id: 2,
        question: "Vyžaduje banka někdy po telefonu váš PIN nebo heslo?",
        options: ["Ano, pro ověření totožnosti", "Nikdy", "Občas, při problémech", "Ano, pro zrušení platby"],
        correctAnswer: 1,
        hint: "Banka tyto údaje zná nebo je nepotřebuje. Kdo se ptá, je podvodník."
      },
      {
        id: 3,
        question: "Jak funguje podvod 'Syn/Dcera v nouzi' na WhatsAppu?",
        options: ["Dítě ztratí telefon", "Podvodník píše z cizího čísla: 'Ahoj mami, mám nové číslo' a žádá peníze", "Dítě chce kredit", "Je to reklama"],
        correctAnswer: 1,
        hint: "Vždy zavolejte na původní číslo svého dítěte pro ověření."
      },
      {
        id: 4,
        question: "Co je typické pro podvody na Vinted/Marketplace?",
        options: ["Kupující chce přijet osobně", "Kupující pošle odkaz na 'přijetí platby' nebo 'kurýra', kde máte zadat číslo karty", "Prodávající pošle zboží poštou", "Platba převodem"],
        correctAnswer: 1,
        hint: "Nikdy nezadávejte číslo karty, abyste PŘIJALI peníze."
      },
      {
        id: 5,
        question: "K čemu slouží 3D Secure?",
        options: ["K lepší grafice bankovnictví", "Dodatečné ověření platby kartou (např. v aplikaci)", "Pojištění proti krádeži", "Trojitá kontrola zůstatku"],
        correctAnswer: 1,
        hint: "I když útočník zná číslo karty, bez potvrzení v mobilu nezaplatí."
      },
      {
        id: 6,
        question: "Co je 'Podvod se změněným číslem faktury'?",
        options: ["Faktura je za jiné zboží", "Útočník zachytí e-mail a změní číslo účtu dodavatele na své", "Špatně spočítané DPH", "Faktura je v dolarech"],
        correctAnswer: 1,
        hint: "Peníze pošlete podvodníkovi v domnění, že platíte dodavateli."
      },
      {
        id: 7,
        question: "Co NIKDY neposílat e-mailem nebo chatem?",
        options: ["Faktury", "Fotografie z dovolené", "Fotku občanského průkazu a platební karty", "Pozdravy"],
        correctAnswer: 2,
        hint: "Tyto dokumenty umožňují kompletní krádež vaší identity."
      },
      {
        id: 8,
        question: "Jak poznáte falešnou platební bránu?",
        options: ["Chce přihlašovací údaje do bankovnictví nebo PIN", "Má zelený zámeček", "Vypadá jako ta od ČSOB", "Chce číslo karty"],
        correctAnswer: 0,
        hint: "Platební brána slouží jen pro kartu. Nikdy se tam nezadává heslo k účtu."
      },
      {
        id: 9,
        question: "Co je to 'Investiční podvod'?",
        options: ["Nákup státních dluhopisů", "Platforma slibující nereálné zisky, která vám nedovolí vybrat peníze", "Spoření v bance", "Nákup akcií ČEZ"],
        correctAnswer: 1,
        hint: "Pokud někdo slibuje jistý zisk 300 %, je to vždy podvod."
      },
      {
        id: 10,
        question: "Co dělat, když zjistíte, že jste naletěli?",
        options: ["Stydět se a mlčet", "Okamžitě volat banku, blokovat karty a hlásit to policii", "Smazat e-mail", "Napsat podvodníkovi"],
        correctAnswer: 1,
        hint: "Rychlost je rozhodující. Banka může někdy platbu ještě zastavit."
      }
    ]
  },
  {
    id: 5,
    title: "Blok 5: Kryptoměny",
    description: "Blockchain, peněženky, seed a jak se nenechat okrást.",
    icon: "Bitcoin",
    gammaUrl: "https://gamma.app/embed/c2gss863zymwaa3",
    questions: [
      {
        id: 1,
        question: "Co je hlavním znakem kryptoměnových transakcí?",
        options: ["Lze je snadno reklamovat", "Jsou nezvratné – nelze je vrátit", "Garantuje je stát", "Jsou vždy anonymní"],
        correctAnswer: 1,
        hint: "Neexistuje 'krypto banka', kam zavoláte pro storno platby."
      },
      {
        id: 2,
        question: "Co je to 'Seed' (Seed phrase)?",
        options: ["Heslo k aplikaci", "Sada 12-24 slov, která je hlavním klíčem k vaší peněžence", "Název coinu", "Semínko stromu"],
        correctAnswer: 1,
        hint: "Kdo zná váš Seed, ten vlastní vaše peníze. Je to to nejcennější."
      },
      {
        id: 3,
        question: "Kam si bezpečně uložit Seed?",
        options: ["Vyfotit do mobilu", "Uložit do e-mailu nebo na Google Drive", "Napsat na papír/kov a uložit offline (trezor)", "Říct ho kamarádovi"],
        correctAnswer: 2,
        hint: "Seed nesmí nikdy přijít do kontaktu s internetem ani digitálním zařízením."
      },
      {
        id: 4,
        question: "Vyžaduje oficiální podpora peněženky (MetaMask, Trezor) váš Seed?",
        options: ["Ano, pro ověření", "Nikdy", "Občas", "Ano, při aktualizaci"],
        correctAnswer: 1,
        hint: "Nikdy. Kdo ho po vás chce, je 100% podvodník."
      },
      {
        id: 5,
        question: "Co je to 'Hardware peněženka' (např. Trezor)?",
        options: ["Fyzické zařízení pro nejbezpečnější uložení klíčů", "Kožená peněženka", "Aplikace v mobilu", "Banka"],
        correctAnswer: 0,
        hint: "Klíče jsou uloženy offline a viry v počítači na ně nedosáhnou."
      },
      {
        id: 6,
        question: "Co je to 'Rug Pull'?",
        options: ["Druh koberce", "Podvod, kdy vývojáři vyberou peníze z projektu a zmizí", "Rychlý nákup", "Legální investice"],
        correctAnswer: 1,
        hint: "Doslova 'vytrhnutí koberce' pod nohama investorů."
      },
      {
        id: 7,
        question: "Co hrozí při skenování náhodných QR kódů pro 'krypto zdarma'?",
        options: ["Dostanu peníze", "Může to schválit výběr všech mých prostředků (drainer)", "Nic se nestane", "Je to bezpečné"],
        correctAnswer: 1,
        hint: "QR kód může obsahovat škodlivý kontrakt, který vykradne peněženku."
      },
      {
        id: 8,
        question: "Co znamená 'Custodial' peněženka (např. na burze)?",
        options: ["Klíče držíte vy", "Klíče drží burza (nemáte plnou kontrolu)", "Je to bezpečnější než Trezor", "Je to hardware"],
        correctAnswer: 1,
        hint: "Pokud burza zkrachuje, o peníze přijdete. 'Not your keys, not your coins'."
      },
      {
        id: 9,
        question: "Jak poznáte falešnou investiční krypto platformu?",
        options: ["Slibuje garantovaný vysoký zisk bez rizika", "Chce ověření identity", "Má licenci ČNB", "Upozorňuje na rizika"],
        correctAnswer: 0,
        hint: "V kryptu neexistuje 'jistý zisk'. Pokud to zní příliš dobře, je to podvod."
      },
      {
        id: 10,
        question: "Co je 'Pig Butchering' (řeznictví)?",
        options: ["Recept na maso", "Dlouhodobý podvod budující důvěru (romance/investice) před krádeží", "Těžba kryptoměn", "Nákup NFT"],
        correctAnswer: 1,
        hint: "Útočník si oběť 'vykrmuje' (získává důvěru) měsíce, než ji okrade."
      }
    ]
  },
  {
    id: 6,
    title: "Blok 6: Řešení incidentů",
    description: "První pomoc při útoku: co dělat hned a co nedělat.",
    icon: "Siren",
    gammaUrl: "https://gamma.app/embed/47zu26hursvze6w",
    questions: [
      {
        id: 1,
        question: "Co je první pravidlo při zjištění kybernetického incidentu?",
        options: ["Smazat disk", "Nepanikařit a jednat s rozvahou", "Vypnout elektřinu v celém domě", "Křičet na počítač"],
        correctAnswer: 1,
        hint: "Panika vede k chybám. Zastavte se a přemýšlejte podle plánu."
      },
      {
        id: 2,
        question: "Co udělat s napadeným zařízením (např. virem)?",
        options: ["Okamžitě ho odpojit od internetu/sítě", "Poslat e-mail IT oddělení", "Přihlásit se do banky", "Nechat ho běžet"],
        correctAnswer: 0,
        hint: "Zabráníte tím šíření nákazy na další zařízení nebo úniku dat."
      },
      {
        id: 3,
        question: "Pokud zjistíte únik hesla k e-mailu, odkud ho změníte?",
        options: ["Z napadeného počítače", "Z jiného, bezpečného zařízení (např. mobilu)", "Nezměním ho", "Pošlu ho útočníkovi"],
        correctAnswer: 1,
        hint: "Na napadeném PC může být keylogger, který nové heslo hned ukradne."
      },
      {
        id: 4,
        question: "Co je služba 'Have I Been Pwned'?",
        options: ["Hra", "Nástroj pro kontrolu, zda váš e-mail nebo heslo uniklo v databázi hackerů", "Antivirus", "Sociální síť"],
        correctAnswer: 1,
        hint: "Zjistíte tam, jestli jsou vaše přihlašovací údaje veřejně známé."
      },
      {
        id: 5,
        question: "Co dělat při krádeži telefonu?",
        options: ["Koupit nový", "Vzdáleně ho uzamknout (Find My), vymazat data a blokovat SIM u operátora", "Čekat", "Nahlásit na Facebooku"],
        correctAnswer: 1,
        hint: "Rychlá reakce ochrání vaše data i peníze (přes SMS kódy)."
      },
      {
        id: 6,
        question: "Máte podezření na kompromitaci bankovního účtu. Co uděláte?",
        options: ["Napíšu e-mail bance", "Zavolám do banky pro blokaci a změním hesla", "Počkám na výpis", "Vyberu hotovost"],
        correctAnswer: 1,
        hint: "Banka může okamžitě zastavit odchozí platby a zablokovat karty."
      },
      {
        id: 7,
        question: "Máte platit výkupné u Ransomwaru?",
        options: ["Ano, hned", "Ne, není záruka vrácení dat a financujete zločin", "Ano, ale jen půlku", "Možná"],
        correctAnswer: 1,
        hint: "Platba nezaručuje, že data dostanete zpět, a motivuje útočníky k dalším útokům."
      },
      {
        id: 8,
        question: "Co znamená funkce 'Odhlásit všechna zařízení'?",
        options: ["Smaže účet", "Ukončí aktivní relace útočníka, pokud se dostal do vašeho účtu", "Vypne internet", "Smaže e-maily"],
        correctAnswer: 1,
        hint: "Je to klíčový krok při obnově kontroly nad e-mailem nebo sociální sítí."
      },
      {
        id: 9,
        question: "Co NIKDY nedělat při incidentu?",
        options: ["Volat policii", "Mazat důkazy nebo reinstalovat systém bez zálohy důkazů", "Odpojit síť", "Změnit hesla"],
        correctAnswer: 1,
        hint: "Pokud chcete incident vyšetřit, potřebujete stopy (logy, soubory)."
      },
      {
        id: 10,
        question: "Proč hlásit incidenty (např. IT oddělení nebo policii)?",
        options: ["Aby měli statistiku", "Může to zabránit škodám u ostatních a pomoci dopadnout pachatele", "Je to zbytečné", "Dostanu odměnu"],
        correctAnswer: 1,
        hint: "Informace o útoku pomohou nastavit lepší obranu pro všechny."
      }
    ]
  },
  {
    id: 7,
    title: "Blok 7: Implementace a pravidla",
    description: "Systematická bezpečnost, 3-2-1 zálohování a firemní kultura.",
    icon: "ClipboardCheck",
    gammaUrl: "https://gamma.app/embed/him3c2lvp8rtr3p",
    questions: [
      {
        id: 1,
        question: "Proč nestačí mít jen znalosti, ale je potřeba systém?",
        options: ["Znalosti se zapomínají", "Bez systému a návyků člověk pod tlakem selže", "Systém je levnější", "Teorie je nuda"],
        correctAnswer: 1,
        hint: "Bezpečnost musí být rutina, ne jednorázová akce."
      },
      {
        id: 2,
        question: "Co říká pravidlo zálohování 3-2-1?",
        options: ["3 kopie dat, 2 různá média, 1 kopie fyzicky jinde (offsite)", "3 disky, 2 počítače, 1 cloud", "3 hesla, 2 účty, 1 uživatel", "Odpočítávání"],
        correctAnswer: 0,
        hint: "Zajišťuje, že data přežijí i požár nebo krádež všech zařízení v kanceláři."
      },
      {
        id: 3,
        question: "Co je to 'Bezpečnostní kultura'?",
        options: ["Směrnice v šuplíku", "Způsob myšlení a chování lidí, kde je bezpečnost přirozenou součástí práce", "Drahý software", "Přísné tresty"],
        correctAnswer: 1,
        hint: "Lidé sami od sebe poznají a nahlásí podezřelý e-mail."
      },
      {
        id: 4,
        question: "Jaké hesla bychom měli měnit?",
        options: ["Všechna každých 90 dní", "Pouze ta kompromitovaná (uniklá) nebo při podezření", "Žádná", "Jen heslo k Wi-Fi"],
        correctAnswer: 1,
        hint: "Nucená změna hesel vede k tomu, že si lidé píší hesla na papírky. Měňte jen při riziku."
      },
      {
        id: 5,
        question: "Co je princip 'Need to know' (Minimální oprávnění)?",
        options: ["Každý ví všechno", "Uživatel má přístup jen k datům nutným pro jeho práci", "Ředitel má všechna hesla", "Nikdo neví nic"],
        correctAnswer: 1,
        hint: "Když se omezí přístup, omezí se i škoda při napadení účtu zaměstnance."
      },
      {
        id: 6,
        question: "Co je 'Audit log' (Logování)?",
        options: ["Kniha příchodů", "Záznam o aktivitách v systému (kdo, kdy, co udělal)", "Seznam úkolů", "Antivirus"],
        correctAnswer: 1,
        hint: "Bez logů zpětně nezjistíte, co se stalo a kudy útočník přišel."
      },
      {
        id: 7,
        question: "Co je častou chybou při sdílení souborů?",
        options: ["Použití e-mailu", "Odkazy 'kdokoliv s odkazem' (Anyone with link)", "Použití USB", "Šifrování"],
        correctAnswer: 1,
        hint: "Takový odkaz může uniknout a soubor si stáhne kdokoli na internetu."
      },
      {
        id: 8,
        question: "Co znamená klasifikace dat?",
        options: ["Seřazení podle abecedy", "Rozdělení dat podle citlivosti (veřejné, interní, citlivé)", "Mazání dat", "Komprese"],
        correctAnswer: 1,
        hint: "Veřejný ceník nepotřebuje stejnou ochranu jako databáze klientů."
      },
      {
        id: 9,
        question: "Co dělat při odchodu zaměstnance?",
        options: ["Rozloučit se", "Okamžitě zrušit všechny jeho přístupy", "Nechat účet pro kolegy", "Smazat všechna data"],
        correctAnswer: 1,
        hint: "Aktivní účty bývalých zaměstnanců jsou častou bezpečnostní dírou."
      },
      {
        id: 10,
        question: "Je bezpečnost jednorázový projekt?",
        options: ["Ano, koupím antivirus a mám klid", "Ne, je to neustálý proces vylepšování", "Ano, stačí nastavit firewall", "Ne, je to jen pro IT"],
        correctAnswer: 1,
        hint: "Hrozby se mění, vaše obrana se musí vyvíjet s nimi."
      }
    ]
  },
  {
    id: 8,
    title: "Blok 8: Legislativa a NIS2",
    description: "Zákon o kybernetické bezpečnosti, povinnosti firem a hrozby.",
    icon: "Scale",
    gammaUrl: "https://gamma.app/embed/kly8j6dfnxfii4k",
    questions: [
      {
        id: 1,
        question: "Co je NIS2?",
        options: ["Nový typ viru", "Evropská směrnice o kybernetické bezpečnosti", "Název hackerské skupiny", "Program pro školy"],
        correctAnswer: 1,
        hint: "Zavádí přísnější pravidla pro ochranu důležitých služeb v EU."
      },
      {
        id: 2,
        question: "Koho se NIS2 týká?",
        options: ["Pouze armády", "Širokého spektra firem (energetika, doprava, zdravotnictví, digitální služby...)", "Jen výrobců PC", "Běžných domácností přímo"],
        correctAnswer: 1,
        hint: "Týká se 'kritických' a 'důležitých' odvětví pro fungování společnosti."
      },
      {
        id: 3,
        question: "Který úřad v ČR dohlíží na kybernetickou bezpečnost?",
        options: ["NBÚ", "NÚKIB (Národní úřad pro kybernetickou a informační bezpečnost)", "ČNB", "Policie ČR"],
        correctAnswer: 1,
        hint: "Je to ústřední orgán sídlící v Brně."
      },
      {
        id: 4,
        question: "Co je to 'Risk Management' (Řízení rizik)?",
        options: ["Pojištění", "Pravidelné vyhodnocování hrozeb a zavádění opatření k jejich zmírnění", "Hazardní hry", "Ignorování problémů"],
        correctAnswer: 1,
        hint: "Základní povinnost podle zákona – musíte vědět, co vás ohrožuje."
      },
      {
        id: 5,
        question: "Co musí organizace dělat při významném incidentu?",
        options: ["Tajit ho", "Nahlásit ho NÚKIBu (do 24/72 hodin)", "Napsat na Twitter", "Vypnout firmu"],
        correctAnswer: 1,
        hint: "Rychlé hlášení pomáhá varovat ostatní a řešit krizi."
      },
      {
        id: 6,
        question: "Jaký dopad má NIS2 na dodavatele velkých firem?",
        options: ["Žádný", "Velké firmy budou po dodavatelích vyžadovat dodržování bezpečnosti", "Dostanou pokutu", "Musí zavřít"],
        correctAnswer: 1,
        hint: "Bezpečnost se 'přelévá' celým dodavatelským řetězcem."
      },
      {
        id: 7,
        question: "Hrozí za nedodržení zákona sankce?",
        options: ["Ne, je to doporučení", "Ano, vysoké pokuty a odpovědnost vedení", "Jen napomenutí", "Ano, 100 Kč"],
        correctAnswer: 1,
        hint: "Odpovědnost nese statutární orgán (jednatelé), ne jen IT."
      },
      {
        id: 8,
        question: "Týká se NIS2 běžného občana?",
        options: ["Ano, musím se registrovat", "Ne přímo, ale přinese mi bezpečnější služby a ochranu dat", "Ano, musím mít certifikát", "Ne"],
        correctAnswer: 1,
        hint: "Cílem je ochránit služby, které občan využívá (elektřina, banky, nemocnice)."
      },
      {
        id: 9,
        question: "Co patří mezi povinná technická opatření?",
        options: ["Hezké webové stránky", "Silná hesla, 2FA, šifrování, zálohování", "Používání faxu", "Drahé židle"],
        correctAnswer: 1,
        hint: "Jde o základní hygienu, kterou jsme probírali v celém kurzu."
      },
      {
        id: 10,
        question: "Kdo nese konečnou odpovědnost za kyberbezpečnost ve firmě?",
        options: ["Externí IT firma", "Vedení společnosti (statutární orgán)", "Uklízečka", "Stát"],
        correctAnswer: 1,
        hint: "Bezpečnost je manažerský problém, ne jen technický."
      }
    ]
  },
  {
    id: 9,
    title: "Blok 9: Role AI v kyberbezpečnosti",
    description: "Deepfakes, voice cloning, automatizace útoků a obrana.",
    icon: "Bot",
    gammaUrl: "https://gamma.app/embed/da2nk7b93e89j4z",
    questions: [
      {
        id: 1,
        question: "Jak AI změnila phishingové e-maily?",
        options: ["Jsou plné chyb", "Jsou gramaticky dokonalé, personalizované a těžko rozeznatelné", "Chodí jen v noci", "Nepomohla jim"],
        correctAnswer: 1,
        hint: "Už se nedá spoléhat na špatnou češtinu jako indikátor podvodu."
      },
      {
        id: 2,
        question: "Co je to 'Voice Cloning'?",
        options: ["Změna hlasu heliem", "Klonování hlasu pomocí AI (stačí pár vteřin záznamu)", "Hlasové ovládání", "Nahrávání hovorů"],
        correctAnswer: 1,
        hint: "Útočník vám může zavolat hlasem vašeho dítěte nebo šéfa."
      },
      {
        id: 3,
        question: "Co je to 'Deepfake' video?",
        options: ["Video z hlubin moře", "Falešné video vytvořené AI, kde osoba říká/dělá něco, co se nestalo", "Špatně natočené video", "Video s filtry"],
        correctAnswer: 1,
        hint: "Může sloužit k diskreditaci osob nebo k podvodům (např. falešný Elon Musk)."
      },
      {
        id: 4,
        question: "Jak se bránit proti AI podvodu 'Vnuk v nouzi' (falešný hlas)?",
        options: ["Hned poslat peníze", "Zavěsit a zavolat zpět na známé číslo dotyčného", "Věřit tomu", "Nic nedělat"],
        correctAnswer: 1,
        hint: "Ověření jiným kanálem je nejspolehlivější obrana."
      },
      {
        id: 5,
        question: "Co jsou 'syntetické identity'?",
        options: ["Plastoví lidé", "Neexistující osoby vytvořené AI (fotky, historie) pro podvody", "Roboti", "Přezdívky"],
        correctAnswer: 1,
        hint: "Lidé, kteří nikdy neexistovali, ale mají LinkedIn profil a 'fotku'."
      },
      {
        id: 6,
        question: "Jak AI pomáhá v obraně?",
        options: ["Nijak", "Detekuje anomálie a chování v reálném čase rychleji než člověk", "Vytváří viry", "Zpomaluje PC"],
        correctAnswer: 1,
        hint: "AI dokáže analyzovat obrovské množství dat a najít útok v zárodku."
      },
      {
        id: 7,
        question: "Co je 'Prompt Injection'?",
        options: ["Vakcína", "Útok na AI model pomocí škodlivého zadání (textu)", "Rychlé psaní", "Typ tiskárny"],
        correctAnswer: 1,
        hint: "Snaží se obejít bezpečnostní pravidla AI chatbota."
      },
      {
        id: 8,
        question: "Co je 'Liar's Dividend'?",
        options: ["Odměna za lhaní", "Situace, kdy viníci popírají realitu tvrzením, že jde o Deepfake", "Dividenda z akcií", "Typ podvodu"],
        correctAnswer: 1,
        hint: "Eroze důvěry: 'To video je falešné, udělala ho AI' (i když je pravé)."
      },
      {
        id: 9,
        question: "Jak rychle dokáže AI generovat nové varianty malwaru?",
        options: ["Měsíce", "Během vteřin", "Neumí to", "Jednou za rok"],
        correctAnswer: 1,
        hint: "Automatizace umožňuje útočníkům obejít klasické antiviry."
      },
      {
        id: 10,
        question: "Co je nejdůležitější obranou v éře AI?",
        options: ["Věřit očím a uším", "Zdravá skepse, ověřování informací a technická ochrana", "Nepoužívat technologie", "Bát se"],
        correctAnswer: 1,
        hint: "Co vidíte a slyšíte, už nemusí být pravda. Důvěřuj, ale prověřuj."
      }
    ]
  }
];
