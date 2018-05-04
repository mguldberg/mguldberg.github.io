import axios from "axios";

// proper form from the giphy api generator page - https://developers.giphy.com/explorer
//  https://api.giphy.com/v1/gifs/search?api_key=EH8ZXxBQVql80tOi9F65DupbUqoYfjsF&q=&limit=25&offset=0&rating=G&lang=en

let queryURL = "https://api.giphy.com/v1/gifs/search";
const giphyApiKey = "EH8ZXxBQVql80tOi9F65DupbUqoYfjsF";

export default {
  searchGiphy: function (query) {
    queryURL += '?' + 'api_key='+ giphyApiKey+'&q='+ query+'&limit=12';
    return axios.get(queryURL);
  }
};
