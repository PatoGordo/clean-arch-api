import { User } from "../../../../domain/entities/user";
import {
  inMemoryDB,
  resetInMemoryDB,
} from "../../../../infra/database/in-memory/db";
import { InMemoryAuthRepository } from "../../../../infra/database/in-memory/repositories/in-memory-auth.repository";
import {
  inMemoryMail,
  resetInMemoryMail,
} from "../../../../infra/mail/in-memory";
import { InMemoryMailer } from "../../../../infra/mail/in-memory/adapters/in-memory-mail";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";

describe("Testing Forgot Password Use Case", () => {
  const repository = new InMemoryAuthRepository();
  const inMemoryMailer = new InMemoryMailer();

  it("Should to send the fake email and be an valid token", async () => {
    resetInMemoryMail();
    resetInMemoryDB();

    const testingMail = "test@in-memory.sys";

    inMemoryDB.users.push(
      new User({
        email: testingMail,
        name: "Testing User",
        password: "12345678",
      }),
    );

    const useCase = new ForgotPasswordUseCase(repository, inMemoryMailer);

    await useCase.execute({
      email: testingMail,
    });

    expect(inMemoryMail[testingMail].inbox.length).toBeGreaterThan(0);
  });

  it("Should to throw and error because it isnt valid email", async () => {
    resetInMemoryMail();
    resetInMemoryDB();

    const testingMail = "test@in-memory.sys";

    const testingUser = new User({
      email: testingMail,
      name: "Testing User",
      password: "12345678",
    });

    inMemoryDB.users.push(testingUser);

    const useCase = new ForgotPasswordUseCase(repository, inMemoryMailer);

    await useCase.execute({
      email: testingMail,
    });

    expect(inMemoryMail[testingMail].inbox.length).toEqual(1);
  });
});
