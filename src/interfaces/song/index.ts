import { FavoriteSongsInterface } from 'interfaces/favorite-songs';
import { GetQueryInterface } from 'interfaces';

export interface SongInterface {
  id?: string;
  title: string;
  artist: string;
  duration: number;
  genre: string;
  release_date: any;
  created_at?: any;
  updated_at?: any;
  favorite_songs?: FavoriteSongsInterface[];

  _count?: {
    favorite_songs?: number;
  };
}

export interface SongGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  artist?: string;
  genre?: string;
}
