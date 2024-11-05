import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MyPageSideBar = () => {
  return (
    <StyledSideBar>
      <h3
        style={{
          margin: "10px",
        }}
      >
        마이페이지
      </h3>
      <br />
      <StyledH4>나의 거래</StyledH4>
      <StyledSideBarMenu>거래 내역</StyledSideBarMenu>
      <StyledSideBarMenu>게시물 관리</StyledSideBarMenu>
      <StyledSideBarMenu>장바구니</StyledSideBarMenu>
      <StyledSideBarMenu>채팅 목록</StyledSideBarMenu>
      <StyledSideBarMenu>찜 목록</StyledSideBarMenu>
      <br />
      <StyledHr />
      <br />
      <StyledH4>나의 정보</StyledH4>
      <StyledSideBarMenu>회원정보 관리</StyledSideBarMenu>
      <StyledSideBarMenu>계정 관리</StyledSideBarMenu>
      <br />
      <StyledHr />
      <br />
      <StyledH4>고객 지원</StyledH4>
      <StyledSideBarMenu>고객센터</StyledSideBarMenu>
      <StyledSideBarMenu>내 문의 내역</StyledSideBarMenu>
      <StyledSideBarMenu>공지사항</StyledSideBarMenu>
    </StyledSideBar>
  );
};

export default MyPageSideBar;

const StyledSideBar = styled.nav`
  display: flex;
  height: auto;
  width: 10%;
  margin: 0px;
  flex-direction: column;
  text-align: left;
`;

const StyledSideBarMenu = styled(Link)`
  padding: 10px;
  width: 100%;
  text-decoration: none;
  color: black;
`;

const StyledH4 = styled.h4`
  margin: 10px;
`;

const StyledHr = styled(Link)`
  border: 1px solid #ccc; /* 원하는 두께와 색상으로 설정 */
  width: 100%; /* 필요에 따라 너비 조절 */
  margin: 10px 0; /* 상하 간격 조정 */
  left: 10px;
`;
