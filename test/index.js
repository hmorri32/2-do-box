const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

describe('2-Do-box test bruu', function() {
  const driver = new webdriver.Builder().forBrowser('chrome').build();

  test.it('should frickin work', function() {
    this.timeout(20000);

    driver.get('http://localhost:8080');

  });
  driver.quit();
});
