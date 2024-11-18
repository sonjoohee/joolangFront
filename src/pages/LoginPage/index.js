import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../api/auth'; // API 함수 임포트
import axios from 'axios';
import Nav from "../../components/Nav";
import FindID from './FindID';
import FindPass from './FindPass';
import { socialLogin, getAccessToken, saveToken } from '../../api/auth';


const LoginPage = () => {
  const [userId, setUserId] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(userId, password); // API 호출

      if (response.token) {
        console.log('로그인 성공:', response);
        // JWT 토큰을 로컬 스토리지에 저장하여 사용자의 인증 상태를 유지
        localStorage.setItem('jwtToken', response.token); 
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('로그인 실패:', error.response.data);
        alert('로그인에 실패하였습니다. 아이디와 비밀번호를 확인하세요.');
      } else {
        console.error('로그인 실패: 서버에 연결할 수 없습니다.');
        alert('로그인에 실패하였습니다. 서버에 연결할 수 없습니다.');
      }
      
      // 사용자는 기본적으로 로그인 페이지에 남아 있습니다.
      console.log('로그인 실패 후 사용자는 로그인 페이지에 머무릅니다.');
    }
  };


  const handleAddButtonClick = () => {
    navigate('/SignupPage'); 
  };


  const handleNaverLogin = async () => {
    // 네이버 소셜 로그인으로 리디렉션
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };
  // 페이지 로드 시 로그인 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      const handleSocialLogin = async () => {
        try {
          const socialResponse = await socialLogin('naver', code);
          if (socialResponse.token) {
            localStorage.setItem('jwtToken', socialResponse.token);
            // 비밀번호 설정 페이지로 리디렉션
            window.location.href = '/set-password';
          }
        } catch (error) {
          console.error('소셜 로그인 처리 중 오류 발생:', error);
        }
      };

      handleSocialLogin();
    }
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <Container>
      <Nav />
      <Title>회원 로그인</Title>

      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
            required
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
        </InputContainer>

        <Button type="submit">로그인</Button>

        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <CheckboxLabel>아이디 저장</CheckboxLabel>
        </CheckboxContainer>

        <LinkContainer>
          <Link onClick={() => navigate('/find-id')}>아이디 찾기</Link>
          <Divider>|</Divider>
          <Link onClick={() => navigate('/find-pass')}>비밀번호 찾기</Link>
          <Divider>|</Divider>
          <Link onClick={handleAddButtonClick}>회원가입</Link>
        </LinkContainer>
      </Form>

      <SocialLoginSection>
        <SocialLogin>
          <DividerLine />
          <SocialLoginTitle>소셜 로그인</SocialLoginTitle>
          <DividerLine />
        </SocialLogin>
        <SocialButton onClick={handleNaverLogin}>
          <Icon src="/images/네이버 로고 아이콘.png" alt="네이버 아이콘" />
          네이버 아이디로 로그인하기
        </SocialButton>
      </SocialLoginSection>
    </Container>
  );
};

export default LoginPage;


const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // height: 100%;
  // margin-top:20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  margin-top:200px;

`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  margin-top: 30px;
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top:20px;
  width: 100%;
  max-width: 400px; 
  transform: translatex(-20px);

`;


const InputContainer = styled.div`




`;

const Input = styled.input`
  padding: 14px;
  width: 280px;
  border: 1px solid #ccc;
  border-radius: 1px;
  margin-bottom: 8px;
  font-size:14px;
  transform: translatex(-45px);
 
`;



const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  transform: translatey(-100px);
  



`;

const Checkbox = styled.input`
  margin-right: 5px;
  
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
`;

const Button = styled.button`
  padding: 12px;
  width: 130px;
  height: 100px;
  background-color:  #6AB2E1;
  color: white;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size:20px;
  font-weight:bold;
  transform: translate(315px,-108px);;


  &:hover {
    background-color: #0056b3;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content:center;
  width: 400px;
  font-size: 14px;
  margin-bottom: 20px;
  background-color: #f2f2f2; 
  border-radius: 1px;
  padding: 30px;
  transform: translatey(-75px);

`;

const Link = styled.span`
  cursor: pointer;
  padding: 0 10px; 

  &:hover {
    color: grey;
  }
`;

const Divider = styled.span`
  margin: 0 5px;
  color: #ccc; 
`;


const SocialLoginSection = styled.div`
  text-align: center;
  margin-top: 20px; 
  width: 100%; 
  max-width: 400px;
`;


const SocialLogin = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DividerLine = styled.hr`
    border: 0;
    height: 1px;
    background: #ccc;
    flex: 1; 
    margin: 0 10px; 

`;

const SocialLoginTitle = styled.h2`
  font-size: 20px;
  margin: 10px 0;
`;





const SocialButton = styled.button`
  padding: 10px;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  background-color: white;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  vertical-align: middle;

`;