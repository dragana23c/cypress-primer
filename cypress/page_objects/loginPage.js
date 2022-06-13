class LoginPage{
  get  loginBtn() {
   return  cy.get('.nav-link').eq(1);
}

get email(){
    return cy.get('#email');
}

get password(){
    return cy.get('#password');
}

get submitBtn() {
    return cy.get('button');
}
login(email, password){
   
    this.email.type(email);
    this.password.type(password);
    this.submitBtn.click();
}
}
export const loginPage = new LoginPage();
