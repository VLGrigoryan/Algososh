describe("Stack Page Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/stack");
      cy.get("input").as("inputField");
      cy.contains("Добавить").as("addButton");
      cy.contains("Удалить").as("deleteButton");
      cy.contains("Очистить").as("cleanButton");
    });
  
    it("should have an inactive button when the input is empty", () => {
        cy.get("@inputField").should("have.value", "");
        cy.get("@addButton").should("be.disabled");
      });

    it("add works correctly", () => {
      cy.get("@inputField").type("7").get("@addButton").click().wait(0);
  
      cy.get('[data-testid="circle"]').within(() => {
        cy.get('[data-testid="state"]').should("have.css", "border", "4px solid rgb(210, 82, 225)").and("contain", 7);
        cy.get('[data-testid="head"]').should("contain", "top").siblings('[data-testid="index"]').should("contain", 0);
      }).wait(500).within(() => {
        cy.get('[data-testid="state"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
  
      cy.get("@inputField").type("3").get("@addButton").click();
  
      cy.get('[data-testid="circle"]').eq(0).within(() => {
        cy.get('[data-testid="head"]').should("contain", "");
      });
  
      cy.get('[data-testid="circle"]').eq(1).within(() => {
        cy.get('[data-testid="state"]').should("have.css", "border", "4px solid rgb(210, 82, 225)").and("contain", 3);
        cy.get('[data-testid="head"]').should("contain", "top").siblings('[data-testid="index"]').should("contain", 1);
      }).wait(500).within(() => {
        cy.get('[data-testid="state"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
    });
  
    it("delete works correctly", () => {
        cy.get("@inputField").type("7").get("@addButton").click();
        cy.get("@inputField").type("3").get("@addButton").click();
        cy.get("@deleteButton").click().wait(0);
      
        cy.get('[data-testid="circle"]').eq(1).within(() => {
          cy.get('[data-testid="state"]').should("have.css", "border", "4px solid rgb(210, 82, 225)").and("contain", "3");
          cy.get('[data-testid="head"]').should("contain", "top");
        });
      
        cy.wait(500);
      
        cy.get('[data-testid="circle"]').should("have.length", 1);
        cy.get('[data-testid="circle"]').within(() => {
          cy.get('[data-testid="state"]').should("contain", "7");
          cy.get('[data-testid="head"]').should("contain", "top");
        });
      });
  
    it("clean works correctly", () => {
      cy.get("@inputField").type("7").get("@addButton").click();
      cy.get("@inputField").type("3").get("@addButton").click();
      cy.get("@inputField").type("5").get("@addButton").click();
  
      cy.get("@cleanButton").click().get('[data-testid="circle"]').should("not.exist");
    });
  });
  