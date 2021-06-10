import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import './components/i18n';


ReactDOM.render(

  <Suspense fallback={true}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Suspense>,

  document.getElementById('root')
);