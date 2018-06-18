function init(){
	ask_json();
	disqus();
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
				 ,500);
			 }
			 document.getElementById("loading").style.display="none"; 
			 document.body.style.overflow="auto";
		}, 1000);
	}
}

function get_urlsrt(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return "no str"; 
    } 

function creat_blog(n,jsonname){
	var a=document.createElement("a");
	document.getElementById("blog_list").appendChild(a);
	a.setAttribute("href","?p=" + jsonname.blog[n].url);
	a.setAttribute("title",jsonname.blog[n].name);
					
	var div=document.createElement("div");
	a.appendChild(div);
	div.setAttribute("class","list_blog");
	var divid="list_blog" + "_"+ n;
	div.setAttribute("id",divid);
					
	var title=document.createElement("p");
	document.getElementById(divid).appendChild(title);
	title.setAttribute("class","blog_title");
	title.innerHTML=jsonname.blog[n].name;
					
	var date=document.createElement("p");
	document.getElementById(divid).appendChild(date);
	date.setAttribute("class","blog_date");
	date.innerHTML="&nbsp;&nbsp;" + jsonname.blog[n].date;
					
	var profile=document.createElement("p");
	document.getElementById(divid).appendChild(profile);
	profile.setAttribute("class","blog_profile");
	profile.innerHTML=jsonname.blog[n].profile;
}

function ask_json(){
	var url="blog/json/bloglist.json";
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function (){
		if(request.status == 200){
			var text=JSON.parse(request.responseText);
			if(get_urlsrt("p")=="no str"){
				add_bloglist(text);
			}else{
				add_blogarticle(parseInt(get_urlsrt("p")),text);
			}
			add_blogaside();
		}else{
			alert("json加载失败，请重试");
		}
	};
	request.send(null);  
}

function add_bloglist(bloglist){
	if(get_urlsrt("class")=="no str"){
		if(bloglist.number == 0){
			var para = document.createElement("p");
			document.getElementById("blog_list").appendChild(para);
			para.innerHTML="暂时没有博文哟~";
			para.style.marginLeft="5px";
		}else if(bloglist.number <= 7 && bloglist.number != 0){
			for(var i=bloglist.number-1; i>=0; i--){
				creat_blog(i,bloglist);
			}
		}else{
			var j=bloglist.number-1
			for(var n=6 ; n>=0 ;n--){
				creat_blog(j,bloglist);
				j--;
			}
		}
	}else{
		var url="blog/json/blogclass.json";
		var request = new XMLHttpRequest();
		request.open("GET",url);
		request.onload = function (){
		if(request.status == 200){
			var blogclass=JSON.parse(request.responseText);
			var class_name = get_urlsrt("class");
			var h;
			if(class_name=="noip"){			
				for (h=blogclass.noip[0];h>0;h--){
					creat_blog(blogclass.noip[h],bloglist);
				}
			}else if(class_name=="algorithm"){
				for (h=blogclass.algorithm[0];h>0;h--){
					creat_blog(blogclass.algorithm[h],bloglist);
				}
			}else if(class_name=="number"){
				for (h=blogclass.number[0];h>0;h--){
					creat_blog(blogclass.number[h],bloglist);
				}
			}else if(class_name=="life"){
				for (h=blogclass.life[0];h>0;h--){
					creat_blog(blogclass.life[h],bloglist);
				}
			}
		}else{
			alert("json加载失败，请重试");
		}
	};
	request.send(null);  

	}
}

function add_blogaside(){
	var url_c=get_urlsrt("class");
	var url="blog/json/blogclass.json";
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function (){
		if(request.status == 200){
			var allblogclass=JSON.parse(request.responseText);
			for(var i=1;i<=parseInt(allblogclass.all[0]);i++){
				var a=document.createElement("a");
				document.getElementById("blog_class").appendChild(a);
				a.setAttribute("href","blog?class=" + allblogclass.all[i]);
				a.setAttribute("title",allblogclass.all[i]);
				
				var p=document.createElement("p");
				a.appendChild(p);
				p.setAttribute("class","class_list");
				if(allblogclass.all[i]=="noip"){	
					p.innerHTML="NOIp"+"（"+allblogclass.noip[0]+"）";
				}else if(allblogclass.all[i]=="struct"){	
					p.innerHTML="数据结构"+"（"+allblogclass.struct[0]+"）";
				}else if(allblogclass.all[i]=="number"){
					p.innerHTML="数论"+"（"+allblogclass.number[0]+"）";
				}else if(allblogclass.all[i]=="algorithm"){
					p.innerHTML="算法"+"（"+allblogclass.algorithm[0]+"）";
				}else if(allblogclass.all[i]=="life"){
					p.innerHTML="生活"+"（"+allblogclass.life[0]+"）";
				}
			}
		}else{
			alert("json加载失败，请重试");
		}
	};
	request.send(null);  
}

function add_blogarticle(num,list){
	var iframe=document.createElement("iframe");
	document.getElementById("blog_list").appendChild(iframe);
	iframe.setAttribute("src","blog/" + get_urlsrt("p"));
	iframe.setAttribute("frameborder","0");
	iframe.setAttribute("width","100%");
	iframe.setAttribute("height",list.blog[num].height);
	if(localStorage.recent_read_one == list.blog[num].name){
		localStorage.recent_read_one_url=list.blog[num].url;
	}else if( localStorage.recent_read_two == list.blog[num].name){
		localStorage.recent_read_two=localStorage.recent_read_one;
		localStorage.recent_read_two_url=localStorage.recent_read_one_url;
		localStorage.recent_read_one=list.blog[num].name;
		localStorage.recent_read_one_url=list.blog[num].url;
	}else{
		localStorage.recent_read_three=localStorage.recent_read_two;
		localStorage.recent_read_three_url=localStorage.recent_read_two_url;
		localStorage.recent_read_two=localStorage.recent_read_one;
		localStorage.recent_read_two_url=localStorage.recent_read_one_url;
		localStorage.recent_read_one=list.blog[num].name;
		localStorage.recent_read_one_url=list.blog[num].url;
	}
}

function disqus(){
	if(get_urlsrt("p") == "no str" ){
		document.getElementById("disqus").style.display="none";
	}
}

window.onload=init;