export class SelfRequestError extends Error {
  code: string

  constructor(message: string) {
    super(message);
    this.code = 'SELF_REQUEST_NOT_ALLOWED';
  }
}

export class RelationshipError extends Error {
  code: string

  constructor(message: string) {
    super(message);
    this.code = 'ALREADY_EXISTS_BETWEEN_USERS';
  }
}