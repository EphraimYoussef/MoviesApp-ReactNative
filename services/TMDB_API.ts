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

export const fetchMovieDetails = async (movieId: string) : Promise<MovieDetails> => {
	try {
		const response = await fetch(`${config.BASE_URL}/movie/${movieId}?api_key=${config.API_KEY}`, {
			method: 'GET',
			headers: config.headers
		});

		if (!response.ok) {
			throw new Error("Failed to fetch movie details: " + response.statusText);
		}
		
		const data = await response.json();
		return data;
	} 
	catch (error) {
		console.log(error);
		throw new Error("Failed to fetch movie details" + error);	
	}
}