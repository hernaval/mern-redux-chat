import {
  GET_CHATS, AFTER_POST_MESSAGE,
  
} from '../_actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state=initialState,action){
  
  switch(action.type){
    
      case GET_CHATS:
       
          return {...state, items: action.payload }
      case AFTER_POST_MESSAGE : 
          return {...state, items : state.items.concat(action.payload )}
      default:
      
          return state;
  }
}