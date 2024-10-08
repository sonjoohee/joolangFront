import React, {useState, useEffect} from 'react'
import { useLocation} from 'react-router-dom';
import Nav from "../../components/Nav"; 
import Category from "../../components/Category"; 
import SearchProduct from "../../components/SearchProduct"; 
import styled from 'styled-components';
import items from '../../data.js'; // 임의 데이터 파일 import

const SearchPage = () => {


    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search); //현재 경로의 쿼리 문자열 
      }; //url ?뒤의 파라미터들을 가져옴 


      let query = useQuery();
      const searchTerm = query.get("q");

      useEffect(()=> {
        if (searchTerm) { //만약 searchTerm이 존재한다면 
            fetchSearchItems(searchTerm);
        }
      }, [searchTerm]);

      const fetchSearchItems = (searchTerm) => {
        const filteredItems = items.filter(item => // 제목에 검색어가 포함된 아이템 가져왹
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
            setSearchResults(filteredItems);
      };


        return (
            <Container>
        
            <Nav/>
            <Category/>

            {searchResults.length > 0 ? (
                <>
                    <ResultMessage>“{searchResults[0].title}”에 대한 결과</ResultMessage>
                    <SearchProduct itemList={searchResults} />
                </>
            ) : (
                <NoResults>찾고자하는 검색어 "{searchTerm}"에 맞는 아이템이 없습니다.</NoResults> 
            )}
         
    
            </Container>
            
 
  )
}

export default SearchPage


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding: 20px;
  width: 100%;
  margin-top: 15%;

`;


const NoResults = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #777;
  transform: translateY(-220px); /* 올바른 속성 이름 */


`;


const ResultMessage = styled.p`
  font-size: 24px;
  font-weight: bold;
  transform: translateY(-220px);
  color: #777;
`;
