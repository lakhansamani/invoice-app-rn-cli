import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  ButtonSpinner,
  Heading,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useContext, useState} from 'react';

import {validateEmail} from '../utils/validation';
import {AuthContext} from '../context/auth';
import {AUTH_API} from '../config/api';

export const Login = () => {
  const {setAuthData} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  });

  const setEmailValidation = () => {
    if (!validateEmail(values.email)) {
      setValues({
        ...values,
        emailError: 'Please enter a valid email',
      });
    } else {
      setValues({...values, emailError: ''});
    }
  };

  const setPasswordValidation = () => {
    if (!values.password || !values.password.trim()) {
      setValues({
        ...values,
        passwordError: 'Please enter a password',
      });
    } else {
      setValues({...values, passwordError: ''});
    }
  };

  const handleSubmit = async () => {
    try {
      const {email, password} = values;
      const isValidEmail = validateEmail(email);
      const isValidPassword = password && password.trim();
      const newValues = {
        ...values,
      };
      if (!isValidEmail) {
        newValues.emailError = 'Please enter a valid email';
      }
      if (!isValidPassword) {
        newValues.passwordError = 'Please enter a password';
      }
      setValues(newValues);
      if (!isValidEmail || !isValidPassword) {
        return;
      }
      setLoading(true);
      const res = await fetch(`${AUTH_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const {token, id} = await res.json();
      setAuthData({
        token,
        email,
        id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width="100%"
      justifyContent="center"
      alignItems="center"
      height="100%"
      bg="$coolGray200"
      style={{
        marginTop: -50,
      }}>
      <Heading>Welcome,</Heading>
      <Heading>Invoicing on your tips!</Heading>
      <Box bg="$white" width="$72" padding="$5" mt="$5" borderRadius="$lg">
        <SafeAreaView>
          <FormControl
            size="lg"
            isRequired
            isInvalid={Boolean(values.emailError)}>
            <FormControlLabel mb="$1" mt="$3">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                testID="EmailInput"
                type="text"
                keyboardType="email-address"
                value={values.email}
                onChangeText={text => setValues({...values, email: text})}
                onBlur={setEmailValidation}
                placeholder="name@domain.com"
                placeholderTextColor="#dfdfdf"
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{values.emailError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl
            size="lg"
            isRequired
            isInvalid={Boolean(values.passwordError)}>
            <FormControlLabel mb="$1" mt="$3">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                testID="PasswordInput"
                type="password"
                value={values.password}
                onChangeText={text => setValues({...values, password: text})}
                onBlur={setPasswordValidation}
                placeholder="********"
                placeholderTextColor="#dfdfdf"
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>
                {values.passwordError}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button
            size="lg"
            mt="$3"
            onPress={handleSubmit}
            disabled={loading}
            testID="LoginButton">
            {loading && <ButtonSpinner mr="$1" />}
            <ButtonText>{loading ? 'Signing in...' : 'Sign In'}</ButtonText>
          </Button>
        </SafeAreaView>
      </Box>
    </Box>
  );
};
