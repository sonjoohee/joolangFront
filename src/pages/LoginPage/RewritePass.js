import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const RewritePass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState(''); // 세션에서 가져온 사용자 ID
  const navigate = useNavigate();
  const location = useLocation();
  const { title, isSocialUser } = location.state || {}; // isSocialUser를 추가하여 소셜 사용자 여부 확인

  // 세션에서 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/getUserId'); // 서버에서 사용자 ID 가져오기
        setUserId(response.data.userId);
      } catch (error) {
        console.error('사용자 ID를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 ��습니다.');
      return;
    }

    const resetData = {
      userId, // 여기서 전달받은 userId 사용
      password,
      confirmPassword,
    };

    try {
      let response;
      if (isSocialUser) {
        // 소셜 로그인 사용자일 경우
        response = await axios.post('http://localhost:8080/home/joinPasswordProc', resetData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
        });
      } else {
        // 기존 사용자일 경우
        response = await axios.post('http://localhost:8080/updatePasswordProc', resetData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
        });
      }

      console.log('비밀번호 처리 성공:', response.data);
      alert('비밀번호가 성공적으로 처리되었습니다.');
      navigate('/'); // 로그인 페이지로 리디렉션
    } catch (error) {
      console.error('비밀번호 처리 실패:', error?.response?.data || error.message);
      alert('비밀번호 처리에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Title>{title || '비밀번호 재설정'}</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>비밀번호 <span>*</span></Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력 (영문, 숫자, 특수문자 포함 8~32자)"
            required
          />
        </InputContainer>

        <InputContainer>
          <Label>비밀번호 확인 <span>*</span></Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 재입력"
            required
          />
        </InputContainer>

        <ButtonContainer>
          <Button type="submit">비밀번호 재설정</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default RewritePass;

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; 
  max-width: 400px;
  justify-content: center;
`;

const InputContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  span {
    color: red;
  }
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 14px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
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

  &:hover {
    background-color: #0056b3;
  }
`;