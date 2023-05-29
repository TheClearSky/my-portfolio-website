import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let backendurl;

if(import.meta.env.VITE_CURRENT_ENVIRONMENT==="DEV")
{
    backendurl=import.meta.env.VITE_BACKEND_URL_DEV;
}
else
{
    backendurl=import.meta.env.VITE_BACKEND_URL;
}
//extract this to env file
const baseQuery=fetchBaseQuery({ 
    baseUrl: backendurl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
    
        // If we have a token in localstorage, pass it
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
    
        return headers
      },
});

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        login: builder.mutation({

            query: ({email, password}) => ({
                url: "/login",
                method: 'POST',
                body: {email, password},
            }),

            invalidatesTags: ['User'],
            transformResponse: (response, meta, arg) =>
            {
                let {token,...rest}=response;
                localStorage.setItem("token", token);
                return rest;
            }
        }),
        logout: builder.mutation({

            query: () => ({
                url: "/logout",
                method: 'POST',
            }),

            invalidatesTags: ['User'],
            transformResponse: (response, meta, arg) =>
            {
                localStorage.removeItem("token");
                return response;
            }
        }),
        register: builder.mutation({

            query: ({name, email, password}) => ({
                url: "/register",
                method: 'POST',
                body: {name, email, password},
            }),

            invalidatesTags: ['User'],
            transformResponse: (response, meta, arg) =>
            {
                let {token,...rest}=response;
                localStorage.setItem("token", token);
                return rest;
            }
        }),
        getProfile: builder.query({

            query: () => ({
                url: "/profile",
                method: 'GET',
            }),

            providesTags: ['User'],
        }),
        updateProfile: builder.mutation({

            query: (updateObject) => ({
                url: "/profile",
                method: 'PUT',
                body: updateObject,
            }),

            invalidatesTags: ['User'],
            transformResponse: (response, meta, arg) =>
            {
                let {token,...rest}=response;
                localStorage.setItem("token", token);
                return rest;
            }
        }),
        makeGuestUser: builder.mutation({

            query: () => ({
                url: "/makeguestuser",
                method: 'GET',
            }),

            invalidatesTags: ['User'],
            transformResponse: (response, meta, arg) =>
            {
                let {token,...rest}=response;
                localStorage.setItem("token", token);
                return rest;
            }
        })
    }),
})

export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useGetProfileQuery,useUpdateProfileMutation,useMakeGuestUserMutation } = userApi;