# Project Summary - Rooster/Uren App

Laatst bijgewerkt: 2026-05-11

## 1. Projectoverzicht

Deze app ondersteunt Bakkerij Stroet bij roosters, urenregistratie, medewerkersbeheer, aanvragen, vakanties/ziekte en slimme roosterplanning. De app heeft twee hoofdomgevingen:

- Planneromgeving: rooster bekijken, Rooster plannen, diensten, medewerkers, aanvragen, vakanties, urencontrole, back-up en mailinstellingen.
- Medewerkeromgeving: mobiel-first login, rooster bekijken, Mijn rooster, Mijn uren, Extra gewerkt, aanvragen, Mijn aanvragen en Mijn account.

Data werkt in twee standen:

- Live-mode: centrale data via Supabase en Vercel API-routes.
- Testmode: lokaal gescheiden, zonder Supabase/API-sync.

Belangrijke grondregel: Supabase is in live-mode de centrale bron. Lege of stale localStorage mag nooit centrale data overschrijven of oude data terugzetten.

## 2. Architectuur

### Frontend

- `index.html`: statische structuur, panelen, login, fatal recovery UI, formulieren, containers en script/cache-versies.
- `styles.css`: zachte beige/oranje appstijl, responsive layouts, mobile nav, planner panels, chips, modals, rooster- en urenstyling.
- `app.js`: hoofdapplicatie met state, rendering, eventhandlers, sync orchestration, localStorage, businessregels en fallback/recovery.
- `js/features/...`: helpermodules voor planning, uren, requests, employees, mail, navigation, render helpers en bootstrap helpers.

Belangrijke modules:

- `js/features/hours.js`
- `js/features/hours-panel-prep.js`
- `js/features/planning-core.js`
- `js/features/planning-panel-prep.js`
- `js/features/planning-status.js`
- `js/features/planning-assignments.js`
- `js/features/day-planner.js`
- `js/features/requests.js`
- `js/features/requests-panel-prep.js`
- `js/features/employees.js`
- `js/features/employee-panel-prep.js`
- `js/features/mail.js`

### API-routes

- `api/planning-entries.js`: centrale sync van roosterregels, inclusief tombstones.
- `api/request-data.js`: centrale sync van verlof-, ziekte- en ruilverzoeken, inclusief tombstones.
- `api/work-logs.js`: centrale sync van urenregistraties.
- `api/employee-data.js`: centrale sync van medewerkers, meta, rechten, patronen en extra beschikbaarheid.
- `api/send-email.js`: server-side mailroute.
- `api/export-backup.js`: centrale export/back-up.

### Supabase-tabellen

- `planning_entries`
- `request_data`
- `work_logs`
- `employee_data`

Er zijn recent geen Supabase-schemawijzigingen gedaan voor de beschreven features; wijzigingen zijn via bestaande payload/meta-velden en bestaande routes opgelost.

## 3. Veiligheidsregels

- Geen productie-mail naar echte medewerkers zonder expliciet akkoord.
- Mailtestmodus gebruikt vaste testontvanger `info@bakkerijstroet.nl`.
- Testmode raakt Supabase/API-sync niet.
- Live-mode gebruikt centrale data als bron.
- Tombstones in planning/request-data winnen van oude lokale data.
- `work_logs` en employee-data zijn upsert/sync gericht, niet hard-delete gericht.
- Supabase service role key blijft alleen server-side.
- Geen schema/API-wijzigingen zonder vooraf plan/SQL.
- Geen bestaande roosterdata wijzigen tenzij de gebruiker expliciet om die actie vraagt.

## 4. Planneromgeving

### Dashboard

Dashboard toont samenvattingen voor planning, aanvragen, uren en aandachtspunten. Rendering loopt via `renderDashboard()`, `renderHomeSummary()` en gerelateerde helpers.

### Rooster

- Compact weekrooster met maandag t/m zondag.
- Bakkerij/Winkel groepering en centrale dienstsortering.
- Medewerkers zien geen open/niet-ingevulde diensten.
- Planner ziet open diensten en statusinformatie.
- Afwezigheden onder roosterdagen zijn compact: alleen `Naam type`, bijvoorbeeld `Gerry vakantie`, `Wendy ziek`.
- Reden/status/toelichting wordt niet meer in roosterchips getoond.

### Uren controleren

Planner-inbox voor workLogs:

