// Global Var - Local Storage Array
var ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// Grabs local storage stuff on load. Appends it. Clears inputs.
$(document).ready(function() {
  resetInputs();
  console.log(localStorage);
  appendFromLocalStorage();
});

// Helper functions
appendFromLocalStorage = function() {
  ideaTank.forEach(function (array){
    createIdea(array);
  });
};

function enableSaveButton() {
  $("#save-button").prop('disabled', false)
};

function disableSaveButton() {
  $("#save-button").prop('disabled', true)
};

function resetInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
};

function upvoteButton(quality) {
  switch (quality) {
    case 'swill':
      return 'plausible'
    case 'plausible':
      return 'genius'
    default:
      return 'genius';
  }
};

function downvoteButton(quality) {
  switch (quality) {
    case 'genius':
      return 'plausible'
    case 'plausible':
      return 'swill'
    default:
      return 'swill';
  }
};

// alter value helper, works for quality buttons and inputs
function updateInLocalStorage(id, arrayValue, inputValue) {
  ideaTank.forEach(function (element){
    if(Number(id) === (element).id) {
      element[arrayValue] = inputValue;
      sendToLocalStorage();
    }
  })
};

// Constructor stuff
function newIdeaFactory(title, body){
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
};

function postAndStoreIdea() {
  var titleInput = $('#title-input');
  var bodyInput = $('#body-input');
  var title = titleInput.val();
  var body = bodyInput.val();
  var idea = new newIdeaFactory(title, body);
  createIdea(idea);
  ideaTank.push(idea);
  sendToLocalStorage(idea);
};

sendToLocalStorage = function() {
  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
};

function createIdea(newIdeaFactory) {
  $('.ideas').prepend(
    `<div id=${newIdeaFactory.id} class="new-ideas">
      <div class="idea-header">
        <h2 class ="idea-title" contentEditable="true">${newIdeaFactory.title}
          <button class="delete"></button>
        </h2>
      </div>
      <div class="idea-body">
        <p class="body" contentEditable="true"> ${newIdeaFactory.body}</p>
      </div>
      <div class="footer">
        <button class="up"></button>
        <button class="down"></button>
        <div class="idea-quality"><span tabindex="0">quality:</span> <span tabindex="0" class="quality">${newIdeaFactory.quality}</span></div>
      </div>
    </div>`
)};

// Event Listeners
$('#title-input, #body-input').on('keyup', function(){
  if($('#title-input').val() && $('#body-input').val()){
    enableSaveButton();
  } else {
    disableSaveButton();
  }
});

$('#save-button').on('click', function() {
  postAndStoreIdea();
  disableSaveButton();
  resetInputs();
});


$('.ideas').on('click', '.delete', function() {
  $(this).closest('.new-ideas').remove();
  var divId = $(this).closest('.new-ideas').prop('id')
  for(var i = 0; i < ideaTank.length; i++) {
    if(Number(divId) === ideaTank[i].id){
      ideaTank.splice(i, 1)
      sendToLocalStorage();
    }
  }
});

// code for forEach - which didnt work- would splice the last item in array
//   ideaTank.forEach(function (element) {
//     if(Number(divId) === (element).id){
//       ideaTank.splice(element, 1);
//       console.log(element);
//       sendToLocalStorage();
//     }
//   })
// })

$('.ideas').on('click', '.up', function(){
  var ideaQuality = $(this).closest('.new-ideas').find('.quality')
  var ideaQualityVal = ideaQuality.text();
  var upVotedText = upvoteButton(ideaQualityVal);
  ideaQuality.text(upVotedText);
  var divId = $(this).closest('.new-ideas').prop('id')
  updateInLocalStorage(divId, "quality", upVotedText)
});

$('.ideas').on('click', '.down', function() {
  var ideaQuality = $(this).closest('.new-ideas').find('.quality')
  var ideaQualityVal = ideaQuality.text();
  var downvotedText = downvoteButton(ideaQualityVal);
  ideaQuality.text(downvotedText);
  var divId = $(this).closest('.new-ideas').prop('id')
  updateInLocalStorage(divId, "quality", downvotedText)
});

$('.ideas').on('blur', '.idea-title', function() {
  var ideaTitle = $(this).closest('.idea-title')
  var ideaTitleValue = ideaTitle.text();
  var divId = $(this).closest('.new-ideas').prop('id')
  updateInLocalStorage(divId, "title", ideaTitleValue)
});

$('.ideas').on('blur', '.body', function() {
  var ideaBody = $(this).closest('.body')
  var ideaBodyValue = ideaBody.text();
  var divId = $(this).closest('.new-ideas').prop('id')
  updateInLocalStorage(divId, "body", ideaBodyValue)
});

// Search
var searchInput = $('#live-search-ideas');

searchInput.on('keyup', function(){
  var searchTerm = $(this).val().toLowerCase();
  $('.new-ideas').each(function (index, element) {
    var text = $(element).text().toLowerCase();
    var match = !!text.match(searchTerm);
    $(element).toggle(match);
  })
});
