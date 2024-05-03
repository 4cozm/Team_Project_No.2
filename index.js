//메인 로직을 구현하는 JS 파일입니다
import { test, getTopRated, getDailyRanking, getWeeklyRanking, searchMovie }
  from './JS/function.js';

test();

// dataFetched에서 더 짧은 recv로 변경 : 편하게 관리하기 위해서 교체 함

// 평점-순위 테스트
let recv = getTopRated();
console.log(recv);

// 일간-순위 테스트
let Day_Rank = {};
recv = getDailyRanking()
  .then(data => {
    console.log(data);
    Day_Rank = new Object(data);
    console.log(Day_Rank);
    return data;
  });
console.log(recv);
console.log(Day_Rank);

// 주간-순위 테스트
recv = getWeeklyRanking()
  .then(data => {
    console.log(data);
  });

// 검색 테스트
let target_search = '범죄';
recv = searchMovie(target_search);
console.log(recv);
