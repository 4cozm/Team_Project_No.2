//공통으로 사용할 기능을 구현하는 JS 파일입니다.
export function test() {
  console.log("function.js의 test 메서드와 연결이 잘 되었습니다");
}
const apiKey = "5fa425f3aa4cb48d2b6a9c372404cc24"; //TMDB API KEY
const googleApikey = "AIzaSyAbpGHHJR1pWCdRA8amhHXSG6Zt7br3y50"; //google custom search API KEY
const searchEngineID = "e6605cbb614a4422a"; //구글 검색 엔진 ID
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
console.log(getTopRated());
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
      res = data.boxOfficeResult.weeklyBoxOfficeList;
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

//영화이름을 기준으로 검색한뒤 포스터URL,평점,줄거리를 추가해줌 추가한 데이터는 TMDB.poster_path / TMDB.vote_average / TMDB.overView로 접근가능
async function searchMovieByName(movieName) {
  let posterUrl, voteAverage, overView;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        movieName
      )}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    posterUrl =
      "https://image.tmdb.org/t/p/w500/" + data.results[0].poster_path;
    if (data.results[0].poster_path == null) {
      throw new Error("TMDB사이트에 이미지정보가 null인것을 감지했습니다");
    }
  } catch (error) {
    console.error("TMDB에서 사진을 가지고 오는데 실패했습니다:", error);
    try {
      const altPoster = await altSearchPoster(movieName);
      posterUrl = altPoster;
    } catch (altError) {
      console.error(
        "대체 이미지를 가져오는 코드를 시행하던중 문제발생:",
        altError
      );
    }
  }

  try {
    // 두 번째 요청에서 평점 정보를 가져옴
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        movieName
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    voteAverage = data.results[0].vote_average;
  } catch (error) {
    console.error("TMDB에서 평점을 가지고 오는데 실패했습니다:", error);
    voteAverage = "평가없음";
  }

  try {
    // 세번째 요청에서 줄거리 정보를 가져옴
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        movieName)+"&language=ko-KR"}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    overView = data.results[0].overview;
  } catch (error) {
    console.error("TMDB에서 줄거리를 가지고 오는데 실패했습니다:", error);
    overView = "줄거리 없음";
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
    encodeURIComponent(movieName + "포스터 나무위키") +
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
// 이미지 검색을 요청하는 URL 생성

// fetch를 사용하여 이미지 검색 API 호출
console.log(getDailyRanking());