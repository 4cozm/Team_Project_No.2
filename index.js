//메인 로직을 구현하는 JS 파일입니다
import { test, addPosterToTopRanking } from "./JS/function.js";

test();

let dailyRanking = [];
await addPosterToTopRanking("day").then((data) => {
  dailyRanking = data;
});
function mainMovie(num) {
  let imagePoster = document.createElement("img");
  imagePoster.setAttribute("src", dailyRanking[num].TMDB.posterUrl);
  document.querySelector(".imgBox").appendChild(imagePoster);

  let mainPoster = document.createElement("div");
  mainPoster.classList.add("moviePoster");
  mainPoster.innerHTML = `
<h1 class="posterTitle">${dailyRanking[num].movieNm}</h1>
      <!--02_2 영화 연령고지, 개봉년도-->
      <div class="ageYearReview">
        <div class="ageYear">
          <img class="ageImg" src="image/age/01_ALL.png" alt="연령고지 이미지">
          <span class="movieYear">${dailyRanking[num].openDt}</span>
        </div>
        <p class="movieReview"><i class='bx bxs-star'></i>${dailyRanking[num].TMDB.voteAverage}</p>
      </div>
`;
  document.querySelector(".moviePoster").appendChild(mainPoster);
}

let weekRanking = []; //이번주 영화 TOP 10
await addPosterToTopRanking("week").then((data) => {
  weekRanking = data;
});

mainMovie(0); //초기 호출

function ScrollMain() {
  //자동으로 메인 무비를 바꿔주는 함수
  let num = 0;
  setInterval(function () {
    document.querySelector(".moviePoster").innerHTML = " ";
    document.querySelector(".imgBox").innerHTML = " ";
    mainMovie(num);
    num++;
    if (num > 3) {
      num = 0;
    }
  }, 5000); // 시간을 ms 단위로 입력하여 바뀌는 시간을 조절
}
ScrollMain();

function displayTodayTop() {
  let todayMovieBox = document.querySelector(".todayMovie");
  dailyRanking.forEach((index) => {
    let today = document.createElement("div");
    today.classList.add(".todayMoviePoster");
    today.innerHTML = `
        <img class="todayMoviePoster" src="${index.TMDB.posterUrl}">
        <div class="todayMovieTitle">${index.movieNm}</div> `;
    todayMovieBox.appendChild(today);
  });
}
displayTodayTop();

function displayWeekTop() {
  let weekMovieBox = document.querySelector(".weekMovie");
  weekRanking.forEach((index) => {
    let week = document.createElement("div");
    week.classList.add(".weekMoviePoster");
    week.innerHTML = `
        <img class="weekMoviePoster" src=${index.TMDB.posterUrl}>
        <div class="weekMovieTitle">${index.movieNm}</div>
        `;
    weekMovieBox.appendChild(week);
  });
}
displayWeekTop();
