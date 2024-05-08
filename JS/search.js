import {
  test,
  addPosterToTopRanking,
  findToMovieName,
  findToMovieNameAll,
} from "./function.js";
import { movieList } from "./movieList.js";

starter();
function starter() {
  let search = document.querySelector("#btn_submit");
  search.addEventListener("click", (event) => {
    event.preventDefault();
    const input = document.querySelector(".form-control").value;
    let searchURL = "../HTML/search.html?q=" + input;
    location.href = searchURL;
  });
}



//로고를 눌렀을때 메인페이지로 이동하는 버튼구현
let home = document.querySelector(".logo");
home.addEventListener("click", () => {
  window.location.href = "../index.html";
});

/*전체보기 페이지 Js구현 

1. html, api를 불러와 화면에 출력한다
    api : 오늘의 top, 주간 top 영화
2. 영화 정보는 포스터, 제목, 평점
3. 화면배치 함수를 구현
4. 그 함수가 배열정보를 받으면 자동으로 화면에 요소들을 배치하도록 한다
 */


// 검색버튼 눌러서 영화 포스터 제목 검색하기
// #btn_submit 버튼을 클릭하면 입력받은 데이터를 가져온다
const search = function (){
  let search = document.querySelector("#btn_submit");

  search.addEventListener("click", (event) => {
    event.preventDefault();
    const input = document.querySelector(".form-control").value; 
    process(input, dailyRanking); 
  })
}

//enter 키 눌러서 검색하기 버튼 활성화하기
function enterkey() {
  if (window.event.keyCode == 13) {
    search();
  }
}

let searchResults;
let dailyRanking;
let dailyRankingList = []; //현재 로딩된 모든 요소들을 가지고 있음 ->나중에 sort by 구현시 사용
await addPosterToTopRanking("day").then((data) => {
  dailyRanking = data;
  dailyRankingList.push(data);
  search();
});

console.log(dailyRanking);

function postMovie(movieArray) {
  //화면 출력 함수
  const moiveBox = document.querySelector(".moiveBox");

  movieArray.forEach((index) => {
    const makeMoviePoster = document.createElement("div");
    makeMoviePoster.classList.add("moviePoster", "col");
    makeMoviePoster.innerHTML = `
        <div class="card h-100">
          <img src='${index.TMDB.posterUrl}' class="card-img-top" alt="..." />
          <h5 class="card-title">${index.movieNm}</h5>
          <div class="card-footer">
            <small class="text-body-secondary">${index.TMDB.overView}</small>
          </div>
        </div>
        `;
    moiveBox.appendChild(makeMoviePoster);
  });
}

postMovie(dailyRanking);

let timer;
let referIndex = 1;
let roading = false; //로딩 여부확인 -> 이벤트 중복 등록을 방지하기 위한 변수
const cat = document.querySelector(".loadingCat");
window.onscroll = function () {
  if (roading === false) {
    clearTimeout(timer);
    timer = setTimeout(async function () {
      var windowHeight = window.innerHeight;
      var currentScroll = window.scrollY;
      var totalHeight = document.body.scrollHeight;

      if (currentScroll + windowHeight >= totalHeight) {
        roading = true;
        cat.style.display = "block";
        console.log("로딩중: " + referIndex + "페이지");
        const newMovieNm = movieList(referIndex);
        let nextPage = [];

        // 각각의 비동기 호출을 병렬로 처리
        const promises = newMovieNm.map((index) => findToMovieName(index));

        // 모든 비동기 호출이 완료될 때까지 기다림
        await Promise.all(promises)
          .then((results) => {
            // 결과를 nextPage 배열에 추가
            nextPage = results;
            dailyRankingList.push(results); //현재 로드된 배열정보에 새로운 요소들을 추가함
          })
          .catch((error) => {
            console.error(error);
          });

        // 병렬로 처리된 결과를 postMovie 함수에 전달
        cat.style.display = "none"; //고양이 사라져
        postMovie(nextPage);
        referIndex++;
        roading = false;
      }
    }, 100); // 0.1초간 동작을 기다림
  }
};

// 문자열 바탕으로 정보 호출하기
// 호출한 정보를 표시하기
// 1.오늘의 영화 뜨는거 막기
//1-1. 무슨 기준으로 영화 뜨는걸 막을거냐
//1-2. userParmas 에 값이 있는 경우 -> 기본으로 진행되던 오늘의 영화TOP 함수를 실행 하지 않는다
let searchParams = new URLSearchParams(window.location.search).get("q"); //검색결과를 받아오는 테스트 코드

findIfNeed();

async function findIfNeed() {
  //검색 결과 쿼리가 있을때 즉시 검색
  if (searchParams) {
    console.log("검색어: " + searchParams);

    await findToMovieNameAll(searchParams).then((data) => {
      searchResults = data;
      console.log("search.js 결과:" + searchResults);
      postMovie(searchResults);
    });
  } else {
    postMovie(dailyRanking);
  }
}


/*
검색기능 구현
1. 검색창에 영화 포스터 제목을 쓴다.
2. 검색창을 클릭하면 영화 포스터 제목과 일치하는 전체 영화 정보를 보여준다.
3.사용자에게 input으로 화면에 이미 출력되어 있는 요소들 중 해당 검색결과가 있는지 확인후 해당 array를 새 array에 push()
이후 해당 배열을 화면배치 함수로 전달
 */

// 입력한 영화제목과 불러온  api  데이터와 비교
let process = function (input, movieInformation) {
  const search_arr = [];
  let movieBox = document.querySelector("#cards");
  movieBox.innerHTML = " ";
  console.log(movieInformation);
  movieInformation.forEach(array => {

    // 입력한 영화제목과 불러와야될 영화 제목이 일치하면 영화 정보를 .push 2차 배열로 불러온다
    // 하지만 일치하지 않으면, 그대로 둔다.
    const title = array.movieNm.toLowerCase(); // 소문자로 변환

    if (title.includes(input.toLowerCase())) {
      console.log(array);
      search_arr.push(array);
    }
  })
  console.log(search_arr);
  postMovie(search_arr);
}
