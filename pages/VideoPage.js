import React, { Component } from 'react';
import { NodePlayerView } from 'react-native-nodemediaclient';

export default class VideoPage extends React.Component
{
    render() {
        const { params } = this.props.navigation.state;
        const mux = "https://stream.mux.com/" + params.name;
        console.log(mux);
        return(
            <NodePlayerView 
                style={{ height: '100%' }}
                ref={(vp) => { this.vp = vp }}
                inputUrl={mux}
                scaleMode={"ScaleToFill"}
                bufferTime={300}
                maxBufferTime={1000}
                autoplay={true}
            />
        );
    }

}