import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import './components/i18n';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.render(

  <Suspense fallback={true}>
    <React.StrictMode>
      <PayPalScriptProvider options={{ "client-id": "AalkCw5fCXcb-Z4sT8GxdvJkxVdr1oXik6Xd1P7bfzQ5X9eqfgFlJgSKr46R4T7ZK81l1UoRmJMn84jV" }}>
        <App />
      </PayPalScriptProvider>
    </React.StrictMode>
  </Suspense>,

  document.getElementById('root')
);