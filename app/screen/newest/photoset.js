import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Dimensions,
	StatusBar, FlatList, ImageBackground, Text, TouchableOpacity
} from 'react-native';
import {
	RkText,
	RkTheme
} from 'react-native-ui-kitten';
import {ErrorView} from "../../component/errorView";
import {LoadingView} from "../../component/loadingView";
import {LightTheme as theme} from "../../config/theme";
import {HttpManager} from "../../data/http/httpManager";
const{width, height} = Dimensions.get('window');

const PAGE_STATE = {
	LOADING:0,//加载数据时
	ERROR:1,//数据加载错误/为空时
	NORMAL:2,//数据正常显示状态
};

export class PhotoSet extends Component{

	constructor(props){
		super(props);
		this._fetchData.bind(this);
		this.state={
			data: [],
			pageState:0,
		}
	}

	render() {
		if (this.state.pageState === PAGE_STATE.LOADING){
			return (
				<LoadingView/>
			)
		}else if (this.state.pageState === PAGE_STATE.ERROR){
			return (
				<ErrorView/>
			)
		}else {
			return(
				<FlatList
					data={this.state.data}
					style={styles.container}
					renderItem={this._renderItem}
					keyExtractor={(data) => {return data['newsId']}}/>
			)
		}
	}

	componentDidMount() {
		this._fetchData();
	}

	_fetchData(){
		HttpManager.getPicSet((result) => {
			if(result && result.length > 0){
				this.setState({
					data: result,
					pageState:PAGE_STATE.NORMAL
				});
			}else {
				this.setState({
					pageState:PAGE_STATE.ERROR
				});
			}
		});
	}

	_renderItem = (data) => {
		let item = data.item;
		return(
			<TouchableOpacity
				activeOpacity={0.5}>
				<View style={styles.item}>
					<ImageBackground
						resizeMode='cover'
						source={{uri:item.imgurl}}
						style={styles.image_back}>
						<Text
							numberOfLines={1}
							style={styles.title}>
							{item.title}
						</Text>
						<Text
							numberOfLines={1}
							style={styles.picNum}>
							{item.img_count}
						</Text>
					</ImageBackground>
					<View style={styles.info_bottom}>
						<Text
							numberOfLines={1}
							style={styles.time}>
							{item.pub_time_new}
						</Text>
						<RkText style={styles.time} rkType='awesome'>
							&#xf004; {item.upNum}   &#xf075; {item.commentsNum}
						</RkText>
					</View>
				</View>
			</TouchableOpacity>

		)

	}}

let styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.screen.scroll,
		flex:1,
	},
	item: {
		height:width * 330 / 640 + 40,
		width:width,
		marginVertical:8,
		borderBottomColor:theme.colors.text.secondary,
		borderBottomWidth:1,
	},
	image_back: {
		alignItems:'center',
		justifyContent:'center',
		width:width,
		height:width * 330 / 640,
	},
	title: {
		marginTop:20,
		marginBottom:15,
		fontSize:23,
		color:theme.colors.text.inverse,
	},
	picNum: {
		borderTopColor:theme.colors.text.inverse,
		borderTopWidth:1,
		borderBottomColor:theme.colors.text.inverse,
		borderBottomWidth:1,
		fontSize:25,
		color:theme.colors.text.inverse,
	},
	info_bottom: {
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		paddingHorizontal:10,
		height: 40,
		width: width,
	},
	time: {
		fontSize:15,
		color:theme.colors.text.secondary,
	},
});