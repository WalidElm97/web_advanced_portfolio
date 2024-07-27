document.addEventListener('DOMContentLoaded', function() {
    // Haal de HTML-elementen op
    var dagboekFormulier = document.getElementById('dagboekFormulier');
    var titelInvoer = document.getElementById('titelInvoer');
    var inhoudInvoer = document.getElementById('inhoudInvoer');
    var dagboekLijst = document.getElementById('dagboekLijst');
    var verwijderAlleKnop = document.getElementById('verwijderAlleKnop');

    // Verwerk formulierverzending
    dagboekFormulier.addEventListener('submit', function(event) {
        event.preventDefault();
        var titel = titelInvoer.value;
        var inhoud = inhoudInvoer.value;
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
    function voegDagboekNotitieToe(titel, inhoud) {
        var notities = haalDagboekNotitiesOp();
        notities.push({ titel: titel, inhoud: inhoud });
        localStorage.setItem('dagboekNotities', JSON.stringify(notities));
        toonDagboekNotities();
    }

    // Dagboeknotities ophalen uit lokale opslag
    function haalDagboekNotitiesOp() {
        var notities = localStorage.getItem('dagboekNotities');
        return notities ? JSON.parse(notities) : [];
    }

    // Toon alle dagboeknotities
    function toonDagboekNotities() {
        var notities = haalDagboekNotitiesOp();
        dagboekLijst.innerHTML = '';
        notities.forEach(function(notitie, index) {
            var li = document.createElement('li');
            li.textContent = notitie.titel + ' - ' + notitie.inhoud;
            var verwijderKnop = document.createElement('button');
            verwijderKnop.textContent = 'Verwijderen';
            verwijderKnop.onclick = function() {
                verwijderNotitie(index); // verwijder notitie bij klikken
            };
            li.appendChild(verwijderKnop);
            dagboekLijst.appendChild(li);
        });
    }

    // Verwijder een dagboeknotitie
    function verwijderNotitie(index) {
        var notities = haalDagboekNotitiesOp(); // Haal notities op
        notities.splice(index, 1); // Verwijder notitie uit array
        localStorage.setItem('dagboekNotities', JSON.stringify(notities)); // Sla gewijzigde lijst op
        toonDagboekNotities();
    }

    // Notities tonen bij het laden van de pagina
    toonDagboekNotities(); // Toon notities
});
