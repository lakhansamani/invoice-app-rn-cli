import React, {useEffect, useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {AUTH_API} from '../config/api';
import {Button, ButtonText, View} from '@gluestack-ui/themed';
import {Alert} from 'react-native';

export function Pay() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    const initializePaymentSheet = async () => {
      const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${AUTH_API}/payment-sheet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const {paymentIntent, ephemeralKey, customer} = await response.json();

        return {
          paymentIntent,
          ephemeralKey,
          customer,
        };
      };
      const {paymentIntent, ephemeralKey, customer} =
        await fetchPaymentSheetParams();

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });
      if (!error) {
        setLoading(true);
      }
    };
    initializePaymentSheet();
  }, [initPaymentSheet]);

  return (
    <View>
      <Button disabled={!loading} onPress={openPaymentSheet}>
        <ButtonText>Checkout</ButtonText>
      </Button>
    </View>
  );
}
