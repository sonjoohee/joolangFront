import React, { useState } from "react";
import ChatList from "../../components/ChatList";
import ChatArea from "../../components/ChatArea";
import Nav from "../../components/Nav";
import styled from "styled-components";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessageTimes, setLastMessageTimes] = useState({});

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length,
        text: input,
        direction: "outgoing",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([...messages, newMessage]);
      setInput("");

      setLastMessageTimes((prevTimes) => ({
        ...prevTimes,
        [selectedUser]: newMessage.time,
      }));

      const incomingMessage = {
        id: messages.length + 1,
        text: "상대방의 메시지입니다.",
        direction: "incoming",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: selectedUser,
      };

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
        setLastMessageTimes((prevTimes) => ({
          ...prevTimes,
          [selectedUser]: incomingMessage.time,
        }));
      }, 1000);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <Container>
         <Nav/>
      <ChatList
        selectedUser={selectedUser}
        handleSelectUser={handleSelectUser}
        lastMessageTimes={lastMessageTimes}
      />
      <ChatArea
        selectedUser={selectedUser}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center; //수평중앙정렬
  // align-items: center;
  height: 80vh;
  width: 80%;
  padding-top: calc(3.5vw + 100px);
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export default ChatPage;

