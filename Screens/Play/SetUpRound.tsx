import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TextInput, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { PlayStackNavigation } from '../../types';
import { Button } from '../../Components/Button';
import { StyleSheet } from 'react-native';
import { useFetch } from '../../HelperFunctions/dataHook';
import { useAuth } from '../../Context/UserContext';
import { preload } from 'swr';
import customFetch from '../../HelperFunctions/request';
import { useScore, TEMPLATESCORE } from '../../Context/ScoreContext';

type Props = NativeStackScreenProps<PlayStackNavigation, "SetUpRound">

const SetUpRound = ({route, navigation}: Props) => {
    const [numHoles, setNumHoles] = useState('18');
    const [scoreType, setScoreType] = useState('home');
    const [teeValue, setTeeValue] = useState("No Selection");
    const [startingHole, setStartingHole] = useState('1');
    const {user} = useAuth()
    const {score, setScore} = useScore()
    const URL = `course/get/${route.params.course.course_id}`

    const {isLoading, data, error} = useFetch(URL, "GET", undefined, user.jwt)
    

    const holes = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'},
        {label: '14', value: '14'},
        {label: '15', value: '15'},
        {label: '16', value: '16'},
        {label: '17', value: '17'},
        {label: '18', value: '18'}
    ]

    useEffect(() => {
        navigation.setOptions({
          title: route.params.course.course_name === '' ? 'Round Set Up' : route.params.course.course_name,
        });
      }, [navigation, route.params.course]);

    const nextPage = (page: string) => {
        if (teeValue === "No Selection") {
            Alert.alert("Please select your tees.")
        } else {
            customFetch(`course/tee/${teeValue}`, "GET", undefined, user.jwt).then(data => 
                setScore({
                    userScore: TEMPLATESCORE.map(item => {return {...item}}), 
                    holes: numHoles === "9" ? data.holes.slice(Number(startingHole) - 1, Number(startingHole) + Number(numHoles) - 1) : data.holes
                })
            ).then(data =>
                {if (page == 'PostRound') {
                    navigation.navigate('PostRound', {courseId: route.params.course.course_id, courseName: route.params.course.course_name})
                } else {
                    navigation.navigate("Scorekeeping", {
                        courseId: route.params.course.course_id,
                        courseName: route.params.course.course_name,
                        numHoles: numHoles,
                        tees: teeValue,
                        scoreType: scoreType,
                        startingHole: Number(startingHole)
                    })
            }}).catch(error => console.log(error))
        }
    }


    if (isLoading) {console.log("Loading"); return <SafeAreaView><Text>Loading...</Text><ActivityIndicator/></SafeAreaView>}
    if (error) {console.log("info", error.info); return <SafeAreaView><Text>Error... {error.info}</Text></SafeAreaView>}

    return (
        <SafeAreaView style={{height: '100%', backgroundColor: 'white', justifyContent: 'flex-end'}}>
            <KeyboardAvoidingView style={{flex: 0.8}} behavior='padding'>
                <View style={styles.section}>
                    <Text style={{marginLeft: 15, marginBottom: 5}}>Number of Holes:</Text>
                    <SegmentedButtons
                        density='regular'
                        value={numHoles}
                        onValueChange={setNumHoles}
                        buttons={[
                            {
                                value: '18',
                                label: '18',
                                style: {
                                    borderRadius: 20,
                                }
                                
                            },
                            {
                                value: '9',
                                label: '9',
                                style: {
                                    borderRadius: 20
                                }
                            }
                        ]}
                    />
                </View>
                <View style={[styles.section, {zIndex: 3}]}>
                    <Text style={{marginLeft: 15, marginBottom: 5}}>Tees:</Text>
                    <RNPickerSelect 
                        placeholder={{label: "Select your tees...", value: "No Selection"}}
                        onValueChange={(item) => setTeeValue(item)}
                        value={teeValue}
                        style={{inputIOS: {paddingLeft: 25, borderColor: 'grey', borderRadius: 20, minHeight: 44, borderWidth: 1}}}
                        items={data?.tees?.map((tee: any) => {return {label: tee.tee_name, value: tee.tee_id}}) || []}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={{marginLeft: 15, marginBottom: 5}}>Score Type:</Text>
                    <SegmentedButtons
                        density='regular'
                        value={scoreType}
                        onValueChange={setScoreType}
                        buttons={[
                            {
                                value: 'home',
                                label: 'Home',
                                style: {
                                    borderRadius: 20
                                }
                            },
                            {
                                value: 'away',
                                label: 'Away',
                            },
                            {
                                value: 'competition',
                                label: 'Competition',
                                style: {
                                    borderRadius: 20
                                }
                            }
                        ]}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={{marginLeft: 15, marginBottom: 5}}>Starting Hole:</Text>
                    <RNPickerSelect 
                        placeholder={{}}
                        onValueChange={(item) => setStartingHole(item)}
                        value={startingHole}
                        style={{inputIOS: {paddingLeft: 25, borderColor: 'grey', borderRadius: 20, minHeight: 44, borderWidth: 1}}}
                        items={holes}
                    />
                </View>
                <View style={[styles.section, {marginHorizontal: 0}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        {/* Add in validation for if tee set is selected */}
                        <Button
                            type='main'
                            style={{paddingVertical: 10, width: '40%'}}
                            text='Play new round' 
                            onPress={() =>  nextPage("Scorekeeping")}
                        />
                        {/* Add in validation for if tee set is selected */}        
                        <Button 
                            type='main'
                            style={{paddingVertical: 10, width: '40%'}}
                            text='Post old round' 
                            onPress={() => nextPage("PostRound")}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    section: {
        flex: 1,
        marginHorizontal: 20
    }
})

export default SetUpRound;