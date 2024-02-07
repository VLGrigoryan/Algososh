import { baseUrl } from "../../src/constants/testConstants";
describe("Application Functionality Check", () => {
  it("The application should successfully start up", () => {
    cy.visit(baseUrl);
    cy.get("h1").should("contain", "МБОУ АЛГОСОШ");
  });
});
