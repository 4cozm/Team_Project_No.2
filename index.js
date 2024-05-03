//메인 로직을 구현하는 JS 파일입니다
import
{ test, getTopRated, getDailyRanking, getWeeklyRanking, searchMovie }
from './JS/function.js';

test();

let dataFetched = getDailyRanking();
console.log(dataFetched);

dataFetched = getWeeklyRanking();
console.log(dataFetched);

let target_search = '범죄';
dataFetched = searchMovie(target_search);
console.log(dataFetched);
