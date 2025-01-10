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
    caricaCanzoneCell();
    console.log(tracce);
    return tracce;
};

function durataFormattata(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/* const searchButton = document.getElementById('ricerca');
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
} */
searchDeezer('1121401');
/* 1121401 */
/* 216487 */
/* 161962 */
/* 75621062 */

const caricaCanzone = () => {
    const tracks = document.querySelectorAll('.track-item');
    tracks.forEach((track, index) => {
        track.addEventListener('click', () => {
            const player = document.getElementById('player-album');
            if (player) {
                player.innerHTML = `
                        <div class="d-flex">
                            <img src="${tracce[index].album.cover_small}" alt="${tracce[index].title}">
                        </div>
                        <div class="d-flex flex-column justify-content-center ps-3">
                            <h6 class="m-0 col-12 d-flex">${tracce[index].title}</h6>
                            <p class="m-0">${tracce[index].artist.name}</p>
                        </div>
                        <div class="d-flex align-items-center ps-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart"
                            viewBox="0 0 16 16">
                            <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                        </div>
                    
                `;
            }
            console.log('Playing:', tracce[index].title);
        });
    });
};
const caricaCanzoneCell = () => {
    const tracks = document.querySelectorAll('.track-item');
    tracks.forEach((track, index) => {
        track.addEventListener('click', () => {
            const player = document.getElementById('current-track');
            if (player) {
                player.innerHTML = `
                        <div class="d-flex">
                            <img src="${tracce[index].album.cover_small}" alt="${tracce[index].title}">
                        </div>
                        <div class="d-flex flex-column justify-content-center ps-3">
                            <h6 class="m-0 col-12 d-flex">${tracce[index].title}</h6>
                            <p class="m-0">${tracce[index].artist.name}</p>
                        </div>
                        <div class="d-flex align-items-center ps-4 gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-music-player" viewBox="0 0 16 16">
                                <path d="M4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm1 0v3h6V3zm3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                <path d="M11 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                            </svg>
                        </div>
                    
                `;
            }
            console.log('Playing:', tracce[index].title);
        });
    });
};

