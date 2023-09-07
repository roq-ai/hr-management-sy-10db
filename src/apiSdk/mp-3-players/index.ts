import axios from 'axios';
import queryString from 'query-string';
import { Mp3PlayerInterface, Mp3PlayerGetQueryInterface } from 'interfaces/mp-3-player';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMp3Players = async (
  query?: Mp3PlayerGetQueryInterface,
): Promise<PaginatedInterface<Mp3PlayerInterface>> => {
  const response = await axios.get('/api/mp-3-players', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMp3Player = async (mp3Player: Mp3PlayerInterface) => {
  const response = await axios.post('/api/mp-3-players', mp3Player);
  return response.data;
};

export const updateMp3PlayerById = async (id: string, mp3Player: Mp3PlayerInterface) => {
  const response = await axios.put(`/api/mp-3-players/${id}`, mp3Player);
  return response.data;
};

export const getMp3PlayerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mp-3-players/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMp3PlayerById = async (id: string) => {
  const response = await axios.delete(`/api/mp-3-players/${id}`);
  return response.data;
};
