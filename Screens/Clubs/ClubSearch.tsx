import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SearchComponent from '../../Components/SearchComponent';

const ClubSearch = () => {
    const [input, setInput] = useState<string>('')

    return (
        <View style={{height: '100%'}}>
            <View style={{justifyContent: 'center', height: "40%", backgroundColor: 'beige'}}>
                <Text style={{alignSelf:'center'}}>This should be a photo/graphic</Text>
            </View>
            <SearchComponent placeholder='Find a club' searchInput={input} setSearchInput={setInput} />
            <Text>Then this will be list of options from search. Maybe recommended clubs?</Text>
        </View>
    );
};

export default ClubSearch;