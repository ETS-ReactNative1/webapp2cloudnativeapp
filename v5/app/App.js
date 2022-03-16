import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Hello from './components/Hello';


const theme = {
  ...DefaultTheme
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Hello />
    </PaperProvider>
  );
}

export default App;