import React from "react";
import styled from "styled-components";
import Nav from "../../components/Nav";
import MyPageSideBar from "../../components/MyPageSideBar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import boots from "../../assets/부츠.png";
import ring from "../../assets/반지.png";
import jeans from "../../assets/청바지.png";
import doll from "../../assets/인형.png";

const Content = ({ image, title, location, writer, date }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        margin: "10px",
      }}
    >
      <img
        src={image}
        alt="profile"
        style={{ width: "200px", height: "230px" }}
      />
      <br />
      <h3>{title}</h3>
      <p>
        {location} | {writer}
      </p>
      <p>{date}</p>
    </div>
  );
};
const MyPage = () => {
  return (
    <>
      <Nav />
      <Container>
        <MyPageSideBar />
        <MyPageWrapper>
          <StyledProfile>
            <img
              src="/images/unknown.jpg"
              alt="profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <div className="profile-info">
              <Link
                to="/MyPage/edit"
                style={{
                  fontSize: "1.5rem",
                  marginTop: "15px",
                  marginBottom: "10px",
                  display: "inline-block",
                  flexDirection: "row",
                  textDecoration: "none",
                }}
              >
                여지훈님 >
              </Link>
              <Link
                to="/MyPage/pogeun"
                style={{
                  textDecoration: "none",
                }}
              >
                포근지수
              </Link>
            </div>
          </StyledProfile>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                display: "inline-block",
                marginBottom: "5px",
                marginTop: "10px",
              }}
            >
              내가 쓴 게시글
            </h4>
            <Link
              style={{
                display: "inline-block",
                padding: "10px",
                textDecoration: "none",
              }}
              to="/MyPage/myProducts"
            >
              더보기
            </Link>
          </div>
          <hr style={{ marginLeft: "0px", width: "98%" }} />
          <ContentWrapper>
            <Content
              image={boots}
              title="부츠"
              location="서울"
              writer="여지훈"
              date="2024-01-01"
            />
            <Content
              image={ring}
              title="반지"
              location="서울"
              writer="여지훈"
              date="2024-01-01"
            />
            <Content
              image={jeans}
              title="청바지"
              location="서울"
              writer="여지훈"
              date="2024-01-01"
            />
            <Content
              image={doll}
              title="인형"
              location="서울"
              writer="여지훈"
              date="2024-01-01"
            />
          </ContentWrapper>
        </MyPageWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: calc(2vw + 105px);
  padding-right: 0px;
  width: 100%;
  gap: 50px;
  margin-top: 100px;
  overflow-x: hidden;
`;
const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: row;
  width: 87%;
  text-align: left;
  padding: calc(1vw + 40px);
  background-color: #d2e8f6;
  height: 130px;
  img {
    margin: 10px;
    flex-direction: row;
  }
  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
    display: inline-block;
    flex-direction: row;
  }
  .profile-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    gap: 5px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
`;
export default MyPage;
