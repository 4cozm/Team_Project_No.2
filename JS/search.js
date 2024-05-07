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

/*
검색기능 구현
1. 검색창에 영화 포스터 제목을 쓴다.
2. 검색창을 클릭하면 영화 포스터 제목과 일치하는 전체 영화 정보를 보여준다.
3.사용자에게 input으로 화면에 이미 출력되어 있는 요소들 중 해당 검색결과가 있는지 확인후 해당 array를 새 array에 push()
이후 해당 배열을 화면배치 함수로 전달
 */

import { test, addPosterToTopRanking, findToMovieName } from "./function.js";
import { movieList } from "./movieList.js";

test();

let dailyRanking;
let dailyRankingList = [];
await addPosterToTopRanking("day").then((data) => {
  dailyRanking = data;
  dailyRankingList.push(data);
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
let roading = false;
const cat = document.querySelector(".loadingCat")
window.onscroll = function () {
  if (roading === false) {
    clearTimeout(timer);
    timer = setTimeout(async function () {
      var windowHeight = window.innerHeight;
      var currentScroll = window.scrollY;
      var totalHeight = document.body.scrollHeight;

      if (currentScroll + windowHeight >= totalHeight) {
        roading = true;
        cat.style.display="block";
        console.log("로딩중: " + referIndex + "페이지");
        const newMovieNm = movieList(referIndex);
        let nextPage = [];

        // 각각의 비동기 호출을 병렬로 처리합니다.
        const promises = newMovieNm.map(index => findToMovieName(index));

        // 모든 비동기 호출이 완료될 때까지 기다립니다.
        await Promise.all(promises)
          .then(results => {
            // 결과를 nextPage 배열에 추가합니다.
            nextPage = results;
          })
          .catch(error => {
            console.error(error);
          });

        // 병렬로 처리된 결과를 postMovie 함수에 전달합니다.
        cat.style.display="none";
        postMovie(nextPage);
        referIndex++;
        roading = false;
      }
    }, 100); // 0.1초간 동작을 기다립니다.
  }
};
