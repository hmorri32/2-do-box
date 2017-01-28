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
  

  test.it('should allow me to add a title and a task', function() {

    const title = driver.findElement({id: "title-input"});
    const task = driver.findElement({id: "body-input"});

    title.sendKeys("supsies").then(()=> { return title.getAttribute('value')}).then((value)=> {
      assert.equal(value, "supsies")
    });
    task.sendKeys("bra").then(()=> { return task.getAttribute('value')}).then((value) => {
      assert.equal(value, "bra")
    })
  });

  test.it('should allow me to add ideas to the dom', function() {

  })
});


  // test.it('should allow me to add a title and a description', ()=>{
  //
  //   const title       = driver.findElement({name: "title"});
  //   const description = driver.findElement({name: "description"});
  //
  //   title.sendKeys('this is a title').then(()=> { return title.getAttribute('value')}).then((value)=> {
  //     assert.equal(value, 'this is a title')
  //   });
  //   description.sendKeys('this is a description').then(()=> { return description.getAttribute('value')}).then((value)=> {
  //     assert.equal(value, 'this is a description')
  //   });
  // });
//
//   test.it('should allow me to add an idea to the dom', ()=> {
//
//     const title       = driver.findElement({name: "title"});
//     const description = driver.findElement({name: "description"});
//     const button      = driver.findElement({name: "button"});
//
//     title.sendKeys('this is a title');
//     description.sendKeys('this is a description');
//     button.click();
//
//     const idea = driver.findElement({tagName: 'li'})
//
//     idea.getText().then((value)=> {
//       assert.equal(value, 'this is a title\nthis is a description')
//     });
//   });
//
//   test.it("add two ideas, delete one, assert that there is one left", ()=>{
//
//     const title       = driver.findElement({name: "title"});
//     const description = driver.findElement({name: "description"});
//     const button      = driver.findElement({name: "button"});
//
//     title.sendKeys("this is a title");
//     description.sendKeys('this is a description');
//     button.click();
//
//     title.sendKeys("this is another title");
//     description.sendKeys('this is another description');
//     button.click();
//
//     driver.findElements({tagName: 'li'}).then((li)=> {
//       assert.equal(li.length, 2)
//     })
//
//     driver.findElement({className: "delete-idea"}).click();
//
//     driver.findElements({tagName: 'li'}).then((li)=> {
//       assert.equal(li.length, 1)
//     })
//   })
//
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// //
