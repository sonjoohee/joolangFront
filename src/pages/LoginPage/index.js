import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Nav from "../../components/Nav";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('이메일:', email);
    console.log('비밀번호:', password);
    console.log('ID 저장:', rememberMe);
    // 로그인 처리 로직 추가 필요
  };

  const handleAddButtonClick = () => {
    navigate('/SignupPage'); // 회원가입 페이지로 이동
  };

  return (
    <Container>
      <Nav/>
      <Title>회원 로그인</Title>

      <Form onSubmit={handleSubmit}>
     
        <InputContainer>
        <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <Link>아이디 찾기</Link>
            <Divider>|</Divider>
            <Link>비밀번호 찾기</Link>
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
        <SocialButton>
        <Icon src="/images/네이버 로고 아이콘.png" alt="네이버 아이콘" />
          네이버 아이디로 로그인하기
        </SocialButton>
      </SocialLoginSection>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: 50px;

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
  margin: 0 5px; /* 구분선 좌우 마진 */
  color: #ccc; /* 구분선 색상 */
`;


const SocialLoginSection = styled.div`
  text-align: center; /* 중앙 정렬 */
  margin-top: 20px; /* 상단 여백 추가 */
  width: 100%; /* 전체 너비 사용 */
  max-width: 400px; /* 최대 너비 설정 */
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
    flex: 1; /* 남은 공간을 차지, 기본 너비가 0이기 때문에 설정 필수 */
    margin: 0 10px; 

`;

const SocialLoginTitle = styled.h2`
  font-size: 20px;
  margin: 10px 0; /* 텍스트와 구분선 간격 */
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
  width: 25px; /* 아이콘 크기 조절 */
  height: 25px;
  margin-right: 5px;
  vertical-align: middle;

`;