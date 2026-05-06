# Project Summary - Rooster/Uren App

## 1. Projectoverzicht

Deze app ondersteunt Bakkerij Stroet bij roosters, urenregistratie, medewerkersbeheer, aanvragen en planning. De app heeft twee hoofdomgevingen:

- Planneromgeving: beheer van rooster, diensten, medewerkers, aanvragen, urencontrole, back-up en slim plannen.
- Medewerkeromgeving: mobiel-first omgeving voor rooster bekijken, uren indienen, aanvragen doen, eigen aanvragen terugzien en account/pincode beheren.

De app draait als frontend op Vercel met server-side API-routes voor Supabase en e-mail. Data werkt in twee standen:

- Live-mode: centrale synchronisatie via Supabase en Vercel API-routes.
- Testmode: volledig lokaal, zonder Supabase/API-sync.

LocalStorage blijft fallback/cache. Supabase is de centrale bron in live-mode, maar lege of stale localStorage mag nooit centrale data wissen.

## 2. Architectuur

### Frontend

- `index.html`: statische structuur, panelen, navigatie, login, forms en containers.
- `styles.css`: alle layout, responsive/mobile styling, planner inboxen, slim plannen, medewerker UI en print/layoutregels.
- `app.js`: hoofdapplicatie. Bevat state, rendering, eventhandlers, sync orchestration, localStorage, businessregels en veel glue code.
- `js/features/...`: featuremodules met helpers voor o.a. planning, uren, requests, mail, employees en rendering. Belangrijke modules:
  - `js/features/hours.js`
  - `js/features/hours-panel-prep.js`
  - `js/features/planning-core.js`
  - `js/features/planning-panel-prep.js`
  - `js/features/planning-status.js`
  - `js/features/requests-panel-prep.js`
  - `js/features/employees.js`
  - `js/features/mail.js`

### API-routes

- `api/work-logs.js`: centrale sync van urenregistraties.
- `api/employee-data.js`: centrale sync van medewerkers, meta, rechten en gerelateerde employee-data.
- `api/planning-entries.js`: centrale sync van roosterregels, inclusief tombstones.
- `api/request-data.js`: centrale sync van verlof- en ruilverzoeken, inclusief tombstones.
- `api/send-email.js`: server-side mailroute. Resend/service keys blijven server-side.

### Supabase-tabellen

- `work_logs`: urenregistraties.
- `employee_data`: medewerkers, meta, permissions en employee instellingen.
- `planning_entries`: roosterregels.
- `request_data`: verlof- en ruilverzoeken.

## 3. Belangrijke veiligheidsregels

- Testmode mag Supabase/API-sync niet raken.
- Live-mode mag centrale data nooit wissen door lege of stale localStorage.
- Supabase service role key blijft alleen server-side in `/api`.
- Planning en aanvragen gebruiken veilige delete-sync via `deleted_at` tombstones.
- `work_logs` en `employee_data` hebben geen delete-sync.
- Sync is zoveel mogelijk upsert-only.
- Tombstones winnen van oude lokale planning/request-data.
- Mailtestmodus is bewust ingebouwd. Testontvanger is `info@bakkerijstroet.nl`.
- Productie-mail wordt alleen bewust aangezet. Geen echte medewerker-mails zonder expliciet akkoord.

## 4. Planner-schermen

### Dashboard

Doel: snel overzicht van open aanvragen, uren, planningstatus en aandachtspunten.

Belangrijke code zit vooral in `renderDashboard()`, `renderHomeSummary()` en gerelateerde summary helpers in `app.js`.

### Rooster

Doel: compact weekrooster bekijken.

Belangrijke eigenschappen:

- Maandag t/m zondag zichtbaar.
- Maandag/zondag tonen geen automatische open diensten, maar handmatig ingeplande diensten wel.
- Compacte Bakkerij/Winkel groepen.
- Weeknavigatie: vorige/deze/volgende week.

Relevante helpers:

