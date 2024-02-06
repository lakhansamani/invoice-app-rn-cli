import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
  View,
} from '@gluestack-ui/themed';
import {usePubNub} from 'pubnub-react';

export const Chat = () => {
  const pubnub = usePubNub();
  const [channels] = useState(['react-native']);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message) {
      pubnub
        .publish({channel: channels[0], message})
        .then(() => setMessage(''));
    }
  };

  useEffect(() => {
    const handleMessage = (event: any) => {
      const m = event.message;
      if (typeof m === 'string' || m.hasOwnProperty('text')) {
        const text = m.text || m;
        setMessages([...messages, text]);
      }
    };
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});
  }, [pubnub, channels, messages]);

  return (
    <View padding="$2">
      <Box h="$5/6">
        {messages.map((m, index) => (
          <Box bg="$white" width="$72" p="$5" my="$2" key={index}>
            <Text>{m}</Text>
          </Box>
        ))}
      </Box>
      <Input size="md" variant="outline">
        <InputField
          placeholder="Send message"
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <Button onPress={sendMessage}>
          <ButtonText>Send</ButtonText>
        </Button>
      </Input>
    </View>
  );
};
