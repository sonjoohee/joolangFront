import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faComment as regularComment, faUser as regularUser } from '@fortawesome/free-regular-svg-icons'; // 라인 아이콘 임포트

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length,
        text: input,
        direction: "outgoing", // 자신의 메시지
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([...messages, newMessage]);
      setInput(""); // 입력 필드 초기화

      // 상대방 메시지 시뮬레이션
      const incomingMessage = {
        id: messages.length + 1,
        text: "상대방의 메시지입니다.", // 여기서 상대방 메시지를 설정
        direction: "incoming", // 상대방의 메시지
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // 1초 후에 상대방 메시지 추가
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      }, 1000);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // 여기서 사용자의 메시지를 불러오는 로직 추가 가능
  };

  return (
    <Container>
      <UserList>
        <ListHeader> 채팅 목록 </ListHeader>
        <UserItem onClick={() => handleSelectUser("갓지훈")}>
        <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} /> 갓지훈 <LastMessage>안녕하세요~</LastMessage>
        </UserItem>
        <UserItem onClick={() => handleSelectUser("이상진")}>
        <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} /> 이상진 <LastMessage>어제 받기로 한 물건 확실히 내일 말고...</LastMessage>
        </UserItem>
        <UserItem onClick={() => handleSelectUser("귀차나")}>
        <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} /> 귀차나 <LastMessage>뭐요</LastMessage>
        </UserItem>
      </UserList>

      <ChatArea>
        <Header>{selectedUser ? `${selectedUser} 님과의 채팅` : "채팅을 선택하세요"}</Header>
        <MessageList>
          {messages.map((msg) => (
            <Message key={msg.id} outgoing={msg.direction === "outgoing"}>
              {msg.text}
              <Time>{msg.time}</Time>
            </Message>
          ))}
        </MessageList>
        <InputContainer>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <SendButton onClick={handleSend}>
            <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '5px' }} />
          </SendButton>
        </InputContainer>
      </ChatArea>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  height: 80vh;
  width: 80%;
  padding-top: calc(3.5vw + 100px);
  margin-top: 30px;
  
`;



const UserList = styled.div`
  width: 50%;
  border: 1px solid #ccc;
  background-color: white;
`;

const ListHeader = styled.div`
  padding: 10px;
  background-color: #6ab2e1;
  color: white;
  font-weight: bold;
  text-align:left;
`;

const UserItem = styled.div`
  text-align: left;
  padding: 20px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const LastMessage = styled.span`
  color: #888;
  font-size: 0.9em;
  margin-left: 5px;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.div`
  padding: 10px;
  background-color: #6ab2e1;
  color: white;
  font-weight: bold;
  text-align:left;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: white;
`;

const Message = styled.div`
  background-color: ${(props) => (props.outgoing ? "#D2E8F6" : "white")};
  color: #000;
  border: 1px solid #D4D4D4;
  border-radius: 15px;
  padding: 10px;
  margin: 5px 0;
  align-self: ${(props) => (props.outgoing ? "flex-end" : "flex-start")}; /* 아웃고잉 메시지는 오른쪽, 인커밍 메시지는 왼쪽 */
  position: relative;
`;

const Time = styled.span`
  font-size: 0.8em;
  color: #888;
  position: absolute;
  bottom: -20px;
  right: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 0;
  outline: none;
`;

const SendButton = styled.button`
  padding: 10px;
  background-color: #6ab2e1;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%; /* 원형 버튼 */
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #5fa5d7;
  }
`;

export default Chat;