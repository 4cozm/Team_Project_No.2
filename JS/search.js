import { test, addPosterToTopRanking, findToMovieNameAll} from "./function.js";

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

//로고를 눌렀을때 메인페이지로 이동하는 버튼구현
let home = document.querySelector(".logo");
home.addEventListener("click", () => {
  window.location.href = "../index.html";
});



test();
let searchResults;
let dailyRanking;
await addPosterToTopRanking("day").then((data) => {
  dailyRanking = data;
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
      console.log("검색어: "+searchParams);
      
      await findToMovieNameAll(searchParams).then((data)=>{
        searchResults = data;
        console.log("search.js 결과:"+searchResults);
        postMovie(searchResults);
      });
  } else{
    postMovie(dailyRanking);
  }
};
