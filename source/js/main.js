function init(){
	drawHome();
}
function drawHome(){
	var canvas_of_home = document.getElementById("bottom_menu_of_home");
	var content_of_home = canvas_of_home.getContext("2d");
	var home_img = new Image();
	home_img.src="/source/img/home.gif";
	content_of_home.drawImage(home_img,0,0,40,40);
}
			
window.onload=init;