describe("Fibonacci Page Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/fibonacci");
      cy.get("input[name=fibonacci]").as("fibonacciInput");
      cy.contains("Рассчитать").as("calculateButton");
    });
  
    it("should have an inactive button when the input is empty", () => {
      cy.get("@fibonacciInput").should("have.value", "");
      cy.get("@calculateButton").should("be.disabled");
    });
  
    it("should have an inactive button when the input is invalid", () => {
      cy.get("@fibonacciInput").type("-1");
      cy.get("@calculateButton").should("be.disabled");
  
      cy.get("@fibonacciInput").clear().type("20");
      cy.get("@calculateButton").should("be.disabled");
    });
  
    it("generates Fibonacci sequence correctly", () => {
      const testCases = [
        { input: "0", expected: ["1"] },
        { input: "1", expected: ["1", "1"] },
        { input: "5", expected: ["1", "1", "2", "3", "5", "8"] },
      ];
  
      testCases.forEach((testCase) => {
        cy.get("@fibonacciInput").clear().type(testCase.input);
        cy.get("@calculateButton").click();
        
        cy.get('[data-testid="circle"]').should("have.length", testCase.expected.length);
  
        testCase.expected.forEach((value, index) => {
          cy.get('[data-testid="circle"]').eq(index).should("contain", value);
        });
      });
    });
  });
  