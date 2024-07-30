document.addEventListener('DOMContentLoaded', function() {
    // Haal de HTML-elementen op
    let dagboekFormulier = document.getElementById('dagboekFormulier');
    let titelInvoer = document.getElementById('titelInvoer');
    let inhoudInvoer = document.getElementById('inhoudInvoer');
    let dagboekLijst = document.getElementById('dagboekLijst');
    let verwijderAlleKnop = document.getElementById('verwijderAlleKnop');

    // Verwerk formulierverzending
    dagboekFormulier.addEventListener('submit', function(event) {
        event.preventDefault();
        let titel = titelInvoer.value;
        let inhoud = inhoudInvoer.value;
        voegDagboekNotitieToe(titel, inhoud);
        titelInvoer.value = '';
        inhoudInvoer.value = '';
    });

    // Verwerk het verwijderen van alle notities
    verwijderAlleKnop.addEventListener('click', function() {
        localStorage.removeItem('dagboekNotities');
        toonDagboekNotities();
    });

    // Nieuwe dagboeknotitie toevoegen
    const voegDagboekNotitieToe = (titel, inhoud) => {
        let notities = haalDagboekNotitiesOp();
        notities.push({ titel, inhoud }); // gebruik van shorthand property names
        localStorage.setItem('dagboekNotities', JSON.stringify(notities));
        toonDagboekNotities();
    }

    // Dagboeknotities ophalen uit lokale opslag
    const haalDagboekNotitiesOp = () => {
        let notities = localStorage.getItem('dagboekNotities');
        return notities ? JSON.parse(notities) : [];
    }

    // Toon alle dagboeknotities
    const toonDagboekNotities = () => {
        let notities = haalDagboekNotitiesOp();
        dagboekLijst.innerHTML = '';
        notities.forEach((notitie, index) => {
            // Gebruik van destructuring
            let { titel, inhoud } = notitie;
            let li = document.createElement('li');
            // Gebruik van template literals
            li.innerHTML = `${titel} - ${inhoud}`;
            let verwijderKnop = document.createElement('button');
            verwijderKnop.textContent = 'Verwijderen';
            verwijderKnop.onclick = () => {
                verwijderNotitie(index); // verwijder notitie bij klikken
            };
            li.appendChild(verwijderKnop);
            dagboekLijst.appendChild(li);
        });
    }

    // Verwijder een dagboeknotitie
    const verwijderNotitie = (index) => {
        let notities = haalDagboekNotitiesOp(); // Haal notities op
        // Gebruik van de spread operator
        let nieuweNotities = [...notities.slice(0, index), ...notities.slice(index + 1)];
        localStorage.setItem('dagboekNotities', JSON.stringify(nieuweNotities)); // Sla gewijzigde lijst op
        toonDagboekNotities();
    }

    // Notities tonen bij het laden van de pagina
    toonDagboekNotities(); // Toon notities
});
