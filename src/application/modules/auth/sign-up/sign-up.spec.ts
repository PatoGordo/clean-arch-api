import {
  inMemoryDB,
  resetInMemoryDB,
} from "../../../../infra/database/in-memory/db";
import { InMemoryAuthRepository } from "../../../../infra/database/in-memory/repositories/in-memory-auth.repository";
import { SignUpUseCase } from "./sign-up.usecase";

describe("Testing Sign Up UseCase", () => {
  resetInMemoryDB();

  const repository = new InMemoryAuthRepository();

  it("Should to Register a new User without errors", async () => {
    const useCase = new SignUpUseCase(repository);

    const result = await useCase.execute({
      name: "Testing",
      email: "test@in-memory.sys",
      password: "12345678",
    });

    expect(result.user.email).toEqual("test@in-memory.sys");
    expect(
      inMemoryDB.users.find(user => user.email === result.user.email),
    ).toBeTruthy();
    expect(
      inMemoryDB.sessions.find(session => session.user_id === result.user.id),
    ).toBeTruthy();
  });

  it("Should to throw an error in the User registration, the email already exists", async () => {
    resetInMemoryDB();

    const useCase = new SignUpUseCase(repository);

    await useCase.execute({
      name: "Testing",
      email: "test@in-memory.sys",
      password: "12345678",
    });

    const result = useCase.execute({
      name: "Testing",
      email: "test@in-memory.sys",
      password: "12345678",
    });

    expect(result).rejects.toThrow();
  });
});
