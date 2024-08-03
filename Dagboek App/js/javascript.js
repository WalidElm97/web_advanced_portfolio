document.addEventListener('DOMContentLoaded', function() {
    // Haal de HTML-elementen op
    let dagboekFormulier = document.getElementById('dagboekFormulier'); // formulier
    let titelInvoer = document.getElementById('titelInvoer'); // invoer veld voor titel
    let inhoudInvoer = document.getElementById('inhoudInvoer'); // invoer veld voor inhoud
    let dagboekLijst = document.getElementById('dagboekLijst'); // lijst van notities
    let verwijderAlleKnop = document.getElementById('verwijderAlleKnop'); // knop om alles te verwijderen

    // Gebruiken van een constante
    const MAX_LENGTE = 100;

    // Check of velden leeg zijn
    function zijnVeldenLeeg(titel, inhoud) {
        if (titel.trim() === '') {
            return true;
        }
        if (inhoud.trim() === '') {
            return true;
        }
        return false;
    }

    // Verwerk formulierverzending
    dagboekFormulier.addEventListener('submit', function(event) {
        event.preventDefault(); // Formulier niet versturen
        let titel = titelInvoer.value; // haal de titel op
        let inhoud = inhoudInvoer.value; // haal de inhoud op

        // Formulier valideren
        if (titel.length > MAX_LENGTE) {
            alert('Titel is te lang!');
            return;
        }
        if (inhoud.length > MAX_LENGTE) {
            alert('Inhoud is te lang!');
            return;
        }
        if (zijnVeldenLeeg(titel, inhoud)) { // Correcte functienaam
            alert('Vul alle velden in!');
            return;
        }

        voegDagboekNotitieToe(titel, inhoud); // voeg de notitie toe
        titelInvoer.value = ''; // reset de titel invoerveld
        inhoudInvoer.value = ''; // reset de inhoud invoerveld
    });

    // Verwerk het verwijderen van alle notities
    verwijderAlleKnop.addEventListener('click', () => {
        localStorage.removeItem('dagboekNotities'); // verwijder alle notities uit localStorage
        toonDagboekNotities(); // toon de notities
    });

    // Nieuwe dagboeknotitie toevoegen
    function voegDagboekNotitieToe(titel, inhoud) {
        let notities = haalDagboekNotitiesOp(); // haal de bestaande notities op
        notities.push({ titel: titel, inhoud: inhoud }); // voeg de nieuwe notitie toe
        localStorage.setItem('dagboekNotities', JSON.stringify(notities)); // sla de notities op in localStorage
        toonDagboekNotities(); // toon de notities
    }

    // Dagboeknotities ophalen uit lokale opslag
    function haalDagboekNotitiesOp() {
        let notities = localStorage.getItem('dagboekNotities'); // haal de notities op uit localStorage
        return notities ? JSON.parse(notities) : []; // parse de notities of geef een lege array terug
    }

    // Toon alle dagboeknotities
    function toonDagboekNotities() {
        let notities = haalDagboekNotitiesOp(); // Haal de notities op
        dagboekLijst.innerHTML = ''; // Maak de lijst leeg
        notities.forEach((notitie, index) => {
            let li = document.createElement('li'); // Creëer een nieuw lijst item
            let { titel, inhoud } = notitie; // Destructuring
            li.textContent = `${titel} - ${inhoud}`; // Gebruik template literals
            let verwijderKnop = document.createElement('button'); // Creëer een verwijderknop
            verwijderKnop.textContent = 'Verwijderen';
            verwijderKnop.onclick = () => {
                verwijderNotitie(index); // Verwijder de notitie
            };
            li.appendChild(verwijderKnop); // Voeg de knop toe aan het lijst item
            dagboekLijst.appendChild(li); // Voeg het lijst item toe aan de lijst
        });
    }

    // Verwijder een dagboeknotitie
    function verwijderNotitie(index) {
        let notities = haalDagboekNotitiesOp(); // Haal de notities op
        notities.splice(index, 1); // Verwijder de notitie uit de array
        localStorage.setItem('dagboekNotities', JSON.stringify(notities)); // Sla de gewijzigde lijst op
        toonDagboekNotities(); // Update de lijst
    }

    // Notities tonen bij het laden van de pagina
    toonDagboekNotities(); // Toon de notities

    // Voorbeeld van een Promise - belofte voor data ophalen
    function fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let data = 'Belangrijke data'; // Simuleer het ophalen van data
                resolve(data); // Los de belofte in
            }, 1000); // Wacht 1 seconde
        });
    }

    // Gebruik van de promise - wachten op data
    fetchData().then(data => {
        console.log('Data ontvangen:', data); // Toon data in console
    }).catch(error => {
        console.log('Er is een fout opgetreden:', error); // Toon fout in console
    });

    // Voorbeeld van async/await - makkelijkere manier om op data te wachten
    async function fetchAsyncData() {
        try {
            let data = await fetchData(); // Wacht op data
            console.log('Async data ontvangen:', data); // Toon data in console
        } catch (error) {
            console.log('Fout bij async data:', error); // Toon fout in console
        }
    }

    fetchAsyncData(); // Roep async functie aan

    // IIFE voorbeeld - een functie die zichzelf uitvoert !!!!!!!!!!!!!!!!! MOET NOG VERWERKT WORDEN !!!!!!!!!!!!!!!!!! 
    (function() {
        console.log('Dit is een Immediately Invoked Function Expression (IIFE)'); // Voer IIFE uit
    })();

    // Animatie voorbeeld toevoegen
    // Voegt een fade-in effect toe aan de dagboek notities
    let lijstItems = document.querySelectorAll('#dagboekLijst li'); // alle lijst items pakken
    lijstItems.forEach(item => {
        item.style.animation = 'fadeIn 1s'; // animatie toevoegen
    });

    // Flexbox layout voorbeeld
    let container = document.querySelector('body'); // pak het body element
    container.style.display = 'flex'; // flexbox toepassen
    container.style.flexDirection = 'column'; // kolom richting
    container.style.alignItems = 'center'; // centreer alles horizontaal

    // Template literals voorbeeld bij het tonen van notities
    function toonDagboekNotities() {
        let notities = haalDagboekNotitiesOp(); // Haal de notities op
        dagboekLijst.innerHTML = ''; // Maak de lijst leeg
        notities.forEach((notitie, index) => {
            let li = document.createElement('li'); // Creëer een nieuw lijst item
            let { titel, inhoud } = notitie; // Destructuring
            li.textContent = `${titel} - ${inhoud}`; // Gebruik template literals
            let verwijderKnop = document.createElement('button'); // Creëer een verwijderknop
            verwijderKnop.textContent = 'Verwijderen';
            verwijderKnop.onclick = () => {
                verwijderNotitie(index); // Verwijder de notitie
            };
            li.appendChild(verwijderKnop); // Voeg de knop toe aan het lijst item
            dagboekLijst.appendChild(li); // Voeg het lijst item toe aan de lijst
        });
    }

    // Arrow function voorbeeld
    // Voegt een simpele click event listener toe aan de knop
    let knop = document.querySelector('#verwijderAlleKnop');
    knop.addEventListener('click', () => {
        console.log('Alle notities zijn verwijderd!'); // melding in console
    });

    // Destructuring voorbeeld
    function toonDestructuringVoorbeeld() {
        let voorbeeldNotitie = { titel: 'Voorbeeld Titel', inhoud: 'Voorbeeld Inhoud' };
        let { titel, inhoud } = voorbeeldNotitie;
        console.log('Destructuring voorbeeld:', titel, inhoud);
    }

    toonDestructuringVoorbeeld();
});
