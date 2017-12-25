/**
 * 封装好GET和POST方法的工具组件
 * todo：1.使用Promise 2. 实现timeout (12/23)
 *
 */
import React,{Component} from 'react';

export class HttpUtil extends Component{
	/*
	 *  get请求
	 *  url:请求地址
	 *  data:参数
	 *  callback:回调函数
	 * */
	static get(url,params,callback){
		if (params) {
			let paramsArray = [];
			//拼接参数
			Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
			if (url.search(/\?/) === -1) {
				url += '?' + paramsArray.join('&')
			} else {
				url += '&' + paramsArray.join('&')
			}
		}
		//fetch请求
		fetch(url)
			.then((response) => response.json())
			.then((jsonData) => {
				callback(jsonData)
			})
			.catch((error) => {
				console.error('HttpUtil>>>'+ error);
			});
	}
	/*
	 *  post请求
	 *  url:请求地址
	 *  data:参数
	 *  callback:回调函数
	 * */
	static post(url,params,headers,callback){
		//fetch请求
		fetch(url,{
			method: 'POST',
			headers:{
				'token': headers
			},
			body:JSON.stringify(params)
		})
			.then((response) => response.json())
			.then((responseJSON) => {
				callback(responseJSON)
			}) .done();
	}

}