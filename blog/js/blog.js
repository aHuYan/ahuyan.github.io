function init(){
	ask_json("json/bloglist.json",ask_bloglist);
	alert(get_urlsrt("class"));
}	

function get_urlsrt(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return "no class"; 
    } 

function ask_json(url,call_function){
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function (){
		if(request.status == 200){
			var text=JSON.parse(request.responseText);
			call_function(text);
		}else{
			//alert("json加载失败，请重试");
		}
	};
	request.send(null);  
}

function ask_bloglist(text){
	add_bloglist(text);
}

function ask_blogclass(text){
	add_byclass(text);
}

function add_byclass(blogclass){
	var class_name = get_urlsrt("class");
	if(class_name=="noip"){
		for (var h=blogclass.noip[0];h>0;h--){
			creat_blog(bloglist,blogclass.noip[h]);
		}
	}
}

function creat_blog(bloglist,i){
	var a=document.createElement("a");
	document.getElementById("blog_list").appendChild(a);
	a.setAttribute("href",bloglist.blog[i].url);
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

function add_bloglist(bloglist){
	if(get_urlsrt("class")=="no class"){
		if(bloglist.number == 0){
			var para = document.createElement("p");
			document.getElementById("blog_list").appendChild(para);
			para.innerHTML="暂时没有博文哟~";
			para.style.marginLeft="5px";
		}else if(bloglist.number <= 7 && bloglist.number != 0){
			for(var i=bloglist.number-1; i>=0; i--){
				creat_blog(bloglist,i);
			}
		}else{
			var j=bloglist.number-1
			for(var n=6 ; n>=0 ;n--){
				creat_blog(bloglist,j);
				j--;
			}
		}
	}else{
		ask_json("json/blogclass.json",ask_blogclass);
	}
}

window.onload=init;
