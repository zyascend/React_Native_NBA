import React, { Component } from 'react';
import {
	Dimensions,
} from 'react-native';
import {HttpUtil} from "./httpUtils";

export class HttpManager extends Component{

	static getGameSchedule(date,callback){
		let url = 'http://sportsnba.qq.com/match/listByDate';
		let params = {
			width: HttpManager.getWidth(),
			date: date
		};
		HttpUtil.get(url,params,function (resData) {
			callback(resData);
		});
	}

	static getNews(callback) {
		let index_url = 'http://sportsnba.qq.com/news/index?column=news';
		let article_url = 'http://sportsnba.qq.com/news/item?column=news&articleIds=';
		HttpUtil.get(index_url,null,function (resData) {

			if (!resData){
				callback(resData);
				return;
			}

			let data = resData.data;
			let indexList = data.map((item) => {
				return item.id;
			});
			let indexParams = indexList.join(',');
			console.log('indexParam>>>'+ indexParams);
			HttpUtil.get(article_url + indexParams,null,function (resData) {

				let articleList = [];
				if (!resData){
					callback(articleList);
					return;
				}

				let data = resData.data;
				indexList.forEach((index) => {
					let d = data[index];
					if (typeof(d) === 'object') {
						articleList.push(d)
					} else {
						console.log('manager>>> GOT IT type = ' + typeof(d))
					}
				});
				callback(articleList);
			})
		});
	}

	static getPicSet(callback) {
		let index_url = 'http://sportsnba.qq.com/news/index?column=nbapic';
		let article_url = 'http://sportsnba.qq.com/news/item?column=nbapic&articleIds=';
		HttpUtil.get(index_url,null,function (resData) {

			if (!resData){
				callback(resData);
				return;
			}
			let data = resData.data;
			let indexList = data.map((item) => {
				return item.id;
			});
			let indexParams = indexList.join('%2C');
			HttpUtil.get(article_url + indexParams,null,function (resData) {
				let articleList = [];
				if (!resData){
					callback(articleList);
					return;
				}
				let data = resData.data;
				//数据太多，只要20个
				let tinyIndexList = indexList.length>20 ? indexList.slice(0,19) : indexList;
				console.log('manager>>>indexParam='+ tinyIndexList.join('%'));
				tinyIndexList.forEach((index) => {
					let d = data[index];
					if (typeof(d) === 'object') {
						articleList.push(d)
					} else {
						console.log('manager>>> GOT IT type = ' + typeof(d))
					}
				});
				console.log('manager>>> data num = '+articleList.length);
				callback(articleList);
			})
		});
	}


	static getNewsDetail(id,column,collectType,callback){
		let url = 'http://sportsnba.qq.com/news/detail?column='+column+'&collectType='+collectType+'&articleId='+id;
		HttpUtil.get(url,null,function (resData) {
			callback(resData);
		});

	}
	static getWidth(){
		let {width,scale} = Dimensions.get('window');
		return width * scale;
	}
}
