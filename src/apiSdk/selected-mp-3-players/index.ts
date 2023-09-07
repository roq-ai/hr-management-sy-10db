import axios from 'axios';
import queryString from 'query-string';
import { SelectedMp3PlayersInterface, SelectedMp3PlayersGetQueryInterface } from 'interfaces/selected-mp-3-players';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSelectedMp3Players = async (
  query?: SelectedMp3PlayersGetQueryInterface,
): Promise<PaginatedInterface<SelectedMp3PlayersInterface>> => {
  const response = await axios.get('/api/selected-mp-3-players', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSelectedMp3Players = async (selectedMp3Players: SelectedMp3PlayersInterface) => {
  const response = await axios.post('/api/selected-mp-3-players', selectedMp3Players);
  return response.data;
};

export const updateSelectedMp3PlayersById = async (id: string, selectedMp3Players: SelectedMp3PlayersInterface) => {
  const response = await axios.put(`/api/selected-mp-3-players/${id}`, selectedMp3Players);
  return response.data;
};

export const getSelectedMp3PlayersById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/selected-mp-3-players/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteSelectedMp3PlayersById = async (id: string) => {
  const response = await axios.delete(`/api/selected-mp-3-players/${id}`);
  return response.data;
};
