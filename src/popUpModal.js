import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import Icon from 'react-native-vector-icons/FontAwesome';
export default function PopupModal({showModal,buttonOne,buttonSecond,closemodel}) {

    const [showModalFalse, setshowModalFalse] = useState(showModal)

    const onCloseModal = () => {
        setshowModalFalse(false)
        setTimeout(() => {
            closemodel(false)
        }, 100);
    }

    const ButtonOne=()=>{        
            onCloseModal()
            setTimeout(() => {
                buttonOne()
            }, 300);
    }
    const ButtonSecond=()=>{        
        onCloseModal()
        setTimeout(() => {
            buttonSecond()
        }, 300);
}

    return (
        <Modal
            position={"center"}
            transparent={true}
            visible={showModal}
            animationType="slide"
        >
            <TouchableOpacity onPress={() => {closemodel(false)}} style={{ backgroundColor: "rgba(0,0,0,0.7)", flex: 1, justifyContent: 'center' }}>
                <View style={[styles.dropdownContainer2, { padding: 10 }]}>
                    <Text style={[styles.textStyle,{ textAlign: "left",fontSize: 14,margin: 10,color: "black",width: width - 100, marginTop: 5,},]}>
                            Upload Image</Text>
                    <View style={{width: width - 100,height: 1.5,marginBottom: 20,backgroundColor: '#eb6a2d',}}/>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                        <TouchableOpacity onPress={() => ButtonOne()} style={styles.lableButtonStyle}>
                            <Icon name='camera' color={"#eb6a2d"} size={37} />
                            <Text style={[styles.textStyle,styles.labelStyle]}>
                               Take Photo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>ButtonSecond()} style={styles.lableButtonStyle}>
                        <Icon name='photo' color={"#eb6a2d"}  size={37} />
                            <Text style={[styles.textStyle,styles.labelStyle]}>
                                Upload from Gallery
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
const styles=StyleSheet.create({
    dropdownContainer2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        // height:60,

        // marginLeft: width / 2 + 30,
        // marginTop: Platform.OS == "ios" ? 80 : 60,
        backgroundColor: "white",
        //marginTop: height / 2 - 150,
        width: width - 10
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 13,
        textAlign: "left",
        color: "#eb6a2d",
        
    },
    labelStyle:{
        textAlign: "center",
        fontSize: 12,
        margin: 15,
        color: "black",
    },
    lableButtonStyle:{
        margin: 10,
        backgroundColor: "#f6f6f6",
        justifyContent: "center",
        alignItems: "center",
        height: 110,
        width: 150,
        borderRadius: 10,
    }
})