- `renderSchedule()`
- `renderCompactWeekRosterDayCard(...)`
- `renderCompactWeekRosterGroup(...)`
- `renderCompactWeekRosterShiftLine(...)`

### Rooster inplannen

Doel: diensten toewijzen/wijzigen in de planneromgeving.

Belangrijk:

- Zelfde compacte groepsopmaak als Rooster.
- OPEN diensten blijven zichtbaar en klikbaar.
- Maandag/zondag genereren geen automatische OPEN diensten, tenzij er handmatig entries bestaan.

Relevante helpers:

- `renderSchedulePlanningDayCard(...)`
- `renderSchedulePlanningRosterGroup(...)`
- `getPlanningOverviewShiftOptions(...)`
- `shouldRenderPlannerOpenShiftsForDay(...)`

### Uren controleren

Doel: planner-inbox voor ingediende uren.

Belangrijk:

- Scherm is hernoemd van "Uren accorderen" naar "Uren controleren".
- Compacte desktop layout met toolbar bovenaan.
- Tellerkaarten, statusfilters, medewerkerfilter en export boven de lijst.
- WorkLogs met status `open` zijn ingediend en moeten door planner worden gecontroleerd.

Relevante helpers:

- `renderHoursApproval()`
- `renderPlannerHoursControlItem(...)`
- `getPlannerHoursControlItems(...)`
- `getHoursControlStatusClass(...)`
- `updateWorkLogStatus(...)`

### Aanvragen

Doel: compacte planner-inbox voor verlof, ziekte, vakantie en ruilverzoeken.

Belangrijk:

- Tellerkaarten bovenaan blijven zichtbaar.
- Typefilter: alles/vrije dagen/vakantie/ziek/ruil.
- Statusfilter blijft beschikbaar.
- Planner kan direct goedkeuren, afwijzen of opmerking plaatsen.

Relevante helpers:

- `renderRequestsOpenSummary()`
- `renderPlannerRequestInbox(...)`
- `renderPlannerRequestInboxItem(...)`
- `getPlannerRequestInboxItems(...)`

### Medewerkers

Doel: snelle desktop-first beheerpagina.

Belangrijk:

- Compacte toolbar met zoeken/filteren.
- Tabelachtige lijst met status, rollen en acties.
- Detailpaneel rechts met tabs: Gegevens, Planning, Uren, Account.
- Planner kan pincode zien, resetten, tijdelijke pin maken en plannerrechten beheren.

Relevante code zit in de employee render- en action helpers in `app.js` en `js/features/employees.js`.

### Diensten

Doel: diensttypes/standaarddiensten beheren.

Belangrijk:

- Compact overzicht met afdeling, tijden, status en acties.
- Sortering en groepering worden centraal hergebruikt in roosters.

### Slim plannen

Doel: planner helpt 4 weken tegelijk voorbereiden met tijdelijke voorstellen.

Zie hoofdstuk 5 voor details.

### Back-up

Doel: back-up, herstel en mailinstellingen beheren.

Belangrijk:

- Desktoplayout is verbeterd met nette kaartindeling.
- Back-up/herstel/email-logica is niet herschreven.
- E-mailtest loopt via server-side mailroute.

## 5. Slim plannen

`Slim plannen` is de centrale plek voor toekomstige slimme/automatische planning. Het is bewust veilig opgebouwd: eerst tijdelijk voorstel, pas later toepassen.

### Maandweergave

- Planner kiest een startweek.
- `Voorstel maken` toont 4 opeenvolgende weken onder elkaar.
- Elke week gebruikt dezelfde compacte roosteropmaak als Rooster/Rooster inplannen.
- State wordt tijdelijk per week bijgehouden, bijvoorbeeld via week keys.
- `Week wissen` wist een weekvoorstel.
- `Alles wissen` wist alle 4 weken.

Belangrijke helpers:

- `getSmartPlanningVisibleWeeks(...)`
- `renderSmartPlanningMonthProposal(...)`
- `renderSmartPlanningProposalRoster(...)`
- `renderSmartPlanningProposalRosterGroup(...)`

### Voorstel maken

