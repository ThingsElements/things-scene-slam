(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _mo=require("./mo");Object.defineProperty(exports,"Mo",{enumerable:true,get:function get(){return _interopRequireDefault(_mo).default}});var _landmark=require("./landmark");Object.defineProperty(exports,"Ladnmark",{enumerable:true,get:function get(){return _interopRequireDefault(_landmark).default}});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}},{"./landmark":2,"./mo":3}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{return get(parent,property,receiver)}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,Ellipse=_scene.Ellipse,DEFAULT=_scene.DEFAULT;var NORTH=0;var EAST=1;var SOUTH=2;var WEST=3;var QUARTER_PI=Math.PI/4;function direction(center,position){var rad=Math.atan2(center.y-position.y,position.x-center.x);if(-QUARTER_PI<rad&&QUARTER_PI>=rad)return EAST;if(QUARTER_PI<rad&&QUARTER_PI*3>=rad)return NORTH;if(QUARTER_PI*3<rad||-QUARTER_PI*3>=rad)return WEST;return SOUTH}var Landmark=function(_Ellipse){_inherits(Landmark,_Ellipse);function Landmark(){_classCallCheck(this,Landmark);return _possibleConstructorReturn(this,(Landmark.__proto__||Object.getPrototypeOf(Landmark)).apply(this,arguments))}_createClass(Landmark,[{key:"_draw_count",value:function _draw_count(context,x,y,total,count,fontFamily,fontSize){fontSize=fontSize/2+fontSize/2*count/(total||1);context.font=Component.font({fontFamily:fontFamily,fontSize:fontSize});context.fillText(String(count),x,y+fontSize/2)}},{key:"_draw_inout",value:function _draw_inout(context){var _model=this.model,_model$fontFamily=_model.fontFamily,fontFamily=_model$fontFamily===undefined?DEFAULT.FONT_FAMILY:_model$fontFamily,_model$fontSize=_model.fontSize,fontSize=_model$fontSize===undefined?20:_model$fontSize;var bounds=this.bounds;var total=this.outs.reduce(function(sum,count){return sum+count},0);context.fillStyle="navy";this._draw_count(context,bounds.left+bounds.width/2,bounds.top-20,total,this.outs[0],fontFamily,fontSize);this._draw_count(context,bounds.left+bounds.width+10,bounds.top+bounds.height/2,total,this.outs[1],fontFamily,fontSize);this._draw_count(context,bounds.left+bounds.width/2,bounds.top+bounds.height+20,total,this.outs[2],fontFamily,fontSize);this._draw_count(context,bounds.left-30,bounds.top+bounds.height/2,total,this.outs[3],fontFamily,fontSize);total=this.ins.reduce(function(sum,count){return sum+count},0);context.fillStyle="red";this._draw_count(context,bounds.left+bounds.width/2,bounds.top+20,total,this.ins[0],fontFamily,fontSize);this._draw_count(context,bounds.left+bounds.width-30,bounds.top+bounds.height/2,total,this.ins[1],fontFamily,fontSize);this._draw_count(context,bounds.left+bounds.width/2,bounds.top+bounds.height-20,total,this.ins[2],fontFamily,fontSize);this._draw_count(context,bounds.left+10,bounds.top+bounds.height/2,total,this.ins[3],fontFamily,fontSize)}},{key:"_post_draw",value:function _post_draw(context){_get(Landmark.prototype.__proto__||Object.getPrototypeOf(Landmark.prototype),"_post_draw",this).call(this,context);this._draw_inout(context)}},{key:"is3dish",value:function is3dish(){return false}},{key:"_in",value:function _in(mo){if(this.molist.indexOf(mo)==-1){this.molist.push(mo);this.ins[direction(this.center,mo.center)]++}}},{key:"_out",value:function _out(mo){var idx=this.molist.indexOf(mo);if(idx!==-1){this.molist.splice(idx,1);this.outs[direction(this.center,mo.center)]++}}},{key:"onchange_mo",value:function onchange_mo(after,before,hint){if(!after.hasOwnProperty("left")&&!after.hasOwnProperty("top"))return;var origin=hint.origin,deliverer=hint.deliverer;var pos=origin.center;if(!this.contains(pos.x,pos.y)){this._out(origin);return}this._in(origin)}},{key:"text",get:function get(){return String(this.molist.length)}},{key:"outs",get:function get(){if(!this._outs)this._outs=[0,0,0,0];return this._outs}},{key:"ins",get:function get(){if(!this._ins)this._ins=[0,0,0,0];return this._ins}},{key:"molist",get:function get(){if(!this._molist)this._molist=[];return this._molist}},{key:"eventMap",get:function get(){return{"(root)":{mo:{change:this.onchange_mo}}}}}]);return Landmark}(Ellipse);exports.default=Landmark;Component.register("landmark",Landmark)},{}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{return get(parent,property,receiver)}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,RectPath=_scene.RectPath,Shape=_scene.Shape;var Mo=function(_RectPath){_inherits(Mo,_RectPath);function Mo(){_classCallCheck(this,Mo);return _possibleConstructorReturn(this,(Mo.__proto__||Object.getPrototypeOf(Mo)).apply(this,arguments))}_createClass(Mo,[{key:"_pre_draw",value:function _pre_draw(context){if(this.get("trace")){var center=this.center;context.beginPath();var length=this.trace.length;this.trace.forEach(function(location,i){if(i==0)context.moveTo(location.x,location.y);else if(i<length-1)context.lineTo(location.x,location.y)});context.lineTo(center.x+this.delta("tx"),center.y+this.delta("ty"));context.strokeStyle=this.get("strokeStyle");context.stroke()}_get(Mo.prototype.__proto__||Object.getPrototypeOf(Mo.prototype),"_pre_draw",this).call(this,context)}},{key:"_draw",value:function _draw(context){var _model=this.model,top=_model.top,left=_model.left,width=_model.width,strokeStyle=_model.strokeStyle;var center=this.center;context.beginPath();context.moveTo(left,top);context.lineTo(left+width,top);context.lineWidth=4;context.strokeStyle="black";context.stroke();context.beginPath();context.moveTo(center.x,center.y);context.lineTo(left,top);context.lineTo(left+width,top);context.lineTo(center.x,center.y)}},{key:"is3dish",value:function is3dish(){return false}},{key:"onchange",value:function onchange(after,before){var bLeft=after.hasOwnProperty("left");var bTop=after.hasOwnProperty("top");var bRotation=after.hasOwnProperty("rotation");if(bLeft||bTop||bRotation){var self=this;if(bLeft)this.dx=after.left-before.left;if(bTop)this.dy=after.top-before.top;if(bLeft||bTop)this.trace.push(this.center);if(bRotation){var to=after.rotation%(Math.PI*2);if(to<-Math.PI)to+=Math.PI*2;if(to>Math.PI)to-=Math.PI*2;var from=(before.rotation||0)%(Math.PI*2);if(from<-Math.PI)from+=Math.PI*2;if(from>Math.PI)from-=Math.PI*2;this.dtheta=to-from;if(this.dtheta>Math.PI)this.dtheta-=Math.PI*2;else if(this.dtheta<-Math.PI)this.dtheta+=Math.PI*2}this.dx&&this.delta("tx",-this.dx);this.dy&&this.delta("ty",-this.dy);this.dtheta&&this.delta("theta",-this.dtheta);this.animate({step:function step(delta){self.dx&&self.delta("tx",-self.dx*(1-delta));self.dy&&self.delta("ty",-self.dy*(1-delta));self.dtheta&&self.delta("theta",-self.dtheta*(1-delta));self.invalidate();if(delta>=1){delete self.dx;delete self.dy;delete self.dtheta}},delta:"linear"}).start()}}},{key:"hasTextProperty",get:function get(){return false}},{key:"trace",get:function get(){if(!this._trace)this._trace=[];return this._trace}}]);return Mo}(RectPath(Shape));exports.default=Mo;Component.register("mo",Mo)},{}]},{},[1]);