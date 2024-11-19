import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import {  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import {
  faComment as regularComment,
  faUser as regularUser,
} from "@fortawesome/free-regular-svg-icons"; // 라인 아이콘 임포트
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getToken, removeToken } from "../api/auth.js"; // Adjust the path as necessary


const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Jalnan';
  src: url('/fonts/JalnanGothicTTF.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;

const Nav = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태 확인
    const token = getToken(); // auth.js에서 토큰 가져오기
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태 true
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddButtonClick = () => {
    navigate(`/SearchPage?q=${searchValue}`);
  };

  const logAddButtonClick = () => {
    navigate("/LoginPage");
  };

  const signAddButtonClick = () => {
    navigate("/SignupPage");
  };

  const writeButtonClick = () => {
    navigate("/WritePage");
  };

  const productClick = () => {
    navigate("/ProductPage");
  };

  const ChatButtonClick = () => {
    // 새로운 창에서 채팅 페이지 열기
    window.open("/chatpage", "_blank", "width=600,height=400,resizable=no");
  };

  // const ChatButtonClick = () => {
  //   // 새로운 창에서 채팅 페이지 열기
  //   window.open("/chatpage/chatarea", "_blank", "width=600,height=400,resizable=no");
  //   window.open("/chatpage/chatlist", "_blank", "width=600,height=400,resizable=no");
  //   // 추가: 채팅 페이지 열기 후 알림 표시
  //   alert("채팅 페이지가 새 창에서 열렸습니다.");
  // };

  const MyPageButtonClick = () => {
    navigate('/MyPage'); 
  };

  const handleLogout = () => { // 로그아웃 함수
    removeToken(); // auth.js에서 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 업데이트
    navigate("/"); // 홈으로 리디렉션
  };

  return (
    <>
      <NavWrapper>
        <>
          <GlobalStyle />
          <Logo onClick={() => (window.location.href = "/")}>
            <span>주랑</span>
            <img alt="logo" src="/images/logo.png" />
          </Logo>
        </>

        <SearchContainer>
          <SearchInput
            value={searchValue}
            onChange={handleChange} // 검색 값 변경 시 상태 업데이트
            placeholder="찾고 싶은 물품이나 동네를 검색해보세요!"
          />
          <SearchIcon onClick={handleAddButtonClick}>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </SearchContainer>

        <NavItems>
          <NavItem onClick={productClick}>중고물품</NavItem>
          <NavItem onClick={writeButtonClick}>게시글 작성</NavItem>
          <NavItem>이벤트</NavItem>
          <NavItem>커뮤니티</NavItem>
          <NavItem>고객센터</NavItem>
        </NavItems>

        <UserActions>
          {isLoggedIn ? ( // 로그인 상태에 따라 버튼 표시
            <>
              <UserAction onClick={handleLogout}>로그아웃</UserAction>
              <UserAction onClick={MyPageButtonClick}>마이페이지</UserAction>

            </>
          ) : (
            <>
              <UserAction onClick={logAddButtonClick}>로그인</UserAction>
              <UserAction onClick={signAddButtonClick}>회원가입</UserAction>
              <UserAction onClick={logAddButtonClick}>마이페이지</UserAction>
            </>
          )}
        </UserActions>

        <UserIcons>
          <UserIcon className="comment">
            <FontAwesomeIcon onClick={ChatButtonClick} icon={regularComment} style={{ fontSize: '28px', lineHeight: '1.2' }} />
            <span>채팅</span>
          </UserIcon>
          <UserIcon className="shop">
            <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '28px', lineHeight: '1.2' }} />
            <span>장바구니</span>
          </UserIcon>
          <UserIcon className="user">
            <FontAwesomeIcon onClick={MyPageButtonClick} icon={regularUser} style={{ fontSize: '28px', lineHeight: '1.2' }} />
            <span>마이페이지</span>
          </UserIcon>
        </UserIcons>
      </NavWrapper>
    </>
  );
};

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // height: calc(20vh);
  height: 180px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  border-bottom: solid 1px #d4d4d4;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10%;

  img {
    width: 40px;
    height: auto;
    margin-right: 10px;
    margin-top: -10px;
    margin-left: 5px;
  }

  span {
    font-size: 32px;
    color: #6AB2E1; 
    // font-weight: bold;
    font-family: "Jalnan";
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  width: 30%;
  position: relative;
  transform: translateX(-80%);
  padding: 12px 40px;
  border: 2px solid #6ab2e1;
  border-radius: 30px;
  outline: none;
  font-size: 16px;

  &::placeholder {
    /*& -> 현재 적용되는 부분 언급 */
    color: #aaa;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 47%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  pointer-events: true;
  cursor: pointer;
  color: #6ab2e1;
`;

const NavItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  top: 130px;
  border-top: solid 1px #d4d4d4;
  width: 100vw;
  padding: 12px 0px;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.div`
  margin: 0 100px;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    color: #6ab2e1;
  }

  @media (max-width: 1200px) {
    font-size: 16px;
    margin: 0 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 0 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin: 0 5px;
  }
`;

const UserActions = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  display: flex;
  align-items: center;
`;

const UserAction = styled.div`
  margin: 0 10px;
  font-size: 16px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #6ab2e1;
    font-weight: bold;
  }
`;

const UserIcons = styled.div`
  position: absolute;
  top: 35%;
  right: 6%;
  display: flex;
  align-items: center;
`;
const UserIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
   margin: 0 17px;
  cursor: pointer;

  span {
    font-size: 15px; 
    color: #333;
    margin-top: 8px; 
  }

  &:hover {
    color: #6AB2E1;
  }
`;

export default Nav;



