// Setting screen
import React, { Component } from 'react';
import { View, TouchableOpacity, PermissionsAndroid, StyleSheet, Image } from 'react-native';
//import react in our code.
import { NodeCameraView } from 'react-native-nodemediaclient';

//import all the components we are going to use.
 
async function requestCameraPermission() {
    console.log(PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA));
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: 'Streaming App - Camera Permission',
            message:
                'Streaming App needs access to your camera ' +
                'so you can broadcast a live video feed.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
            TabScreen
        }
    } catch (err) {
        console.warn(err);
    }
}

export default class SecondPage extends React.Component {

    constructor(props) {
        super(props);
        requestCameraPermission();
        this.state = {
            isPublish: false,
        };
    }
    
    render() {
        return (
            <View 
                style={{ 
                    flex: 1,
                    alignContent: 'center',
                }}
            >
                <NodeCameraView 
                    style={{ 
                        height: '100%'
                    }}
                    ref={(vb) => { this.vb = vb }}
                    outputUrl = {"rtmp://192.168.0.10/live/stream"}
                    camera={{ cameraId: 0, cameraFrontMirror: true }}
                    audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                    video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
                    autopreview={true}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 15,
                        height: 60,
                        width: '100%',
                        alignItems: 'center',
                        borderColor: 'black',
                    }} >
                    
                        <TouchableOpacity
                            style={ this.state.isPublish ? styles.btn : styles.btnPress }
                            onPress={() => {
                                if (this.state.isPublish) {
                                    this.setState({ isPublish: false });
                                    this.vb.stop();
                                } else {
                                    this.setState({ isPublish: true });
                                    this.vb.start();
                                }
                            }}
                        />

                        <TouchableOpacity 
                            style={ styles.btnSwapCam }
                            onPress={() => { this.vb.switchCamera(); }} >
                            <Image style={styles.img} source={require('./img/switch-camera.png')} />
                        </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        borderWidth: 3,
        borderColor: 'white',
        height: '100%',
        width: 60,
        backgroundColor: 'red',
        borderRadius: 50,
    },
    btnPress: {
        borderWidth: 3,
        borderColor: 'white',
        height: '100%',
        width: 60,
        backgroundColor: 'gray',
        borderRadius: 50,
    },
    btnSwapCam: {
        position: 'absolute',
        flex: 1,
        width: 50,
        height: 50,
        right: 15,
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        tintColor: 'white'
    }
});
