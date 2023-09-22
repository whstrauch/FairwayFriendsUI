import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, KeyboardAvoidingView, SafeAreaView, Text, TextInput, View } from 'react-native';
import SearchComponent from '../../Components/SearchComponent';
import { WelcomeBlock } from '../../Components/WelcomeBlock';
import { useAuth } from '../../Context/UserContext';
import customFetch from '../../HelperFunctions/request';

const image = require('/Users/willstrauch/FairwayFriendsMain/UI/FairwayFriends/Assets/PebbleVertical.jpg')

const FindCourse = () => {
    const [input, setInput] = useState<string>('');
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [results, setResults] = useState<any[]>([]);
    const {user} = useAuth();
    const URL = "course/search/"


    const refresh = () => {
        setRefreshing(true)
        setTimeout(() => {setRefreshing(false);console.log("Fetched new data")}, 2000)
    }

    useEffect(() => {
        const splits = input.split(",")
        const params = new URLSearchParams({
            query: splits[0],
            city: splits[1],
            state: splits[2]
        })
        customFetch(URL + params, "GET", undefined, user.jwt).then(data =>
            setResults(prev => [...prev, ...data])
        )
        
    }, [input])

    return (
        <KeyboardAvoidingView style={{height: '100%'}} behavior="padding">
            <WelcomeBlock image={image} />
            <View style={{height: '50%', backgroundColor: 'white'}} >
                <SearchComponent placeholder='Find course' searchInput={input} setSearchInput={setInput} style={{marginBottom: 'auto'}}/>
                <FlatList
                    data={[1]}
                    renderItem={({item}) => <Text>{item}</Text>}
                    ListHeaderComponent={() => <Text style={{fontSize: 10, color: 'grey'}}>{input == "" ? "Recently Played" : `Searching for: '${input}'`}</Text>}
                    onEndReached={() => refresh()}
                    onEndReachedThreshold={0}
                >

                </FlatList>
                {refreshing ? <ActivityIndicator /> : null}
            </View>
        </KeyboardAvoidingView>
        
    );
};

export {FindCourse};