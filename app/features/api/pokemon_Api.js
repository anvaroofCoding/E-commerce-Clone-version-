import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products",
  }),

  tagTypes: ["Products"],

  endpoints: (build) => ({
    // GET categories (bor)
    get_Categories: build.query({
      query: () => "/categories",
    }),

    // GET all products
    get_Products: build.query({
      query: ({ search = "", limit = 10, skip = 10 }) =>
        `/search?q=${search}&limit=${limit}&skip=${skip}`,
      providesTags: ["Products"],
    }),

    // GET for Search products
    get_ProductsSearch: build.query({
      query: ({ search = "" }) => `/search?q=${search}`,
      providesTags: ["Products"],
    }),

    // GET for Search products
    getIDProduct: build.query({
      query: (id) => `/${id}`,
      providesTags: ["Products"],
    }),

    // POST / add product
    add_Product: build.mutation({
      query: (newProduct) => ({
        url: "/add",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // PUT / update product
    update_Product: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Products"],
    }),

    // DELETE product
    delete_Product: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// ✅ auto generated hooks
export const {
  useGetIDProductQuery,
  useGet_CategoriesQuery,
  useGet_ProductsQuery,
  useAdd_ProductMutation,
  useUpdate_ProductMutation,
  useDelete_ProductMutation,
  useGet_ProductsSearchQuery,
} = pokemonApi;
