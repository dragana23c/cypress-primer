import { allGalleries } from "../page_objects/allGalleries";
import { loginPage } from "../page_objects/loginPage";
const faker = require("@faker-js/faker");
let email = "dragana@mail.com";
let password = "draganinasifra1";

describe("all galleries page test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("contains", "gallery-app");
  });

  it("test pagination", () => {
    allGalleries.singleGallery.should("have.length", 10);
    allGalleries.loadMoreBtn.click();
    allGalleries.singleGallery.should("have.length", 20);
    //allGalleries.allGalleries.children().should('have.length', 10);
    allGalleries.allGalleries.children().first().should("have.class", "cell");
    allGalleries.loadMoreBtn.click();
    allGalleries.allGalleries.children().should("have.length", 30);
  });
  it("search gallery", () => {
    allGalleries.search("flower");
  });

  // it('all galleries logged in', () => {
  // loginPage.loginBtn.click();
  //  cy.url().should("include", "/login");
  // loginPage.login(email, password);
  // allGalleries.should('be.visible', 'logOutBtn')
  // })

  it("all galleries heading", () => {
    allGalleries.allGalleriesHeading.should("have.text", "All Galleries");
  });
});
