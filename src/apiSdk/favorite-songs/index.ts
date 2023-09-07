import axios from 'axios';
import queryString from 'query-string';
import { FavoriteSongsInterface, FavoriteSongsGetQueryInterface } from 'interfaces/favorite-songs';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFavoriteSongs = async (
  query?: FavoriteSongsGetQueryInterface,
): Promise<PaginatedInterface<FavoriteSongsInterface>> => {
  const response = await axios.get('/api/favorite-songs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFavoriteSongs = async (favoriteSongs: FavoriteSongsInterface) => {
  const response = await axios.post('/api/favorite-songs', favoriteSongs);
  return response.data;
};

export const updateFavoriteSongsById = async (id: string, favoriteSongs: FavoriteSongsInterface) => {
  const response = await axios.put(`/api/favorite-songs/${id}`, favoriteSongs);
  return response.data;
};

export const getFavoriteSongsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/favorite-songs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFavoriteSongsById = async (id: string) => {
  const response = await axios.delete(`/api/favorite-songs/${id}`);
  return response.data;
};
