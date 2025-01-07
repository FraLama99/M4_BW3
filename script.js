const URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

export const searchDeezer = (searchQuery) => {
    fetch(`${URL}${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};
const searchQuery = 'eminem';
searchDeezer(searchQuery);