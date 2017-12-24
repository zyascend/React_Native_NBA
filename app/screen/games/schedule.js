import React, {Component} from 'react';
import {
	StyleSheet,
	Image,
	View,
	Dimensions,
	FlatList,
	TouchableOpacity,
	Text
} from 'react-native';
import {
	RkButton,
	RkText,
} from 'react-native-ui-kitten'
import {LightTheme as theme} from "../../config/theme";
import {FontAwesome} from "../../assets/icons";
import {HttpManager} from "../../data/http/httpManager";
import {RkCard} from "react-native-ui-kitten/src/components/card/rkCard";


const DayArray = ['周日','周一','周二','周三','周四','周五','周六'];
const {width} = Dimensions.get('window');

export class ScheduleScreen extends Component{

	constructor(props){
		super(props);

		this._fetchData.bind(this);
		// this._renderItem.bind(this);
		this._renderDateText.bind(this);
		this._onPress.bind(this);
		this._renderList.bind(this);

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
				{this._renderList()}
			</View>
		)

	}

	_renderList(){
		if (!this.state.data || this.state.data.length === 0){
			return(
				<View style={[styles.container,{justifyContent:'center', alignItems:'center'}]}>
					<Image source={require('../../assets/icons/ic_empty.png')} style={{width:75,height:64}}/>
					<RkText rkType='light' style={{color:theme.colors.screen.header,marginTop:10,fontSize:15}}>暂无赛程</RkText>
				</View>
			)
		}else {
			return(
				<FlatList
					style={styles.list}
					data={this.state.data}
					renderItem={this._renderItem}
					keyExtractor={(item) => {return item.matchInfo.leftId}}
					// ItemSeparatorComponent={this._renderSeparator}
				>
				</FlatList>
			)
		}
	};

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
		HttpManager.getGameSchedule(this.currentDateData, (result) => {
			if(result && result.code === 0){
				let realData = result.data.matches;
				this.setState({
					data: realData
				});
			}else {
				console.log('error occurs')
			}
		});
	}


	_renderItem = (data) => {
		let info = data.item.matchInfo;
		return(
			<TouchableOpacity
				activeOpacity={0.8}>
				<RkCard rkType='horizontal' style={styles.item}>

					<Image style={[styles.image,{marginRight:5}]} source={{uri: info.leftBadge}}/>

					<View style={styles.info_middle}>
						<RkText rkType='light' style={styles.text_broadcasters}>{info.broadcasters.join('|')}</RkText>
						{this._renderGoalView(info)}
						{this._renderVideoButton(info)}
					</View>

					<Image style={[styles.image,{marginLeft:5}]} source={{uri: info.rightBadge}}/>

				</RkCard>
			</TouchableOpacity>
		)
	};

	_getLiveType = (type) => {
		if ('4' === type){
			return '已结束'
		}
		return '待完善';
	};

	_renderGoalView(info) {
		let leftWin = parseInt(info.leftGoal) > parseInt(info.rightGoal);

		console.log('color>>>'+leftWin);

		let leftColor = leftWin ? theme.colors.text.base : theme.colors.text.secondary;
		let rightColor = leftWin ? theme.colors.text.secondary : theme.colors.text.base;
		if (info.liveType === '4'){
			return (
				<View style={styles.view_goal}>
					<RkText rkType='regular' style={{fontSize:30,marginRight:15,color:leftColor}}>{info.leftGoal}</RkText>
					<RkText rkType='light' style={{fontSize:10,color:theme.colors.text.secondary}}>已结束</RkText>
					<RkText rkType='regular' style={{fontSize:30,marginLeft:15,color:rightColor}}>{info.rightGoal}</RkText>
				</View>
			)
		}else if(info.liveType === '3'){
			let time = info.startTime.split(" ")[1].split(":");
			let startTime = time[0]+':'+time[1];
			return(
				<View style={styles.view_goal}>
					<RkText rkType='regular' style={{fontSize:30,color:rightColor}}>{startTime}</RkText>
				</View>
			)
		}else {
			return(
				<View style={styles.view_goal}>
					<RkText rkType='regular' style={{fontSize:30,color:rightColor}}>待完善</RkText>
				</View>
			)
		}
	}

	_renderVideoButton(info) {
		if (info.liveType === '3'){
			return(
				<RkButton
					rkType='rounded'
					style={styles.view_video}
					fontSize={10}
					backgroundColor={theme.colors.screen.bottomBar}>
					<Text style={{color:theme.colors.text.inverse}}>比赛前瞻</Text>
				</RkButton>
			)
		}else if (info.liveType === '4'){
			return (
				<RkButton
					rkType='outline rounded '
					style={styles.view_video}
					fontSize={10}
					borderColor={theme.colors.screen.bottomBar}>
					<Text style={{color:theme.colors.screen.bottomBar}}>精彩视频</Text>
				</RkButton>
			)
		}else {
			return(
				<RkButton
					rkType='rounded'
					style={styles.view_video}
					fontSize={10}
					backgroundColor={theme.colors.screen.bottomBar}>
					<Text style={{color:theme.colors.text.inverse}}>正在进行</Text>
				</RkButton>
			)
		}
	}
}

let styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.screen.scroll,
		flex:1,
	},
	date: {
		backgroundColor: theme.colors.screen.tabBar,
		height:35,
		flexDirection:'row',
		justifyContent:'center',
	},
	list: {
		flex:1,
		width:width,
		paddingVertical: 8,
	},
	item: {
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
		height:140,
		marginVertical: 8,
		marginHorizontal:5,
		padding: 4,
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
	},
	separator: {
		width:width,
		height:5,
	},
	image: {
		width:63,
		height:45,
		resizeMode:'cover',
	},
	info_middle: {
		height:132,
		alignItems:'center',
		justifyContent:'space-between',
	},
	text_broadcasters:{
		fontSize:15,
		color:theme.colors.text.secondary,
		marginTop:5,
	},
	view_goal: {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	view_video: {
		height:22,
		width:85,
		marginBottom:5,
		marginHorizontal:20,
	},
});

