describe("String Component Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("should disable the button when the input is empty", () => {
    cy.get('[name="string"]').type("{selectall}{backspace}");
    cy.get("form").submit();
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("should unfold the string correctly with animation and style checks", () => {
    cy.get("input").type("123");
    cy.contains("Развернуть").click();

    cy.get('[data-testid="state"]').as("states");

    // Initial state
    cy.get("@states").eq(0).should("contain", "1");
    cy.get("@states").eq(1).should("contain", "2");
    cy.get("@states").eq(2).should("contain", "3");

    // After 1 second
    cy.wait(1000);
    cy.get("@states")
      .eq(0)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .and("contain", "1");
    cy.get("@states")
      .eq(1)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .and("contain", "2");
    cy.get("@states")
      .eq(2)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .and("contain", "3");

    // After 2 seconds
    cy.wait(2000);
    cy.get("@states")
      .eq(0)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .and("contain", "3");
    cy.get("@states")
      .eq(1)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .and("contain", "2");
    cy.get("@states")
      .eq(2)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .and("contain", "1");
  });
});
