import {validateEmail, validatePassword} from './validation';

test('validateEmail returns true for valid email', () => {
  const validEmail = 'test@gmail.com';
  expect(validateEmail(validEmail)).toBe(true);
  const invalidEmail = 'test';
  expect(validateEmail(invalidEmail)).toBe(false);
});

test('validate password', () => {
  const invalidPassword = '123';
  expect(validatePassword(invalidPassword)).toBe(false);
});
