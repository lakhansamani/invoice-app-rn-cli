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
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FC, useContext, useState} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {AuthContext} from '../context/auth';
import {Routes} from '../types/router';
import {GQL_API} from '../config/api';

export const AddInvoice: FC<BottomTabScreenProps<Routes, 'AddInvoice'>> = ({
  navigation,
}) => {
  const {authData} = useContext(AuthContext);
  const [values, setValues] = useState({
    number: '',
    date: '',
    amount: '',
    user_id: authData.id,
    note: '',
    numberError: '',
    dateError: '',
    amountError: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate required fields
    const {number, date, amount, note} = values;
    const isValidNumber = number && number.trim();
    const isValidDate = date && date.trim();
    const isValidAmount = amount && amount.trim() && !isNaN(Number(amount));
    const newValues = {
      ...values,
    };
    if (!isValidNumber) {
      newValues.numberError = 'Please enter a invoice number';
    } else {
      newValues.numberError = '';
    }
    if (!isValidDate) {
      newValues.dateError = 'Please enter a date';
    } else {
      newValues.dateError = '';
    }
    if (!isValidAmount) {
      newValues.amountError = 'Please enter a valid amount';
    } else {
      newValues.amountError = '';
    }
    setValues(newValues);
    if (!isValidNumber || !isValidDate || !isValidAmount) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(GQL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({
          query: `
            mutation insertData($data: invoices_insert_input!){
              insert_invoices_one(object: $data) {
                id
              }
            }
          `,
          variables: {
            data: {
              number,
              date,
              amount: Number(amount),
              user_id: authData.id,
              note,
            },
          },
        }),
      });
      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));
      // reset form
      setValues({
        number: '',
        date: '',
        amount: '',
        user_id: authData.id,
        note: '',
        numberError: '',
        dateError: '',
        amountError: '',
      });
      navigation.navigate('HomeStack');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="100%" alignItems="center" height="100%" bg="$coolGray200">
      <SafeAreaView edges={['bottom', 'left', 'right']}>
        <Heading mt="$10">Add new Invoice!</Heading>
        <Box bg="$white" width="$72" padding="$5" mt="$5" borderRadius="$lg">
          <FormControl
            size="lg"
            isRequired
            isInvalid={Boolean(values.numberError)}>
            <FormControlLabel mb="$1" mt="$3">
              <FormControlLabelText>Invoice Number</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                testID="InvoiceNumberInput"
                type="text"
                value={values.number}
                onChangeText={text => setValues({...values, number: text})}
                placeholder="INV-0001"
                placeholderTextColor="#dfdfdf"
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{values.numberError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl
            size="lg"
            isRequired
            isInvalid={Boolean(values.dateError)}>
            <FormControlLabel mb="$1" mt="$3">
              <FormControlLabelText>Date</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                testID="InvoiceDateInput"
                type="text"
                value={values.date}
                onChangeText={text => setValues({...values, date: text})}
                placeholder="Pick Date ->"
                placeholderTextColor="#dfdfdf"
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{values.dateError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl
            size="lg"
            isRequired
            isInvalid={Boolean(values.amountError)}>
            <FormControlLabel mb="$1" mt="$3">
              <FormControlLabelText>Amount ($)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                testID="InvoiceAmountInput"
                keyboardType="number-pad"
                value={values.amount}
                onChangeText={text => setValues({...values, amount: text})}
                placeholder="500"
                placeholderTextColor="#dfdfdf"
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{values.amountError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="lg">
            <FormControlLabel mb="$1" mt="$3">
              <FormControlLabelText>Note</FormControlLabelText>
            </FormControlLabel>

            <Textarea size="md">
              <TextareaInput
                testID="InvoiceNoteInput"
                value={values.note}
                onChangeText={text => setValues({...values, note: text})}
                placeholder="Small Description"
                placeholderTextColor="#dfdfdf"
              />
            </Textarea>
          </FormControl>

          <Button
            size="lg"
            mt="$3"
            onPress={handleSubmit}
            disabled={loading}
            testID="AddInvoiceButton">
            {loading && <ButtonSpinner mr="$1" />}
            <ButtonText>Save</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Box>
  );
};
