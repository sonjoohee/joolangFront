import React from 'react'
import styled from 'styled-components';

const Advertise = () => {
  return (
   <Ad>
    <img  alt="advertise" src='/images/광고.png' />
   </Ad>
 
  )
}

export default Advertise;


const Ad = styled.div`
  margin-top: 100px; /* 네비게이션 바와의 간격 조정 */
`;