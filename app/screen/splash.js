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
import {LightTheme} from "../config/theme";
import {NavigationActions} from 'react-navigation';

/**
 * 启动图页面
 */

let duration = 500;

export class SplashScreen extends Component{
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		StatusBar.setHidden(true, 'none');
		RkTheme.setTheme(LightTheme);
		this.timer = setTimeout(() => {
			StatusBar.setHidden(false, 'slide');
			let toHome = NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({routeName: 'Main'})]
			});
			this.props.navigation.dispatch(toHome)
		}, duration);
	}
	render() {
		return(
			<View style={styles.container}>
				<Image style={styles.image} source={require('../assets/img/splash.png')}/>
			</View>
		)
	}

	componentWillUnmount() {

		// 如果存在this.timer，则使用clearTimeout清空。
		// 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
		this.timer && clearTimeout(this.timer);
	}
}
let styles = StyleSheet.create({
	container: {
		backgroundColor: LightTheme.colors.screen.base,
		justifyContent: 'space-between',
		flex: 1
	},
	image: {
		resizeMode: 'cover',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
});