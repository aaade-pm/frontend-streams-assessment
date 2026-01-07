import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IconRailState {
  isExpanded: boolean;
  isMobileOpen: boolean;
}

const initialState: IconRailState = {
  isExpanded: false,
  isMobileOpen: false,
};

const iconRailSlice = createSlice({
  name: "iconRail",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    setExpanded: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload;
    },
    toggleMobile: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileOpen = action.payload;
    },
  },
});

export const { toggle, setExpanded, toggleMobile, setMobileOpen } =
  iconRailSlice.actions;
export default iconRailSlice.reducer;
