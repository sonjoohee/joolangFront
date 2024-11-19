import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../../components/Nav";
import FindID from './FindID';

const FindPass = () => {
  const [userId, setUserId] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [verificationCode, setVerificationCode] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
        userId: userId, 
        email: email,  
        type: 'password' 
    };

    try {
        const response = await axios.post('http://localhost:8080/certifyUserProc', userData);

        if (response.status === 200) {
            // 가입된 회원인 경우 이메일 인증 페이지로 이동
            navigate('/email-verify', { state: { userId } });
        }
    } catch (error) {
        let errorMessage;

        if (error.response) {
            // 서버가 응답했지만, 상태 코드가 2xx가 아닌 경우
            if (error.response.status === 400) {
                // 사용자 인증 실패: 'userId' 또는 'email'이 없는 경우
                errorMessage = '가입된 회원이 아닙니다. userId 또는 email을 확인하세요.';
            } else if (error.response.status >= 400 && error.response.status < 500) {
                errorMessage = '클라이언트 오류: ' + (error.response.data?.message || '잘못된 요청입니다.');
            } else if (error.response.status >= 500) {
                errorMessage = '서버 오류: ' + (error.response.data?.message || '서버에서 문제가 발생했습니다.');
            }
        } else if (error.request) {
            // 요청이 이루어졌으나, 응답이 없는 경우
            errorMessage = '네트워크 오류: 서버에 연결할 수 없습니다.';
        } else {
            // 요청을 설정하는 중에 발생한 오류
            errorMessage = '오류: ' + error.message;
        }

        console.error('Error:', errorMessage);
        alert(errorMessage);
    }
};

  const handleAddButtonClick = () => {
    navigate('/SignupPage'); 
  };

  return (
    <Container>
      <Nav />
      <Title>비밀번호찾기</Title>

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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
          />
        </InputContainer>


        <Button type="submit">찾기</Button>

        {verificationCode && <p>인증 코드: {verificationCode}</p>}

        <LinkContainer>
          {/* <Link onClick={() => navigate('/find-id')}>아이디 찾기</Link> */}
          {/* <Link onClick={() => navigate('/email-verify')}>아이디 찾기</Link> */}
          <Link onClick={() => navigate('/rewrite-password')}>아이디 찾기</Link>
          <Divider>|</Divider>
          <Link onClick={handleAddButtonClick}>회원가입</Link>
        </LinkContainer>
      </Form>

    
    </Container>
  );
};

export default FindPass;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  margin-top:100px;

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

