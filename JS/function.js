//공통으로 사용할 기능을 구현하는 JS 파일입니다.
export function test() {
  console.log("function.js의 test 메서드와 연결이 잘 되었습니다");
}
const apiKey = "5fa425f3aa4cb48d2b6a9c372404cc24"; //TMDB API KEY
const googleApikey = "AIzaSyAbpGHHJR1pWCdRA8amhHXSG6Zt7br3y50"; //google custom search API KEY

const searchEngineID = "e6605cbb614a4422a"; //구글 엔진 ID
const kobisApiKey = "653c57a5ca2b00ae2ace38fd06de24a4"; //영화진흥 위원회 API KEY

// GET TheMovieDB Top-Rated
export async function getTopRated() {
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
      return data.results;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// 영화진흥위원회API용 날짜지정 함수
function getBeforeDate(tar = -1) {
  let getToday = new Date();
  let today =
    getToday.getFullYear() + // 년
    "0" +
    Number(getToday.getMonth() + 1) + // 월
    "0" +
    Number(getToday.getDate() + tar); // 일

  return today;
}

// GET 영화진흥위원회 일별 박스오피스
export async function getDailyRanking() {
  const targetDate = getBeforeDate(); // 당일조회는 되지않음
  return fetch(
    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${kobisApiKey}&targetDt=${targetDate}`
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
      res = data.boxOfficeResult.weeklyBoxOfficeList;
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
}
//영화이름을 기준으로 TMDB에서 검색한뒤 포스터URL,평점,줄거리를 추가해줌 추가한 데이터는 TMDB.poster_path / TMDB.vote_average / TMDB.overView로 접근가능

async function searchMovieByName(movieName) {
  const SpacedMovieNm = addSpace(movieName);
  let posterUrl = "";
  let voteAverage = 0;
  let overView = "줄거리 없음";
  let movieData;
  try {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        SpacedMovieNm
      )}&language=ko`
    )
      .then((response) => response.json())
      .then((data) => {
        movieData = data;
      });
    posterUrl =
      "https://image.tmdb.org/t/p/w500/" + movieData.results[0].poster_path;
    if (movieData.results[0].poster_path == null) {
      console.log(
        SpacedMovieNm +
        "의 이미지가 없습니다 값 = " +
        movieData.results[0].poster_path
      );
      posterUrl = await altSearchPoster(SpacedMovieNm);
    }
    voteAverage = movieData.results[0].vote_average;
    overView = movieData.results[0].overview;
  } catch (error) {
    console.error("영화 검색 중 오류 발생:", error);
  }

  return { posterUrl, voteAverage, overView };
}

export async function addPosterToTopRanking(range) {
  //function.js 외부에서 영화진흥원의 정보를 받기 위한 API

  let rawArray; //데이터를 합치기 전의 배열

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
}

async function altSearchPoster(movieName) {
  //구글 커스텀 검색 API 설정 (TMDB에 검색에도 포스터가 나오지 않을때 실행됨)
  let requestUrl =
    "https://www.googleapis.com/customsearch/v1?key=" +
    googleApikey +
    "&cx=" +
    searchEngineID +
    "&q=" +
    encodeURIComponent(movieName + "영화 나무위키") +
    "&searchType=image" +
    "&num=1";
  return fetch(requestUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // 이미지 검색 결과를 처리하는 코드
      console.log("대체검색 실시 영화명:" + movieName);
      console.log("대체생성 이미지 URL:" + data.items[0].link);
      return data.items[0].link; // 이미지 검색 결과가 포함된 항목(items)을 출력
    })
    .catch((error) => {
      // 오류 발생 시 처리하는 코드
      console.error("꺼무위키에도 사진 못찾음", error);
    });
}

//영화이름을 기반으로 영화진흥위원회에서 맨 처음 값을 찾음, 이후 포스터 이미지,줄거리,평점을 TMDB로 부터 요청함
export async function findToMovieName(movieName) {
  console.log("영화 이름 검색 시작:" + movieName);
  const fetch_url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${kobisApiKey}&movieNm=${encodeURIComponent(
    movieName
  )}`;
  return await fetch(fetch_url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let result = data.movieListResult.movieList[0];
      return searchMovieByName(result.movieNm).then((data) => {
        result.TMDB = data;
        return result;
      });
    });
}
export async function findToMovieNameAll(movieName) {
  console.log("인풋과 일치하는 모든 영화 정보를 가져옵니다: " + movieName);
  const fetch_url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${kobisApiKey}&movieNm=${encodeURIComponent(
    movieName
  )}`;

  return await fetch(fetch_url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크가 원활하지 않습니다");
      }
      return response.json();
    })
    .then(async (data) => {
      let results = data.movieListResult.movieList;
      console.log(data);
      for (let index of results) {
        const tmdbData = await searchMovieByName(index.movieNm);
        index.TMDB = tmdbData;
      }

      return results;
    });
}

function addSpace(str) {
  //시리즈물 번호 사이를 띄워주는 함수
  //TMDB의 영화이름 검색은 시리즈물에 포함된 시리즈 번호 앞에 띄워쓰기가 없으면 검색이 안된다..... 쿵푸팬더4=X / 쿵푸팬더 4=O
  if (str.length > 0) {
    const lastChar = str.charAt(str.length - 1);
    if (!isNaN(parseInt(lastChar))) {
      return str.slice(0, -1) + " " + lastChar;
    }
  }
  return str;
}
