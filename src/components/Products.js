import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MuiPagination from '@mui/material/Pagination';
import LikeButton from './LikeButton';

const Products = () => {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const fetchItems = async () => {
    try {
      const response = await axios.get('/data.json');
      setItemList(response.data.items.map(item => ({ ...item, liked: false })));
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLikeChange = (index, newLiked, newLikesCount) => {
    setItemList(prevList => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], liked: newLiked, likes: newLikesCount };
      return newList;
    });
  };

  const totalPages = Math.ceil(itemList.length / itemsPerPage);
  const displayedItems = itemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <LikeButton
              initialLiked={item.liked}
              initialLikesCount={item.likes}
              onLikeChange={(newLiked, newLikesCount) => handleLikeChange(index + (currentPage - 1) * itemsPerPage, newLiked, newLikesCount)}
            />
          </ItemCard>
        ))}
      </ItemList>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 0;
  align-items: center;
  justify-content: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
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

export default Products;

