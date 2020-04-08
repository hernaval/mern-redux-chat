 import React from "react"
import {Comment,Tooltip,Avatar} from "antd"
import moment from "moment"
import chat_reducer from "../../../../_reducers/chat_reducer"
 function ChatCard(props){
     return(
         <div style={{width:"100%"}}>
             <Comment
               
                content={
                     (props.message && props.message.substring(0,8)) ==="uploads\\" ?

                       ( props.message && props.message.substring(props.message.length -3 , props.message.length) )  === "mp4" ?
                        <video
                        style={{maxWidth : "400px"}}
                        alt ="video"
                        src={`http://localhost:8080/${props.message.replace("\\","/")}`} /> 

                        : 
                        <img alt="image"
                        style={{maxWidth : "200px"}}
                        src={`http://localhost:8080/${props.message.replace("\\","/")}`}/>

                    : 
                    <p>
                        
                        {props.message}
                    </p>
                }
               
             />
         </div>
     )
 }

 export default ChatCard 