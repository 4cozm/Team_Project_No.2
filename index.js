//메인 로직을 구현하는 JS 파일입니다
import { test, getTopRated, getDailyRanking, getWeeklyRanking, searchMovie, addPosterToTopRanking }
  from './JS/function.js';

test();
let dailyRanking = []; //일일 랭킹 TOP 10 저장한 변수
await addPosterToTopRanking("day").then((data) => {
  dailyRanking = data;
});
//(약속 , 데이터)


function mainMovie(num) {
  let imagePoster = document.createElement("img");
  imagePoster.setAttribute('src', dailyRanking[num].TMDB.posterUrl);
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
`
  document.querySelector(".moviePoster").appendChild(mainPoster);
};


//함수는 기존있는 내용을 지운다. mainMovie 내부에 원하는 범위의 숫자를 넣어준다(자동으로)
mainMovie(0); //초기 호출

function ScrollMain() { //자동으로 메인 무비를 바꿔주는 함수
  let num = 0;
  setInterval(function () {
    document.querySelector(".moviePoster").innerHTML = ' ';
    document.querySelector(".imgBox").innerHTML = ' ';
    mainMovie(num);
    num++;
    if (num > 3) {
      num = 0;
    };
  }, 5000); // 시간을 ms 단위로 입력하여 바뀌는 시간을 조절
};
ScrollMain();


// let results; //결과 담을 변수 미리 선언
// await getTopRated().then((data) => {
//   results = data;
// });

// console.log(results); //출력
let dailyRanking=[];
await addPosterToTopRanking("day").then((data)=>{
  dailyRanking = data;
});
console.log(dailyRanking);