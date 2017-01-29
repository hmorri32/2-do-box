const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');


describe('2-Do-box test bruu', function() {
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


  test.it('should allow me to add a title', function() {

    const title = driver.findElement({id: "title-input"});

    title.sendKeys("supsies").then(()=> { return title.getAttribute('value')}).then((value)=> {
      assert.equal(value, "supsies")
    });
  });

  test.it('should allow me to add a task', function() {

    const task = driver.findElement({id: "body-input"});

    task.sendKeys("brah").then(()=> { return task.getAttribute('value')}).then((value) => {
      assert.equal(value, "brah")
    });
  });

  test.it('should allow me to add an idea to the DOM', function() {
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

  test.it('should allow me to delete an idea from the DOM', function(){
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

  test.it('new idea in DOM should have a default importance level of normal ', function() {
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

});
