import { ImageURISource } from "react-native";
import { images, imagesUrl } from "./image";

export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  posterUrl: ImageURISource;
}

export const FilmData = [

    {
        id: '1',
        title: 'Avatar',
        releaseDate: '2009-12-18',
        posterUrl: imagesUrl.img1
    },

    {
        id: '2',
        title: 'The Dark Knight',
        releaseDate: '2008-07-18',
        posterUrl: imagesUrl.img2
    },

    {
        id: '3',
        title: 'Inception',
        releaseDate: '2010-07-16',
        posterUrl: imagesUrl.img3
    },

    {
        id: '4',
        title: 'Interstellar',
        releaseDate: '2014-11-07',
        posterUrl: imagesUrl.img4
    },

    {
        id: '5',
        title: 'The Matrix',
        releaseDate: '1999-03-31',
        posterUrl: imagesUrl.img5
    },

    {
        id: '6',
        title: 'The Shawshank Redemption',
        releaseDate: '1994-09-23',
        posterUrl: imagesUrl.img6
    },

    {
        id: '7',
        title: 'The Godfather',
        releaseDate: '1972-03-24',
        posterUrl: imagesUrl.img7
    },

    {
        id: '8',
        title: 'Pulp Fiction',
        releaseDate: '1994-10-14',
        posterUrl: imagesUrl.img8
    },
    

]