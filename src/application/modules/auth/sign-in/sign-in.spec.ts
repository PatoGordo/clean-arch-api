import { Profile } from "../../../../domain/entities/profile";
import { User } from "../../../../domain/entities/user";
import {
  inMemoryDB,
  resetInMemoryDB,
} from "../../../../infra/database/in-memory/db";
import { InMemoryAuthRepository } from "../../../../infra/database/in-memory/repositories/in-memory-auth.repository";
import bcrypt from "bcryptjs";
import { SignInUseCase } from "./sign-in.usecase";

describe("Testing Sign In UseCase", () => {
  const repository = new InMemoryAuthRepository();

  it("Should to Sign In without errors", async () => {
    resetInMemoryDB();

    const user = new User({
      email: "test@in-memory.sys",
      name: "Test In Memory",
      password: bcrypt.hashSync("12345678", 11),
    });

    const profile = new Profile({
      user,
      user_id: user.id,
    });

    user.profile = profile;
    user.profile_id = profile.id;

    inMemoryDB.users.push(user);
    inMemoryDB.profiles.push(profile);

    const useCase = new SignInUseCase(repository);

    const result = await useCase.execute({
      email: "test@in-memory.sys",
      password: "12345678",
    });

    expect(result.user).toBe(user);
    expect(result.profile.user_id).toBe(user.id);
    expect(result.user.profile_id).toBe(profile.id);
    expect(result.user.profile).toBe(profile);
    expect(result.profile.user).toBe(user);
    expect(
      inMemoryDB.sessions.find(session => session.token === result.token),
    ).toBeTruthy();
  });

  it("Should to Sign In with errors in the email", async () => {
    resetInMemoryDB();

    const useCase = new SignInUseCase(repository);

    const result = useCase.execute({
      email: "wrong-test@in-memory.sys",
      password: "12345678",
    });

    expect(result).rejects.toThrow();
  });
});
