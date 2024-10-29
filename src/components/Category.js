import React, { useState } from 'react';
import styled from 'styled-components';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);


  const categories = ['전체', '패션', '가구/인테리어', '식품', '가전제품', '스포츠', '컴퓨터/모바일/디지털', '티켓/쿠폰', '생활용품'];
  const regions = ['전국', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => 
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
    );
  };

  const handleRegionClick = (region) => {
    setSelectedRegion((prev) => 
      prev.includes(region) ? prev.filter(item => item !== region) : [...prev, region]
    );
  };

  return (
    <Container>
      <Title>카테고리</Title>

      <Filters>
      <FilterSection>
        <FilterTitle>분류</FilterTitle>
        <FilterOptions>
          {categories.map((category) => (
            <FilterOption key={category} onClick={() => handleCategoryClick(category)}>
              {category} {selectedCategory.includes(category) && '×'}
            </FilterOption>
          ))}
        </FilterOptions>
      </FilterSection>

      <FilterSection>
        <FilterTitle>지역</FilterTitle>
        <FilterOptions>
          {regions.map((region) => (
            <FilterOption key={region} onClick={() => handleRegionClick(region)}>
              {region} {selectedRegion.includes(region) && '×'}
            </FilterOption>
          ))}
        </FilterOptions>
      </FilterSection>



      </Filters>

      <ResetButton onClick={() => {
        setSelectedCategory([]);
        setSelectedRegion([]);
    
      }}>초기화</ResetButton>
    </Container>
  );
};





const Container = styled.div`
  padding: 20px;
  border-radius: 8px;
  width: 70%;
  height:150px;
  top: 30%;
  margin-left:15px;
  
`;

const Title = styled.h2`
  font-size: 20px;
  top: 30%;
  text-align: left;


`;


const Filters = styled.div`
  border-top: 1px solid #292929;
  
`;
const FilterSection = styled.div`
  display: flex;
  max-height: 80px;

`;

const FilterTitle = styled.h3`
    font-size: 18px;
    width: 120px;
    height: 80px;
    background-color: #D2E8F6;
    margin-top: 0px;
    margin-bottom: -10px;
    display: flex; 
    align-items: center;
    padding-left:20px;
    max-width:100px;
    min-width:100px;

`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex; 
  align-items: center;
  transform: translatey(5px);
`;

const FilterOption = styled.div`
  margin: 5px;
  padding: 8px 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0f0ff;
  }
`;



const ResetButton = styled.button`
  background: none; 
  border: none; 
  color: #777777;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 10%;

  &:hover {
    color: #c62828; 
  }
`;


export default Category;

