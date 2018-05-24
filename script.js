var titleInput = $('#title-input-box');
var bodyInput = $('#body-input-box');
var saveButton = $('.save-button');
var searchInput = $('#search-input-box');
var infoSection = $('.information-section');
var titleBodyForm = $('.title-body-form');
var qualityRating = $('.quality-rating');
var ideaBoxCard = $('.idea-box-card');

$(window).on('load', persistFromStorage);

function Idea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = quality || 'swill';
}

titleInput.on('input', function() {
  if ($(this) !== '') {
    saveButton.removeAttr('disabled')
  } 
})

saveButton.on('click', function(event) {
  event.preventDefault();
  var id = Date.now();  
  var newCard = new Idea(titleInput.val(), bodyInput.val(), id, null);
  localStorage.setItem(id, JSON.stringify(newCard));
  prependCard(newCard);
});

function prependCard(object) {
  var ideaCard =
  `<article class="idea-box-card" id="${object.id}">
    <header class ="card-header">
      <h2 class="card-title" contenteditable="true">${object.title}
        <span>
          <button class="delete-button"></button>
        </span>
      </h2>
    </header>
    <p class="idea-content" contenteditable="true">${object.body}</p>
    <button id="upvote" class="up-arrow-button"></button>
    <button id="downvote" class="down-arrow-button" aria 'label'></button>
    <p class="quality-title">quality: <p class="quality-rating">${object.quality}</p></p>
    <hr>
    </article>`;
  searchInput.after(ideaCard);
};

function persistFromStorage() {
  for(var i = 0; i < localStorage.length; i++) {
    var retrieveStorageData = localStorage.getItem(localStorage.key(i))
    var parseLocalData = JSON.parse(retrieveStorageData);
    prependCard(parseLocalData);
  }
}

infoSection.on('click', '.up-arrow-button', function() {
  var upToRating = $(this).closest('.idea-box-card').find('.quality-rating');
  if (upToRating.text() === 'swill') {
    upToRating.text('plausible');
  } else if (upToRating.text() === 'plausible') {
    upToRating.text('genius');
  }
  var id = $(this).closest('article').attr('id')
  var getObject = localStorage.getItem(id);
  var parseObject = JSON.parse(getObject);
  var updateRating = upToRating.text();
  parseObject.quality = updateRating;
  var stringifyData = JSON.stringify(parseObject);
  var setObject = localStorage.setItem(id, stringifyData);
});

infoSection.on('click', '.down-arrow-button', function() {
  var downToRating = $(this).closest('.idea-box-card').find('.quality-rating'); 
  if (downToRating.text() === 'genius') {  
    downToRating.text('plausible');
  } else if (downToRating.text() === 'plausible') {
    downToRating.text('swill');
  }
  var id = $(this).closest('article').attr('id')
  var getObject = localStorage.getItem(id);
  var parseObject = JSON.parse(getObject);
  var updateRating = downToRating.text();
  parseObject.quality = updateRating;
  var stringifyData = JSON.stringify(parseObject);
  var setObject = localStorage.setItem(id, stringifyData);
});

infoSection.on('blur', '.card-title', function() {
  var id = $(this).closest('article').attr('id')
  var retrieveObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrieveObject);
  var newTitle = $(this).text();
  parsedObject.title = newTitle;
  var stringifyObject = JSON.stringify(parsedObject)
  var updateLocalStorage = localStorage.setItem(id, stringifyObject);
});

infoSection.on('blur', '.idea-content', function() {
  var id = $(this).closest('article').attr('id')
  var retrieveObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrieveObject);
  var newBody = $(this).text();
  parsedObject.body = newBody;
  var stringifyObject = JSON.stringify(parsedObject)
  var updateLocalStorage = localStorage.setItem(id, stringifyObject);
});

infoSection.on('click', '.delete-button', function() {
  if ($(this).hasClass('delete-button')) {
    $(this).parents('.idea-box-card').remove();
  }
  localStorage.removeItem($(this).parents('.idea-box-card').attr('id'));
});

searchInput.on('keyup', function() {
  var search = $(this).val();
  // $.extend($.expr[":"], {
  //   "contains": function(elem, i, match, array) {
  //     return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  //   }
  // });
  $('h2:contains(' + search + ')').closest('.idea-box-card').show();
  $('h2:not(:contains(' + search + '))').closest('.idea-box-card').hide();
  $('p:contains(' + search + ')').closest('.idea-box-card').show();
  $('p:not(:contains(' + search + ')').closest('.idea-box-card').hide();
});

searchInput.on('blur', function(event) {
  location.reload(event);
});











