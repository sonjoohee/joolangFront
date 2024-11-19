import React, { useEffect, useState } from "react";
import io from "socket.io-client"; // 소켓 라이브러리
import ChatList from "../../components/ChatList";
import ChatArea from "../../components/ChatArea";
import styled from "styled-components";
import axios from "axios";

const socket = io("http://localhost:8080"); // 소켓 서버 URL

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessageTimes, setLastMessageTimes] = useState({});
  const [chatRooms, setChatRooms] = useState([]); // 채팅방 리스트 상태 추가

  useEffect(() => {
    // 소켓 연결 상태 확인
    socket.on("connect", () => {
      console.log("소켓 서버에 연결되었습니다!");
    });

    socket.on("disconnect", () => {
      console.log("소켓 서버와 연결이 끊어졌습니다.");
    });

    // 소켓 이벤트 리스너 설정
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setLastMessageTimes((prevTimes) => ({
        ...prevTimes,
        [message.user]: message.time,
      }));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveMessage"); // 컴포넌트 언마운트 시 리스너 해제
    };
  }, []);


  

  // 채팅 목록을 가져오는 함수
  const fetchChatRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/chat/main", {
        headers: {
          'Accept': '*/*',
        },
      });

      if (response.status === 200) {
        setChatRooms(response.data.data);
        console.log("채팅방 리스트:", response.data.data);
      } else {
        console.error("채팅방 불러오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  useEffect(() => {
    fetchChatRooms(); // 컴포넌트가 마운트될 때 채팅방 리스트를 가져옴

    // 소켓 이벤트 리스너 설정
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

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    const chatRoomId = getChatRoomId(user);
    fetchMessagesForUser(chatRoomId); // 선택된 사용자의 이전 메시지를 불러오는 함수 호출
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
        setMessages(response.data.data); // 이전 채팅 메시지를 상태에 설정
      } else {
        console.error("메시지 불러오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        direction: "outgoing",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: selectedUser,
      };

      // 소켓을 통해 메시지 전송
      socket.emit("sendMessage", newMessage);

      // 메시지 상태 업데이트
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      setLastMessageTimes((prevTimes) => ({
        ...prevTimes,
        [selectedUser]: newMessage.time,
      }));
    }
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

// 버튼 스타일 추가 (필요시)
const Button = styled.button`
  margin-bottom: 20px; // 버튼과 다른 요소 간의 간격
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export default ChatPage;

