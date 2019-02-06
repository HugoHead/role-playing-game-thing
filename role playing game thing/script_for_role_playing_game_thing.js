var frame_counter=0;
var sprite_position = 0;
var terrain;
var state = true;
$( function() {
    $( "#bar" ).on( "click", function() {
      if ( state ) {
        $("#slider" ).animate({
          left: "75px"
        }, 1000 );
      } else {
        $("#slider" ).animate({
          left: "0"
        }, 1000 );
      }
      state = !state;
    });
} );
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

function custoalert(message)
{
	var milliseconds = (new Date).getTime();
	$("body").append('<div ID="talkingguy" data-num="'+milliseconds+'"></div>');
	$("#talkingguy[data-num='"+milliseconds+"']").append("<p>"+message+"</p>");
	setTimeout(function()
	{
		$("#talkingguy[data-num='"+milliseconds+"']").hide(500,function(){$("#talkingguy[data-num='"+milliseconds+"']").remove()});
	}
	, 2000);
}
function talk(check)
{
	var weirdoscript = new Array();
		weirdoscript[0]= "weirdo: Good'ay person,<br> what yo' name";
		weirdoscript[1]= "weirdo: I am very hairy";
		weirdoscript[2]= "weirdo: I need conditioner";
		weirdoscript[3]= "weirdo: There is only one <br>guy with conditioner";
		weirdoscript[4]= "weirdo: He'll trade a square<br> and a box for conditioner";
		weirdoscript[5]= "weirdo: Could you help me";
	if(check)
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

	if(sprite_position<7 && frame_counter%10===0)
	{
		sprite_position++;
	}
	else if(frame_counter%10===0)
	{
		sprite_position=0;
	}
}
function togglecave()
{
	 if(touching("#you","#cave"))
		{
			$("#cave").css("background-color","rgba(20,20,20,0.4)");
		}
	else
		{
			$("#cave").css("background-color","green");
		}

}

function moving()
{
	var up
	var down
	var left
	var right
	if(state)
	{
		up = key.up
		down = key.down
		left = key.left
		right = key.right
	}
	else
	{
		up = key.w
		down = key.s
		left = key.a
		right = key.d	
	}
	if(up)
	{
		move2('top',-5,'#you');
		move2('top',-5,'#shadow');
		$('#you').css('transform','rotate(180deg)');
		change_sprite();
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
			{
				talk(true);
			}

			move2('top',5,'#you');
			move2('top',5,'#shadow');
		}
		if(touching("#shadow","#top"))
		{
			move2('top',5,'#game_elements*');
			move2('top',5,'#shadow');
			// move2('top',5,'#you')
		}
	}
	if(down)
	{
		move2('top',5,'#you');
		move2('top',5,'#shadow');
		$('#you').css('transform','rotate(0deg)');
		change_sprite();
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
			{
				talk(true);
			}
			move2('top',-5,'#you');
			move2('top',-5,'#shadow');
		}
		if(touching("#shadow","#bottom"))
		{
			move2('top',-5,'#game_elements*');
			move2('top',-5,'#shadow');
			// move2('top',-5,'#you')
		}
	}
	if(left)
	{
		move2('left',-5,'#you')
		move2('left',-5,'#shadow')
		$('#you').css('transform','rotate(90deg)')
		change_sprite()
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
			{
				talk(true);
			}
			move2('left',5,'#you');
			move2('left',5,'#shadow');
		}
		if(touching("#shadow","#left"))
		{
			move2('left',5,'#game_elements*');
			move2('left',5,'#shadow');
			// move2('left',5,'#you')
		}
	}
	if(right)
	{
		move2('left',5,'#you');
		move2('left',5,'#shadow');
		$('#you').css('transform','rotate(270deg)');
		change_sprite();
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
			{
				talk(true);
			}
			move2('left',-5,'#you');
			move2('left',-5,'#shadow');
		}
		if(touching("#shadow","#right"))
		{
			move2('left',-5,'#game_elements*');
			move2('left',-5,'#shadow')
			// move2('left',-5,'#you')
		}
	}

}
function toggleInventory()
{
	if($("#game_elements").hasClass("blurFilter"))
	{
		$("#game_elements").removeClass("blurFilter");
		$("#inventory").hide();
	}
	else
	{
		$("#game_elements").addClass("blurFilter");
		$("#inventory").show();
	}
}
function hideInventory()
{
	$("#inventory").hide();
}
var itemHeld;
function hold() 
{
	//get all css rules applyed to the itemHeld
	var style = window.getComputedStyle(itemHeld);
	//grab the backgroundImage
	var image = style.backgroundImage;
	
	var shadow = document.getElementById("shadow");
	//try to make the shadow div visable so we can give it a backgrondImage
	shadow.style.backgroundColor = "transparant";
	shadow.style.opacity = "1";
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
			itemHeld = touched[0];
			hold();
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
	}
	pickupitem();
	count_frames();
}
function makeElements()
{
	var terain1 = new componet(384, 192, 700, 99, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain2 = new componet(384, 192, 1150, 300, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain3 = new componet(384, 169, 350, 372, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain4 = new componet(384, 168, 700, 373, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain5 = new componet(335, 192, 311, 246, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain6 = new componet(384, 192, 404, 732, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain7 = new componet(384, 192, 1149, 545, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain8 = new componet(384, 192, 766, 595, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain9 = new componet(384, 195, 174, 540, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain10 = new componet(384, 192, 337, -6, "green", $("#game_elements"), ["darn_obstacle"]);
    return [terain1,terain2,terain3,terain4,terain5,terain6,terain7,terain8,terain9,terain10];
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
