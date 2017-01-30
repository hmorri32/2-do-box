const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

describe('2-Do-box test bruu', () => {
  let driver
  test.beforeEach(function(){
    this.timeout(10000);
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();
    driver.get('http://localhost:8080');
  })

  test.afterEach(()=>{
    driver.quit();
  })


  test.it('should allow me to add a title', () => {

    const title = driver.findElement({id: "title-input"});

    title.sendKeys("supsies").then(()=> { return title.getAttribute('value')}).then((value)=> {
      assert.equal(value, "supsies")
    });
  });

  test.it('should allow me to add a task', () => {

    const task = driver.findElement({id: "body-input"});

    task.sendKeys("brah").then(()=> { return task.getAttribute('value')}).then((value) => {
      assert.equal(value, "brah")
    });
  });

  test.it('should allow me to add an idea to the DOM', () => {
    const title  = driver.findElement({id: "title-input"});
    const task   = driver.findElement({id: "body-input"});
    const button = driver.findElement({id: "save-button"});

    title.sendKeys('this is a title')
    task.sendKeys('this is a task')
    button.click();

    const ideaTitle = driver.findElement({className: "idea-title"})
    ideaTitle.getText().then((value)=> {
      assert.equal(value, "this is a title")
    })

    const ideaBody = driver.findElement({className: "body"})
    ideaBody.getText().then((value) => {
      assert.equal(value, "this is a task")
    });
  });

  test.it('should allow me to delete an idea from the DOM', () => {
    const title     = driver.findElement({id: "title-input"});
    const task      = driver.findElement({id: "body-input"});
    const button    = driver.findElement({id: "save-button"});

    title.sendKeys('this is a title')
    task.sendKeys('this is a task')
    button.click();

    title.sendKeys('this is another title')
    task.sendKeys('this is another task')
    button.click();

    driver.findElements({className: 'new-ideas'}).then((idea)=> {
      assert.equal(idea.length, 2)
    })

    const deleteBtn = driver.findElement({className: "delete"});
    deleteBtn.click();

    driver.findElements({className: 'new-ideas'}).then((idea)=> {
      assert.equal(idea.length, 1)
    })
  })

  test.it('new idea in DOM should have a default importance level of normal ', () => {
    const title     = driver.findElement({id: "title-input"});
    const task      = driver.findElement({id: "body-input"});
    const button    = driver.findElement({id: "save-button"});

    title.sendKeys('this is a title')
    task.sendKeys('this is a task')
    button.click();

    const quality = driver.findElement({className: "quality"})
    quality.getText().then((value) => {
      assert.equal(value, "normal");
    })
  })

  test.it('should allow me to increase an ideas importance with the up button', () => {
    const title     = driver.findElement({id: "title-input"});
    const task      = driver.findElement({id: "body-input"});
    const button    = driver.findElement({id: "save-button"});

    title.sendKeys('this is a title')
    task.sendKeys('this is a task')
    button.click();

    const quality = driver.findElement({className: "quality"})
    quality.getText().then((value) => {
      assert.equal(value, "normal");
    })

    const upBtn = driver.findElement({className: "up"})
    upBtn.click();
    quality.getText().then((value) => {
      assert.equal(value, "high");
    })

  })

  test.it('should allow me to search through ideas', () => {
    const title     = driver.findElement({id: "title-input"});
    const task      = driver.findElement({id: "body-input"});
    const button    = driver.findElement({id: "save-button"});
    const search    = driver.findElement({id: "live-search-ideas"})

    title.sendKeys('this is a title')
    task.sendKeys('this is a task')
    button.click();

    search.sendKeys('this')

    const idea = driver.findElement({className: 'new-ideas'})

    idea.isDisplayed().then((displayed)=> {
      assert.equal(displayed, true)
    })

    search.sendKeys('x')

    idea.isDisplayed().then((displayed)=> {
      assert.equal(displayed, false)
    })
  })

  // test.it('should allow me to sort by quality', () => {
  //   const none  = driver.findElement({class: "none"});
  //   const low   = driver.findElement({class: "low"});
  //   const normal = driver.findElement({class: "normal"});
  //   const high = driver.findElement({class: "high"});
  //   const critical = driver.findElement({class: "critical"});
  //
  //   none.click();
  //   low.click();
  //   normal.click();
  //   high.click();
  //   critical.click();
  //
  //   const  = driver.findElement({className: "idea-title"})
  //   ().then(()=> {
  //     assert.equal()
  //   })
  // });

});
