# Project Summary - Roosterapp Bakkerij Stroet

Laatst bijgewerkt: 2026-06-09

Live URL: https://rooster-app-live.vercel.app

## 1. Projectoverzicht

Roosterapp is het live planning-, uren-, aanvragen- en bezorgplatform voor Bakkerij Stroet.

De app ondersteunt:

- rooster bekijken en plannen
- slimme planner / voorstelplanning
- medewerkersbeheer en bevoegdheden
- aanvragen, afwezigheid en beschikbaarheid
- urenregistratie en urencontrole
- bezorg-PDF verwerken, routebord, print en chauffeurmodus
- administratie-overzicht voor planner/admin

Architectuur:

- `index.html`: statische structuur, panelen, login, modals en script/style includes.
- `app.js`: centrale appstate, renderlogica, roosterplanning, aanvragen, uren, administratie en login.
- `styles.css`: styling, responsive layouts en printregels.
- `js/features/*`: featuremodules, waaronder delivery, requests, hours, employees en planninghelpers.
- `api/*`: Vercel API-routes.
- Data via Supabase/API-structuur.
- Deploy via GitHub/main en Vercel production.

Belangrijke live afspraak:

- Codewijzigingen: checks draaien, commit, push naar `main`, Vercel deploy controleren en live werking controleren.
- Live data niet overschrijven.
- Geen productie-mail zonder expliciet akkoord.

## 2. Actuele Live Status

Laatste bekende production status:

- Production URL: https://rooster-app-live.vercel.app
- Vercel project: `rooster-app-live`
- Static root/output staat op repository root.
- `vercel.json` gebruikt `outputDirectory: "."`.
- Hoofdpagina, `app.js` en `styles.css` worden als statische root-assets geserveerd.
- Cache headers staan op no-store/no-cache voor HTML, `app.js`, `styles.css` en `js/*`.

Meest recente documentatiestand:

- `PROJECT_SUMMARY.md` is deze actuele bron van projectcontext.
- De app is geen volledig automatisch beslissysteem; het is een praktische slimme planningsassistent.
- Planner/admin blijft leidend bij planning, routes, aanvragen en opslaan.

## 3. Belangrijke Principes

- Geen Supabase-schemawijzigingen zonder apart akkoord en plan.
- Geen API-breaking changes zonder apart akkoord.
- Geen autosave tenzij expliciet gevraagd.
- Geen live rooster opslaan tijdens read-only tests.
- Geen mailflow of productie-mail starten zonder expliciet akkoord.
- Planner blijft leidend.
- Bij onzekerheid: tonen, niet stil gokken.
- Product `rawLine` uit bezorg-PDF exact behouden.
- Parser mag onzekerheden niet verbergen; die moeten zichtbaar zijn in Technisch.
- Route 2 ontstaat eerst als advies na routecapaciteitscontrole, niet eerder.
- Chauffeuracties blijven lokaal/localStorage, tenzij later anders besloten.
- Geen bestaande live data overschrijven met stale localStorage.

## 4. Bezorgmodule

De bezorgmodule is uitgegroeid tot een praktische planner- en chauffeurflow voor bezorglijsten.

### PDF Upload en Parser

PDF-upload loopt via de serverparser:

- `api/delivery-parse-pdf.js`
- Frontend/routebord in `js/features/delivery.js`

De parser ondersteunt en rapporteert:

- STOPHEADER-detectie voor klant/adres/tijd/betaling.
- STOPPRODUCT-detectie voor productregels.
- Leading-count productregels, bijvoorbeeld `11 WARM Breudje Trump`.
- Trailing-count productregels, bijvoorbeeld `heel ONGESNEDEN Oeoerenwit 3`.
- Kolomgebaseerde reconstructie met verbeterde productkolomgrenzen.
- Pagina-overgangen, zodat producten bij de juiste stop blijven.
- Producten onder de juiste klant koppelen.
- Productregels zonder stop zichtbaar rapporteren.
- Stops zonder producten zichtbaar rapporteren.
- Onbekende/zwakke klantmatch zichtbaar maken.

Belangrijke parserfixes:

- `ONGESNEDEN` blokkeert snijberekening, maar blijft wel productregel.
- Grandcafe de gracht behoudt `heel ONGESNEDEN Oeoerenwit 3`.
- HCR Prinsen Haarlo behoudt productregels over kolomgrenzen heen.
- Beerten krijgt niet langer HCR-productregels.
- Cafe Beltman/pagina-overgangen blijven controlepunt.

