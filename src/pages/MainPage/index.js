import React from 'react'
import styled from "styled-components";
import Row from '../../components/Row';
import Advertise from '../../components/Advertise';



const MainPage = () => {
  return (
 
    
    <Container> 

      <Rows>
        <Row title="Hot한 중고물품 득템하기!"  index={0}/>
        <Row title="내가 찾고 있는 물건" index={1}/>
      </Rows>
      <Advertise/>
       
      </Container>
   
  );
}

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed; 
  margin-top: 55%;



  &:after {
    background: url("/images/BG.png") center center / contain no-repeat fixed;
    content: "";
    position: absolute;
    min-height: 100%;
    inset: 0; 
    opacity: 1;
    transform: translateY(-1100px);
    margin-top: 100px;
    

  
    z-index: -1;
  }
`;



const Rows = styled.div`
  width: 100%;
`;