- WorkLogs met `status: "open"` staan klaar voor controle.
- Statusfilters: alles, open, goedgekeurd, afgewezen/correctie, ontbrekend.
- Medewerkerfilter, weekfilter en export blijven beschikbaar.
- Extra gewerkt zonder geplande dienst wordt meegenomen als normale workLog-regel.
- Planner kan goedkeuren, terugsturen met opmerking of afwijzen.

Belangrijke helpers:

- `renderHoursApproval()`
- `renderPlannerHoursControlItem(...)`
- `getWorkLogsForWeek(...)`
- `updateWorkLogStatus(...)`

### Aanvragen

Planner-inbox voor vrije dag, vakantie, ziekmelding en ruil:

- Compacte tellerkaarten en filters.
- Korte status- en mailbadges.
- Goedgekeurde aanvragen kunnen door planner worden gewijzigd waar de bestaande flow dat ondersteunt.
- Ziekmeldingen mogen planning/vakantiecontext overrulen wanneer ze beschikbaarheid blokkeren.
- Standaardreden/toelichting wordt veilig ingevuld waar de flow dat nodig heeft, maar niet in compacte overzichten getoond.

### Vakanties

Het scherm `Vakanties` is een weekoverzicht:

- Weken staan chronologisch onder elkaar.
- Per week: weeknummer, datumrange en afwezigheidschips.
- Chips zijn kort: `Naam vakantie`, `Naam vrije dag`, `Naam ziek`.
- Chips tonen weekdagcontext zonder lange datums, bijvoorbeeld `Chantal vrije dag · di`, `Sophie vrije dag · ma, wo`, `Ronny vakantie · ma-wo`, `Monique vakantie · hele week`.
- Meerweekse afwezigheid staat in elke betreffende week.
- Vakantie/vrije dag worden normaal alleen goedgekeurd getoond; ziekmeldingen mogen ook open/ingediend zichtbaar zijn omdat ze planning blokkeren.
- Als niemand afwezig is: `Geen afwezigen`.

### Medewerkers

- Compacte beheerpagina met zoeken/filteren.
- Detailpaneel met tabs voor gegevens, planning, uren en account.
- Nieuwe medewerkers zijn direct actief met tijdelijke standaardpin.
- Uit dienst zetten en heractiveren is ondersteund.
- Oud werknemers staan apart en worden niet getoond in login/planningkeuzes.
- Uit dienst medewerkers worden niet automatisch voorgesteld in Rooster plannen.
- Planner kan pincode zien/resetten, tijdelijke pin maken en plannerrechten beheren.
- Extra beschikbaarheid kan per medewerker worden beheerd.

### Diensten

`Diensten` bevat vaste standaardtijden/basisschema. Tijd aanpassen in `Rooster plannen` wijzigt niet de diensttemplate, maar alleen de planning-entry van die week/dag/dienst.

## 5. Rooster Plannen

`Rooster plannen` is de veilige voorstelomgeving voor toekomstige roosters.

### Basisgedrag

- Diensten blijven altijd zichtbaar, ook als nog niemand is ingevuld.
- `Voorstel maken` maakt een tijdelijk voorstel.
- `Rooster opslaan` schrijft pas daarna naar echte `planning_entries`.
- `Week wissen` reset proposal-state volledig zodat `Voorstel maken` daarna opnieuw vers kan draaien.
- `Vorige voorstel herstellen` blijft bedoeld voor bewust herstel van proposal-snapshots.

### Scoring en filters

Harde filters:

- medewerker is actief/in dienst.
- bevoegd voor dienst/rol.
- beschikbaar.
- niet ziek/vakantie/vrije dag.
- toegestane combinaties.

Daarna scoring:

- basispatroon match weegt zwaar.
- vaste werkdagen en vaste diensten wegen zwaar.
- weekendhulpen worden niet zomaar doordeweeks ingepland.
- medewerkers zoals Saskia worden niet automatisch boven hun bekende patroonbelasting volgepland.
- eerdere roosterhistorie, contract/belasting en afdeling/rol zijn aanvullende voorkeuren.
- lage confidence blijft OPEN.

Belangrijk principe: liever OPEN dan een verkeerde medewerker.

### Open houden en statussen

- Planner kan diensten bewust `Open houden`.
- Bewust open blijft behouden bij opslaan/herberekenen.
- Statuskleuren:
  - groen = ingevuld.
  - rood = open.
  - oranje = bewust open.
- Open diensten zonder logische kandidaat blijven open met reden zoals `Geen logische medewerker beschikbaar`, `Geen patroonmatch`, `Te veel ingepland` of `Weekendkracht buiten patroon`.

### Beschikbaarheid en afwezigheid

