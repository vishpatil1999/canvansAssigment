import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    FlatList,
    Platform,
    Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import RNSketchCanvas from '@itsmistad/react-native-sketch-canvas';
import PopupModal from './popUpModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Share from 'react-native-share';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function DrawOnImage() {
    const [imagepath, setImagePath] = useState();
    const [viewImage, setViewImage] = useState(false);
    const [showImageMenu, setShowImageMenu] = useState(false);
    const [showCanvasModel, setShowCanvasModel] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [closedImgaePath, setClosedImgaePath] = useState(false);
    const [editClosedButton, setEditClosedButton] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const openCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                console.log('image', response);
                const filepath = response.assets[0].uri.substring(5);
                setImagePath(filepath);
                setShowCanvasModel(true);
                setClosedImgaePath(true);
            }
        });
        setShowImageMenu(false);
    };
    const selectImageFromGallery = () => {
        console.log('select image');
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                console.log('response.assets[0].uri', response.assets[0].uri);
                const filepath = response.assets[0].uri.substring(5);
                setImagePath(filepath);
                console.log('hghgghghghg');
                setShowCanvasModel(true);
                setGalleryOpen(true);
                setClosedImgaePath(true);
            }
        });

        setShowImageMenu(false);
    };

    const onEditImageClick = () => {
        if (Platform.OS == 'ios') {
            setViewImage(false);
        }
        setImagePath(imagepath.substring(5)), setShowCanvasModel(true);
        setEditClosedButton(true);
        setClosedImgaePath(false);
    };
    const ImgaeModelFunction = () => {
        if (Platform.OS == 'ios') {
            console.log('ififrijijigjr');
            setViewImage(false);
            setShowImageMenu(true);
        } else {
            console.log('{I AM working}');
            setShowImageMenu(true);
        }
    };
    const canvasBackPress = () => {
        setShowCanvasModel(false);
        if (closedImgaePath == false) {
            console.log('inside this');
            setImagePath();
        } else {
            console.log('{{}{}{{}{}{}{}');
            setImagePath('file:' + imagepath);
        }
    };
    const closeCanvasFunction = () => {
        Alert.alert('Alert Title', 'Are you sure want to close ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    setShowCanvasModel(false);
                    console.log('Cancle alert pop up', closedImgaePath, editClosedButton);
                    if (closedImgaePath == true) {
                        console.log('closedImgaePath closedImgaePath');
                        setImagePath();
                        setViewImage(false);
                    } else if (editClosedButton == true) {
                        console.log('{i Am Working editClosedButton}');
                        setImagePath('file:' + imagepath);
                    }
                },
            },
        ]);
    };
    const shareImage = () => {
        const options = {
            title: "Share via",
            url: `file:${imagepath}`,
        }
        try {
            Share.open(options)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    // deleteFiles(filePath)
                    err && console.log(err);
                });
        } catch (e) {
            console.log("Open Document Error", e);
        }
    }
    return (
        <>
            <TouchableOpacity
                style={styles.photoText}
                onPress={() => [setShowImageMenu(true)]}>
                <Text>Select Image and open gallery from here</Text>
            </TouchableOpacity>

            {imagepath ? (
                <>
                    <TouchableOpacity
                        onPress={() => setViewImage(true)}
                        style={{
                            width: '100%',
                            height: '70%',
                            marginTop: 50,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: imagepath }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                </>
            ) : (
                console.log('hhhjjj')
            )}
            {viewImage && (
                <Modal
                    isVisible={viewImage}
                    animationIn="fadeIn"
                    size="full"
                    transparent={false}
                    onBackButtonPress={() => [setViewImage(false)]}
                    //onBackdropPress={() => setViewImage(false)}
                    style={styles.modalView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ width: '10%' }}>
                            <TouchableOpacity onPress={() => setViewImage(false)}>
                                <Icon1 name="arrow-back" size={25} color={'white'} style={{}} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: '30%',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}>
                            <TouchableOpacity
                                onPress={() => ImgaeModelFunction()}
                                style={{ flexDirection: 'row' }}>
                                <Icon name="camera" size={22} color={'white'} style={{}} />
                                <Text style={{ color: 'white', marginLeft: 10 }}>
                                    Select image
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => shareImage()}
                                style={{ flexDirection: 'row', marginRight: 15 }}>
                                <Icon name="share-alt" size={26} color={'white'} />
                                {/* <Text style={{ alignSelf: 'center', color: 'white' }}>Share Image</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: '30%',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                            }}>
                            <TouchableOpacity
                                onPress={() => onEditImageClick()}
                                style={{ flexDirection: 'row', marginRight: 15 }}>
                                <Icon name="edit" size={26} color={'white'} />
                                <Text style={{ alignSelf: 'center', color: 'white' }}>
                                    Edit Image
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image
                        source={{ uri: imagepath }}
                        style={{ width: '100%', height: '100%', alignSelf: 'center' }}
                        resizeMode="stretch"
                    />
                </Modal>
            )}

            {showImageMenu && (
                <PopupModal
                    showModal={showImageMenu}
                    buttonOne={() => {
                        setTimeout(() => {
                            openCamera();
                        }, 150);
                    }}
                    buttonSecond={() => selectImageFromGallery()}
                    closemodel={() => [setShowImageMenu(false)]}
                />
            )}
            {/* {setmethiod()} */}
            {showCanvasModel && (
                <Modal
                    isVisible={showCanvasModel}
                    size="full"
                    transparent={false}
                    onBackButtonPress={() => canvasBackPress()}
                    //onBackdropPress={() => setShowCanvasModel(false)}
                    style={styles.modalView}>
                    <RNSketchCanvas
                        containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                        canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                        defaultStrokeIndex={1}
                        defaultStrokeWidth={3}
                        localSourceImage={{
                            // filename : "///data/user/0/com.projectdemo/cache/rn_image_picker_lib_temp_05c674b7-6757-41bb-84eb-5a679a3eaa69.jpg"
                            filename: imagepath,
                            mode: 'ScaleToFill',
                        }}
                        closeComponent={
                            <View
                                style={styles.functionButton}
                                onTouchStart={() => closeCanvasFunction()}>
                                <Text style={{ color: 'white' }}>Close</Text>
                            </View>
                        }
                        undoComponent={
                            <View
                                style={styles.functionButton}
                                onTouchStart={() => setSelection(false)}>
                                <Text style={{ color: 'white' }}>Undo</Text>
                            </View>
                        }
                        clearComponent={
                            <View
                                style={[styles.functionButton]}
                                onTouchStart={() => setSelection(false)}>
                                <Text style={{ color: 'white' }}>Clear</Text>
                            </View>
                        }
                        eraseComponent={
                            <View
                                style={
                                    isSelected ? styles.functionButton1 : styles.functionButton
                                }
                                onTouchStart={() => setSelection(true)}>
                                <Text style={{ color: 'white' }}>Eraser</Text>
                            </View>
                        }
                        strokeComponent={color => (
                            <View
                                style={[{ backgroundColor: color }, styles.strokeColorButton]}
                            />
                        )}
                        strokeColors={[
                            { color: '#000000' },
                            { color: '#FF0000' },
                            { color: '#008000' },
                            { color: '#0000FF' },
                            { color: '#FFFF00' },
                            { color: '#FF69B4' },
                        ]}
                        strokeWidthComponent={w => {
                            return (
                                <>
                                    <View style={[styles.strokeWidthButton]}>
                                        <View
                                            style={{
                                                backgroundColor: 'white',
                                                marginHorizontal: 2.5,
                                                width: Math.sqrt(w / 3) * 10,
                                                height: Math.sqrt(w / 3) * 10,
                                                borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                                            }}
                                        />
                                    </View>
                                    <Text style={{ color: 'white' }}>Brush size</Text>
                                </>
                            );
                        }}
                        strokeSelectedComponent={(color, index, changed) => {
                            if (changed) {
                                setSelection(false);
                            }
                            console.log('fjfkjkfjf', color);
                            return (
                                <View
                                    style={[
                                        { backgroundColor: color, borderWidth: 3, margin: 20 },
                                        styles.strokeColorButton,
                                    ]}
                                />
                            );
                        }}
                        saveComponent={
                            <View style={styles.functionButton}>
                                <Text style={{ color: 'white' }}>Save</Text>
                            </View>
                        }
                        savePreference={() => {
                            console.log('I am, here inside savePreference');
                            return {
                                folder: 'RNSketchCanvas',
                                filename: String(Math.ceil(Math.random() * 100000000)),
                                transparent: true,
                                imageType: 'png',
                                cropToImageSize: true,
                            };
                        }}
                        onSketchSaved={(success, filePath) => {
                            [
                                console.log('success success success', success),
                                setImagePath('file://' + filePath),
                                setShowCanvasModel(false),
                                setSelection(false),
                            ];
                        }}
                        permissionDialogTitle={'hello'}
                        permissionDialogMessage={'permission'}
                    />
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    photoText: {
        alignSelf: 'center',
        marginTop: 50,
    },
    modalView: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        // backgroundColor: 'green'
    },
    //headerview: { width: '90%', height: '8%', flexDirection: 'row' },
    leftArrow: { justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 5 },
    headerText: { alignSelf: 'center', width: '80%' },
    textStyle: {
        marginLeft: 10,
        fontSize: 13,
        textAlign: 'left',
    },
    container: {
        backgroundColor: 'green',
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
    },
    strokeColorButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'white',
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A',
    },

    functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 60,
        backgroundColor: '#39579A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    functionButton1: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 60,
        backgroundColor: '#39579A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 2,
    },
});
