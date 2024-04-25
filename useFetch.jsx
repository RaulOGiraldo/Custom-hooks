import { useEffect, useState } from 'react';

const localCache = {};

export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
        error: null,
    });

    const getFetch = async () => {

        if (localCache[url]) {
            console.log('Usando cache');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });
            return;
        }

        setState({
            ...state,
            isLoading: true,
        });

        const resp = await fetch(url);
        // Sleep
        await new Promise( resolve => setTimeout(resolve, 1500));

        if ( !resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            });
            return;
        }

        const data = await resp.json();
        //console.log(date);
        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        });

        // Manejo del Cache
        localCache[url] = data;
    }

    useEffect(() => {
        getFetch();
    }, [ url ]);

  return {
    data:       state.data,
    isLoading:  state.isLoading,
    hasError:   state.hasError,
  };

}