- Ziek/vakantie/vrije dag blokkeren beschikbaarheid.
- Ziekmelding/operatie/herstel met datumranges blokkeren de betreffende dagen.
- Wendy/operatie/herstel in juni is expliciet in de planningavailability-fixes meegenomen.
- Ziekmelding kan vakantie/vrije dag in beschikbaarheidscontext overrulen.

### Extra beschikbaarheid en herberekenen

- Bij `Medewerkers` kan planner tijdelijke extra beschikbaarheid vastleggen per week/datum/dag(en), optioneel met tijden en opmerking.
- Extra beschikbaarheid verandert het basispatroon niet.
- Extra beschikbaarheid betekent: medewerker mag extra voorgesteld worden, niet verplicht ingepland.
- Weekendhulpen mogen doordeweeks alleen logisch worden voorgesteld als extra beschikbaarheid dat ondersteunt.
- `Herbereken week` vult vooral open diensten opnieuw, zonder bestaande goede/handmatige keuzes stuk te maken.
- Bewust open blijft bewust open.
- Medewerkerkeuze toont badge/reden `Extra beschikbaar` waar relevant.

### Tijd aanpassen

- Op dienstniveau in `Rooster plannen` kan de planner tijdelijk start/eindtijd aanpassen.
- Modal/popover toont dienstnaam, standaardtijd, starttijd, eindtijd, opslaan, reset standaardtijd en annuleren.
- Aangepaste dienst toont badge `Aangepast`.
- Aangepaste tijd wordt op planning-entry niveau opgeslagen.
- Diensttemplates in `Diensten` blijven ongewijzigd.
- Refresh behoudt aangepaste tijden op die ene geplande dienst.

### Opslaan en slotKeys

- Rooster opslaan bewaart correct na refresh.
- Dubbele bezetting/save-merge bug is opgelost met stabiele slotKeys.
- Bestaande ingevulde slots worden niet stil overschreven.
- Open/bewust-open status blijft herkenbaar na save/reload.

## 6. Medewerkeromgeving

### Startup, login en navigatie

- Safe startup is nu de standaard startup.
- Normale URL start net als `?safe=1`: eerst minimale login/start, geen zware render of oude schermrestore voor login.
- Na login wordt data stapsgewijs geladen.
- Fatal recovery UI staat buiten app-root en bevat herstelknop.
- Login toont kleine versie-indicatie.
- Mobiel gebruikt bottom-nav.
- Naamknop opent `Mijn account`.

### Rooster

- Medewerkers zien alleen ingevulde diensten.
- Open/niet-ingevulde diensten blijven verborgen.
- Weekrooster toont Bakkerij/Winkel-context en compacte afwezigheidschips.
- Afwezigheden zijn kort: `Gerry vakantie`, `Monique vrije dag`, `Wendy ziek`.
- Dit geeft ruilcontext zonder plannerinformatie.

### Mijn rooster

Mijn rooster is opgeschoond en medewerkergericht:

- Weeklijst toont alleen weeknummer, datumrange en eigen dienststatus.
- Voorbeelden: `Je hebt 3 diensten` of `Geen diensten`.
- Geen plannerinformatie zoals open diensten, uren open, algemene status of conflicten.
- Weekdetail toont per dag duidelijk `Dienst`, `Vrij` of `Geen dienst`.
- Eigen diensten tonen dienstnaam en tijd.
- Meerdere eigen diensten op een dag staan compact onder elkaar.
- Volledig ingevuld roostercontext is minder prominent en optioneel/compact.
- Open diensten blijven verborgen.

### Mijn uren

Mobiel-first:

- Tabs: `Uren invullen`, `Mijn gewerkte uren`, `Extra gewerkt`.
- Geplande diensten kunnen als workLog worden ingevuld/ingediend.
- `Extra gewerkt` is voor werk buiten planning.
- Extra gewerkt zonder geplande dienst wordt opgeslagen als `workLog` met `status: "open"`.
- Planner ziet deze extra uren bij `Uren controleren`.
- Medewerker ziet ze terug bij `Extra gewerkt` en `Mijn gewerkte uren`.
- Na refresh blijven ze zichtbaar omdat submit nu centrale `work_logs` opslag afwacht.
- Extra uren worden niet opgeslagen als aanvraag en komen niet in `Mijn aanvragen`.

### Mijn aanvragen

- Medewerker ziet eigen vrije dagen, vakantie, ziekte en ruilverzoeken.
- Open aanvragen kunnen worden ingetrokken indien flow dat toestaat.
- Extra gewerkt hoort hier niet thuis.

