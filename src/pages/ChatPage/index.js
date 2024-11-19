import React, { useEffect, useState } from "react";
import io from "socket.io-client"; // 소켓 라이브러리
import ChatList from "./ChatList";
import ChatArea from "./ChatArea";
import axios from "axios";
import styled from "styled-components";

const socket = io("http://localhost:8080"); // 소켓 서버 URL

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessageTimes, setLastMessageTimes] = useState({});
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetchChatRooms(); // 컴포넌트가 마운트될 때 채팅방 리스트를 가져옴

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setLastMessageTimes((prevTimes) => ({
        ...prevTimes,
        [message.user]: message.time,
      }));
    });

    return () => {
      socket.off("receiveMessage"); // 컴포넌트 언마운트 시 리스너 해제
    };
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/chat/main", {
        headers: {
          'Accept': '*/*',
        },
      });

      if (response.status === 200) {
        setChatRooms(response.data.data);
      } else {
        console.error("채팅방 불러오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    const chatRoomId = getChatRoomId(user);
    fetchMessagesForUser(chatRoomId);
  };

  const getChatRoomId = (user) => {
    const chatRoomIds = {
      '갓지훈': 1,
      '이상진': 2,
      '귀차나': 3,
    };
    return chatRoomIds[user] || 0; // 기본값 0
  };

  const fetchMessagesForUser = async (chatRoomId) => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/room/${chatRoomId}`, {
        headers: {
          'Accept': '*/*',
        },
      });

      if (response.status === 200) {
        setMessages(response.data.data);
      } else {
        console.error("메시지 불러오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        direction: "outgoing",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: selectedUser,
      };

      try {
        const response = await axios.post(`http://localhost:8080/chat/room/${selectedUser}/send`, newMessage);

        if (response.status === 200) {
          socket.emit("sendMessage", newMessage); // 소켓을 통해 메시지 전송
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setInput("");
          setLastMessageTimes((prevTimes) => ({
            ...prevTimes,
            [selectedUser]: newMessage.time,
          }));
        }
      } catch (error) {
        console.error("메시지 전송 오류:", error);
      }
    }
  };

  const handleLeave = () => {
    console.log("Leaving chat...");
  };

  return (
    <Container>
      <ChatList 
        chatRooms={chatRooms} 
        selectedUser={selectedUser} 
        handleSelectUser={handleSelectUser} 
        lastMessageTimes={lastMessageTimes}
      />
      <ChatArea 
        messages={messages} 
        input={input} 
        setInput={setInput} 
        handleSend={handleSend} 
        selectedUser={selectedUser} 
        onLeave={handleLeave}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center; //수평중앙정렬
  // align-items: center;
  height: 100vh;
  // width: 80%;
  // padding-top: calc(3.5vw + 100px);
  // margin-left: auto;
  // margin-right: auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

// // 버튼 스타일 추가 (필요시)
// const Button = styled.button`
//   margin-bottom: 20px; // 버튼과 다른 요소 간의 간격
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;
// `;

export default ChatPage;

