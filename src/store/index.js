import {configureStore} from "@reduxjs/toolkit";
import mainScreenSlice from "./mainScreenSlice";
import bookSlice from "./bookSlice";


export default configureStore({
    reducer: {
        mainScreenState: mainScreenSlice,
        bookState: bookSlice
    },
})