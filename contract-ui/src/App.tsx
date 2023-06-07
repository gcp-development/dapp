import React from 'react';
import './App.css';
import HomePage from "./components/HomePage";

import { UseInkProvider } from 'useink';
import { ShibuyaTestnet } from 'useink/chains';

function App() {
  return (
<UseInkProvider 
      config={{ 
        dappName: 'ERC-20', 
        chains: [ShibuyaTestnet] ,
        caller: {
          // DEV default caller address to be used before a user connects their wallet.
          default: "5FNXJqU9i14rxvsmfCihVLFeDs68VZPjvqNqwMkGvfX9xiWT", 
        }
      }}
    >
    <HomePage></HomePage>
    </UseInkProvider>
  );
}

export default App;
