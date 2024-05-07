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

import { test, addPosterToTopRanking } from "./function.js";

test();

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


let dailyRanking;
await addPosterToTopRanking("day").then((data) => {
  dailyRanking = data;
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
