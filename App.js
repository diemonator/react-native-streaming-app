//This is an example of React Native Tab
import React from 'react';
//For React Navigation 4+
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Producer from './pages/Producer';
import Consumer from './pages/Consumer';
import VideosList from './pages/VideosList';
import VideoPage from './pages/VideoPage';

// import VideoLists from './pages/VideoLists';
//Making TabNavigator which will be called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export
 
const TabScreen = createMaterialTopTabNavigator(
    {
        Watch: { screen: Consumer },
        Stream: { screen: Producer },
        Videos: { screen: VideosList },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#633689',
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    }
);
 
//making a StackNavigator to export as default
const App = createStackNavigator({
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#633689',
            },
            headerTintColor: '#FFFFFF',
            title: 'Streaming App',
        },
    }, 
    VideoPage: {screen: VideoPage}
});

export default createAppContainer(App);