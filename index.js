//메인 로직을 구현하는 JS 파일입니다
import { test, getTopRated, getDailyRanking } from "./JS/function.js";

test();

//dataFetched에서 더 짧은 recv로 변경 : 편하게 관리하기 위해서 교체 함

// 일간-순위 테스트
// let dailyResult;
// await getDailyRanking().then(data => {
//   dailyResult=data;
//   });
// console.log(dailyResult);

// // 주간-순위 테스트
// recv = getWeeklyRanking()
//   .then(data => {
//     console.log(data);
//   });

// // 검색 테스트
// let target_search = '범죄';
// recv = searchMovie(target_search);
// console.log(recv);

// let results; //결과 담을 변수 미리 선언
// await getTopRated().then((data) => {
//   results = data;
// });

// console.log(results); //출력
