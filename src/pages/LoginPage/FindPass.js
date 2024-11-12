import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../../components/Nav";
import FindID from './FindID';

const FindPass = () => {
  const [userId, setUserId] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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


        <Button type="submit">찾기</Button>

        <LinkContainer>
          <Link onClick={() => navigate('/find-id')}>아이디 찾기</Link>
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
  height: 45px;
  background-color:  #6AB2E1;
  color: white;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size:18px;
  font-weight:bold;
  transform: translate(315px,-53px);


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

