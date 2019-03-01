function rgbToHsl(r, g, b){
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if(max == min){
		h = s = 0; // achromatic
	}else{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return [h, s, l];
}
function rand(min,max)
{
	return (Math.floor(Math.random()*((max-min)+1))+min);
}
function clog(g)
{
	console.log(g);
}
function radians(degrees)
{
  return degrees * Math.PI / 180;
}
function degrees(angle) {
  return angle * (180 / Math.PI);
}
function getRotationDegrees(obj)
{
  var matrix = obj.css("-webkit-transform") ||
  obj.css("-moz-transform")    ||
  obj.css("-ms-transform")     ||
  obj.css("-o-transform")      ||
  obj.css("transform");
  if(matrix !== 'none') {
    var values = matrix.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  }
	else
	{
		var angle = 0;
	}
  return (angle < 0) ? angle +=360 : angle;
}

function get_aspects(ubject)
{
	var aspre = new Object();
		aspre['width'] = $(ubject).outerWidth();
		aspre['height'] = $(ubject).outerHeight();
		//aspre['deg'] = getRotationDegrees($(ubject))
		aspre['top'] = parseInt($(ubject).css('top')); + parseInt($(ubject).parent().css('top'));
		aspre['left'] = parseInt($(ubject).css('left')); + parseInt($(ubject).parent().css('left'));
		aspre['bottom'] = aspre['top']+aspre['height'];
		aspre['right'] = aspre['left']+aspre['width'];

	return aspre;
}

function outputAspects(object, aspect)
{
		var character = get_aspects(object);
		console.log(character[aspect]);

}

function isBetween(n, t, b)
{
	if(n <= t && n >= b)
	{
		return true;
	}
	else
	{
		return false;
	}
}
var touched = "none";
function touching(thing1, thing2)
{
	var isThereATouch = false;
	var thing1Aspects = get_aspects(thing1);

	$(thing2).each(function(){
		var bad = get_aspects(this);
		var hor = false;
		var ver = false;
		//if(blast['right']	>=bad['left'] 		&& blast['right']	<=bad['right'])
		if(isBetween(thing1Aspects['right'], bad['right'], bad['left']))
		{
			hor = true;
			//console.log('hor1')
		}
		if(isBetween(thing1Aspects['left'], bad['right'], bad['left']))
		{
			hor = true;
			//console.log('hor2')
		}
		if(isBetween(bad['right'], thing1Aspects['right'], thing1Aspects['left']))
		{
			hor = true;
			//console.log('hor3')
		}
		if(isBetween(bad['left'], thing1Aspects['right'], thing1Aspects['left']))
		{
			hor = true;
			//console.log('hor4')
		}

		if(isBetween(thing1Aspects['bottom'], bad['bottom'], bad['top']))
		{
			ver = true;
			//console.log('ver1')
		}
		if(isBetween(thing1Aspects['top'], bad['bottom'], bad['top']))
		{
			ver = true;
			//console.log('ver2')
		}
		if(isBetween(bad['bottom'], thing1Aspects['bottom'], thing1Aspects['top']))
		{
			ver = true;
			//console.log('ver3')
		}
		if(isBetween(bad['top'], thing1Aspects['bottom'], thing1Aspects['top']))
		{
			ver = true;
			//console.log('ver4')
		}
		
		if(hor && ver)
		{
			isThereATouch = $(this);
			touched = $(this);
		}
		else 
		{
			touched = "none";
		}
	});
	return isThereATouch;
}
function get_px(toporleft,guy)
{
	var oldval = $(guy).css(toporleft);
	var oldvalpx = parseInt(oldval);
	return oldvalpx;
}
function move(toporleft,speed,guy)
{
	var guyasp = get_aspects($(guy))
	var maxwidth=$(window).width()-guyasp['width'];
	var maxheight=$(window).height()-guyasp['height'];

	var oldvalpx = guyasp[toporleft];
	if(
		//CAN WE move up
		(toporleft == 'top' && speed < 0 && oldvalpx > 0) ||
		//CAN WE move down
		(toporleft == 'top' && speed > 0 && oldvalpx < maxheight) ||
		//CAN WE move left
		(toporleft == 'left' && speed < 0 && oldvalpx > 0) ||
		//CAN WE move right
		(toporleft == 'left' && speed > 0 && oldvalpx<maxwidth)
	)
	{
		$(guy).css(toporleft,(oldvalpx+speed)+'px')
	}
};
function move2(toporleft,speed,guy)
{
	var guyasp = get_aspects($(guy))
	var oldvalpx = guyasp[toporleft];
	$(guy).css(toporleft,(oldvalpx+speed)+'px')
};
