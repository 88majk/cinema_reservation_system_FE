export type Movie = {
    movieId: number;
    name: string;
    description: string;
    releaseDate: Date;
    minimumAge: number;
    duration: number;
    productionCountry: string;
    director: string;
    movieGenres: {
        genreId: number;
        name: string;
    }
}