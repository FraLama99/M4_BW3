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
        <div class="album-container d-flex flex-column">
            <div class="d-flex flex-row align-items-center ">
                <div class="album-cover">
                    <img src="${data.cover}" alt="${data.title}">
                </div>
                <div class="album-info ps-4">
                    <h1>${data.title}</h1>
                        <div class="d-flex flex-row align-items-center">
                            <img src="${data.artist.picture}" alt="${data.artist.name}" class="rounded-circle" style="width: 50px; height: 50px;">
                            <h4>${data.artist.name}</h4>
                            <div class="release-date ps-2">${data.release_date}</div>
                            <div class="tracks-count ps-2">${data.nb_tracks} tracks</div>
                        </div>
                </div>
            </div>
                <div class="tracks-list ">                    
                        ${data.tracks.data.map((track, index) => `
                    <div class=" mt-4 d-flex justify-content-between align-items-center">
                            <div class="track-item d-flex flex-row gap-3 align-items-center">
                                <div id="track-number ">${index + 1}</div>
                                <div class="d-flex flex-column">
                                    <div id="track-title">${track.title}</div>
                                    <div id="track-artist" class="text-secondary" >${track.artist.name}</div>
                                </div>
                            </div>  
                            <div id="track-rank">${track.rank}</div>
                            <div id="track-duration">${durataFormattata(track.duration)}s</div>
                        </div>
                    `).join('')}
                </div>
            
        </div>
    `;
    console.log(data);
};
function durataFormattata(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

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