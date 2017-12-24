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

export class FollowScreen extends Component{
	render() {
		return(
			<View style={styles.container}>
				{/*todo:实现登录功能*/}
				<Image source={require('../../assets/icons/ic_add_myteam.png')} style={{width:64,height:64}}/>
				<RkText rkType='light' style={{color:theme.colors.text.secondary,marginTop:10,fontSize:15}}>您还没有关注球队</RkText>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});