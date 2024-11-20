import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 id를 가져옵니다.
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/data.json"); // 실제 API URL을 사용하세요.
        const foundProduct = response.data.items.find(
          (item) => item.id === Number(id)
        );
        setProduct(foundProduct);
      } catch (error) {
        console.error("상품 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <NotFound>상품을 찾을 수 없습니다.</NotFound>;

  return (
    <Container>
      <Content>
        <ImageContainer>
          <ProductImage src={product.imageUrl} alt={product.title} />
        </ImageContainer>
        <DetailsContainer>
          <Title>{product.title}</Title>
          <Category>{product.category}</Category>
          <StatsContainer>
            <StatBox>
              <StatTitle>조회수</StatTitle>
              <StatValue>{product.views}</StatValue>
            </StatBox>
            <StatBox>
              <StatTitle>하트</StatTitle>
              <StatValue>{product.likes}</StatValue>
            </StatBox>
            <StatBox>
              <StatTitle>댓글</StatTitle>
              <StatValue>{product.comments}</StatValue>
            </StatBox>
          </StatsContainer>
          <UserContainer>
            <Avatar>
              <AvatarImage
                src={product.userAvatar || "/default-avatar.png"}
                alt={product.userName}
              />
            </Avatar>
            <UserInfo>
              <UserName>{product.userName}</UserName>
              <Rating>포인트: {product.rating}</Rating>
            </UserInfo>
          </UserContainer>
          <ButtonContainer>
            <Button>제품 후기</Button>
            <Button>거래 후기</Button>
          </ButtonContainer>
        </DetailsContainer>
      </Content>
      <h2>상품 설명</h2>
      <Description>
        <p>{product.description}</p>
      </Description>
      <ActionButtons>
        <ActionButton>삭제하기</ActionButton>
        <ActionButton>수정하기</ActionButton>
        <ActionButton_2>목록으로</ActionButton_2>
      </ActionButtons>
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 수직 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  max-width: 1200px;
  margin: 0 auto; /* 화면 중앙 배치 */
  padding: 20px;
  margin-top: 200px; /* 상단 여백 */
`;

const NotFound = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #555;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const ProductImage = styled.img`
  width: 460px;
  height: 460px;
  border-radius: 10px;
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: left;
`;

const Category = styled.span`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  width: 526px; /* 가로 크기 */
  height: 108px; /* 세로 크기 */
  display: flex; /* Flexbox 활성화 */
  justify-content: space-around; /* 내부 요소 간격 균등 분배 */
  align-items: center; /* 수직 중앙 정렬 */
  border: 1px solid #ddd; /* 박스 테두리 */
  border-radius: 10px; /* 박스 둥근 모서리 */
  padding: 20px; /* 내부 여백 */
  background-color: #ffffff; /* 배경색 */
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column; /* 텍스트를 수직 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  gap: 10px; /* 텍스트와 숫자 간격 */
`;

const StatTitle = styled.span`
  font-size: 16px;
  color: #555;
`;

const StatValue = styled.strong`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;


const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Rating = styled.span`
  font-size: 14px;
  color: #777;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Description = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
  width: 1024px;
  height: auto;
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 10px; /* 버튼 사이 간격 */
  margin-top: 20px;
  justify-content: flex-end; /* 오른쪽 정렬 */
`;


const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  border: 1px solid;
  cursor: pointer;
  width: 150px;
  height: 55px;

  &:hover {
    background-color: #bbb;
  }
`;

const ActionButton_2 = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  border: 1px solid;
  cursor: pointer;
  color: white;
  width: 150px;
  height: 55px;

  &:hover {
    background-color: #bbb;
  }
`;

export default ProductDetail;
