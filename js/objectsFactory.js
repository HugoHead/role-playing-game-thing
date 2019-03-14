function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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

            //execute disarr[r]
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
	this.moveAt = function(object, speed)
	{
		//a list of the places that could potentially be incuded in the route.
		var checkSpots = [];

		//To assemble an array of spots to check, we have to divide the entire space into boxes the size of the thing pathfinding.
		//It will be a list of upperLeft corners, in the for [top, left]
		//more information need not be gathered, as the other four corners can be calculated
		var corrners = [];

		//the location on the diagonal dimension that we are acting upon.
		var actingLayer = 0;

		//we know that (0,0) will always be a part of the array.
		corners.push([0,0]);
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
		corners.push([this.width, 0]);
		corners.push([0, this.height]);
		corners.push([this.width, this.height]);
		actingLayer = 2;

		//layers left the work with.
		var layersIncomplete = boardSize - actingLayer;

		var numberOfCorrnersThisLayer;

		for (layersIncomplete = boardSize; layersIncomplete > 0; layersIncomplete--)
		{
			actingLayer = boardSize - actingLayer;
			numberOfCorrnersThisLayer = 2 * actingLayer + 1;
			//for (){}
		}
	}
	this.pathfind = async function(smarts, speed)
	{
        //before we do any pathfinding, we should find all the darn_obstacles that are likly to matter
        var game_elementArray = document.getElementsByClassName('darn_obstacle');
        const game_elementsInWorld = game_elementArray.length, obstaclesInRange = [];
        const boxWidth = speed * smarts * 2, boxTop = parseInt(this.y, 10) - (speed * smarts), boxLeft = parseInt(this.x, 10) - (speed * smarts);
        for (var i = 0; i < game_elementsInWorld; i++)
        {
            if (syntheticTouching(jQuery(game_elementArray[i]), [boxLeft, boxTop], [boxWidth, boxWidth]))
            {
                obstaclesInRange.push(game_elementArray[i]);
            }
        }
        
        var okspots = [[parseInt(this.x, 10),parseInt(this.y, 10)]];
        var checknow = [[parseInt(this.x, 10),parseInt(this.y, 10)]];
        var checknext = [], booltouching = false, arrayLength;
        for (var g = 0; g < smarts; g++)
        {
            for (var j = 0; j < checknow.length; j++)
            {
				console.log("j"+j);
                for (var h = 0; h < 8; h++)
                {
                    booltouching = false;
                    var widthcheck = parseInt(this.width, 10);
                    var heightcheck = parseInt(this.height, 10);
                    console.log(widthcheck + " " + heightcheck);
                    var xcheck = (Math.cos(h * 45 * (Math.PI / 180)) * speed) + checknow[j][0];
                    var ycheck = (Math.sin(h * 45 * (Math.PI / 180)) * speed) + checknow[j][1];

                    if (!okspots.includes([xcheck, ycheck])) {
                       var i = 0;
                       //see if the checkpoints are touching member of the 'darn_obstacle' css class
                       arrayLength = obstaclesInRange.length;
                       for (i = 0; i < arrayLength; i++)
                       {
                           console.log(i);
                           booltouching = false;
                           //attempt to catch the case where obstaclesInRange[i] is the entity itself
                           if (game_elementArray[i] == this.element)
                           {
                               booltouching = false;
                           }
                           //the regular case
                           else if (syntheticTouching(jQuery(obstaclesInRange[i]), [xcheck, ycheck], [widthcheck, heightcheck]))
                           {
                               booltouching = true;
                               break;
                               console.log("The cool case");
                           }
                       }
                       if (booltouching)
                       {
                           console.error("fail");
                       }
                       else
                       {
                           console.log("Not Touching")
                           var quad = new componet(widthcheck, heightcheck, xcheck, ycheck, "red", $("#game_elements"), []);
                           okspots.push([xcheck, ycheck]);
                           checknext.push([xcheck, ycheck]);
                       }
                   }
                }
            }
            checknow = [];
            checknow = checknext;
            checknext = [];
        }
	}
    this.update();
    /*
    *methods needed:
    *Die
    *Change image/color
    *move (inpendent of player/toards player)
    *input/output damage
    *check for death
    *Attack
    *spawn
    *
    */
}
