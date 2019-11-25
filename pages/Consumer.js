// Home screen
import React, { Component } from 'react';
import { View, TouchableOpacity, PermissionsAndroid, StyleSheet, Image } from 'react-native';
import { NodePlayerView } from 'react-native-nodemediaclient';

import stopImg from './img/stop.png';
import playImg from './img/play.png';

//import all the components we are going to use.
 
export default class Consumer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: true,
        }
    }

    renderImage() {
        var imgSource = this.state.isPlaying? stopImg : playImg;
        return (
          <Image style={styles.img} source={ imgSource } />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                
                <NodePlayerView 
                    style={{ height: '100%' }}
                    ref={(vp) => { this.vp = vp }}
                    inputUrl={"rtmp://live.mux.com/app/ff6b8073-e955-a47d-5c20-4b41e9f56ee4"}
                    scaleMode={"ScaleToFill"}
                    bufferTime={300}
                    maxBufferTime={1000}
                    autoplay={true}
                />
               
                <View
                    style={{
                        position: 'absolute',
                        bottom: 15,
                        height: 60,
                        width: '100%',
                        alignItems: 'center',
                        borderColor: 'black',
                    }}
                >                     
                    <TouchableOpacity
                        style={ styles.btn }
                        onPress={ 
                            () => { 
                                if (this.state.isPlaying) this.vp.stop();
                                else this.vp.start();
                                this.setState({ isPlaying: !this.state.isPlaying });
                            }
                        } 
                    >
                    
                        {this.renderImage()}
                    
                    </TouchableOpacity>

                </View>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        borderWidth: 3,
        height: '100%',
        width: 60,
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
    }
});