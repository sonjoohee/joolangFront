import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as regularUser } from '@fortawesome/free-regular-svg-icons';

const ChatList = ({ chatRooms, selectedUser, handleSelectUser, lastMessageTimes }) => {
  return (
    <UserList>
      <ListHeader>채팅 목록</ListHeader>
      <ChatListContainer>
        {chatRooms.map((room) => (
          <UserItem
            key={room.id} // room.id를 사용하여 고유 식별자 설정
            onClick={() => handleSelectUser(room.id)} // 채팅방 ID를 전달
            selected={selectedUser === room.id}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} />
            </IconWrapper>
            <UserInfo>
              <UserId>{room.name}</UserId> {/* room.name은 사용자 이름으로 가정 */}
              <LastMessage>마지막 메시지</LastMessage>
            </UserInfo>
            <MessageInfo>
              <LastTime>{lastMessageTimes[room.id] || "N/A"}</LastTime>
            </MessageInfo>
          </UserItem>
        ))}
      </ChatListContainer>
    </UserList>
  );
};


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

const ChatListContainer = styled.div`
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

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const LastTime = styled.div`
  color: #888;
  margin-right: 5px;
`;

export default ChatList;