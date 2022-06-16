class CreateGallery {
    get createBtn() {
        return cy.get('.mr-auto > :nth-child(3) > .nav-link');
     }
     get title() {
         return cy.get('#title');
     }
     get description() {
          return cy.get('#description');
         }
     get images(){
         return cy.get('input').eq(2);
     }
     get addImageBtn() {
         return cy.get('button').first();
     }
     get submitButton() {
         return cy.get('button').eq(4);
     }
     get  galleryInputParent(){
        return cy.get('.form-group');
    }
    
    get trashGalleryBtn() {
        return this.galleryInputParent
        .find('button')
        .eq(0)
     }

     get arrowUpBtn() {
        return this.galleryInputParent
        .find('button')
        .eq(1)
     }

     
     get arrowDownBtn() {
        return this.galleryInputParent
        .find('button')
        .last
     }

     get arrowBtnEq() {
        return cy.get ('i').eq(0);
     }
     create(title, description, images) {
  
         this.title.type(title);
         this.description.type(description);
         this.images.type(images);
         this.addImageBtn.click();
         this.submitButton.click();
     }
    }
    export const createGallery = new CreateGallery();
