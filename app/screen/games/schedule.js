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
		this._fetchData.bind(this);
		// this.renderItem = this._renderItem.bind(this);
		// this.renderDateText = this._renderDateText.bind(this);

		this._renderDateText.bind(this);
		this._onPress.bind(this);

		this.page = 0;//代表与今天相差的天数 +1明天 -1昨天
		this.currentDateData = null;//用于网络请求的参数
		this.currentDateText = this._renderDateText(0);//用于显示顶部日期
		this.state={
			data: [],
		};
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.date}>
					<RkButton
						rkType='clear'
						onPress={() =>{
							this._onPress(-1)
						}}>
						<Image source={require('../../assets/icons/arrow_datepicker_left.png')} style={styles.arrow}/>
					</RkButton>
					<View style={styles.middle}>
						<RkText rkType='regular inverseColor' style={styles.dateText}>{this.currentDateText}(共{this.state.data.length}场比赛)</RkText>
					</View>
					<RkButton
						rkType='clear'
						onPress={() => {
							this._onPress(+1)
						}}>
						<Image source={require('../../assets/icons/arrow_datepicker_right.png')} style={styles.arrow}/>
					</RkButton>
				</View>
			</View>
		)
	}

	_onPress(operate){
		this.page = this.page + operate;
		this.currentDateText = this._renderDateText(this.page);
		this._fetchData();
	}

	_renderDateText(page) {
		let current = new Date(new Date()-0+ page * 86400000);
		let month = current.getMonth() + 1 ;
		let day = current.getDate();
		let weekday = DayArray[current.getDay()];
		let isToday = page === 0 ?'今天 ': '';
		this.currentDateData = current.getFullYear()+'-'+month+'-'+day;
		return (isToday + month+'/'+day+' '+ weekday)
	}

	componentDidMount() {
		this._fetchData();
	}

	_fetchData(){
		console.log('fetch>>>>'+this.currentDateData);

		this.setState({
			data:[]
		});
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

