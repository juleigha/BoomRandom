// This small program will only load jpegs the user is approaching

$(document).ready(function() {
	const approaching = new Event('load:Img');
	const receding  = new Event('unload:Img');
	var lastPane =  ( localStorage.getItem("LastPane") == "null" || localStorage.getItem("LastPane") == null )? "pane0" : localStorage.getItem("LastPane") ;
	
	// Scroll to last element
	document.querySelector("[pane-ID="+lastPane+"]").scrollIntoView();
	$("[pane-ID="+lastPane+"]").attr("src",$("[pane-ID="+lastPane+"]").attr("pane-src"));

	var imgs = $(".comic-wrapper img");
	
	// updates source of images as img element approaches 
	$(document).scroll(function(){
		if($(document).scrollTop() % 100 < 10){
			for(var i = 0; i<imgs.length;i++){
				if(Math.abs(imgs[i].getBoundingClientRect().y) < 300){
					if (! $("#contentsTable").hasClass("Active")){
						lastPane = imgs[i].getAttribute("pane-ID");
						localStorage.setItem("LastPane",lastPane);

					}
				}
				if(Math.abs(imgs[i].getBoundingClientRect().y) < 3500){
					imgs[i].dispatchEvent(approaching);
				}
			}
		}
	});
	
	// open nav 
	$(".chapter-btn").click(function(){
		if($("#contentsTable").hasClass("Active")){
			closeContents(document.querySelector("[pane-ID="+lastPane+"]"));
		}
		else{
			openContents();
		}
	})
	
	// chapter nav links
	$("#contentsTable li a").click(function(e){
		e.preventDefault();
		var id = $(this).attr("data-scroll");
		document.getElementById(id).children[0].children[0].dispatchEvent(approaching);
		closeContents(document.getElementById(id));
	})
	
	//update image source 
	$("img").on('load:Img',function(){
		$(this).attr("src",$(this).attr("pane-src"));
	})
	
	// remove image from page (if site is larg enough) 
	$("img").on("unload:Img", function(){
		$(this).attr("src","");
	})

function closeContents(element){
	$(".comic-wrapper").css("top","auto");
	$(".chapter-btn").text("Chapters");
	$(".comic-wrapper").css("position","relative");
	$("#contentsTable").addClass("hideChaps");
	$("#contentsTable").removeClass("scale-in-ver-top");
	ScrollToElem(element);
}
function ScrollToElem(element) {
	element.scrollIntoView();
	setTimeout(function(){
		$("#contentsTable").removeClass("Active");
		$(document).trigger("scroll");
	},600);
}
function openContents(){
	$(".comic-wrapper").css("position","absolute");
	$(".chapter-btn").text("Close");
	$(".comic-wrapper").css("top","-"+$(".comic-wrapper").height()+"px");
	$("#contentsTable").addClass("Active");
	$("#contentsTable").addClass("scale-in-ver-top");
	$("#contentsTable").removeClass("hideChaps");
}
$(document).keyup(function(e) {
	if(e.key === "Escape"){
		closeContents(document.querySelector("[pane-ID="+lastPane+"]"));
	}
})


});
