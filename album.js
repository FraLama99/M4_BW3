const URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

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
            popolaAltro(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

const popolaAltro = (data) => {
    let altro = document.getElementById('altro');
    altro.innerHTML = '';

    if (!data || !data.data) {
        console.error('Dati non validi');
        return;
    }

    data.data.forEach((element) => {
        altro.innerHTML += `
        <div class="card bg-body-dark text-bg-dark" style="width: 18rem;">
            <img src="${element.album.cover}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.artist.name}</p>
                <a href="${element.link}" class="btn btn-danger">Go somewhere</a>
            </div>
        </div>
        `;
    });
};
const searchQuery = 'eminem';
searchDeezer(searchQuery);
let altro = document.getElementById('altro');

