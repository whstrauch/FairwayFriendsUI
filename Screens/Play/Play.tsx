import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {ActivityIndicator, Dimensions, FlatList, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Pressable, Text, View} from 'react-native';
import { Divider } from 'react-native-paper';
import SearchComponent from '../../Components/SearchComponent';
import { useAuth } from '../../Context/UserContext';
import customFetch from '../../HelperFunctions/request';
import { useDebounce } from '../../HelperFunctions/useDebounce';
import { PlayStackNavigation } from '../../types';
import Animated, {useAnimatedKeyboard, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

type Props  = NativeStackScreenProps<PlayStackNavigation>




const CourseItem = ({course}: any) => {

    const navigation = useNavigation<NativeStackNavigationProp<PlayStackNavigation>>()

    return(
        <Pressable style={{padding: 10, minHeight: 50, justifyContent: 'center', marginLeft: 10}} onPress={() => navigation.navigate("SetUpRound", {course: course})}>
            <Text>{course.facility_name} {course.course_name !== course.facility_name ? `- ${course.course_name}` : ""}</Text>
            <Text style={{color: "gray", fontSize: 10}}>{course.course_city}, {course.course_state}</Text>
        </Pressable>
    )
}

const Play = ({navigation}: Props) => {
    const {user} = useAuth()
    const [input, setInput] = useState<string>('');
    const debouncedValue = useDebounce<string>(input, 300)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [results, setResults] = useState<any[]>([])
    const URL = "course/search/"
    const [page, setPage] = useState(1);
    const keyboard = useAnimatedKeyboard();
    const heightStyle = useAnimatedStyle(() => {
        return {
            height: keyboard.state.value == 1 || keyboard.state.value == 2 ? "90%" : "auto",
          };
    })

    useEffect(() => {
        if (input !== "") {
            const splits = input.split(",")
            const params = new URLSearchParams({
                query: splits[0]
            })
            if (splits.length == 2) {
                params.append("city", splits[1])
            } else if (splits.length == 3) {
                params.append("state", splits[2])
            }
            params.append("page", "1")
            
            customFetch(URL + params, "GET", undefined, user.jwt).then(data =>
                setResults([...data])
            ).catch(err => console.log(err))
        } else {
            setResults([])
        }
    }, [debouncedValue])

    const refresh = () => {
        if (input != "") {
            setRefreshing(true)
            const splits = input.split(",")
            const params = new URLSearchParams({
                query: splits[0]
            })
            if (splits.length == 2) {
                params.append("city", splits[1])
            } else if (splits.length == 3) {
                params.append("state", splits[2])
            }
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


    return (
        <ImageBackground  style={{height: '100%', width: '100%', justifyContent: 'flex-end'}} resizeMode="cover" source={require('/Users/willstrauch/FairwayFriendsMain/UI/FairwayFriends/Assets/gettyimages-152128198-1024x1024.jpg')}>
                <Animated.View style={[heightStyle, {backgroundColor: 'white', minHeight: '40%', maxHeight: '90%'}]}>
                    <SearchComponent placeholder='Find course' searchInput={input} setSearchInput={setInput} style={{marginBottom: 'auto'}}/>
                    <FlatList
                        data={results}
                        keyboardShouldPersistTaps='handled'
                        renderItem={({item}) => <CourseItem course={item}/>}
                        ListHeaderComponent={() => <Text style={{fontSize: 10, color: 'grey', marginLeft: 10}}>{input == "" ? "" : "Searching for: '" + input + "'"}</Text>}
                        onEndReached={() => refresh()}
                        onEndReachedThreshold={1}
                        ItemSeparatorComponent={() => <Divider />}
                    >

                    </FlatList>
                    {refreshing ? <ActivityIndicator /> : null}
                </Animated.View>
            
        </ImageBackground>
    );
};

export {Play};