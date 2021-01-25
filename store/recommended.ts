import { createSlice } from '@reduxjs/toolkit';
import { Escort, getEscorts } from './escorts';
import { apiCallBegan } from './api';
interface SliceState {
  data: Escort[];
  loading: boolean;
}
const recommended = createSlice({
  name: 'recommended',
  initialState: {
    data: [],
    loading: false,
  } as SliceState,
  reducers: {
    recommendedRequested: recommended => {
      recommended.loading = true;
    },

    recommendedError: recommended => {
      recommended.loading = false;
    },

    recommendedReceived: (recommended, action) => {
      if (action.payload.items.length === 0) return;
      recommended.data = getEscorts(action.payload);
      recommended.loading = false;
    },
  },
});

//Actions

export const addRecommended = (): ReturnType<typeof apiCallBegan> =>
  apiCallBegan({
    method: 'get',
    url: '/entries',
    params: {
      content_type: 'escorts',
      limit: 20,
      'fields.tags[in]': 'Recommended',
    },
    onStart: recommended.actions.recommendedRequested.type,
    onSuccess: recommended.actions.recommendedReceived.type,
  });

export default recommended.reducer;
