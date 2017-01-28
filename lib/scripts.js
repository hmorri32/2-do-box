// Global Var - Local Storage Array
const ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// Grabs local storage stuff on load. Appends it. Clears inputs.
$(document).ready(() => {
  appendFromLocalStorage();
  resetInputs();
});

// Helper functions
function appendFromLocalStorage () {
  ideaTank.forEach(object => {
    createIdea(object);
  });
}

function enableSaveButton() {
  $("#save-button").prop('disabled', false);
}

function disableSaveButton() {
  $("#save-button").prop('disabled', true);
}

function resetInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
}

function upvoteButton(quality) {
  switch (quality) {
    case 'none':
    return 'low';
    case 'low':
    return 'normal';
    case 'normal':
    return 'high';
    case 'high':
    return 'critical';
    default:
    return 'critical';
  }
}

function downvoteButton(quality) {
  switch (quality) {
    case 'critical':
    return 'high';
    case 'high':
    return 'normal';
    case 'normal':
    return 'low';
    case 'low':
    return 'none';
    default:
    return 'none';
  }
}

// This function needs help. Maybe a Find instead of a Foreach
// Something instead of an 'if'

// function updateInLocalStorage(divId, arrayValue, inputValue) {
//   ideaTank.forEach(function(element) {
//     if(element.id === parseInt(divId)) {
//       element[arrayValue] = inputValue;
//       sendToLocalStorage();
//     }
//   });
// }

function updateInLocalStorage(divId, arrayValue, inputValue) {
  let whatever = ideaTank.find(element => element.id === parseInt(divId));
  whatever[arrayValue] = inputValue;
  sendToLocalStorage();
}

// Constructor stuff
function newIdeaFactory(title, body){
  this.title = title;
  this.body = body;
  this.quality = 'normal';
  this.id = Date.now();
}

function postAndStoreIdea() {
  let titleInput = $('#title-input');
  let bodyInput = $('#body-input');
  let title = titleInput.val();
  let body = bodyInput.val();
  let idea = new newIdeaFactory(title, body);
  createIdea(idea);
  ideaTank.push(idea);
  sendToLocalStorage(idea);
}

function sendToLocalStorage() {
  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
}

function createIdea(newIdeaFactory) {
  $('.ideas').prepend(
    `<div id=${newIdeaFactory.id} class="new-ideas">
      <div class="idea-header">
      <button class="delete">X</button>
        <h2 class ="idea-title" contentEditable="true">${newIdeaFactory.title}
        </h2>
      </div>
      <div class="idea-body">
        <p class="body" contentEditable="true"> ${newIdeaFactory.body}</p>
      </div>
      <div class="footer">
        <button aria-label="increase-quality" class="up">↑</button>
        <button aria-label="decrease-quality" class="down">↓</button>
        <div class="idea-quality"><span tabindex="0">importance:</span> <span tabindex="0" class="quality">${newIdeaFactory.quality}</span>
        </div>
        <button aria-label="mark-completed" class="complete">Completed</button>
      </div>
    </div>`
);}

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
  let divId = $(this).closest('.new-ideas').prop('id');
  let newArray = ideaTank.filter(idea => idea.id !== parseInt(divId));
  localStorage.setItem("savedArrayObject", JSON.stringify(newArray));
});


$('.ideas').on('click', '.up', function(){
  let divId = $(this).closest('.new-ideas').prop('id');
  let ideaQuality = $(this).closest('.new-ideas').find('.quality');
  let ideaQualityVal = ideaQuality.text();
  let upVotedText = upvoteButton(ideaQualityVal);
  ideaQuality.text(upVotedText);
  updateInLocalStorage(divId, "quality", upVotedText);
});

$('.ideas').on('click', '.down', function() {
  let divId = $(this).closest('.new-ideas').prop('id');
  let ideaQuality = $(this).closest('.new-ideas').find('.quality');
  let ideaQualityVal = ideaQuality.text();
  let downvotedText = downvoteButton(ideaQualityVal);
  ideaQuality.text(downvotedText);
  updateInLocalStorage(divId, "quality", downvotedText);
});

$('.ideas').on('blur', '.idea-title', function() {
  let divId = $(this).closest('.new-ideas').prop('id');
  let ideaTitle = $(this).closest('.idea-title');
  let ideaTitleValue = ideaTitle.text();
  updateInLocalStorage(divId, "title", ideaTitleValue);
});

$('.ideas').on('blur', '.body', function() {
  let divId = $(this).closest('.new-ideas').prop('id');
  let ideaBody = $(this).closest('.body');
  let ideaBodyValue = ideaBody.text();
  updateInLocalStorage(divId, "body", ideaBodyValue);
});

// Search
const searchInput = $('#live-search-ideas');

searchInput.on('keyup', function(){
  let searchTerm = $(this).val().toLowerCase();
  $('.new-ideas').each(function (index, element) {
    let text = $(element).text().toLowerCase();
    let match = !!text.match(searchTerm);
    $(element).toggle(match);
  });
});
