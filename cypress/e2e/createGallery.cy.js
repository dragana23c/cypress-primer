
import { createGallery} from "../page_objects/createGallery";
const faker = require('@faker-js/faker');

describe("Create gallery test", () => {
    let galleryId;
    let galleryData = {
      title: faker.name.firstName(),
      titleBlanc: " ",
      titileLong: faker.random.alpha(256),
      description: faker.name.firstName(),
      descriptionBlanc: " ",
      descriptionLong:faker.random.alpha(1001),
      image: faker.image.avatar(),

      pandaImage:
      'https://tinypng.com/images/social/website.jpg',
      girlImage:
        "https://static.remove.bg/remove-bg-web/eb1bb48845c5007c3ec8d72ce7972fc8b76733b1/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg",
    };
  
    beforeEach("login via backend", () => {
      cy.loginViaBackend();
      cy.visit("/create");
      cy.url().should("include", "/create");
    });
  
    it("create gallery", () => {
      cy.intercept({
        method: "POST",
        url: "https://gallery-api.vivifyideas.com/api/galleries",
      }).as("createGallery");
  
      createGallery.createGallery(
        galleryData.title,
        galleryData.description,
        galleryData.girlImage
      );
  
      cy.wait("@createGallery").then((interception) => {
        galleryId = interception.response.body.id;
  
        expect(interception.response.body.title).eq(galleryData.title);
        cy.visit(`/galleries/${galleryId}`);
        // cy.visit('/galleries/' + galleryId)
        cy.get("h1").should("have.text", galleryData.title);
      });


    });
      
      it('create gallery without description', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createWithoutDesc');

        createGallery.createGallery(
            galleryData.title,
            galleryData.descriptionBlanc,
            galleryData.pandaImage
        );
       cy.wait('@createWithoutDesc').then((intercept) => {
        galleryId = intercept.response.body.id;

        
        expect(intercept.response.body.description).to.not.eq(galleryData.description);
        expect(intercept.response.statusCode).to.eq(201)
        cy.visit(`/galleries/${galleryId}`);
        cy.url().should('not.include', '/create')
        cy.get('p').should('not.have.text', galleryData.description);
           });


    });
        it('create gallery without title', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createWithoutTitle');

        createGallery.createGallery(
            galleryData.titleBlanc,
            galleryData.description,
            galleryData.pandaImage
        );
        cy.wait('@createWithoutTitle').then((intercept) =>{
            galleryId = intercept.response.body.id;

            expect(intercept.response.statusCode).to.eq(422)
            cy.url().should('include', '/create')
           
        })
    })
        it('gallery with short title', () => {
        cy.intercept({
            method: 'POST',
            url:'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('shortTitle');

        createGallery.createGallery(
            "A",
            galleryData.description,
            galleryData.girlImage
        );
        cy.wait('@shortTitle').then((intercept) => {
           galleryId = intercept.response.body.id;

           expect(intercept.response.body.title).to.not.eq(galleryData.title);
           expect(intercept.response.statusCode).to.eq(422)
         
           cy.url().should('include', '/create')
           
        })

       
        })
        it('long title', () => {
            cy.intercept({
                method: 'POST',
                url:'https://gallery-api.vivifyideas.com/api/galleries'
            }).as('longTitle');

            createGallery.createGallery(
                galleryData.titileLong,
                galleryData.description,
                galleryData.girlImage
            );
            cy.wait('@longTitle').then((intercept)=> {
                galleryId = intercept.response.body.id;
             expect(intercept.response.body.title).to.not.eq(galleryData.title);
             expect(intercept.response.statusCode).to.eq(422)

             cy.url().should('include', '/create')
             cy.get('h1').should('not.have.text', galleryData.title)
            })
        })
        it.only('create gall without image', ()=>{
          cy.intercept({
            method:'POST',
            url:'https://gallery-api.vivifyideas.com/api/galleries'
         }).as('withoutImage');
    
         createGallery.createGallery(
          galleryData.title,
          galleryData.description,
          "a"
          );
          cy.wait('@withoutImage').then((intercept) =>{
            galleryId = intercept.response.body.id;

            expect(intercept.response.statusCode).to.eq(422)
            cy.url().should('include', '/create')
          })

        })
        it('wrong url', () =>{
          cy.intercept({
            method:'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
          }).as('wrongUrl');

          createGallery.createGallery(
            galleryData.title,
            galleryData.description,
            'https://gallery-api.vivifyideas.com/api/galleries'
          );
          cy.wait('@wrongUrl').then((intercept) => {
            galleryId = intercept.response.body.id;

            expect(intercept.response.statusCode).to.eq(422)
            cy.url().should('include', '/create')
          })
        })
         it('long desc', () => {
          cy.intercept({
            method: 'POST',
            url:'https://gallery-api.vivifyideas.com/api/galleries'
          }).as('longDesc');

          createGallery.createGallery(
            galleryData.title,
            galleryData.descriptionLong,
            galleryData.girlImage
          );
          cy.wait('@longDesc').then((intercept) => {
           galleryId =  intercept.response.body.id;

           expect(intercept.response.statusCode).to.eq(422)
           cy.url().should('include', '/create')         
           })
         })

          })

          
      


    

