import { baseUrl, SELECTORS } from "../../src/constants/testConstants";

describe("Queue Page Functionality", () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/queue`);
    cy.get(SELECTORS.STRING_INPUT).as("inputField");
    cy.contains(SELECTORS.ADD_BUTTON).as("addButton");
    cy.contains(SELECTORS.DELETE_BUTTON).as("deleteButton");
    cy.contains(SELECTORS.CLEAR_BUTTON).as("clearButton");
  });

  it("should have an inactive button when the input is empty", () => {
    cy.get("@inputField").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
  });

  it("adds an element to the queue correctly", () => {
    const inputValue = "test";
    cy.get("@inputField").type(inputValue);
    cy.get("@addButton").click();

    cy.get(SELECTORS.CIRCLE_TESTID).eq(0).should("contain", inputValue);

    cy.wait(500);

    cy.get(SELECTORS.CIRCLE_TESTID).eq(0).should("not.have.class", "changing");
    cy.get(SELECTORS.CIRCLE_TESTID).eq(0).should("not.have.class", "head");
    cy.get(SELECTORS.CIRCLE_TESTID).eq(0).should("not.have.class", "tail");
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
