var titleInput = $('#title-input-box');
var bodyInput = $('#body-input-box');
var saveButton = $('.save-button');
var searchInput = $('#search-input-box');
var infoSection = $('.information-section');
var titleBodyForm = $('.title-body-form');
var qualityRating = $('.quality-rating');
var ideaArray = [];

saveButton.on('click', generateNewIdea);
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
function prependCard(object) {
   var ideaCard =
  `<article class="idea-box-card" id=${object.id});
    <h2 contenteditable="true">${object.title}<span><button class="delete-button"></button></span></h2>
    <p contenteditable="true">${object.body}</p>
    <button id="upvote" class="up-arrow-button"></button>
    <button id="downvote" class="down-arrow-button"></button>
    <p class="quality-title">quality: <p class="quality-rating">${object.quality}</p></p>
    <hr>
    </article>`;
    infoSection.prepend(ideaCard);
}

// DO we Need .text?
infoSection.on('click', '.up-arrow-button', function() {
  var upToRating = $(this).closest('.idea-box-card').find('.quality-rating');
  // var id = $(this).closest('.idea-box-card')[0].id;
  // upratingStore(id, qualityRating.text()) 
  if (upToRating.text() === 'swill') {
    upToRating.text('plausible');
  } else if (upToRating.text() === 'plausible') {
    upToRating.text('genius');
  }
  console.log('hello')
})

infoSection.on('click', '.down-arrow-button', function() {
  var downToRating = $(this).closest('.idea-box-card').find('.quality-rating'); 
  // var id = $(this).closest('.idea-box-card')[0].id
  // downRatingStore(id, qualityRating.text())
  if (downToRating.text() === 'genius') {  
    downToRating.text('plausible');
  } else if (downToRating.text() === 'plausible') {
    downToRating.text('swill');
  }
})

infoSection.on('click', '.delete-button', function() {
  if ($(this).hasClass('delete-button')) {
    $(this).parents('.idea-box-card').remove();
  }
})


 // if ($(this).hasClass() === 'delete-button') 

