// Global Var - Local Storage Array
const ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// Grabs local storage stuff on load. Appends it. Clears inputs.
$(document).ready(()=> {
  getLocalStorageThenAppendIt();
  console.log(localStorage)
  resetInputs();
});

// Helper functions
getLocalStorageThenAppendIt = ()=> {
  for (i = 0; i < ideaTank.length; i++) {
    let idea = ideaTank[i];
    createIdea(idea);
  }
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
function alterValueAndStoreIt(id, arrayValue, inputValue) {
  for (i = 0; i < ideaTank.length; i++) {
    if(Number(id) === ideaTank[i].id) {
      ideaTank[i][arrayValue] = inputValue;
      storeNewIdea();
    }
  }
};

// Constructor stuff
function newIdeaFactory(title, body){
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
};

function postAndStoreIdea() {
  let titleInput = $('#title-input');
  let bodyInput = $('#body-input');
  let title = titleInput.val();
  let body = bodyInput.val();
  let idea = new newIdeaFactory(title, body);
  createIdea(idea);
  ideaTank.push(idea);
  storeNewIdea(idea);
};

storeNewIdea = function() {
  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
};

function createIdea(newIdeaFactory) {
  $('.ideas').prepend(
    `<div id=${newIdeaFactory.id} class="new-ideas">
      <div class="idea-header">
        <h2 class ="idea-title" contentEditable="true">${newIdeaFactory.title}
          <button class="delete" aria-label="delete idea"></button>
        </h2>
      </div>
      <div class="idea-body">
        <p class="body" contentEditable="true"> ${newIdeaFactory.body}</p>
      </div>
      <div class="footer">
        <button class="up" aria-label="up vote"></button>
        <button class="down" aria-label="down vote"></button>
        <div class="idea-quality"><span>quality:</span> <span class="quality">${newIdeaFactory.quality}</span></div>
        <button class="completed">Completed Task</button>
      </div>
    </div>`
)};

// Event Listeners
$('#title-input, #body-input').on('keyup', function(){
  let titleInput = $('#title-input').val();
  let bodyInput = $('#body-input').val();
  if(titleInput.length > 0 && bodyInput.length > 0){
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
  for (i = 0; i < ideaTank.length; i++){
    if (Number(divId) === ideaTank[i].id) {
      ideaTank.splice(i, 1);
      storeNewIdea();
    }
  }
});

$('.ideas').on('click', '.down', function() {
  let ideaQuality = $(this).closest('.new-ideas').find('.quality')
  let ideaQualityVal = ideaQuality.text();
  let downvotedText = downvoteButton(ideaQualityVal);
  ideaQuality.text(downvotedText);
  let divId = $(this).closest('.new-ideas').prop('id')
  alterValueAndStoreIt(divId, "quality", downvotedText)
});

$('.ideas').on('click', '.up', function() {
  let ideaQuality = $(this).closest('.new-ideas').find('.quality')
  let ideaQualityVal = ideaQuality.text();
  let upVotedText = upvoteButton(ideaQualityVal);
  ideaQuality.text(upVotedText);
  let divId = $(this).closest('.new-ideas').prop('id')
  alterValueAndStoreIt(divId, "quality", upVotedText)
});

$('.ideas').on('blur', '.idea-title', '.body', function() {
  let ideaTitle = $(this).closest('.idea-title');
  let ideaTitleValue = ideaTitle.text();
  let ideaBody = $(this).closest('.body');
  let ideaBodyValue = ideaBody.text();
  let divId = $(this).closest('.new-ideas').prop('id');
  alterValueAndStoreIt(divId, "title", ideaTitleValue);
  alterValueAndStoreIt(divId, "body", ideaBodyValue);
});

// Search
const searchInput = $('#live-search-ideas');

searchInput.on('keyup', function(){
  let searchTerm = $(this).val().toLowerCase();
  $('.new-ideas').each(function (index, element) {
    let text = $(element).text().toLowerCase();
    let match = !!text.match(searchTerm);
    $(element).toggle(match);
  })
});
