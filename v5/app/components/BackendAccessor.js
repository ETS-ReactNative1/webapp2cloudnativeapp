import axiosBase from 'axios';

const API_ENDPOINT = process.env.REACT_APP_APISERVER ? process.env.REACT_APP_APISERVER : 'http://localhost:3000';

const axios = axiosBase.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

export const readItems = async () => {
  const res = await axios.get( '/api/db/items' );

  return res.data.results;
};

export const queryItems = async (key) => {
  const res = await axios.get( '/api/db/items/' + key );

  return res.data.results;
};

export const createItem = async( name, price, username ) => {
  const res = await axios.post( '/api/db/item', { name: name, price: price, username: username } );

  return res.data.status;
};

export const deleteItem = async( id ) => {
  const res = await axios.delete( '/api/db/item/' + id );

  return res.data.status;
};
