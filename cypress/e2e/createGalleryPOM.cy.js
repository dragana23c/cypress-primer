import {createGallery} from '../page_objects/createGallery'
import { loginPage } from '../page_objects/loginPage';
const faker = require('@faker-js/faker')
let email = 'dragana@mail.com';
let password = 'draganinasifra1';
let title = faker.random.word(1);
let description = faker.lorem.words(10);
let title256 = faker.random.alpha(256);
let desc1001 = faker.random.alpha(1001);
let randomImage1 = faker.internet.avatar();
let natureImage =  'https://tinypng.com/images/social/website.jpg'
describe("create gallery", () => {
  beforeEach("login", () => {
    cy.visit("/");
    loginPage.loginBtn.click();
    cy.url().should('include', '/login');
    loginPage.login(email, password);
    cy.url().should('not.include', '/login');
    createGallery.createBtn.click();
    cy.url().should('include', '/create');
  });

  it('create gallery', () => {
    createGallery.create(title, description, natureImage);
  });

  it('create gallery without description', () => {
    createGallery.create(title, " ", natureImage);
  });

  it('create gallery without title', () => {
    createGallery.create(" ", description, natureImage);
  });

  it('too short title', () => {
    createGallery.create("1", description, natureImage);
  });

  it('create gallery without image', () => {
    createGallery.create(title, description, " ");
  });

  it('too long title', () => {
    createGallery.create(title256, description, natureImage);
  });

  it('too long desctiprion', () => {
    createGallery.create(title, desc1001, natureImage);
  });

});