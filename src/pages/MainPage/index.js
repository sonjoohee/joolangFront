import React from 'react'
import Nav from "../../components/Nav"; /* .. : 두 개의 ..는 두 단계 위의 디렉토리를 나타냄 */
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
  display: block;
  background-attachment: fixed; 



  &:after {
    background: url("/images/BG.png") center center / contain no-repeat fixed;
    content: "";
    position: absolute;
    min-height: 100vh;
    inset: 0; 
    opacity: 1;
    transform: translatey(-55vh);
    

  
    z-index: -1;
  }
`;



const Rows = styled.div`
  margin-top: 900px; 
`;


