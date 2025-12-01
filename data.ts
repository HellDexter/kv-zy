import { Block } from './types';

export const courseData: Block[] = [
  {
    id: 1,
    title: "Blok 1: Úvod a psychologie útoků",
    description: "Základy kyberbezpečnosti, CIA triáda a proč útočníci cílí na lidi.",
    icon: "ShieldAlert",
    questions: [
      {
        id: 1,
        question: "Co je hlavním cílem moderních kybernetických útočníků?",
        options: ["Prolomit nejsložitější firewally", "Zmanipulovat člověka (nejslabší článek)", "Zničit hardware počítače", "Vypnout internet v celé zemi"],
        correctAnswer: 1,
        hint: "Útok na technologii je drahý a složitý. Útok na lidské emoce je levný a efektivní."
      },
      {
        id: 2,
        question: "Co znamená zkratka CIA v kontextu bezpečnosti dat?",
        options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability (Důvěrnost, Integrita, Dostupnost)", "Control, Inspect, Analyze", "Computer Internet Access"],
        correctAnswer: 1,
        hint: "Jde o tři pilíře bezpečnosti: data musí být tajná, nezměněná a přístupná."
      },
      {
        id: 3,
        question: "Jaký typ útoku využívá telefonní hovor k vylákání údajů?",
        options: ["Phishing", "Smishing", "Vishing", "DDoS"],
        correctAnswer: 2,
        hint: "Slovo vzniklo spojením 'Voice' (hlas) a 'Phishing'."
      },
      {
        id: 4,
        question: "Která emoce NENÍ typicky zneužívána při sociálním inženýrství?",
        options: ["Strach", "Urgentnost (spěch)", "Zvědavost", "Klid a rozvaha"],
        correctAnswer: 3,
        hint: "Útočník vás chce dostat pod tlak, abyste nepřemýšleli."
      },
      {
        id: 5,
        question: "Co je to ransomware?",
        options: ["Program na zrychlení PC", "Škodlivý kód, který zašifruje data a žádá výkupné", "Antivirový program zdarma", "Hardware pro těžbu kryptoměn"],
        correctAnswer: 1,
        hint: "Název pochází z anglického slova 'ransom' (výkupné)."
      },
      {
        id: 6,
        question: "Kolik procent útoků přibližně začíná lidskou chybou (např. kliknutím)?",
        options: ["Asi 10 %", "Méně než 5 %", "Kolem 50 %", "Až 90 %"],
        correctAnswer: 3,
        hint: "Je to drtivá většina útoků."
      },
      {
        id: 7,
        question: "Co znamená porušení 'Integrity' v CIA triádě?",
        options: ["Data byla smazána", "Data viděl někdo nepovolaný", "Data byla neoprávněně pozměněna (např. číslo účtu na faktuře)", "Systém je pomalý"],
        correctAnswer: 2,
        hint: "Představte si, že někdo přepíše částku na faktuře."
      },
      {
        id: 8,
        question: "Jak se nazývá podvodná SMS zpráva?",
        options: ["Phishing", "Vishing", "Smishing", "Trashing"],
        correctAnswer: 2,
        hint: "Kombinace slova SMS a Phishing."
      },
      {
        id: 9,
        question: "Proč jsou útoky na běžné uživatele tak časté?",
        options: ["Protože běžní uživatelé nemají peníze", "Protože je to těžší než útočit na banky", "Protože jsou automatizované a levné", "Protože útočníci se nudí"],
        correctAnswer: 2,
        hint: "Útočníci používají roboty k rozesílání milionů podvodů naráz."
      },
      {
        id: 10,
        question: "Co je to 'sociální inženýrství'?",
        options: ["Oprava sociálních sítí", "Manipulace lidí k provedení určité akce", "Programování sociálních botů", "Tvorba webových stránek"],
        correctAnswer: 1,
        hint: "Jde o 'hackování' lidské mysli, ne počítače."
      }
    ]
  },
  {
    id: 2,
    title: "Blok 2: Základy bezpečnosti na internetu",
    description: "Domény, HTTPS, hesla a dvoufaktorové ověřování.",
    icon: "Globe",
    questions: [
      {
        id: 1,
        question: "Znamená ikonka zámečku (HTTPS) v prohlížeči, že je web důvěryhodný?",
        options: ["Ano, vždy", "Ne, znamená to jen, že je komunikace šifrovaná", "Ano, garantuje to policie", "Znamená to, že web neobsahuje viry"],
        correctAnswer: 1,
        hint: "I podvodná stránka může mít šifrované spojení (zámeček)."
      },
      {
        id: 2,
        question: "Která z těchto domén je podezřelá pro banku ČSOB?",
        options: ["www.csob.cz", "ib.csob.cz", "csob-prihlaseni-bezpecne.com", "identita.csob.cz"],
        correctAnswer: 2,
        hint: "Oficiální instituce málokdy používají pomlčky a divné koncovky jako .com nebo .net pro české služby."
      },
      {
        id: 3,
        question: "Co je hlavním úkolem správce hesel (Password Manager)?",
        options: ["Automaticky měnit hesla každý den", "Ukládat a generovat silná, unikátní hesla", "Posílat hesla kamarádům", "Zrychlit internet"],
        correctAnswer: 1,
        hint: "Pamatuje si za vás složitá hesla, vy si pamatujete jen jedno hlavní."
      },
      {
        id: 4,
        question: "Co je to 2FA (Dvoufaktorové ověřování)?",
        options: ["Přihlášení dvěma různými hesly", "Nutnost potvrdit přihlášení druhým způsobem (např. mobil)", "Přihlášení na dvou počítačích", "Dvojitá kontrola antivirem"],
        correctAnswer: 1,
        hint: "Něco, co znáte (heslo) + něco, co máte (telefon/klíč)."
      },
      {
        id: 5,
        question: "Jaké je doporučené minimální délka bezpečného hesla?",
        options: ["6 znaků", "8 znaků", "alespoň 14-16 znaků", "25 znaků"],
        correctAnswer: 2,
        hint: "Čím delší, tím odolnější proti prolomení hrubou silou."
      },
      {
        id: 6,
        question: "Je bezpečné ukládat hesla přímo do prohlížeče (bez hlavního hesla)?",
        options: ["Ano, je to nejpohodlnější", "Ne, malware je může snadno ukrást", "Ano, Google to chrání", "Záleží na rychlosti internetu"],
        correctAnswer: 1,
        hint: "Specializovaný správce hesel je bezpečnější než prohlížeč."
      },
      {
        id: 7,
        question: "Co dělá funkce DNS?",
        options: ["Zrychluje stahování", "Překládá názvy webů (např. seznam.cz) na IP adresy", "Blokuje viry", "Maže historii prohlížení"],
        correctAnswer: 1,
        hint: "Funguje jako telefonní seznam internetu."
      },
      {
        id: 8,
        question: "Jak poznáte phishingový e-mail?",
        options: ["Má hezkou grafiku", "Oslovuje vás jménem a příjmením", "Vytváří nátlak, obsahuje chyby a divné odkazy", "Přišel v noci"],
        correctAnswer: 2,
        hint: "Často chce, abyste klikli 'ihned' nebo 'do 24 hodin'."
      },
      {
        id: 9,
        question: "Které rozšíření prohlížeče pomáhá blokovat reklamy a sledovací prvky?",
        options: ["Adobe Flash", "uBlock Origin", "Java", "WinRAR"],
        correctAnswer: 1,
        hint: "Blokování reklam také snižuje riziko nákazy z webu."
      },
      {
        id: 10,
        question: "Je bezpečné používat stejné heslo na všech stránkách?",
        options: ["Ano, abych ho nezapomněl", "Ne, pokud unikne z jedné, útočník se dostane všude", "Ano, pokud je silné", "Jen na e-shopech"],
        correctAnswer: 1,
        hint: "Jeden únik dat by ohrozil celou vaši digitální identitu."
      }
    ]
  },
  {
    id: 3,
    title: "Blok 3: Ochrana zařízení a domácí sítě",
    description: "Zabezpečení PC, mobilu, routeru a Wi-Fi.",
    icon: "Wifi",
    questions: [
      {
        id: 1,
        question: "Jaký je nejdůležitější krok pro zabezpečení operačního systému?",
        options: ["Vypnout ho na noc", "Pravidelné automatické aktualizace", "Častá defragmentace disku", "Mít hezké pozadí plochy"],
        correctAnswer: 1,
        hint: "Aktualizace opravují bezpečnostní díry, které zneužívají viry."
      },
      {
        id: 2,
        question: "Co byste měli udělat s výchozím heslem u nového Wi-Fi routeru?",
        options: ["Nechat ho, je na štítku", "Okamžitě ho změnit na silné unikátní heslo", "Změnit ho na '12345'", "Napsat ho na router fixou"],
        correctAnswer: 1,
        hint: "Výchozí hesla jsou veřejně známá a útočníci je zkoušejí jako první."
      },
      {
        id: 3,
        question: "Co dělá Firewall?",
        options: ["Chladí počítač", "Kontroluje a blokuje síťový provoz", "Zrychluje Wi-Fi", "Maže staré soubory"],
        correctAnswer: 1,
        hint: "Funguje jako vrátný, který kontroluje, kdo vstupuje a odchází ze sítě."
      },
      {
        id: 4,
        question: "K čemu slouží BitLocker (nebo FileVault)?",
        options: ["K šifrování celého disku", "K uzamčení klávesnice", "K přehrávání hudby", "K blokování reklam"],
        correctAnswer: 0,
        hint: "Když vám ukradnou notebook, bez hesla se k datům na disku nedostanou."
      },
      {
        id: 5,
        question: "Jaký je nejbezpečnější způsob odemykání telefonu?",
        options: ["Gesto (vzor)", "PIN 0000", "Biometrie (otisk prstu / Face ID)", "Posuvník (Slide to unlock)"],
        correctAnswer: 2,
        hint: "Biometrie je unikátní pro každého člověka."
      },
      {
        id: 6,
        question: "Co je to VPN?",
        options: ["Virus Protection Network", "Virtual Private Network (šifrovaný tunel)", "Very Public Network", "Visual Photo Number"],
        correctAnswer: 1,
        hint: "Vytvoří bezpečný tunel mezi vámi a internetem, skryje vaši aktivitu."
      },
      {
        id: 7,
        question: "Je bezpečné používat veřejnou Wi-Fi bez VPN pro bankovnictví?",
        options: ["Ano, banka je zabezpečená", "Ne, útočník může odposlouchávat provoz", "Ano, pokud mám iPhone", "Ano, v kavárně je to bezpečné"],
        correctAnswer: 1,
        hint: "Veřejné sítě jsou často nezabezpečené a kdokoli může 'poslouchat'."
      },
      {
        id: 8,
        question: "Co je to IMEI?",
        options: ["Jméno operátora", "Unikátní identifikační číslo telefonu", "Typ SIM karty", "Značka telefonu"],
        correctAnswer: 1,
        hint: "Potřebujete ho pro policii a operátora při krádeži telefonu."
      },
      {
        id: 9,
        question: "Měl by 'běžný uživatel' platit za drahý firemní EDR antivirus?",
        options: ["Ano, je to nutnost", "Ne, Windows Defender většinou stačí", "Antivirus není potřeba vůbec", "Jen pokud má Mac"],
        correctAnswer: 1,
        hint: "Vestavěné nástroje jako Defender jsou dnes velmi kvalitní pro domácí použití."
      },
      {
        id: 10,
        question: "Jaký šifrovací standard by měla mít vaše domácí Wi-Fi?",
        options: ["WEP", "WPA", "WPA2 nebo WPA3", "Žádný (Open)"],
        correctAnswer: 2,
        hint: "WEP je velmi starý a snadno prolomitelný. WPA3 je nejnovější."
      }
    ]
  },
  {
    id: 4,
    title: "Blok 4: Finance a online nákupy",
    description: "Bezpečné platby, ochrana karet a podvody na bazarech.",
    icon: "CreditCard",
    questions: [
      {
        id: 1,
        question: "Vyžaduje banka někdy PIN nebo heslo v e-mailu/telefonátu?",
        options: ["Ano, pro ověření", "Občas, při problémech", "Nikdy", "Ano, při založení účtu"],
        correctAnswer: 2,
        hint: "Banka tyto údaje zná, nepotřebuje se vás ptát. Je to podvod."
      },
      {
        id: 2,
        question: "Co je to 3D Secure?",
        options: ["3D brýle pro bankovnictví", "Dodatečné ověření platby kartou (např. v aplikaci)", "Trojitá záloha dat", "Pojištění karty"],
        correctAnswer: 1,
        hint: "Zajišťuje, že kartu používá opravdu její majitel (potvrzení v mobilu)."
      },
      {
        id: 3,
        question: "Jaký je typický podvod na Vinted/Marketplace?",
        options: ["Kupující pošle peníze předem", "Kupující pošle odkaz na 'přijetí platby' nebo 'kurýra'", "Prodávající pošle zboží poštou", "Kupující si přijede osobně"],
        correctAnswer: 1,
        hint: "Útočník se tváří, že už zaplatil, a chce po vás údaje z karty přes falešný odkaz."
      },
      {
        id: 4,
        question: "Měli byste sdělovat SMS ověřovací kód někomu po telefonu?",
        options: ["Ano, pokud tvrdí, že je z banky", "Ano, pokud je to policie", "Nikdy", "Ano, rodině"],
        correctAnswer: 2,
        hint: "Kód slouží jen vám k potvrzení vaší akce. Kdo ho má, ovládá váš účet."
      },
      {
        id: 5,
        question: "Co dělat při podezření na zneužití platební karty?",
        options: ["Čekat týden", "Napsat na Facebook", "Okamžitě kartu zablokovat (v aplikaci/telefonicky)", "Vybrat všechny peníze"],
        correctAnswer: 2,
        hint: "Rychlost je klíčová, aby útočník nestihl vybrat více."
      },
      {
        id: 6,
        question: "Je bezpečné platit převodem neznámému e-shopu bez recenzí?",
        options: ["Ano", "Ne, peníze už pravděpodobně neuvidíte", "Ano, pokud má hezký web", "Ano, pokud je to levné"],
        correctAnswer: 1,
        hint: "U podvodných e-shopů je platba kartou bezpečnější (možnost reklamace - chargeback)."
      },
      {
        id: 7,
        question: "Co znamená 'Podvod se změněným číslem faktury'?",
        options: ["Faktura je za jiné zboží", "Útočník v e-mailu změní číslo účtu dodavatele na své", "Faktura má špatné DPH", "Faktura je v jiné měně"],
        correctAnswer: 1,
        hint: "Peníze pošlete podvodníkovi místo obchodnímu partnerovi."
      },
      {
        id: 8,
        question: "Jak funguje podvod 'Syn/Dcera v nouzi' na WhatsAppu?",
        options: ["Dítě ztratí telefon", "Útočník se vydává za dítě s novým číslem a žádá peníze", "Dítě chce kredit", "Dítě posílá fotky"],
        correctAnswer: 1,
        hint: "Vždy si ověřte zavoláním na původní číslo dítěte."
      },
      {
        id: 9,
        question: "Pro online nákupy je nejbezpečnější používat:",
        options: ["Hlavní kartu s celoživotními úsporami", "Jednorázovou virtuální kartu nebo kartu s limitem", "Cizí kartu", "Hotovost poštou"],
        correctAnswer: 1,
        hint: "Když uniknou data virtuální karty, vaše hlavní úspory jsou v bezpečí."
      },
      {
        id: 10,
        question: "Co NIKDY neposílat e-mailem/zprávou?",
        options: ["Pozdrav", "Fotku kočky", "Fotku občanského průkazu a platební karty", "Fakturu"],
        correctAnswer: 2,
        hint: "Tyto doklady lze snadno zneužít pro krádež identity."
      }
    ]
  },
  {
    id: 5,
    title: "Blok 5: Kryptoměny a bezpečí",
    description: "Blockchain, peněženky a jak nepřijít o peníze.",
    icon: "Bitcoin",
    questions: [
      {
        id: 1,
        question: "Lze transakci v kryptoměnách (např. Bitcoin) zrušit nebo vrátit?",
        options: ["Ano, zavolám na podporu Bitcoinu", "Ano, do 24 hodin", "Ne, transakce jsou nevratné", "Ano, za poplatek"],
        correctAnswer: 2,
        hint: "Neexistuje žádná 'banka', která by platbu stornovala. Co pošlete, je pryč."
      },
      {
        id: 2,
        question: "Co je to 'Seed phrase' (Seed)?",
        options: ["Heslo k e-mailu", "Sada 12-24 slov, která je hlavním klíčem k penězům", "Název kryptoměny", "Semínko pro sázení"],
        correctAnswer: 1,
        hint: "Kdo zná váš Seed, ten vlastní vaše peníze. Nikdy ho nikomu nedávejte."
      },
      {
        id: 3,
        question: "Kde je nejbezpečnější uchovávat Seed?",
        options: ["Vyfocený v mobilu", "Uložený v e-mailu", "Napsaný na papíře/kovu v trezoru (offline)", "V textovém souboru na ploše"],
        correctAnswer: 2,
        hint: "Seed nesmí přijít do kontaktu s internetem, aby ho malware neukradl."
      },
      {
        id: 4,
        question: "Jaký je hlavní znak podvodné investiční platformy?",
        options: ["Slibuje garantované vysoké zisky (např. 100% měsíčně)", "Má ošklivý web", "Chce ověření identity", "Používá Bitcoin"],
        correctAnswer: 0,
        hint: "V investicích neexistuje vysoký zisk bez rizika. Pokud to zní příliš dobře, je to podvod."
      },
      {
        id: 5,
        question: "Co je to 'Hardware peněženka' (Trezor, Ledger)?",
        options: ["Kožená peněženka", "Fyzické zařízení (USB) pro bezpečné uložení klíčů", "Aplikace v mobilu", "Banka"],
        correctAnswer: 1,
        hint: "Klíče jsou uloženy v zařízení a nikdy neopustí bezpečný čip."
      },
      {
        id: 6,
        question: "Vyžaduje oficiální technická podpora peněženky váš Seed?",
        options: ["Ano, pro opravu", "Nikdy", "Jen občas", "Ano, pro aktualizaci"],
        correctAnswer: 1,
        hint: "Podpora ho nepotřebuje. Kdo ho chce, je zloděj."
      },
      {
        id: 7,
        question: "Co je to 'Rug Pull'?",
        options: ["Nový tanec", "Druh koberce", "Podvod, kdy vývojáři vyberou peníze a zmizí", "Rychlý nákup"],
        correctAnswer: 2,
        hint: "Doslova 'vytrhnutí koberce' pod nohama investorů."
      },
      {
        id: 8,
        question: "Je bezpečné skenovat náhodné QR kódy slibující kryptoměny zdarma?",
        options: ["Ano, je to štěstí", "Ne, mohou vést na podvodné stránky nebo vykrást peněženku", "Ano, QR kódy jsou bezpečné", "Jen na letišti"],
        correctAnswer: 1,
        hint: "QR kód může spustit transakci, která vám vyluxuje účet."
      },
      {
        id: 9,
        question: "Co znamená, že je peněženka 'Non-custodial' (vlastní)?",
        options: ["Peníze drží burza", "Za peníze ručí stát", "Vy a jen vy vlastníte klíče (a zodpovědnost)", "Je zdarma"],
        correctAnswer: 2,
        hint: "Jste svou vlastní bankou. Pokud ztratíte klíče, nikdo vám nepomůže."
      },
      {
        id: 10,
        question: "Proč útočníci rádi používají kryptoměny?",
        options: ["Jsou ekologické", "Jsou těžko vystopovatelné a nevratné", "Jsou levné", "Mají hezká loga"],
        correctAnswer: 1,
        hint: "Pro policii je velmi obtížné (až nemožné) takové peníze zmrazit nebo vrátit."
      }
    ]
  },
  {
    id: 6,
    title: "Blok 6: Řešení incidentů",
    description: "Co dělat, když se něco pokazí. První pomoc v kyberprostoru.",
    icon: "Siren",
    questions: [
      {
        id: 1,
        question: "Co je první pravidlo při zjištění kybernetického útoku?",
        options: ["Smazat disk", "Nepanikařit a jednat s rozvahou", "Vypnout elektřinu v celém domě", "Křičet"],
        correctAnswer: 1,
        hint: "Panika vede k chybám. Zastavte se a přemýšlejte."
      },
      {
        id: 2,
        question: "Co udělat, pokud si myslíte, že máte v počítači virus/malware?",
        options: ["Odpojit počítač od internetu", "Poslat virus kamarádovi", "Otevřít bankovnictví", "Nic, ono to zmizí"],
        correctAnswer: 0,
        hint: "Odpojením zabráníte viru komunikovat s útočníkem a šířit se dál."
      },
      {
        id: 3,
        question: "K čemu slouží služba 'Have I Been Pwned'?",
        options: ["K nákupu her", "Ke zjištění, zda můj e-mail/heslo uniklo v databázi hackerů", "K opravě počítače", "K blokování reklam"],
        correctAnswer: 1,
        hint: "Zadáte e-mail a zjistíte, kde všude vaše data unikla."
      },
      {
        id: 4,
        question: "Pokud zjistíte, že vám někdo ukradl heslo k e-mailu, odkud ho změníte?",
        options: ["Z napadeného počítače", "Z bezpečného zařízení (např. mobilu)", "Nezměním ho", "Napíšu útočníkovi"],
        correctAnswer: 1,
        hint: "Na napadeném počítači může útočník sledovat, co píšete."
      },
      {
        id: 5,
        question: "Co dělat při krádeži telefonu?",
        options: ["Koupit nový", "Vzdáleně ho uzamknout/vymazat a blokovat SIM", "Čekat, až se zloděj ozve", "Nahlásit to na Facebooku"],
        correctAnswer: 1,
        hint: "Rychlá reakce zabrání zloději dostat se k vašim datům a 2FA kódům."
      },
      {
        id: 6,
        question: "Když omylem sdělíte údaje k bankovní kartě podvodníkovi, co uděláte?",
        options: ["Okamžitě blokuji kartu v aplikaci/bance", "Počkám na výpis", "Změním heslo k e-mailu", "Nic"],
        correctAnswer: 0,
        hint: "Karta se dá zablokovat vteřiny po incidentu přes mobilní bankovnictví."
      },
      {
        id: 7,
        question: "Pokud vás vydírá ransomware, máte platit výkupné?",
        options: ["Ano, ihned", "Ne, není záruka vrácení dat a podporujete zločin", "Ano, ale jen půlku", "Možná"],
        correctAnswer: 1,
        hint: "Platit zločincům se nevyplácí. Často data stejně neobnoví."
      },
      {
        id: 8,
        question: "Jak zjistíte IMEI telefonu pro policii?",
        options: ["Vytočením *#06#", "Je napsané na displeji", "V telefonním seznamu", "Nevím"],
        correctAnswer: 0,
        hint: "Univerzální kód pro zobrazení sériového čísla."
      },
      {
        id: 9,
        question: "Co znamená 'Odhlásit všechna zařízení' (z e-mailu/Facebooku)?",
        options: ["Smaže účet", "Zruší přihlášení útočníka, pokud se tam dostal", "Vypne internet", "Smaže zprávy"],
        correctAnswer: 1,
        hint: "Užitečná funkce, která 'vykopne' všechny přihlášené uživatele."
      },
      {
        id: 10,
        question: "Proč je důležité nahlásit závažné incidenty (např. bance/policii)?",
        options: ["Aby měli statistiku", "Může to pomoci vrátit peníze a chránit ostatní", "Je to zákon", "Dostanu odměnu"],
        correctAnswer: 1,
        hint: "Banka může zastavit transakce, policie může dopadnout pachatele."
      }
    ]
  },
  {
    id: 7,
    title: "Blok 7: Implementace a procesy",
    description: "Systematický přístup, zálohování a firemní kultura.",
    icon: "ClipboardCheck",
    questions: [
      {
        id: 1,
        question: "Co říká pravidlo zálohování 3-2-1?",
        options: ["3 zálohy, 2 formáty, 1 mimo domov", "3 disky, 2 počítače, 1 cloud", "3 hodiny práce, 2 hodiny pauza, 1 oběd", "3 hesla, 2 uživatelé, 1 účet"],
        correctAnswer: 0,
        hint: "Klíčové je mít data na více místech a jedno z nich fyzicky jinde (proti požáru/krádeži)."
      },
      {
        id: 2,
        question: "Co je to 'bezpečnostní kultura'?",
        options: ["Sada pravidel na papíře", "Způsob myšlení a chování lidí ve firmě/doma", "Antivirový program", "Školení jednou za 10 let"],
        correctAnswer: 1,
        hint: "Je to o tom, že lidé sami od sebe poznají podezřelý e-mail a nahlásí ho."
      },
      {
        id: 3,
        question: "Proč nestačí mít jen teoretické znalosti?",
        options: ["Teorie je nudná", "Bez zavedeného systému a návyků člověk v krizi selže", "Znalosti zabírají místo v mozku", "Nestačí to"],
        correctAnswer: 1,
        hint: "Útočníci spoléhají na to, že budete líní nebo ve stresu."
      },
      {
        id: 4,
        question: "Jak často by se měly zálohovat kritické dokumenty?",
        options: ["Jednou za rok", "Pravidelně a automaticky (např. denně)", "Až když se počítač rozbije", "Nikdy"],
        correctAnswer: 1,
        hint: "Automatizace je klíč. Na manuální zálohu zapomenete."
      },
      {
        id: 5,
        question: "Co znamená 'klasifikace dat'?",
        options: ["Seřazení podle abecedy", "Rozdělení dat podle citlivosti (veřejné, interní, tajné)", "Mazání starých dat", "Komprese souborů"],
        correctAnswer: 1,
        hint: "Ne všechna data potřebují stejnou ochranu. Jídelníček vs. hesla."
      },
      {
        id: 6,
        question: "Co je nejčastější chybou při sdílení dat ve firmách?",
        options: ["Používání e-mailu", "Sdílení přes soukromé kanály (WhatsApp, osobní Dropbox)", "Tisk dokumentů", "Používání USB"],
        correctAnswer: 1,
        hint: "Shadow IT – firma nemá kontrolu nad daty na soukromých účtech."
      },
      {
        id: 7,
        question: "Jaký princip by měl platit pro přístupová práva?",
        options: ["Všichni mají přístup ke všemu", "Princip nejnutnějšího privilegia (jen to, co potřebuji k práci)", "Přístup má jen ředitel", "Podle věku"],
        correctAnswer: 1,
        hint: "Když se omezí přístup, omezí se i škoda při napadení účtu."
      },
      {
        id: 8,
        question: "Co je to 'Audit log'?",
        options: ["Kniha návštěv", "Záznam o tom, kdo, kdy a co dělal v systému", "Seznam úkolů", "Účetní uzávěrka"],
        correctAnswer: 1,
        hint: "Díky logům zpětně zjistíte, co se stalo během incidentu."
      },
      {
        id: 9,
        question: "Co dělat při odchodu zaměstnance?",
        options: ["Uspořádat párty", "Okamžitě zrušit přístupy ke všem systémům", "Nechat účet aktivní pro kolegy", "Smazat všechna data"],
        correctAnswer: 1,
        hint: "Zapomenuté aktivní účty bývalých zaměstnanců jsou častou dírou do systému."
      },
      {
        id: 10,
        question: "Je bezpečnost jednorázový projekt?",
        options: ["Ano, nastavím a mám klid", "Ne, je to neustálý proces", "Ano, stačí koupit antivirus", "Ne, je to jen pro IT"],
        correctAnswer: 1,
        hint: "Hrozby se vyvíjejí, vaše obrana se musí vyvíjet taky."
      }
    ]
  },
  {
    id: 8,
    title: "Blok 8: Legislativa a NIS2",
    description: "Zákon o kybernetické bezpečnosti a evropská směrnice.",
    icon: "Scale",
    questions: [
      {
        id: 1,
        question: "Co je to NIS2?",
        options: ["Nový antivirus", "Evropská směrnice o kybernetické bezpečnosti", "Název hackerské skupiny", "Typ procesoru"],
        correctAnswer: 1,
        hint: "Nařizuje firmám a státům lépe chránit své sítě."
      },
      {
        id: 2,
        question: "Koho se týká NIS2?",
        options: ["Jen armády", "Širokého spektra firem (energetika, doprava, banky, zdravotnictví...)", "Pouze výrobců PC", "Běžných občanů doma"],
        correctAnswer: 1,
        hint: "Týká se 'důležitých' a 'základních' služeb pro chod státu."
      },
      {
        id: 3,
        question: "Jaký úřad v ČR dohlíží na kybernetickou bezpečnost?",
        options: ["NBÚ", "NÚKIB (Národní úřad pro kybernetickou a informační bezpečnost)", "ČNB", "Ministerstvo vnitra"],
        correctAnswer: 1,
        hint: "Sídlí v Brně a je hlavní autoritou pro cyber security."
      },
      {
        id: 4,
        question: "Co musí firmy podle NIS2 hlásit?",
        options: ["Každý spam", "Významné kybernetické incidenty", "Změnu ředitele", "Nákup nových myší"],
        correctAnswer: 1,
        hint: "Stát musí vědět o útocích, které ohrožují služby."
      },
      {
        id: 5,
        question: "Jaký dopad má NIS2 na dodavatele velkých firem?",
        options: ["Žádný", "Velké firmy budou po dodavatelích vyžadovat bezpečnost", "Dostanou pokutu", "Musí zavřít"],
        correctAnswer: 1,
        hint: "Bezpečnost se přenáší celým dodavatelským řetězcem."
      },
      {
        id: 6,
        question: "Co je 'Management rizik' vyžadovaný zákonem?",
        options: ["Pojištění proti požáru", "Pravidelné vyhodnocování hrozeb a zavádění opatření", "Hazardní hry", "Investování na burze"],
        correctAnswer: 1,
        hint: "Musíte vědět, co vás ohrožuje, abyste se mohli bránit."
      },
      {
        id: 7,
        question: "Hrozí za nedodržení NIS2 pokuty?",
        options: ["Ne, je to dobrovolné", "Ano, a mohou být velmi vysoké (až miliony EUR)", "Jen napomenutí", "Ano, 1000 Kč"],
        correctAnswer: 1,
        hint: "Sankce jsou nastaveny tak, aby je firmy braly vážně."
      },
      {
        id: 8,
        question: "Týká se NIS2 přímo běžného občana doma?",
        options: ["Ano, musím hlásit viry", "Ne přímo, ale budu profitovat z bezpečnějších služeb", "Ano, musím mít speciální router", "Ne"],
        correctAnswer: 1,
        hint: "Zákon reguluje firmy, aby vaše data a služby (voda, elektřina) byly v bezpečí."
      },
      {
        id: 9,
        question: "Kdy přibližně vstupuje regulace v platnost?",
        options: ["Už platí (cca od 2024/2025)", "Za 10 let", "Nikdy", "V roce 2000"],
        correctAnswer: 0,
        hint: "Je to aktuální téma."
      },
      {
        id: 10,
        question: "Co musí zajistit vedení firmy (jednatelé) podle NIS2?",
        options: ["Nic, to dělá IT", "Musí se vzdělávat v bezpečnosti a nesou odpovědnost", "Musí umět programovat", "Musí koupit nejdražší software"],
        correctAnswer: 1,
        hint: "Odpovědnost už nelze jen 'hodit na IT oddělení'."
      }
    ]
  },
  {
    id: 9,
    title: "Blok 9: Umělá inteligence (AI) a hrozby",
    description: "Deepfakes, voice cloning a jak AI mění pravidla hry.",
    icon: "Bot",
    questions: [
      {
        id: 1,
        question: "Jak AI pomáhá útočníkům při phishingu?",
        options: ["Píše e-maily pomalu", "Vytváří perfektní texty bez gramatických chyb a v rodném jazyce", "Dělá v textech chyby", "Nepomáhá"],
        correctAnswer: 1,
        hint: "Dříve jsme poznali podvod podle špatné češtiny. To s AI končí."
      },
      {
        id: 2,
        question: "Co je to 'Deepfake'?",
        options: ["Hluboký bazén", "Video nebo audio vytvořené AI, které vypadá jako skutečná osoba", "Falešný profil na Facebooku", "Typ viru"],
        correctAnswer: 1,
        hint: "Můžete vidět video prezidenta říkat něco, co nikdy neřekl."
      },
      {
        id: 3,
        question: "Co je to 'Voice Cloning'?",
        options: ["Klonování ovcí", "Klonování hlasu (stačí pár vteřin záznamu k napodobení)", "Hlasové ovládání", "Zpěv s AI"],
        correctAnswer: 1,
        hint: "Útočník vám může zavolat hlasem vašeho dítěte nebo šéfa."
      },
      {
        id: 4,
        question: "Jak se bránit proti AI podvodu 'Vnuk v nouzi' (hlas v telefonu)?",
        options: ["Hned poslat peníze", "Zavěsit a zavolat zpět na ověřené číslo dotyčného", "Věřit AI", "Nic nedělat"],
        correctAnswer: 1,
        hint: "Ověření jiným kanálem je nejlepší obrana."
      },
      {
        id: 5,
        question: "Může AI sloužit i k obraně?",
        options: ["Ne, AI je zlá", "Ano, dokáže detekovat útoky rychleji než člověk", "Jen pro hraní her", "Ano, ale je to drahé"],
        correctAnswer: 1,
        hint: "Behaviorální analýza pomocí AI pozná, že se uživatel chová divně."
      },
      {
        id: 6,
        question: "Co jsou 'syntetické identity'?",
        options: ["Plastové občanky", "Neexistující lidé vytvoření AI (fotky, profily)", "Roboti", "Přezdívky"],
        correctAnswer: 1,
        hint: "Lidé, kteří nikdy neexistovali, ale mají LinkedIn a Facebook."
      },
      {
        id: 7,
        question: "Jak poznat Deepfake video?",
        options: ["Nelze to poznat", "Podle nepřirozeného mrkání, stínů nebo divných okrajů obličeje", "Je černobílé", "Má vodoznak"],
        correctAnswer: 1,
        hint: "Technologie není dokonalá, hledejte vizuální chyby (glitche)."
      },
      {
        id: 8,
        question: "Co je 'Liar's Dividend'?",
        options: ["Dividenda z akcií", "Situace, kdy skuteční viníci tvrdí, že pravý důkaz je Deepfake", "Odměna za lhaní", "Typ podvodu"],
        correctAnswer: 1,
        hint: "Zločinci mohou popřít realitu tvrzením 'to vytvořila AI'."
      },
      {
        id: 9,
        question: "Jak rychle dokáže AI generovat nové varianty malwaru?",
        options: ["Trvá to týdny", "Během vteřin", "Neumí to", "Jednou za rok"],
        correctAnswer: 1,
        hint: "Automatizace umožňuje útočníkům být extrémně rychlí."
      },
      {
        id: 10,
        question: "Co musíme dělat v éře AI?",
        options: ["Věřit všemu, co vidíme", "Být mnohem více skeptičtí a ověřovat informace", "Nepoužívat internet", "Bát se"],
        correctAnswer: 1,
        hint: "Důvěřuj, ale prověřuj – teď platí dvojnásob."
      }
    ]
  }
];