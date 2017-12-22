import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Dimensions,
	StatusBar
} from 'react-native';
import {
	RkText,
	RkTheme
} from 'react-native-ui-kitten'


import {LightTheme as theme} from "../../config/theme";
import {StackNavigator, TabBarTop, TabNavigator} from "react-navigation";
import {ScheduleScreen} from "./schedule";
import {FollowScreen} from "./follow";

const TabNavigators = TabNavigator(
	{
		Schedule: {
			// title:"ReactNews",
			screen: ScheduleScreen,
			navigationOptions: ({navigation}) => ({
				tabBarLabel: '赛程',
			}),
		},
		Follow: {
			// title:"ReactNews",
			screen: FollowScreen,
			navigationOptions: ({navigation}) => ({
				tabBarLabel: '关注',
			}),
		},
	},
	{
		tabBarComponent:TabBarTop,
		tabBarPosition:'top',
		swipeEnabled:false,
		animationEnabled:true,
		lazy:true,
		tabBarOptions:{
			activeTintColor:theme.colors.text.inverse,
			inactiveTintColor:theme.colors.text.secondary,
			style:{
				backgroundColor:theme.colors.screen.header,
				height:40,
				// height:30,
			},
			tabStyle:{
				justifyContent:'center',
				alignItems:'center',
			},
			labelStyle: {
				fontSize: 15, // 文字大小
				marginTop:2
			},
			indicatorStyle :{
				height:2,
				marginBottom:2,
				backgroundColor:theme.colors.screen.bottomBar,
			},
		}
	}
);

const Tabs = StackNavigator(
	{
		Tab: {
			screen: TabNavigators
		}
	},
	{
		navigationOptions: ({navigation, screenProps}) => ({
			gesturesEnabled: false,
			header: null
		})
	}
);


export class GamesScreen extends Component{

	render() {
		return(
			<Tabs>
			</Tabs>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	lineStyle: {
		width: Dimensions.get('window').width/4,
		height: 3,
		backgroundColor: theme.colors.screen.bottomBar,
		marginBottom:3
	},
	tabBar: {
		// alignItems:'center',
		// justifyContent:'center'
	},
});