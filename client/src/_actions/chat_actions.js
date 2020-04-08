

import {
    GET_CHATS,
    AFTER_POST_MESSAGE
    
} from './types';
import { CHAT_SERVER } from '../components/Config.js';

export const  getChats = () => dispatch => {
    
    fetch(`${CHAT_SERVER}/getChats`)
    .then(res => res.json())
    .then(chats => 
        dispatch({
            type : GET_CHATS,
            payload : chats
        }))
}

export const  afterPostMessage = (dataToSubmit)  => {
   return {
       type : AFTER_POST_MESSAGE,
       payload : dataToSubmit
   }

}