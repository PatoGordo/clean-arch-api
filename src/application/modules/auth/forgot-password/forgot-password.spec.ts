import { User } from "../../../../domain/entities/user";
import {
  inMemoryDB,
  resetInMemoryDB,
} from "../../../../infra/database/in-memory/db";
import { InMemoryAuthRepository } from "../../../../infra/database/in-memory/repositories/in-memory-auth.repository";
import { inMemoryMail } from "../../../../infra/mail/in-memory";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";

describe("Testing Forgot Password Use Case", () => {
  const repository = new InMemoryAuthRepository();

  it("Should to send the fake email and be an valid token", async () => {
    resetInMemoryDB();

    inMemoryDB.users.push(
      new User({
        email: "test@in-memory.sys",
        name: "Testing User",
        password: "12345678",
      }),
    );

    const useCase = new ForgotPasswordUseCase(repository);

    await useCase.execute({
      email: "test@in-memory.sys",
    });
  });
});
