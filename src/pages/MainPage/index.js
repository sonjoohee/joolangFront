import React from 'react'
import Nav from "../../components/Nav"; /* .. : 두 개의 ..는 두 단계 위의 디렉토리를 나타냄 */
import styled from "styled-components";
import Row from '../../components/Row';
import Advertise from '../../components/Advertise';



const MainPage = () => {
  return (
 
    
    <Container>
      <Nav />

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
  padding: calc(3.5vw + 5px); /*현재 창 넓이의 3.5 = 3.5px*/
  background-attachment: fixed; /* 배경 고정 */



  &:after {
    background: url("/images/BG.png") center center / contain no-repeat fixed; /* 배경 이미지 설정 */
    content: "";
    position: absolute;
    min-height: 100vh;
    inset: 0; /* 모든 방향에 대해 0으로 설정하여 전체를 채우도록 함 */
    opacity: 1;
    transform: translatey(-55vh);
    

  
    z-index: -1; /* 배경을 다른 요소들 아래에 위치시킴 */
  }
`;



const Rows = styled.div`
  margin-top: 900px; /* 네비게이션 바와의 간격 조정 */
`;
