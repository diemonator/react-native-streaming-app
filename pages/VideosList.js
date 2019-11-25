import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import base64 from 'react-native-base64';
import { check } from 'react-native-permissions';

export default class VideosList extends Component {

    constructor() {
        super();
        this.state = {
            videos: [],
        }
    }

    componentDidMount() {
        var headers = new Headers();
        var data = [];
        headers.append("Authorization", "Basic " + base64.encode("c85ca6e7-9220-4496-9917-dab5e4729740:GWu9gnbo+p9KTlJIUmZMS2Jdq/sqcqap3/0S/42I/scmcaqmKUBCoUsCHK58JBBqL3iRqzVmQ0c"));
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        return fetch('https://api.mux.com/video/v1/assets/', {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
            .then(responseJson => {
                for (var i=0; i < Object.keys(responseJson["data"]).length; i++) {
                    data[i] = responseJson["data"][i]["playback_ids"][i];
                }
                this.setState({videos: data});
            }).catch((error) => {
        });
    }

    render() {
        var videosName = [];
        for (var i=0; i<this.state.videos.length; i++) {
            const number = i + 1;
            videosName[i] = "Stream Nr. " + number;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>Videos</Text>
                    {this.state.videos.map(({ id }) => (
                    <TouchableOpacity
                        key={id}
                        underlayColor="black"
                        style={{
                            borderRadius: 40,
                            borderWidth: 0.5,
                            borderColor: 'black',
                            height: 125,
                            width: '90%',
                        }}
                        onPress={
                            () => {
                                this.props.navigation.navigate('VideoPage', { name: id});
                            }
                        }
                    >
                        <Text style={styles.videoTile}>Watch {videosName}</Text>
                        <Image style={styles.img} source={require("./img/cam.png")}/>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    headline: {
        alignSelf: "center",
        fontSize: 18,
        marginTop: 10,
        marginBottom: 30
    },
    videoTile: {
        alignSelf: "center",
        fontSize: 16,
        marginTop: 15
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: 90,
        tintColor: 'black'
    }
});