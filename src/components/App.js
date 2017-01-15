'use strict';


import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';

//获取图片相关的数据
var imageDatas=require ('../data/imageDatas.json');

//自执行函数
imageDatas=(function getImageURL(imageDataArr){
    for(let i=0,j=imageDataArr.length;i<j;i++){
        let singleImage= imageDataArr[i];
        singleImage.imageURL='../images/'+singleImage.fileName;
        // singleImage.imageURL=require(singleImage.imageURL);
        imageDataArr[i]=singleImage;
    }
    return imageDataArr;
})(imageDatas)


class App extends React.Component{
    render(){
        return(
            <div>
                <h5 className="title">hello, yeoman app!</h5>
                <div>React Router: </div>
                <div><a href="#/list">list page1</a></div>
                <div><a href="#/detail">detail page1</a></div>
                <div><a href="#/muke">detail page1</a></div>
                <div><a href="#/gallery">图片墙1</a></div>
            </div>
        );
    }
}

class List extends React.Component{
    render(){
        return(
            <div>
                <h5 className="title">hello, yeoman app!</h5>
                <div><a href="#/">返回首页</a></div>
                <div>这是列表页</div>
                <div><DialogCom /></div>
            </div>
        );
    }
}
class Detail extends React.Component{
    render(){
        return (
            <div>
                <h5 className="title">hello, yeoman app!</h5>
                <div><a href="#/">返回首页</a></div>
                <div>这是详情页</div>
            </div>
        )
    }
}
class Muke extends React.Component{
    render(){
        return(
            <div>
                <h5>这是慕课网站的测试网站</h5>
                <TestClick />
                <TestInput />
            </div>
        )
    }
}
class AlertCom extends React.Component{

    constructor(props){
        super(props);
    }
    handleClick1(name){
        alert("123456");
        console.log(name);
    }
    render(){
        return (
            <button onClick={this.handleClick1.bind(this,123)} style={{backgroundColor:'red',
        fontSize:'44px'}}>{this.props.name}</button>
        )
    }
}
class TestClick extends React.Component{
    constructor(props) {
        super(props);
    }
    handleClick(event){
        var tipE=ReactDom.findDOMNode(this.refs.tip);
        if(tipE.style.display==="none"){
            tipE.style.display="inline";
        }else{
            tipE.style.display="none";
        }
        event.stopPropagation();
        event.preventDefault();
    }
    render(){
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>显示|隐藏</button>
                <span ref="tip">测试内容</span>
            </div>
        )
    }
}
class TestInput extends React.Component{
    constructor(props){
        super(props);
        this.state={inputContent:''}
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            inputContent:event.target.value
        })
    }
    render(){
        return (
            <div>
                <input type="text" onChange={this.handleChange}/>
                <span>{this.state.inputContent}</span>
            </div>
        )
    }
}
class DialogCom extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <AlertCom name="按钮"/>
                <AlertCom name="按钮2"/>
            </div>
        )
    }
}
//图片墙
class Gallery extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <GalleryByReactApp  />
            </div>
        )

    }
}
class GalleryByReactApp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            // <div className="main">
            //     <ReactTransitionGroup transitionName="fade">
            //         <img src={imageURL} alt=""/>
            //         <span>Hello</span>
            //     </ReactTransitionGroup>
            // </div>
            <section className="stage">
                <section className="img-sec"></section>
                <nav className="controller-nav"></nav>
            </section>

        )
    }
}
class AppRouter extends React.Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path='/' component={App}></Route>
                <Route path='/list' component={List} />
                <Route path='/detail' component={Detail} />
                <Route path='/muke' component={Muke} />
                <Route path='/gallery' component={Gallery}></Route>
            </Router>
        );
    }
}
//最终渲染
ReactDom.render((
    <AppRouter />
),document.getElementById('app'))
