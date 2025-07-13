describe('Footer Navigation Tests', function () {
    before((browser) => {
        browser.init()
    });

    it('Home is active', function () {
        const homeLink = browser.element.find({
            selector: '(//a[@href="/" and normalize-space(text())="HOME"])[1]',
            locateStrategy: 'xpath'
        });

        homeLink.assert.hasClass('text-white', 'Home link is active');
    });

    it('Users is active', function () {
        browser.url(browser.launchUrl + '/users');
        const usersLink = browser.element.find({
            selector: '(//a[@href="/users" and normalize-space(text())="USERS"])[1]',
            locateStrategy: 'xpath'
        });
        usersLink.assert.hasClass('text-white', 'Users link is active');
    });

    it('About is active', function () {
        browser.url(browser.launchUrl + '/about');
        const aboutLink = browser.element.find({
            selector: '(//a[@href="/about" and normalize-space(text())="ABOUT"])[1]',
            locateStrategy: 'xpath'
        });
        aboutLink.assert.hasClass('text-white', 'About link is active');
    });

    after((browser) => browser.end());
});

describe('Footer Year Display Tests', function () {
    before((browser) => {
        browser.init()
    });

    it('Displays current year in footer', function () {
        const currentYear = new Date().getFullYear();
        browser.assert.textContains('footer', `${currentYear} - ${currentYear + 1}`, 'Footer displays the current year');
    });

    after((browser) => browser.end());
});

describe('Footer Copyright Tests', function () {
    before((browser) => {
        browser.init()
    });

    it('Displays correct copyright text', function () {
        const year = new Date().getFullYear();
        browser.assert.textContains('footer', `Copyright © ${year}. Todos los derechos reservados.`, 'Footer displays the correct copyright text');
    });

    after((browser) => browser.end());
});