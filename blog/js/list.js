﻿$(function(){if(get_urlsrt("p")=="no str"){ask_json("blog/json/bloglist.json","list")}else{ask_json("blog/json/bloglist.json","archive")}});function get_urlsrt(name){var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");var r=window.location.search.substr(1).match(reg);if(r!=null){return unescape(r[2])}return"no str"}function ask_json(url,way){$.ajax({type:"GET",url:url,success:function(data){var text=data;if(way=="list"){get_data(text)}else{if(way=="archive"){get_arch(text)}}}})}function get_data(json){var page=(get_urlsrt("page")=="no str")?1:parseInt(get_urlsrt("page"));var num=json.number;var n=5;var m=(num%n!=0)?(num+(n-num%n))/n:(num/n);var pre=0;var nex=0;var fro=1;var to=0;if(num<=n){to=num;page=1}else{if(page==1){nex=1;page=1;to=n}else{pre=1;fro=(page-1)*n+1;if(page*n>=num){nex=0;to=num}else{nex=1;to=page*n}}}creat_card_by_num(fro,to,json);set_page_bottom(pre,nex,m,page)}function creat_card_by_num(fro,to,text){for(var n=fro-1;n<=(to-1);n++){var begin="<div class='card' id='archive_"+(n+1)+"'>";var title="<a class='blog_title' href='blog?p="+n+"'>"+text.blog[n].title+"</a>";var b_tim="<div class='blog_sub'><span class='glyphicon glyphicon-calendar'></span><span class='blog_time'>"+text.blog[n].date+"</span>";var b_tag="<span class='glyphicon glyphicon-tags'></span>";for(var i=0;i<parseInt(text.blog[n].tags[0]);i++){b_tag+=("<a class='tag'>"+text.blog[n].tags[i+1]+"</a>");if(parseInt(text.blog[n].tags[0])-i>=2){b_tag+="<span class='tag_separate'></span>"}}b_tag+="</div>";var b_ody="<a class='blog_body' href='blog?p="+n+"'><p>"+text.blog[n].profile+"</p>";var b_end="</a></div>";var all=begin+title+b_tim+b_tag+b_ody+"<p class='text-right' style='color:black'>点击阅读更多...</br></p>"+b_end;$("#blog_list").append(all)}}function set_page_bottom(pre,nex,all,thi){var begin="<nav><ul class='pager'>";var previ="<li class='previous "+(pre?"":"disabled")+"'><a href='"+(pre?"?page="+(thi-1):"#")+"'><span aria-hidden='true'>←</span> Older</a></li>";var lists="";for(var n=0;n<all;n++){var activ=((n+1)==thi)?"disabled":"";lists+="<li class='"+activ+" hidden-xs'><a href='?page="+(n+1)+"' >"+(n+1)+"</a></li>"}var nextp="<li class='next "+(nex?"":"disabled")+"'><a href='"+(nex?"?page="+(thi+1):"#")+"'>Newer <span aria-hidden='true'>→</span></a></li>";var b_end="</ul></nav>";var all=begin+previ+lists+nextp+b_end;$("#page_turn").append(all)}function get_arch(json){var num=parseInt(get_urlsrt("p"));var url="/blog/"+num+".html";$.get(url,function(data){$("#show_blog").html(data);$("title").html(json.blog[num].title+" | 胡言")});set_local(json,num)}function set_local(json,n){if(localStorage.recent_read_one==json.blog[n].title){localStorage.recent_read_one_url=json.blog[n].url}else{if(localStorage.recent_read_two==json.blog[n].title){localStorage.recent_read_two=localStorage.recent_read_one;localStorage.recent_read_two_url=localStorage.recent_read_one_url;localStorage.recent_read_one=json.blog[n].title;localStorage.recent_read_one_url=json.blog[n].url}else{localStorage.recent_read_three=localStorage.recent_read_two;localStorage.recent_read_three_url=localStorage.recent_read_two_url;localStorage.recent_read_two=localStorage.recent_read_one;localStorage.recent_read_two_url=localStorage.recent_read_one_url;localStorage.recent_read_one=json.blog[n].title;localStorage.recent_read_one_url=json.blog[n].url}}};
