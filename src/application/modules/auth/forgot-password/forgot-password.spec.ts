import { User } from "../../../../domain/entities/user";
import {
  inMemoryDB,
  resetInMemoryDB,
} from "../../../../infra/database/in-memory/db";
import { InMemoryAuthRepository } from "../../../../infra/database/in-memory/repositories/in-memory-auth.repository";
import { inMemoryMail } from "../../../../infra/mail/in-memory";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";
import jwt from "jsonwebtoken";

describe("Testing Forgot Password Use Case", () => {
  const repository = new InMemoryAuthRepository();

  it("Should to send the fake email and be an valid token", async () => {
    resetInMemoryDB();

    const testingMail = "test@in-memory.sys";

    inMemoryDB.users.push(
      new User({
        email: testingMail,
        name: "Testing User",
        password: "12345678",
      }),
    );

    const useCase = new ForgotPasswordUseCase(repository);

    await useCase.execute({
      email: testingMail,
    });

    expect(inMemoryMail[testingMail].inbox[0].from).toEqual(
      "no-reply@in-memory.sys",
    );
  });

  it("Should to throw and error because it isnt valid email", async () => {
    resetInMemoryDB();

    const testingMail = "test@in-memory.sys";

    const testingUser = new User({
      email: testingMail,
      name: "Testing User",
      password: "12345678",
    });

    inMemoryDB.users.push(testingUser);

    const useCase = new ForgotPasswordUseCase(repository);

    await useCase.execute({
      email: testingMail,
    });

    const receiverMailBox = inMemoryMail[testingMail].inbox;

    const isTokenValid = jwt.verify(
      receiverMailBox[0].body,
      "<testing_reset_password_token>",
    );

    expect(typeof isTokenValid).not.toEqual("string");
    expect(receiverMailBox[0].from).toEqual("no-reply@in-memory.sys");
  });
});