### Mijn account

- Huidige pincode blijft zichtbaar.
- Veld `Huidige pin invoeren` is verwijderd.
- Alleen nieuwe pin en bevestiging blijven over.
- Loginlogica en nieuwe-pin-validatie zijn niet versoepeld.

## 7. Urenflow

WorkLogs bevatten o.a.:

- `id`
- `employeeName`
- `day`
- `shiftName`
- `plannedStart`
- `plannedEnd`
- `actualStart`
- `actualEnd`
- `breakMinutes`
- `notes`
- `status`
- `submittedAt`
- `updatedAt`
- `data_mode` via API/context

Statussen:

- `draft`: concept/ingevuld maar nog niet ingediend.
- `open`: ingediend, zichtbaar voor plannercontrole.
- `approved`: goedgekeurd.
- `rejected`: afgewezen.
- `revision`: opmerking/aanpassing nodig.

Belangrijke recente fix:

- Handmatige workLog-id voor extra uren: `manual|employeeName|day`.
- `Extra gewerkt` zonder geplande dienst gebruikt `shiftName: "Extra gewerkt"`.
- Bij submit in live-mode wordt centrale save direct geflusht.
- Bij centrale fout wordt lokale tijdelijke wijziging teruggedraaid en toont de app: `Extra uren konden niet worden opgeslagen. Probeer opnieuw.`
- Succesmelding: `Extra uren ingediend.`

Stale localStorage:

- Live-mode laadt workLogs centraal.
- Lokale cache mag centrale lege/actuele data niet overschrijven.
- Corrupt localStorage wordt defensief genegeerd waar helpers dat ondersteunen.

## 8. Aanvragen en Vakanties

Ondersteund:

- Vrije dag
- Vakantie
- Ziekmelding
- Ruilverzoek

Belangrijk:

- `request_data` is de bron voor aanvragen/vakanties.
- Verwijderen/intrekken gebruikt tombstones waar van toepassing.
- Ronny testaanvragen zijn via veilige delete/tombstone-flow verwijderd indien matching records aanwezig waren.
- Vakantie/vrije dag/ziek labels zijn overal compact gemaakt.
- Redenen/statussen/toelichting verschijnen niet meer in rooster- of vakantielabels.
- Goedgekeurde aanvragen blijven planner-wijzigbaar waar de bestaande flow dat toestaat.
- Ziekmeldingen met periode beinvloeden planningavailability.

## 9. Styling en UX

- Appstijl is vernieuwd naar zachte beige/oranje tinten.
- Oude blauwe/bruine accenten zijn zoveel mogelijk vervangen.
- Logo is vervangen/gebruikt als actuele branding.
- Tabs, filters en mobiele navigatie zijn consistenter.
- Cards/chips zijn compacter en rustiger.
- Modals/confirmaties zijn verbeterd voor planning, tijd aanpassen en riskante acties.
- Geen grote tekstblokken onder roosters; labels zijn kort en scanbaar.

## 10. Android, Cache en Startup

Aanpak na Android/Samsung white screen:

- `structuredClone` is vervangen/afgevangen via veilige clone helpers.
- Safe mode via `?safe=1` blijft bestaan.
- Safe startup is nu standaard voor normale URL.
- Geen automatische restore naar dashboard/rooster voor login.
- Geen zware dashboard/planning/request/worklog render voor login.
- Fatal error screen staat buiten app-root met hoge z-index.
- Foutscherm bevat appversie, laatste startup-stap, foutmelding, userAgent, herstelknop en link naar veilige modus.
- Herstelknop wist alleen lokale browserdata/cache van deze app, nooit Supabase.
- Fallbacks zijn toegevoegd voor oudere browserfeatures zoals `crypto.randomUUID`, observer APIs, `CSS.escape`, matchMedia listeners en scrollIntoView opties.
- Cache-busting wordt bij relevante fixes verhoogd via `APP_VERSION` en script/style querystrings.

Huidige versie na laatste codefix: `20260511-open-slot-persistence`.

## 11. Mail

Mail loopt via server-side route en bestaande mailhelpers.

Bekend:

- Aanvraagmails en wijzigingsmails gebruiken mailLog-statussen.
- Mailtestmodus is aanwezig.
- Testontvanger blijft `info@bakkerijstroet.nl`.
- Twan is gebruikt/bedoeld als veilige testmedewerker voor mailtests.
- Productie-mail moet bewust worden aangezet.
- Geen frontend secrets.

Openstaand:

