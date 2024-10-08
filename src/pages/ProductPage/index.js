import React from 'react'
import Nav from "../../components/Nav"; 
import Category from "../../components/Category"; 
import Products from "../../components/Products"; 
import styled from 'styled-components';

const ProductPage = () => {
  return (
   <Container>
   
    <Nav/>
    <Title>중고물품 둘러보기</Title>
    <Category/>
    <Products/>
    </Container>
    
 
  )
}

export default ProductPage


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  width: 100%;
  margin-top: 35%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  position: absolute;
  top: 23%;
`;