### Productclassificatie

Productregels worden praktijkgericht geclassificeerd:

- `laadproduct`: echte producten die chauffeur moet meenemen.
- `orderOpmerking`: opmerkingen, taartopties, verpakkings- of bereidingswensen.
- `administratief`: bezorgkosten/transportregels.

Voorbeelden orderOpmerking:

- `GESNEDEN?:`
- `VULLING:`
- `AFWERKING:`
- `FOTO OP ELK STUKJE?:`
- `Extra Bestelling:`
- `1,00 Graag 5 x glutenvrij broodje.`
- `1,00 1 geen tomaat en 1 van geen kaas`
- `1,00 in zakje`
- `1,00 Met tekst`
- `1,00 +convettie`

Voorbeelden administratief:

- `Bezorgkosten-...`
- `Bezorgen in Borculo`
- `Bezorgen in Eibergen`
- `Bezorgen in Neede`

Belangrijk onderscheid:

- `Glutenvrij Broodje 5` mag laadproduct blijven.
- `1,00 Graag 5 x glutenvrij broodje.` is orderOpmerking.
- `5 broodjes gezond` blijft laadproduct.
- `1,00 5 broodjes gezond` is orderOpmerking.

Productcategorieen voor routekwaliteit:

- warm: hoogste tijdkritiek.
- gebak/banket/taart: middelhoge tijdprioriteit, kan vaak eerder mee.
- brood/broodjes: lagere tijdprioriteit.
- administratief en orderOpmerking tellen niet als laadproduct.

### Praktijkregels

- Stop zonder tijd is geen fout.
- Stop zonder tijd krijgt label: `Flexibele stop (geen tijd opgegeven)`.
- Tijdkritische stops en warme producten gaan voor flexibele stops.
- Postcodes die met `9999` beginnen zijn administratieve postcodes.
- `9999`-postcodes worden niet gebruikt voor postcodecluster/routeoptimalisatie.
- Bij administratieve postcode gebruikt de app plaats/adres/klantmatch/historie als zachtere signalen.
- Technisch toont: `Administratieve postcode gebruikt`.

### Technisch Paneel

Onder Technisch staan nu meerdere controles:

- PDF leescontrole.
- Herkenningsrapport.
- Parserkwaliteit.
- Unieke/ongekoppelde productregels.
- Flexibele stops.
- Administratieve postcodes.
- Productcategorieen.
- Plannerantwoorden/correcties.
- Ritblok-analyse.
- Routecapaciteit advies.
- Plannerlogica.

PDF leescontrole toont plannergericht per pagina:

- gevonden stops in volgorde.
- klantnaam.
- adres.
- postcode/plaats.
- tijd/tijdvenster.
- betaalstatus.
- gekoppelde productregels.
- waarschuwingen.

Standaard is dit leesbaar voor planner; parserdetails met x/y/kolominfo blijven apart voor debugging.

### Plannerlogica A t/m E

De bezorg-planning beslisboom is vastgelegd als technische routekwaliteit-regels:

A. Stops herkennen

- klant
- adres
- tijd/tijdvenster
- betaling

B. Producten koppelen

- alle producten onder juiste klant
- `rawLine` exact bewaren
- warm/snijden/categorie apart herkennen

C. Controle op A en B

- stops zonder producten
- producten zonder stop
- onbekende klant
- ontbrekende/onzekere tijd
- betaalstatus onduidelijk
- parserkwaliteit

D. Route maken volgens regels

- eerst tijd/tijdvenster
- dan warme producten
- dan plaats/postcodecluster
- dan routehistorie
- dan PDF-volgorde als fallback

E. Controleren of een route haalbaar is

- stops tegelijk
- warme snacks tegelijk
- warme snacks in verschillende plaatsen
- gebak mag vaak eerder mee
- brood is minder tijdkritisch
- als tijdsplanning fout loopt: tweede route adviseren

Route 2 mag pas in stap E als advies ontstaan.

### Routecapaciteit Advies

Routecapaciteit advies beoordeelt eerst de hele route alsof een bezorger rijdt.

Signalen voor tweede route:

- warm + warm rond dezelfde tijd in verschillende plaatsen.
- meerdere tijdkritische stops binnen korte tijd.
- meerdere 10:00-stops in verschillende plaats/postcodeclusters.
- combinatie van warm + kort tijdvenster.
- groot risico op te laat komen.