- Volledige live mailflow moet nog gecontroleerd worden per flow: vakantie, vrije dag, ziekmelding, goedkeuren, afwijzen, wijzigen, intrekken en ruilverzoek.
- Geen productie-mails naar echte medewerkers sturen zonder expliciet akkoord.

## 12. Recente commits

Recente relevante commits:

- `bf4ca57` - `fix: persist extra hours without planned shift`: extra gewerkt zonder geplande dienst wordt centraal als open workLog opgeslagen.
- `10d15f2` - `fix: make safe startup the default`: normale startup gebruikt veilige login-start.
- `08fea5b` - `fix: stabilize android normal startup`: normale Android-startup verder gestabiliseerd.
- `a5da8a5` - `fix: add safe mode for android startup`: `?safe=1` fallback toegevoegd.
- `0a77dbd` - `fix: show persistent android fatal error screen`: vaste fatal-error container buiten app-root.
- `42b2e69` - `fix: keep android crash recovery visible`: recovery zichtbaar houden bij runtime errors.
- `0188622` - `fix: harden app startup for android recovery`: localStorage/browserfeature recovery.
- `4d474af` - `feat: add extra availability for smart planning`: extra beschikbaarheid en herberekenen.
- `5c1e92b` - `fix: prevent android white screen crash`: eerste Android white-screen mitigatie.
- `021a2d5` - `feat: allow planning shift time overrides`: tijd aanpassen per geplande dienst.
- `e72b155` - `style: improve weekly vacation overview readability`: vakantieweekchips met dagafkortingen/bereiken.
- `8eff201` - `chore: end of day app cleanup and checks`: dagafsluiting en controles.
- `b9aca80` - `style: organize vacations by week`: vakantiescherm naar weekoverzicht.
- `9035130` - `style: simplify pin change form`: huidige-pin invoerveld verwijderd.
- `3514a21` - `style: simplify employee my roster view`: Mijn rooster opgeschoond.
- `b2f3489` - `fix: reset planning proposal state after clearing week`: Week wissen reset proposal-state.
- `7f137a0` - `feat: show full employee roster context`: medewerkerroostercontext uitgebreid.
- `86d706a` - `fix: respect employee work patterns in planning proposals`: basispatronen strenger leidend.
- `189787e` - `style: simplify roster absence labels`: korte afwezigheidslabels.
- `7fcfd03` - `fix: debug and apply employee sick leave availability`: ziekte beschikbaarheid debug/fix.
- `740be7f` - `feat: improve smart planning checks and proposal reasons`: betere proposalredenen/checks.
- `bda6348` - `fix: stabilize planning saves and sick leave availability`: planning save en ziekteavailability.
- `e71c500` - `fix: prevent duplicate planning slot saves`: dubbele slot-save bug met stabiele slotKeys.
- `483e173` - `fix: apply sick leave ranges to planning proposals`: ziekteranges blokkeren voorstellen.
- `977bb6d` - `fix: hide open shifts from employee mobile roster`: open diensten verborgen voor medewerkers.

## 13. Open aandachtspunten

Nog bewust testen:

- Live `Rooster opslaan` met ingevuld/open/bewust-open en refresh.
- Wendy/ziek/operatie/herstel in juni in Rooster plannen.
- Weekendhulpen en Saskia-belasting bij juli/vooruit plannen.
- Extra beschikbaarheid + `Herbereken week` met weekendhulp op woensdag.
- Niek: `Mijn uren` -> `Extra gewerkt` op zaterdag zonder geplande dienst, refresh, planner `Uren controleren`.
- Medewerkerhistorie voor extra uren zonder geplande dienst.
- Android/Google/Samsung normale URL op echte probleemtelefoon.
- Een volledige mobiele medewerker-gebruikstest.
- Mailflow volledig testen met Twan/testontvanger.
- Productie-mail pas bewust aanzetten.

## 14. Ontwikkelafspraken

- Houd wijzigingen klein en gericht.
- Geen Supabase-schema/API-wijzigingen zonder vooraf plan.
- Geen harde deletes tenzij expliciet gevraagd en exact gematcht.
- Geen echte productie-mails zonder akkoord.
- Respecteer testmode/live-mode scheiding.
- Geen oude lokale cache laten winnen van centrale live-data.
- Bij codewijzigingen minimaal:
  - `git diff --check`
  - `node --check app.js`
  - relevante API/module `node --check` indien geraakt
  - handmatige flowtest waar mogelijk
- Bij documentatie-only:
  - `git diff --check`
- Commit met duidelijke message en push naar `main`.
