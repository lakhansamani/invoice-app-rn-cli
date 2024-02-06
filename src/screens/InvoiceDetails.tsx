import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FC} from 'react';
import {Routes} from '../types/router';
import {View, Text} from '@gluestack-ui/themed';

export const InvoiceDetails: FC<StackScreenProps<Routes, 'InvoiceDetails'>> = ({
  route,
}) => {
  const params = route.params as {
    id: string;
  };
  return (
    <View>
      <Text>Invoice Details {params.id}</Text>
    </View>
  );
};
