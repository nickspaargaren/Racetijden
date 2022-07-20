import time from "../fixtures/time.json";

describe("Set new time test", () => {
  before(() => {
    cy.visit("/");
  });

  it("Should show no times set if no times are set", () => {
    cy.get(`[data-cy="${time.circuit}"]`).click();
    cy.get(`[data-cy="notimes"]`).should("have.text", "Nog geen tijden");
  });

  it("Should be able to set a new time", () => {
    cy.get(`[data-cy="gamertag"]`).type(time.gamertag);
    cy.get(`[data-cy="time"]`).type(time.time);
    cy.get(`[data-cy="submit"]`).click();

    cy.get("main").contains(time.gamertag);
    cy.get("main").contains(time.time);
  });

  it("Should be able to update the latest time", () => {
    cy.visit("/");

    cy.get(`[data-cy="latesttime"] > div:first-child > p:first-child`).should(
      "have.text",
      time.circuit
    );
    cy.get(`[data-cy="latesttime"] > div:first-child > p small`).should(
      "have.text",
      time.gamertag
    );
  });

  after(() => {
    cy.exec("make database-reset");
  });
});

export {};
