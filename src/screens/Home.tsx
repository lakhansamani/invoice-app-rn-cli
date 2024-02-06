import React, {useEffect, useState, useContext, FC} from 'react';
import {
  View,
  Text,
  Box,
  FlatList,
  VStack,
  Heading,
  HStack,
  Spinner,
} from '@gluestack-ui/themed';

import {AuthContext} from '../context/auth';
import {GQL_API} from '../config/api';
import {Invoice} from '../types/invoice';
import {StackScreenProps} from '@react-navigation/stack';
import {Routes} from '../types/router';

export const Home: FC<StackScreenProps<Routes, 'HomeScreen'>> = ({
  navigation,
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const {authData} = useContext(AuthContext);
  useEffect(() => {
    let isComponentMounted = true;
    async function getInvoices() {
      try {
        const response = await fetch(GQL_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.token}`,
          },
          body: JSON.stringify({
            query: `
            query {
              invoices(order_by: {
                created_at: desc
              }) {
                id
                number
                date
                amount
                note
              }
            }
          `,
          }),
        });
        const data = await response.json();
        if (isComponentMounted && data.data) {
          setInvoices(data.data.invoices);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getInvoices();
    return () => {
      isComponentMounted = false;
    };
  }, [authData.token]);
  console.log(invoices);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading ? (
        <Spinner data-testid="spinner" testID="HomeScreenLoading" />
      ) : (
        <>
          <Heading my="$5" testID="HomeScreenTitle">
            Your Invoices
          </Heading>
          {invoices.length ? (
            <FlatList
              data={invoices}
              keyExtractor={item => (item as Invoice).id}
              renderItem={({item}) => {
                return (
                  <Box bg="$white" width="$72" p="$5" my="$2">
                    <VStack>
                      <HStack>
                        <Text
                          color="$coolGray800"
                          fontWeight="$bold"
                          $dark-color="$warmGray100">
                          {(item as Invoice).number}
                        </Text>
                        <Text
                          color="$coolGray600"
                          $dark-color="$warmGray200"
                          ml="auto"
                          onPress={() => {
                            navigation.navigate('InvoiceDetails', {
                              id: (item as Invoice).id,
                            });
                          }}>
                          View
                        </Text>
                      </HStack>
                      <Text color="$coolGray600" $dark-color="$warmGray200">
                        Amount: {(item as Invoice).amount}$
                      </Text>
                      <Text color="$coolGray600" $dark-color="$warmGray200">
                        Date: {(item as Invoice).date}
                      </Text>
                    </VStack>
                  </Box>
                );
              }}
            />
          ) : (
            <Heading my="$5">No Invoices Found! Add new</Heading>
          )}
        </>
      )}
    </View>
  );
};
