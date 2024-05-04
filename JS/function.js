//공통으로 사용할 기능을 구현하는 JS 파일입니다.
export function test() {
  console.log('function.js의 test 메서드와 연결이 잘 되었습니다');
}


// GET TheMovieDB Top-Rated
export async function getTopRated() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTM1OGMyZTFkNDExZjhlYTdiYzNlODNiMTU1MmNjZiIsInN1YiI6IjY2MjlmZTMxZjcwNmRlMDExZjRmZGQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CuaQoR0S4oo5lny0tSRCC7p-siuCDsw9zZjwkKA1yiM'
    }
  };

  return await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;        // 받은 데이터 반환
    }
    )
    .catch(err => {
      console.error(err)
      return -1;      // 에러표시를 위해 -1 반환
    }
    );
}



// 영화진흥위원회API용 날짜지정 함수
function getBeforeDate(tar = -1) {
  let getToday = new Date();
  let today = getToday.getFullYear() +    // 년
              "0" + Number(getToday.getMonth()+1) +     // 월
              "0" + Number(getToday.getDate()+tar);     // 일
  console.log(today);

  return today;
}


// GET 영화진흥위원회 일별 박스오피스
export async function getDailyRanking() {
  const key = "653c57a5ca2b00ae2ace38fd06de24a4"; // API-Key 값
  const targetDate = getBeforeDate(); // 당일조회는 되지않음

  return fetch(
    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDate}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.boxOfficeResult.dailyBoxOfficeList;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  };

// GET 영화진흥위원회 주간/주말 박스오피스
// range 값 | 0 : 월~일 / 1 : 금~일 / 2 : 월~목 | 기본값 : 0 (월~일)
export async function getWeeklyRanking(range=0) {

  let key = '653c57a5ca2b00ae2ace38fd06de24a4';   // API-Key 값
  let targetDate = `20240422`;    // 조회할 주의 시작일(월요일) 지정
  let fetch_url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${key}&targetDt=${targetDate}&weekGb=${range}`;

  let res;
  return await fetch(fetch_url)
    .then(response => response.json())
    .then(data => {
      res = data["boxOfficeResult"];
      return res;
    })
    .catch(err => {
      console.error(err);
    });
}


// TMDB 이름으로 영화검색
export async function searchMovie(tar) {

  let target = '%' + tar + '%';
  let fetch_url = `https://api.themoviedb.org/3/search/movie?query=${target}&api_key=fa358c2e1d411f8ea7bc3e83b1552ccf`;

  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTM1OGMyZTFkNDExZjhlYTdiYzNlODNiMTU1MmNjZiIsInN1YiI6IjY2MjlmZTMxZjcwNmRlMDExZjRmZGQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CuaQoR0S4oo5lny0tSRCC7p-siuCDsw9zZjwkKA1yiM'
      }
  };

  return await fetch(fetch_url, options)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        })
        .catch(err => console.error(err));

}