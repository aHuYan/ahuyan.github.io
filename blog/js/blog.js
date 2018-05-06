function init(){
	ask_json();
}	

function ask_json(){
	var url ="json/bloglist.json";
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function (){
		if(request.status == 200){
			var text=JSON.parse(request.responseText);
			add_bloglist(text);
		}else{
			//alert("json加载失败，请重试");
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
	}
}

window.onload=init;