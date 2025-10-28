import { Client, Databases, ID, Query } from "react-native-appwrite";
import { APPWRITE_CONFIG as config } from "@/config/appWrite_Config";


const client = new Client()
    .setEndpoint(config.ENDPOINT!)
    .setProject(config.PROJECT_ID!);    


const database = new Databases(client)

export const updateSearchCount = async (query : string , movie : Movie) => {

    try {
        const result = await database.listDocuments(config.DATABASE_ID!, config.COLLECTION_ID!,[
            Query.equal("searchTerm", query)
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
                    searchTerm: query,
                    movieId: movie.id,
                    title: movie.title,
                    posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
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