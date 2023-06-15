import { generateID } from "../utils/generate-id";

describe("Generate ID Testing", () => {
  it("Should to generate an 8 characters length ID", () => {
    const id = generateID(8);

    expect(id.length).toBe(8);
  });

  it("Should to generate an 8 characters length ID using A letter only", () => {
    const id = generateID(8, "A");

    expect(id).toEqual("AAAAAAAA");
  });
});
