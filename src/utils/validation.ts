export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string,
  criteria = 'six_digit',
): boolean => {
  // write switch case for validating password with different criteria
  // should have 6 digits & 1 special character

  switch (criteria) {
    case 'six_digit':
      return password.length >= 6;
    case 'six_digit_one_special':
      return (
        password.length >= 6 &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
      );
    default:
      return false;
  }
};
