describe('Navbar Navigation Tests', function () {
    before((browser) => {
        browser.init()
    });

    it('Home is active', function () {
        const homeLink = browser.element.find({
            selector: '//a[@href="/" and normalize-space(text())="Home"]',
            locateStrategy: 'xpath'
        });
        homeLink.assert.hasClass('active', 'Home link is active');
    });

    it('Users is active', function () {
        browser.url(browser.launchUrl + '/users');
        const usersLink = browser.element.find({
            selector: '//a[@href="/users" and normalize-space(text())="Users"]',
            locateStrategy: 'xpath'
        });
        usersLink.assert.hasClass('active', 'Users link is active');
    });

    it('About is active', function () {
        browser.url(browser.launchUrl + '/about');
        const aboutLink = browser.element.find({
            selector: '//a[@href="/about" and normalize-space(text())="About"]',
            locateStrategy: 'xpath'
        });
        aboutLink.assert.hasClass('active', 'About link is active');
    });

    after((browser) => browser.end());
});