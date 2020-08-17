import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes />

    <GlobalStyles />
  </BrowserRouter>
);

export default App;
