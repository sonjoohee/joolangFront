import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as regularUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ChatList = ({ chatRooms, selectedUser, handleSelectUser, lastMessageTimes }) => {
  const handleAdd = async () => {
    try {
      // 새로운 채팅방을 생성하는 API 호출
      const response = await axios.post(`http://localhost:8080/post/chat`, {
        // 필요한 데이터가 있을 경우 추가
      });

      if (response.status === 200) {
        console.log(response.data.message);
        // 생성된 채팅방을 선택하도록 설정할 수 있습니다.
        handleSelectUser(response.data.data.id); // 방에 들어가기
      } else {
        console.error("채팅방 생성 실패:", response.data.message);
      }
    } catch (error) {
      console.error("채팅방 생성 오류:", error);
    }
  };

  return (
    <UserList>
      <ListHeader>
        채팅 목록
        <AddButton onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </ListHeader>
      <ChatListContainer>
        {chatRooms.map((room) => (
          <UserItem
            key={room.id}
            onClick={() => handleSelectUser(room.name)} // 채팅방 이름으로 선택
            selected={selectedUser === room.name}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={regularUser} style={{ fontSize: "20px", lineHeight: "1.2" }} />
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
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.button`
  background-color: #6ab2e1; // 배경색
  border: none;
  border-radius: 5px; // 둥근 모서리
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #5fa5d7; // 호버 시 배경색 변경
  }
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