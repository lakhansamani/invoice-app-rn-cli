import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {Login} from './Login';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

test('renders login screen', async () => {
  render(
    <GluestackUIProvider config={config}>
      <Login />
    </GluestackUIProvider>,
  );
  const emailInput = screen.getByPlaceholderText('name@domain.com');
  const passwordInput = screen.getByPlaceholderText('********');
  const loginButton = screen.getByText('Sign In');

  fireEvent.changeText(emailInput, 'test@gmail.com');
  fireEvent.changeText(passwordInput, 'Test@123#');
  fireEvent.press(loginButton);

  // Wait for 10 seconds for the loading to disappear
  await waitForElementToBeRemoved(() => screen.getByText('Signing in...'), {
    timeout: 10000,
  });
});
