;(function($){

	function Switch(ele,setting){
		var defaultSetting = { //默认的设置
				"btncolor":"#ccc",//按钮的背景色
				"oncolor":"green",//在开关处于打开情况下时的容器背景颜色
				"offcolor":"#333",//在开关处于关闭情况下时的容器背景颜色
				"width":"40px"
		}
		
	//如果是字符串，就当作id处理
	//如果是dom元素，就直接使用
		this.$ele = null;

		//真正使用的设置，是用户的自定义与系统的默认设置综合。

		this.setting = $.extend(defaultSetting,setting); //保存用户的设置

		console.info(this.setting);

		console.info(typeof ele);
		if(typeof ele === "string"){
			this.$ele = $("#"+ele);
		}
		else
			this.$ele = $(ele);

		var that = this;
		//隐藏这个元素
		this.$ele.css("display","none");

		this.value = this.$ele.prop("checked"); //获取ele的初始的状态，保存值

		//在这个元素的后面，把我们的插件代码加上去。
		// 	<!-- <div class="switchbox">	
		// 	<div class="switchcontent"></div>
		// </div> -->
		// 找到这个ele元素的父级元素，然后，在这它的后面添加div
		console.info( this.$ele.parent() );
		//创建自己的div结构
		this.$switchbox = $("<div class='switchbox'>");
		//根据传入基本样式，去设置
		this.$switchbox.css("width",parseInt(this.setting.width) + "px");
		this.$switchbox.css("height",parseInt(this.setting.width)/2 + "px");
		this.$switchbox.css("borderRadius",parseInt(this.setting.width)/4 + "px");

		this.$switchcontent = $("<div class='switchcontent'>");

		this.$switchcontent.css("backgroundColor",this.setting.btncolor);
		this.$switchcontent.css("width",(parseInt(this.setting.width) - 2)/2 + "px");
		this.$switchcontent.css("height",(parseInt(this.setting.width) - 2)/2 + "px");
		this.$switchcontent.css("borderRadius",(parseInt(this.setting.width)-2)/4 + "px");
		

		this.$switchbox.append(this.$switchcontent);   //实现结构上的关系
		//把插件的结构加到parent()中去
		this.$ele.parent().append(this.$switchbox);

		//根据ele的初始的选中情况，来设置插件的状态。
		this.updateValue();

		//给插件添加一个tap事件
		this.$switchbox.on("tap",function(){
			//切换value
			console.info(that.value);
			that.value = !that.value;
			//1.更新状态
			that.updateValue();
			//2.更新ele这个元素自己的状态
			that.$ele.prop("checked",that.value);
		})
	}

	//更新插件的显示状态
	Switch.prototype.updateValue = function(){
		console.info(this.value);
		if(this.value){
			//选中
			// 1.把switchcontent移动到最右边
			this.$switchcontent.css("left",parseInt(this.setting.width)/2 +"px");
			// 2.改switchbox的背景
			
			this.$switchbox.css("backgroundColor",this.setting.oncolor);
		}else{
			//不选中
			// 1.把switchcontent移动到最左边
			this.$switchcontent.css("left","0");
			// 2.改switchbox的背景
			this.$switchbox.css("backgroundColor",this.setting.offcolor);
		}
	}

	window.Switch = Switch;

	//如果一个input checkbox 中有 data-role="switch" 去调用 
	//<input data-role="switch" id="checkbox2" type="checkbox"  value="y" />

	//把input选出来
	$(function(){
		var inputs = $("input[data-role='switch']");
		console.info(inputs);
		for(var i=0;i<inputs.size();i++){
			var setting={

			}
//<input data-role="switch" data-role-oncolor="red" id="checkbox2" type="checkbox"  value="y" />
			var oncolor = inputs[i].getAttribute("data-role-oncolor");
			console.info(oncolor);
			if(oncolor){
				setting.oncolor = oncolor;
			}
			new Switch(inputs[i],setting);
		}
	});
})(Zepto)

