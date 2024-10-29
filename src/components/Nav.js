import {React, useState} from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import {useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { faComment as regularComment, faUser as regularUser } from '@fortawesome/free-regular-svg-icons'; // 라인 아이콘 임포트
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';






const Nav = () => {

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  

  const handleAddButtonClick = () => {
    navigate(`/SearchPage?q=${searchValue}`); 
  };


  const logAddButtonClick = () => {
    navigate('/LoginPage');
  };

  const signAddButtonClick = () => {
    navigate('/SignupPage'); 
  };

  const writeButtonClick = () => {
    navigate('/WritePage'); 
  };

  const productClick = () => {
    navigate('/ProductPage'); 
  };


  const ChatButtonClick = () => {
    navigate('/ChatPage'); 
  };

  const myPageClick = () => {
    navigate('/MyPage'); 
  };

  const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Jalnan';
    src: url('/fonts/JalnanGothicTTF.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }


`;






  return (
  
    <>
    <NavWrapper>
    <>
    <GlobalStyle />
      <Logo onClick={() => (window.location.href = "/")}>
        <span>주랑</span>
        <img alt="logo" src='/images/logo.svg' />
      </Logo>
      </>

      <SearchContainer>
        <SearchInput  
        value={searchValue} 
        onChange={handleChange} // 검색 값 변경 시 상태 업데이트
        placeholder="찾고 싶은 물품이나 동네를 검색해보세요!" />
        <SearchIcon onClick={handleAddButtonClick}><FontAwesomeIcon icon={faSearch} /></SearchIcon>
      </SearchContainer>



      
      <NavItems>
        <NavItem onClick={productClick}>중고물품</NavItem>
        <NavItem onClick={writeButtonClick}>게시글 작성</NavItem>
        <NavItem>이벤트</NavItem>
        <NavItem>커뮤니티</NavItem>
        <NavItem>고객센터</NavItem>
      </NavItems>

      <UserActions>
        <UserAction onClick={logAddButtonClick}>로그인</UserAction>
        <UserAction onClick={signAddButtonClick}>회원가입</UserAction>
        <UserAction>고객센터</UserAction>
      </UserActions>


      <UserIcons>
        <UserIcon className="comment">
          <FontAwesomeIcon  onClick={ChatButtonClick} icon={regularComment} style={{ fontSize: '28px', lineHeight: '1.2' }} />
          <span>채팅</span>
        </UserIcon>
        <UserIcon className="shop">
          <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '28px', lineHeight: '1.2' }} />
          <span>장바구니</span>
        </UserIcon>
        <UserIcon className="user">
          <FontAwesomeIcon onClick={myPageClick} icon={regularUser} style={{ fontSize: '28px', lineHeight: '1.2' }} />
          <span>마이페이지</span>
        </UserIcon>
      </UserIcons>
     
    </NavWrapper>

  

    
    
    </>
  
  );
}





const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(20vh);
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  border-bottom: solid 1px #D4D4D4;
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
  }

  span {
    font-size: 32px;
    color: #6AB2E1; /* 로고 색상 */
    // font-weight: bold;
    font-family: 'Jalnan';
    
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
  border: 2px solid #6AB2E1;
  border-radius: 30px;
  outline: none;
  font-size: 16px;
  

  &::placeholder {   /*& -> 현재 적용되는 부분 언급 */
    color: #aaa;
    
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left:47%; 
  top: 50%; 
  transform: translateY(-50%);  
  font-size: 20px;
  pointer-events: true; 
  cursor: pointer;
  color:  #6AB2E1;
`;




const NavItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  top: 75%;
  border-top: solid 1px #D4D4D4;
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
    color:#6AB2E1;
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
    color:#6AB2E1;
    font-weight: bold;
  }
`;


const UserIcons = styled.div`
  position: absolute;
  top: 35%;
  right:6%;
  display: flex; 
  align-items: center;

  
  


`
;


const UserIcon = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 가운데 정렬 */
   margin: 0 17px;
  cursor: pointer;

  span {
    font-size: 15px; /* 텍스트 크기 조정 */
    color: #333; /* 텍스트 색상 */
    margin-top: 8px; /* 아이콘과 텍스트 간격 */
  }

  &:hover {
    color: #6AB2E1; /* 호버 시 색상 변경 */
  }
`;


export default Nav;


// // Styled component for FontAwesomeIcon
// const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
//   font-size: 24px; /* 아이콘 크기 */
//   line-height: 1.2; /* 줄 높이 */
// `;
