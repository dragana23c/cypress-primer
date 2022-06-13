describe('login test', () =>{
    it('visit gallery app and click login button', ()=>{
        cy.visit('https://gallery-app.vivifyideas.com');
        cy.url().should('contains', 'gallery-app')
        cy.get('a[href="/login"]').click();
        cy.url().should('contains', '/login');
    })

    it('login with valid credentials', () => {
        cy.get('#email').type('dragana@mail.com');
        cy.get('#password').type('draganinasifra1');
        cy.get('button').click();
     });

    it('logout', () => {
        cy.get('.nav-link').should('have.length', 4);
        cy.get('.nav-link').eq(3).click();
    })

    it('login without any credentials', () =>{
        cy.get('button').click();
        cy.url().should('include', '/login');
    })
    it('login without password', () => {
        cy.get('#email').type('dragana@mail.com')
        cy.get('#password').type();
        cy.get('button').click();
    })
   
    it('login without email', () =>{
        cy.get('#email').type("b")
        cy.get('#password').type('draganinasifra1');
        cy.get('button').click();
        cy.url().should('include', '/login')

    })
})