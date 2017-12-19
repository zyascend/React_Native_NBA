import * as Screen from '../../screen';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import {TabBarItem} from "../../component/tabitem";
import transition from "./transitions";
import {withRkTheme} from "react-native-ui-kitten";
import {NavigationBar} from "../../component/navigationBar";

const Tab = TabNavigator(
	{
		Games:{
			// title:"ReactNews",
			screen: withRkTheme(Screen.GamesScreen),
			navigationOptions:({navigation}) => ({
				tabBarLabel:'比赛',
				headerTitle:"比赛",
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
			screen: withRkTheme(Screen.NewestScreen),
			// title:"发现",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'最新',
				headerTitle:"最新",
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
			screen: withRkTheme(Screen.VideoScreen),
			navigationOptions:({navigation}) => ({
				tabBarLabel:'视频',
				headerTitle:"视频",
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
			screen: withRkTheme(Screen.DataScreen),
			// title:"我的",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'数据',
				headerTitle:"数据",
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
			screen: withRkTheme(Screen.MoreScreen),
			// title:"我的",
			navigationOptions:({navigation}) => ({
				tabBarLabel:'更多',
				headerTitle:"更多",
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
			activeTintColor:'orange',
			inactiveTintColor:'#979797',
			style:{
				backgroundColor:'#ffffff',
			},
			labelStyle: {
				fontSize: 13, // 文字大小
			},
		}

	}

);
let ThemedNavigationBar = withRkTheme(NavigationBar);
export const TabInStack = StackNavigator(
	{
		Tab: {
			screen: Tab
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