var titleInput = $('#title-input-box');
var bodyInput = $('#body-input-box');
var saveButton = $('.save-button');
var searchInput = $('#search-input-box');
var infoSection = $('.information-section');
var titleBodyForm = $('.title-body-form');
var qualityRating = $('.quality-rating');
var ideaBoxCard = $('.idea-box-card');

$(window).on('load', retrievalFromStorage);


function Idea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = quality || 'swill';
}
//purpose for an array to 
saveButton.on('click', generateNewIdea);
function generateNewIdea(event) {
  event.preventDefault();
  var id = Date.now();  
  var newCard = new Idea(titleInput.val(), bodyInput.val(), id);
  localStorage.setItem(id, JSON.stringify(newCard));
  prependCard(newCard);
}

//how to link this function to constructor function  
function prependCard(object) {
   var ideaCard =
  `<article class="idea-box-card" id="${object.id}">
    <header class ="card-header">
      <h2 contenteditable="true">${object.title}
        <span>
          <button class="delete-button"></button>
        </span>
      </h2>
    </header>
    <p contenteditable="true">${object.body}</p>
    <button id="upvote" class="up-arrow-button"></button>
    <button id="downvote" class="down-arrow-button" aria 'label'></button>
    <p class="quality-title">quality: <p class="quality-rating">${object.quality}</p></p>
    <hr>
    </article>`;
    searchInput.after(ideaCard);
}

infoSection.on('click', '.up-arrow-button', function() {
  var upToRating = $(this).closest('.idea-box-card').find('.quality-rating');
  var getObject  = localStorage.getItem(upToRating);
  var parseGetObject = JSON.parse(getObject);
  if (upToRating.text() === 'swill') {
    upToRating.text('plausible');
  } else if (upToRating.text() === 'plausible') {
    upToRating.text('genius');
  }
  updateRatingToStorage();
})

infoSection.on('click', '.down-arrow-button', function() {
  var downToRating = $(this).closest('.idea-box-card').find('.quality-rating'); 
  var getObject = localStorage.getItem(downToRating);
  var parseGetObject = JSON.parse(getObject);
  if (downToRating.text() === 'genius') {  
    downToRating.text('plausible');
  } else if (downToRating.text() === 'plausible') {
    downToRating.text('swill');
  }
})

infoSection.on('click', '.delete-button', function() {
  console.log($(this).parents('.idea-box-card').attr('id'));
  if ($(this).hasClass('delete-button')) {
    $(this).parents('.idea-box-card').remove();
    localStorage.removeItem($(this.parents('.idea-box=card').attr('id')));
  }
})
 // if ($(this).hasClass() === 'delete-button') 
//----------------------------
function sendInfoToStorage(Idea, id, title, ) {
  var stringifyData = json.stringify(newCard)
  localStorage.setItem(object.title, titleInput.val())
}

function retrievalFromStorage() {
  // var newArray = [];
  for(var i = 0; i < localStorage.length; i++) {
    var retrieveStorageData = localStorage.getItem(localStorage.key(i))
    var parseLocalData = JSON.parse(retrieveStorageData);
    prependCard(parseLocalData);
  };
}

searchInput.on("keyup", function(event) {
  event.preventDefault();
  var search = $(this).val();
  // $.extend($.expr[":"], {
  //   "containsIN": function(elem, i, match, array) {
  //     return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  //   }
  // });
  $('h2:containsIN(' + search + ')').closest('.idea-box-card').show();
  $('h2:not(:containsIN(' + search + '))').closest('.idea-box-card').hide();
  $('p:containsIN(' + search + ')').closest('.idea-box-card').show();
});