Niet direct Route 2:

- warm + gebak rond dezelfde tijd.
- warm + warm in dezelfde plaats: waarschuwing, geen harde Route 2.
- broodconflicten zonder tijdkritiek.

Output:

- `1 route lijkt voldoende`
- of `2 routes aanbevolen`
- met redenen en mogelijke Route 2-stops.

De app vult Route 2 niet automatisch.

### Voorstelroute Maken

Na PDF-upload blijft de route eerst in PDF-volgorde.

Knop:

- `Voorstelroute maken`

Pas na klikken wordt de route slim voorgesteld op basis van:

- tijd/tijdvenster
- warme producten
- plaats/postcodecluster
- routehistorie als zachte hint
- PDF-volgorde fallback
- plannerantwoorden/correcties

De planner kan daarna altijd handmatig slepen/verplaatsen.

Er is ook:

- `Terug naar PDF-volgorde`

Opslaan/print gebruikt de actuele routevolgorde.

### Route 1 / Route 2

- App begint conceptueel met een route.
- Route 2 is standaard leeg.
- Route 2 wordt in plannerroutebord verborgen als er geen stops zijn.
- Route 2 verschijnt zodra planner stops verplaatst.
- Route 2 mag door advies worden voorgesteld, maar niet automatisch definitief gevuld.

### Opgeslagen Routes

Bezorgruns worden opgeslagen via bestaande delivery-runs payload:

- geen nieuwe Supabase-tabel.
- geen schemawijziging.
- opgeslagen routes kunnen opnieuw worden geopend.
- extra opdrachten en plannerCorrections kunnen in bestaande payload mee.

### Extra Opdrachten

Planner kan handmatig extra opdrachten toevoegen:

- titel/opdracht
- adres
- plaats/postcode optioneel
- tijd/tijdvenster optioneel
- route: Route 1 of Route 2
- opmerking optioneel
- type: Ophalen, Afgeven, Boodschap, Overig

Gedrag:

- verschijnt als stop in routebord.
- label `Extra opdracht`.
- kan naar Route 1/2.
- kan omhoog/omlaag.
- kan worden bewerkt/verwijderd.
- komt mee in print routeblad en afvinklijst.
- komt mee in chauffeurmodus.
- niet op blad 4 als er geen producten zijn.
- telt niet als parserfout.

### Routebord Productpreview

Planner-routebord:

- compacte stopregels.
- tijd staat vooraan: stopnummer, tijd, indicator, klantnaam.
- alleen geselecteerde stop toont acties.
- productpreview kan open/dicht.
- productpreview gebruikt `stop.products[].rawLine`.
- warmproducten bovenaan.
- bezorgkostenregels verborgen.
- HCR/Grandcafe/Beerten productkoppeling is belangrijk validatiepunt.

### Ritblok-analyse

Onder Technisch staat read-only ritblok-analyse:

- analyseert routevolgorde zonder route te wijzigen.
- stelt logische ritten/rondes voor.
- benoemt mogelijke terugkomst naar bakkerij.
- gebruikt tijdvensters, warme producten, grote tijdgaten, stops zonder tijd.
- Routebord, print en chauffeurmodus blijven ongewijzigd.

Belangrijk praktijkpunt:

- Chauffeur neemt niet altijd alles in een keer mee.
- Daarom is een totaal-laadlijst niet leidend als hoofdlogica.
- Ritblokken helpen verklaren welke producten mogelijk later geladen worden.

### Ritkosten Indicatie

Onder Bezorging > Financieel staat `Indicatie ritkosten`.

Data:

- datum van run
- routes
- stops
- productregels
- snijbroden
- snijtijd

Lokale invoer:

- km totaal
- kosten per km
- chauffeururen
- uurloon/kostprijs per uur
- voorbereidingstijd/tarief

Berekening:

- personeelskosten = chauffeururen x uurloon
- voertuigkosten = km totaal x kosten per km
- voorbereiding/snijtijdkosten
- totale indicatieve ritkosten
- kosten per stop

Belangrijk:

- Indicatie, geen boekhoudkundige berekening.
- Omzet ontbreekt.
- Geen winst/verlies per klant.
- Instellingen lokaal via localStorage.
- Geen API-write of payloadwijziging.

## 5. Print

Bezorgprint blijft gericht op vaste praktische pagina's.

Belangrijk:

- Print blijft vaste 4 pagina's.
- Geen routevolgorde wijziging door print.
- Geen parserwijziging door print.

