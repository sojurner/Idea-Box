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
  this.quality = quality;
}

saveButton.on('click', function(event) {
  event.preventDefault();
  var id = Date.now();  
  var newCard = new Idea(titleInput.val(), bodyInput.val(), id, 'swill');
  localStorage.setItem(id, JSON.stringify(newCard));
  prependCard(newCard);
});

infoSection.on('click', '.up-arrow-button', function() {
  var upToRating = $(this).closest('.idea-box-card').find('.quality-rating');
  if (upToRating.text() === 'swill') {
    upToRating.text('plausible');
  } else if (upToRating.text() === 'plausible') {
    upToRating.text('genius');
  }
  var setObject = localStorage.setItem(quality, upToRating.text);
  var getObject = localStorage.getItem(quality)
  var parseGetObject = JSON.parse(getObject);
  var stringifyData = JSON.stringify(parseGetObject);
  ///how to 
});

infoSection.on('click', '.down-arrow-button', function() {
  var downToRating = $(this).closest('.idea-box-card').find('.quality-rating'); 
  if (downToRating.text() === 'genius') {  
    downToRating.text('plausible');
  } else if (downToRating.text() === 'plausible') {
    downToRating.text('swill');
  }
  var getObject = localStorage.getItem(downToRating);
  var parseGetObject = JSON.parse(getObject);
  // var stringifyData = JSON.stringify(parseGetObject)
  // localStorage.setItem(downToRating, parseGetObject);
});

infoSection.on('click', '.delete-button', function() {
  if ($(this).hasClass('delete-button')) {
    $(this).parents('.idea-box-card').remove();
  }
  localStorage.removeItem($(this).parents('.idea-box-card').attr('id'))
});

searchInput.on('keyup', function(event) {
  event.preventDefault();
  var search = $(this).val();
  // $.extend($.expr[":"], {
  //   "contains": function(elem, i, match, array) {
  //     return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  //   }
  // });
  $('h2:contains(' + search + ')').closest('.idea-box-card').show();
  $('h2:not(:contains(' + search + '))').closest('.idea-box-card').hide();
  $('p:contains(' + search + ')').closest('.idea-box-card').show();
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
}

function persistFromStorage() {
  for(var i = 0; i < localStorage.length; i++) {
    var retrieveStorageData = localStorage.getItem(localStorage.key(i))
    var parseLocalData = JSON.parse(retrieveStorageData);
    prependCard(parseLocalData);
  }
}

infoSection.on('blur', '.card-title', function() {
  var id = this.closest('article').getAttribute('id')
  var newTitle = $(this).text();
  var retrieveObject = localStorage.getItem(id)
  var parsedObject = JSON.parse(retrieveObject);
  parsedObject.title = newTitle;
  prependCard(parsedObject.title);
//------
})

// infoSection.on('blur', '.idea-content', function() {
//   var id = $(this).closest('article').getAttribute('id')
//   var newBody = $(this).text();
//   var retrieveObject = localStorage.getItem(id)
//   var parsedObject = JSON.parse(retrieveObject);
//   parsedObject.body = newTitle;
//   prependCard(parsedObject.body)
// //------
// })







