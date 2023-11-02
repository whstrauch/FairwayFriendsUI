import React, { memo, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Text, View } from 'react-native';
import useSWR from 'swr';
import { API_URL } from '../../Context/Vars';
import { useFetch } from '../../HelperFunctions/dataHook';

type Props = {
    item: {
        path: string;
        width: number;
        height: number;
        ratio: number;
    }
    ratio: number;
    
}

const ImageItem = ({item, ratio} : Props)  => {
    const width = Dimensions.get('window').width
    // height / width * screen width to get height
    const height = ratio * width

    const {isLoading, data} = useSWR(() => `https://${API_URL}/post/media/` + item.path, fetch)

    return (
        <View style={{justifyContent: 'flex-start', width: width, backgroundColor: '#f0f0f0'}}>
            {/* <Text>skjdlfajsdflakjsdflakjsskjaskfjdlakkajfdlasflasjdaf;lakjsdlfjadflksj</Text> */}
            {isLoading || data === undefined ? 
                <View style={{justifyContent: 'center', alignItems: 'center', width: width, height: height}}>
                    <ActivityIndicator size={"large"}/>
                </View> 
                : 
                <Image resizeMode={item.height > item.width ? "cover" : "contain"} width={width} height={height} source={data} style={{width: width, height: height}} />}
        </View>
    );
};

export default memo(ImageItem);