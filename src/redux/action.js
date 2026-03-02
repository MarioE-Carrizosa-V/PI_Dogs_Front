import {
  GET_BREED,
  GET_ID,
  GET_NAME,
  GET_TEMPERAMENTS,
  ORDER_DOG,
  FILTER_FROM,
  PAGINATE,
  SET_PAGE,
  CLEAR_DETAIL,
  SET_LANGUAGE,
  FILTER_BY_TRAIT,
  RESET_FILTERS,
  ADD_LOCAL_DOG,
  LOAD_LOCAL_DOGS,
} from "./actionTypes";
// import axios from "axios";
import apiNinjasClient, { mapDogData } from "../api/apiNinjas";
import { temperaments as localTemps } from "../utils/temperaments";

export const searchById = (id) => {
  return async (dispatch) => {
    try {
      // Check local dogs first
      const localDogs = JSON.parse(
        localStorage.getItem("locallyCreatedDogs") || "[]",
      );
      const localDog = localDogs.find((d) => d.id === id);
      if (localDog) {
        return dispatch({ type: GET_ID, payload: localDog });
      }

      const name = id.replace(/-/g, " ");
      const { data } = await apiNinjasClient.get(`dogs?name=${name}`);
      const dog = data.length > 0 ? mapDogData(data[0]) : null;
      return dispatch({
        type: GET_ID,
        payload: dog,
      });
    } catch (error) {
      console.error("Error searching by ID:", error);
    }
  };
};

export const getByTemperament = () => {
  return (dispatch) => {
    // Using local data instead of backend
    const mappedTemps = localTemps.map((t, index) => ({
      id: index + 1,
      temperament: t,
    }));
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: mappedTemps,
    });
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await apiNinjasClient.get(`dogs?name=${name}`);
      const mappedData = data.map(mapDogData);

      // Also search in local dogs
      const localDogs = JSON.parse(
        localStorage.getItem("locallyCreatedDogs") || "[]",
      );
      const filteredLocal = localDogs.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase()),
      );

      return dispatch({
        type: GET_NAME,
        payload: [...filteredLocal, ...mappedData],
      });
    } catch (error) {
      console.error("Error searching by name:", error);
    }
  };
};

export const postDog = (dogData) => {
  return (dispatch) => {
    const expiryDate = Date.now() + 30 * 24 * 60 * 60 * 1000; // 1 month
    const newDog = {
      ...dogData,
      id: `local-${Date.now()}`,
      createdInDb: true, // Mark as local for filtering
      expiryDate,
    };

    const localDogs = JSON.parse(
      localStorage.getItem("locallyCreatedDogs") || "[]",
    );
    localStorage.setItem(
      "locallyCreatedDogs",
      JSON.stringify([...localDogs, newDog]),
    );

    dispatch({
      type: ADD_LOCAL_DOG,
      payload: newDog,
    });
  };
};

export const loadLocalDogs = () => {
  return (dispatch) => {
    const localDogs = JSON.parse(
      localStorage.getItem("locallyCreatedDogs") || "[]",
    );
    const now = Date.now();
    const validDogs = localDogs.filter((dog) => dog.expiryDate > now);

    if (validDogs.length !== localDogs.length) {
      localStorage.setItem("locallyCreatedDogs", JSON.stringify(validDogs));
    }

    dispatch({
      type: LOAD_LOCAL_DOGS,
      payload: validDogs,
    });
  };
};

export const getByBreed = () => {
  return async (dispatch) => {
    try {
      const offsets = [0, 20, 40, 60, 80, 100];
      const requests = offsets.map((offset) =>
        apiNinjasClient.get(`dogs?min_height=1&offset=${offset}`),
      );

      const responses = await Promise.all(requests);
      const allData = responses
        .filter((r) => r.data && Array.isArray(r.data))
        .flatMap((r) => r.data);

      const mappedData = allData.map(mapDogData);

      // Load local dogs too
      const localDogs = JSON.parse(
        localStorage.getItem("locallyCreatedDogs") || "[]",
      );
      const now = Date.now();
      const validLocal = localDogs.filter((dog) => dog.expiryDate > now);

      return dispatch({
        type: GET_BREED,
        payload: [...validLocal, ...mappedData],
      });
    } catch (error) {
      console.error("Error getting breeds:", error);
    }
  };
};

export const filterDogsFrom = (origin) => {
  return { type: FILTER_FROM, payload: origin };
};

export const orderDogs = (type) => {
  return { type: ORDER_DOG, payload: type };
};

export const filterByTrait = (trait, level) => {
  return { type: FILTER_BY_TRAIT, payload: { trait, level } };
};

export const resetFilters = () => {
  return { type: RESET_FILTERS };
};

export const paginate = (page) => {
  return { type: PAGINATE, payload: page };
};

export const setPage = (pageNumber) => {
  return {
    type: SET_PAGE,
    payload: pageNumber,
  };
};

export const setLanguage = (lang) => {
  return {
    type: SET_LANGUAGE,
    payload: lang,
  };
};

export const clearDetail = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_DETAIL,
    });
  };
};
