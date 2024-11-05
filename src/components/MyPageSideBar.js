import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MyPageSideBar = () => {
  return (
    <StyledSideBarMenu>
      <StyledTitle>마이페이지</StyledTitle>
      <br />
      <h4>나의 거래</h4>
      <Link>거래 내역</Link>
      <Link>게시물 관리</Link>
      <Link>장바구니</Link>
      <Link>채팅 목록</Link>
      <Link>찜 목록</Link>
      <br />
      <StyledHr />
      <br />
      <h4>나의 정보</h4>
      <Link>회원정보 관리</Link>
      <Link>계정 관리</Link>
      <br />
      <StyledHr />
      <br />
      <h4>고객 지원</h4>
      <Link>고객센터</Link>
      <Link>내 문의 내역</Link>
      <Link>공지사항</Link>
    </StyledSideBarMenu>
  );
};

const StyledSideBarMenu = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;  /* 패딩 추가 */
  margin-top: 10px;
  width: 300px;
  

  /* Link 컴포넌트에 직접 스타일 적용 */
  a {
    padding: 10px;
    text-decoration: none;
    color: black;
  }

  /* h1, h4 태그에 스타일 추가 */
  h1, h4 {
    margin-left: 10px ;
  }
`;

const StyledHr = styled.hr`
  border: 1px solid #ccc; /* 원하는 두께와 색상으로 설정 */
  width: 100%; /* 필요에 따라 너비 조절 */
  margin: 10px 0; /* 상하 간격 조정 */
  left: 10px;
`;

const StyledTitle = styled.h1`
  color: black;
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
  z-index: 10;
`;

export default MyPageSideBar;