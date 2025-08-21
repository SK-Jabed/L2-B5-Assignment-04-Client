import { configureStore } from "@reduxjs/toolkit";
import { libraryApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(libraryApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;