import {
  addPosterToTopRanking,
  findToMovieName,
  youtubeLink,
} from "../JS/function.js";

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
  document.querySelector(".youtube").style.display = "none";
  document.querySelector(".underReviewForm").style.display = "";
});
infoButton.addEventListener("click", () => {
  //주요정보를 누르면
  infoButton.style.backgroundColor = "#D96F66"; //colors.css의 --pinkDark색상으로 현재 버튼색 변경
  reviewButton.style.backgroundColor = "white"; //다른버튼은 흰색으로
  document.querySelector(".underReviewForm").style.display = "none";
  document.querySelector(".underInfoForm").style.display = "";
  document.querySelector(".youtube").style.display = "";
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
    await youtubeLink(searchParams).then((data) => {
      let preview = document.querySelector(".youtube");
      preview.setAttribute("src", data);
    });
  }
}

function displayMovie(movieData) {
  //영화 정보를 삽입하면 화면에 출력하는 함수
  const movieContainer = document.querySelector(".movieContainer");
  let movieInfo = document.createElement("div");
  movieInfo.classList.add("movieInfo");
  let releaseDate = movieData.openDt;
  releaseDate =
    releaseDate.slice(0, 4) +
    "년" +
    releaseDate.slice(4, 6) +
    "월" +
    releaseDate.slice(6) +
    "일";
  movieInfo.innerHTML = `
  <p class="movieTitle" >${movieData.movieNm}</p>
  <p class="movieRelease" >출시일:${releaseDate}</p>
  <p class="movieDirector" >감독:${movieData.directors[0].peopleNm}</p>
  <p class="movieMaker" >제작사:${
    movieData.companys && movieData.companys[0]
      ? movieData.companys[0].companyNm
      : "정보없음"
  }</p>
  `;
  movieContainer.appendChild(movieInfo);
  let moviePoster = document.createElement("img");
  moviePoster.classList.add("moviePoster");
  moviePoster.setAttribute("src", `${movieData.TMDB.posterUrl}`);
  movieContainer.appendChild(moviePoster);

  const underInfo = document.querySelector(".underInfoForm");
  let newOverView = document.createElement("div");
  newOverView.classList.add("overView");
  newOverView.innerHTML = movieData.TMDB.overView;
  underInfo.appendChild(newOverView);
}

let homeButton = document.querySelector(".home");
homeButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});



// 예상 사용처 : 리뷰저장, 리뷰수정
// scanData : 입력창에 입력된 데이터 로드
function scanData() {
  let Review = {
    Name: document.querySelector("#floatingTextareaName").value,
    Password: document.querySelector("#floatingPassword").value,
    PasswordConfirm: document.querySelector("#floatingPasswordConfirm").value,
    Rating: document.querySelector("#movieScoreInput").value,
    Point: document.querySelector("#floatingTextareaPoint").value,
  };

  return Review;
}

// 예상 사용처 : 리뷰저장, 리뷰수정
// getData : localStorage에서 데이터 로드
function getData(MovieName) {
  let datas = [];
  datas = JSON.parse(localStorage.getItem(MovieName)) || [];
  return datas;
}

// 예상 사용처 : 리뷰저장, 리뷰수정
// saveData : localStorage에 데이터 저장/추가
function saveData(Recv) {
  const movieName = searchParams;
  const today = new Date();
  const date =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay();

  let send = {};
  send.Name = Recv.Name;
  send.password = Recv.Password;
  send.Rating = Recv.Rating;
  send.Point = Recv.Point;
  send.Date = date;

  let saved = [];
  saved = JSON.parse(localStorage.getItem(movieName)) || [];
  if (!saved) {
    localStorage.setItem(movieName, JSON.stringify(send));
    return;
  }
  saved.push(send);
  localStorage.setItem(movieName, JSON.stringify(saved));
  location.reload();
}

