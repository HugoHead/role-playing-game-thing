var frame_counter=0
var sprite_position = 0
var weirdoscript = new Array();
	weirdoscript[0]= "weirdo: Good'ay person,<br> what yo' name"
	weirdoscript[1]= "weirdo: I am very hairy"
	weirdoscript[2]= "weirdo: I need conditioner"
	weirdoscript[3]= "weirdo: There is only one <br>guy with conditioner"
	weirdoscript[4]= "weirdo: He'll trade a square<br> and a box for conditioner"
	weirdoscript[5]= "weirdo: Could you help me"
function count_frames()
{
	if(frame_counter<59)
	{
		frame_counter++
	}
	else
	{
		frame_counter=0
	}
}
function custoalert(message)
{
	var milliseconds = (new Date).getTime();
	$("body").append('<div ID="talkingguy" data-num="'+milliseconds+'"></div>')
	$("#talkingguy[data-num='"+milliseconds+"']").append("<p>"+message+"</p>")
	setTimeout(function()
	{
		$("#talkingguy[data-num='"+milliseconds+"']").hide(500,function(){$("#talkingguy[data-num='"+milliseconds+"']").remove()})
	}
	,2000)
}
// function conversation(talker)
// {
	// $("body").append('<div ID="'+talker+'guy" ></div>')
	// var line = 0
		// var b = touching()
	// if(b)
	// {}
// }
function change_sprite()
{
	if(sprite_position<4)
	{
		$('#you').css('backgroundPosition',sprite_position*-48+'px 0px')
	}
	else
	{
		$('#you').css('backgroundPosition',(sprite_position-4)*-48+'px -48px')
	}
	
	if(sprite_position<7 && frame_counter%10===0)
	{
		sprite_position++
	}
	else if(frame_counter%10===0)
	{
		sprite_position=0
	}
}
function moving()
{
	//move foward
	//if you are touching darn_obstacle
	//move back
	if(key.up)
	{
		move2('top',-5,'#you')
		$('#you').css('transform','rotate(180deg)')
		change_sprite()
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
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
			move2('top',5,'#you')
		}
		if(touching("#you","#top"))
		{
			move2('top',5,'#game_elements*')
			// move2('top',5,'#you')
		}
	}
	if(key.down)
	{
		move2('top',5,'#you')
		$('#you').css('transform','rotate(0deg)')
		change_sprite()
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
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
			move2('top',-5,'#you')
		}
		if(touching("#you","#bottom"))
		{
			move2('top',-5,'#game_elements*')
			// move2('top',-5,'#you')
		}
	}
	if(key.left)
	{
		move2('left',-5,'#you')
		$('#you').css('transform','rotate(90deg)')
		change_sprite()
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
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
			move2('left',5,'#you')
		}
		if(touching("#you","#left"))
		{
			move2('left',5,'#game_elements*')
			// move2('left',5,'#you')
		}
	}
	if(key.right)
	{
		move2('left',5,'#you')
		$('#you').css('transform','rotate(270deg)')
		change_sprite()
		if(touching("#you",".darn_obstacle"))
		{
			if(touching("#you","#weirdo"))
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
			move2('left',-5,'#you')
		}
		if(touching("#you","#right"))
		{
			move2('left',-5,'#game_elements*')
			// move2('left',-5,'#you')
		}
	}

}
function toggleInventory()
{
	if($("#game_elements").hasClass("blurFilter"))
	{
		$("#game_elements").removeClass("blurFilter");
		$("#inventory").hide()
	}
	else
	{
		$("#game_elements").addClass("blurFilter");
		$("#inventory").show();
	}
}
function hideInventory()
{
	$("#inventory").hide()
}
function pickupitem()
{
	var a = touching("#you","#game_elements .item");
	//console.log(a)
	if(a)
	{
		a.remove()
		custoalert("You have picked up a "+a.attr("id"));
		$("#inventory").append(a);
	}
}
var animate = function()
{
	requestAnimationFrame(animate)
	if(!($("#game_elements").hasClass("blurFilter")))
	{
		moving()
	}
	pickupitem()
	count_frames()
}
$(document).ready(function()
{
	hideInventory()
	animate()
	
});

$(document).on('keydown',function(evt)
{
	if(evt.keyCode == 17)
	{
		toggleInventory()
	}
	
})




