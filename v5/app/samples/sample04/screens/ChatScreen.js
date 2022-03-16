import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import {
  createChatSession,
  sendChatMessage,
  deleteChatSession,
} from '../libs/BackendAccessor';

const ChatScreen = () => {
  const [sessionId, setSessionId] = useState(null);
  const [sendText, setSendText] = useState('');
  const [recvText, setRecvText] = useState('');

  const onInit = async () => {
    console.log('ChatScreen start');
    try {
      const session = await createChatSession();
      setSessionId(session.session_id);
      console.log(session);
    } catch (error) {
      console.error(error);
    }
  };

  const onEnd = async () => {
    console.log('ChatScreen end');
    try {
      await deleteChatSession(sessionId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onInit();

    return  onEnd;
  }, []);

  const onPressSend = async () => {
    const chatRecv = await sendChatMessage(
      sessionId,
      sendText,
    );
    setRecvText(chatRecv.responseText);
    setSendText('');
  };

  const onPressClear = async () => {
    setSendText('');
  };

  return (
    <View style={styles.container}>
      {!!recvText && (
        <View style={styles.row}>
          <Text style={styles.recvText}>{recvText}</Text>
        </View>
      )}
      <View style={styles.row}>
        <TextInput
          label="送信メッセージ"
          value={sendText}
          style={styles.input}
          onChangeText={text => setSendText(text)}
        />
        <Button
          mode="contained"
          icon="send"
          style={styles.button}
          onPress={onPressSend}
          disabled={!sendText || !sessionId}
        >
          送信
        </Button>
        <Button
          mode="contained"
          icon="close"
          style={styles.button}
          onPress={onPressClear}
          disabled={!sendText}
        >
          クリア
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recvText: {
    margin: 10,
    padding: 10,
    maxWidth: 600,
    backgroundColor: 'lightgreen',
    borderRadius: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px'
  },
  input: {
    margin: '5px'
  },
  button: {
    margin: '5px'
  }
});

export default ChatScreen;
