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
} from 'react-native-ui-kitten';

import {HeadLine} from "./headline";
import {News} from "./news";
import {PhotoSet} from "./photoset";
import {StackNavigator, TabBarTop, TabNavigator} from "react-navigation";
import {LightTheme as theme} from "../../config/theme";

const TabNavigators = TabNavigator(
	{
		HeadLine: {
			screen: HeadLine,
			navigationOptions: ({navigation}) => ({
				tabBarLabel: '头条',
			}),
		},
		News: {
			screen: News,
			navigationOptions: ({navigation}) => ({
				tabBarLabel: '资讯',
			}),
		},
		PhotoSet: {
			screen: PhotoSet,
			navigationOptions: ({navigation}) => ({
				tabBarLabel: '图集',
			}),
		},
	},
	{
		tabBarComponent:TabBarTop,
		tabBarPosition:'top',
		swipeEnabled:true,
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
		NewestTab: {
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


export class NewestScreen extends Component{
	render() {
		return(
			<Tabs/>
		)
	}
}