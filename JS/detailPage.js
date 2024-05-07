import { addPosterToTopRanking, findToMovieName } from "../JS/function.js";

const value = document.querySelector("#movieScorePrint");
const input = document.querySelector("#movieScoreInput");
input.addEventListener("input", (event) => {
  //별추가하는 이벤트
  const rating = parseFloat(event.target.value);
  const filledStars = Math.floor(rating);
  const remainingStars = 10 - filledStars;

  let starsHTML = "";

  // 별 채우기
  for (let i = 0; i < filledStars; i++) {
    starsHTML += "★";
  }

  // 빈별 추가
  for (let i = 0; i < remainingStars; i++) {
    starsHTML += "☆";
  }

  // X점 출력
  const ratingText = `${filledStars}점`;

  value.innerHTML = `${starsHTML} ${ratingText}`;
});

const reviewButton = document.querySelector(".underButtonReview"); //평점리뷰 버튼
const infoButton = document.querySelector(".underButtonInfo"); //주요정보 버튼

reviewButton.addEventListener("click", () => {
  //평점리뷰를 누르면
  reviewButton.style.backgroundColor = "#D96F66"; //colors.css의 --pinkDark색상으로 현재 버튼색 변경
  infoButton.style.backgroundColor = "white"; //다른버튼은 흰색으로
  document.querySelector(".underInfoForm").style.display = "none";
  document.querySelector(".underReviewForm").style.display = "";
});
infoButton.addEventListener("click", () => {
  //주요정보를 누르면
  infoButton.style.backgroundColor = "#D96F66"; //colors.css의 --pinkDark색상으로 현재 버튼색 변경
  reviewButton.style.backgroundColor = "white"; //다른버튼은 흰색으로
  document.querySelector(".underReviewForm").style.display = "none";
  document.querySelector(".underInfoForm").style.display = "";
});

let searchParams = new URLSearchParams(window.location.search).get("q"); //검색결과를 받아오는 테스트 코드

let movieData; //searchParams의 영화명을 검색한 영화의 정보가 담기는 구역
findIfNeed();
async function findIfNeed() {
  //검색 결과 쿼리가 있을때 즉시 검색
  if (searchParams) {
    await findToMovieName(searchParams).then((data) => {
      movieData = data;
      displayMovie(movieData);
    });
  }
}

function displayMovie(movieData) { //영화 정보를 삽입하면 화면에 출력하는 함수
  const movieContainer = document.querySelector(".movieContainer");
  let movieInfo = document.createElement("div");
  movieInfo.classList.add("movieInfo");
  let releaseDate = movieData.openDt;
  releaseDate = releaseDate.slice(0, 4) + '년' + releaseDate.slice(4, 6) + '월' + releaseDate.slice(6)+"일";
  movieInfo.innerHTML = `
  <p class="movieTitle" >${movieData.movieNm}</p>
  <p class="movieRelease" >출시일:${releaseDate}</p>
  <p class="movieDirector" >감독:${movieData.directors[0].peopleNm}</p>
  <p class="movieMaker" >제작사:${movieData.companys && movieData.companys[0] ? movieData.companys[0].companyNm : "정보없음"}</p>
  `;
  movieContainer.appendChild(movieInfo);
  let moviePoster = document.createElement("img");
  moviePoster.classList.add("moviePoster");
  moviePoster.setAttribute("src",`${movieData.TMDB.posterUrl}`);
  movieContainer.appendChild(moviePoster);

  const underInfo = document.querySelector(".underInfoForm");
  let newOverView = document.createElement("div");
  newOverView.classList.add("overView");
  newOverView.innerHTML=movieData.TMDB.overView;
  underInfo.appendChild(newOverView);
}

let homeButton = document.querySelector(".home");
homeButton.addEventListener("click",()=>{
  window.location.href = "../index.html";
});