import { MovieSession } from './movieSession-data';
import { GenreDto } from './genre-data'; // Upewnij się, że ścieżka do pliku jest poprawna

export interface MovieAndSessions {
    movieId: number;
    name: string;
    description: string;
    releaseDate: string; // Możesz użyć string, jeśli preferujesz, aby data była w formacie ISO 8601 (np. "2024-05-09")
    minimumAge: number;
    duration: number;
    productionCountry: string;
    director: string;
    movieSessionList: MovieSession[];
    genres: GenreDto[];
}
