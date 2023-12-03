import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Filter {
  title: string;
  date: string;
}

interface FilterState {
  currentFilter: Filter | null;
}

const initialState: FilterState = {
  currentFilter: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.currentFilter = action.payload;
    },
    clearFilter: state => {
      state.currentFilter = null;
    },
  },
});

export const {setFilter, clearFilter} = filterSlice.actions;
export default filterSlice.reducer;
