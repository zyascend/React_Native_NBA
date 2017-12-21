import React from 'react';
import * as Screen from '../../screen/index';
import {StackNavigator,TabNavigator,TabBarBottom,TabView,TabBarTop} from 'react-navigation';
import {TabBarItem} from "../../component/tabitem";
import transition from "./transitions";
import {withRkTheme} from "react-native-ui-kitten";
import {NavigationBar} from "../../component/navigationBar";
import {LightTheme as theme} from "../theme";

const BottomNavigator = TabNavigator(
	{
		Games:{
			// title:"ReactNews",
			screen: Screen.GamesScreen,
			navigationOptions:({navigation}) => ({
				tabBarLabel:'比赛',
				// headerTitle:"比赛",
				title: '比赛',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('../../assets/icons/ic_tabbar_01_nor.png')}
						selectedImage={require('../../assets/icons/ic_tabbar_01_focus.png')}
					/>
				)
			}),
		},
		Newest:{
			screen: Screen.NewestScreen,
			// title:"发现",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'最新',
				// headerTitle:"最新",
				title: '最新',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('../../assets/icons/ic_tabbar_02_nor.png')}
						selectedImage={require('../../assets/icons/ic_tabbar_02_focus.png')}
					/>
				)
			}),
		},
		Video:{
			screen: Screen.VideoScreen,
			navigationOptions:({navigation}) => ({
				tabBarLabel:'视频',
				// headerTitle:"视频",
				title: '视频',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('../../assets/icons/ic_tabbar_03_nor.png')}
						selectedImage={require('../../assets/icons/ic_tabbar_03_focus.png')}
					/>
				)
			}),
		},
		Data:{
			screen: Screen.DataScreen,
			// title:"我的",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'数据',
				// headerTitle:"数据",
				title: '数据',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('../../assets/icons/ic_tabbar_04_nor.png')}
						selectedImage={require('../../assets/icons/ic_tabbar_04_focus.png')}
					/>
				)
			}),
		},
		More:{
			screen: Screen.MoreScreen,
			// title:"我的",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'更多',
				// headerTitle:"更多",
				title: '更多',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('../../assets/icons/ic_tabbar_05_nor.png')}
						selectedImage={require('../../assets/icons/ic_tabbar_05_focus.png')}
					/>
				)
			}),
		},

	},

	{
		tabBarComponent:TabBarBottom,
		tabBarPosition:'bottom',
		swipeEnabled:false,
		animationEnabled:false,
		lazy:true,
		tabBarOptions:{
			activeTintColor:theme.colors.text.inverse,
			inactiveTintColor:theme.colors.input.label,
			style:{
				backgroundColor:theme.colors.screen.bottomBar,
				// height:53
			},
			labelStyle: {
				fontSize: 10, // 文字大小
			},
		}

	}

);

const TabNavigators = TabNavigator(
	{
		Schedule: {
			// title:"ReactNews",
			screen: Screen.ScheduleScreen,
			navigationOptions: ({navigation}) => ({
				tabBarLabel: '赛程',
			}),
		},
		Follow: {
			// title:"ReactNews",
			screen: Screen.FollowScreen,
			navigationOptions: ({navigation}) => ({
				tabBarLabel: '关注',
			}),
		},
	},
	{
		tabBarComponent:TabBarTop,
		tabBarPosition:'top',
		swipeEnabled:false,
		animationEnabled:true,
		lazy:true,
		tabBarOptions:{
			activeTintColor:theme.colors.text.inverse,
			inactiveTintColor:theme.colors.text.secondary,
			style:{
				backgroundColor:theme.colors.screen.header,
				// height:53
			},
			labelStyle: {
				fontSize: 15, // 文字大小
			},
			indicatorStyle :{
				height:3,
				marginBottom:2,
				backgroundColor:theme.colors.screen.bottomBar
			},


		}

	}

);

export const Tabs = StackNavigator(
	{
		Tab: {
			screen: TabNavigators
		}
	},
	{
		navigationOptions: ({navigation, screenProps}) => ({
			gesturesEnabled: false,
			header: null
		})
	}
);

let ThemedNavigationBar = withRkTheme(NavigationBar);
export const BottomBars = StackNavigator(
	{
		Tab: {
			screen: BottomNavigator
		}
	},
	{
		headerMode: 'screen',
		cardStyle: {backgroundColor: 'transparent'},
		transitionConfig: transition,
		navigationOptions: ({navigation, screenProps}) => ({
			gesturesEnabled: false,
			header: (headerProps) => {
				return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
			}
		})
	}
);