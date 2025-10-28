export const TMDB_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_TMDB_APY_BASE_URL,
    IMAGE_BASE_URL: process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL,
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    }
}