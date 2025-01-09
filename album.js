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
let tracce = [];

const popolaAlbum = (data) => {
    const album = document.getElementById('album');
    album.innerHTML = `
         <div class="d-flex">
                  <i
                    class="bi bi-arrow-left d-flex ms-2 d-lg-none justify-content-start"
                    width="25"
                    height="25"
                  ></i>

                  <div id="cover" class="album-cover d-flex mb-4 m-lg-0 m-auto">
                    <img
                      src="${data.cover}"
                      alt="${data.title}"
                      class="object-fit-cover"
                    />
                  </div>
                </div>

                <!-- Titolo, artista, album -->
                <div
                  class="album-info d-flex flex-column justify-content-lg-end gap-lg-5"
                >
                  <div class="d-none d-lg-flex">Album</div>
                  <h2>${data.title}</h2>
                  <div
                    id="artist"
                    class="d-flex flex-column flex-lg-row gap-2 align-items-lg-center"
                  >
                    <div class="d-flex align-items-center gap-3 mt-2">
                      <img
                        src="${data.artist.picture}"
                        alt="${data.artist.name}"
                        class="rounded-circle img-fluid object-fit-cover"
                      />
                      <h4 class="m-0">${data.artist.name}</h4>
                    </div>
                    <div class="d-flex gap-1 text-secondary mt-2">
                      <div class="d-lg-none">Album</div>
                      <div>•</div>
                      <div class="tracks-date">${data.release_date}</div>
                      <div class="d-none d-lg-flex">•</div>
                      <div class="d-none d-lg-flex tracks-count">
                        ${data.nb_tracks}
                      </div>
                    </div>
                  </div>
                </div>
             
    `;
    console.log(data);
    const tracks = document.getElementById('tracks');
    tracks.innerHTML = `<div  class="tracks-list ">                    
                            ${data.tracks.data.map((track, index) => `
                            <div class="track-item d-flex flex-row gap-3 align-items-center justify-content-between">                  
                                <div id="track-number" 
                                class="d-none d-md-flex col-md-1 justify-content-center">
                                        ${index + 1}
                                </div>                 
                                <div id="title-artist" class="col-md-5">
                                    <div id="track-title">${track.title}</div>
                                        <div id="track-artist" class="text-secondary">
                                        ${track.artist.name}
                                        </div>
                                    </div>                 
                                    <div class="d-flex align-items-center d-md-none">
                                        <i
                                        class="bi bi-three-dots-vertical"
                                        width="16"
                                        height="16"
                                        ></i>
                                    </div>                 
                                    <div
                                        id="track-rank"
                                        class="d-none d-md-flex col-md-2 justify-content-end"
                                    >
                                        ${track.rank}
                                    </div>                 
                                    <div
                                        id="track-duration"
                                        class="d-none d-md-flex pe-4 col-md-2 justify-content-end"
                                    >
                                        ${durataFormattata(track.duration)}s
                                    </div>
                                </div>
                            </div>
                                `).join('')}
                        </div>`;
    tracce = data.tracks.data;
    caricaCanzone();
    console.log(tracce);
    return tracce;
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
searchDeezer('1121401');
/* 1121401 */
/* 216487 */
/* 161962 */
/* 75621062 */

const caricaCanzone = () => {
    const tracks = document.querySelectorAll('.track-item');
    tracks.forEach((track, index) => {
        track.addEventListener('click', () => {
            const player = document.getElementById('player');
            if (player) {
                player.innerHTML = `
                    <div class="now-playing d-flex align-items-center gap-3">
                        <img src="${tracce[index].album.cover_small}" alt="${tracce[index].title}" />
                        <div>
                            <div class="track-title fw-light">${tracce[index].title}</div>
                            <div class="track-artist fw-light">${tracce[index].artist.name}</div>
                        </div>
                    </div>
                `;
            }
            console.log('Playing:', tracce[index].title);
        });
    });
};
