import { GET_BREED, GET_ID, GET_NAME, GET_TEMPERAMENTS, ORDER_DOG, FILTER_DOG, FILTER_FROM, POST_DOG, SET_PAGE, CLEAR_DETAIL} from "./actionTypes";

const initialState = {
    DogsById: {},
    DogsByTemperament: [],
    DogsByName: [],
    allDogs: [],
    message: '',
    elementsForPage: 8,
    page: 1,
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_BREED:
            return { 
                ...state, allDogs: payload
            };
        case GET_ID:
            return {
                ...state, DogsById: payload
            };
        case GET_NAME:
            return {
                ...state, allDogs: payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state, DogsByTemperament: payload
            }
        case FILTER_DOG:
            const dogsFiltered = state.allDogs.filter(dog => dog.temperament && dog.temperament.toLowerCase().trim().includes(payload))
            const dogsFilteredDB = state.allDogs.filter(dog => dog.Temperaments && dog.Temperaments.filter(temp => temp.temperament === payload).length > 0)
            let dogs = [...dogsFiltered, ...dogsFilteredDB]
            return {
                ...state, allDogs: dogs
        }
        case FILTER_FROM:
            const dogsFilterFrom = state.allDogs.filter(dog =>{
                if( payload === "API" && dog.image.url) {
                    return true
                } else if(
                    payload === "DB" && !dog.image.url){
                        return true
                    }
                return false
            })
            return {
                ...state, allDogs: dogsFilterFrom
            }
        case ORDER_DOG:
            const copyState = [...state.allDogs];
            let orderDogs;
            switch (payload) {
                case "A":
                    orderDogs = copyState.sort((a, b) => a.name.localeCompare(b.name));
                    return {
                        ...state, allDogs: orderDogs
                    };
                case "D":
                    orderDogs = copyState.sort((a, b) => b.name.localeCompare(a.name));
                    return {
                        ...state, allDogs: orderDogs
                    };
                default:{
                    return {...copyState}
                }
            }
            case POST_DOG:
                return{
                    ...state, message: payload
                }
            case CLEAR_DETAIL:
                return {
                    ...state, DogsById: null
                    }
            case SET_PAGE:
                return {
                ...state, page: payload,
                };
        default:{
            return {...state}
        }
    }
}

export default reducer