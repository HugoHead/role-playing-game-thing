var level = 0;
var frame_counter=0;
var sprite_position = 0;
var state = true;
var armed = true;
$( function() {
    $("#bar").on( "click", function() {
      if ( state ) {
        $("#slider" ).animate({
          left: "75px"
        }, 700 );
      } else {
        $("#slider" ).animate({
          left: "0"
        }, 700 );
      }
      state = !state;
    });
} );
function callOffset(direction){
	//this finds the top pos of shadow then slices the "px" so math can be applied
	var distup = $("#shadow").css("top").replace("px", "") - 24;
	var distdown = $("#shadow").css("top").replace("px", "");
	var distleft = $("#shadow").css("top").replace("px", "") - 12;
	var distright = Number($("#shadow").css("top").replace("px", "")) - 12;
	switch(direction){
		case "up":
			$("#weapon").css("top",  distup +"px")
			$("#weapon").css("left",  $("#shadow").css("left"))
			console.log('offset')
			break;
		case "down":
			$("#weapon").css("top",  distdown +"px")
			$("#weapon").css("left",  $("#shadow").css("left"))
			console.log('offset')
			break;
		case "left":
			$("#weapon").css("top",  distleft +"px")
			console.log('offset')
			$("#weapon").css("left",  Number($("#shadow").css("left").replace("px", ""))-12 +"px")
			break;
		case "right":
			$("#weapon").css("top",  distright +"px")
			$("#weapon").css("left",  Number($("#shadow").css("left").replace("px", ""))+12 +"px")
			console.log('offset')
			break;
		default:
			$("#weapon").css("top",  distup +"px")
			console.log('offset')
			break;
	}
}
function devMotion()
{
    document.getElementById("frame").style.opacity = "1";
    document.getElementById("shadow").style.backgroundColor = "rgba(0,0,0,0.2)";
}
function count_frames()
{
	if(frame_counter<59)
	{
		frame_counter++;
	}
	else
	{
		frame_counter=0;
	}
}
// FOR DIRE SITUATIONS ONLY
// This thing guzzles ram at an unimaginable rate.
// unless you are using for less than 60 millies, browser WILL crash.
// lags if longer than 10
// FOR DIRE SITUATIONS ONLY
/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}*/
function custoalert(message)
{
	var milliseconds = (new Date).getTime();
	$("body").append('<div ID="talkingguy" data-num="'+milliseconds+'"></div>');
	$("#talkingguy[data-num='"+milliseconds+"']").append("<p>"+message+"</p>");
	$("#talkingguy[data-num='"+milliseconds+"']").css("z-index", 3);
	setTimeout(function()
	{
		$("#talkingguy[data-num='"+milliseconds+"']").hide(500,function(){$("#talkingguy[data-num='"+milliseconds+"']").remove()});
	}
	, 2000);
}
function talk(check)
{
	var weirdoscript = new Array();
		weirdoscript[0]= "Weirdo: Good'ay person,<br> what yo' name?";
		weirdoscript[1]= "Weirdo: I am very hairy";
		weirdoscript[2]= "Weirdo: I need conditioner";
		weirdoscript[3]= "Weirdo: There is only one <br>guy with conditioner";
		weirdoscript[4]= "Weirdo: He'll trade a square<br> and a box for conditioner";
		weirdoscript[5]= "Weirdo: Could you help me?";
	var hasSpray = $("#hairspray").hasClass("inInv");
	if(hasSpray && level == 0)
	{
		console.log("had spray");
		custoalert("Weirdo: Thank you so much!");
		//remove the hairspray from your inventory
		document.getElementById("hairspray").remove();
		$("#weirdo").css("left", "1154px");
		level = 1;
	}
	else if (level == 0 && check)
	{
		custoalert(weirdoscript[0]);
		window.setTimeout(function()
		{
			custoalert(weirdoscript[1]);
			window.setTimeout(function()
			{
				custoalert(weirdoscript[2]);
				window.setTimeout(function()
				{
					custoalert(weirdoscript[3]);
					window.setTimeout(function()
					{
						custoalert(weirdoscript[4]);
						window.setTimeout(function()
						{
							custoalert(weirdoscript[5]);

						}, 2000);
					}, 2000);
				}, 2000);
			}, 2000);
		}, 2000);
	}
}
function change_sprite()
{
	if(sprite_position<4)
	{
		$('#you').css('backgroundPosition',sprite_position*-48+'px 0px');
	}
	else
	{
		$('#you').css('backgroundPosition',(sprite_position-4)*-48+'px -48px');
	}

	if (sprite_position<7 && frame_counter%10===0)
	{
		sprite_position++;
	}
	else if (frame_counter%10===0)
	{
		sprite_position=0;
	}
}
function togglecave()
{
	var thisCave = touching("#you",".cave")
	if(thisCave)
	{
		thisCave.css("background-color","rgba(20,20,20,0.4)");
	}
	else
	{
		$(".cave").css("background-color","green");
	}

}
function swingSword()
{

if(armed == true)
{
	speed = 100;
	armed = false;
    const frameDiffernce = 72;//the hieght in px of each frame on the sprite sheet
    const shadow = $("#weapon");
	shadow.css("background-position", "0px 0px")
    window.setTimeout(function()
    {
        shadow.css("background-position", "0px "+frameDiffernce*1+"px")
        window.setTimeout(function()
        {
            console.log(shadow[0].style.backgroundPosition);
            shadow.css("background-position", "0px "+frameDiffernce*2+"px");
            console.log(shadow[0].style.backgroundPosition);
            window.setTimeout(function()
            {
                shadow.css("background-position", "0px "+frameDiffernce*3+"px");
                console.log(shadow[0].style.backgroundPosition);
                window.setTimeout(function()
                {
                    shadow.css("background-position", "0px "+frameDiffernce*2+"px");
                    console.log(shadow[0].style.backgroundPosition);
                    window.setTimeout(function()
                    {
                        shadow.css("background-position", "0px "+frameDiffernce*1+"px");
                        console.log(shadow[0].style.backgroundPosition);
                        window.setTimeout(function()
                        {
                            shadow.css("background-position", "0px 0px");
                            window.setTimeout(function()
                            {
                                armed = true;
                            }, 300);
                        }, speed);
                    }, speed);
                }, speed);
            }, speed);
        }, speed);
    }, speed);
}}
function trade(inputs, output)
{
	
	var length = inputs.length;
	var enough = true;
	var inven = document.getElementById("inventory")
    for (var i = 0; i < length; i++)
    {
		var obj = inputs[i];
        if(!obj.hasClass("inInv"))
		{
			enough = false;
		}
    }
	if(enough)
	{
		for (var h = 0; h < length; h++)
    	{
			var obj = inputs[h];
			obj.remove();
    	}
		$("#inventory").append(output);
	}
	return enough;
}
function checkForE()
{
	console.log("here");
	if (key.e)
	{
		buyHairConditioner();
	}
}
function repeated()
{
	if(touching("#you","#weirdo"))
	{
		talk(true);
	}
	else if(touching("#you","#Hairdude"))
	{
		//super sorray about the mess
		//-Adithya
		custoalert("Merchant: Hi! I am selling hair <br> conditioner for a bargin <br> price of one box <br>and one square.");
		var eListener;
		window.setTimeout(function()
		{
			custoalert("Press <button onclick=\"buyHairConditioner();\">Here</button><br> to buy.");
		}, 2000);
	}

}
function buyHairConditioner()
{
	console.log("here");
	if(trade([$("#square"), $("#box")], "<div Id='hairspray'></div>"))
	{
		$("#hairspray").addClass("inInv")
		custoalert("Merchant: Here you are.<br>Have a nice day.");
	}
	else 
	{
		custoalert("Mechant: Sorry, <br>you don't have the right items.");
	}
}
function moving()
{
	
	var up, down, left, right;
	if(state)
	{
		up = key.up;
		down = key.down;
		left = key.left;
		right = key.right;
	}
	else
	{
		up = key.w;
		down = key.s;
		left = key.a;
		right = key.d;	
	}
	if(up)
	{
		move2('top',-5,'#you');
		move2('top',-5,'.follow');
		callOffset("up");
		$('#you').css('transform','rotate(180deg)');
		$('.follow').css('transform','rotate(0deg)');
		change_sprite();
		if(touching("#you",".darn_obstacle"))
		{
			repeated();
			move2('top',5,'#you');
			move2('top',5,'.follow');
			callOffset("up");
		}
		if(touching("#shadow","#top"))
		{
			move2('top',5,'#game_elements*');
			move2('top',5,'.follow');
			callOffset("up");
		}
	}
	if(down)
	{
		move2('top',5,'#you');
		move2('top',5,'.follow');
		callOffset("down");
		$('#you').css('transform','rotate(0deg)');
		$('.follow').css('transform','rotate(180deg)');
		change_sprite();
		if(touching("#you",".darn_obstacle"))
		{
			repeated();
			move2('top',-5,'#you');
			move2('top',-5,'.follow');
			callOffset("down");
		}
		if(touching("#shadow","#bottom"))
		{
			move2('top',-5,'#game_elements*');
			move2('top',-5,'.follow');
			callOffset("down");
			// move2('top',-5,'#you')
		}
	}
	if(left)
	{
		move2('left',-5,'#you');
		move2('left',-5,'.follow');
		callOffset("left");
		$('#you').css('transform','rotate(90deg)');
		$('.follow').css('transform','rotate(-90deg)');
		change_sprite();
		if(touching("#you",".darn_obstacle"))
		{
			repeated();
			move2('left',5,'#you');
			move2('left',5,'.follow');
			callOffset("left");
		}
		if(touching("#shadow","#left"))
		{
			
			move2('left',5,'#game_elements*');
			move2('left',5,'.follow');
			callOffset("left");
			// move2('left',5,'#you')
		}
	}
	if(right)
	{
		move2('left',5,'#you');
		move2('left',5,'.follow');
		callOffset("right");
		$('#you').css('transform','rotate(270deg)');
		$('.follow').css('transform','rotate(90deg)');
		change_sprite();
		if(touching("#you",".darn_obstacle"))
		{
			repeated();
			move2('left',-5,'#you');
			move2('left',-5,'.follow');
			callOffset("right");
		}
		if(touching("#shadow","#right"))
		{	
			move2('left',-5,'#game_elements*');
			move2('left',-5,'.follow');
			callOffset("right");
			// move2('left',-5,'#you')
		}
	}
}
function toggleInventory()
{
	if($("#game_elements").hasClass("blurFilter"))
	{
		$("#game_elements").removeClass("blurFilter");
		$("#shadow").removeClass("blurFilter");
		$("#inventory").hide();
	}
	else
	{
		$("#game_elements").addClass("blurFilter");
		$("#shadow").addClass("blurFilter");
		$("#inventory").show();
	}
}
function hideInventory()
{
	$("#inventory").hide();
}
function hold(itemheld)
{
	var thisImage = 0;
	switch(itemheld) {
  		case $("#sword"):
    		thisImage = "url('swing.png')"
		break;
  		default:
    		thisImage = "url('swing.png')"
}
	//get all css rules applyed to the itemHeld
	//grab the backgroundImage
	var image = thisImage;
	
	var shadow = document.getElementById("weapon");
	//enusre that the image fits in the div
	//shadow.style.backgroundSize = "";
	//prevent the image from reapeating.
	//shadow.style.backgroundRepeat = "no-repeat";
	//apply the background image
	shadow.style.backgroundImage = image;
	console.log("End of Hold");
}
function pickupitem()
{
	var a = touching("#you", "#game_elements .item");
	if(a)
	{
		a.remove();
		a.addClass("inInv")
		custoalert("You have picked up a " + a.attr("id"));
		$("#inventory").append(a);
		
		//touched is a variable created to dodge the mutiple type output of the touching function
		//writen to by the touching function
		//is the last object to be identiied as touched
		console.log(touched[0].classList);
		if (touched[0].classList.contains("holdable"))
		{
			//for whatever reason, jquery constructs its own object type.
			//elem[0] is the eseast way to parse the element object from the jquery object.
			var itemHeld = touched[0];
			hold(itemHeld);
		}
	}
	return a;
}
var animate = function()
{
	requestAnimationFrame(animate);
    //check to see if the inventory is toggled by seeing if there is a bluf filter.
	if(!($("#game_elements").hasClass("blurFilter")))
	{
		moving();
		togglecave();
		if(key.space)
		{
			swingSword();
        }
	}
	pickupitem();
	count_frames();
}
$(document).ready(function()
{
	terrain = makeElements();
	hideInventory();
	animate();

});

$(document).on('keydown',function(evt)
{
	if(evt.keyCode == 17)
	{
		toggleInventory();
	}
});
