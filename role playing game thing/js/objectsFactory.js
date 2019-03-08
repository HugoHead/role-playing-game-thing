function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var boardSize = 7000000000;
function componet(width, height, x, y, colorOrURL, parant, classes, id)
{
    this.width = width.toString(10) + "px";
    this.height = height.toString(10) + "px";
    this.x = x.toString(10) + "px";
    this.y = y.toString(10) + "px";
    this.colorOrURL = colorOrURL;
    this.classes = classes;
    this.parant = parant;
    this.element;this.id;
    this.update = function()
    {
        this.element = document.createElement("DIV");
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        this.element.style.top = this.y;
        this.element.style.left = this.x;
        if (this.classes != undefined)
        {
            var length = classes.length;
            for (var i = 0; i < length; i++)
            {
                this.element.classList.add(classes[i]);
            }
        }
        if (this.id != undefined)
        {
            this.element.setAttribute("id", this.id);
        }
        this.parant.append(this.element);
        if (this.colorOrURL.search("."))//the colorOrUrl is a url
        {
            this.element.style.backgroundImage = colorOrURL;
        }
        else
        {
            this.element.style.backgroundColor = this.colorOrURL;
        }
    }
    this.update();
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function entity (width, height, x, y, url, classes, type, health)
{
    this.width = width.toString(10) + "px";
    this.height = height.toString(10) + "px";
    this.x = x.toString(10) + "px";
    this.y = y.toString(10) + "px";
    this.url = url;
    this.type = type;
    this.element;
	this.health = health;
    this.orintation;
    this.front = 1;
    this.element = document.createElement("DIV");
	this.lifeStatus = true;
	this.deathImage = "/sprites/splat.png";
    this.update = function()
    {
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        this.element.style.top = this.y;
        this.element.style.left = this.x;
        if (this.classes != undefined)
        {
            var length = classes.length;
            for (var i = 0; i < length; i++)
            {
                this.element.classList.add(classes[i]);
            }
        }
        if (this.id != undefined)
        {
            this.element.setAttribute("id", this.id);
        }
        this.element.style.backgroundImage = url;
        this.element.style.transform = "rotate(0deg)";
    }
    this.spawn = function(title)
    {
         this.element.id = title;
         this.element.classList.add("darn_obstacle")
         document.getElementById("npcs").append(this.element);
         this.title = title;
         this.element = document.getElementById(title);
         this.update();
    }
    this.move = async function(rotarr, distarr, speed)
    {
        var element = document.getElementById(this.title);
        (element);
        element.style.transition = speed + "ms";
        var rotDist = rotarr[0],
        rotRate = rotarr[1],
        dist = distarr[0],
        rate = distarr[1];

        const reps = rotarr.length;
        
        var currentVals = get_aspects(this.element);
        var currentLeft = currentVals.left;
        var currentTop = currentVals.top;
        
        //update the orientation property
        this.orintation = parseInt(element.style.transform.replace("rotate(", "").replace("deg)", ""));

        var rotAmm = rotarr.length;
        var distAmm = distarr.lenght;
        var left,top;
        for (var r = 0; r < reps; r++)
        {
            //execute rotarr[r]
            this.orintation += rotarr[r];
            this.orintation = this.orintation % 360;
            if (this.orintation > 180)
            {
              this.orintation = -1 * (this.orintation - 180);
            }

            element.style.transform = "rotate(" + this.orintation + "deg)";

            //wait for the rotation to finish
            await sleep(speed);
            top = parseInt(element.style.top, 10);
            left = parseInt(element.style.left, 10);

            //execute distarr[r]
            var xdist = Math.cos(this.orintation * Math.PI / 180) * distarr[r];
            var ydist = Math.sin(this.orintation * Math.PI / 180) * distarr[r];

            var xchnage = xdist + left;
            element.style.left = xdist + left + "px";
            element.style.top = ydist + top + "px";
            await sleep(speed);
        }
    }
	this.damage = function (amm)
	{
		this.health -= amm;
		this.checkForDeath();
	}
	this.checkForDeath = function()
	{
		if (this.health < 0)
		{
			console.log("Here");
			document.getElementById(this.title).remove();
		}
	}
	this.gridField = [];
	this.initNewGridField = function()
	{
		var width = parseInt(this.width),
		height = parseInt(this.height);
		
		//a list of the places that could potentially be induced in the route. 
		var checkSpots = [];
		
		//To assemble an array of spots to check, we have to divide the entire space into boxes the size of the thing pathfinding.
		//It will be a list of upperLeft corners, in the for [top, left]
		//more information need not be gathered, as the other four corners can be calculated
		var corrners = [];
		
		//the location on the diagonal dimension that we are acting upon. 
		var actingLayer = 0;
		
		//we know that (0,0) will always be a part of the array.
		corrners.push([0,0]);
		actingLayer = 1;
		
		//To get the remaining points, some mental contortion is required.
		/*
		. represents the first "layer"
		* the second
		x the third
		
		. * x
		* * x
		x x x 
		
		As you can see, each time we go the next "layer", the number of additional coroners increases by two.
		This means that given the total number of layers on the board, we can calculate the position of each corner.
		*/
		
		//just as an example, the second layer is created like this.
		corrners.push([width, 0]);
		corrners.push([0, height]);
		corrners.push([width, height]);
		actingLayer = 2;
		
		//layers left the work with.
		var layersIncomplete = boardSize - actingLayer;
		
		var numberOfCorrnersThisLayer, colmnSize; 
		
		for (layersIncomplete = boardSize - actingLayer; layersIncomplete > 0; layersIncomplete--)
		{
			numberOfCorrnersThisLayer = (2 * actingLayer);
			
			//add the column exuding the diagonal point
			for (var actingDot = 0; actingDot < (numberOfCorrnersThisLayer--); actingDot++)
			{
				corrners.push([width * (actingLayer), actingDot * height]);
			}
			
			//now add the row.	
			for (var actingDot = 0; actingDot < (numberOfCorrnersThisLayer--); actingDot++)
			{
				corrners.push([width * (actingDot), actingLayer * height]);
			}
			
			//and the diagonal piece
			corrners.push([width * (actingLayer), height * (actingLayer)]);
			
			actingLayer++;
		 }
		this.gridField = corrners;
	}
	this.moveAt = function(object, speed)
	{
		var placholder;
	}
    this.update();
    /*
    *methods needed:
    *Die
    *Change image/color
    *move (independent of player/towards player)
    *input/output damage
    *check for death
    *Attack
    *spawn
    *
    */
}