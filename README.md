SUPSI 20223-24
Corso d’interaction design, CV428.01
Docenti: A. Gysin, G. Profeta

Elaborato 1: XS

Mla and Movies

Autore: Dragan Radic
Mla and Movies

Introduzione e tema

Questo progetto si propone di visualizzare dati statistici relativi a film utilizzando grafici interattivi. I dati sono estratti da un file JSON che contiene informazioni come il titolo del film, il genere, l'anno di uscita, il budget, gli Oscar vinti, il luogo di produzione, e altri dettagli pertinenti. Utilizzando la libreria Chart.js, i dati vengono rappresentati visivamente in diversi tipi di grafici per fornire una panoramica comprensibile delle tendenze e delle relazioni tra le variabili.

Riferimenti progettuali

Il progetto si basa su un'architettura client-side utilizzando HTML, CSS e JavaScript. I principali riferimenti progettuali includono:

HTML: Utilizzato per strutturare l'interfaccia utente, definendo elementi come header, bottoni di navigazione e aree di contenuto per i grafici.

CSS: Stilizzazione degli elementi HTML per migliorare l'estetica e l'usabilità dell'applicazione.

JavaScript (Chart.js): Utilizzato per la creazione dinamica dei grafici a partire dai dati forniti nel file JSON. Chart.js offre una vasta gamma di opzioni per la personalizzazione dei grafici e la gestione degli eventi.



Design dell’interfraccia e modalià di interazione

L'interfaccia è progettata con un layout semplice e intuitivo per facilitare la navigazione e la comprensione dei dati presentati. I grafici sono collocati in blocchi separati all'interno di una struttura a colonne, consentendo una visualizzazione chiara e ordinata delle informazioni.

<main>
    <div class="container">
        <div class="block algorithm-block">
            <h2>Budget per Anno</h2>
            <div id="chart-container">
                <canvas id="chart1" class="chart"></canvas>
            </div>
            <p>
                Descrizione del grafico e delle informazioni visualizzate.
            </p>
        </div>
    </div>
</main>



Tecnologia usata

Chart.js: Libreria JavaScript per la creazione di grafici interattivi.

HTML5: Linguaggio di markup per la strutturazione dell'interfaccia utente.

CSS3: Fogli di stile per la presentazione e la formattazione dell'interfaccia utente.

JavaScript: Linguaggio di scripting per l'interazione dinamica con gli elementi HTML e la manipolazione dei dati.

Parti di codice rilevanti per il progetto

// Funzione per creare un grafico a linee per anno di uscita e budget
function createLineChart(ctx, data) {
    const years = [];
    const budgets = [];

    data.forEach(movie => {
        years.push(movie.anno);
        budgets.push(movie.budget);
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Budget per Anno ($M)',
                data: budgets,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            const film = data[tooltipItem.dataIndex];
                            return `${film.titolo}, Anno: ${film.anno}, Budget: $${film.budget}M`;
                        }
                    }
                }
            }
        }
    });
}



Contesto d’uso

Questo progetto è ideato per fornire una visualizzazione interattiva dei dati relativi ai film attraverso l'uso di grafici dinamici. È pensato per essere utilizzato da utenti interessati a esplorare e comprendere le relazioni tra variabili come budget, premi vinti, anno di uscita e altro, per categorie specifiche di film. Gli utenti possono navigare tra diversi grafici per ottenere insights sui trend nel mondo cinematografico e comprendere meglio le dinamiche di produzione, successo e premiazioni dei film nel corso degli anni.

Target

Il progetto è rivolto a:

Appassionati di cinema: Che desiderano esplorare statistiche e trend relativi ai film in base a variabili come budget, premi, genere e altro.

Studenti e ricercatori: Che utilizzano i dati per analizzare e studiare le dinamiche del settore cinematografico e per scopi accademici.

Industrie cinematografiche: Per comprendere meglio le performance e le tendenze del mercato cinematografico nel corso degli anni.