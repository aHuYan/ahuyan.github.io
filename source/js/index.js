function init(){
	show_header();
	set_recent_read();
	ask_json();
	loading();
}	

function loading(){
	if(document.readyState=="complete"){
		document.body.style.overflow="hidden";
		 setTimeout(function () {
			 for(var o=1;o>=0;o=o-0.1){
				 setTimeout(function (){
					document.getElementById("loading").style.opacity=o;
				 }
				 ,700);
			 }
			 document.getElementById("loading").style.display="none"; 
			 document.body.style.overflow="auto";
		}, 1000);
	}
}

function show_header(){
	if(localStorage.is_first_come=="0")
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
		localStorage.recent_read_one="none";
		localStorage.recent_read_two="none";
		localStorage.recent_read_three="none";
		localStorage.recent_read_one_url="none";
		localStorage.recent_read_two_url="none";
		localStorage.recent_read_three_url="none";
	}
}
		
function paly_header_funs(){
	document.getElementById("header_funs").style.fontSize="1em";
	
	var date = new Date;
	var now = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
	document.getElementById("now_time").innerHTML="&nbsp;" + now;

	var noip = "2018/11/09 10:00:00";
	var to_noip = new Date(noip).getTime() - date.getTime();
	document.getElementById("to_noip").innerHTML="&nbsp;&nbsp;&nbsp;距离NOIp2018还有" + "<strong>" + Math.floor(to_noip/(24*3600*1000)) + "</strong>" + "天&nbsp;&nbsp;";
	
}		
	
function set_recent_read(){
	if(localStorage["recent_read_one"]=="none")
	{
		document.getElementById("recent_read_1").innerHTML="最近暂时没有读什么哟~";
		document.getElementById("recent_read_1").style.margin="5px";
	}else{
		document.getElementById("recent_read_1").innerHTML= "1.";
		var a1=document.createElement("a");
		document.getElementById("recent_read_1").appendChild(a1);
		a1.setAttribute("href","blog?p="+localStorage.recent_read_one_url);
		a1.innerHTML=localStorage.recent_read_one;
		
		document.getElementById("recent_read_2").innerHTML= "2.";
		var a2=document.createElement("a");
		document.getElementById("recent_read_2").appendChild(a2);
		a2.setAttribute("href","blog?p="+localStorage.recent_read_two_url);
		a2.innerHTML=localStorage.recent_read_two;
		
		document.getElementById("recent_read_3").innerHTML= "3.";
		var a3=document.createElement("a");
		document.getElementById("recent_read_3").appendChild(a3);
		a3.setAttribute("href","blog?p="+localStorage.recent_read_three_url);
		a3.innerHTML=localStorage.recent_read_three;
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
			var a=document.createElement("a");
			document.getElementById("blog_list").appendChild(a);
			a.setAttribute("href","blog?p="+bloglist.blog[i].url);
			a.setAttribute("title",bloglist.blog[i].name);
			
			var div=document.createElement("div");
			a.appendChild(div);
			div.setAttribute("class","list_blog");
			var divid="list_blog" + "_"+ i;
			div.setAttribute("id",divid);
			
			var title=document.createElement("p");
			document.getElementById(divid).appendChild(title);
			title.setAttribute("class","blog_title");
			title.innerHTML=bloglist.blog[i].name;
			
			var date=document.createElement("p");
			document.getElementById(divid).appendChild(date);
			date.setAttribute("class","blog_date");
			date.innerHTML=bloglist.blog[i].date;
			
			var profile=document.createElement("p");
			document.getElementById(divid).appendChild(profile);
			profile.setAttribute("class","blog_profile");
			profile.innerHTML=bloglist.blog[i].profile;
		}
	}
}

window.onload=init;