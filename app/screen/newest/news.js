import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Dimensions,
	ImageBackground,
	FlatList,
	TouchableOpacity, Text
} from 'react-native';
import {
	RkText,
	RkCard
} from 'react-native-ui-kitten';
import {LightTheme as theme} from "../../config/theme";
import {HttpManager} from "../../data/http/httpManager";
import {CommonUtils} from "../../utils/commonUtils";
import {ErrorView} from "../../component/errorView";
const{width, height} = Dimensions.get('window');

export class News extends Component{
	constructor(props){
		super(props);
		this._renderHeader.bind(this);
		this._fetchData.bind(this);
		this.state = {
			data: [],
		}
	}
	render() {
		if (!this.state.data || this.state.data.length === 0){
			return (
				<ErrorView/>
			)
		}
		return(
			<View style={styles.container}>
				<FlatList
					style={styles.list}
					data={this.state.data.slice(1)}
					renderItem={this._renderItem}
					ListHeaderComponent={this._renderHeader()}
					keyExtractor={(data) => {return data['newsId']}}>
				</FlatList>
			</View>
		)
	}

	componentDidMount() {
		this._fetchData();
	}

	_fetchData(){
		HttpManager.getNews((result) => {
			if(result){
				// console.log('fetch>>>'+result.length);
				// let data = [];
				// result.forEach((item) => {
				// 	if (typeof(item) === 'object'){
				// 		data.push(item)
				// 	}else {
				// 		console.log('fetch>>> GOT IT type = '+typeof(item))
				// 	}
				// });
				// console.log('fetch>>>data l= '+data.length);
				this.setState({
					data: result
				});
			}else {
				console.log('error occurs')
			}
		});
		// this.setState({
		// 	data:[1,2,4]
		// })
	}


	_renderItem = (data) => {
		let item = data.item;
		return(
			<TouchableOpacity
				activeOpacity={0.5}>
				<RkCard rkType='horizontal' style={styles.item}>
					<Image style={[styles.image]} source={{uri: item.imgurl2}}/>
					<View style={styles.info}>
						<RkText numberOfLines={2} rkType='light' style={styles.title}>{item.title}</RkText>
						<View style={styles.info_bottom}>
							<Text style={styles.time}>{item.id_map.pub_time_new}</Text>
							<RkText style={styles.time} rkType='awesome'>&#xf004; {item.upNum}   &#xf075; {item.commentsNum}</RkText>
						</View>
					</View>
				</RkCard>
			</TouchableOpacity>
		)
	};

	_renderHeader(){
		console.log('renderHeader>>>'+JSON.stringify(this.state.data[0]));
		return(
			<ImageBackground
				resizeMode='cover'
				source={{uri:this.state.data[0].imgurl}}
				style={styles.image_back}>
				<RkText
					numberOfLines={1}
					style={styles.headerText}>
					{this.state.data[0].title}
				</RkText>
			</ImageBackground>
		)
	}




}


let styleConfigs= {
	cardHeight: 85,
	leftViewPadding: 10,
	infoImageRatio: 150 / 120,
};

let styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.screen.scroll,
		flex:1,
	},
	list:{
		flex:1,
		width:width,
	},
	image_back: {
		alignItems:'center',
		width:width,
		height:width * 330 / 640,
	},
	headerText: {
		position:'absolute',
		bottom:10,
		fontSize:15,
		color:theme.colors.text.inverse,
	},
	item: {
		flex:1,
		flexDirection: 'row',
		height:styleConfigs.cardHeight,
		marginVertical: 8,
		marginHorizontal:5,
	},
	image: {
		width: styleConfigs.infoImageRatio * styleConfigs.cardHeight,
		height: styleConfigs.cardHeight,
		resizeMode:'cover'
	},
	info: {
		padding:10,
		height:styleConfigs.cardHeight,
		justifyContent:'space-between',
	},
	info_bottom: {
		flexDirection:'row',
		justifyContent:'space-between',
		//todo：不好的代码风格，待改进
		width: width- 85 * 150/120 -20 -10,
	},
	title: {
		fontSize:14,
		// width:width-styleConfigs.infoImageRatio*styleConfigs.cardHeight-2*styleConfigs.leftViewPadding
		width: width- 85 * 150/120 -20-10
	},
	time: {
		fontSize:10,
		color:theme.colors.text.secondary,
	},
});