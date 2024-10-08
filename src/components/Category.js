import React, { useState } from 'react';
import styled from 'styled-components';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

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

  const handleApplyFilters = () => {
    console.log('Selected Categories:', selectedCategory);
    console.log('Selected Regions:', selectedRegion);
    console.log('Price Range:', minPrice, '~', maxPrice);
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

      <FilterSection>
        <FilterTitle>가격</FilterTitle>
        <PriceRange>
          <PriceInput 
            type="number" 
            placeholder="최저" 
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)} 
          />
          <span>~</span>
          <PriceInput 
            type="number" 
            placeholder="최대" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)} 
          />
          <ApplyButton onClick={handleApplyFilters}>적용</ApplyButton>
        </PriceRange>
      </FilterSection>

      </Filters>

      <ResetButton onClick={() => {
        setSelectedCategory([]);
        setSelectedRegion([]);
        setMinPrice('');
        setMaxPrice('');
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

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  transform: translatey(5px);
`;

const PriceInput = styled.input`
  width: 80px;
  margin: 0 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ApplyButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #292929;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:  #D2E8F6;
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