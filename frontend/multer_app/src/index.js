import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import UserState from './context/UserContext/UserState';
import { CSSReset, ChakraProvider, extendTheme } from '@chakra-ui/react'
import FileState from './context/FileContext/FileState';
const theme = extendTheme({
  styles: {
    global: {
      // Override the CSS reset by leaving this blank
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider resetCss={false} resetScope=".ck-reset" theme={theme}>
    <BrowserRouter>
      <UserState>
        <FileState>
          <App />
        </FileState>
      </UserState>
    </BrowserRouter>
  </ChakraProvider>
);

reportWebVitals();
