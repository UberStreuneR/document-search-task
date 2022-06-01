import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export interface Document {
  id: number;
  name: string;
  date: string;
  description?: string;
}
type DocsResponse = Document[];
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  endpoints: builder => ({
    getDocuments: builder.query<DocsResponse, void>({
      query: () => "/documents",
    }),
  }),
});

export const { useGetDocumentsQuery } = apiSlice;

export const selectGetDocumentsResult =
  apiSlice.endpoints.getDocuments.select();
export const selectGetDocumentsResultData = createSelector(
  [selectGetDocumentsResult],
  result => result.data
);
export const selectDocumentById = createSelector(
  [selectGetDocumentsResultData, (state, id) => id],
  (result, id) => result.find(item => item.id == id)
);
