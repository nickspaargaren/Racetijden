import time from "../fixtures/time.json";

describe("Set new time test", () => {
  it("Should show no times set if no times are set", () => {
    cy.visit("/");

    cy.get(`[data-cy="${time.circuit}"]`).click();
    cy.get(`[data-cy="notimes"]`).should("have.text", "Nog geen tijden");
  });

  it("Should be able to set a new time", () => {
    cy.visit(`/circuits/${time.slug}`);

    cy.url().should("include", `/circuits/${time.slug}`);

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
      time.circuit,
    );
    cy.get(`[data-cy="latesttime"] > div:first-child > p small`).should(
      "have.text",
      time.gamertag,
    );

    cy.get(`[data-cy="latesttime"]`).click();

    cy.url().should("include", `/circuits/${time.slug}`);

    cy.get("main").contains(time.gamertag);
    cy.get("main").contains(time.time);
  });

  after(() => {
    cy.exec("make database-reset");
  });
});

export {};
