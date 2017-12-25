import React,{Component} from 'react';
import {Image, View,StyleSheet} from "react-native";
import {RkText} from 'react-native-ui-kitten';
import {LightTheme as theme} from "../config/theme";

export class ErrorView extends Component{
	render() {
		return(
			<View style={[styles.container,{justifyContent:'center', alignItems:'center'}]}>
				<Image source={require('../assets/icons/ic_empty.png')} style={{width:75,height:64}}/>
				<RkText rkType='light' style={{color:theme.colors.screen.header,marginTop:10,fontSize:15}}>oops，暂无数据...</RkText>
			</View>
		)
	}
}
let styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.screen.scroll,
		flex:1,
	},
});