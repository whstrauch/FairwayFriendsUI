import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { Button } from '../../Components/Button';
import { Hole } from '../../Components/Hole';
import { useFetch } from '../../HelperFunctions/dataHook';
import customFetch from '../../HelperFunctions/request';
import { HomeStackNavigation } from '../../types';

type props = NativeStackScreenProps<HomeStackNavigation, "Score">

const Hole2 = (props: any) => {
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
                <Text style={styles.scorecardText}>{props.score.score}</Text>
            </View>}
            {props.showAdvancedStats && 
                <>
                {props.labels !== undefined ? <View style={styles.scorecardTextContainer}><Text style={[styles.scorecardText, props.textStyle]}>{props.labels.putts}</Text></View>: <View style={[styles.scorecardTextContainer, ]}>
                    <Text style={styles.scorecardText}>{props.score.putts}</Text>
                </View>}
                {props.labels !== undefined ? <View style={styles.scorecardTextContainer}><Text style={[styles.scorecardText, props.textStyle]}>{props.labels.gir}</Text></View> :
                <View style={[styles.scorecardTextContainer]}>
                    <Text style={styles.scorecardText}>{props.score.gir}</Text>
                </View>}
                {props.labels !== undefined ? 
                    <View style={styles.scorecardTextContainer}>
                        <Text style={[styles.scorecardText, props.textStyle]}>{props.labels.fir}</Text>
                    </View>
                        : 
                    <View style={[styles.scorecardTextContainer, ]}>
                        <Text style={styles.scorecardText}>{props.score.fir}</Text>
                    </View>}
                </>
            }
        </View>
    )
}

const Score = ({route}: props) => {
    // Fetch score data from mongodb
    const {isLoading, data} = useFetch(`score/get/${route?.params?.postId}`, "GET", undefined)
    const [showAdvancedStats, setShowAdvancedStats] = useState(false)

    useEffect(() => {
        if (data?.score[0].putts !== "") {
            setShowAdvancedStats(true)
        }
    }, [data])

    return (
        <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => <Hole2 
                        hole={{hole_number: "Hole", length: "Yardage",  allocation:"Handicap",  par:"Par"}} 
                        labels={{score: "Score", gir: "GIR", fir: "FIR", putts: "Putts", }} 
                        index={0} textStyle={{fontSize: 14}} 
                        showAdvancedStats={showAdvancedStats}
                    />}
                    ListFooterComponent={() => 
                        <Hole2
                            hole={{hole_number: "Total", length: data?.holes.reduce((accum:number, curr:{length: number}) => accum + Number(curr.length), 0), allocation: "", par: data?.holes.reduce((accum: number, curr: {par: number}) => accum + Number(curr.par), 0)}} 
                            labels={{score: data?.score.reduce((accum:number, curr:{score: string}) => accum + Number(curr.score), 0), putts: data?.score.reduce((accum: number, curr: {putts: string}) => accum + Number(curr.putts), 0), gir: data?.score.reduce((accum: number, curr: {gir: string}) => accum + Number(curr.gir == "check"), 0), fir: data?.score.reduce((accum: number, curr: {fir: string}) => accum + Number(curr.fir == "check"), 0)}}
                            style={{borderLeftWidth: 1}} 
                            index={18} 
                            showAdvancedStats={showAdvancedStats}                     
                        />
                    }
                    data={data?.holes}
                    extraData={data?.score}
                    renderItem={({item, index}) => 
                        (
                            <Hole2 hole={item} showAdvancedStats={showAdvancedStats} score={data?.score[index]}/>
                        )
                    }
                >
                </FlatList>
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
        alignItems: 'center',
        justifyContent: 'center', 
        borderBottomWidth: 1,
        height: 50
    },
    scorecardText: {
        fontSize: 18,
        padding: 10,
        borderBottomWidth: 1
    }
})

export default Score;