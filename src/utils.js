import { apiBaseUrl, apiKey } from './constants'

export const getDiscoverUrl = ({ genre, page }) => 
    `${apiBaseUrl}/discover/movie?&with_genres=${genre}&page=${page}&sort_by=popularity.desc&language=en-US&api_key=${apiKey}`;

export const getImageUrl = (imagePath) => `https://image.tmdb.org/t/p/w500${imagePath}`;