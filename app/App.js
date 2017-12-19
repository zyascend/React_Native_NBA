/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from "react-navigation";
import * as Screen from './screen';
import {TabInStack} from "./config/navigation/routes";
import {bootstrap} from "./config/bootstrap";

//设置主题，配置RkTheme
bootstrap();

const NBAApp = StackNavigator({
	Splash: {
		screen: Screen.SplashScreen
	},
	Main:{
		screen:TabInStack
	}
});

export default class App extends Component<{}> {
  render() {
    return (
		<NBAApp/>
    );
  }
}


