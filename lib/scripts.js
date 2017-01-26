// Global Var - Local Storage Array
const ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// Grabs local storage stuff on load. Appends it. Clears inputs.
$(document).ready(() => {
  console.log(localStorage);
  appendFromLocalStorage();
  resetInputs();
});

// Helper functions
function appendFromLocalStorage () {
  ideaTank.forEach(object => {
    createIdea(object);
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
    case 'none':
    return 'low'
    case 'low':
    return 'normal'
    case 'normal':
    return 'high'
    case 'high':
    return 'critical'
    default:
    return 'critical';
  }
};

function downvoteButton(quality) {
  switch (quality) {
    case 'critical':
    return 'high'
    case 'high':
    return 'normal'
    case 'normal':
    return 'low'
    case 'low':
    return 'none'
    default:
    return 'none';
  }
};

// alter value helper, works for quality buttons and inputs
function updateInLocalStorage(divId, arrayValue, inputValue) {
  ideaTank.forEach(element => {
    if(Number(divId) === (element).id) {
      element[arrayValue] = inputValue;
      sendToLocalStorage();
    }
  })
};


// Constructor stuff
function newIdeaFactory(title, body){
  this.title = title;
  this.body = body;
  this.quality = 'none';
  this.id = Date.now();
};

function postAndStoreIdea() {
  const titleInput = $('#title-input');
  const bodyInput = $('#body-input');
  const title = titleInput.val();
  const body = bodyInput.val();
  const idea = new newIdeaFactory(title, body);
  createIdea(idea);
  ideaTank.push(idea);
  sendToLocalStorage(idea);
};

function sendToLocalStorage() {
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
        <div class="idea-quality"><span tabindex="0">importance:</span> <span tabindex="0" class="quality">${newIdeaFactory.quality}</span></div>
      </div>
    </div>`
)};

// Event Listeners
$('#title-input, #body-input').on('keyup', () => {
  if($('#title-input').val() && $('#body-input').val()){
    enableSaveButton();
  } else {
    disableSaveButton();
  }
});

$('#save-button').on('click', () => {
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

// Doesnt work. Deletes everything.
// $('.ideas').on('click', '.delete', function() {
//   $(this).closest('.new-ideas').remove();
//   var divId = $(this).closest('.new-ideas').prop('id')
//   ideaTank.forEach(function (element){
//     ideaTank.find(function(divId){
//       ideaTank.splice(divId, 1);
//       sendToLocalStorage();
//     })
//   })
// });

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
const searchInput = $('#live-search-ideas');

searchInput.on('keyup', function(){
  var searchTerm = $(this).val().toLowerCase();
  $('.new-ideas').each(function (index, element) {
    var text = $(element).text().toLowerCase();
    var match = !!text.match(searchTerm);
    $(element).toggle(match);
  })
});
