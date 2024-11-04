// src/components/ChatArea.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faUser as regularUser } from '@fortawesome/free-regular-svg-icons';

const ChatArea = ({ selectedUser, messages, input, setInput, handleSend }) => {
  return (
    <ChatAreaContainer>
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
            </MessageContent>
            <Time outgoing={msg.direction === "outgoing"}>{msg.time}</Time>
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
    </ChatAreaContainer>
  );
};

const ChatAreaContainer = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.outgoing ? "#D2E8F6" : "white")};
  color: #000;
//   border: 1px solid #D4D4D4;
  border-radius: 15px;
  padding: 10px;
  margin: 5px 0;
  position: relative;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
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

const MessageText = styled.div`
  margin: 5px 0;
`;

const Time = styled.span`
  font-size: 0.8em;
  color: #888;
  margin-top: 5px;
  align-self: ${(props) => (props.outgoing ? "flex-start": "flex-end")};
  margin-left: ${(props) => (props.outgoing ? "0" : "10px")};
  margin-right: ${(props) => (props.outgoing ? "10px" : "0")};

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

export default ChatArea;