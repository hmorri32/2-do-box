var ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// grabs local storage on load. Persisting.
$(document).ready(function() {
  getLocalStorageThenAppendIt();
  console.log(localStorage);
});

getLocalStorageThenAppendIt = function() {
  // var persist = JSON.parse(localStorage.getItem("savedArrayObject"));
  // if (ideaTank) {
    for (i = 0; i < ideaTank.length; i++) {
      var idea = ideaTank[i];
      createIdea(idea);
    }
  // }
};

// functions to enable/disable the save button/ clear inputs
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

// keyup on input fields to enable save button
$('#title-input, #body-input').on('keyup', function(){
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();
  if(titleInput.length >= 1 && bodyInput.length >= 1){
    enableSaveButton();
  } else {
    disableSaveButton();
  }
});

// event listener on save btn
$('#save-button').on('click', function() {
  postAndStoreIdea();
  disableSaveButton();
  resetInputs();
});

// Delete button
$('.ideas').on('click', '.delete', function(e) {
  $(e.target).closest('.new-ideas').remove();

  var id = $(this).closest('.new-ideas').prop('id')
  var storedArray = JSON.parse(localStorage.getItem('savedArrayObject'))
  for (i = 0; i < storedArray.length; i++) {
    if (Number(id) === storedArray[i].id){
      storedArray.splice(i,i);
      localStorage.setItem('savedArrayObject', JSON.stringify(storedArray));
    }
    // if 0 items, local storage clear or whatever
}});

// Upvote button
$('.ideas').on('click', '.up', function() {
var closestQuality = $(this).closest('.new-ideas').find('.quality')
var closestQualityVal = closestQuality.text();
var upvotedText = upvoteButton(closestQualityVal);
closestQuality.text(upvotedText);

var id = $(this).closest('.new-ideas').prop('id')
var storedArray = JSON.parse(localStorage.getItem('savedArrayObject'))
for (i = 0; i < storedArray.length; i++) {
  if(Number(id) === storedArray[i].id){
    storedArray[i].quality = upvotedText;
    localStorage.setItem('savedArrayObject', JSON.stringify(storedArray));
  }
}});

// Downvote button

// helpers
function upvoteButton(quality) {
  switch (quality) {
    case 'swill':
      return 'plausible'
    case 'plausible':
      return 'genius'
    default:
      return 'genius';
  }
}

function downvoteButton(quality) {
  switch (quality) {
    case 'genius':
      return 'plausible'
    case 'plausible':
      return 'swill'
    default:
      return 'swill';
  }
}

// constructor
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
  storeNewIdea(idea);
};

storeNewIdea = function() {
  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
};

function createIdea(newIdeaFactory) {
  $('.ideas').prepend(
    `<div id=${newIdeaFactory.id} class="new-ideas">
      <div class="idea-header">
        <h2 contentEditable="true">${newIdeaFactory.title}
          <button class="delete"></button>
        </h2>
      </div>
      <div class="idea-body">
        <p class="body" contentEditable="true"> ${newIdeaFactory.body}</p>
      </div>
      <div class="footer">
        <button class="up"></button>
        <button class="down"></button>
        <div class="idea-quality"><span>quality:</span> <span class="quality">${newIdeaFactory.quality}</span></div>
      </div>
    </div>`
)};



// Search Notes

// function liveSearch(){
//  $('#live-search-ideas').on('keyup', function(){
//
//    var searchInput = $(this).val().toLowerCase();
//
//    $('.new-ideas').each(function(title, body){
//
//      var title = $(this).find(title).text().toLowerCase();
//      var checkBody = title.indexOf(searchInput) !== -1;
//
//      if (checkBody){
//        $(title).show();
//      } else {
//        $(title).hide();
//      }
//    });
//  });
// }
//
//
// var searchInput = $('#search');
// // var inspirationElement =
//
// searchInput.on('keyup', function(){
//   var searchTerm = $(this).val().toLowerCase();
//   $('.inspiration').each(function (index, element) {
//     var text = $(element).text().toLowerCase();
//     var match = !!text.match(searchTerm);
//     $(element).toggle(match);
//     // if (match) {
//     //   $(element).show();
//     // } else {
//     //   $(element).hide();
//     // }
//
//   })
// });
//
// // $('.live-search-list li').each(function(){
// // $(this).attr('data-search-term', $(this).text().toLowerCase());
// // });
//
// $('.live-search-box').on('keyup', function(){
//
// var searchTerm = $(this).val().toLowerCase();
//
//     $('.live-search-list li').each(function(){
//
//         if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
//             $(this).show();
//         } else {
//             $(this).hide();
//         }
//
//     });
//
// });
//
// });
