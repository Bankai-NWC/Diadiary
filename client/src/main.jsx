import App from '@components/App.jsx';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { store } from '@store/index.js';
import { darkTheme, lightTheme } from '@themes/index.js';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';

function ThemedApp() {
  const themeMode = useSelector(state => state.theme.theme);
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemedApp />
  </Provider>,
);
