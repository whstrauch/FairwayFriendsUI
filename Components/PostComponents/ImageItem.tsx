import React, { memo, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Text, View } from 'react-native';
import useSWR from 'swr';
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
    
    console.log(width, height)
    console.log(item.path, item)

    const {isLoading, data} = useSWR(() => "http://localhost:5000/post/media/" + item.path, fetch)

    return (
        <View style={{justifyContent: 'flex-start', width: width, backgroundColor: 'blue'}}>
            {/* <Text>skjdlfajsdflakjsdflakjsskjaskfjdlakkajfdlasflasjdaf;lakjsdlfjadflksj</Text> */}
            {isLoading || data === undefined ? <ActivityIndicator/> : <Image resizeMode={item.height > item.width ? "cover" : "contain"} width={width} height={height} source={data} style={{width: width, height: height}} />}
        </View>
    );
};

export default memo(ImageItem);