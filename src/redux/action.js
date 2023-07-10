import {FILTER_DOG, GET_BREED, GET_ID, GET_NAME, GET_TEMPERAMENTS, POST_DOG, ORDER_DOG, FILTER_FROM, PAGINATE, CLEAR_DETAIL } from "./actionTypes";
import axios from "axios";

export const searchById = (id) => {  // <== el nombre de la variable que recibe la function puede ser cualquiera: id, idRaza, numero de perro, etc
    return async (dispatch) => {
        const {data} = await axios.get('dogs/' + id)
          return dispatch({
             type: GET_ID,
             payload: data,
            });
        };
    };

export const getByTemperament = () => {
    return async (dispatch) => {
        const {data} = await axios.get('temperament/')
          return dispatch({
             type: GET_TEMPERAMENTS,
             payload: data,
            });
        };
    };

export const getByName = (name) => {
    return async (dispatch) => {
        const {data} = await axios.get('dogsName?name=' + name)
          return dispatch({
             type: GET_NAME,
             payload: data,
            });
        };
    };

export const postDog = async ({name, life_span, weight, height, image, temperament}) => {
    const {data} = await axios.post('dogs/saveDog', {name, life_span, weight, height, image, temperament})
    return (dispatch) => {
          return dispatch({
             type: POST_DOG,
             payload: data,
            });
        };
    };

export const getByBreed = () => {
    return async (dispatch) => {
        const {data} = await axios.get('dogs/')
          return dispatch({
             type: GET_BREED,
             payload: data,
            });
        };
    };

export const filterDogs = (temperament) => {
    return {type: FILTER_DOG, payload: temperament}
}

export const filterDogsFrom = (temperament) => {
    return {type: FILTER_FROM, payload: temperament}
}

export const orderDogs = (type) => {
    return {type: ORDER_DOG, payload: type}
}

export const paginate = (page) => {
 return {type: PAGINATE, payload: page}   
}

export const setPage = (pageNumber) => {
    return {
      type: 'SET_PAGE', payload: pageNumber};
}


export const clearDetail = () => {
    return function (dispatch){
        dispatch({
            type: CLEAR_DETAIL
        })
    }
}
  