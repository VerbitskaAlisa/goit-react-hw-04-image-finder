const API_KEY = '30790144-ffee3d4e077f5846b26d5efda';
const baseURL = 'https://pixabay.com/api/';


function fetchImages(query, page) {
   return fetch(`${baseURL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&savesearch=true&per_page=12`)
   .then(respons => {
        return respons.json();
    })
}

const api = { 
    fetchImages, 
};

export default api;