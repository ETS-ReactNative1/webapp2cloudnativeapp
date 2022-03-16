import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Text } from 'react-native-paper';

const theme = {
  ...DefaultTheme
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;