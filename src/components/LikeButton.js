import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; 
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';


const LikeButton = ({ initialLiked, initialLikesCount, onLikeChange, buttonStyle }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  // props가 변경될 때 상태 업데이트
  useEffect(() => {
    setLiked(initialLiked);
    setLikesCount(initialLikesCount);
  }, [initialLiked, initialLikesCount]);



const handleClick = (e) => {
    e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
    const newLiked = !liked;
    const newLikesCount = newLiked ? likesCount + 1 : likesCount - 1;

    setLiked(newLiked);
    setLikesCount(newLikesCount);
    if (onLikeChange) {
      onLikeChange(newLiked, newLikesCount); // 이벤트 객체 생략
    }
};



  return (
    <Button onClick={handleClick} buttonStyle={buttonStyle}>
         {likesCount}
      <FontAwesomeIcon icon={liked ? faHeart : regularHeart} style={{ color: liked ? 'red' : 'white', marginLeft: '4px' }} />
     
    </Button>
  );
};

const Button = styled.div`
  border: 1px solid #ddd;
  padding: 2px 4px;
  width: 50px;
  border-radius: 15px;
  color: white;
  background-color: rgba(84, 84, 84, 0.35); 
  cursor: pointer;
  position: absolute;
  bottom: 130px; 
  right: 10px;

  &:hover {
    background-color: #A0DAFB; 
  }
`;

export default LikeButton;