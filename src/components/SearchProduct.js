import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import LikeButton from './LikeButton';


const SearchProduct = ({ itemList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(itemList.length / itemsPerPage);
  const displayedItems = itemList.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <RowWrapper>
      <ItemList>
        {displayedItems.map((item, index) => (
          <ItemCard key={index}>
            <ItemImage src={item.imageUrl} alt={item.title} />
            <ItemDetails>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemLocation>위치 | {item.location}</ItemLocation>
              <ItemDate>{new Date(item.date).toLocaleDateString()}</ItemDate>
            </ItemDetails>
            <Likes>{item.likes} ❤️</Likes>
            <LikeButton 
              initialLiked={item.liked} 
              initialLikesCount={item.likes} 
              onLikeChange={(newLiked, newLikesCount) => {
                // 좋아요 상태 변경 로직 추가
              }}
            />
          </ItemCard>
        ))}
      </ItemList>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 한 줄에 5개 아이템 */
  gap: 20px; 
  padding: 10px 0;
  margin: 40px 0;
`;

const ItemCard = styled.div`
  border-radius: 1px;
  position: relative;

  &:hover {
    background-color: #A0DAFB;
  }
`;

const ItemImage = styled.img`
  width: 220px;
  height: 240px; 
  object-fit: cover; 
`;

const ItemDetails = styled.div`
  padding: 10px;
  text-align: left;
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  margin: 5px 0;
`;

const ItemLocation = styled.p`
  font-size: 14px;
  color: #777;
`;

const ItemDate = styled.p`
  font-size: 12px;
  color: #aaa;
`;

const Likes = styled.div`
  position: absolute;
  top: 200px;
  right: 10px;
  background: rgba(84, 84, 84, 0.4);
  color: white;
  border-radius: 33px;
  padding: 2px 4px;
`;



export default SearchProduct;