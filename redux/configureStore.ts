"use client";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import demoSlice from "./demoReducer"; // <--- Not for use, this is just an example
import sidebarSlice from "@/container/sidebar/SidebarReducer";
import floorSlice from "@/container/master/floor/FloorReducer";
import chamberSlice from "@/container/master/chamber/ChamberReducer";
import rackSlice from "@/container/master/rack/RackReducer";
import pocketSlice from "@/container/master/pocket/PocketReducer";
import agentSlice from "@/container/master/agent/AgentReducer";
import rentSlice from "@/container/master/rent/RentReducer";
import bankAccountSlice from "@/container/master/bankAccount/BankAccountReducer";
import bookingSearchSlice from "@/common/form/bookingSearchForm/BookingSearchFormReducer";
import bondSearchSlice from "@/common/form/bondSearchForm/BondSearchFormReducer";

export const store = configureStore({
  reducer: {
    abc: demoSlice, // <--- Not for use, this is just an example
    sidebar: sidebarSlice,
    floor: floorSlice,
    chamber: chamberSlice,
    rack: rackSlice,
    pocket: pocketSlice,
    agent: agentSlice,
    rent: rentSlice,
    bankAccount: bankAccountSlice,
    bookingSearch: bookingSearchSlice,
    bondSearch: bondSearchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
