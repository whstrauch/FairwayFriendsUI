import React, { useRef, useState } from 'react';
import { PanResponder, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props ={
    checked: boolean
    setChecked: Function
}


const IRButton = (props: Props) => {
    return(
                <Pressable
                    onPress={() => props.setChecked(!props.checked)}
                    style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: props.checked ? '#66a698' : 'white'}}
                >
                        <Icon name='checkmark-outline' size={20} />
                    
                </Pressable>

)};

export  {IRButton};