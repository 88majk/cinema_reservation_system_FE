import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Movie } from '../../../models/movies-data';
import { MovieService } from '../../../services/movie.service';
import { GenreDto } from '../../../models/genre-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MoviesComponent {
  movieById: Movie | undefined;
  movies: Movie[] = [];
  genres: GenreDto[] = [];
  pickedGenres: GenreDto[] = [];
  movieForm: FormGroup = new FormGroup({});
  updateMovieForm: FormGroup = new FormGroup({});

  visibleDialog: boolean = false;
  addMovieMessage: string = '';
  movieId: number = 1;

  private movieService = inject(MovieService);
  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.getListOfMovies();
    this.getListOfGenres();

    this.movieForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      releaseDate: ['', Validators.required],
      minimumAge: ['', Validators.required],
      duration: ['', Validators.required],
      productionCountry: ['', Validators.required],
      director: ['', Validators.required],
      movieGenres: ['', Validators.required],
    } as unknown as Movie);

    this.updateMovieForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      description: [{ value: '', disabled: true }, Validators.required],
      releaseDate: [{ value: '', disabled: true }, Validators.required],
      minimumAge: [{ value: '', disabled: true }, Validators.required],
      duration: [{ value: '', disabled: true }, Validators.required],
      productionCountry: [{ value: '', disabled: true }, Validators.required],
      director: [{ value: '', disabled: true }, Validators.required],
      movieGenres: [{ value: '', disabled: true }, Validators.required],
    });
  }

  sendNewMovie(): void {
    if (this.movieForm.valid) {
      const data = { ...this.movieForm.value };
      console.log(data);
      this.movieService.sendNewMovie(data).subscribe(
        (response) => {
          console.log(response);
          this.getListOfMovies();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.addMovieMessage = 'Do not leave empty forms!';
      this.clearMessageAfterTimeout();
    }
  }

  clearMessageAfterTimeout(): void {
    setTimeout(() => {
      this.addMovieMessage = '';
    }, 5000);
  }

  updateMovieById(movieId: number): void {
    if (this.updateMovieForm.valid) {
      const data = this.updateMovieForm.value;
      console.log(data);
      this.movieService.updateMovieById(movieId, data).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.addMovieMessage = 'Do not leave empty forms!';
      this.clearMessageAfterTimeout();
    }
  }

  getMovieGenres(): string {
    let genres = '';

    if (
      this.movieById?.movieGenres &&
      Array.isArray(this.movieById.movieGenres)
    ) {
      genres = this.movieById.movieGenres
        .map((genre: GenreDto) => genre.name)
        .join(', ');
    }

    return genres;
  }

  getListOfMovies() {
    this.movieService.getAllMovies().subscribe(
      (response) => {
        console.log(response);
        this.movies = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMovieById(id: number) {
    console.log(id);
    this.movieId = id;
    this.movieService.getMovieById(id).subscribe(
      (response) => {
        console.log(response);
        this.movieById = response;
        this.updateMovieForm.patchValue({
          name: this.movieById.name,
          description: this.movieById.description,
          releaseDate: this.movieById.releaseDate,
          minimumAge: this.movieById.minimumAge,
          duration: this.movieById.duration,
          productionCountry: this.movieById.productionCountry,
          director: this.movieById.director,
          movieGenres: this.movieById.movieGenres,
        });
        this.updateMovieForm.enable();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getListOfGenres() {
    this.movieService.getAllGenres().subscribe(
      (response) => {
        console.log(response);
        this.genres = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
