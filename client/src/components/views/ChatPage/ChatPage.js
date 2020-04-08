import React from "react"
import { Form, Icon, Button, Row, Col, Input } from "antd"
import Axios from "axios"
import io from "socket.io-client"
import { connect } from "react-redux"
import moment from "moment"
import Dropzone from "react-dropzone";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions"
import ChatCard from "./Sections/ChatCard"

export class ChatPage extends React.Component {

    state = {
        chatMessage: ""
    }

    componentDidMount() {
        let server = "http://localhost:8080";

        this.props.getChats()

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd)
            this.props.afterPostMessage(messageFromBackEnd)
        })

    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" })
    }





    renderCards = () =>
        this.props.chats.map((chat) => (
            <ChatCard key={chat._id} {...chat} />
        ))


    onDrop = (files) =>{
        console.log(files)
        let formdata = new FormData

        const config = {
            header : {"content-type":"multipart/form-data"}
        }

        formdata.append("file",files[0])

        Axios.post("api/chat/uploadfiles",formdata,config)
        .then(response =>{
            if(response.data.success){
                let chatMessage = response.data.url
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();
        let type = "VideoOrImage"

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });

            }
        })
    }



    handleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    submitChatMessage = (e) => {
        e.preventDefault();


        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();
        let type = "Text"

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        this.setState({ chatMessage: "" })
    }

    render() {


        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: "2rem", textAlign: "center" }}>Real Time Chat</p>
                </div>

                <div    >
                    <div className="infinite-container" style={{ height: '400px', overflowY: 'scroll' }}>
                        {this.renderCards()}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>
                </div>

                <Row>
                    <Form layout="inline" onSubmit={this.submitChatMessage} >
                        <Col span={18}>
                            <Input
                                id="message"
                                prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Let's start talking"
                                type="text"
                                value={this.state.chatMessage}
                                onChange={this.handleSearchChange}
                            />
                        </Col>

                        <Col span={2}>
                            <Dropzone onDrop={this.onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Button>
                                                <Icon type="upload" />
                                            </Button>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </Col>

                        <Col span={4}>
                            <Button type="primary" style={{ width: "100%" }} htmlType="submit">
                                <Icon type="enter" />
                            </Button>
                        </Col>
                    </Form>
                </Row>



            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat.items
    }
}


export default connect(mapStateToProps, { getChats, afterPostMessage })(ChatPage);