import { get, put } from './api';

export const getAlbums   = ()      => get('/albums');
export const updateAlbum = (album) => put(`/albums/${album.album_id}`, album);