- Voorstel maakt tijdelijke OPEN regels op basis van bestaande open diensten.
- Er wordt niets opgeslagen in `planning_entries`.
- `Toepassen op rooster` was eerst disabled en is later bewust geactiveerd als `Rooster toepassen`.

### Inline medewerkerkeuze

- Klik op een OPEN dienst opent een compact keuzevlak bij die dienst.
- Alleen bevoegde medewerkers worden getoond.
- Beschikbaar = groen.
- Niet beschikbaar = rood met korte reden.
- Klik op medewerker zet een tijdelijke keuze in proposal-state.
- Geen echte roosterdata wordt aangepast totdat `Rooster toepassen` wordt gebruikt.

### Beschikbaarheidsadvies

Advies gebruikt bestaande frontenddata:

- medewerkerslijst/employee data
- planning entries van gekozen weken
- verlof/vrije dagen/ziek indien beschikbaar
- contracturen indien beschikbaar
- tijdelijke Slim plannen keuzes

Niet-bevoegde medewerkers worden niet getoond.

### Combinatieregels

Dubbele tijdelijke keuzes op dezelfde dag worden standaard geblokkeerd met reden `Al gekozen`, behalve deze combinaties:

- Inpak + Productie
- Inpak + Bezorg
- Productie + Bezorg
- Winkel + Bezorg

Deze combinaties gelden alleen voor tijdelijke Slim plannen keuzes.

### Dienstsortering

Bakkerij-volgorde:

1. Draai
2. Oven
3. Brood
4. Banket
5. Inpak
6. Productie
7. Bezorg

Winkel-volgorde:

1. Winkel 1 t/m Winkel 8
2. Allround 1
3. Allround 2
4. overige Allround-diensten

Allround hoort bij Winkel.

### Controle-tab

Controle toont prioriteiten over alle 4 weken:

- Rood: actie nodig, zoals OPEN dienst zonder medewerker of geen geschikte medewerker.
- Oranje: controleren, zoals contracturen of onzekere beschikbaarheid.
- Groen: week in orde.

Meldingen zijn compact en kunnen naar de juiste week/dienst springen.

### Rooster toepassen

`Rooster toepassen` zet alleen gekozen conceptdiensten over naar het echte rooster.

Belangrijk:

- Alleen conceptdiensten met gekozen medewerker worden toegepast.
- OPEN diensten zonder keuze blijven open.
- Bestaande ingevulde slots worden niet overschreven.
- Geen mail.
- Geen medewerkerdata wijzigen.
- Gebruikt bestaande planning save/update flow.
- Testmode blijft lokaal; live-mode gebruikt bestaande sync/save flow.

Belangrijke helpers:

- `getSmartPlanningAssignedItems(...)`
- `getSmartPlanningApplySummary(...)`
- `applySmartPlanningToRoster(...)`
- `findMatchingOpenPlanningSlot(...)`
- `clearAppliedSmartPlanningAssignments(...)`

## 6. Medewerkeromgeving

### Login en navigatie

- Medewerker logt in met naam/pincode.
- Mobiele navigatie is bottom-nav.
- Header toont naamknop en Uitloggen.
- Klik op eigen naam opent `Mijn account`.

### Rooster

- Mobiel rooster is compact.
- `Vandaag` en `Deze week` zijn beschikbaar en staan mobiel onder de roosterkaart.
- Bakkerij/Winkel groepen worden centraal gesorteerd.
- Geen onnodige week/datumregel bovenaan.

### Mijn rooster

- Jaaroverzicht met weeknummers.
- Op mobiel scrollt jaaroverzicht naar huidige week of laatst bekeken week.
- Weekdetail gebruikt dagknoppen op mobiel.
- Lege week toont duidelijke melding.

### Mijn uren

Mobiel-first flow:

- Tabs: `Uren invullen`, `Mijn gewerkte uren`, `Extra gewerkt`.
- `Uren invullen`: toont open dienstkaarten en direct `Uren indienen`.
- `Mijn gewerkte uren`: historie/open diensten gegroepeerd per status.
- `Extra gewerkt`: extra-uren formulier en historie.

