import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const onInit = () => {
    console.log('HomeScreen start');
  };

  const onEnd = () => {
    console.log('HomeScreen end');
  };

  useEffect(() => {
    onInit();

    return  onEnd;
  }, []);

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="message"
        style={styles.button}
        onPress={() => navigation.navigate('Chat')} >
        チャット画面へ
      </Button>
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
  button: {
    margin: '5px'
  }
});

export default HomeScreen;
