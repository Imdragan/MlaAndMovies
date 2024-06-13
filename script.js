document.addEventListener('DOMContentLoaded', function() {
    const imageTable = document.getElementById('image-table');
    const totalImages = 100; // Totale di immagini nella cartella img
    const randomIndexes = [];

    while (randomIndexes.length < 9) {
        const randomIndex = Math.floor(Math.random() * totalImages) + 1;
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    // Funzione per formattare l'indice in formato 3 cifre
    function formatIndex(index) {
        return index.toString().padStart(3, '0');
    }

    let counter = 0;
    for (let i = 0; i < 3; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const td = document.createElement('td');
            const img = document.createElement('img');
            img.src = `img/${formatIndex(randomIndexes[counter])}.jpg`;
            img.alt = 'Image';
            td.appendChild(img);
            tr.appendChild(td);
            counter++;
        }
        imageTable.appendChild(tr);
    }
});
