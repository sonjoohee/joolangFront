import axios from 'axios';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

// JWT 토큰을 Local Storage에 저장
export const saveToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

// Local Storage에서 JWT 토큰을 읽기
export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

// Local Storage에서 JWT 토큰 제거
export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};

// JWT 토큰 유효성 검사
export const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000; // exp는 초 단위로 되어 있으므로 밀리초로 변환
  return Date.now() >= exp; // 현재 시간과 만료 시간을 비교
};

// 소셜 로그인 함수
export const socialLogin = async (provider, accessToken) => {
    try {
      const response = await apiClient.post(`/home/login/${provider}`, {
        accessToken,
      });
  
      if (response.status === 200) {
        saveToken(response.data.token); // JWT 저장
        return response.data; // JWT 포함된 응답 데이터 반환
      }
    } catch (error) {
      console.error('소셜 로그인 실패:', error);
      throw error; // 오류를 상위로 전파
    }
  };
  
  // Access Token 발급 요청 함수
  export const getAccessToken = async (refreshToken) => {
    try {
      const response = await apiClient.post('/auth/access-token', {
        refreshToken: refreshToken
      }, {
        headers: {
          'Accept': '*/*'
        }
      });
  
      return response.data; // API 응답 반환
    } catch (error) {
      console.error('Access Token 발급 요청 중 오류 발생:', error);
      return null;
    }
  };

// 로그인 함수
export const login = async (userId, password) => {
  try {
    const response = await apiClient.post('/home/login', {
      userId,
      password,
    });

    if (response.status === 200) {
      saveToken(response.data.token); // JWT 저장
      return response.data; // JWT 포함된 응답 데이터 반환
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error; // 오류를 상위로 전파
  }
};

// 로그아웃 함수
export const logout = () => {
  removeToken(); // JWT 삭제
};
