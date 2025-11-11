import { Client, Databases, ID, Query } from "react-native-appwrite";
import { APPWRITE_CONFIG as config } from "@/config/appWrite_Config";
import { TMDB_CONFIG } from "@/config/TMDB_Config";
import { fetchMovieDetails } from "./TMDB_API";



const client = new Client()
  .setEndpoint(config.ENDPOINT!)
  .setProject(config.PROJECT_ID!);    


const database = new Databases(client)

export const updateCountBySearch = async (movie : Movie) => {
  try {    
    const result = await database.listDocuments(config.DATABASE_ID!, config.COLLECTION_ID!,[
      Query.equal("movieId", movie.id),
    ]);
    if(result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        config.DATABASE_ID!, 
        config.COLLECTION_ID!, existingMovie.$id, {
          count: existingMovie.count + 1,
        });
    }
    else{
      await database.createDocument(
        config.DATABASE_ID!, 
        config.COLLECTION_ID!, 
        ID.unique(), {
          movieId: movie.id,
          title: movie.title,
          posterURL: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`,
          count: 1,
          lang: movie.original_language,
          releaseYear: movie.release_date.split('-')[0],
          rate: (movie.vote_average / 2).toFixed(1),
        }
      )
    }
  } catch (error) {
    console.log("Error updating search count: ", error);
    throw error;
  }

}

export const updateCountByMovieId = async (movieId : number) => {
  if (!movieId) {
    console.warn("❗ Skipped update — movieId is missing or invalid");
    return;
  }
  try {
    const result = await database.listDocuments(config.DATABASE_ID!, config.COLLECTION_ID!,[
      Query.equal("movieId", movieId),
    ]);
    if(result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        config.DATABASE_ID!, 
        config.COLLECTION_ID!, existingMovie.$id, {
          count: existingMovie.count + 1,
        });
    }
    else{
      const {
        id, 
        title, 
        poster_path, 
        original_language, 
        release_date, 
        vote_average} = await fetchMovieDetails(movieId.toString());

      await database.createDocument(
        config.DATABASE_ID!, 
        config.COLLECTION_ID!, 
        ID.unique(), {
          movieId: id,
          title: title,
          posterURL: `${TMDB_CONFIG.IMAGE_BASE_URL}${poster_path}`,
          count: 1,
          lang: original_language,
          releaseYear: release_date.split('-')[0],
          rate: (vote_average / 2).toFixed(1),
        }
      )
    }
  } catch (error) {
    console.log("Error updating search count: ", error);
    throw error;
  }
}

export const getTrendingSearches = async (limit: number = 10) : Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(config.DATABASE_ID!, config.COLLECTION_ID!, [
      Query.orderDesc("count"),
      Query.limit(limit),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
}


export const isSaved = async (movieId : string , userId : string) : Promise<boolean> => {
  try {
    const result = await database.listDocuments(
      config.DATABASE_ID!, 
      config.SAVED_COLLECTION_ID!,
      [
        Query.equal("movieId", movieId),
        Query.equal("userId", userId),
      ]
    );
    return result.documents.length > 0;
  } 
  catch (error) {
    console.error(error);
    return false;
  }
}


export const saveMovie = async (movie : Movie, userId: string) : Promise<boolean> => {
  try {
    const existing = await database.listDocuments(
      config.DATABASE_ID!,
      config.SAVED_COLLECTION_ID!,
      [
        Query.equal("movieId", movie.id.toString()),
        Query.equal("userId", userId),
      ]
    );

    if (existing.total > 0) {
      console.log("Movie already saved by this user.");
      return false;
    }

    await database.createDocument(
      config.DATABASE_ID!,
      config.SAVED_COLLECTION_ID!,
      ID.unique(),
      {
        movieId: movie.id.toString(),
        userId: userId,
        title: movie.title,
        posterURL: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`,
        lang: movie.original_language,
        releaseYear: movie.release_date.split('-')[0],
        rate: (movie.vote_average / 2).toFixed(1),
      }
    );

    console.log("Movie saved successfully!");
    return true;
  } 
  catch (error) {
    console.error("Error saving movie:", error);
    return false;
  }
};

export const unsaveMovie = async (movieId: string, userId: string) : Promise<boolean> => {
  try {
    const existing = await database.listDocuments(
      config.DATABASE_ID!,
      config.SAVED_COLLECTION_ID!,
      [
        Query.equal("movieId", movieId),
        Query.equal("userId", userId),
      ]
    );

    if (existing.total === 0) {
      console.log("Movie not saved by this user.");
      return false;
    }

    await database.deleteDocument(
      config.DATABASE_ID!,
      config.SAVED_COLLECTION_ID!,
      existing.documents[0].$id
    );

    console.log("Movie unsaved successfully!");
    return true;
  } 
  catch (error) {
    console.error("Error unsaving movie:", error);
    return false;
  }
};


export const getSavedMovies = async (userId: string) : Promise<SavedMovie[]> => {
  try {
    const result = await database.listDocuments(
      config.DATABASE_ID!,
      config.SAVED_COLLECTION_ID!,
      [
        Query.equal("userId", userId),
      ]
    );
    return result.documents as unknown as SavedMovie[];
  } 
  catch (error) {
    console.error(error);
    return [];
  }
}