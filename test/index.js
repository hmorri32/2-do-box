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

  test.it('should allow me to add an idea to the dom', function() {
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

  })

});
