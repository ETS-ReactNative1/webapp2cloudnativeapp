import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const Hello = () => {
  const [inputText, setInputText] = useState('');

  const onPressClear = async () => {
    setInputText('');
  };

  return (
    <View style={styles.container}>
      {!!inputText && (
        <View style={styles.row}>
          <Text style={styles.inputText}>Hello {inputText}!</Text>
        </View>
      )}
      <View style={styles.row}>
        <TextInput
          label="メッセージ"
          value={inputText}
          style={styles.input}
          onChangeText={text => setInputText(text)}
        />
        <Button
          mode="contained"
          icon="close"
          style={styles.button}
          onPress={onPressClear}
          disabled={!inputText}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px'
  },
  inputText: {
    margin: 10,
    padding: 10,
    maxWidth: 600,
    backgroundColor: 'lightgreen',
    borderRadius: 5
  },
  input: {
    margin: '5px'
  },
  button: {
    margin: '5px'
  }
});

export default Hello;
