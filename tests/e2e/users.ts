function calculateAge(value: string): number {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 0 || isNaN(age)) {
        age = 0; // Default to 0 if the date is invalid or in the future
    }

    return age;
}

function dateToChileanFormat(value: string): string {
    let splitDate = value.split('-');
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
}

describe('Users Page Tests', function () {
    before((browser) => {
        browser.init();
    });

    it('Users details title is visible', function () {
        browser.url(browser.launchUrl + '/users');

        const title = browser.element.find({
            selector: '//h1[contains(text(), "User Details")]',
            locateStrategy: 'xpath'
        });
        title.assert.visible('Users details title is visible');
    });

    it('Users add title is visible', function () {
        browser.url(browser.launchUrl + '/users');

        const title = browser.element.find({
            selector: '//h3[contains(text(), "Add User")]',
            locateStrategy: 'xpath'
        });
        title.assert.visible('Users add title is visible');
    });

    it('Users list title is visible', function () {
        browser.url(browser.launchUrl + '/users');

        const title = browser.element.find({
            selector: '//h3[contains(text(), "Users")]',
            locateStrategy: 'xpath'
        });
        title.assert.visible('Users list title is visible');
    });

    it('User add input fields are visible', function () {
        browser.url(browser.launchUrl + '/users');

        const userRutInput = browser.element.find({
            selector: '//input[@id="rut"]',
            locateStrategy: 'xpath'
        });
        const userNombresInput = browser.element.find({
            selector: '//input[@id="nombres"]',
            locateStrategy: 'xpath'
        });
        const userApellidosInput = browser.element.find({
            selector: '//input[@id="apellidos"]',
            locateStrategy: 'xpath'
        });
        const userFechaNacimientoInput = browser.element.find({
            selector: '//input[@id="fechaNacimiento"]',
            locateStrategy: 'xpath'
        });
        const userEdadInput = browser.element.find({
            selector: '//input[@id="edad"]',
            locateStrategy: 'xpath'
        });
        const userSexoMasculinoInput = browser.element.find({
            selector: '//input[@id="sexoM"]',
            locateStrategy: 'xpath'
        });
        const userSexoFemeninoInput = browser.element.find({
            selector: '//input[@id="sexoF"]',
            locateStrategy: 'xpath'
        });
        const userSaldoInput = browser.element.find({
            selector: '//input[@id="saldo"]',
            locateStrategy: 'xpath'
        });

        userRutInput.assert.visible('User RUT input is visible');
        userNombresInput.assert.visible('User Nombres input is visible');
        userApellidosInput.assert.visible('User Apellidos input is visible');
        userFechaNacimientoInput.assert.visible('User Fecha Nacimiento input is visible');
        userEdadInput.assert.visible('User Edad input is visible');
        userSexoMasculinoInput.assert.visible('User Sexo Masculino input is visible');
        userSexoFemeninoInput.assert.visible('User Sexo Femenino input is visible');
        userSaldoInput.assert.visible('User Saldo input is visible');
    });

    it('User add input fields are invalid', function () {
        browser.url(browser.launchUrl + '/users');

        const userRutInput = browser.element.find({
            selector: '//input[@id="rut"]',
            locateStrategy: 'xpath'
        });
        const userNombresInput = browser.element.find({
            selector: '//input[@id="nombres"]',
            locateStrategy: 'xpath'
        });
        const userApellidosInput = browser.element.find({
            selector: '//input[@id="apellidos"]',
            locateStrategy: 'xpath'
        });
        const userFechaNacimientoInput = browser.element.find({
            selector: '//input[@id="fechaNacimiento"]',
            locateStrategy: 'xpath'
        });
        const userEdadInput = browser.element.find({
            selector: '//input[@id="edad"]',
            locateStrategy: 'xpath'
        });
        const userSaldoInput = browser.element.find({
            selector: '//input[@id="saldo"]',
            locateStrategy: 'xpath'
        });

        userRutInput.assert.hasClass('is-invalid', 'User RUT input is invalid');
        userNombresInput.assert.hasClass('is-invalid', 'User Nombres input is invalid');
        userApellidosInput.assert.hasClass('is-invalid', 'User Apellidos input is invalid');
        userFechaNacimientoInput.assert.hasClass('is-invalid', 'User Fecha Nacimiento input is invalid');
        userEdadInput.assert.hasClass('is-invalid', 'User Edad input is invalid');
        userSaldoInput.assert.hasClass('is-invalid', 'User Saldo input is invalid');
    });

    it('Users add input fields error messages are visible', function () {
        browser.url(browser.launchUrl + '/users');

        const userRutInputErrors = browser.element.find({
            selector: '//span[@id="rut-errors"]',
            locateStrategy: 'xpath'
        });
        const userNombresInputErrors = browser.element.find({
            selector: '//span[@id="nombres-errors"]',
            locateStrategy: 'xpath'
        });
        const userApellidosInputErrors = browser.element.find({
            selector: '//span[@id="apellidos-errors"]',
            locateStrategy: 'xpath'
        });
        const userFechaNacimientoInputErrors = browser.element.find({
            selector: '//span[@id="fechaNacimiento-errors"]',
            locateStrategy: 'xpath'
        });
        const userEdadInputErrors = browser.element.find({
            selector: '//span[@id="edad-errors"]',
            locateStrategy: 'xpath'
        });
        const userSexoInputErrors = browser.element.find({
            selector: '//span[@id="sexo-errors"]',
            locateStrategy: 'xpath'
        });
        const userSaldoInputErrors = browser.element.find({
            selector: '//span[@id="saldo-errors"]',
            locateStrategy: 'xpath'
        });

        userRutInputErrors.assert.visible('User RUT input error messages are visible');
        userNombresInputErrors.assert.visible('User Nombres input error messages are visible');
        userApellidosInputErrors.assert.visible('User Apellidos input error messages are visible');
        userFechaNacimientoInputErrors.assert.visible('User Fecha Nacimiento input error messages are visible');
        userEdadInputErrors.assert.visible('User Edad input error messages are visible');
        userSexoInputErrors.assert.visible('User Sexo input error messages are visible');
        userSaldoInputErrors.assert.visible('User Saldo input error messages are visible');
    });

    it('Users add input fields are valid', async function () {
        browser.url(browser.launchUrl + '/users');

        const userRutInput = browser.element.find({
            selector: '//input[@id="rut"]',
            locateStrategy: 'xpath'
        });
        const userNombresInput = browser.element.find({
            selector: '//input[@id="nombres"]',
            locateStrategy: 'xpath'
        });
        const userApellidosInput = browser.element.find({
            selector: '//input[@id="apellidos"]',
            locateStrategy: 'xpath'
        });
        const userFechaNacimientoInput = browser.element.find({
            selector: '//input[@id="fechaNacimiento"]',
            locateStrategy: 'xpath'
        });
        const userEdadInput = browser.element.find({
            selector: '//input[@id="edad"]',
            locateStrategy: 'xpath'
        });
        const userSexoMasculinoInput = browser.element.find({
            selector: '//input[@id="sexoM"]',
            locateStrategy: 'xpath'
        });
        const userSexoFemeninoInput = browser.element.find({
            selector: '//input[@id="sexoF"]',
            locateStrategy: 'xpath'
        });
        const userSaldoInput = browser.element.find({
            selector: '//input[@id="saldo"]',
            locateStrategy: 'xpath'
        });

        const birthDate = '1996-06-22';
        const age = calculateAge(birthDate).toString();

        await userRutInput.sendKeys('111111111');
        await userNombresInput.sendKeys('Juan Carlos');
        await userApellidosInput.sendKeys('Bodoque Triviño');
        await userFechaNacimientoInput.sendKeys(dateToChileanFormat(birthDate));

        // Por alguna extraña razon hay que hacer click dos veces
        await userSexoMasculinoInput.click();
        await userSexoMasculinoInput.click();

        await userSaldoInput.clear();
        await userSaldoInput.sendKeys('100000');

        userRutInput.assert.not.hasClass('is-invalid', 'User RUT input is valid');
        userNombresInput.assert.not.hasClass('is-invalid', 'User Nombres input is valid');
        userApellidosInput.assert.not.hasClass('is-invalid', 'User Apellidos input is valid');
        userFechaNacimientoInput.assert.not.hasClass('is-invalid', 'User Fecha Nacimiento input is valid');
        userEdadInput.assert.not.hasClass('is-invalid', 'User Edad input is valid');
        userSexoMasculinoInput.assert.selected('User Sexo Masculino input is selected');
        userSexoFemeninoInput.assert.not.selected('User Sexo Femenino input is not selected');
        userSaldoInput.assert.not.hasClass('is-invalid', 'User Saldo input is valid');

        await userRutInput.getValue().assert.equals('11.111.111-1', 'User RUT input value is valid');
        await userNombresInput.getValue().assert.equals('Juan Carlos', 'User Nombres input value is valid');
        await userApellidosInput.getValue().assert.equals('Bodoque Triviño', 'User Apellidos input value is valid');
        await userFechaNacimientoInput.getValue().assert.equals(birthDate, 'User Fecha Nacimiento input value is valid');
        await userEdadInput.getValue().assert.equals(age, 'User Edad input value is valid');
        await userSexoMasculinoInput.assert.selected('User Sexo Masculino input is selected');
        await userSexoFemeninoInput.assert.not.selected('User Sexo Femenino input is not selected');
        await userSaldoInput.getValue().assert.equals('100000', 'User Saldo input value is valid');
    });

    it('Users add create user', async function () {
        browser.url(browser.launchUrl + '/users');

        const userRutInput = browser.element.find({
            selector: '//input[@id="rut"]',
            locateStrategy: 'xpath'
        });
        const userNombresInput = browser.element.find({
            selector: '//input[@id="nombres"]',
            locateStrategy: 'xpath'
        });
        const userApellidosInput = browser.element.find({
            selector: '//input[@id="apellidos"]',
            locateStrategy: 'xpath'
        });
        const userFechaNacimientoInput = browser.element.find({
            selector: '//input[@id="fechaNacimiento"]',
            locateStrategy: 'xpath'
        });
        const userEdadInput = browser.element.find({
            selector: '//input[@id="edad"]',
            locateStrategy: 'xpath'
        });
        const userSexoMasculinoInput = browser.element.find({
            selector: '//input[@id="sexoM"]',
            locateStrategy: 'xpath'
        });
        const userSexoFemeninoInput = browser.element.find({
            selector: '//input[@id="sexoF"]',
            locateStrategy: 'xpath'
        });
        const userSaldoInput = browser.element.find({
            selector: '//input[@id="saldo"]',
            locateStrategy: 'xpath'
        });
        const userCreateButton = browser.element.find({
            selector: '//button[@type="submit" and normalize-space(text())="Enviar"]',
            locateStrategy: 'xpath'
        });
        const usersTable = browser.element.find({
            selector: '//table',
            locateStrategy: 'xpath'
        });

        const birthDate = '1996-06-22';
        const age = calculateAge(birthDate).toString();

        await userRutInput.sendKeys('111111111');
        await userNombresInput.sendKeys('Juan Carlos');
        await userApellidosInput.sendKeys('Bodoque Triviño');
        await userFechaNacimientoInput.sendKeys(dateToChileanFormat(birthDate));

        // Por alguna extraña razon hay que hacer click dos veces
        await userSexoMasculinoInput.click();
        await userSexoMasculinoInput.click();

        await userSaldoInput.clear();
        await userSaldoInput.sendKeys('100000');

        userRutInput.assert.not.hasClass('is-invalid', 'User RUT input is valid');
        userNombresInput.assert.not.hasClass('is-invalid', 'User Nombres input is valid');
        userApellidosInput.assert.not.hasClass('is-invalid', 'User Apellidos input is valid');
        userFechaNacimientoInput.assert.not.hasClass('is-invalid', 'User Fecha Nacimiento input is valid');
        userEdadInput.assert.not.hasClass('is-invalid', 'User Edad input is valid');
        userSexoMasculinoInput.assert.selected('User Sexo Masculino input is selected');
        userSexoFemeninoInput.assert.not.selected('User Sexo Femenino input is not selected');
        userSaldoInput.assert.not.hasClass('is-invalid', 'User Saldo input is valid');

        await userRutInput.getValue().assert.equals('11.111.111-1', 'User RUT input value is valid');
        await userNombresInput.getValue().assert.equals('Juan Carlos', 'User Nombres input value is valid');
        await userApellidosInput.getValue().assert.equals('Bodoque Triviño', 'User Apellidos input value is valid');
        await userFechaNacimientoInput.getValue().assert.equals(birthDate, 'User Fecha Nacimiento input value is valid');
        await userEdadInput.getValue().assert.equals(age, 'User Edad input value is valid');
        await userSexoMasculinoInput.assert.selected('User Sexo Masculino input is selected');
        await userSexoFemeninoInput.assert.not.selected('User Sexo Femenino input is not selected');
        await userSaldoInput.getValue().assert.equals('100000', 'User Saldo input value is valid');
        await userCreateButton.click();

        usersTable.assert.visible('Users table is visible');

        const userId = browser.element.find({
            selector: '//table/tbody/tr[1]/td[1]',
            locateStrategy: 'xpath'
        });
        const userRut = browser.element.find({
            selector: '//table/tbody/tr[1]/td[2]',
            locateStrategy: 'xpath'
        });
        const userNombres = browser.element.find({
            selector: '//table/tbody/tr[1]/td[3]',
            locateStrategy: 'xpath'
        });
        const userApellidos = browser.element.find({
            selector: '//table/tbody/tr[1]/td[4]',
            locateStrategy: 'xpath'
        });
        const userFechaNacimiento = browser.element.find({
            selector: '//table/tbody/tr[1]/td[5]',
            locateStrategy: 'xpath'
        });
        const userEdad = browser.element.find({
            selector: '//table/tbody/tr[1]/td[6]',
            locateStrategy: 'xpath'
        });
        const userSexo = browser.element.find({
            selector: '//table/tbody/tr[1]/td[7]',
            locateStrategy: 'xpath'
        });
        const userSaldo = browser.element.find({
            selector: '//table/tbody/tr[1]/td[8]',
            locateStrategy: 'xpath'
        });

        userId.assert.visible('User ID is visible');
        userRut.assert.visible('User RUT is visible');
        userNombres.assert.visible('User Nombres is visible');
        userApellidos.assert.visible('User Apellidos is visible');
        userFechaNacimiento.assert.visible('User Fecha Nacimiento is visible');
        userEdad.assert.visible('User Edad is visible');
        userSexo.assert.visible('User Sexo is visible');
        userSaldo.assert.visible('User Saldo is visible');
        await userId.getText().assert.equals('1', 'User ID is valid');
        await userRut.getText().assert.equals('11.111.111-1', 'User RUT is valid');
        await userNombres.getText().assert.equals('Juan Carlos', 'User Nombres is valid');
        await userApellidos.getText().assert.equals('Bodoque Triviño', 'User Apellidos is valid');
        await userFechaNacimiento.getText().assert.equals(birthDate, 'User Fecha Nacimiento is valid');
        await userEdad.getText().assert.equals(age, 'User Edad is valid');
        await userSexo.getText().assert.equals('M', 'User Sexo is valid');
        await userSaldo.getText().assert.equals('$100.000', 'User Saldo is valid');
    });

    it('Users footer link is active', function () {
        browser.url(browser.launchUrl + '/users');

        const usersLink = browser.element.find({
            selector: '//a[@href="/users" and normalize-space(text())="USERS"]',
            locateStrategy: 'xpath'
        });

        usersLink.assert.hasClass('text-white', 'Users footer link is active');
    });

    after((browser) => browser.end());
});