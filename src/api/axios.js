import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
      api_key: "99e2b135ff4afc4350aa59165158ff64",
      language: "ko-KR",
    },
  });
  
  export default instance;
  