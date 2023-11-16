export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('The organization already exists.')
  }
}
