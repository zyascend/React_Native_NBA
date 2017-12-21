import React, { Component } from 'react';
import {
	Image,
	StyleSheet
} from 'react-native';
export class TabBarItem extends Component {
	render() {
		return(
			<Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
			       style={styles.icon}
			/>
		)
	}
}

let styles = StyleSheet.create({
	icon:{
		width:25,
		height:25,
		resizeMode:'cover'
	}
});