export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidCredentialsError";
  }
}

export class UserNotFoundError extends Error {
  code: string

  constructor() {
    super();
    this.code = "NotFoundError";
  }
}

export class WrongPasswordError extends Error {
  code: string
  
  constructor() {
    super();
    this.code = "WrongPassword";
  }
}
