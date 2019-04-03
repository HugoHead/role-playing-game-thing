var key = new Object();
var keysPressed = {};
window.onkeyup = function(e) { keysPressed[e.keyCode] = false; }
window.onkeydown = function(e) { keysPressed[e.keyCode] = true; }
function set_key(k,d)
{
	switch(k)
	{
		case 37: key['left'] = d;break;
        case 65: key['a'] = d;break;
		case 38: key['up'] = d;break;
        case 87: key['w'] = d;break;
		case 39: key['right'] = d;break;
        case 68: key['d'] = d;break;
		case 40: key['down'] = d;break;
        case 83: key['s'] = d;break;
		case 32: key['space'] = d;break;
		case 75: key['k'] = d;break;
		case 76: key['l'] = d;break;
		case 69: key['e'] = d;break;
        case 80: key['p'] = d;break;
	}
}
$(document).on('keydown',function(evt)
{
	set_key(evt.keyCode,true)
	
})

$(document).on('keyup',function(evt)
{
	set_key(evt.keyCode, false)
})