$(document).ready(function() {
	const approaching = new Event('load:Img');
	const receding  = new Event('unload:Img');
	var lastPane =  ( localStorage.getItem("LastPane") == "null" || localStorage.getItem("LastPane") == null )? "pane0" : localStorage.getItem("LastPane") ;
	// ScrollToElem();
	document.querySelector("[pane-ID="+lastPane+"]").scrollIntoView();
	$("[pane-ID="+lastPane+"]").attr("src",$("[pane-ID="+lastPane+"]").attr("pane-src"));
// 	setTimeout(function() {
// 		$(".comic-wrapper img").css("height",$("[pane-ID="+lastPane+"]").width() * 1.6 );
// 		console.log($("[pane-ID="+lastPane+"]").width() * 1.6 );
// },200);

	var imgs = $(".comic-wrapper img");
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
				// else{
				// 	imgs[i].dispatchEvent(receding);
				// }
			}
		}

//		var imgHeight = $("[pan	e-ID=pane1]").height();
	});
	$(".chapter-btn").click(function(){
		if($("#contentsTable").hasClass("Active")){
			closeContents(document.querySelector("[pane-ID="+lastPane+"]"));
		}
		else{
			openContents();
		}
	})
	$("#contentsTable li a").click(function(e){
		e.preventDefault();
		var id = $(this).attr("data-scroll");
		document.getElementById(id).children[0].children[0].dispatchEvent(approaching);
		closeContents(document.getElementById(id));
	})
	$("img").on('load:Img',function(){
		$(this).attr("src",$(this).attr("pane-src"));
	})
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

var scroll = window.pageYOffset;
var shadowOffSetDiff = 0;
$(document).scroll(function(e) {
	var shadowBlur;
	var shadowRGB = "rgba(0, 0, 0, 0.8)";
	var lightSource = window.pageYOffset - 20;
	shadowOffSetDiff -=1;
	$("body .overlay").css("opacity",window.pageYOffset/600);
	$(".lightSource-shadow").each(function() {
		var hgt = $(this).height();
		var shadowOffSet = (this.offsetTop - (lightSource ) ) / 35;
		if (shadowOffSet > -2 && shadowOffSet < 2){
			$(this).css("box-shadow","0px "+(shadowOffSet)+"px 8px rgba(0, 0, 0, 0.50)" );
		}
		else {
			$(this).css("box-shadow","0px "+(shadowOffSet)+"px 7px rgba(0, 0, 0, 0.51)" );
			//rgb(23,21,0)
		}
	})
	scroll = window.pageYOffset;
})

});
