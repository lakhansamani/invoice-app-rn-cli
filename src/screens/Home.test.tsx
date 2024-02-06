import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Home} from './Home';

test('renders home screen', async () => {
  render(
    <GluestackUIProvider config={config}>
      <Home navigation={{} as any} route={{} as any} />
    </GluestackUIProvider>,
  );
  const loading = await screen.findByLabelText('loading');
  expect(loading).toBeTruthy();
  await waitForElementToBeRemoved(() => screen.getByLabelText('loading'));
  // Get text
  const text = screen.getByText('Your Invoices');
  expect(text).toBeTruthy();
});
