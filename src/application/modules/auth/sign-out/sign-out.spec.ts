import { Session } from "../../../../domain/entities/session";
import {
  inMemoryDB,
  resetInMemoryDB,
} from "../../../../infra/database/in-memory/db";
import { InMemoryAuthRepository } from "../../../../infra/database/in-memory/repositories/in-memory-auth.repository";
import { SignOutUseCase } from "./sign-out.usecase";

describe("Testing Sign Out UseCase", () => {
  const repository = new InMemoryAuthRepository();

  it("Should to Sign Out without errors", async () => {
    resetInMemoryDB();

    const testingToken = "abcd";

    const session = new Session({
      token: testingToken,
      expires_at: new Date(),
      last_access: new Date(),
      link: "dcba",
    });

    inMemoryDB.sessions.push(session);

    const usecase = new SignOutUseCase(repository);

    const sut = await usecase.execute({ token: testingToken });

    expect(sut).toEqual(undefined);
    expect(inMemoryDB.sessions.length).toEqual(0);
  });
});
