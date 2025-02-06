import { describe, it, expect } from "vitest";
import db from "../src/db"; 

describe("Database Connection", () => {
  it("should be defined", () => {
    expect(db).toBeDefined();
  });
});