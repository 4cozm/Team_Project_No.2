//공통으로 사용할 기능을 구현하는 JS 파일입니다.
export function test() {
  console.log("function.js의 test 메서드와 연결이 잘 되었습니다");
}
const apiKey = "5fa425f3aa4cb48d2b6a9c372404cc24"; //TMDB API KEY

// GET TheMovieDB Top-Rated
export function getTopRated() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTM1OGMyZTFkNDExZjhlYTdiYzNlODNiMTU1MmNjZiIsInN1YiI6IjY2MjlmZTMxZjcwNmRlMDExZjRmZGQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CuaQoR0S4oo5lny0tSRCC7p-siuCDsw9zZjwkKA1yiM",
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.results;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// 영화진흥위원회API용 날짜지정 함수
function getBeforeDate(tar = -1) {
  let getToday = new Date();
  let today = getToday.getFullYear() +    // 년
              "0" + Number(getToday.getMonth()+1) +     // 월
              "0" + Number(getToday.getDate()+tar);     // 일

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
}

// GET 영화진흥위원회 주간/주말 박스오피스
// range 값 | 0 : 월~일 / 1 : 금~일 / 2 : 월~목 | 기본값 : 0 (월~일)
export async function getWeeklyRanking(range = 0) {
  let key = "653c57a5ca2b00ae2ace38fd06de24a4"; // API-Key 값
  let targetDate = `20240422`; // 조회할 주의 시작일(월요일) 지정
  let fetch_url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${key}&targetDt=${targetDate}&weekGb=${range}`;

  let res;
  return await fetch(fetch_url)
    .then((response) => response.json())
    .then((data) => {
      res = data["boxOfficeResult"];
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
}

// // TMDB 이름으로 영화검색
// export async function searchMovie(tar) {
//   let target = "%" + tar + "%";
//   let fetch_url = `https://api.themoviedb.org/3/search/movie?query=${target}&api_key=fa358c2e1d411f8ea7bc3e83b1552ccf`;

//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTM1OGMyZTFkNDExZjhlYTdiYzNlODNiMTU1MmNjZiIsInN1YiI6IjY2MjlmZTMxZjcwNmRlMDExZjRmZGQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CuaQoR0S4oo5lny0tSRCC7p-siuCDsw9zZjwkKA1yiM",
//     },
//   };


//영화이름을 기준으로 검색한뒤 포스터 URL + 평점을 추가해줌 추가한 데이터는 TMDB.poster_path / TMDB.vote_average 로 접근가능
async function searchMovieByName(movieName) { 
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      movieName
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let posterUrl ="https://image.tmdb.org/t/p/w500/"+data.results[0].poster_path;
      if (posterUrl==undefined)
          posterUrl = "gd";
      const voteAverage = data.results[0].vote_average;
      return { posterUrl, voteAverage };
    })
    .catch((error) => {
      console.error("searchMovieByName 함수에서 문제 발생:", error);
      return [];
    });
}


export async function addPosterToTopRanking(range) {
  let rawArray //데이터를 합치기 전의 배열

  range = range.toLowerCase();
  if (range === "day") {
      //일간 박스오피스 기준으로 데이터를 합침
      rawArray = await getDailyRanking();
  } else if (range === "week") {
      //주간 박스오피스 기준으로 데이터를 합침
      rawArray = await getWeeklyRanking();
  } else {
      console.log(
          "addPosterToTopRanking 함수에 입력한 값이 올바르지 않습니다 대소문자 구분없이 Day 혹은 Week를 써 주세요"
      );
      return 0;
  }

  // 각 영화에 대한 이미지 URL과 평점을 가져오는 작업을 병렬적으로 처리
  const posterPromises = rawArray.map(async (index) => {
      let movieNm = index.movieNm; //영화진흥원의 이름을 저장
      const results = await searchMovieByName(movieNm);
      index.TMDB = results;
  });

  // 모든 이미지 URL을 가져올 때까지 기다림
  await Promise.all(posterPromises);

  return rawArray;
};