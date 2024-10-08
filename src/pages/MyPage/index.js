import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "../../components/Nav";
import MyPageSideBar from "../../components/MyPageSideBar";

const MyPage = () => {
  return (
    <Container>
      <Nav />
      <ContentContainer>
        <SideBarContainer>
          <MyPageSideBar />
        </SideBarContainer>
      </ContentContainer>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-shrink: 0;
  height: 100%;
`;
