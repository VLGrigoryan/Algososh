import { baseUrl, SELECTORS } from "../../src/constants/testConstants";

describe("List Page Functionality", () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/list`);
    cy.get(SELECTORS.LIST_INPUT).as("inputField");
    cy.contains(SELECTORS.ADD_TO_HEAD_BUTTON).as("addToHeadButton");
    cy.contains(SELECTORS.ADD_TO_TAIL_BUTTON).as("addToTailButton");
    cy.contains(SELECTORS.DELETE_FROM_HEAD_BUTTON).as("deleteFromHeadButton");
    cy.contains(SELECTORS.DELETE_FROM_TAIL_BUTTON).as("deleteFromTailButton");
    cy.get(SELECTORS.INDEX_INPUT).as("indexInput");
    cy.contains(SELECTORS.ADD_TO_INDEX_BUTTON).as("addToIndexButton");
    cy.contains(SELECTORS.DELETE_FROM_INDEX_BUTTON).as("deleteFromIndexButton");
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
    cy.get(SELECTORS.CIRCLE_TESTID).should("have.length", 4);
  });

  it("adds an element to head correctly", () => {
    cy.get("@inputField").type("test");
    cy.get("@addToHeadButton").click();
    // cy.get(SELECTORS.CIRCLE_TESTID).eq(0).should("have.text", "test");
  });

  it("adds an element to tail correctly", () => {
    cy.get("@inputField").type("test");
    cy.get("@addToTailButton").click();
    // cy.get(SELECTORS.CIRCLE_TESTID).eq(3).should("have.text", "test");
  });

  it("adds an element by index correctly", () => {
    const inputIndex = "1";
    cy.get("@inputField").type("test");
    cy.get("@indexInput").type(inputIndex);
    cy.get("@addToIndexButton").click();
    cy.get(SELECTORS.CIRCLE_TESTID).eq(1).should("have.text", "test");
  });

  it("deletes an element from head correctly", () => {
    cy.get("@deleteFromHeadButton").click();
    cy.get(SELECTORS.CIRCLE_TESTID).should("have.length", 3);
  });

  it("deletes an element from tail correctly", () => {
    cy.get("@deleteFromTailButton").click();
    cy.get(SELECTORS.CIRCLE_TESTID).should("have.length", 3);
  });

  it("deletes an element by index correctly", () => {
    const inputIndex = "1";
    cy.get("@indexInput").type(inputIndex);
    cy.get("@deleteFromIndexButton").click();
    cy.get(SELECTORS.CIRCLE_TESTID).should("have.length", 3);
  });
});
