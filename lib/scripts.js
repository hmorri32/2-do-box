// Global - Local Storage Array
const ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// Grabs local storage stuff on load. Appends it. Clears inputs.
$(document).ready(() => {
  appendFromLocalStorage();
  resetInputs();
  countInputCharacter();
});

// Helper functions
function appendFromLocalStorage () {
  ideaTank.forEach(object => {
    if(object.completed !== true ) {
      createIdea(object);
    }
  })
};

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

function resetCharacterCount(){
  $('#title-input-feedback').html('');
  $('#body-input-feedback').html('')
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
  // var qualityArray[
  //   "critical",
  //   "high"
  //   ...
  // ]
  //
  // var index = qualityArray.indexOf(quality);
  // return qualityArray(index - 1)
  //
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

function sendToLocalStorage() {
  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
}

function updateInLocalStorage(divId, arrayValue, inputValue, completed) {
  let whatever = ideaTank.find(element => element.id === parseInt(divId));
  whatever[arrayValue] = inputValue;
  sendToLocalStorage();
}

function countInputCharacter() {
  const text_max = 120;

  $('#title-input').keyup(() => {
    let text_length = $('#title-input').val().length;
    let text_remaining = text_max - text_length;
    $('#title-input-feedback').html(`Title: ${text_remaining}`);
  })

  $('#body-input').keyup(() => {
    let textLength = $('#body-input').val().length;
    let textRemaining = text_max - textLength;
    $('#body-input-feedback').html(`Task: ${textRemaining}`)
  })
};

// Constructor stuff
function newIdeaFactory(title, body){
  this.title = title;
  this.body = body;
  this.quality = 'normal';
  this.id = Date.now();
  this.completed = false;
}

function postIdea() {
  let title = $('#title-input').val();
  let body = $('#body-input').val();
  let idea = new newIdeaFactory(title, body);
  createIdea(idea);
  ideaTank.push(idea);
  sendToLocalStorage(idea);
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
  postIdea();
  disableSaveButton();
  resetInputs();
  resetCharacterCount();
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

$('.ideas').on('click', '.complete', function(){
  let divId = $(this).closest('.new-ideas').prop('id');
  let thisDiv = $(this).closest('.new-ideas').addClass("completed");

  for(let i = 0; i < ideaTank.length; i++){
    if(Number(divId) === ideaTank[i].id){
      ideaTank[i].completed = true;
      sendToLocalStorage();
    }
  }
});

const showComplete = $('#show-completed')
showComplete.on('click', function(){
  ideaTank.forEach(object => {
    if(object.completed === true){
      createIdea(object)
      $('#' + object.id).addClass('completed')
      $("#show-completed").prop('disabled', true);
    }
  })
})

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



$(".show-more a").on("click", function() {
  let $this = $(this);
  let content = $('.ideas');
  let linkText = $this.text();

  if(linkText == "Show more"){
    linkText = "Show less";
    content.toggleClass("showContent")
    content.removeClass("hide-content")
  } else {
    linkText = "Show more";
    content.toggleClass("showContent")
    content.addClass("hide-content")
  }
  $this.text(linkText)
});
