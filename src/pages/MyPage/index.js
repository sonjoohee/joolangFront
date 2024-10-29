import React from "react";
import styled from "styled-components";
import Nav from "../../components/Nav";
import MyPageSideBar from "../../components/MyPageSideBar";

const MyPage = () => {
  return (
    <>
      <Nav />
      <Container>
        <MyPageSideBar />
        <PageContainer>
          <PersonalInformation>
            <div style={{ marginLeft: "25px", marginTop: "25px" }}>
              <h1 style={{ marginTop: "0px" }}>asdasad</h1>
              <div>포근지수</div>
            </div>
          </PersonalInformation>
        </PageContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start; /* 요소들을 상단에 정렬 */
  height: 100vh; /* 화면 높이를 채우도록 설정 */
  padding: 20px;
  margin-top: 0;
  padding: calc(3.5vw + 100px); 
`;

const PageContainer = styled.div`
  min-height: 100vh;
  flex: 1;
  margin-left: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 요소들을 상단에 정렬 */
`;

const PersonalInformation = styled.div`
  background-color: #d2e8f6;
  text-align: left;
  padding: 20px; /* Add padding for spacing */
  border-radius: 8px; /* Rounded corners */
`;

export default MyPage;