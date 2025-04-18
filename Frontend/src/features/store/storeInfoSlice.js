import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import storeInfoService from "./storeInfoService";

const initialState = {
  storeInfo: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getStoreInfo = createAsyncThunk(
  "store/get",
  async (_, thunkAPI) => {
    try {
      const response = await storeInfoService.getStoreInfo();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

export const addOrUpdateStoreInfo = createAsyncThunk(
  "store/add-or-update-store-info",
  async (store, thunkAPI) => {
    try {
      return await storeInfoService.addOrUpdateStoreInfo(store);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

export const deleteStoreInfo = createAsyncThunk(
  "store/delete-store-info",
  async (id, thunkAPI) => {
    try {
      return await storeInfoService.deleteStoreInfo(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

export const resetState = createAction("Reset_all");

const storeInfoSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoreInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.storeInfo = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(getStoreInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addOrUpdateStoreInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrUpdateStoreInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload;
        const index = state.storeInfo.findIndex(
          (item) => item.id === updated.id
        );

        if (index !== -1) {
          state.storeInfo[index] = updated;
        } else {
          state.storeInfo.push(updated);
        }
      })
      .addCase(addOrUpdateStoreInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStoreInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStoreInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.storeInfo = state.storeInfo.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteStoreInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default storeInfoSlice.reducer;

export const storeReducer = storeInfoSlice.reducer;
