import React,{Component} from 'react';
import {
	StyleSheet,
	View,
	Dimensions, Image
} from 'react-native';
import _ from 'lodash';
import {RkText, RkButton, RkStyleSheet} from 'react-native-ui-kitten';
import {UIConstants} from '../config/appConstants';

export class NavigationBar extends Component{

	constructor(props) {
		super(props);
		this.state = {width: undefined};
	}


	render(){
		let options = this.props.headerProps.getScreenDetails(this.props.headerProps.scene).options;
		return(
			<View style={styles.container}>
				{this._renderTitle(options.title,options.headerTitle)}
				{this._renderLeft(options.headerLeft)}
				{this._renderRight(options.headerRight)}
			</View>
		)
	}

	_renderTitle(title,headerTitle) {
		console.log('>>>>>'+headerTitle);
		let onLayout = (e) => {
			this.setState({
				width: e.nativeEvent.layout.width,
			})
		};

		if (headerTitle){
			return(
				<View style={styles.title} onLayout={onLayout}>
					{headerTitle}
				</View>
			)
		}

		return(
			<View style={styles.title} onLayout={onLayout}>
				<RkText style={styles.text}>{title}</RkText>
			</View>
		)
	}

	_renderLeft(left) {
		if(left){
			return(
				<View style={styles.left}>
					{left}
				</View>
			)
		}
		let renderContent = () => {
			let index = _.findIndex(this.props.headerProps.scenes, {isActive: true});
			if (index > 0){
				//不是首页
				return(
					<RkButton
						style={{width:40}}
						rkType='clear'
						onPress={() => {this.props.navigation.goBack()}}>
						<Image source={require('../assets/icons/navbar_ic_back.png')}/>
					</RkButton>
				)
			}else {
				//首页
				return(
					<Image source={require('../assets/icons/navbar_logo_nba.png')} style={styles.icon}/>
				)
			}
		};
		return(
			<View style={[styles.left]}>
				{renderContent()}
			</View>
		)

	}

	_renderRight(right) {
		if(right){
			return(
				<View style={styles.right}>
					{right}
				</View>
			)
		}
		let renderContent = () => {
			let index = _.findIndex(this.props.headerProps.scenes, {isActive: true});
			if (index > 0){
				//不是首页
				return(
					<RkButton
						rkType='clear'
						onPress={() => {console.log('SHARE...')}}>
						<Image source={require('../assets/icons/navbar_ic_share.png')}  style={styles.icon}/>
					</RkButton>
				)
			}else {
				//首页
				return(
					<RkButton
						rkType='clear'
						onPress={() => {console.log('MINE...')}}>
						<Image source={require('../assets/icons/navbar_ic_mine.png')}  style={styles.icon}/>
					</RkButton>
				)
			}
		};
		return(
			<View style={[styles.right]}>
				{renderContent()}
			</View>
		)
	}
}

let styles = RkStyleSheet.create(theme => ({
	container: {
		flexDirection: 'row',
		height: UIConstants.AppbarHeight,
		backgroundColor: theme.colors.screen.header,
		paddingTop: UIConstants.StatusbarHeight,
		// borderBottomWidth: StyleSheet.hairlineWidth,
		// borderBottomColor: theme.colors.border.base
	},
	left: {
		position: 'absolute',
		// left:5,
		top: 0,
		bottom: 0,
		justifyContent: 'center'
	},
	right: {
		position: 'absolute',
		right: 5,
		top: 0,
		bottom: 0,
		justifyContent: 'center'
	},
	title: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: theme.colors.text.inverse,
	},
	icon: {
		width: 35,
		height: 35,
		resizeMode:'cover'
	}
}));