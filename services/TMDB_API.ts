import { TMDB_CONFIG as config } from '../config/TMDB_Config';

export const fetchMovies = async ({query} : {query: string}) => {
	const endpoint = query
	? `${config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
	: `${config.BASE_URL}/discover/movie?sort_by=popularity.desc`;
	
	const response = await fetch(endpoint, {
		method: 'GET',
		headers: config.headers
	});

	if (!response.ok) {
		throw new Error("Failed to fetch movies: " + response.statusText);
	}

	const data = await response.json();

	return data;
}