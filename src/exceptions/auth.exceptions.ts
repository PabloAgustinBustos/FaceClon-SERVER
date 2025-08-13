export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidCredentialsError";
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("User doesn't exist");
    this.name = "NotFoundError";
  }
}
