import React, { useRef, useState } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { Keyboard, NativeSyntheticEvent, Pressable, StyleSheet, StyleSheetProperties, Text, TextInput, TextInputSubmitEditingEventData, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    placeholder: string;
    searchInput: string;
    setSearchInput: (text:string) => void
    onSubmit?: Function
    style?: StyleProp<ViewStyle>
}


const SearchComponent = (props: Props)  => {
    const [showCancel, setShowCancel] = useState<Boolean>(false);

    const cancelAction = () => {
        setShowCancel(false)
        props.setSearchInput('')
        Keyboard.dismiss()
    }

    const submitAction = () => {
       if (props.onSubmit) {
        props.onSubmit()
       } 
       Keyboard.dismiss()
    }


    const CancelButton =() => {
        return(
        <Pressable style={styles.cancelButton} onPress={() => cancelAction()}>
            <Text style={{color: '#006B54'}}>Cancel</Text>
        </Pressable>
        );
    }

    return (
        <View style={props.style}>
            <Divider/>
                <View style={{flexDirection: 'row', padding: 10}}>
                        <Icon name='search' size={20} color={'#006B54'}/>
                        <TextInput
                            placeholder={props.placeholder} 
                            value={props.searchInput} 
                            onChangeText={props.setSearchInput}
                            style={{paddingLeft: 10, width: '80%'}}
                            onSubmitEditing={() => submitAction()}
                            returnKeyType='search'
                            onFocus={() => setShowCancel(true)}
                            onEndEditing={() => setShowCancel(false)}
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={false}
                        />
                        {showCancel && <CancelButton/>}
                </View>
            <Divider/>
        </View>
        
    );
};

const styles = StyleSheet.create({
    cancelButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto'
    }
})

export default SearchComponent;