Blad 4: Producten / Laden

- klantcontrole/laadlijst.
- klantnaam groter en vet.
- tijd duidelijk zichtbaar.
- productaantallen als duidelijke badge.
- warmproducten bovenaan en duidelijk gemarkeerd.
- productregels compacter en leesbaar op A4.
- bezorgkostenregels verborgen.
- administratieve regels niet in laadproducttelling.
- HCR toont alle 8 producten bij correcte parserkoppeling.
- Noaberhoes/Beerten/Maxx warme en grote aantallen zijn validatiepunten.

Belangrijk principe:

- Geen `Totaal laden` als hoofdlogica voor chauffeur, omdat routes in meerdere ritten kunnen worden gereden.
- Totaaloverzicht kan nuttig zijn, maar ritblokken/praktische rondes zijn leidender.

## 6. Chauffeurmodus

Toegang:

- Dennis
- Kevin
- Jos

Medewerker-Bezorgen scherm:

- toont alleen route van vandaag.
- titel: `Bezorgroute vandaag`.
- toont Route 1 met aantal stops en knop `Start route`.
- toont Route 2 alleen als Route 2 stops heeft.
- geen bestandsnaam, bijgewerkt-tijd, oude routes of plannerinformatie.
- als geen route: `Vandaag geen bezorgroute klaar.`

Chauffeur-stop-scherm:

- mobiel-first.
- boven compact: route, stopnummer, voortgang.
- stopkaart met status, tijd, klantnaam, adres en navigatie.
- knop `Navigeer`.
- producten / `Mee te nemen` prominent en boven acties.
- productregels uit `stop.products/rawLine`.
- geen dubbele aantallen.
- warmproducten bovenaan.
- acties rustiger:
  - `Stop afronden`
  - `Overslaan`
  - betaald alleen waar relevant.
  - notitie kleiner/onder acties.
- sticky ondernavigatie:
  - Vorige
  - Volgende open
  - Volgende
- sticky navigatie overlapt producten niet.

Status:

- chauffeurstatus via localStorage.
- afronden/overslaan/notitie/betaald lokaal.
- geen API writes.
- geen autosave/live sync.
- verplichte afhandeling kan lokaal worden gestuurd door statuslogica.
- lokale routevolgorde aanpassen blijft lokaal/chauffeurgericht.

## 7. Administratie

Nieuw tabblad:

- `Administratie`
- planner/admin only.
- medewerker ziet dit tabblad niet.
- read-only dashboard.

Geen:

- geen datawijziging.
- geen API POST/PATCH/DELETE.
- geen Supabase-schema.
- geen autosave.
- geen roosterlogica.

Filters:

- week
- maand
- eigen datumrange
- medewerker

Blokken:

### Urenoverzicht

- gebruikt bestaande `workLogs`.
- toont totaal uren per medewerker.
- toont totaal alle medewerkers.
- dedupe op workLog-id/fallbackkey.
- knop naar bestaande `Uren controleren`.
- geen nieuwe print/mail in Administratie zelf.

### Bezorgoverzicht

- gebruikt bestaande delivery-runs read-only.
- periodefilter.
- aantal bezorgruns.
- aantal stops.
- aantal routes.
- aantal productregels/laadproducten.
- aantal warme stops.
- administratieve bezorgregels apart.
- geen omzet/winst.
- geen ritkostenuitbreiding.

### Aanvragenoverzicht

- gebruikt bestaande request-data arrays.
- telt open/goedgekeurd/afgewezen.
- telt vrije dagen, ziek, vakantie, beschikbaarheid.
- telt ruilaanvragen apart.
- medewerkerfilter werkt voor medewerkergerelateerde aanvragen.

## 8. Aanvragen

Aanvragenflow ondersteunt:

- vrije dag.
- vakantie.
- ziekmelding.
- ruilverzoek.
- beschikbaarheid: niet beschikbaar / extra beschikbaar.

Planner-aanvragenoverzicht:

- kaartweergave in plaats van tabelachtige horizontale regels.
- medewerkernaam groot.
- type aanvraag direct onder naam.
- datum/periode duidelijk.
- beschikbaarheidsdagen zichtbaar.
- aandachtspunten in rustig blok.
- toelichting in eigen blok.
- goedkeuren/afwijzen/opmerking onderaan.
- extra beschikbaarheid duidelijk groen/positief.

Flow:

