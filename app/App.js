
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from "react-navigation";
import * as Screen from './screen';
import {BottomBars} from "./config/navigation/routes";
import {bootstrap} from "./config/bootstrap";

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


