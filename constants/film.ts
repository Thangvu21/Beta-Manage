import { ImageURISource } from "react-native";
import { images, imagesUrl } from "./image";


export enum AgeRating {
    P = 'P',
    C13 = 'C13',
    C16 = 'C16',
    C18 = 'C18',
}

export enum ColorAgeRating {
    P = '#00C853',    
    C13 = '#FFD600',    
    C16 = '#FF6D00',    
    C18 = '#D50000',    
}

export enum TextAgeRating {
    P = 'Phù hợp cho mọi lứa tuổi',
    C13 = 'Phù hợp cho trẻ từ 13 tuổi trở lên',
    C16 = 'Phù hợp cho trẻ từ 16 tuổi trở lên',
    C18 = 'Phù hợp cho người từ 18 tuổi trở lên',
}

export enum Status {
    ComingSoon = 'coming_soon',
    NowShowing = 'now_showing',
    Ended = 'ended',
}

export interface MovieData {
    id: string;
    title: string;
    ageRating: string;
    posterUrl: string;
    releaseDate: Date;
}

export interface MovieDetailData {
    id: string;
    title: string;
    description: string;
    releaseDate: Date;
    language: string;
    director: string;
    actors: string[]
    duration: Number;
    genres: string[];
    ageRating: string;
    posterUrl: string;
    trailerUrl: string;
    status: string;
}

export const MovieDetailData: MovieDetailData = {
    id: '1',
    title: 'Avatar',
    description: 'In the 22nd century, a paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    releaseDate: new Date('2009-12-18'),
    language: 'English',
    director: 'James Cameron',
    actors: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    genres: ['Action', 'Adventure', 'Fantasy'],
    ageRating: AgeRating.C13,
    posterUrl: imagesUrl.img1,
    trailerUrl: 'https://www.youtube.com/watch?v=XX1x8o4kiEA&t=1929s',
    status: Status.NowShowing,
    duration: 162,
}

export const MovieDetailDataList: MovieDetailData[] = [
    {
        id: '1',
        title: 'Avatar',
        description: 'In the 22nd century, a paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        releaseDate: new Date('2009-12-18'),
        language: 'English',
        director: 'James Cameron',
        actors: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
        genres: ['Action', 'Adventure', 'Fantasy'],
        ageRating: AgeRating.C13,
        posterUrl: imagesUrl.img1,
        trailerUrl: 'https://www.youtube.com/watch?v=XX1x8o4kiEA&t=1929s',
        status: Status.NowShowing,
        duration: 162,
    },
    {
        id: '2',
        title: 'Hello World',
        description: 'In the 22nd century, a paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        releaseDate: new Date('2009-12-18'),
        language: 'English',
        director: 'James Cameron',
        actors: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
        genres: ['Action', 'Adventure', 'Fantasy'],
        ageRating: AgeRating.C13,
        posterUrl: imagesUrl.img2,
        trailerUrl: 'https://www.youtube.com/watch?v=XX1x8o4kiEA&t=1929s',
        status: Status.NowShowing,
        duration: 162,
    },
    {
        id: '3',
        title: 'Hoho',
        description: 'In the 22nd century, protecting the world he feels is his home.',
        releaseDate: new Date('2009-12-18'),
        language: 'English',
        director: 'James Cameron',
        actors: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
        genres: ['Action', 'Adventure', 'Fantasy'],
        ageRating: AgeRating.C13,
        posterUrl: imagesUrl.img3,
        trailerUrl: 'https://www.youtube.com/watch?v=XX1x8o4kiEA&t=1929s',
        status: Status.NowShowing,
        duration: 150,

    }
]

export const FilmData: MovieData[] = [

    {
        id: '1',
        title: 'Avatar',
        releaseDate: new Date('2009-12-18'),
        ageRating: AgeRating.C13,
        posterUrl: imagesUrl.img1
    },

    {
        id: '2',
        title: 'The Dark Knight',
        releaseDate: new Date('2008-07-18'),
        ageRating: AgeRating.C16,
        posterUrl: imagesUrl.img2
    },

    {
        id: '3',
        title: 'Inception',
        releaseDate: new Date('2010-07-16'),
        ageRating: AgeRating.C16,
        posterUrl: imagesUrl.img3
    },

    {
        id: '4',
        title: 'Interstellar',
        releaseDate: new Date('2014-11-07'),
        ageRating: AgeRating.C16,
        posterUrl: imagesUrl.img4
    },

    {
        id: '5',
        title: 'The Matrix',
        releaseDate: new Date('1999-03-31'),
        ageRating: AgeRating.C16,
        posterUrl: imagesUrl.img5
    },

    {
        id: '6',
        title: 'The Shawshank Redemption',
        releaseDate: new Date('1994-09-23'),
        ageRating: AgeRating.C18,
        posterUrl: imagesUrl.img6
    },

    {
        id: '7',
        title: 'The Godfather',
        releaseDate: new Date('1972-03-24'),
        ageRating: AgeRating.C18,
        posterUrl: imagesUrl.img7
    },

    {
        id: '8',
        title: 'Pulp Fiction',
        releaseDate: new Date('1994-10-14'),
        ageRating: AgeRating.C18,
        posterUrl: imagesUrl.img8
    },

    {
        id: '9',
        title: 'The Shawshank Redemption',
        releaseDate: new Date('1994-09-23'),
        ageRating: AgeRating.C18,
        posterUrl: imagesUrl.img6
    },

    {
        id: '10',
        title: 'The Godfather',
        releaseDate: new Date('1994-09-23'),
        ageRating: AgeRating.C18,
        posterUrl: imagesUrl.img7
    },

    {
        id: '11',
        title: 'Pulp Fiction',
        releaseDate: new Date('1994-09-23'),
        ageRating: AgeRating.C18,
        posterUrl: imagesUrl.img8
    },

]