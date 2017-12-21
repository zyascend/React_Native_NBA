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

import {ScheduleScreen} from "./schedule";
import {FollowScreen} from "./follow";
import {LightTheme as theme} from "../../config/theme";
import {CenterTabBar} from "../../component/centerTabBar";
import {Tabs} from "../../config/navigation/routes";

export class GamesScreen extends Component{

	render() {
		return(
			<RkText/>
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