import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Nav from "../../components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null); // 파일 입력을 위한 ref

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시글 등록 로직 추가 필요
  };

  const handleLabelClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <Nav />
      <Title>게시글 작성</Title>
      <DividerLine></DividerLine>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 작성해주세요"
            required
          />
        </InputContainer>

        <InputContainer>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled hidden>카테고리를 선택해주세요</option>
            <option value="category1">카테고리1</option>
            <option value="category2">카테고리2</option>
          </Select>
        </InputContainer>

        <InputContainer>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요"
            required
          />
        </InputContainer>


       <FileInputContainer>
        <InputContainer>
          <PicContainer onClick={handleLabelClick}>
            <FontAwesomeIcon icon={faCamera} size="2x" color="#6AB2E1" />
            <Label>사진 첨부</Label>
          </PicContainer>
          <FileInput
            type="file"
            multiple
            ref={fileInputRef} // ref 추가
            onChange={handleImageUpload}
          />
        </InputContainer>

   
        <ImagePreview>
          {images.map((img, index) => (
            <ImageItem key={index}>
              <ImagePreviewText>{img.name}</ImagePreviewText>
              <RemoveButton onClick={() => setImages(images.filter((_, i) => i !== index))}>×</RemoveButton>
            </ImageItem>
          ))}
        </ImagePreview>

        </FileInputContainer>
  

        <ButtonContainer>
          <Button type="button">임시 저장</Button>
          <Button type="submit">게시글 등록</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default WritePage;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  width: 100%;
  margin-top: 180px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const DividerLine = styled.hr`
  border: 2;
  height: 1px;
  background: #ccc;
  width: 800px; /* 전체 너비 사용 */
  margin: 10px 0; /* 상하 여백 */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px; 
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column; 
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px; 
`;

const Input = styled.input`
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 1px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 1px;
  font-size: 14px;
  width: 100%; 

  color: ${({ disabled }) => (disabled ? 'grey' : '#333')};
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 1px;
  font-size: 14px;
  height: 500px;
`;

const FileInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer; 
  position: absolute;

  &:hover {

    svg { /*FontAwesomeIcon는 svg 요소*/
     color: #ccc;
    }

    label {
      color: #ccc;
    }
  }
`;
const FileInput = styled.input`
  display: none; 
`;

const ImagePreview = styled.div`
  margin-top: 10px; 
  border: 1px solid  #ccc;;
  width: 90%;
  height: 60px;
  transform: translatey(-10px);
  

`;

const ImageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;




const ImagePreviewText = styled.span`
  font-size: 14px;

`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 30px; /* 상단 여백 추가 */
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

const Button = styled.button`
  padding: 12px 20px; /* 버튼 패딩 */
  width: 150px;
  background-color: #6AB2E1;
  color: white;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;


  &:hover {
    background-color: #ccc;
  }
`;
