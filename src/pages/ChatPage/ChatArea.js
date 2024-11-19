import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSignOutAlt, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faUser as regularUser } from '@fortawesome/free-regular-svg-icons';

const ChatArea = ({ selectedUser, messages, handleSend, input, setInput, onLeave }) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleLabelClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  return (
    <ChatAreaContainer>
      <Header>
        {selectedUser ? `${selectedUser} 님과의 채팅` : "채팅을 선택하세요"}
        <LeaveButton onClick={onLeave}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </LeaveButton>
      </Header>
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
        <FileInputContainer>
          <FontAwesomeIcon 
            icon={faPaperclip} 
            color="#6AB2E1" 
            onClick={handleLabelClick}
          />
          <FileInput
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </FileInputContainer>

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
  display: flex;
  justify-content: space-between;
`;

const LeaveButton = styled.button`
  background: none; 
  border: none; 
  color: white; 
  cursor: pointer; 
  font-size: 1.1em; 
  margin-left: auto;

  &:hover {
    color: #ffcccc; // 호버 시 색상 변경
  }
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
//   border: 2px solid #D4D4D4;
  border: none;
  border-radius: 30px;
  outline: none;
  background-color: #F2F2F2;
  margin-left: 10px;
  margin-right: 10px;
;

`;

const SendButton = styled.button`
  padding: 8px;
  margin: 6px;
  background-color: #6ab2e1;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  &:hover {
    background-color: #5fa5d7;
  }
`;


const FileInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 10px;

    &:hover {

    svg {
     color: #ccc;
    }

  }
`;

const FileInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer; 
  position: absolute;

  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const ImageItem = styled.div`
  position: relative;
  margin: 5px;
`;

const ImagePreviewText = styled.div`
  font-size: 14px;
  color: #333;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default ChatArea;