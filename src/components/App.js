'use strict';


import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
import {createStore} from 'redux';
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
                <div><a href="#/redux">Redux例子</a></div>
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
function getRangeRandom (low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

//获取0-30°之间的一个任意正负值
function get30DegRandom () {
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

var ImgFigure = React.createClass({
    //imgFigure的点击处理函数
    handleClick: function (e) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },

    render: function () {
        var styleObj = {};

        //如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        //如果图片的旋转角度有值并且不为0，添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' isInverse' : '';

        return (
            <figure className={imgFigureClassName} style={styleObj} ref="figure" onClick={this.handleClick}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{this.props.data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        );
    }
});

//控制组件
var ControllerUnit = React.createClass({
    handleClick: function (e) {
        //如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.preventDefault();
        e.stopPropagation();
    },

    render: function () {
        var controllerUnitClassName = 'controller-unit';

        //如果对应的是居中图片，显示控制按钮的居中态
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center';

            //如果对应的是翻转图片，显示控制按钮的翻转态
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += ' is-inverse';
            }
        }

        return (
            <span className={controllerUnitClassName} onClick={this.handleClick}></span>
        );
    }
});

var GalleryByReactApp = React.createClass({
    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: {     //水平方向取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {     //垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    },

    /*
     * 翻转图片
     * @param index 输入当前被执行的inverse操作的图片对应的图片信息数组的index值
     * @return {Function} 这是一个闭包函数，其内return一个真正待被执行的函数
     */
    inverse: function (index) {
        return function () {
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
    },

    /*
     * 重新布局所有图片
     * @param centerIndex 指定居中排布哪个图片
     */
    rearrange: function (centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),   //不取或者取一个
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        //首先居中centerIndex的图片，居中的centerIndex的图片不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };

        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        });

        //布局左右两侧图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            //前半部分布局左边，右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeTopArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    },

    /*
     * 利用rearrange函数，居中对应index图片
     * @param index，需要被居中的图片对应的图片信息数组的index值
     * @return {Function}
     */
    center: function (index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    },

    getInitialState: function () {
        return {
            imgsArrangeArr: [
                // {
                // 	pos: {
                // 		left: '0',
                // 		top: '0'
                // 	},
                //	rotate: 0,         //旋转角度
                //	isInverse: false,  //图片正反面(正面)
                //	isCenter: false    //图片是否居中(不居中)
                // }
            ]
        };
    },

    //组件加载以后，为每张图片计算其位置的范围
    componentDidMount: function () {
        //首先拿到舞台的大小
        // var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        var stageDOM = this.refs.stage,
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        //拿到imgFigure的大小
        // var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        var imgFigureDOM = this.refs.imgFigure0.refs.figure,
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollWidth,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH- halfImgH
        };

        //计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        //计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);
    },

    render: function() {
        var controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function (value, index) {
            if(!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                };
            }

            imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} key = {index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);

            controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
        }.bind(this));

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});
/*Redux的例子*/
class ReduxContainer extends React.Component{
    render(){
        return (
            <div>
                <ReduxDemo />
            </div>
            )

    }
}
var addTodoAction=function(text){
    return {
        type:'add_todo',
        text:text
    }
}
var todoReducer=function(state,action){
    if(typeof state==='undefined'){
        return [];
    }
    switch(action.type){
        case 'add_todo':
            return state.slice(0).concat({
                text:action.text,
                completed:false
            });
            break;
        default:
            return state;
    }
}
var store=createStore(todoReducer);
var ReduxDemo=React.createClass({
    getInitialState:function(){
        return {
            items:store.getState()
        }
    },
    componentDidMount:function(){
        var unsubscribe = store.subscribe(this.onChange);
    },
    onChange:function(){
        this.setState({
            items:store.getState()
        });
    },
    handleAdd:function(){
        var input = ReactDom.findDOMNode(this.refs.todo);
        var value=input.value.trim();

        if(value){
            store.dispatch(addTodoAction(value));
        }
        input.value='';
    },
    render:function(){
        return (
            <div>
                <input type="text" ref="todo" placeholder="输入todo项" style={{marginRight:"10px"}}/>
                <button onClick={this.handleAdd}>点击添加</button>
                <ul>
                    {
                        this.state.items.map(function(item){
                            return <li>{item.text}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
});


GalleryByReactApp.defaultProps = {
};

class AppRouter extends React.Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path='/' component={App}></Route>
                <Route path='/list' component={List} />
                <Route path='/detail' component={Detail} />
                <Route path='/muke' component={Muke} />
                <Route path='/gallery' component={Gallery}></Route>
                <Route path='/redux' component={ReduxContainer}></Route>
            </Router>
        );
    }
}
//最终渲染
ReactDom.render((
    <AppRouter />
),document.getElementById('app'))
