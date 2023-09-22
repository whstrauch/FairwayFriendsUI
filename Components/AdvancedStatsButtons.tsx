import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    gir: string
    fir: string
    putts: string
    setGIR: Function
    setFIR: Function
    setPutts: Function
}

const AdvancedStatsButtons = (props: Props) => {


    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 30 }}>Putts: </Text>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                    <Pressable
                        onPress={() => props.setPutts("0")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.putts == "0" ? '#66a698' : 'transparent' }}
                    >
                        <Text style={{fontSize: 20, fontWeight: '600'}}>0</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.setPutts("1")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.putts == "1" ? '#66a698' : 'transparent' }}
                    >
                        <Text style={{fontSize: 20, fontWeight: '600'}}>1</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setPutts("2")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.putts == "2" ? '#66a698' : 'transparent' }}
                    >
                        <Text style={{fontSize: 20, fontWeight: '600'}}>2</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setPutts("3")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.putts == "3" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Text style={{fontSize: 20, fontWeight: '600'}}>3</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setPutts("4+")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.putts == "4+" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Text style={{fontSize: 20, fontWeight: '600'}}>4+</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 30 }}>Fairway Hit: </Text>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                    <Pressable 
                        onPress={() => props.setFIR("check")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 25, backgroundColor: props?.fir == "check" ? '#66a698' : 'transparent' }}
                    >
                        <Icon name='checkmark-sharp' size={30} />
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setFIR("right")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.fir == "right" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-forward-outline' size={30} />
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setFIR("left")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.fir == "left" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-back-outline' size={30} />
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setFIR("long")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.fir == "long" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-up-outline' size={30} />
                    </Pressable>
                    <Pressable
                        onPress={() => props.setFIR("short")}  
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.fir == "short" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-down-outline' size={30} />
                    </Pressable>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 30 }}>Green Hit: </Text>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                    <Pressable
                        onPress={() => props.setGIR("check")} 
                        style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 2, width: 40, height: 40, borderRadius: 20, backgroundColor: props?.gir == "check" ? '#66a698' : 'transparent' }}
                    >
                        <Icon name='checkmark-sharp' size={30} />
                    </Pressable>
                    <Pressable
                        onPress={() => props.setGIR("right")} 
                        style={{ justifyContent: 'center', alignItems: 'center',width: 40, height: 40,borderWidth: 2, borderRadius: 20, backgroundColor: props?.gir == "right" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-forward-outline' size={30} />
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setGIR("left")} 
                        style={{ justifyContent: 'center', alignItems: 'center',width: 40, height: 40,borderWidth: 2, borderRadius: 20, backgroundColor: props?.gir == "left" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-back-outline' size={30} />
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setGIR("long")} 
                        style={{ justifyContent: 'center', alignItems: 'center',width: 40, height: 40,borderWidth: 2, borderRadius: 20, backgroundColor: props?.gir == "long" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-up-outline' size={30} />
                    </Pressable>
                    <Pressable 
                        onPress={() => props.setGIR("short")} 
                        style={{ justifyContent: 'center', alignItems: 'center',width: 40, height: 40,borderWidth: 2, borderRadius: 20, backgroundColor: props?.gir == "short" ? '#a3a3a3' : 'transparent' }}
                    >
                        <Icon name='arrow-down-outline' size={30} />
                    </Pressable>
                </View>
            </View>
            
        </View>
        
    );
};

export default AdvancedStatsButtons;