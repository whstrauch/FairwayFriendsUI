import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../Context/UserContext';
import customFetch from '../HelperFunctions/request';
import { useDebounce } from '../HelperFunctions/useDebounce';
import { UserRow } from './PostComponents/UserRow';
import SearchComponent from './SearchComponent';

type friend = {
    user_id: string;
    name: string;
    username: string;
}

const FriendModal = (props: { modalVisible: boolean; setModalVisible: (arg0: boolean) => void; addTag: (arg0: any) => void; taggedFriends: (friend)[]; removeTag: (arg0: string) => void; }) => {

    const {user} = useAuth()
    const [friendSearch, setFriendSearch] = useState("")
    const debouncedValue = useDebounce<string>(friendSearch, 300)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [results, setResults] = useState<any[]>([])
    const URL = "user/search/"
    const [page, setPage] = useState(1)

        

    const refresh = () => {
        if (friendSearch != "") {
            setRefreshing(true)
            const params = new URLSearchParams({
                query: friendSearch
            })
            params.append("page", String(page + 1))
            
            customFetch(URL + params, "GET", undefined, user.jwt).then(data =>
                {
                setResults([...results, ...data])
                setRefreshing(false)
                }
            ).catch(error => setResults([]))
            setPage(page => page + 1)
        }
    }

    useEffect(() => {
        if (friendSearch !== "") {
            const params = new URLSearchParams({
                query: friendSearch
            })
           
            params.append("page", "1")
            
            customFetch(URL + params, "GET", undefined, user.jwt).then(data =>
                setResults([...data])
            ).catch(err => console.log(err))
        } else {
            setResults([])
        }
    }, [debouncedValue])

    return (
        <Modal
            animationType="slide"
            presentationStyle='pageSheet'
            transparent
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
        }}>
            <View style={{height: '100%'}}>
                <KeyboardAvoidingView style={styles.centeredView} behavior='padding'>
                    <View style={styles.modalView}>
                        <View style={styles.dragPill}></View>
                        
                        <SearchComponent style={{width: '100%'}} placeholder={'Find friends'} searchInput={friendSearch} setSearchInput={setFriendSearch} />
                        <FlatList 
                            data={results}
                            style={{width: '100%'}}
                            renderItem={({item}) => 
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <UserRow user={{id: item.user_id, name: item.name, username: item.username}} type='add'/>           
                                    <Pressable style={styles.addButton} onPress={() => props.addTag(item)}>
                                        <Text style={{color: '#006B54'}}>Add</Text>
                                    </Pressable>
                                </View>
                                    
                                }
                            ItemSeparatorComponent={Divider}
                            ListHeaderComponent={
                            <>
                                <View style={styles.chipContainer}>
                                    {props.taggedFriends.map((value: friend) => {
                                        return(
                                            <Pressable style={styles.chip} onPress={() => props.removeTag(value.user_id)}>
                                                <Text style={{color: 'white'}}>{value.name}</Text>
                                                <Icon name='close-outline' size={17} color='white'/>
                                            </Pressable>    
                                        )
                                    })}
                                    
                                </View>
                                <Divider bold={true} style={{height: 2, backgroundColor: 'black'}}/>
                            </>
                            }
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: '80%',
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      dragPill: {
          width: 40,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: 'grey',
          marginVertical: 5
      },
      chipContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '90%',
          margin: 5,
          alignItems: 'flex-start'
      },
      chip: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#006B54',
          paddingHorizontal: 10,
          paddingVertical: 5,
          margin: 1,
          borderRadius: 100
      },
      addButton: {
          borderColor: '#006B54',
          borderWidth: 1,
          borderRadius: 3,
          padding: 5,
          marginRight: 10
      }
})

export default FriendModal;