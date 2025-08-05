import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './slices/alertSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    theme: themeReducer,
  },
});
