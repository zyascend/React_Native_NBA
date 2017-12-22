import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as Screen from './screen';
import {bootstrap} from "./config/bootstrap";
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import {NavigationBar} from "./component/navigationBar";
import {withRkTheme} from "react-native-ui-kitten";
import transition from "./config/navigation/transitions";
import {LightTheme as theme} from "./config/theme";
import {TabBarItem} from "./component/tabitem";

const BottomNavigator = TabNavigator(
	{
		Games:{
			// title:"ReactNews",
			screen:Screen.GamesScreen,
			navigationOptions:({navigation}) => ({
				tabBarLabel:'比赛',
				// headerTitle:"比赛",
				title: '比赛',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('./assets/icons/ic_tabbar_01_nor.png')}
						selectedImage={require('./assets/icons/ic_tabbar_01_focus.png')}
					/>
				)
			}),
		},
		Newest:{
			screen:Screen.NewestScreen,
			// title:"发现",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'最新',
				// headerTitle:"最新",
				title: '最新',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('./assets/icons/ic_tabbar_02_nor.png')}
						selectedImage={require('./assets/icons/ic_tabbar_02_focus.png')}
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
						normalImage={require('./assets/icons/ic_tabbar_03_nor.png')}
						selectedImage={require('./assets/icons/ic_tabbar_03_focus.png')}
					/>
				)
			}),
		},
		Data:{
			screen:Screen.DataScreen,
			// title:"我的",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'数据',
				// headerTitle:"数据",
				title: '数据',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('./assets/icons/ic_tabbar_04_nor.png')}
						selectedImage={require('./assets/icons/ic_tabbar_04_focus.png')}
					/>
				)
			}),
		},
		More:{
			screen:Screen.MoreScreen,
			// title:"我的",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'更多',
				// headerTitle:"更多",
				title: '更多',
				tabBarIcon:({focused,tintColor}) => (
					<TabBarItem
						tintColor={tintColor}
						focused={focused}
						normalImage={require('./assets/icons/ic_tabbar_05_nor.png')}
						selectedImage={require('./assets/icons/ic_tabbar_05_focus.png')}
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


let ThemedNavigationBar = withRkTheme(NavigationBar);
const BottomBars = StackNavigator(
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



//设置主题，配置RkTheme
bootstrap();

const NBAApp = StackNavigator(
	{
		Splash: {
			screen: Screen.SplashScreen
		},
		Main:{
			screen:BottomBars
		},
	},
	{
		navigationOptions:{
			header:null,
		},
	}
);

export default class App extends Component<{}> {
  render() {
    return (
		<NBAApp/>
    );
  }
}


