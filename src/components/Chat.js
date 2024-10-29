import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faComment as regularComment, faUser as regularUser } from '@fortawesome/free-regular-svg-icons';

const Chat = () => {
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
      <UserList>
        <ListHeader>채팅 목록</ListHeader>
        
        <ChatList>
          <UserItem 
            onClick={() => handleSelectUser("갓지훈")}
            selected={selectedUser === "갓지훈"}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} />
            </IconWrapper>
            <UserInfo>
              <UserId>갓지훈</UserId>
              <LastMessage>안녕하세요~</LastMessage>
            </UserInfo>
            <MessageInfo>
              <LastTime>{lastMessageTimes["갓지훈"] || "N/A"}</LastTime>
            </MessageInfo>
          </UserItem>

          <UserItem 
            onClick={() => handleSelectUser("이상진")}
            selected={selectedUser === "이��진"}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} />
            </IconWrapper>
            <UserInfo>
              <UserId>이상진</UserId>
              <LastMessage>어제 받기로 한 물건 확실히 내일 말고...</LastMessage>
            </UserInfo>
            <MessageInfo>
              <LastTime>{lastMessageTimes["이상진"] || "N/A"}</LastTime>
            </MessageInfo>
          </UserItem>

          <UserItem 
            onClick={() => handleSelectUser("귀차나")}
            selected={selectedUser === "귀차나"}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} />
            </IconWrapper>
            <UserInfo>
              <UserId>귀차나</UserId>
              <LastMessage>뭐요</LastMessage>
            </UserInfo>
            <MessageInfo>
              <LastTime>{lastMessageTimes["귀차나"] || "N/A"}</LastTime>
            </MessageInfo>
          </UserItem>
        </ChatList>
      </UserList>

      <ChatArea>
        <Header>{selectedUser ? `${selectedUser} 님과의 채팅` : "채팅을 선택하세요"}</Header>
        <MessageList>
          {messages.map((msg) => (
            <Message key={msg.id} outgoing={msg.direction === "outgoing"}>
              {msg.direction === "incoming" && (
                <ProfileInfo>
                  <IconWrapper>
                    <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} />
                  </IconWrapper>
                  <UserName>{selectedUser}</UserName>
                </ProfileInfo>
              )}
              <MessageContent>
                <MessageText>{msg.text}</MessageText>
                <Time>{msg.time}</Time>
              </MessageContent>
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
  text-align: left;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  padding: 20px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#e0e0e0" : "transparent")};

  &:hover {
    background-color: ${(props) => (props.selected ? "#e0e0e0" : "#f0f0f0")};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const UserId = styled.div`
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 5px;
  margin-left: 5px;
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
  border-left: 1px solid #D4D4D4;
`;

const Header = styled.div`
  padding: 10px;
  background-color: #6ab2e1;
  color: white;
  font-weight: bold;
  text-align: left;
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
  align-self: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
  position: relative;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  border-radius: 15px;
  padding: 10px;
  margin: 5px 0;
  align-self: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
  position: relative;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
`;

const MessageText = styled.div`
  margin: 5px 0;
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
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #5fa5d7;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 8px;

`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 10px;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const LastTime = styled.div`
  color: #888;
  margin-right: 5px;
`;

export default Chat;
