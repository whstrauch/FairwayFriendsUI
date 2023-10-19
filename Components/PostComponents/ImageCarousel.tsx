import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import ImageItem from './ImageItem';

const ImageCarousel = ({media, ratio}: {media: any, ratio: number}) => {
    const [currIndex, setIndex] = useState(0);
    const [oldIndex, setOldIndex] = useState(0);
    const indexRef = useRef(currIndex);
    indexRef.current = currIndex;    

    const onScroll = useCallback((event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: number; }; }; }) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;
        

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setOldIndex(indexRef.current)
            setIndex(roundIndex);
        }
    }, []);





    return (
        <View style={{ width: '100%', alignItems: 'center'}}>
            <FlatList 
                horizontal={true}
                maxToRenderPerBatch={5}
                snapToAlignment='end'
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={media}
                onScroll={onScroll}
                renderItem={({item}) => <ImageItem item={item} ratio={ratio}/>}
            />
            <View
                style={{flexDirection: 'row', alignItems: 'center'}}
            >

                {media !== undefined && media.slice(0, media.length > 4 ? 4 : media.length).map((_: any, index: React.Key | null | undefined) => {
                    const newIndex = currIndex < 3 ? currIndex : currIndex > media.length - 4 ? currIndex - (media.length - 4) : currIndex - oldIndex > 0 ? 2 : 1
                    return (<View
                        key={index}
                        style={[
                        styles.indicatorDot,
                        { opacity: newIndex === index ? 1 : 0.5 },
                        { height: (index === 3 && newIndex < 3 && media.length - currIndex > 3) || (index === 0 && currIndex > 2) ? 4 : 6},
                        { width: (index === 3 && newIndex < 3 && media.length - currIndex > 3) || (index === 0 && currIndex > 2) ? 4 : 6}
                        ]}
                    />)
                    })}
                
            </View>
            {/* <ScrollIndicator data = {imgArray}/>
            <Divider horizontalInset={true} style={{marginVertical: 5}}/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    image: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
    },
    indicatorContainer: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'pink'
    },
    indicatorDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#006B54',
      margin: 4,
    },
  });

const MemoImageCarousel = memo(ImageCarousel);

export default MemoImageCarousel;