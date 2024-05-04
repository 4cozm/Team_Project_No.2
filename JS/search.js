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



import { test,getDailyRanking,getWeeklyRanking,searchMovie }
from './function.js';

test();

let dailyRanking;
await getDailyRanking().then(data => {
    dailyRanking=data;
    postMovie(dailyRanking);
  });
console.log(dailyRanking);


function postMovie (movieArray){ //화면 출력 함수
    const moiveBox = document.querySelector('.moiveBox');

    movieArray.forEach((array)=>{
        const makeMoviePoster = document.createElement("div");
        makeMoviePoster.classList.add("moviePoster","col");
        makeMoviePoster.innerHTML=`
        <div class="card h-100">
          <img src='${"?"}' class="card-img-top" alt="..." />
          <h5 class="card-title">${array.movieNm}</h5>
          <div class="card-footer">
            <small class="text-body-secondary">${"몰루"}</small>
          </div>
        </div>
        `
        moiveBox.appendChild(makeMoviePoster);
    });
    };