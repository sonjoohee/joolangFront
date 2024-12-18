import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Nav from "../../components/Nav";
import axios from 'axios';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [email, setEmail] = useState('');
  const [com, setEmailcom] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 최종적ㅇ로 서버에 전송될 것
    const signupData = {
      username, 
      password, 
      nickname, 
      phoneNum: phone, 
      email: `${email}@${com}`, 
      provider: 'local', 
      role: 'user', 
      providerId: 'local', 
      userId: username,
      id: null
  };
  

    try {
      const response = await axios.post('http://localhost:8080/home/joinProc', signupData);
      console.log('회원가입 성공:', response.data);

      navigate('/MainPage'); 
    } catch (error) {
      console.error('회원가입 실패:', error.response.data);
    
    }
  };

  const handleSendSMS = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/home/sendSmsProc?phoneNumber=${phone}`);
      console.log('인증번호 발송 성공:', response.data);
      
    } catch (error) {
      console.error('인증번호 발송 실패:', error.response.data);
    
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/home/checkProc?verifyCode=${authCode}&phoneNumber=${phone}`);
      console.log('인증 성공:', response.data);
      
    } catch (error) {
      console.error('인증 실패:', error.response.data);
      
    }
  };

  return (
    <Container>
      <Nav />
      <Title>회원가입</Title>

      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>아이디 <span> *</span> </Label> 
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디 입력"
            required
          />
          <Button type="button" onClick={() => {/* 중복 확인 로직 필요*/}}>중복 확인</Button>
        </InputContainer>

        <InputContainer2>
          <Label>비밀번호 <span> *</span> </Label> 
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력 (영문, 숫자, 특수문자 포함 8~32자)"
            required
          />
        </InputContainer2>

        <InputContainer2>
          <Label>비밀번호 확인 <span> *</span> </Label> 
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 재입력"
            required
            style={{ borderColor: confirmPassword && password !== confirmPassword ? 'red' : '#ccc' }}
          />
          {confirmPassword && password !== confirmPassword && <span style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</span>}
        </InputContainer2>

        <InputContainer2>
          <Label>닉네임  <span> *</span> </Label>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="사용할 이름을 입력해주세요"
            required
          />
        </InputContainer2>

        <InputContainer>
          <Label>전화번호  <span> *</span> </Label> 
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호 입력 (- 제외 숫자만 입력)"
            required
          />
          <Button type="button" onClick={handleSendSMS}>인증번호 발송</Button>
        </InputContainer>

        <InputContainer>
          <Label>인증번호  <span> *</span> </Label> 
          <Input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="인증번호 입력"
            required
          />
          <Button type="button" onClick={handleVerifyCode}>인증하기</Button>
        </InputContainer>

        <Label>이메일 주소 </Label> 
        <InputContaineremail>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
            // required
          />
          <span>@</span>
          <Input
            type="text" 
            value={com}
            onChange={(e) => setEmailcom(e.target.value)}
            placeholder="ex)naver.com"
            // required
          />
        </InputContaineremail>

        <ButtonContainer>
          <Button type="button" onClick={() => navigate(-1)}>뒤로 가기</Button>
          <Button type="submit">회원가입 완료</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  margin-bottom:200px;
  margin-top:10vh;

`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  margin-top:50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; 
  max-width: 500px;
  justify-content: center;
`;

const InputContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-bottom: -30px;


  span {
    color: red;
  }
  
  Input {
  padding: 14px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 1px;
  font-size: 14px;
  margin-top:4px;
  }

`;

const InputContainer2 = styled.div`
  margin-bottom: 25px; 
  text-align: left;
  width:480px;

  

`;



const InputContaineremail = styled.div`
  margin-bottom: 25px; 
 
  width:500px;
  display: flex;

  span{
    font-size: 16px;
    margin: 0 10px;
    transform: translatey(15px);
  
    
  }

`;
const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
  text-align: left;

  span {
    color: red;
  }
`;

const Input = styled.input`
  padding: 14px;
  width:100%;
  border: 1px solid #ccc;
  border-radius: 1px;
  font-size: 14px;
  margin-top:4px;
`;



const Button = styled.button`
  width:120px;
  height: 48px;
  background-color: #6AB2E1;
  color: white;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  padding: 12px 20px;
  transform: translate(390px,-52px);

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  transform: translate(-390px,100px);


  Button {
    background-color: #777777;
    padding: 12px ; 
    width: 180px;
    text-align: center; 
    border: none; 
    border-radius: 1px; 


    &:hover {
      background-color: #D4D4D4;


    }  
  }
`;