Belangrijk:

- Mobiel indienen is een stap.
- Status na submit is `open`, zodat planner hem ziet bij `Uren controleren`.
- Bij validatiefout blijven gekozen tijden/pauze/opmerking behouden via tijdelijke frontend state.
- Geen localStorage voor deze tijdelijke form state.

### Aanvragen

- Medewerker kan vrije dag, vakantie, ziekmelding en ruilverzoek indienen.
- Er is een aparte tab `Mijn aanvragen`.
- Eigen aanvragen tonen statuskleur, mailstatus en intrekken-knop bij open aanvragen.
- Tombstones voorkomen dat ingetrokken aanvragen terugkomen.

### Mijn account

- Openen via naamknop in header.
- Toont naam, mail, telefoon, afdeling/rol indien beschikbaar.
- Toont huidige pincode.
- Medewerker kan eigen pincode wijzigen.
- Opslag gebruikt bestaande employee-data save-flow.

## 7. Urenflow

### Data

Urenregistraties worden opgeslagen als `workLogs`.

Belangrijke velden:

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

### Statussen

- `draft`: concept/ingevuld maar nog niet ingediend.
- `open`: ingediend en zichtbaar voor plannercontrole.
- `approved`: goedgekeurd.
- `rejected`: afgewezen.
- `revision`: opmerking/aanpassing nodig.

Mobiel submit zet status op `open`.

### Belangrijke functies

- `saveWorkLogs(...)`: sanitize, localStorage persist en centrale save queue.
- `saveWorkLogFromForm(...)`: leest formvelden, valideert en maakt/update workLog.
- `renderMyHours(...)`: medewerker/planner urenpanel render.
- `updateWorkLogStatus(...)`: planner statuswijziging.
- `getWorkLogsForWeek(...)`: weekfilter voor plannercontrole.
- `getHoursWeekReviewState(...)`: weekstatus/samenvatting.

### Weekstatuscontrole

Medewerkers mogen uren indienen bij normale/geplande weken:

- toegestaan: `open`, `in-review`, normale/geplande/onbekende fallbackstatus.
- geblokkeerd: `locked`, `closed`, `archived`, `gearchiveerd`, `afgesloten`.

Bij blokkade toont de app:

`Deze week is afgesloten voor urenregistratie.`

## 8. Aanvragenflow

Ondersteunde aanvragen:

- Vrije dag
- Vakantie
- Ziekmelding
- Ruilverzoek

Medewerker:

- kan aanvragen indienen.
- ziet eigen aanvragen in `Mijn aanvragen`.
- kan eigen openstaande aanvragen intrekken.
- ziet mailstatusbadges.

Planner:

- ziet compacte aanvraag-inbox.
- kan goedkeuren, afwijzen, opmerking plaatsen en bij ruilverzoeken vervanger kiezen.

Sync:

- Data zit in `request_data`.
- Tombstones via `deleted_at`.
- Geen automatische centrale harde delete.

Mail:

- Aanvraagmails lopen via bestaande mailflow.
- Testmodus stuurt veilig naar `info@bakkerijstroet.nl`.

## 9. Medewerkersbeheer

Planner-tab `Medewerkers` is vernieuwd als compacte desktop beheerpagina.

Belangrijk:

- Zoekveld en filters.
- Compacte lijst met naam, afdeling, contract, status, rollen en acties.
- Detailpaneel met tabs:
  - Gegevens
  - Planning
  - Uren
  - Account

Account-tab:

- pincode zichtbaar voor planner.
- tijdelijke pin zichtbaar.
- reset pin.
- nieuwe tijdelijke pin.
- pincode wijzigen.
- plannerrechten beheren.

Planning-tab:

- contracturen.
- bevoegdheden/diensten.
- plannerrechten.
- allround/afdeling.

Waarschuwingen:

- geen contracturen.
- geen bevoegdheden.
- geen mailadres.
- tijdelijke pin actief.

