/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Scripts = __webpack_require__(1);
	// var Styles = require ('./styles.scss');

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	// Global Var - Local Storage Array
	var ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

	// Grabs local storage stuff on load. Appends it. Clears inputs.
	$(document).ready(function () {
	  console.log(localStorage);
	  appendFromLocalStorage();
	  resetInputs();
	});

	// Helper functions
	function appendFromLocalStorage() {
	  ideaTank.forEach(function (object) {
	    createIdea(object);
	  });
	};

	function enableSaveButton() {
	  $("#save-button").prop('disabled', false);
	};

	function disableSaveButton() {
	  $("#save-button").prop('disabled', true);
	};

	function resetInputs() {
	  $('#title-input').val('');
	  $('#body-input').val('');
	};

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
	};

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
	};

	// alter value helper, works for quality buttons and inputs
	function updateInLocalStorage(divId, arrayValue, inputValue) {
	  ideaTank.forEach(function (element) {
	    if (Number(divId) === element.id) {
	      element[arrayValue] = inputValue;
	      sendToLocalStorage();
	    }
	  });
	};

	// Constructor stuff
	function newIdeaFactory(title, body) {
	  this.title = title;
	  this.body = body;
	  this.quality = 'none';
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

	sendToLocalStorage = function sendToLocalStorage() {
	  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
	};

	function createIdea(newIdeaFactory) {
	  $('.ideas').prepend("<div id=" + newIdeaFactory.id + " class=\"new-ideas\">\n      <div class=\"idea-header\">\n        <h2 class =\"idea-title\" contentEditable=\"true\">" + newIdeaFactory.title + "\n          <button class=\"delete\"></button>\n        </h2>\n      </div>\n      <div class=\"idea-body\">\n        <p class=\"body\" contentEditable=\"true\"> " + newIdeaFactory.body + "</p>\n      </div>\n      <div class=\"footer\">\n        <button class=\"up\"></button>\n        <button class=\"down\"></button>\n        <div class=\"idea-quality\"><span tabindex=\"0\">importance:</span> <span tabindex=\"0\" class=\"quality\">" + newIdeaFactory.quality + "</span></div>\n      </div>\n    </div>");
	};

	// Event Listeners
	$('#title-input, #body-input').on('keyup', function () {
	  if ($('#title-input').val() && $('#body-input').val()) {
	    enableSaveButton();
	  } else {
	    disableSaveButton();
	  }
	});

	$('#save-button').on('click', function () {
	  postAndStoreIdea();
	  disableSaveButton();
	  resetInputs();
	});

	$('.ideas').on('click', '.delete', function () {
	  $(this).closest('.new-ideas').remove();
	  var divId = $(this).closest('.new-ideas').prop('id');
	  for (var i = 0; i < ideaTank.length; i++) {
	    if (Number(divId) === ideaTank[i].id) {
	      ideaTank.splice(i, 1);
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

	$('.ideas').on('click', '.up', function () {
	  var ideaQuality = $(this).closest('.new-ideas').find('.quality');
	  var ideaQualityVal = ideaQuality.text();
	  var upVotedText = upvoteButton(ideaQualityVal);
	  ideaQuality.text(upVotedText);
	  var divId = $(this).closest('.new-ideas').prop('id');
	  updateInLocalStorage(divId, "quality", upVotedText);
	});

	$('.ideas').on('click', '.down', function () {
	  var ideaQuality = $(this).closest('.new-ideas').find('.quality');
	  var ideaQualityVal = ideaQuality.text();
	  var downvotedText = downvoteButton(ideaQualityVal);
	  ideaQuality.text(downvotedText);
	  var divId = $(this).closest('.new-ideas').prop('id');
	  updateInLocalStorage(divId, "quality", downvotedText);
	});

	$('.ideas').on('blur', '.idea-title', function () {
	  var ideaTitle = $(this).closest('.idea-title');
	  var ideaTitleValue = ideaTitle.text();
	  var divId = $(this).closest('.new-ideas').prop('id');
	  updateInLocalStorage(divId, "title", ideaTitleValue);
	});

	$('.ideas').on('blur', '.body', function () {
	  var ideaBody = $(this).closest('.body');
	  var ideaBodyValue = ideaBody.text();
	  var divId = $(this).closest('.new-ideas').prop('id');
	  updateInLocalStorage(divId, "body", ideaBodyValue);
	});

	// Search
	var searchInput = $('#live-search-ideas');

	searchInput.on('keyup', function () {
	  var searchTerm = $(this).val().toLowerCase();
	  $('.new-ideas').each(function (index, element) {
	    var text = $(element).text().toLowerCase();
	    var match = !!text.match(searchTerm);
	    $(element).toggle(match);
	  });
	});

/***/ }
/******/ ]);