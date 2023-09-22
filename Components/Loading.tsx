import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

const Loading = () => {
    return (
        <View style={{justifyContent: 'center', position: 'absolute', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width}}>
            <ActivityIndicator animating={true} size="large" style={{alignSelf: 'center'}}/>
        </View>
    );
};

export default Loading;