import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBar = () => {
  return <StyledSideBar></StyledSideBar>;
};

export default SideBar;

const index = () => {
  return <Nav />;
};

const StyledSideBar = styled.nav`
  display: flex;
  height: auto;
  margin: 0px;
  flex-direction: column;

  h3 {
  display: flex
  margin: 10px
  }
  `;
