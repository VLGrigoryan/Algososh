
describe("Queue Page Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/queue");
      cy.get("input[name=string]").as("inputField");
      cy.contains("Добавить").as("addButton");
      cy.contains("Удалить").as("deleteButton");
      cy.contains("Очистить").as("clearButton");
    });
  
    it("should have an inactive button when the input is empty", () => {
      cy.get("@inputField").should("have.value", "");
      cy.get("@addButton").should("be.disabled");
    });
  
    it("adds an element to the queue correctly", () => {
      const inputValue = "test";
      cy.get("@inputField").type(inputValue);
      cy.get("@addButton").click();
  
       cy.get('[data-testid="circle"]').eq(0).should("contain", inputValue);
   
      cy.wait(500);
  
      cy.get('[data-testid="circle"]').eq(0).should("not.have.class", "changing");
      cy.get('[data-testid="circle"]').eq(0).should("not.have.class", "head");
      cy.get('[data-testid="circle"]').eq(0).should("not.have.class", "tail");
    });
  
    it("deletes an element from the queue correctly", () => {
      const inputValue = "test";
      cy.get("@inputField").type(inputValue);
      cy.get("@addButton").click();
  
      cy.get("@deleteButton").click();
  
     });
  
    it("clears the queue correctly", () => {
      const inputValues = ["test1", "test2", "test3"];
      inputValues.forEach((value) => {
        cy.get("@inputField").type(value);
        cy.get("@addButton").click();
        cy.wait(500);
      });
  
      cy.get("@clearButton").click();
  
     });
  });
  