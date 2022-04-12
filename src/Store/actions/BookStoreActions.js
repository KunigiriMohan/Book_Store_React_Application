export const IdActions = (value) => async dispatch =>{
    dispatch(
        {
            type: 'id',
            payload: value
        }
    )
};

export const TokenAction = (value) => async dispatch =>{
    dispatch(
        {
            type: 'token',
            payload: value
        }
    )
};
