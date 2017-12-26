import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Dimensions,
	ScrollView,
} from 'react-native';
import {
	RkText,
	RkCard,
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

export class NewsDetail extends Component {

	constructor(props) {
		super(props);

		let {params} = this.props.navigation.state;
		this.id = params ? params.id : 1;

		this._fetchData.bind(this);
		this.state = {
			data: null,
			pageState: 0,
		}
	}

	render() {
		if (this.state.pageState === PAGE_STATE.LOADING) {
			return (
				<LoadingView/>
			)
		} else if (this.state.pageState === PAGE_STATE.ERROR) {
			return (
				<ErrorView/>
			)
		} else {
			return (
				<ScrollView style={styles.root}>
					<RkCard rkType='article'>
						<Image rkCardImg source={this.data.imgurl} style={styles.image}/>
						<View rkCardHeader>
							<RkText style={styles.title} rkType='header4'>{this.data.title}</RkText>
							<RkText rkType='secondary2 hintColor'>{this.data.pub_time_detail}</RkText>
						</View>
						<View rkCardContent>
							{this.renderContent(this.state.data.content.slice(1))}
						</View>
					</RkCard>
				</ScrollView>
			)
		}
	}

	componentDidMount() {
		this._fetchData();
	}

	_fetchData() {
		if (id === 1)return;//id无效
		HttpManager.getNewsDetail(this.id,'news',2,(result) => {
			if (result && result.data) {
				console.log('fetch>>>'+JSON.stringify(result.data));
				this.setState({
					data: result.data,
					pageState: PAGE_STATE.NORMAL
				});
			} else {
				this.setState({
					pageState: PAGE_STATE.ERROR
				});
			}
		});
	}

	renderContent(data) {
		return data.map((item) => {
			return(
				<RkText rkType='primary3 bigLine' style={{marginVertical:5}}>{item.info}</RkText>
			)
		})

	}
}
let styles = StyleSheet.create({
	root: {
		backgroundColor: theme.colors.screen.base
	},
	title: {
		marginBottom: 5
	},
	image: {
		width: width,
		height: width * 330/640,
		resizeMode: 'cover',
	},
});