import React, { useRef, useState } from 'react';
import { PanResponder, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props ={
    checked: boolean
    setChecked: Function
}


const IRButton = (props: Props) => {
    // const [show, setShow] = useState(false);
    // const [val, setVal] = useState('checkmark-sharp');
    // const longPressTimeout = useRef<Timeout>()

    // const panResponder = useRef(
    //     PanResponder.create({
    //       onStartShouldSetPanResponder: () => true,
    //       onMoveShouldSetPanResponder: () => false,
    //       onPanResponderGrant: (e, gestureState) => {
    //         console.log('set')
    //         props.enableScroll = false
    //         longPressTimeout.current = setTimeout(() => {
    //           setShow(true);
    //         }, 500);
    //       },
    //       onPanResponderMove: (_, gestureState) => {
    //         const {dx, dy} = gestureState;
    //         if (Math.abs(dx) + Math.abs(dy) > 30) {
    //             clearTimeout(longPressTimeout.current)
    //         }
    //       },
    //       onPanResponderRelease: (_, gestureState) => {
    //         console.log('Released')
            
    //         clearTimeout(longPressTimeout.current)
    //           // Detect swipe direction based on gestureState
    //           const { dx, dy } = gestureState;
    //           if (Math.abs(dx) + Math.abs(dy) < 30) {
    //             console.log('Moved too little')
    //             setVal('checkmark-outline')
    //           } else {
    //           if (Math.abs(dx) > Math.abs(dy)) {
    //             if (dx > 0) {
    //               console.log('right');
    //               setVal('arrow-forward-outline')
    //             } else {
    //               console.log('left');
    //               setVal('arrow-back-outline')
    //             }
    //           } else {
    //             if (dy > 0) {
    //               console.log('down');
    //               setVal('arrow-down-outline')
    //             } else {
    //               console.log('up');
    //               setVal('arrow-up-outline')
    //             }
    //           }}
    //           setChecked(true)
    //           setShow(false)
    //           props.enableScroll = true
    //         },

    //       },
          
    //     )
    //   ).current;


    return (
        // <View style={{alignItems: 'center', justifyContent: 'center'}} 
        // {...panResponder.panHandlers}
        // >
        //     {show && 
        //         <View 
        //             style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: (checked && val == 'arrow-up-outline') ? '#66a698' : 'white'}}
        //         >
        //             <Icon name='arrow-up-outline' size={20} />
        //         </View>
        //     }
        //     <View style={{flexDirection: 'row'}} >
        //         {show && 
        //             <View 
        //                 style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: (checked && val == 'arrow-back-outline') ? '#66a698' : 'white'}}
        //             >
        //                 <Icon name='arrow-back-outline' size={20} />
        //             </View>
        //         }
                <Pressable
                    onPress={() => props.setChecked(!props.checked)}
                    style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: props.checked ? '#66a698' : 'white'}}
                >
                        <Icon name='checkmark-outline' size={20} />
                    
                </Pressable>
        //         {show && 
        //             <View 
        //                 style={{ zIndex: 10, justifyContent: 'center', alignItems: 'center',borderWidth: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: (checked && val == 'arrow-forward-outline') ? '#66a698' : 'white'}}
        //             >
        //                 <Icon name='arrow-forward-outline' size={20} />
        //             </View>
        //         }
        //     </View>
        //     {show && 
        //         <View 
        //             style={{ justifyContent: 'center', alignItems: 'center',borderWidth: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: (checked && val == 'arrow-down-outline') ? '#66a698' : 'white'}}
        //         >
        //             <Icon name='arrow-down-outline' size={20} />
        //         </View>
        //     }
        // </View>
    );
};

export  {IRButton};