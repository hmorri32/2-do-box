
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

module.exports = createIdea;