- goedkeuren blijft bestaande flow.
- afwijzen blijft bestaande flow.
- opmerking blijft bestaande flow.
- mailflow niet aangepast door kaartweergave.
- opslag/API/Supabase niet aangepast door kaartweergave.

Normalisatie:

- `api/request-data.js` ondersteunt endDate/range veiliger voor beschikbaarheidsaanvragen.
- Bestaand gedrag voor vakantie/ziek behouden.
- Geen live aanvragen gewijzigd door de fix.

Tellingen:

- Dashboard/open-aanvragen bug opgelost: teller en lijst gebruiken consistente logica.
- Open/goedgekeurd/afgewezen tellingen zijn onderdeel van Administratie.

## 9. Beschikbaarheid

Beschikbaarheidsaanvragen zitten onder bestaande tab `Aanvragen`.

Niet beschikbaar:

- vakantie
- examens
- studiedag
- school
- weekend weg
- tijdelijk niet beschikbaar

Extra beschikbaar:

- extra beschikbaar
- extra vakantiewerk
- extra zaterdag beschikbaar

Gedrag:

- niet beschikbaar = harde blokkade voor planner.
- extra beschikbaar = scoreboost / voorkeurskandidaat.
- meerdere weken in een aanvraag mogelijk via van/tot.
- extra beschikbaarheid toont positief/groen en niet als vrije dag.
- geen automatische roosterwijziging.

## 10. Uren

Bron:

- `workLogs` is leidend.
- Geen roosterdata als fallback voor gewerkte uren-overzicht.

Urenfuncties:

- `Uren controleren` voor planner/admin.
- gewerkte uren overzicht.
- week/maand/eigen datumrange.
- medewerkerfilter.
- totalen per medewerker.
- totaal alle medewerkers.
- print urenoverzicht.
- mailconcept maken.

Print:

- print-only layout.
- geen app UI/sidebar/knoppen in print.
- A4 leesbaar.

Mailconcept:

- mailto/lokaal concept.
- geen automatische verzending.
- totalen en filters meegenomen.

Statussen workLogs:

- draft
- open
- approved
- rejected
- revision

Extra gewerkt:

- kan zonder geplande dienst.
- komt als workLog binnen.
- planner kan controleren/goedkeuren.

## 11. Beveiliging en Login

Planner / Directie globale login:

- pincode is `1990`.
- `1234` werkt niet meer voor globale Planner / Directie.
- oude remembered planner-sessies zijn ongeldig gemaakt via auth-versie.

Medewerkerslogin:

- blijft bestaande medewerkers/account-flow gebruiken.
- `Bakkerij Stroet / Directie` is een medewerkeraccount en niet hetzelfde als globale Planner / Directie login.
- `Bakkerij Stroet / Directie` gebruikt employeeMeta/loginPin zoals live data staat.
- Dennis/Kevin/Jos blijven delivery-medewerkers voor chauffeurmodus.
- gewone medewerkers behouden hun eigen loginflow.

Belangrijk:

- `DEFAULT_EMPLOYEE_LOGIN_PIN` blijft alleen medewerkerfallback.
- Planner/directie mag niet via default employee pin binnenkomen.
- Geen Supabase-datawijziging nodig voor globale plannerpin.

## 12. Roosterplanning en Winkelstructuur

Winkelstructuur:

- oude `Winkel 1` t/m `Winkel 8` is vervangen door generieke `Winkeldienst`.
- `Allround` bestaat, maar wordt niet automatisch als basisdienst gegenereerd.
- tijd is leidend.
- oude data blijft backward-compatible.

Basisbezetting winkel:

- dinsdag: 3 Winkeldiensten.
- woensdag: 3 Winkeldiensten.
- donderdag: 3 Winkeldiensten.
- vrijdag: 4 Winkeldiensten.
- zaterdag: 6 Winkeldiensten.

Zaterdag:

- minimaal 2 vaste dames op zaterdag Winkeldienst uit Saskia, Wendy, Luna, Monique.
- zaterdag winkel heeft voorrang boven doordeweekse winkel.
- zaterdaghulpen draaien niet zonder voldoende vaste dames.

Persoonlijke winkelregels:

- Saskia: oneven week di/do/vr, even week di/vr/za.
- Wendy: meestal di/wo-ochtend/vr-ochtend/za, ongeveer 1 zaterdag per maand vrij.
- Luna: flexibel, ongeveer 1 zaterdag per maand vrij.
- Monique: flexibel, liefst dinsdag vrij, ongeveer 1 zaterdag per maand vrij.
- Gerry: niet dinsdag, zaterdag alleen als laatste redmiddel.

