
export const todoReducer = (initialState = [], action) => {

    switch ( action.type ) {
        case '[TODO] Add Todo':
            return [ ...initialState, action.payload ]
        
        case '[TODO] Remove Todo':
            return initialState.filter( todo => todo.id != action.payload );

            // throw new Error('Action.type = ABC no esta implementada');
        case '[TODO] Toggle Todo':
            return initialState.map( todo => {
                
                if ( todo.id === action.payload ) {  // Id
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            });
    
        default:
            return initialState;
    }
}