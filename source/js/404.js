window.onload=function(){
	var music=new Array("465675773","525278388","418602088","26060065","451703096","1696373","30967975","3026583","472361096","446875490","512358011","461525011","459723209","66282","38592976","22778888","401249910","17996972","515453363","16607987","28157586","541259","499117","26377651","496869422","65761","28949444","5370718","33206214","414826502","28885472","27646851","515269424","30903117","512358011");
	var n=parseInt(Math.random()*35);
	var src="//music.163.com/outchain/player?type=2&id=" + music[n] + "&auto=0&height=66";
	var iframe=document.createElement("iframe");
	document.getElementById("listen").appendChild(iframe);
	iframe.setAttribute("frameborder","no");
	iframe.setAttribute("border","0");
	iframe.setAttribute("marginwidth","0");
	iframe.setAttribute("marginheight","0");
	iframe.setAttribute("width",330);
	iframe.setAttribute("height",86);
	iframe.setAttribute("src",src);
}