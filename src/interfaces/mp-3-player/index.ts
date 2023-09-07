import { SelectedMp3PlayersInterface } from 'interfaces/selected-mp-3-players';
import { GetQueryInterface } from 'interfaces';

export interface Mp3PlayerInterface {
  id?: string;
  brand: string;
  model: string;
  price: number;
  color: string;
  weight: number;
  created_at?: any;
  updated_at?: any;
  selected_mp3_players?: SelectedMp3PlayersInterface[];

  _count?: {
    selected_mp3_players?: number;
  };
}

export interface Mp3PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  brand?: string;
  model?: string;
  color?: string;
}
