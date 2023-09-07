import { UserInterface } from 'interfaces/user';
import { SongInterface } from 'interfaces/song';
import { GetQueryInterface } from 'interfaces';

export interface FavoriteSongsInterface {
  id?: string;
  user_id: string;
  song_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  song?: SongInterface;
  _count?: {};
}

export interface FavoriteSongsGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  song_id?: string;
}
