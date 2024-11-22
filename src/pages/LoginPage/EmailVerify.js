import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EmailVerify = () => {
  const location = useLocation();
  const { userId } = location.state || {}; // FindPass에서 전달된 userId
  const [email, setEmail] = useState('');
  const [com, setEmailcom] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    const Data = JSON.stringify({
      email: `${email}@${com}`, // 이메일 형식으로 결합
      type: 'password', // 요청 타입
      userId // userId 추가
    });

    try {
      const response = await axios.post('http://localhost:8080/sendCodeProc', Data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('이메일 인증 요청이 성공적으로 전송되었습니다.');
      }
    } catch (error) {
      console.error('이메일 인증 실패:', error?.response?.data || error.message);
      alert('이메일 인증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    const verifyData = {
      email: `${email}@${com}`,
      code: verificationCode,
      type: 'password' // 요청 타입
    };

    try {
      const response = await axios.post('http://localhost:8080/verifyCodeProc', verifyData, { // 인증 코드 확인 요청
        headers: {
          'Content-Type': 'application/json' // Content-Type 추가
        }
      });

      if (response.status === 200) {
        alert('인증 코드가 확인되었습니다.');
        navigate('/rewrite-password', { state: { userId } }); // 비밀번호 재설정 페이지로 리디렉션하며 userId 전달
      }
    } catch (error) {
      console.error('인증 코드 확인 실패:', error?.response?.data || error.message);
      alert('인증 코드 확인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleBack = () => {
    window.history.back(); // 브라우저의 이전 페이지로 이동
  };

  return (
    <Container>
      <Title>비밀번호 찾기 / 이메일 인증</Title>

      <Form>
        <Label>이메일 주소</Label>
        <InputContainerRow>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
            required
          />
          <span>@</span>
          <Input
            type="text"
            value={com}
            onChange={(e) => setEmailcom(e.target.value)}
            placeholder="ex) naver.com"
            required
          />
          <Button onClick={handleVerifyEmail}>인증</Button>
        </InputContainerRow>

        <Label>인증 코드</Label>
        <InputContainer>
          <Input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증 코드 입력"
            required
          />
        </InputContainer>

        <ButtonContainer>
          <Button bottom onClick={handleVerifyCode}>완료</Button>
          <Button bottom onClick={handleBack}>뒤로가기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default EmailVerify;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; 
  max-width: 400px;
  justify-content: center;
  margin-top: 20px;
`;

const Label = styled.div`
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 408px;
`;

const Input = styled.input`
  padding: 14px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 14px;
  background-color: #6AB2E1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  min-width: 80px;

  ${({ bottom }) => bottom && `
    min-width: 200px;
  `}

  &:hover {
    background-color: #0056b3;
  }
`;

const InputContainerRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    margin-right: 8px;
  }

  Input {
    flex: 1; // 입력 필드가 가능한 공간을 채우도록 설정
    margin-right: 8px; // 입력 필드와 버튼 사이의 간격
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px; // 버튼 위쪽 여백
`;