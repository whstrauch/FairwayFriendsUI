import React, { useEffect, useState } from 'react';
import {SafeAreaView, Text, View, TextInput} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Post } from '../../Components/PostComponents/Post';
import SearchComponent from '../../Components/SearchComponent';
import { useAuth } from '../../Context/UserContext';
import customFetch from '../../HelperFunctions/request';
import { useDebounce } from '../../HelperFunctions/useDebounce';

const Find = () => {

    // Search for course or user, ability to go to user page and course page (still to be created)
    // Have different types of results depending on if user or course, with filtering options
    

    const [searchInput, setSearchInput] = useState<string>('');
    const {user} = useAuth()
    const debouncedValue = useDebounce<string>(searchInput, 300)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [results, setResults] = useState<any[]>([])
    const URL = "user/search/"
    const [page, setPage] = useState(1)

        

    const refresh = () => {
        if (searchInput != "") {
            setRefreshing(true)
            const params = new URLSearchParams({
                query: searchInput
            })
            params.append("page", String(page + 1))
            
            customFetch(URL + params, "GET", undefined, user.jwt).then(data =>
                {
                setResults([...results, ...data])
                setRefreshing(false)
                }
            ).catch(error => setResults([]))
            setPage(page => page + 1)
        }
    }

    useEffect(() => {
        if (searchInput !== "") {
            const params = new URLSearchParams({
                query: searchInput
            })
           
            params.append("page", "1")
            
            customFetch(URL + params, "GET", undefined, user.jwt).then(data =>
                setResults([...data])
            ).catch(err => console.log(err))
        } else {
            setResults([])
        }
    }, [debouncedValue])



    return (
        <SafeAreaView style={{height: '100%'}}>
            <SearchComponent placeholder="Find a user" searchInput={searchInput} setSearchInput={setSearchInput}/>
            
        </SafeAreaView>
    );
};

export {Find};