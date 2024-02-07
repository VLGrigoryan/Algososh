import { baseUrl, SELECTORS, COLORS } from "../../src/constants/testConstants";

describe("String Component Tests", () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/recursion`);
  });

  it("should disable the button when the input is empty", () => {
    cy.get(SELECTORS.STRING_INPUT).type("{selectall}{backspace}");
    cy.get(SELECTORS.FORM).submit();
    cy.get(SELECTORS.SUBMIT_BUTTON).should("be.disabled");
  });

  it("should unfold the string correctly with animation and style checks", () => {
    cy.get(SELECTORS.STRING_INPUT).type("123");
    cy.contains(SELECTORS.UNFOLD_BUTTON).click();

    cy.get(SELECTORS.STATE_TESTID).as("states");

    cy.get("@states").eq(0).should("contain", "1");
    cy.get("@states").eq(1).should("contain", "2");
    cy.get("@states").eq(2).should("contain", "3");

    cy.wait(1000);
    cy.get("@states")
      .eq(0)
      .should("have.css", "border", COLORS.PURPLE_BORDER)
      .and("contain", "1");
    cy.get("@states")
      .eq(1)
      .should("have.css", "border", COLORS.BLUE_BORDER)
      .and("contain", "2");
    cy.get("@states")
      .eq(2)
      .should("have.css", "border", COLORS.PURPLE_BORDER)
      .and("contain", "3");

    cy.wait(2000);
    cy.get("@states")
      .eq(0)
      .should("have.css", "border", COLORS.GREEN_BORDER)
      .and("contain", "3");
    cy.get("@states")
      .eq(1)
      .should("have.css", "border", COLORS.GREEN_BORDER)
      .and("contain", "2");
    cy.get("@states")
      .eq(2)
      .should("have.css", "border", COLORS.GREEN_BORDER)
      .and("contain", "1");
  });
});
