/* Ferie Quiz — spørgsmålsdata. Hver kategori har nem/mellem/svaer, 5 spørgsmål hver. */

const CATEGORIES = [
  { id: 'sommer',   name: 'Sommer & Ferie', emoji: '🏖️', color: '#FF6B57' },
  { id: 'mad',      name: 'Mad & Drikke',   emoji: '🍹', color: '#FFB238' },
  { id: 'film',     name: 'Film & TV',      emoji: '🎬', color: '#A66CFF' },
  { id: 'musik',    name: 'Musik',          emoji: '🎵', color: '#FF5DA2' },
  { id: 'geografi', name: 'Geografi & Verden', emoji: '🌍', color: '#2EC4B6' },
  { id: 'dyr',      name: 'Dyr & Natur',    emoji: '🐬', color: '#4CB963' },
  { id: 'sport',    name: 'Sport & Leg',    emoji: '🏐', color: '#3AA6FF' },
  { id: 'alment',   name: 'Alment & Sjov',  emoji: '🧠', color: '#FFD23F' },
];

const QUESTIONS = {
  sommer: {
    nem: [
      { q: "Hvilken årstid har normalt flest soltimer i Danmark?", options: ["Sommer", "Vinter", "Forår", "Efterår"], correct: "Sommer", fact: "Juni og juli er typisk Danmarks lyseste måneder." },
      { q: "Hvad kalder man det, når man ligger og nyder solen på en strand?", options: ["Solbadning", "Skibadning", "Månebadning", "Regnbadning"], correct: "Solbadning", fact: "Husk solcreme — for meget sol kan give solskoldning." },
      { q: "Hvilken frugt er et klassisk symbol på sommer og grillaftener?", options: ["Vandmelon", "Rosenkål", "Æble", "Grønkål"], correct: "Vandmelon", fact: "Vandmelon består af omkring 92% vand." },
      { q: "Hvad smører man på huden for at undgå solskoldning?", options: ["Solcreme", "Skocreme", "Hårlak", "Tandpasta"], correct: "Solcreme", fact: "Solfaktoren (SPF) angiver, hvor meget længere du kan tåle solen." },
      { q: "Hvad hedder tasken, man ofte pakker med badetøj og håndklæde til stranden?", options: ["Strandtaske", "Skoletaske", "Værktøjskasse", "Pengeskab"], correct: "Strandtaske", fact: "En taske i mesh-stof lader sand falde igennem i stedet for at klæbe fast." },
    ],
    mellem: [
      { q: "Hvad kalder man en ferieform, hvor man rejser rundt til flere forskellige steder?", options: ["Rundrejse", "Hjemmeferie", "Storbyferie", "Krydstogt"], correct: "Rundrejse", fact: "Populært blandt bl.a. bagpackere i Sydøstasien og Sydamerika." },
      { q: "Hvilken ferieform viser dette billede?", visual: "🏕️", options: ["Camping", "Storbyferie", "Skiferie", "Krydstogt"], correct: "Camping", fact: "Danmark har over 400 campingpladser." },
      { q: "Hvilken kendt dansk forlystelsespark ligger midt i København?", options: ["Tivoli", "Bakken", "Legoland", "Djurs Sommerland"], correct: "Tivoli", fact: "Tivoli åbnede i 1843 og er en af verdens ældste forlystelsesparker i drift." },
      { q: "Hvilket hav ligger ud for den jyske vestkyst og er populært blandt surfere?", options: ["Nordsøen", "Sortehavet", "Adriaterhavet", "Det Røde Hav"], correct: "Nordsøen", fact: "Vestkysten er kendt for lange sandstrande og høje bølger." },
      { q: "Ifølge den danske ferielov, hvor mange ugers betalt ferie har de fleste lønmodtagere ret til om året?", options: ["5 uger", "3 uger", "4 uger", "6 uger"], correct: "5 uger", fact: "Det svarer til 25 feriedage om året." },
    ],
    svaer: [
      { q: "Det danske ord 'ferie' stammer fra det latinske 'feriae'. Hvad betyder det oprindeligt?", options: ["Helligdage", "Rejsedage", "Solskin", "Frihed"], correct: "Helligdage", fact: "Ordet er historisk knyttet til hviledage og religiøse fester." },
      { q: "Hvilken engelsk iværksætter arrangerede en af verdens første organiserede gruppeudflugter i 1841 og grundlagde dermed rejsebureau-branchen?", options: ["Thomas Cook", "Richard Branson", "James Cook", "Thomas Edison"], correct: "Thomas Cook", fact: "Turen gik med tog fra Leicester til Loughborough med omkring 500 rejsende." },
      { q: "Hvilken dansk ø kaldes ofte 'solskinsøen', fordi den har flest solskinstimer i Danmark?", options: ["Bornholm", "Fyn", "Møn", "Ærø"], correct: "Bornholm", fact: "Bornholm har op mod 1900 solskinstimer om året." },
      { q: "Hvilket land forbindes med dette flag — et populært rejsemål i Sydøstasien?", visual: "🇹🇭", options: ["Thailand", "Vietnam", "Indonesien", "Malaysia"], correct: "Thailand", fact: "Thailand kaldes ofte 'Smilenes Land'." },
      { q: "Hvornår fik danske lønmodtagere for første gang lovfæstet ret til betalt ferie?", options: ["1938", "1919", "1956", "1970"], correct: "1938", fact: "Loven gav dengang ret til 2 ugers betalt ferie om året." },
    ],
  },
  mad: {
    nem: [
      { q: "Hvad hedder den kolde spise lavet af frosset fløde eller mælk, populær om sommeren?", options: ["Is", "Suppe", "Grød", "Brød"], correct: "Is", fact: "Verdens første iskiosker slog for alvor igennem i USA i 1800-tallet." },
      { q: "Hvilken drik laves ved at presse citroner og blande med vand og sukker?", options: ["Lemonade", "Kaffe", "Te", "Mælk"], correct: "Lemonade", fact: "Ordet stammer fra det franske 'limonade'." },
      { q: "Hvad lægges klassisk dansk smørrebrød typisk på?", options: ["Rugbrød", "Toastbrød", "Pizzabund", "Pandekage"], correct: "Rugbrød", fact: "Rugbrød er en dansk madpakke-klassiker." },
      { q: "Hvilken frugt er gul, buet og en klassisk madpakke-frugt?", options: ["Banan", "Blomme", "Kirsebær", "Fersken"], correct: "Banan", fact: "Bananer flyder i vand, fordi de er mindre tætte end vand." },
      { q: "Hvad kaldes mad, man tilbereder over åben ild udenfor om sommeren?", options: ["Grillmad", "Ovnmad", "Dampmad", "Frysemad"], correct: "Grillmad", fact: "Dansk sommer betyder ofte grill i haven eller parken." },
    ],
    mellem: [
      { q: "Hvilket krydderi giver traditionel dansk julegløgg dens karakteristiske smag sammen med nelliker?", options: ["Kanel", "Persille", "Karry", "Dild"], correct: "Kanel", fact: "Kanel udvindes fra barken på kanceltræer." },
      { q: "Hvilken frugt viser dette billede?", visual: "🍍", options: ["Ananas", "Kokosnød", "Mango", "Papaya"], correct: "Ananas", fact: "Det kan tage op til to år for en ananas at modne." },
      { q: "Hvad hedder den spanske kolde tomatsuppe, populær om sommeren?", options: ["Gazpacho", "Bouillabaisse", "Minestrone", "Borsjtj"], correct: "Gazpacho", fact: "Gazpacho spises iskold og kræver ingen komfur." },
      { q: "Hvilket land er ophavsland for retten sushi?", options: ["Japan", "Kina", "Thailand", "Korea"], correct: "Japan", fact: "'Sushi' betyder egentlig 'sur ris' — ikke 'rå fisk'." },
      { q: "Hvad hedder den italienske is, der er mere cremet og har mindre luft end almindelig is?", options: ["Gelato", "Sorbet", "Granita", "Frappé"], correct: "Gelato", fact: "Gelato indeholder typisk mindre luft og fedt end amerikansk is." },
    ],
    svaer: [
      { q: "Hvilken fransk region er kendt som champagnens hjemsted?", options: ["Champagne", "Bourgogne", "Provence", "Alsace"], correct: "Champagne", fact: "Kun mousserende vin fra denne region må kaldes champagne." },
      { q: "Hvad kaldes processen, hvor druer omdannes til vin ved hjælp af gær?", options: ["Gæring", "Destillation", "Filtrering", "Marinering"], correct: "Gæring", fact: "Gærceller omdanner sukker til alkohol og kuldioxid." },
      { q: "Hvilket krydderi er verdens dyreste pr. vægt, høstet fra safran-krokussens støvfang?", options: ["Safran", "Vanilje", "Kardemomme", "Muskatnød"], correct: "Safran", fact: "Der skal omkring 150 blomster til for at lave blot 1 gram safran." },
      { q: "Hvilken ret gemmer sig i denne billedgåde?", visual: "🍝🇮🇹", options: ["Pasta", "Sushi", "Tacos", "Couscous"], correct: "Pasta", fact: "Der findes over 300 forskellige pastaformer." },
      { q: "Hvad betyder 'al dente', som bruges om perfekt kogt pasta?", options: ["Fast under tyggen", "Meget blødkogt", "Rå", "Overkogt"], correct: "Fast under tyggen", fact: "Overkogt pasta bliver blød og mister sin bid." },
    ],
  },
  film: {
    nem: [
      { q: "Hvad kaldes den fine pris, der gives til de bedste film i Hollywood hvert år?", options: ["Oscar", "Grammy", "Emmy", "Tony"], correct: "Oscar", fact: "Den lille guldstatuette blev første gang uddelt i 1929." },
      { q: "Hvilket dyr er hovedperson i Disney-filmen 'Kong Løven'?", options: ["Løve", "Elefant", "Tiger", "Bjørn"], correct: "Løve", fact: "Historien er delvist inspireret af Shakespeares 'Hamlet'." },
      { q: "Hvad hedder den grønne kæmpe, der bor i en sump, fra filmserien med samme navn?", options: ["Shrek", "Hulk", "Yoda", "Gollum"], correct: "Shrek", fact: "Shrek er baseret på en billedbog af William Steig." },
      { q: "I hvilken by foregår størstedelen af den amerikanske filmindustri?", options: ["Hollywood", "New York", "Chicago", "Miami"], correct: "Hollywood", fact: "Det berømte Hollywood-skilt stod oprindeligt som reklame for et boligområde." },
      { q: "Hvad hedder det, når man ser mange afsnit af en serie i træk?", options: ["Binge-watching", "Fast-forwarding", "Zapping", "Streaming"], correct: "Binge-watching", fact: "Ordet blev officielt tilføjet Oxford-ordbogen i 2015." },
    ],
    mellem: [
      { q: "Hvem spiller hovedrollen som Jack i filmen 'Titanic' fra 1997?", options: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Johnny Depp"], correct: "Leonardo DiCaprio", fact: "Filmen vandt hele 11 Oscars." },
      { q: "Hvilken instruktør står bag film som 'Jaws', 'E.T.' og 'Jurassic Park'?", options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "George Lucas"], correct: "Steven Spielberg", fact: "Han er en af filmhistoriens mest indtjenende instruktører." },
      { q: "Hvilken filmklassiker beskriver denne emoji-gåde?", visual: "🦈🌊", options: ["Dødens gab (Jaws)", "Titanic", "Find Nemo", "Piraterne fra Det Caribiske Hav"], correct: "Dødens gab (Jaws)", fact: "Filmen fra 1975 regnes som den første 'sommerblockbuster'." },
      { q: "Hvad hedder troldmandsskolen, som Harry Potter går på?", options: ["Hogwarts", "Hoenn", "Narnia", "Camp Half-Blood"], correct: "Hogwarts", fact: "Navnet Hogwarts betyder groft oversat 'vortesvin'." },
      { q: "Hvilken dansk instruktør vandt en Oscar for filmen 'Babettes gæstebud'?", options: ["Gabriel Axel", "Lars von Trier", "Susanne Bier", "Bille August"], correct: "Gabriel Axel", fact: "Filmen var Danmarks første Oscar for bedste fremmedsprogede film." },
    ],
    svaer: [
      { q: "Hvilken film var i 1934 den første til at vinde 'The Big Five' Oscars (film, instruktør, mandlig og kvindelig hovedrolle m.m.)?", options: ["Det skete en nat", "Titanic", "Borte med blæsten", "Casablanca"], correct: "Det skete en nat", fact: "Bedriften er kun gentaget to gange siden i Oscar-historien." },
      { q: "Hvilket animationsstudie lavede i 1995 'Toy Story' — verdens første fuldt computeranimerede spillefilm?", options: ["Pixar", "DreamWorks", "Illumination", "Blue Sky Studios"], correct: "Pixar", fact: "Filmen tog flere år at udvikle og producere." },
      { q: "Hvilken klassisk gyserfilm gemmer sig i denne billedgåde?", visual: "🔪🚿", options: ["Psycho", "Halloween", "Scream", "Saw"], correct: "Psycho", fact: "Den berømte bruse-scene tog angiveligt en uges optagelse for under et minuts film." },
      { q: "Hvem instruerede den danske Dogme 95-bevægelse sammen med Thomas Vinterberg?", options: ["Lars von Trier", "Nicolas Winding Refn", "Susanne Bier", "Bille August"], correct: "Lars von Trier", fact: "Dogme 95 satte strenge regler for filmproduktion, bl.a. håndholdt kamera." },
      { q: "Hvilken skuespiller har vundet flest Oscars for bedste mandlige hovedrolle (3 stk.)?", options: ["Daniel Day-Lewis", "Jack Nicholson", "Tom Hanks", "Marlon Brando"], correct: "Daniel Day-Lewis", fact: "Han er kendt for at leve sig ekstremt ind i sine roller under optagelserne." },
    ],
  },
  musik: {
    nem: [
      { q: "Hvor mange strenge har en klassisk guitar normalt?", options: ["6", "4", "8", "12"], correct: "6", fact: "En basguitar har til sammenligning ofte kun 4 strenge." },
      { q: "Hvilket instrument har sorte og hvide tangenter?", options: ["Klaver", "Guitar", "Trommer", "Fløjte"], correct: "Klaver", fact: "Et klaver har typisk 88 tangenter." },
      { q: "Hvad kaldes en gruppe mennesker, der synger sammen?", options: ["Kor", "Orkester", "Band", "Ensemble"], correct: "Kor", fact: "Et kor kan synge med eller helt uden musikledsagelse." },
      { q: "Hvilken sang vandt Eurovision Song Contest for Danmark i 2013?", options: ["Only Teardrops", "Should've Known Better", "Rise Like a Phoenix", "Euphoria"], correct: "Only Teardrops", fact: "Sangen blev fremført af Emmelie de Forest." },
      { q: "Hvad kaldes den store konkurrence, hvor lande i Europa hvert år dyster i sang?", options: ["Eurovision", "Grammy Awards", "X Factor", "Melodi Grand Prix"], correct: "Eurovision", fact: "Konkurrencen er blevet afholdt siden 1956." },
    ],
    mellem: [
      { q: "Hvilket dansk band står bag hittet 'Barbie Girl'?", options: ["Aqua", "Alphabeat", "Aura Dione", "Lukas Graham"], correct: "Aqua", fact: "Sangen blev et globalt hit i 1997." },
      { q: "Hvem er kendt som 'King of Pop'?", options: ["Michael Jackson", "Elvis Presley", "Prince", "Freddie Mercury"], correct: "Michael Jackson", fact: "Han solgte over 750 millioner plader på verdensplan." },
      { q: "Hvilket instrument viser denne emoji-gåde?", visual: "🎷", options: ["Saxofon", "Trompet", "Klarinet", "Fløjte"], correct: "Saxofon", fact: "Saxofonen blev opfundet af belgieren Adolphe Sax i 1840'erne." },
      { q: "Hvilken svensk popgruppe skrev og sang hittet 'Dancing Queen'?", options: ["ABBA", "Roxette", "Ace of Base", "A-ha"], correct: "ABBA", fact: "ABBA vandt selv Eurovision i 1974 med 'Waterloo'." },
      { q: "Hvad hedder den danske finale, der finder sangen til Eurovision Song Contest?", options: ["Dansk Melodi Grand Prix", "Dansk Idol", "X Factor", "Voice"], correct: "Dansk Melodi Grand Prix", fact: "Showet har kåret Danmarks Eurovision-bidrag siden 1957." },
    ],
    svaer: [
      { q: "Hvilken østrigsk komponist skrev 'Eine kleine Nachtmusik' og over 600 andre værker, selvom han kun blev 35 år?", options: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Franz Schubert"], correct: "Wolfgang Amadeus Mozart", fact: "Han begyndte at komponere musik allerede som 5-årig." },
      { q: "Hvilket dansk symfoniorkester regnes for et af verdens ældste, grundlagt i 1448?", options: ["Det Kongelige Kapel", "DR SymfoniOrkestret", "Aarhus Symfoniorkester", "Odense Symfoniorkester"], correct: "Det Kongelige Kapel", fact: "Orkestret spiller stadig faste forestillinger på Det Kongelige Teater." },
      { q: "Hvilken genre af musik antyder denne gåde?", visual: "🤠🎸🌵", options: ["Country", "Jazz", "Hiphop", "Reggae"], correct: "Country", fact: "Genren har rødder i det amerikanske sydstatsfolkemusik." },
      { q: "Hvem komponerede balletten 'Svanesøen'?", options: ["Pjotr Tjajkovskij", "Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johannes Brahms"], correct: "Pjotr Tjajkovskij", fact: "Balletten blev første gang opført i Moskva i 1877." },
      { q: "Hvilket album regnes ifølge de fleste opgørelser for det bedst sælgende album nogensinde?", options: ["Thriller (Michael Jackson)", "The Dark Side of the Moon (Pink Floyd)", "Back in Black (AC/DC)", "Rumours (Fleetwood Mac)"], correct: "Thriller (Michael Jackson)", fact: "Albummet er solgt i over 70 millioner eksemplarer verden over." },
    ],
  },
  geografi: {
    nem: [
      { q: "Hvad hedder Danmarks hovedstad?", options: ["København", "Aarhus", "Odense", "Aalborg"], correct: "København", fact: "København har omkring 660.000 indbyggere." },
      { q: "Hvilket verdenshav er det største?", options: ["Stillehavet", "Atlanterhavet", "Det Indiske Ocean", "Nordsøen"], correct: "Stillehavet", fact: "Stillehavet dækker cirka en tredjedel af Jordens overflade." },
      { q: "Hvilket land er kendt for pizza og pasta og har et støvleformet landkort?", options: ["Italien", "Spanien", "Grækenland", "Portugal"], correct: "Italien", fact: "Italiens landkort ligner tydeligt en støvle." },
      { q: "Hvad hedder verdens højeste bjerg?", options: ["Mount Everest", "Kilimanjaro", "Mont Blanc", "K2"], correct: "Mount Everest", fact: "Bjerget er 8.849 meter højt." },
      { q: "Hvilket land har dette flag?", visual: "🇯🇵", options: ["Japan", "Kina", "Sydkorea", "Vietnam"], correct: "Japan", fact: "Japans tilnavn er 'Solens Rige'." },
    ],
    mellem: [
      { q: "Hvilken by kaldes 'Den Evige Stad'?", options: ["Rom", "Athen", "Paris", "Jerusalem"], correct: "Rom", fact: "Tilnavnet hentyder til byens lange, uafbrudte historie." },
      { q: "Hvilken flod regnes traditionelt for verdens længste?", options: ["Nilen", "Amazonfloden", "Yangtze", "Mississippi"], correct: "Nilen", fact: "Nyere målinger peger dog på, at Amazonfloden muligvis er endnu længere." },
      { q: "Hvilket land har flest indbyggere i verden i dag?", options: ["Indien", "Kina", "USA", "Indonesien"], correct: "Indien", fact: "Indien har over 1,4 milliarder indbyggere." },
      { q: "Hvilket berømt tårn viser denne gåde?", visual: "🗼🇫🇷", options: ["Eiffeltårnet", "Big Ben", "Colosseum", "Frihedsgudinden"], correct: "Eiffeltårnet", fact: "Tårnet blev bygget til verdensudstillingen i Paris i 1889." },
      { q: "Hvilket land består af over 17.000 øer og er verdens største østat?", options: ["Indonesien", "Filippinerne", "Japan", "New Zealand"], correct: "Indonesien", fact: "Kun omkring 6.000 af øerne er beboede." },
    ],
    svaer: [
      { q: "Hvad hedder verdens mindste land målt i areal?", options: ["Vatikanstaten", "Monaco", "San Marino", "Liechtenstein"], correct: "Vatikanstaten", fact: "Landet er kun omkring 0,44 kvadratkilometer stort." },
      { q: "Hvilken ørken er verdens største varme ørken?", options: ["Sahara", "Gobi", "Kalahari", "Atacama"], correct: "Sahara", fact: "Sahara er næsten lige så stor som hele USA." },
      { q: "Hvilke to lande deler verdens længste landegrænse?", options: ["USA og Canada", "Rusland og Kina", "Chile og Argentina", "Kasakhstan og Rusland"], correct: "USA og Canada", fact: "Grænsen strækker sig over mere end 8.800 km." },
      { q: "Hvilket bjerg gemmer sig i denne gåde?", visual: "🗻🇹🇿", options: ["Kilimanjaro", "Mount Everest", "Fuji", "Matterhorn"], correct: "Kilimanjaro", fact: "Det er Afrikas højeste bjerg." },
      { q: "Hvilken by er verdens nordligste hovedstad i et selvstændigt land?", options: ["Reykjavik", "Oslo", "Helsinki", "Nuuk"], correct: "Reykjavik", fact: "Byen ligger så langt nordpå, at somrene har lyse nætter." },
    ],
  },
  dyr: {
    nem: [
      { q: "Hvilket dyr er kendt som 'kongen af junglen'?", options: ["Løve", "Tiger", "Elefant", "Gorilla"], correct: "Løve", fact: "Løver er de eneste kattedyr, der lever i store flokke." },
      { q: "Hvor mange ben har en edderkop?", options: ["8", "6", "10", "4"], correct: "8", fact: "Edderkopper er ikke insekter, men spindlere." },
      { q: "Hvilket dyr er verdens største nulevende landdyr?", options: ["Elefant", "Flodhest", "Næsehorn", "Giraf"], correct: "Elefant", fact: "En voksen elefant kan veje op mod 6 tons." },
      { q: "Hvad hedder verdens højeste dyr?", options: ["Giraf", "Elefant", "Struds", "Kamel"], correct: "Giraf", fact: "En giraf kan blive op til 5-6 meter høj." },
      { q: "Hvilket dyr viser denne gåde?", visual: "🦁", options: ["Løve", "Tiger", "Puma", "Leopard"], correct: "Løve", fact: "Et løvebrøl kan høres op til 8 km væk." },
    ],
    mellem: [
      { q: "Hvilket havdyr er verdens største nulevende dyr?", options: ["Blåhval", "Kaskelothval", "Elefant", "Hvid haj"], correct: "Blåhval", fact: "Blåhvalens hjerte alene kan veje omkring 180 kg." },
      { q: "Hvor mange hjerter har en blæksprutte?", options: ["3", "1", "2", "4"], correct: "3", fact: "To af hjerterne pumper blod til gællerne, det tredje til resten af kroppen." },
      { q: "Hvilket dyr gemmer sig i denne gåde?", visual: "🐧❄️", options: ["Pingvin", "Isbjørn", "Sæl", "Pelikan"], correct: "Pingvin", fact: "Pingviner kan ikke flyve, men er til gengæld dygtige svømmere." },
      { q: "Hvilket dyr kan ændre farve for at kamuflere sig?", options: ["Kamæleon", "Frø", "Slange", "Firben"], correct: "Kamæleon", fact: "Kamæleoner skifter ofte farve for at kommunikere, ikke kun for camouflage." },
      { q: "Hvad er Danmarks nationalfugl?", options: ["Knopsvane", "Stork", "Ørn", "Ugle"], correct: "Knopsvane", fact: "Knopsvanen er en af Danmarks tungeste flyvende fugle." },
    ],
    svaer: [
      { q: "Hvilket dyr sover med kun det halve af hjernen ad gangen, så det kan holde øje med fare?", options: ["Delfin", "Kat", "Hund", "Sæl"], correct: "Delfin", fact: "Fænomenet kaldes unihemisfærisk søvn." },
      { q: "Cirka hvor mange 'hjerter' (aortabuer) har en regnorm?", options: ["10 (5 par)", "1", "3", "4 (2 par)"], correct: "10 (5 par)", fact: "De fungerer som pumper for regnormens blodkredsløb." },
      { q: "Hvilket dyr antyder denne gåde?", visual: "🐨🌿", options: ["Koala", "Panda", "Doven", "Kænguru"], correct: "Koala", fact: "Koalaer sover op til 20 timer i døgnet." },
      { q: "Hvilken flyveudygtige fugl er verdens hurtigste løber blandt fugle?", options: ["Struds", "Pingvin", "Påfugl", "Emu"], correct: "Struds", fact: "En struds kan løbe op til 70 km/t." },
      { q: "Hvad kaldes fænomenet, hvor dyr som bjørne sover det meste af vinteren?", options: ["Hi/dvale", "Migration", "Metamorfose", "Symbiose"], correct: "Hi/dvale", fact: "Under dvale sænkes puls og stofskifte markant." },
    ],
  },
  sport: {
    nem: [
      { q: "Hvor mange spillere er der på en fodboldbane fra hvert hold (inkl. målmand)?", options: ["11", "9", "7", "13"], correct: "11", fact: "Det giver 22 spillere på banen i alt." },
      { q: "Hvilken sport spilles med en ketsjer og en lille gul bold på en bane med net?", options: ["Tennis", "Fodbold", "Håndbold", "Golf"], correct: "Tennis", fact: "Den gule bold blev standard i tennis i 1970'erne." },
      { q: "Hvor ofte afholdes de olympiske sommerlege normalt?", options: ["Hvert 4. år", "Hvert 2. år", "Hvert år", "Hvert 5. år"], correct: "Hvert 4. år", fact: "Legene blev dog aflyst under begge verdenskrige." },
      { q: "Hvilken sport har Danmark ofte gjort det stærkt i ved internationale mesterskaber og OL?", options: ["Håndbold", "Baseball", "Cricket", "Amerikansk fodbold"], correct: "Håndbold", fact: "Danmark har flere gange vundet OL-guld i herrehåndbold." },
      { q: "Hvilken sport viser denne gåde?", visual: "⛳🏌️", options: ["Golf", "Fodbold", "Tennis", "Bowling"], correct: "Golf", fact: "En runde golf spilles typisk over 18 huller." },
    ],
    mellem: [
      { q: "Hvor mange ringe er der i det olympiske symbol?", options: ["5", "4", "6", "7"], correct: "5", fact: "Ringene symboliserer de fem beboede verdensdele." },
      { q: "Hvilket land har vundet flest VM-titler i mændenes fodbold?", options: ["Brasilien", "Tyskland", "Italien", "Argentina"], correct: "Brasilien", fact: "Brasilien er det eneste land, der har deltaget ved alle VM-slutrunder." },
      { q: "Hvor mange spillere er der på hvert hold på banen samtidig i håndbold (inkl. målmand)?", options: ["7", "6", "8", "5"], correct: "7", fact: "Det er 6 markspillere og 1 målmand." },
      { q: "Hvilken sport antyder denne gåde?", visual: "🏂❄️", options: ["Snowboard", "Skiløb", "Skøjteløb", "Bobslæde"], correct: "Snowboard", fact: "Sporten blev første gang en OL-disciplin i 1998." },
      { q: "Hvor mange point er en 'touchdown' værd i amerikansk fodbold (uden ekstra forsøg)?", options: ["6", "7", "3", "10"], correct: "6", fact: "Holdet kan bagefter forsøge et ekstra point eller to." },
    ],
    svaer: [
      { q: "I hvilken by blev de første moderne olympiske lege afholdt i 1896?", options: ["Athen", "Paris", "London", "Rom"], correct: "Athen", fact: "Legene i 1896 havde deltagere fra 14 nationer." },
      { q: "Hvilken af disse er IKKE en af tennissportens fire Grand Slam-turneringer?", options: ["European Open", "Wimbledon", "Australian Open", "US Open"], correct: "European Open", fact: "Der findes ingen Grand Slam-turnering ved det navn." },
      { q: "Hvilken vintersport gemmer sig i denne gåde?", visual: "🥌🧊", options: ["Curling", "Ishockey", "Skøjteløb", "Bob"], correct: "Curling", fact: "Sporten stammer oprindeligt fra Skotland." },
      { q: "Hvor langt er en maraton officielt?", options: ["42,195 km", "40 km", "45 km", "21,1 km"], correct: "42,195 km", fact: "Distancen stammer fra afstanden mellem Marathon og Athen." },
      { q: "I hvilket land blev badminton kodificeret i sin moderne form, opkaldt efter et engelsk gods?", options: ["England", "Indien", "Kina", "Danmark"], correct: "England", fact: "Navnet stammer fra Badminton House i Gloucestershire." },
    ],
  },
  alment: {
    nem: [
      { q: "Hvor mange dage er der i et normalt (ikke-skud) år?", options: ["365", "360", "366", "364"], correct: "365", fact: "Hvert 4. år har februar en ekstra dag — skudår." },
      { q: "Hvilken farve får du, hvis du blander blå og gul?", options: ["Grøn", "Lilla", "Orange", "Brun"], correct: "Grøn", fact: "Blandet med rødt bliver blåt i stedet til lilla." },
      { q: "Hvor mange minutter er der i en time?", options: ["60", "100", "50", "30"], correct: "60", fact: "En time er også 3.600 sekunder." },
      { q: "Hvad kaldes de første bogstaver på et almindeligt dansk tastatur (øverste bogstavrække)?", options: ["QWERTY", "ABCDEF", "AZERTY", "QWERTZ"], correct: "QWERTY", fact: "Layoutet blev designet i 1870'erne til mekaniske skrivemaskiner." },
      { q: "Hvilket organ i kroppen pumper blod rundt?", options: ["Hjertet", "Lungerne", "Leveren", "Nyrerne"], correct: "Hjertet", fact: "Et voksent hjerte slår typisk 60-100 gange i minuttet i hvile." },
    ],
    mellem: [
      { q: "Hvad er hovedstaden i Australien (ikke Sydney!)?", options: ["Canberra", "Sydney", "Melbourne", "Perth"], correct: "Canberra", fact: "Byen blev grundlagt som kompromis mellem Sydney og Melbourne." },
      { q: "Hvor mange planeter er der i vores solsystem, siden Pluto blev nedgraderet?", options: ["8", "9", "7", "10"], correct: "8", fact: "Pluto blev omklassificeret til en dværgplanet i 2006." },
      { q: "Hvilket naturfænomen viser dette billede?", visual: "🌋", options: ["Vulkan", "Jordskælv", "Tornado", "Oversvømmelse"], correct: "Vulkan", fact: "Der findes over 1.500 aktive vulkaner i verden." },
      { q: "Hvad står forkortelsen 'www' for?", options: ["World Wide Web", "World Wide Wireless", "Web Wide World", "Wide World Web"], correct: "World Wide Web", fact: "Det blev opfundet af Tim Berners-Lee i 1989." },
      { q: "Hvilket metal er flydende ved stuetemperatur?", options: ["Kviksølv", "Jern", "Guld", "Aluminium"], correct: "Kviksølv", fact: "Kviksølv er giftigt og bruges i dag langt sjældnere end tidligere." },
    ],
    svaer: [
      { q: "Hvor mange knogler har et voksent menneske normalt?", options: ["206", "186", "226", "246"], correct: "206", fact: "Babyer fødes med omkring 300 knogler, som gror sammen med tiden." },
      { q: "Hvad hedder den mindste enhed af et grundstof, der stadig har grundstoffets egenskaber?", options: ["Atom", "Molekyle", "Celle", "Elektron"], correct: "Atom", fact: "Ordet stammer fra græsk og betyder 'udelelig'." },
      { q: "Hvilket fænomen viser denne gåde?", visual: "🌈☔☀️", options: ["Regnbue", "Nordlys", "Solformørkelse", "Tsunami"], correct: "Regnbue", fact: "En regnbue opstår, når lys brydes i vanddråber." },
      { q: "Hvilken dansk fysiker vandt Nobelprisen i fysik i 1922 for sit arbejde med atomets struktur?", options: ["Niels Bohr", "H.C. Ørsted", "Tycho Brahe", "Ole Rømer"], correct: "Niels Bohr", fact: "Han grundlagde senere det berømte Niels Bohr Institutet i København." },
      { q: "Hvor mange hjerteslag har et menneske i gennemsnit ca. per minut i hvile?", options: ["60-100", "20-40", "150-200", "250-300"], correct: "60-100", fact: "Under hård træning kan pulsen stige til det dobbelte eller mere." },
    ],
  },
};
