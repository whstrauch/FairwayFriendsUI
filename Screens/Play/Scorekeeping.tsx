import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import AdvancedStatsButtons from '../../Components/AdvancedStatsButtons';
import { Button } from '../../Components/Button';
import { useScore } from '../../Context/ScoreContext';
import { PlayStackNavigation } from '../../types';

type Props = NativeStackScreenProps<PlayStackNavigation, "Scorekeeping">
type ScoreType = {
    score: string;
    gir: string;
    fir: string;
    finished: boolean
}



const Scorekeeping = ({route, navigation}: Props) => {
    // First fetch course data using hook/ have course id from select course page. Have tee information
    // So fetch array for tees of type: [{hole: 1, par: 4, yards: 345, handicap: 1}]
    // Then have scoring state to be saved on post: 
    // Have net index to be working off.
    const startingHole = route.params.startingHole
    const finishingHole = startingHole + Number(route.params.numHoles) > 19 ? startingHole + Number(route.params.numHoles) - 19 : startingHole + Number(route.params.numHoles) - 1
    const [currentHole, setCurrentHole] = useState<number>(route.params.startingHole);
    const [showAdvancedStats, setShowAdvancedStats] = useState<boolean>(false);
    const {score, setScore} = useScore();
    const [currTotal, setCurrTotal] = useState(0);

    const [currHoleScore, setCurrHoleScore] = useState<string>(score.userScore[0].score);
    const [gir, setGir] = useState(score.userScore[0].gir);
    const [fir, setFir] = useState(score.userScore[0].fir);
    const [putts, setPutts] = useState(score.userScore[0].putts);

    




    const nextHole = () => {
        const diff = currentHole - startingHole;
        const index2 = diff < 0 ? 18 + diff : diff
        // Must add handling for reaching end of number of holes
        currentHole === 18 ? setCurrentHole(1) : setCurrentHole(currentHole + 1)
        if (currHoleScore != '') {
            setScore({...score,
                userScore: score.userScore.map((item: any, index: number) => 
                index === index2 ? {...item, finished: true, score: currHoleScore, gir: gir, fir: fir, putts: putts} : item
            )})
            if (score.userScore[index2] !== undefined && (!score.userScore[index2].finished || currHoleScore != score.userScore[index2].score)) {
                setCurrTotal(prev => prev + Number(currHoleScore) - Number(score?.holes[currentHole - 1].par))
            }
        }
        // Set for next par and yardage and handicap
        // Save advanced stats to score: Must figure out type
        // Clear stats
        if (score.userScore[index2 + 1] !== undefined && score.userScore[index2 + 1].score != '') {
            setCurrHoleScore(score.userScore[index2 + 1].score)
            setPutts(score.userScore[index2 + 1].putts)
            setGir(score.userScore[index2 + 1].gir)
            setFir(score.userScore[index2 + 1].fir)
        } else {
            setCurrHoleScore('')
            setPutts('')
            setGir('')
            setFir('')
        }
        

    }

    const lastHole = () => {
        const diff = currentHole - startingHole;
        const index = diff < 0 ? 17 + diff : diff - 1
        // Must add handling for reaching end of number of holes
        currentHole === 1 ? setCurrentHole(18) : setCurrentHole(currentHole - 1)
        // Set for next par and yardage and handicap4
        const index2 = diff < 0 ? 18 + diff : diff
        if (currHoleScore != '') {
            setScore({...score,
                userScore: score.userScore.map((item: any, index: number) => 
                index === index2 ? {...item, finished: true, score: currHoleScore, gir: gir, fir: fir, putts: putts} : item
            )})
            if (score.userScore[index2] !== undefined && (!score.userScore[index2].finished || currHoleScore != score.userScore[index2].score)) {
                setCurrTotal(prev => prev + Number(currHoleScore) - Number(score.holes[currentHole - 1].par))
            }
        }

        // Retrieve advanced stats from array
        if (score.userScore[index] !== undefined && score.userScore[index].score != '') {
            setCurrHoleScore(score.userScore[index].score)
            setPutts(score.userScore[index].putts)
            setGir(score.userScore[index].gir)
            setFir(score.userScore[index].fir)
        } else {
            setCurrHoleScore('')
            setPutts('')
            setGir('')
            setFir('')
        }

    }

    const postRound = () => {
        const diff = currentHole - startingHole;
        const index2 = diff < 0 ? 18 + diff : diff
        if (currHoleScore != '') {
            setScore({...score,
                userScore: score.userScore.map((item: any, index: number) => 
                index === index2 ? {...item, finished: true, score: currHoleScore, gir: gir, fir: fir, putts: putts} : item
            )})
            if (score.userScore[index2] !== undefined && (!score.userScore[index2].finished || currHoleScore != score.userScore[index2].score)) {
                setCurrTotal(prev => prev + Number(currHoleScore) - Number(score.holes[currentHole - 1].par))
            }
        }
        navigation.navigate("PostRound", {courseId: route.params.courseId, courseName: route.params.courseName})
    }

    useEffect(() => {
        navigation.setOptions({
          title: route.params.courseName,
          headerTitleStyle: styles.title
        });
      }, [navigation, route.params.courseName]);

    

    return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={{height: '100%'}}>
                    
                    <Divider />
                    <View style={{marginLeft: 30, flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 26, fontWeight: '600'}}>Hole {currentHole}</Text>
                            <Text style={{fontSize: 16, fontWeight: '500'}}>Par {score?.holes[currentHole - 1]?.par} | {score?.holes[currentHole - 1]?.length} Yards | {score?.holes[currentHole - 1]?.allocation} Handicap</Text>
                        </View>
                        <Text style={{alignSelf: 'center', marginLeft: 'auto', fontSize: 16, fontWeight: '500', marginRight: 10}}>Total: {currTotal === 0 ? 'E' : currTotal > 0 ? '+' + currTotal : currTotal}</Text>
                    </View>
                    <KeyboardAvoidingView behavior='padding' style={{flex: 1,justifyContent: 'flex-start'}}>
                    <View style={{flexDirection: 'row', marginTop: 30, alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: '500', marginLeft: 30}}>Score:    </Text>
                        <TextInput
                            style={{borderColor: 'grey',borderBottomWidth: 0.5, fontSize: 30, height: 50, width: 50}}
                            value={currHoleScore}
                            onChangeText={setCurrHoleScore}
                            keyboardType="number-pad"
                            textAlign='center'
                            maxLength={2}
                        />
                    </View>
                   
                        <Button type='main' text={(showAdvancedStats ? 'Hide' : 'Show') + ' Advanced Stats'} style={{height: 35, width: '60%', alignSelf: 'center', marginTop: 20}} textStyle={{fontSize: 14}} onPress={() => setShowAdvancedStats(!showAdvancedStats)}/>
                        {showAdvancedStats && <AdvancedStatsButtons putts= {putts} gir={gir} fir={fir} setGIR={setGir} setFIR={setFir} setPutts={setPutts}/>}
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20}}>
                            {currentHole !== startingHole && <Button
                                type='main' 
                                style={{width: '30%', height: 35}}
                                textStyle={{fontSize: 14}}
                                text="Previous Hole" 
                                onPress={() => lastHole()}
                            />}
                            {currentHole !== finishingHole ? <Button
                                type='main' 
                                style={{width: '30%', height: 35}}
                                textStyle={{fontSize: 14}}
                                text='Next Hole' 
                                onPress={() => nextHole()}
                            
                            /> :
                                <Button
                                    type='main'
                                    style={{width: '30%', height: 35}}
                                    textStyle={{fontSize: 14}}
                                    text='Post Round' 
                                    onPress={() => postRound()}
                                />
                            }
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 28,
        color: 'black'
    }
})
export {Scorekeeping};