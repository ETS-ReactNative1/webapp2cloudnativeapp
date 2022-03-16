import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const ChatScreen = () => {
  const onInit = () => {
    console.log('ChatScreen start');
  };

  const onEnd = () => {
    console.log('ChatScreen end');
  };

  useEffect(() => {
    onInit();

    return  onEnd;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChatScreen;
