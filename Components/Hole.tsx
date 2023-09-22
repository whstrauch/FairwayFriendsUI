import React, { Ref, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useScore } from "../Context/ScoreContext";
import { IRButton } from "./IRButton";



type HoleProps = {
    index: number;
    hole: {
        hole_number: string;
        length: number | string;
        par: number | string;
        allocation: number | string;
    };
    labels?: {
        score: string | number;
        putts: string | number;
        gir: string | number;
        fir: string | number;
    };
    style?: object;
    textStyle?: object;
    showAdvancedStats: boolean;
    textInputRefs?: any
    currRef?: any
    puttInputRefs?: any
}

const Hole = (props: HoleProps) => {
    const {score, setScore} = useScore();

    const setGir = (val: boolean) => {
        const newScore = score.userScore.map((score: any, index: number) => {
            if (index == props.index) {
                return {
                    ...score,
                    gir: val ? "check" : "miss"
                }
            } else {
                return {...score}
            }
        })
        setScore({
            ...score,
            userScore: newScore
        })
    }

    const setFir = (val: boolean) => {
        const newScore = score.userScore.map((score: any, index: number) => {
            if (index == props.index) {
                return {
                    ...score,
                    fir: val ? "check" : "miss"
                }
            } else {
                return {...score}
            }
        })
        setScore({
            ...score,
            userScore: newScore
        })
        
    }

    const setHoleScore = (val: string) => {
        const newScore = score.userScore.map((score: any, index: number) => {
            if (index == props.index) {
                return {
                    ...score,
                    score: val
                }
            } else {
                return {...score}
            }
        })
        setScore({
            ...score,
            userScore: newScore
        })
    }

    const setPuttScore = (val: string) => {
        const newScore = score.userScore.map((score: any, index: number) => {
            if (index == props.index) {
                return {
                    ...score,
                    putts: val
                }
            } else {
                return {...score}
            }
        })
        setScore({
            ...score,
            userScore: newScore
        })
    }
    


    return (
        <View style={[{borderRightWidth: props.index != 17 ? 1 : 0, borderTopWidth: 1, minWidth: 55}, props.style]}>
            <View style={[styles.scorecardTextContainer, {backgroundColor: '#c8c8c8'}]}>
                <Text style={[styles.scorecardText, props.textStyle]}>{props.hole.hole_number}</Text>
            </View>
            <View style={styles.scorecardTextContainer}>
                <Text style={[styles.scorecardText, props.textStyle]}>{props.hole.length}</Text>
            </View>
            <View style={[styles.scorecardTextContainer, {backgroundColor: '#c8c8c8'}]}>
                <Text style={[styles.scorecardText, props.textStyle]}>{props.hole.allocation}</Text>
            </View>
            <View style={[styles.scorecardTextContainer, {backgroundColor: '#c8c8c8'}]}>
                <Text style={[styles.scorecardText, props.textStyle]}>{props.hole.par}</Text>
            </View>
            {props.labels !== undefined ? <View style={styles.scorecardTextContainer}><Text style={[styles.scorecardText, props.textStyle]}>{props.labels.score}</Text></View> :
            <View style={[styles.scorecardTextContainer, {flex: 1}]}>
                <TextInput
                    inputAccessoryViewID='id'
                    ref={(ref) => (props.textInputRefs.current[props.index] = ref)}
                    style={[styles.scorecardText, {borderBottomWidth: 0, width: '100%', textAlign: 'center'}]}
                    keyboardType={'numeric'}
                    value={score?.userScore[props.index]?.score}
                    onChangeText={setHoleScore}
                    returnKeyType="next"
                    onFocus={() => {
                        props.currRef.current = props.index;           
                    }}
                />
            </View>}
            {props.showAdvancedStats && 
                <>
                {props.labels !== undefined ? <View style={styles.scorecardTextContainer}><Text style={[styles.scorecardText, props.textStyle]}>{props.labels.putts}</Text></View>: <View style={[styles.scorecardTextContainer, ]}>
                    <TextInput 
                        inputAccessoryViewID='id'
                        value={score?.userScore[props.index]?.putts}
                        onChangeText={setPuttScore}
                        ref={(ref) => (props.puttInputRefs.current[props.index] = ref)}
                        style={[styles.scorecardText, {borderBottomWidth: 0, width: '100%', textAlign: 'center'}]}
                        keyboardType={'numeric'}
                        returnKeyType="next"
                        onFocus={() => {
                            props.currRef.current = props.index;           
                        }} 
                    />
                </View>}
                {props.labels !== undefined ? <View style={styles.scorecardTextContainer}><Text style={[styles.scorecardText, props.textStyle]}>{props.labels.gir}</Text></View> :
                <View style={[styles.scorecardTextContainer]}>
                    {/* <TextInput 
                        style={[styles.scorecardText, {borderBottomWidth: 0, width: '100%', textAlign: 'center'}]}
                        keyboardType={'numeric'}
                        returnKeyType="next"   
                    /> */}
                    <IRButton checked={score?.userScore[props.index]?.gir == 'check'} setChecked={setGir}/>
                </View>}
                {props.labels !== undefined ? 
                    <View style={styles.scorecardTextContainer}>
                        <Text style={[styles.scorecardText, props.textStyle]}>{props.labels.fir}</Text>
                    </View>
                        : 
                    <View style={[styles.scorecardTextContainer, ]}>
                        <IRButton checked={score?.userScore[props.index]?.fir == 'check'} setChecked={setFir}/>
                    </View>}
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    scorecardTextContainer: {
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

export {Hole}