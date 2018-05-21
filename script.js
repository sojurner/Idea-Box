var titleInput = $('#title-input-box');
var bodyInput = $('#body-input-box');
var saveButton = $('.save-button');
var searchInput = $('#search-input-box');
var infoSection = $('.information-section');
var titleBodyForm = $('.title-body-form');
var arrowUp = $('.up-arrow-button');
var arrowDown = $('.down-arrow-button');
var qualityRating = $('.quality-rating');
var IdeaArray = [];

saveButton.on('click', generateNewIdea);
arrowUp.on('click', ideaEvaluation)
titleBodyForm.on('submit', newIdeaBox);
arrowDown.on('click', downRateIdeaBox);
// infoSection.on('keyup', 'h2, p', function)
// searchInput.addEventListener('input', searchFilter;)

function Idea(title, body, quality, id) {
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
  this.id = id;
}

function generateNewIdea(event) {
  event.preventDefault();
  id = Date.now()  
  newCard = new Idea(titleInput.val(), bodyInput.val());
  prependCard(newCard);
  ideaArray.push(newCard);
  // localStorageUpdate();
}

//how to link this function to constructor function  
function prependCard() {
   var ideaCard =
  `<article class="idea-box-card" id=${newCard.id});
    <h2 contenteditable="true">${newCard.title}<span><button class="delete-button"></button></span></h2>
    <p contenteditable="true">${newCard.body}</p>
    <button id="upvote" class="up-arrow-button"></button>
    <button id="downvote" class="down-arrow-button"></button>
    <p class="quality-title">quality: <p class="quality-rating">${newCard.rating}</p></p>
    <hr>
    </article>`;
    infoSection.prepend(ideaCard);
}

// DO we Need .text?
// function ideaEvaluation() {
// var arrowLink = $(this).attr('class');
// var parentLink = 
// ideaRating.indexOf()
//   captureDown = 
// if (quality === 'swill') {
//     quality.text('plausible')
//   } else if (quality === 'plausible' || quality === 'genius') {
//     quality.text('genius');
// }

// idea-box-card.prototype.downVote = function() {
//   var quality = this.quality; 
//   if (quality === 'genius') {  
//     this.quality.text = 'plausible';
//   } else if (quality === 'plausible' || quality === 'swill') {
//     this.quality = 'swill';
//   }
// }
// function ideaEvaluation () {
//   var cardID = $(this).closest('.idea-box-card').attr('id');
//   var qualityEdit = cardID.find('.quality-rating');
//   if(.cardID === 'upVote') {
// }

// storage



