const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const searchDeezer = (searchQuery) => {
    fetch(`${URL}${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            popolaAlbum(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

const popolaAlbum = (data) => {
    const album = document.getElementById('album');
    album.innerHTML = `
        <div class="card">
            <img src="${data.cover}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.artist.name}</p>
                <p class="card-text">${data.release_date}</p>
                <p class="card-text">${data.nb_tracks} tracks</p>
                <div class="list-tracks">
                ${data.tracks.data.map((track, index) => `
                    <div class="track">
                        <p>${index + 1}. ${track.title} - ${track.duration}s</p>
                    </div>
                `).join('')}
                </div>
            </div>
        </div>
    `;
    console.log(data);
};

const searchButton = document.getElementById('ricerca');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('search');
        if (searchInput && searchInput.value) {
            searchDeezer(searchInput.value);
        } else {
            console.error('Search input not found or empty');
        }
    });
} else {
    console.error('Search button not found');
}