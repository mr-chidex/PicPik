const { assert } = require("chai");

const { expect } = require("chai");

it("should sum two numbers", () => {
  const num1 = 2;
  const num2 = 3;
  expect(num1 + num2).to.equal(5);
});

it("should not give a result of 6", () => {
  const num1 = 3;
  const num2 = 2;
  expect(num1 + num2).not.to.equal(6);
});
