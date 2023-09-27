import { useState, useEffect } from "react";
import customFetch from "./request";
import useSWR from 'swr';

export const useFetch = (path, method="POST", body, token="", condition=true) => {

    const {data, error, isLoading, mutate } = useSWR([path, method, body, token], ([path, method, body, token]) => customFetch(path, method, body, token))
    return { isLoading, data, error, mutate };
  };

export const useUser = (user_id, token) => {
    const {data, error, isLoading, mutate } = useSWR([`user/${user_id}`, token], ([url, token]) => customFetch(url, "GET", undefined, token))

    return {
        user: data,
        isLoading,
        error,
        mutate
    }
}
