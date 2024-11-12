import React from 'react'
import Category from "../../components/Category"; 
import Products from "../../components/Products"; 
import styled from 'styled-components';

const ProductPage = () => {
  return (
   <Container>

    <Title>중고물품 둘러보기</Title>
    <Category/>
    <Products/>
    </Container>
    
 
  )
}

export default ProductPage


const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 200px;
 
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;
