function init(){
	show_header();
	set_recent_read();
	ask_json();
}	

function show_header(){
	if(localStorage["is_first_come"]=="0")
	{
		document.getElementById("header_articls").style.display="none";
		document.getElementById("header_funs").style.display="block";
		paly_header_funs();
	}
	else
	{
		document.getElementById("header_articls").style.display="block";
		document.getElementById("header_funs").style.display="none";
		localStorage.setItem("is_first_come","0");
		localStorage.setItem("recent_read_one","none");
		
	}
}
		
function paly_header_funs(){
	document.getElementById("header_funs").style.fontSize="1em";
	//获取当前时间
	var date = new Date;
	var now = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
	document.getElementById("now_time").innerHTML="&nbsp;" + now;
	//计算距离NOIP的时间
	var noip = "2018/11/09 10:00:00";
	var to_noip = new Date(noip).getTime() - date.getTime();
	document.getElementById("to_noip").innerHTML="&nbsp;&nbsp;&nbsp;距离NOIp2018还有" + "<strong>" + Math.floor(to_noip/(24*3600*1000)) + "</strong>" + "天&nbsp;&nbsp;";
	/*获取地理信息 参考headfirst html5
	if(navigator.geolecation){
		navigator.geolecation.getCurrentPosition(displayLocation);
	}else{
		document.getElementById("to_noip").innerHTML="&nbsp;&nbsp;<strong>此浏览器不支持地理位置</strong>";
	}
	function degreesToDecimal(degrees,minutes,seconds){
		return degrees + (minutes/60.0) + (seconds/3600.0);
	}
	function displayLocation(position){
		var latitude = position.coords.latitude; 
		var longitude = position.coords.longitude;
		document.getElementById("show_position").innerHTML="&nbsp;&nbsp;当前位置：" + latitude + "/" + longitude; 
	}
	*/
}		
	
function set_recent_read(){
	if(localStorage["recent_read_one"]=="none")
	{
		document.getElementById("recent_read_1").innerHTML="最近暂时没有读什么哟~";
		document.getElementById("recent_read_1").style.margin="5px";
	}else{
		document.getElementById("recent_read_1").innerHTML= localStorage["recent_read_one"];
		document.getElementById("recent_read_2").innerHTML= localStorage["recent_read_two"];
		document.getElementById("recent_read_3").innerHTML= localStorage["recent_read_three"];
	}
	
}		
	
function ask_json(){
	var url ="blog/json/bloglist.json";
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function (){
		if(request.status == 200){
			var text=JSON.parse(request.responseText);
			add_bloglist(text);
		}else{
			alert("json加载失败，请重试");
		}
	};
	request.send(null);  
}

function add_bloglist(bloglist){
	if(bloglist.number == 0){
		var para = document.createElement("p");
		document.getElementById("blog_list").appendChild(para);
		para.innerHTML="暂时没有博文哟~";
		para.style.marginLeft="5px";
	}else if(bloglist.number <= 7 && bloglist.number != 0){
		for(var i=bloglist.number-1; i>=0; i--){
			var div=document.createElement("div");
			document.getElementById("blog_list").appendChild(div);
			div.setAttribute("class","list_blog");
			var divid="list_blog" + "_"+ i;
			div.setAttribute("id",divid);
			
			var title=document.createElement("p");
			document.getElementById(divid).appendChild(title);
			title.setAttribute("class","blog_title");
			title.innerHTML=bloglist.blog[1].name;
		}
	}
}

window.onload=init;
