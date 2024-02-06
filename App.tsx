import React from 'react';
// import {useEffect} from 'react';
// import {NativeModules} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme
import {StripeProvider} from '@stripe/stripe-react-native';
import 'react-native-gesture-handler';
import {PubNubProvider} from 'pubnub-react';
import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: 'pub-c-c01a330b-982c-42a7-a452-6f68c7f60268',
  subscribeKey: 'sub-c-dc173d48-471e-4b62-a9cd-4332031592bd',
  uuid: Date.now().toString(),
});

// TODO : Remove while using ios
// const {GreetingModule} = NativeModules;

import {AuthProvider} from './src/context/auth';
import {Tabs} from './src/routes/Tabs';

export default function App() {
  // useEffect(() => {
  //   // TODO: Remove while using ios
  //   const res = GreetingModule.greetHuman('Lakhan', 'welcome to Gluestack');
  //   console.log(res);
  // }, []);
  return (
    <PubNubProvider client={pubnub}>
      <NavigationContainer>
        <GluestackUIProvider config={config}>
          <StripeProvider
            publishableKey="pk_test_51OgcQ6IDnGcng56m2IjZDqgn5VJdBLtTCbXUu9WK4AA0wlwY62GuYuQ8g9Kjudk8hXFSKTpM0tJhYlMzT44eCoCn00LgGGcE5A"
            urlScheme="com.invoiceapp"
            merchantIdentifier="merchant.com.invoiceapp" // required for Apple Pay
          >
            <AuthProvider>
              <Tabs />
            </AuthProvider>
          </StripeProvider>
        </GluestackUIProvider>
      </NavigationContainer>
    </PubNubProvider>
  );
}
