(function() { // IIFE oproep in het begin 
    document.addEventListener('DOMContentLoaded', () => { //Zorgt ervoor dat JS na het starten van HTML wordt uitgevoerd.
        // Haal de HTML-elementen op (definities uit HTML om ze later te verwerken)
        let dagboekFormulier = document.getElementById('dagboekFormulier'); // formulier
        let titelInvoer = document.getElementById('titelInvoer'); // invoer veld voor titel
        let inhoudInvoer = document.getElementById('inhoudInvoer'); // invoer veld voor inhoud
        let dagboekLijst = document.getElementById('dagboekLijst'); // lijst van notities
        let verwijderAlleKnop = document.getElementById('verwijderAlleKnop'); // knop om alles te verwijderen
        let submitKnop = dagboekFormulier.querySelector('button[type="submit"]'); // Submit button in the form

        // Gebruiken van een constante voor maximale lengte
        let MAX_LENGTE = 100;

        // Event Listener voor het submitten van het formulier
        submitKnop.addEventListener('click', (event) => { // Arrow function voor click event
            event.preventDefault(); // Formulier niet versturen
            let titel = titelInvoer.value; // haal de titel op
            let inhoud = inhoudInvoer.value; // haal de inhoud op

            // Formulier valideren
            if (titel.length > MAX_LENGTE) {
                alert('Titel is te lang!'); //Geeft foutmelding in case 'if condition = true'
                return; //Stopt code indien titel te lang
            }
            if (inhoud.length > MAX_LENGTE) {
                alert('Inhoud is te lang!'); // Geeft foutmelding in case 'if condition = true'
                return; //Stopt code indien Inhoud te lang
            }
            if (zijnVeldenLeeg(titel, inhoud)) { // Correcte condities
                alert('Vul alle velden in!'); //Geeft foutmelding in case 'if condition = true'
                return; //Stopt code als alles velden leeg zijn
            }

            // Indien de validatie geslaagd is, voeg de notitie toe
            voegDagboekNotitieToe(titel, inhoud).then(() => {
                titelInvoer.value = ''; // reset de titel invoerveld voor volgende usage
                inhoudInvoer.value = ''; // reset de inhoud invoerveld voor volgende usage 
                toonDagboekNotities(); // toon de notities nadat notities werdt toegevoegd + cleaned
            });
        });

        // Verwerk het verwijderen van alle notities
        verwijderAlleKnop.addEventListener('click', async () => {
            await verwijderAlleNotities(); // verwijder alle notities uit localStorage (dagboeknotities)
            toonDagboekNotities(); // toon de notities (leeg)
        });

        // Check of velden leeg zijn met trim (om te spacies te verwijderen)
        let zijnVeldenLeeg = (...velden) => { // Rest operator voor parameter
            return velden.some(veld => veld.trim() === ''); // Check of een veld leeg is
        };

        // Nieuwe dagboeknotitie toevoegen
        let voegDagboekNotitieToe = async (titel, inhoud) => { // Arrow function
            let notities = await haalDagboekNotitiesOp(); // Haal de bestaande notities op met functie haalDagboekNotitiesOp
            notities.push({ titel, inhoud }); // Voeg de nieuwe notitie toe IN dagboekNotities
            return slaDagboekNotitiesOp(notities); // Sla de notities op in localStorage
        };

        // Dagboeknotities ophalen uit lokale opslag
        let haalDagboekNotitiesOp = () => { // Arrow function
            return new Promise((resolve) => {
                let notities = localStorage.getItem('dagboekNotities'); // haal de notities op uit localStorage
                resolve(notities ? JSON.parse(notities) : []); // geeft de notities weer indien er er zijn.
            }); // notities ? json.parse(notities) indien true -> notities weergegeven
            // notities ? [] indien false -> empty return 
            // bron - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
        };

        // Dagboeknotities opslaan in lokale opslag
        let slaDagboekNotitiesOp = (notities) => { // Arrow function
            return new Promise((resolve) => {
                localStorage.setItem('dagboekNotities', JSON.stringify(notities)); // sla de notities op in localStorage
                resolve();
            });
        };

        // Toon alle dagboeknotities
        let toonDagboekNotities = () => { // Arrow function
            haalDagboekNotitiesOp().then(notities => { // Haal de notities op
                dagboekLijst.innerHTML = ''; // Maak de lijst leeg door dagboeklijst te linken met lege lijst
                // bron - https://stackoverflow.com/questions/10750137/remove-all-li-from-ul
                notities.forEach((notitie, index) => { // Index is bijgehouden voor later wanneer wij een specifieke comment gaan verwijderen
                    let li = document.createElement('li'); // Creëer een nieuw lijst item
                    let { titel, inhoud } = notitie; // Destructuring
                    li.textContent = `${titel} - ${inhoud}`; // Gebruik template literals
                    let verwijderKnop = document.createElement('button'); // Creëer een verwijderknop
                    verwijderKnop.textContent = 'Verwijderen'; //Klik op specifiek comment (gelinkt met index voor identificatie)
                    verwijderKnop.onclick = () => verwijderNotitie(index); // Verwijder de notitie (roept 'haalDagboekNotitiesOp' functie op) met index waarde die gelink is aan die comment om die te verwijderen.
                    li.appendChild(verwijderKnop); // Voeg de knop toe aan het lijst item
                    dagboekLijst.appendChild(li); // Voeg het lijst item toe aan de lijst
                });
            });
        };
        // bron - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        // bron - https://www.youtube.com/watch?v=G0jO8kUrg-I

        // Verwijder een dagboeknotitie - deze functie zal geroepen worden in functie 'toonDagboekNotities'
        let verwijderNotitie = async (index) => { // Arrow function
            let notities = await haalDagboekNotitiesOp(); // Haal de notities op
            notities.splice(index, 1); // Verwijder de notitie uit de array, 1 staat voor het aantal !IMPORTANT!
            await slaDagboekNotitiesOp(notities); // Sla de gewijzigde lijst op
            toonDagboekNotities(); // Update de lijst
        };

        // Verwijder alle dagboeknotities
        let verwijderAlleNotities = () => { // Arrow function
            return new Promise((resolve) => {
                localStorage.removeItem('dagboekNotities'); // verwijder alle notities uit localStorage
                resolve();
            });
        };

        // Notities tonen bij het laden van de pagina
        toonDagboekNotities(); // Toon de notities, functie meteen geroept bij het runnen v code
    });
})(); // Einde van de IIFE
