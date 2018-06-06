function init(){
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

window.onload=init;