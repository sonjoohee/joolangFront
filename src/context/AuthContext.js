import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken, removeToken } from '../api/auth'; // auth.js에서 가져오기
import axios from 'axios';

// Context 생성
export const AuthContext = createContext();

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  // 로컬 스토리지에서 사용자 정보와 JWT 토큰 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = getToken(); // JWT 토큰 가져오기
    if (storedUser && token) {
      setUser(JSON.parse(storedUser)); // 사용자 정보 설정
      setIsLoggedIn(true); // 로그인 상태 업데이트
    }
  }, []);

  // 로그인 함수
  const login = async (userId, password) => {
    try {
      const response = await axios.post('http://localhost:8080/home/login', {
        userId,
        password,
      });

      if (response.status === 200) {
        const userData = response.data.user; // 사용자 정보
        const token = response.data.token; // JWT

        setUser(userData);
        saveToken(token); // 로컬 스토리지에 JWT 저장
        localStorage.setItem('user', JSON.stringify(userData)); // 사용자 정보 저장
        setIsLoggedIn(true); // 로그인 상태 업데이트
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error; // 오류를 상위로 전파
    }
  };

  // 로그아웃 함수
  const logout = (navigate) => {
    setUser(null);
    removeToken(); // 로컬 스토리지에서 JWT 제거
    localStorage.removeItem('user'); // 사용자 정보 제거
    setIsLoggedIn(false); // 로그인 상태 업데이트
    navigate("/"); // 홈으로 리디렉션
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
}; 