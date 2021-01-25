import { apiCallBegan } from './api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './reducer';

interface SettingsData {
  items: {
    fields: {
      useTestSmsNumber: boolean;
    };
  }[];
}

interface SettingsStateSlice {
  useTestSmsNumber: boolean;
}

const settings = createSlice({
  name: 'settings',
  initialState: {
    useTestSmsNumber: false,
  },
  reducers: {
    settingsReceived: (state, action: PayloadAction<SettingsData>) => {
      const item = action.payload.items[0];
      state.useTestSmsNumber = item.fields.useTestSmsNumber;
    },
    settingsRequested: () => {},
    settingsRequestError: () => {},
  },
});

export default settings.reducer;

// Actions
export const addSettings = () =>
  apiCallBegan({
    url: '/entries',
    method: 'get',
    params: {
      content_type: 'appSettings',
      ['sys.id']: '1LpDGkpqKTzdUHepC1OH0R',
      select: 'fields.useTestSmsNumber',
    },
    onError: settings.actions.settingsRequestError.type,
    onSuccess: settings.actions.settingsReceived.type,
    onStart: settings.actions.settingsRequested.type,
  });

// Selectors
export const selectUseTestSmsNumber = (state: RootState) =>
  state.settings.useTestSmsNumber;
