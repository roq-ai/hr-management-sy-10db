import { UserInterface } from 'interfaces/user';
import { Mp3PlayerInterface } from 'interfaces/mp-3-player';
import { GetQueryInterface } from 'interfaces';

export interface SelectedMp3PlayersInterface {
  id?: string;
  user_id: string;
  mp3_player_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  mp3_player?: Mp3PlayerInterface;
  _count?: {};
}

export interface SelectedMp3PlayersGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  mp3_player_id?: string;
}
