const atLeastMinimumLength = (password: string) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password: string) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password: string) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password: string) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password: string) => new RegExp(/(?=.*?[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/).test(password);

export enum PasswordStrength {
  STRONG = 'STRONG',
  MEDIUM = 'MEDIUM',
  WEAK = 'WEAK'
}

export const testingPasswordStrength = (password?: string) => {
  if (!password) return PasswordStrength.WEAK
  let points = 0
  if (atLeastMinimumLength(password)) points += 1
  if (atLeastOneUppercaseLetter(password)) points += 1
  if (atLeastOneLowercaseLetter(password)) points += 1
  if (atLeastOneNumber(password)) points += 1
  if (atLeastOneSpecialChar(password)) points += 1
  if (points >= 5) return PasswordStrength.STRONG
  if (points >= 3) return PasswordStrength.MEDIUM
  return PasswordStrength.WEAK
}

