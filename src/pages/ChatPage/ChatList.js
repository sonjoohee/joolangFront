// src/components/ChatList.js
import {React,useState,useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as regularUser } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const ChatList = ({ selectedUser, handleSelectUser, lastMessageTimes }) => {
  const [chatRooms, setChatRooms] = useState([]);

  // 1. 채팅 목록을 가져오는 API 호출
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/chat/main', {
          headers: {
            'Accept': '*/*',
          },
        });

        if (response.status === 200) {
          setChatRooms(response.data.data); // API 응답에서 채팅방 리스트 설정
        } else {
          console.error('채팅방 불러오기 실패:', response.data.message);
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchChatRooms();
  }, []);

  // 2. 사용자가 채팅방을 선택할 때 호출되는 함수
  const handleUserSelect = async (roomId) => {
    try {
      const response = await axios.post(`http://localhost:8080/post/chat/${roomId}`, {}, {
        headers: {
          'Accept': '*/*',
        },
      });

      if (response.status === 200) {
        console.log('채팅방 들어가기 성공:', response.data.message);
        handleSelectUser(roomId); // 선택된 사용자를 업데이트
      } else {
        console.error('채팅방 들어가기 실패:', response.data.message);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };

  return (
    <UserList>
      <ListHeader>채팅 목록</ListHeader>
      <ChatListContainer>
        {chatRooms.map((room) => (
          <UserItem
            key={room.id} // room.id를 사용하여 고유 식별자 설정
            onClick={() => handleUserSelect(room.id)} // 채팅방 ID를 전달
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


//   return (
//     <UserList>
//       <ListHeader>채팅 목록</ListHeader>
//       <ChatListContainer>
//         {['갓지훈', '이상진', '귀차나'].map((user) => (
//           <UserItem
//             key={user}
//             onClick={() => handleSelectUser(user)}
//             selected={selectedUser === user}
//           >
//             <IconWrapper>
//               <FontAwesomeIcon icon={regularUser} style={{ fontSize: '20px', lineHeight: '1.2'}} />
//             </IconWrapper>
//             <UserInfo>
//               <UserId>{user}</UserId>
//               <LastMessage>마지막 메시지</LastMessage>
//             </UserInfo>
//             <MessageInfo>
//               <LastTime>{lastMessageTimes[user] || "N/A"}</LastTime>
//             </MessageInfo>
//           </UserItem>
//         ))}
//       </ChatListContainer>
//     </UserList>
//   );
// };

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