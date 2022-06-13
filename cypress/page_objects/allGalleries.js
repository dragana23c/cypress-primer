class AllGalleries {
    get allGalleriesHeading() {
        return cy.get('h1');
    }
    get allGalleriesTitle(){
        return cy.get('h2');
    }
    get allGalleries() {
        return cy.get('.grid')
    }

    get singleGallery() {
        return cy.get('.cell');
    }

    get searchField() {
        return cy.get('.form-control').eq(0);
    }

    get filterBtn() {
        return cy.get('button').first()
    }

    get loadMoreBtn() {
        return cy.get('button').last()
    }

    get logOutBtn() {
        return cy.get('.nav-link').eq(3);
    }

    search(searchTerm) {
        this.searchField.type(searchTerm)
        this.filterBtn.click()
    }
}

export const allGalleries = new AllGalleries();
