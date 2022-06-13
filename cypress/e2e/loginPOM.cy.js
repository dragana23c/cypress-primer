import { loginPage } from "../page_objects/loginPage";
const faker = require('@faker-js/faker')
let email = 'dragana@mail.com';
let password ='draganinasifra1';
describe('login with pom', () => {

})
it('login pom', () => {
    cy.visit('/');
    loginPage.loginBtn.click();
    loginPage.login(email, password);
 cy.url().should('not.include', '/login');
})