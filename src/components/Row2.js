import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Row2 = ({ title, index }) => {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const fetchItems = async () => {
    try {
      const response = await axios.get('/data.json');
      setItemList(response.data.items);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const sliderId = `itemSlider-${index}`;

  const handleScroll = (direction) => {
    const itemListElement = document.getElementById(sliderId);
    const scrollAmount = window.innerWidth - 80;

    if (direction === 'left') {
      itemListElement.scrollLeft -= scrollAmount;
      setCurrentPage((prev) => Math.max(prev - 1, 0)); // 왼쪽으로 스크롤 시 페이지 감소
    } else {
      itemListElement.scrollLeft += scrollAmount;
      setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(itemList.length / itemsPerPage) - 1)); // 오른쪽으로 스크롤 시 페이지 증가
    }
  };

  return (
    <RowWrapper>
      <RowTitle>내가 찾고 있는 물건</RowTitle>
      <Slider>
        <ArrowLeft>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => {
                handleScroll('left')
            }}
          />
        </ArrowLeft>
        <ItemList id={sliderId} >
          
          {itemList.map((item, index) => (
            <ItemCard key={index}>
              <ItemImage src={item.imageUrl} alt={item.title} />
              <ItemTitle>{item.title}</ItemTitle>
              <ItemLocation>위치 | {item.location}</ItemLocation>
              <ItemDate>{new Date(item.date).toLocaleDateString()}</ItemDate>
            </ItemCard>
          ))}
        </ItemList>
        <ArrowRight>
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => { 
                handleScroll('right')
            
            }}
          />
        </ArrowRight>
      </Slider>

      <Indicators>
        {Array.from({ length: Math.ceil(itemList.length / itemsPerPage) }).map((_, index) => (
          <Indicator key={index} active={index === currentPage} />
        ))}
      </Indicators>
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  width: 1074px;
  height: 360px;
  margin: 200px auto;

`;

const RowTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 32px;
`;

const ItemList = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  gap: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemCard = styled.div`
  min-width: 240px;
  padding: 12px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #A0DAFB;
  }
`;

const ItemImage = styled.img`
  width: 240px;
  height: 280px;
  border-radius: 7px;
`;

const ItemTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  text-align:left;
`;

const ItemLocation = styled.div`
  font-size: 14px;
  color: #777;
  text-align:left;
`;

const ItemDate = styled.div`
  font-size: 14px;
  color: #777;
  text-align:left;
`;

const ArrowLeft = styled.div`
  position: absolute;
  left: -12px;
  cursor: pointer;
  height: 30%;
  z-index: 10; 
`;

const ArrowRight = styled.div`
  position: absolute;
  height: 30%;
  transform: translatex(1080px);
  cursor: pointer;
  z-index: 10; 
`;

// 페이지 인디케이터 스타일
const Indicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Indicator = styled.div`
  width: 15px; 
  height: 8px; 
  border-radius: 14px; 
  background: #D2E8F6;
  margin: 0 5px;
  transition: width 0.3s, background 0.3s; 


  ${({ active }) => active && `
    width: 40px;
    background: #6AB2E1;
  `}
`;

export default Row2;