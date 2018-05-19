var titleInput = document.querySelector('#title-input-box');
var bodyInput = document.querySelector('#body-input-box');
var saveButton = document.querySelector('.save-button');
var searchInput = document.querySelector('#search-input-box');
var informationSection = document.querySelector('.information-section');
var titleBodyForm = document.querySelector('.title-body-form');
var arrowUp = document.querySelector('.up-arrow-button');
var arrowDown = document.querySelector('.down-arrow-button');
var qualityRating = document.querySelector('.quality-rating');


saveButton.addEventListener('click', newIdeaBox);
titleBodyForm.addEventListener('submit', newIdeaBox);
arrowUp.addEventListener('click', upRateIdeaBox);
// searchInput.addEventListener('input', searchFilter;)

function newIdeaBox(event) {
  event.preventDefault()
  var createBox = document.createElement('article');
    createBox.setAttribute('class', 'idea-box');
    createBox.innerHTML =
    `<h2>${titleInput.value}<span><button class="delete-button"></button></span></h2>
    <p>${bodyInput.value}</p>
    <button class="up-arrow-button">up</button>
    <button class="down-arrow-button">down</button>
    <p class="quality-title">quality: <p class="quality-rating">swill</p></p>`
    console.log ('hello');
  informationSection.prepend(createBox);
}

function upRateIdeaBox(event) {
  if (event.qualityRating.value = qualityRating.value) {
    qualityRating.innerText = 'plausible'
  }
  else if (qualityRating.value = 'plausible') {
    qualityRating.innerText = 'genius'
  }
  else if (qualityRating.value = 'genius') {
    qualityRating.innerText = 'genius';
  }
}

function downRateIdeaBox() {
  if (qualityRating.value = 'genius') {
    qualityRating.innerText = 'plausible'
  }
  if (qualityRating.value = 'plausible') {
    qualityRating.innerText = 'swill'
  }
  if (qualityRating.value = 'swill') {
    qualityRating.innerText = 'swill';
  }
}

