import React, {useState, useEffect} from 'react'
import { useLocation} from 'react-router-dom';
import Nav from "../../components/Nav"; 
import Category from "../../components/Category"; 
import SearchProduct from "../../components/SearchProduct"; 
import styled from 'styled-components';
import axios from 'axios';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [items, setItems] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get("q");

    const fetchItems = async () => {
        try {
            const response = await axios.get('/data.json');
            setItems(response.data.items);
            if (searchTerm) {
                fetchSearchItems(response.data.items, searchTerm);
            }
        } catch (error) {
            console.error('데이터를 불러오는데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (searchTerm && items.length > 0) {
            fetchSearchItems(items, searchTerm);
        }
    }, [searchTerm, items]);

    const fetchSearchItems = (itemsData, term) => {
        const filteredItems = itemsData.filter(item =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filteredItems);
    };

    return (
        <Container>
            <Nav/>
            <Category/>

            {searchResults.length > 0 ? (
                <>
                    <ResultMessage>"{searchResults[0].title}"에 대한 결과</ResultMessage>
                    <SearchProduct itemList={searchResults} />
                </>
            ) : (
                <NoResults>찾고자하는 검색어 "{searchTerm}"에 맞는 아이템이 없습니다.</NoResults> 
            )}
        </Container>
    );
};

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



