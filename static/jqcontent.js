//JavaScript Dynamic Content using jQuery
//www.mclelun.com

$(document).ready(function(){
var jqc_vHash = window.location.hash;
var jqc_intInterval = 0;
var jqc_vDuration = 2000;

{
	jqc_fnLoad(jqc_vHash);
}

//FUNCTION: LOAD CONTENT
function jqc_fnLoad(p_ID){
		
	p_ID = p_ID.substr(1,p_ID.length);
	
	$("#jqc_loading")
		.css({visibility:"visible"})
		.css({opacity:"1"})
		.css({display:"block"});
	
	$("#jqc_content").animate({ height: 'hide' }, 500, function() { 
		$("#jqc_content").empty().load("/"+p_ID+'/', jqc_fnDone);
	});
	
	//UPDATE LIST COLOR
	$("#jqc_menu").find("li").each(function() { 
		if(this.id == p_ID)
		{
			$(this).css("color", "#000");
		}
		else
		{
			$(this).css("color", "#EEE");
		}
	});
}

//LIST CLICK
$("#jqc_menu li").click(function(){
	clearInterval(jqc_intInterval);
	jqc_vHash = "#" + this.id;
	jqc_fnLoad(jqc_vHash);
//	document.location.hash = jqc_vHash;
});

//LINK CLICK
$("#jqc_menu_link a").click(function(e){
	clearInterval(jqc_intInterval);
	jqc_vHash = "#" + this.id;
	jqc_fnLoad(jqc_vHash);
//	document.location.hash = jqc_vHash;
	e.preventDefault();
});

//FUNCTION: CHECK HASH CHANGE
function jqc_fnLoop()
{
    var tmpHash = window.location.hash;
	if(tmpHash)
	{
		if(tmpHash != jqc_vHash)
		{
			jqc_vHash = tmpHash;
			jqc_fnLoad(jqc_vHash);
		}
		
	}
}

//FUNCTION: DONE LOADING
function jqc_fnDone()
{
	$("#jqc_content").animate({ height: 'show' }, 500);
	$("#jqc_loading").fadeTo(1000, 0);
	jqc_intInterval = setInterval(jqc_fnLoop, jqc_vDuration);
};

});

