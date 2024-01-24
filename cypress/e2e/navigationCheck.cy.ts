describe("Application works correctly with routes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open the main page by default", () => {
    cy.get("div > a").should("be.visible").and("have.length", 6);
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  const testPageNavigation = (index, pageName) => {
    cy.get("div > a").eq(index).click();
    cy.contains(pageName);
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  };

  it("should open the string page after the string link click", () => {
    testPageNavigation(0, "Строка");
  });

  it("should open the Fibonacci page after the Fibonacci link click", () => {
    testPageNavigation(1, "Фибоначчи");
  });

  it("should open the Sorting page after the Sorting link click", () => {
    testPageNavigation(2, "Сортировка");
  });

  it("should open the Stack page after the Stack link click", () => {
    testPageNavigation(3, "Стек");
  });

  it("should open the Queue page after the Queue link click", () => {
    testPageNavigation(4, "Очередь");
  });

  it("should open the List page after the List link click", () => {
    testPageNavigation(5, "Связный список");
  });
});
