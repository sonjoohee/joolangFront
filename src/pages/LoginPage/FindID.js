import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../../components/Nav";
import FindPass from './FindPass';

const FindID = () => {
  const [name, setName] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleAddButtonClick = () => {
    navigate('/SignupPage'); 
  };

  return (
    <Container>
      <Nav />
      <Title>아이디 찾기</Title>

      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            required
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="전화번호"
            required
          />
        </InputContainer>

        <Button type="submit">찾기</Button>

        <LinkContainer>
          <Link onClick={() => navigate('/find-pass')}>비밀번호 찾기</Link>
          <Divider>|</Divider>
          <Link onClick={handleAddButtonClick}>회원가입</Link>
        </LinkContainer>
      </Form>

      <SocialLoginSection>
        <SocialLogin>
          <DividerLine />
          <SocialLoginTitle>다른 방법으로 찾기</SocialLoginTitle>
          <DividerLine />
        </SocialLogin>
        <Button2>
          휴대폰 인증으로 찾기
        </Button2>
      </SocialLoginSection>
    </Container>
  );
};

export default FindID;

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

const Button2 = styled.button`
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
