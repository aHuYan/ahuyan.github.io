function init(){
	if(localStorage["is_first_come"]=="0")
	{
		document.getElementById("header_articls").style.display="none";
		document.getElementById("header_funs").style.display="block";
	}
	else
	{
		document.getElementById("header_articls").style.display="block";
		document.getElementById("header_funs").style.display="none";
		localStorage.setItem("is_first_come","0");
	}
}			
window.onload=init;