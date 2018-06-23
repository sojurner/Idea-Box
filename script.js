var titleInput = $('#title-input-box');
var bodyInput = $('#body-input-box');
var saveButton = $('.save-button');
var searchInput = $('#search-input-box');
var infoSection = $('.information-section');
var titleBodyForm = $('.title-body-form');
var qualityRating = $('.quality-rating');
var ideaBoxCard = $('.idea-box-card');

$(window).on('load', persistFromStorage);

function persistFromStorage() {
    for(var i = 0; i < localStorage.length; i++) {
      var retrieveStorageData = localStorage.getItem(localStorage.key(i))
      var parseLocalData = JSON.parse(retrieveStorageData);
      prependCard(parseLocalData);
 }
}

function Idea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = quality || 'Swill';
}

titleInput.on('keyup', enableButton);
bodyInput.on('keyup', enableButton);

function enableButton(event) {
  event.preventDefault();
  titleInput.val() === '' || bodyInput.val() === '' ? saveButton.prop('disabled', true) : saveButton.prop('disabled', false)
}

saveButton.on('click', createSendCard);

function createSendCard(event) {
  event.preventDefault();
  var id = Date.now();
  var newCard = new Idea(titleInput.val(), bodyInput.val(), id, null);
  localStorage.setItem(id, JSON.stringify(newCard));
  prependCard(newCard);
  titleInput.val('').focus();
  bodyInput.val('');
};

function prependCard(idea) {
  var ideaCard =
  `<article class="idea-box-card fade-in" id="${idea.id}">
    <header class ="card-header">
      <h2 class="card-title" contenteditable="true">${idea.title}
        <span>
          <button class="delete-button"></button>
        </span>
      </h2>
    </header>
    <p class="idea-content" contenteditable="true">${idea.body}</p>
    <button id="upvote" class="up-arrow-button"></button>
    <button id="downvote" class="down-arrow-button" aria 'label'></button>
    <p class="quality-title">Quality : <p class="quality-rating">${idea.quality}</p></p>
    <hr>
    </article>`;
  infoSection.prepend(ideaCard);
}

infoSection.on('click', ('.up-arrow-button, .down-arrow-button'), changeRating);

function changeRating() {
  var editRating = $(this).closest('.idea-box-card').find('.quality-rating');
  if($(this).hasClass('up-arrow-button')) {
    editRating.text() === 'Swill' ? editRating.text('Plausible') : editRating.text('Genius')
  } else {
    editRating.text() === 'Genius' ? editRating.text('Plausible') : editRating.text('Swill')
  } 
  var id = $(this).closest('article').attr('id');
  var parseLocal = JSON.parse(localStorage.getItem(id));
  parseLocal.quality = editRating.text();
  var setObject = localStorage.setItem(id, JSON.stringify(parseLocal));
}

infoSection.on('blur', ('.card-title, .idea-content'), contentEdit)

function contentEdit() {
  var id = $(this).closest('article').attr('id');
  let parsedLocal = JSON.parse(localStorage.getItem(id));
  let newContent = $(this).text();
  $(this).hasClass('card-title') ? parsedLocal.title = newContent : parsedObject.body = newContent;
  updateLocalStorage = localStorage.setItem(id, JSON.stringify(parsedLocal));
}

infoSection.on('click', '.delete-button', removeCard);

function removeCard() {
  var cardRemoval = $(this).parents('.idea-box-card')
  cardRemoval.fadeOut(500);
  localStorage.removeItem(cardRemoval.attr('id'));
}

searchInput.on('input', searchContent);

function searchContent() {
  var ideaArray = [];
  for(var i = 0; i < localStorage.length; i++) {
    var parseLocalData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    ideaArray.push(parseLocalData);
  };
  filterIdeas(ideaArray);
}

function filterIdeas(ideasArray) {
  var searchIdea = searchInput.val().toUpperCase();
  var filteredIdea = ideasArray.filter(idea => {
    return idea.body.toUpperCase().includes(searchIdea) || idea.title.toUpperCase().includes(searchIdea) 
  })
  infoSection.empty()
  filteredIdea.forEach(function(idea){
    prependCard(idea)
  })
}