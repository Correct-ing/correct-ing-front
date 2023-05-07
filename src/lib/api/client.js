import axios from 'axios';

const client = axios.create();

// API 주소
client.defaults.baseURL =
  'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com';

// 헤더 설정
// client.defaults.headers.common['Authorization'] = `Bearer ${}`

export default client;
