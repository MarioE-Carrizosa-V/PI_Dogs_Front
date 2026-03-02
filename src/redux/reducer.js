import {
  GET_BREED,
  GET_ID,
  GET_NAME,
  GET_TEMPERAMENTS,
  ORDER_DOG,
  FILTER_DOG,
  FILTER_FROM,
  POST_DOG,
  SET_PAGE,
  CLEAR_DETAIL,
  SET_LANGUAGE,
  FILTER_BY_TRAIT,
  RESET_FILTERS,
  ADD_LOCAL_DOG,
  LOAD_LOCAL_DOGS,
} from "./actionTypes";

const initialState = {
  DogsById: {},
  DogsByTemperament: [],
  DogsByName: [],
  allDogs: [],
  allDogsCopy: [],
  message: "",
  elementsForPage: 8,
  page: 1,
  language: "ES",
  filters: {
    energy: "All",
    trainability: "All",
    barking: "All",
    shedding: "All",
    protectiveness: "All",
  },
};

const applyFilters = (dogs, filters) => {
  return dogs.filter((dog) => {
    // Local dogs don't have the same behavioral traits structure as API dogs
    // unless the user creates them with those traits.
    // If they don't have traits, we keep them in the list or let them pass.
    if (!dog.traits) return true;

    for (const trait in filters) {
      if (filters[trait] !== "All") {
        if (dog.traits[trait] !== parseInt(filters[trait])) {
          return false;
        }
      }
    }
    return true;
  });
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BREED:
    case LOAD_LOCAL_DOGS:
      return {
        ...state,
        allDogs: payload,
        allDogsCopy: payload,
        filters: {
          energy: "All",
          trainability: "All",
          barking: "All",
          shedding: "All",
          protectiveness: "All",
        },
      };
    case ADD_LOCAL_DOG:
      return {
        ...state,
        allDogs: [payload, ...state.allDogs],
        allDogsCopy: [payload, ...state.allDogsCopy],
      };
    case GET_ID:
      return {
        ...state,
        DogsById: payload,
      };
    case GET_NAME:
      return {
        ...state,
        allDogs: payload,
        allDogsCopy: payload,
        filters: {
          energy: "All",
          trainability: "All",
          barking: "All",
          shedding: "All",
          protectiveness: "All",
        },
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        DogsByTemperament: payload,
      };
    case FILTER_DOG:
      if (payload === "All") return { ...state, allDogs: state.allDogsCopy };

      const dogsFiltered = state.allDogsCopy.filter((dog) => {
        const tempMatch =
          dog.temperament &&
          dog.temperament.toLowerCase().includes(payload.toLowerCase());
        const dbMatch =
          dog.Temperaments &&
          dog.Temperaments.some(
            (t) => t.temperament.toLowerCase() === payload.toLowerCase(),
          );
        return tempMatch || dbMatch;
      });

      return {
        ...state,
        allDogs: dogsFiltered,
        page: 1,
      };
    case FILTER_FROM:
      if (payload === "All") return { ...state, allDogs: state.allDogsCopy };

      const dogsFilterFrom = state.allDogsCopy.filter((dog) => {
        // Local dogs have 'local-' IDs or createdInDb flag
        const isFromAPI =
          typeof dog.id === "string" &&
          !dog.id.startsWith("local-") &&
          !dog.createdInDb;
        if (payload === "API") return isFromAPI;
        if (payload === "DB") return !isFromAPI;
        return true;
      });
      return {
        ...state,
        allDogs: dogsFilterFrom,
        page: 1,
      };
    case FILTER_BY_TRAIT:
      const newFilters = { ...state.filters, [payload.trait]: payload.level };
      const filteredResults = applyFilters(state.allDogsCopy, newFilters);

      return {
        ...state,
        filters: newFilters,
        allDogs: filteredResults,
        page: 1,
      };
    case RESET_FILTERS:
      return {
        ...state,
        allDogs: state.allDogsCopy,
        filters: {
          energy: "All",
          trainability: "All",
          barking: "All",
          shedding: "All",
          protectiveness: "All",
        },
        page: 1,
      };
    case ORDER_DOG:
      const copyState = [...state.allDogs];
      let ordered;
      switch (payload) {
        case "A":
          ordered = copyState.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "D":
          ordered = copyState.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          ordered = copyState;
      }
      return {
        ...state,
        allDogs: ordered,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    case POST_DOG:
      return {
        ...state,
        message: payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        DogsById: null,
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    default:
      return state;
  }
};

export default reducer;
