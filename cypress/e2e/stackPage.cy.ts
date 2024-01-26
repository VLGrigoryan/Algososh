import { baseUrl, SELECTORS, COLORS } from "../../src/constants/testConstants";

describe("Stack Page Functionality", () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/stack`);
    cy.get(SELECTORS.STRING_INPUT).as("inputField");
    cy.contains(SELECTORS.ADD_BUTTON).as("addButton");
    cy.contains(SELECTORS.DELETE_BUTTON).as("deleteButton");
    cy.contains(SELECTORS.CLEAR_BUTTON).as("cleanButton");
  });

  it("should have an inactive button when the input is empty", () => {
    cy.get("@inputField").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
  });

  it("add works correctly", () => {
    cy.get("@inputField").type("7").get("@addButton").click().wait(0);

    cy.get(SELECTORS.CIRCLE_TESTID)
      .eq(0)
      .within(() => {
        cy.get(SELECTORS.STATE_TESTID)
          .should("have.css", "border", COLORS.PURPLE_BORDER)
          .and("contain", 7);
        cy.get(SELECTORS.HEAD_TESTID)
          .should("contain", "top")
          .siblings(SELECTORS.INDEX_TESTID)
          .should("contain", 0);
      })
      .wait(500)
      .within(() => {
        cy.get(SELECTORS.STATE_TESTID).should(
          "have.css",
          "border",
          COLORS.BLUE_BORDER
        );
      });

    cy.get("@inputField").type("3").get("@addButton").click();

    cy.get(SELECTORS.CIRCLE_TESTID)
      .eq(0)
      .within(() => {
        cy.get(SELECTORS.HEAD_TESTID).should("contain", "");
      });

    cy.get(SELECTORS.CIRCLE_TESTID)
      .eq(1)
      .within(() => {
        cy.get(SELECTORS.STATE_TESTID)
          .should("have.css", "border", COLORS.PURPLE_BORDER)
          .and("contain", 3);
        cy.get(SELECTORS.HEAD_TESTID)
          .should("contain", "top")
          .siblings(SELECTORS.INDEX_TESTID)
          .should("contain", 1);
      })
      .wait(500)
      .within(() => {
        cy.get(SELECTORS.STATE_TESTID).should(
          "have.css",
          "border",
          COLORS.BLUE_BORDER
        );
      });
  });

  it("delete works correctly", () => {
    cy.get("@inputField").type("7").get("@addButton").click();
    cy.get("@inputField").type("3").get("@addButton").click();
    cy.get("@deleteButton").click().wait(0);

    cy.get(SELECTORS.CIRCLE_TESTID)
      .eq(1)
      .within(() => {
        cy.get(SELECTORS.STATE_TESTID)
          .should("have.css", "border", COLORS.PURPLE_BORDER)
          .and("contain", "3");
        cy.get(SELECTORS.HEAD_TESTID).should("contain", "top");
      });

    cy.wait(500);

    cy.get(SELECTORS.CIRCLE_TESTID).should("have.length", 1);
    cy.get(SELECTORS.CIRCLE_TESTID).within(() => {
      cy.get(SELECTORS.STATE_TESTID).should("contain", "7");
      cy.get(SELECTORS.HEAD_TESTID).should("contain", "top");
    });
  });

  it("clean works correctly", () => {
    cy.get("@inputField").type("7").get("@addButton").click();
    cy.get("@inputField").type("3").get("@addButton").click();
    cy.get("@inputField").type("5").get("@addButton").click();

    cy.get("@cleanButton")
      .click()
      .get(SELECTORS.CIRCLE_TESTID)
      .should("not.exist");
  });
});
