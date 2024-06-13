document.addEventListener('DOMContentLoaded', function() {
    fetch('lista film.json')
        .then(response => response.json())
        .then(data => {
            // Ordina i dati per anno
            data.sort((a, b) => a.anno - b.anno);

            // Creazione dei grafici

            // Grafico 1: Budget per Anno
            const ctx1 = document.getElementById('chart1').getContext('2d');
            createLineChart(ctx1, data);

            // Grafico 2: Oscar per Genere
            const ctx2 = document.getElementById('chart2').getContext('2d');
            createBarChart(ctx2, data);

            // Grafico 3: Numero di produzioni per Anno
            const ctx3 = document.getElementById('chart3').getContext('2d');
            createLineChartProduction(ctx3, data);
        })
        .catch(error => console.error('Errore nel caricamento dei dati:', error));

    // Funzione per creare un grafico a linee per anno di uscita e budget
    function createLineChart(ctx, data) {
        const years = [];
        const budgets = [];
        const films = [];

        data.forEach(movie => {
            years.push(movie.anno);
            budgets.push(movie.budget);
            films.push({
                titolo: movie.titolo,
                anno: movie.anno,
                genere: movie.genere,
                produzione: movie.produzione,
                regista: movie.regista,
                durata: movie.durata,
                budget: movie.budget,
                oscar: movie.oscar,
                immagine: movie.file
            });
        });

        const chart = new Chart(ctx, {
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
                        enabled: false,
                        mode: 'index',
                        intersect: false,
                        custom: function(tooltipModel) {
                            // Nascondi tooltip predefinito
                            const tooltipEl = document.getElementById('film-tooltip');
                            if (!tooltipModel.opacity) {
                                tooltipEl.style.display = 'none';
                                return;
                            }

                            // Mostra tooltip personalizzato
                            const point = chart.getElementsAtEventForMode(tooltipModel, 'nearest', { intersect: true }, false)[0];
                            if (point) {
                                const film = films[point.index];
                                showFilmTooltip(film, tooltipEl);
                            } else {
                                tooltipEl.style.display = 'none';
                            }
                        }
                    }
                }
            }
        });

        // Gestione del tooltip del film
        const tooltipEl = document.createElement('div');
        tooltipEl.id = 'film-tooltip';
        document.body.appendChild(tooltipEl);

        function showFilmTooltip(film, tooltipEl) {
            const tooltipContent = `
                <img src="${film.immagine}" alt="${film.titolo}">
                <div id="film-info">
                    <strong>${film.titolo}</strong><br>
                    Anno: ${film.anno}<br>
                    Genere: ${film.genere}<br>
                    Produzione: ${film.produzione}<br>
                    Regista: ${film.regista}<br>
                    Durata: ${film.durata} minuti<br>
                    Budget: $${film.budget}M<br>
                    Oscar: ${film.oscar}
                </div>
            `;
            tooltipEl.innerHTML = tooltipContent;
            tooltipEl.style.display = 'block';
            tooltipEl.style.left = `${tooltipEl.parentElement.offsetLeft + chart.tooltip._active[0].element.x}px`;
            tooltipEl.style.top = `${tooltipEl.parentElement.offsetTop + chart.tooltip._active[0].element.y}px`;
        }
    }

    // Funzione per creare un grafico a barre per oscar vinti per genere
    function createBarChart(ctx, data) {
        const genres = {};
        const films = [];

        data.forEach(movie => {
            if (!genres[movie.genere]) {
                genres[movie.genere] = 0;
            }
            genres[movie.genere] += movie.oscar;

            films.push({
                titolo: movie.titolo,
                anno: movie.anno,
                genere: movie.genere,
                produzione: movie.produzione,
                regista: movie.regista,
                durata: movie.durata,
                budget: movie.budget,
                oscar: movie.oscar,
                immagine: movie.file
            });
        });

        const labels = Object.keys(genres);
        const oscars = Object.values(genres);

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Oscar Vinti per Genere',
                    data: oscars,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
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
                        enabled: false,
                        mode: 'index',
                        intersect: false,
                        custom: function(tooltipModel) {
                            // Nascondi tooltip predefinito
                            const tooltipEl = document.getElementById('film-tooltip');
                            if (!tooltipModel.opacity) {
                                tooltipEl.style.display = 'none';
                                return;
                            }

                            // Mostra tooltip personalizzato
                            const point = chart.getElementsAtEventForMode(tooltipModel, 'nearest', { intersect: true }, false)[0];
                            if (point) {
                                const film = films[point.index];
                                showFilmTooltip(film, tooltipEl);
                            } else {
                                tooltipEl.style.display = 'none';
                            }
                        }
                    }
                }
            }
        });
    }

    // Funzione per creare un grafico a linee per numero di produzioni per anno
    function createLineChartProduction(ctx, data) {
        const years = {};
        const films = [];

        data.forEach(movie => {
            if (!years[movie.anno]) {
                years[movie.anno] = [];
            }
            if (!years[movie.anno].includes(movie.produzione)) {
                years[movie.anno].push(movie.produzione);
            }

            films.push({
                titolo: movie.titolo,
                anno: movie.anno,
                genere: movie.genere,
                produzione: movie.produzione,
                regista: movie.regista,
                durata: movie.durata,
                budget: movie.budget,
                oscar: movie.oscar,
                immagine: movie.file
            });
        });

        const labels = Object.keys(years);
        const productions = Object.values(years).map(p => p.length);

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Numero di Produzioni per Anno',
                    data: productions,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
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
                        enabled: false,
                        mode: 'index',
                        intersect: false,
                        custom: function(tooltipModel) {
                            // Nascondi tooltip predefinito
                            const tooltipEl = document.getElementById('film-tooltip');
                            if (!tooltipModel.opacity) {
                                tooltipEl.style.display = 'none';
                                return;
                            }

                            // Mostra tooltip personalizzato
                            const point = chart.getElementsAtEventForMode(tooltipModel, 'nearest', { intersect: true }, false)[0];
                            if (point) {
                                const film = films[point.index];
                                showFilmTooltip(film, tooltipEl);
                            } else {
                                tooltipEl.style.display = 'none';
                            }
                        }
                    }
                }
            }
        });
    }
});
