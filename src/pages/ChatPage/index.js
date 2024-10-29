import React from 'react'
import styled from "styled-components";
import Nav from "../../components/Nav";
import Chat from "../../components/Chat";

const ChatPage = () => {
  return (
   <Container>
      <Nav/>
      <Chat/>
    </Container>

    
  )
}

export default ChatPage;




const Container = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

