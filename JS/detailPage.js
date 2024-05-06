const value = document.querySelector("#movieScorePrint");
const input = document.querySelector("#movieScoreInput");
input.addEventListener("input", (event) => { //별추가하는 이벤트
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

reviewButton.addEventListener("click", () => { //평점리뷰를 누르면
  reviewButton.style.backgroundColor = "#D96F66"; //colors.css의 --pinkDark색상으로 현재 버튼색 변경
  infoButton.style.backgroundColor = "white"; //다른버튼은 흰색으로
  document.querySelector(".underInfoForm").style.display="none";
  document.querySelector(".underReviewForm").style.display="";
});
infoButton.addEventListener("click", () => { //주요정보를 누르면
  infoButton.style.backgroundColor = "#D96F66"; //colors.css의 --pinkDark색상으로 현재 버튼색 변경
  reviewButton.style.backgroundColor = "white"; //다른버튼은 흰색으로
  document.querySelector(".underReviewForm").style.display="none";
  document.querySelector(".underInfoForm").style.display="";
});



let searchParams = new URLSearchParams(window.location.search).get('q'); //검색결과를 받아오는 테스트 코드~~
console.log(searchParams);