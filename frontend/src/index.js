import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { loadTheme } from '@fluentui/react';

loadTheme({
  palette: {
    themePrimary: '#3d9bff',
    themeLighterAlt: '#02060a',
    themeLighter: '#0a1929',
    themeLight: '#122e4d',
    themeTertiary: '#255d99',
    themeSecondary: '#3688e0',
    themeDarkAlt: '#51a5ff',
    themeDark: '#6cb3ff',
    themeDarker: '#92c7ff',
    neutralLighterAlt: '#262a32',
    neutralLighter: '#262931',
    neutralLight: '#24282f',
    neutralQuaternaryAlt: '#22252c',
    neutralQuaternary: '#20232a',
    neutralTertiaryAlt: '#1f2228',
    neutralTertiary: '#f8f8f8',
    neutralSecondary: '#f9f9f9',
    neutralPrimaryAlt: '#fafafa',
    neutralPrimary: '#f5f5f5',
    neutralDark: '#fdfdfd',
    black: '#fefefe',
    white: '#282c34'
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
