# Testplan productiechecks

## Rooster opslaan + refresh

1. Log in als planner in live-mode.
2. Open `Rooster plannen` voor een toekomstige week met bestaande ingevulde diensten.
3. Maak of pas een voorstel aan en kies `Rooster opslaan`.
4. Refresh de browser met Ctrl+F5.
5. Controleer dat ingevulde diensten nog op dezelfde medewerker staan en dat er per dag/dienst/tijd geen dubbele slots zijn.
6. Controleer dat bestaande ingevulde slots niet stil zijn vervangen door een andere medewerker.

## Bewust open houden

1. Open `Rooster plannen` voor een week met minimaal een open dienst.
2. Kies bij een dienst `Open houden`.
3. Kies `Rooster opslaan`.
4. Refresh de browser met Ctrl+F5.
5. Controleer dat de dienst als `Bewust open` terugkomt in `Rooster plannen`.
6. Controleer dat de dienst niet zichtbaar wordt in de medewerkerweergave.

## Extra gewerkt zonder geplande dienst

1. Log in als medewerker, bijvoorbeeld Niek of een veilige testmedewerker.
2. Open `Mijn uren` en kies de tab `Extra gewerkt`.
3. Kies een datum zonder geplande dienst, vul starttijd, eindtijd, pauze en omschrijving in.
4. Kies `Indienen`.
5. Refresh de browser.
6. Controleer dat de extra uren terugkomen bij `Extra gewerkt` en `Mijn gewerkte uren` met status ingediend/open.

## Planner urencontrole

1. Log in als planner.
2. Open `Uren controleren`.
3. Filter op de medewerker uit de extra-uren-test en de juiste week.
4. Controleer dat de regel `Extra gewerkt` zichtbaar is met status `open`.
5. Test achtereenvolgens: goedkeuren, terugsturen met opmerking, afwijzen.
6. Controleer na elke actie en refresh dat de status blijft staan en de medewerkerweergave klopt.

## Android normale start

1. Open de normale productie-URL op de probleemtelefoon, zonder `?safe=1`.
2. Controleer dat eerst de login/start zichtbaar wordt.
3. Controleer dat dashboard/rooster/aanvragen niet zwaar renderen voor login.
4. Log in als medewerker en navigeer naar `Mijn rooster` en `Mijn uren`.
5. Bij een runtime error: controleer dat het fatal recovery scherm zichtbaar blijft en de herstelknop alleen lokale appdata/cache wist.
6. Herhaal met `?safe=1` als fallback en controleer dat login ook daar werkt.

## Mailtestmodus

1. Log in als planner.
2. Open de mailinstellingen en controleer dat testmodus meldt dat mail naar `info@bakkerijstroet.nl` gaat.
3. Verstuur alleen een testmail via de testknop.
4. Controleer bij aanvraag, wijziging, goedkeuren, afwijzen, intrekken en ruilverzoek dat de mailflow een testmodusmelding gebruikt.
5. Controleer in de request/mailLog status of er geen echte medewerkeradressen als verzonden productie-ontvanger zijn gebruikt.
6. Zet productiemail niet aan zonder expliciet akkoord.