## 10. Diensten en sortering

Diensten worden centraal gesorteerd en gegroepeerd voor:

- Rooster
- Rooster inplannen
- Slim plannen
- medewerkerroosters

Belangrijke helpers:

- `getRosterDepartmentForEntry(...)`
- `getRosterShiftSortOrder(...)`
- `sortRosterEntriesForDisplay(...)`
- `groupEntriesByDepartment(...)`
- `getCompactRosterShiftLabel(...)`

Regels:

- Allround hoort bij Winkel.
- Bakkerij-volgorde: Draai, Oven, Brood, Banket, Inpak, Productie, Bezorg.
- Winkel-volgorde: Winkel 1 t/m 8, daarna Allround.
- Onbekende diensten vallen defensief terug in Bakkerij of bestaande fallback.

## 11. Mail

Mail loopt server-side via `api/send-email.js`.

Belangrijk:

- `RESEND_API_KEY` blijft server-side.
- Testontvanger: `info@bakkerijstroet.nl`.
- Ongeldig oud adres `rooster@bakkerijstroet.nl` is vervangen.
- Productie-mail pas bewust aanzetten.
- Geen frontend secrets.

Belangrijke helpers:

- `sendEmail(...)`
- `sendTemplatedEmail(...)`
- `queueRequestMailDelivery(...)`
- `updateMailLogEntry(...)`
- `renderMailLogStatusBadge(...)`

MailLog:

- `queued`: mail staat klaar/wordt verstuurd.
- `sent`: verzonden.
- `error`/`failed`: mislukt.
- Stale-reference fix: mailLog statusupdates werken op actuele request objecten.

## 12. Belangrijke recente commits

Recente relevante commits:

- `70a31ce` - behoud urenformulier bij validatiefout.
- `47d5aba` - herstel weekstatus controle mobiele uren.
- `47ca519` - debug en herstel mobiele uren submit volledig.
- `0d1c0a1` - mobiel uren indienen direct en duidelijk.
- `335dfc5` - herstel mobiel mijn uren scherm en opslaan.
- `a815bdf` - medewerkernaam knop naar Mijn account.
- `a9d33c4` - vernieuw medewerkers beheer scherm.
- `1c09cb9` - rooster toepassen in Slim plannen.
- `bcbd2cf` - Slim plannen maandweergave.
- `da85685` - maandcontrole in Slim plannen.
- `39782fe` - controle prioriteit en overzicht.
- `020bd51` - dienstvolgorde overal gelijk.
- `6b00980` - centrale dienstvolgorde in Slim plannen.

## 13. Bekende aandachtspunten / next steps

- Live testen van mobiele urenflow met meerdere medewerkers, specifiek Bernard en Bezorgdienst 08:00-12:30.
- Controleren dat ingediende mobiele uren direct zichtbaar zijn in `Uren controleren`.
- `Rooster toepassen` blijven bewaken op niet-overschrijven van bestaande diensten.
- Productie-mail alleen bewust inschakelen en testen.
- MailLog queued -> sent/error blijven testen in live/testmodus.
- Slim plannen verder verbeteren met betere contracturencontrole.
- Automatische planning/AI-logica later pas uitbreiden.
- Echte maandpublicatie/versturen later bouwen.
- Changelog bijhouden voor grote functionele wijzigingen.

## 14. Ontwikkelafspraken

- UI-only aanpassen als dat voldoende is.
- Geen Supabase-structuur wijzigen zonder eerst plan/SQL te bespreken.
- Geen delete-sync toevoegen zonder apart plan.
- Testmode en live-mode strikt gescheiden houden.
- Service role key nooit naar browsercode.
- Kleine commits per onderwerp.
- Niet onnodig refactoren tijdens bugfixes.
- Na wijzigingen:
  - `git diff --check`
  - `node --check app.js` indien lokaal mogelijk
  - handmatige flowtest waar relevant
  - commit met duidelijke message
  - push naar `main`
  - Vercel deployt automatisch via GitHub-koppeling

