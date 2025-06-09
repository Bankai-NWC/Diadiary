import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import { store } from './store/index.js';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

createRoot(document.getElementById('root')).render(
  <>
    {/* <ThemeProvider theme={darkTheme}> */}
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    {/* </ThemeProvider> */}
  </>,
);
