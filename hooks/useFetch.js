import { useEffect, useReducer } from "react";

function reducer(state, {type, responseJSON, error}) {
    switch(type) {
        case 'loading':
            return {...state, isLoading: true};
        case 'success':
            return {responseJSON, isLoading: false, error: null};
        case 'error':
            return {responseJSON: null, isLoading: false, error};
        default:
            throw new Error("Unkown action type");
    }
}

export function useFetch(url) {
    const [state, dispatch] = useReducer(reducer, {
        responseJSON: null,
        isLoading: true,
        error: null,
    })
    useEffect(() => {
        let shouldCancel = false;

       const callFetch = async () => {
            dispatch({type: 'loading'});

            try {
                const response = await fetch(url);
                const responseJSON = await response.json();
                if(shouldCancel) return;
                dispatch({type: 'success', responseJSON});                
            } catch(error) {
                if(shouldCancel) return;
                dispatch({type: 'error', error});
            }
       } 
       callFetch();

       return () => (shouldCancel = true);
    }, [])

    return state;
}