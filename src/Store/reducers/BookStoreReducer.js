const variable ="";
export default function BookStoreReducer(state = variable,action) {
    
    const {type,payload}  =action;
    switch (type) {
        case 'id':
            return payload;
        case 'token':
            return payload;
        default:
            return state;
    }
}