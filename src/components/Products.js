import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import items from '../data.js'; // 임의 데이터 파일 import

const Products = () => {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15; // 페이지당 아이템 수 (5행 x 3열)

  const fetchItems = () => {
    setItemList(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(itemList.length / itemsPerPage);
  const displayedItems = itemList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

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
          </ItemCard>
        ))}
      </ItemList>
      <Pagination>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <PageNumber
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex)}
            active={pageIndex === currentPage}
          >
            {pageIndex + 1}
          </PageNumber>
        ))}
      </Pagination>
    </RowWrapper>
  );
};


const RowWrapper = styled.div`
  margin: 60px 0;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  color: ${({ active }) => (active ?  '#6AB2E1' : 'black')};
  margin: 15px 5px;
  cursor: pointer;
  border:none;
  background:none;
  font-weight: bold;
`;

export default Products;
