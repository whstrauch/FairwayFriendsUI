import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, TextInput, ScrollView, StyleSheet, InputAccessoryView, TouchableOpacity, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Divider } from 'react-native-paper';
import { useScore } from '../Context/ScoreContext';
import { useAuth } from '../Context/UserContext';
import { useFetch } from '../HelperFunctions/dataHook';
import customFetch from '../HelperFunctions/request';
import { Button } from './Button';
import { Hole } from './Hole';
import { IRButton } from './IRButton';



const QuickScore = (props: any) => {
    const textInputRefs = useRef<(TextInput | null)[]>([]);
    const puttInputRefs = useRef<(TextInput | null)[]>([])
    const currRef = useRef(0);
    const [showAdvancedStats, setShowAdvancedStats] = useState(false);
    const enableScroll = useRef(true);
    const { score, setScore } = useScore();
    const { user } = useAuth();
    

    const handleNextInputFocus = () => {
        console.log(currRef.current)
        if (showAdvancedStats) {
            if (currRef.current != null && currRef.current + 1 < textInputRefs.current.length && textInputRefs.current[currRef.current + 1] != null) {
                textInputRefs.current && (textInputRefs.current[currRef.current]?.isFocused() ? puttInputRefs.current[currRef.current]?.focus() : textInputRefs.current[currRef.current + 1]?.focus())
                }
        } else {
            if (currRef.current != null && currRef.current + 1 < textInputRefs.current.length && textInputRefs.current[currRef.current + 1] != null) {
                textInputRefs.current && textInputRefs.current[currRef.current + 1]?.focus()
            }
        }
    };
    const handleLastInputFocus = () => {
        console.log(currRef.current)
        if (showAdvancedStats) {
            if (currRef.current != null && currRef.current > 0 && textInputRefs.current[currRef.current - 1] != null) {
                textInputRefs.current && (textInputRefs.current[currRef.current]?.isFocused() ? puttInputRefs.current[currRef.current - 1]?.focus() : textInputRefs.current[currRef.current]?.focus() )
            }
        } else {
            if (currRef.current != null && currRef.current > 0 && textInputRefs.current[currRef.current - 1] != null) {
                textInputRefs.current && textInputRefs.current[currRef.current - 1]?.focus() 
            }
        }
        
    };

    

    return (
        <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <FlatList
                    scrollEnabled={enableScroll.current}
                    ListHeaderComponent={() => 
                        <Hole 
                            hole={{hole_number: "Hole", length: "Yardage",  allocation:"Handicap",  par:"Par"}} 
                            labels={{score: "Score", gir: "GIR", fir: "FIR", putts: "Putts", }} 
                            index={0} textStyle={{fontSize: 14}} 
                            showAdvancedStats={showAdvancedStats}
                        />
                    }
                    ListFooterComponent={() => 
                        <Hole 
                            hole={{hole_number: "Total", length: score.holes.reduce((accum:number, curr:{length: number}) => accum + Number(curr.length), 0), allocation: "", par: score.holes.reduce((accum: number, curr: {par: number}) => accum + Number(curr.par), 0)}} 
                            labels={{score: score.userScore.reduce((accum:number, curr:{score: string}) => accum + Number(curr.score), 0), putts: score.userScore.reduce((accum: number, curr: {putts: string}) => accum + Number(curr.putts), 0), gir: score.userScore.reduce((accum: number, curr: {gir: string}) => accum + Number(curr.gir == "check"), 0), fir: score.userScore.reduce((accum: number, curr: {fir: string}) => accum + Number(curr.fir == "check"), 0)}}
                            style={{borderLeftWidth: 1}} 
                            index={18} 
                            showAdvancedStats={showAdvancedStats}                     
                        />
                    }
                    horizontal={true}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    data={score.holes}
                    renderItem={({item, index}) => 
                        (
                            <Hole hole={item} index={index} showAdvancedStats={showAdvancedStats} currRef={currRef} textInputRefs={textInputRefs} puttInputRefs={puttInputRefs}/>
                        )
                    }
                >
                </FlatList>
                {/* <InputAccessoryView 
                    nativeID='id' 
                    style={{height: 50, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}
                >   
                    <GreenButton text="Previous" onPress={() => handleLastInputFocus()} style ={[styles.nextButtonContainer, {marginHorizontal: 10}]} />
                    <View style={{flex: 1}}></View>
                    <GreenButton text="Next" onPress={() => handleNextInputFocus()} style={[styles.nextButtonContainer, {marginLeft: 'auto', marginRight: 10}]}/>
                </InputAccessoryView> */}
            </View>    
            {showAdvancedStats ? 
                <Button type='main' text='Hide Advanced Stats' onPress={() => setShowAdvancedStats(!showAdvancedStats)} style={{marginLeft: 'auto', padding: 10, borderRadius: 0, borderEndStartRadius: 10, backgroundColor: '#eaeaea', borderBottomWidth: 1, borderLeftWidth: 1}} textStyle={{fontSize: 10, color: 'black'}}/>
                    :
                    <Button type='main' text='Show Advanced Stats' onPress={() => setShowAdvancedStats(!showAdvancedStats)} style={{marginLeft: 'auto', padding: 10, borderRadius: 0, borderEndStartRadius: 10}} textStyle={{fontSize: 10}}/>            }
        </View>

    );
};

const styles = StyleSheet.create({
    scorecardTextContainer: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center', 
        borderBottomWidth: 1,
        height: 50
    },
    scorecardText: {
        fontSize: 18,
        padding: 10,
        borderBottomWidth: 1
    },
    nextButtonContainer: {
        flex: 1,
        height: 40,
        borderRadius: 10,

    }
})


export {QuickScore};