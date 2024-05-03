const value = document.querySelector("#movieScorePrint");
const input = document.querySelector("#movieScoreInput");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});