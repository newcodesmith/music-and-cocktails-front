import { get, put, post, del } from './api';

export const getDrinks   = ()      => get('/drinks');
export const addDrink    = (drink) => post('/drinks', drink);
export const updateDrink = (drink) => put(`/drinks/${drink.drink_id}`, drink);
export const deleteDrink = (id)    => del(`/drinks/${id}`);