// 리뷰작성탭 리뷰저장버튼 클릭시,
// 입력한 데이터를 불러와 준비한뒤 localStorage로 저장
const saveButton = document.querySelector("#saveReview");
saveButton.addEventListener("click", () => {
  const data = scanData();

  // 비밀번호와 확인 일치여부 확인
  if (data.Password !== data.PasswordConfirm) {
    alert("비밀번호가 확인과 일치하지 않습니다");
  } else if (!validatePassword(data.Password)) {
    alert(
      "비밀번호는 최소 8자 이상이어야 하며 숫자, 대소문자, 특수문자를 포함해야 합니다"
    );
  } else {
    // 일치하고 유효한 경우 리뷰 데이터 저장
    console.log("데이터 유효함 저장실시" + data);
    saveData(data);
  }
});

// 비밀번호 유효성을 검사하는 함수 테스트 끝나면 활성화
function validatePassword(password) {
  // 비밀번호의 최소 길이 설정
  // const minLength = 8;
  // // 최소 길이 조건 검사
  // if (password.length < minLength) {
  //   return false;
  // }
  // // 숫자 포함 여부 검사
  // if (!/\d/.test(password)) {
  //   return false;
  // }
  // // 대문자 포함 여부 검사
  // if (!/[A-Z]/.test(password)) {
  //   return false;
  // }
  // // 소문자 포함 여부 검사
  // if (!/[a-z]/.test(password)) {
  //   return false;
  // }
  // // 특수문자 포함 여부 검사
  // if (!/[!@#$%^&*]/.test(password)) {
  //   return false;
  // }
  return true;
}

// 리뷰카드 생성함수
function setReviewCard(DATAS) {
  // 리뷰카드 리스트 초기화
  const reviewList = document.querySelector(".underReviewContainer");
  reviewList.innerHTML = "";

  let count = 0;
  DATAS.forEach((data) => {
    let card_html = `
    <div class="underReview">
      <div id="card_top">
        <p class="R_nickname">${data["Name"]}</p>
        <p class="R_score">${data["Rating"]}</p>
        <p class="R_comment">${data["Point"]}</p>
      </div>
      <br />
      <div id="card_bottom">
        <div class="col align-self-start">
          <p class="R_date">${data["Date"]}</p>
        </div>
        <div class="col align-self-end">
          <button type="button" class="updateButton btn btn-primary" value="${count}" data-bs-toggle="modal" data-bs-target="#updateModal">수정</button>
        </div>
        <div class="col align-self-end">
          <button type="button" class="deleteButton btn btn-danger" value="${count}" data-bs-toggle="modal" data-bs-target="#deleteModal">삭제</button>
        </div>
      </div>
    </div>
    `;

    reviewList.insertAdjacentHTML("afterbegin", card_html);
    count++;
  });
  bindButton(); //로드가 끝나면 수정,삭제 버튼을 일괄적으로 등록
}

// ----- 여기까지는 잘 됨 -----


//삭제 수정버튼의 이벤트를 등록해주는 함수 맨 아래 window.onload에서 작동함
function bindButton() {
  let upBtn = document.querySelectorAll(".updateButton");
  let delBtn = document.querySelectorAll(".deleteButton");
  upBtn.forEach((index) => {
    index.addEventListener("click", (event) => {
      const value = event.target.value;
      console.log("수정버튼눌림" + value);
    });
  });
  delBtn.forEach((index) => {
    index.addEventListener("click", (event) => {
      const value = event.target.value;
      console.log("삭제버튼 눌림" + value);
    });
  });
}


let Recv_DATAS = [];
// 페이지 로드시 수행
window.onload = function () {
  Recv_DATAS = getData(searchParams);
  if (Recv_DATAS.length !== 0) {
    setReviewCard(Recv_DATAS);
    console.log("데이터 불러옴");
    //데이터가 존재하면 삭제 수정버튼을 각각 등록한다
  } else {
    console.log("데이터를 찾지 못했습니다");
  }
  //
};
