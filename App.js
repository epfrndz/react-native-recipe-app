import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Header from './src/components/layout/Header';
import RecipesContainer from './src/components/containers/RecipesContainer';
import AppStack from './src/components/stacks/AppStack';

export default function App() {
  return (
    <NativeBaseProvider>
      {/* <Header />
      <RecipesContainer /> */}
      <AppStack />
      <StatusBar style="auto" />
    </NativeBaseProvider>
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
