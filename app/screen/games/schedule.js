import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Dimensions,
	StatusBar, Button, Text
} from 'react-native';
import {
	RkButton,
	RkStyleSheet,
	RkText,
	RkTheme
} from 'react-native-ui-kitten'
import {LightTheme as theme} from "../../config/theme";
import {FontAwesome} from "../../assets/icons";

const DayArray = ['周日','周一','周二','周三','周四','周五','周六'];

export class ScheduleScreen extends Component{

	constructor(props){
		super(props);
		this.state={
			page: 0, //代表与今天相差的天数 +1明天 -1昨天
		};
		console.log('page= '+this.state.page)
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.date}>
					<RkButton
						rkType='clear'
						onPress={() => {
							this.setState({
							page: this.state.page - 1
						})}}>
						<Image source={require('../../assets/icons/arrow_datepicker_left.png')} style={styles.arrow}/>
					</RkButton>
					<View style={styles.middle}>
						<RkText rkType='regular inverseColor' style={styles.dateText}>{this._renderDateText(this.state.page)}(共5场比赛)</RkText>
					</View>
					<RkButton
						rkType='clear'
						onPress={() => {
							this.setState({
								page: this.state.page + 1
							})}}>
						<Image source={require('../../assets/icons/arrow_datepicker_right.png')} style={styles.arrow}/>
					</RkButton>
				</View>
			</View>
		)
	}

	_renderDateText(page) {
		console.log('p = '+page);
		let formatDate = function (date) {
			let y = date.getFullYear();
			let m = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			let d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			return y + '-' + m + '-' + d;
		};

		let addDate = function(date,days){
			let d=new Date(date);
			d.setDate(d.getDate()+days);
			let month=d.getMonth()+1;
			let day = d.getDate();
			if(month<10){
				month = "0"+month;
			}
			if(day<10){
				day = "0"+day;
			}
			return new Date(d.getFullYear() + "/" + month + "/" + day);
		};

		let current = addDate(formatDate(new Date()),page);

		let month = current.getMonth();
		let day = current.getDate() + page;
		let weekday = DayArray[current.getDay()];
		let isToday = page === 0 ?'今天 ': '';

		return (isToday + month+'/'+day+' '+ weekday)
	}
}

let styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.screen.base,
	},
	date: {
		backgroundColor: theme.colors.screen.tabBar,
		height:35,
		flexDirection:'row',
		justifyContent:'center',
	},
	middle: {
		flex:1,
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	arrow: {
		width:35,
		height:35,
	},
	dateText:{
		fontSize:13,
		textAlign:'center',
	}

});

