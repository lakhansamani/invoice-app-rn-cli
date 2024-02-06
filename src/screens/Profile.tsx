import React from 'react';
import {View, Text, Button, ButtonText, Heading} from '@gluestack-ui/themed';
import {useContext} from 'react';
import {AuthContext} from '../context/auth';

export const Profile = () => {
  const {authData, setAuthData} = useContext(AuthContext);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Heading>Welcome</Heading>
      <Text>{authData.email}</Text>
      <Button
        testID="LogoutButton"
        mt="$10"
        size="sm"
        onPress={() => {
          setAuthData({
            token: '',
            email: '',
            id: '',
          });
        }}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
};
