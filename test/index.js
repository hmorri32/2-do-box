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

});
