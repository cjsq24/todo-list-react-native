import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Todo from './src/views/todo/Todo'

export default function App() {
  return (
    <NativeBaseProvider>
      <Todo />
    </NativeBaseProvider>
  );
}