Bezorgdiensten in planner:

- dinsdag Kevin.
- woensdag Jos.
- donderdag Dennis.
- vrijdag Kevin.
- zaterdag Kevin.
- als vaste bezorger afwezig is, niet zomaar iemand anders plannen.

Niek:

- vaste flexibele supportpraktijk:
  - donderdagmiddag
  - vrijdagmiddag
  - zaterdag
- geen Winkeldienst.
- wel Allround/Inpak indien bevoegd.
- geen fallback naar andere medewerkers op Niek-specifieke slots.

Plannerhulpen:

- Weekcontrole.
- Urenbalans.
- Open diensten oplossen.
- Save-confirmation modal.
- OPEN-redenen in gewone planner-taal.
- Praktijkpatronen en netto planneruren.

## 13. Medewerkers en Bevoegdheden

Bevoegdheden-UI:

- onder Winkeldiensten nog maar een generieke checkbox `Winkeldienst`.
- oude Winkeldienst 1-8 rechten blijven intern backward-compatible.
- oude rechten tellen als geschikt voor generieke Winkeldienst.
- nieuwe planning gebruikt generieke Winkeldienst.

Medewerkersbeheer:

- planner kan medewerkers beheren.
- account/pincode-flow via bestaande medewerkers/account-flow.
- geen schemawijziging.

## 14. Mailveiligheid

Mailveiligheid:

- testmodus stuurt naar `info@bakkerijstroet.nl`.
- planner ziet mailtestmodus.
- mailLog bevat logicalRecipients en actualRecipients.
- testMode en forceTestRecipient zichtbaar.
- productie-mails niet versturen zonder akkoord.

## 15. Deploy en Techniek

Belangrijke deploymentfixes:

- Vercel static root/output fix.
- `vercel.json` gebruikt `outputDirectory: "."`.
- Root route rewrite naar `index.html` voor niet-API routes.
- Headers/no-cache voor HTML, `app.js`, `styles.css`, `js/*`.
- `.vercelignore` sluit lokale testprofielen, `.env.txt`, backups en handleidingen uit.

Belangrijke bestanden:

- `app.js`
- `index.html`
- `styles.css`
- `js/features/delivery.js`
- `api/delivery-parse-pdf.js`
- `api/delivery-runs.js`
- `api/request-data.js`
- `api/work-logs.js`
- `api/planning-entries.js`
- `api/employee-data.js`
- `api/send-email.js`
- `data/delivery-products.json`
- `data/delivery-customers.json`
- `vercel.json`
- `.vercelignore`

Ontwikkelregels:

- kleine gerichte wijzigingen.
- geen brede refactor zonder noodzaak.
- voor code:
  - `git diff --check`
  - `node --check app.js`
  - `node --check` voor gewijzigde JS/API modules.
  - relevante flow testen.
- daarna:
  - commit met duidelijke message.
  - push naar `main`.
  - Vercel deploy controleren.
  - live controleren dat wijziging actief is.

## 16. Recente Belangrijke Commits

Selectie van recente live commits:

- `2175ca1` - `Add administration dashboard`
- `5dcd17c` - `Expand delivery product classification`
- `e6e0d40` - `Improve delivery order note classification`
- `de6e63c` - `Improve delivery stop classification`
- `1364ac9` / `07dcfd8` - OPEN-redenen en labels
- `fac1535` - weekcontrole
- `6811694` / `14a51fe` - urenbalans
- `b8c27ce` / `7bb462e` - beschikbaarheidsaanvragen en UX
- `d56675f` - ervaren zaterdagbezetting
- `12355db` - vaste bezorgregels
- `af0c239` / `01a367b` - praktijkregels slimme planner
- `b2eb923` / `c8ae83f` - generieke winkelstructuur

## 17. Open Aandachtspunten

Nog bewust te testen/doorontwikkelen:

- Live visuele browsercontrole van Administratie-tab met plannerlogin.
- Verdere bezorg-parservalidatie met nieuwe echte PDF's.
- Adviesregels op basis van plannerCorrections later eventueel automatisch voorstellen, maar niet stil toepassen.
- Eventuele ritblok-print/chauffeurlogica pas na apart akkoord.
- Volledige productie-mail pas na expliciet akkoord.
- Supabase productieplan overwegen om inactivity-pauzes te voorkomen.
