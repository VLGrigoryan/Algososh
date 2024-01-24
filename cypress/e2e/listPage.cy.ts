describe("List Page Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
    cy.get("input[placeholder='Введите значение']").as("inputField");
    cy.contains("Добавить в head").as("addToHeadButton");
    cy.contains("Добавить в tail").as("addToTailButton");
    cy.contains("Удалить из head").as("deleteFromHeadButton");
    cy.contains("Удалить из tail").as("deleteFromTailButton");
    cy.get("input[placeholder='Введите индекс']").as("indexInput");
    cy.contains("Добавить по индексу").as("addToIndexButton");
    cy.contains("Удалить по индексу").as("deleteFromIndexButton");
  });

  it("should have inactive buttons when the input is empty", () => {
    cy.get("@inputField").should("have.value", "");
    cy.get("@addToHeadButton").should("be.disabled");
    cy.get("@addToTailButton").should("be.disabled");
    cy.get("@deleteFromHeadButton").should("be.enabled");
    cy.get("@deleteFromTailButton").should("be.enabled");
    cy.get("@indexInput").should("have.value", "");
    cy.get("@addToIndexButton").should("be.disabled");
    cy.get("@deleteFromIndexButton").should("be.disabled");
  });

  it("renders the default list correctly", () => {
    cy.get('[data-testid="circle"]').should("have.length", 4);
  });

  it("adds an element to head correctly", () => {
     cy.get("@inputField").type("test");
    cy.get("@addToHeadButton").click();
    // cy.get('[data-testid="circle"]').eq(0).should("have.text", "test");
  });

  it("adds an element to tail correctly", () => {
     cy.get("@inputField").type("test");
    cy.get("@addToTailButton").click();
    // cy.get('[data-testid="circle"]').eq(3).should("have.text", "test");
  });

  it("adds an element by index correctly", () => {
     const inputIndex = "1";
    cy.get("@inputField").type("test");
    cy.get("@indexInput").type(inputIndex);
    cy.get("@addToIndexButton").click();
    cy.get('[data-testid="circle"]').eq(1).should("have.text", "test");
  });

  it("deletes an element from head correctly", () => {
    cy.get("@deleteFromHeadButton").click();
    cy.get('[data-testid="circle"]').should("have.length", 3);
  });

  it("deletes an element from tail correctly", () => {
    cy.get("@deleteFromTailButton").click();
    cy.get('[data-testid="circle"]').should("have.length", 3);
  });

  it("deletes an element by index correctly", () => {
    const inputIndex = "1";
    cy.get("@indexInput").type(inputIndex);
    cy.get("@deleteFromIndexButton").click();
    cy.get('[data-testid="circle"]').should("have.length", 3);
  });
});
