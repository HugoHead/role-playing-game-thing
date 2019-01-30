var key = new Object();
function set_key(k,d)
{
	switch(k)
	{
		case 37: key['left'] = d;break;
		case 38: key['up'] = d;break;
		case 39: key['right'] = d;break;
		case 40: key['down'] = d;break;
		case 32: key['space'] = d;break;
		case 75: key['k'] = d;break;
		case 76: key['l'] = d;break;
		
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