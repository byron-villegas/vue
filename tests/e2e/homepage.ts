describe('Homepage', function () {
  before((browser) => {
    browser.init()
  })

  it('Has Vue Title', function () {
    browser.assert.titleEquals('Vue');
  })

  after((browser) => browser.end())
});