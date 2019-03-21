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
			document.getElementById(this.title).remove();
		}
	}
	this.pathfind = async function(smarts, speed)
	{
        //before we do any pathfinding, we should find all the darn_obstacles that are likly to matter
        var game_elementArray = document.getElementsByClassName('darn_obstacle');
        var game_elementsInWorld = game_elementArray.length;
        const boxWidth = speed * smarts * 2 + speed, boxTop = parseInt(this.y, 10) - (speed * smarts), boxLeft = parseInt(this.x, 10) - (speed * smarts);
        var obstaclesWeCareAbout= [];
        for (var i = 0; i < game_elementsInWorld; i++)
        {
            if (syntheticTouching(jQuery(game_elementArray[i]), [boxLeft, boxTop], [boxWidth, boxWidth]))
            {
                obstaclesWeCareAbout.push(game_elementArray[i]);
            }
        }
        var idcounter = 1;
        var okspots = [[parseInt(this.x, 10),parseInt(this.y, 10),0]];
        var checknow = [[parseInt(this.x, 10),parseInt(this.y, 10),0]];
        var checknext = [], booltouching = false, arrayLength;
        for (var g = 0; g < smarts; g++)
        {
            for (var j = 0; j < checknow.length; j++)
            {
                for (var h = 0; h < 8; h++)
                {
                    var previusID = checknow[j][2]
                    booltouching = false;
                    var widthcheck = parseInt(this.width, 10);
                    var heightcheck = parseInt(this.height, 10);
                    var xcheck = (Math.cos(h * 45 * (Math.PI / 180)) * speed) + checknow[j][0];
                    var ycheck = (Math.sin(h * 45 * (Math.PI / 180)) * speed) + checknow[j][1];

                    //if (!okspots.includes([xcheck, ycheck])) {
                       var i = 0;
                       //see if the checkpoints are touching member of the 'darn_obstacle' css class
                       arrayLength = obstaclesWeCareAbout.length;
                       for (i = 0; i < arrayLength; i++)
                       {
                           booltouching = false;
                           //attempt to catch the case where game_elementArray[i] is the entity itself
                           if (obstaclesWeCareAbout[i] == this.element)
                           {
                               booltouching = false;
                           }
                           //the regular case
                           else if (syntheticTouching(jQuery(obstaclesWeCareAbout[i]), [xcheck, ycheck], [widthcheck, heightcheck]))
                           {
                               booltouching = true;
                               break;
                           }
                       }
                    if (!booltouching){
                           var quad = new componet(widthcheck, heightcheck, xcheck, ycheck, "blue", $("#game_elements"), ["killme"]);
                           okspots.push([xcheck, ycheck, idcounter, previusID, disT(xcheck, ycheck, get_px("left", "#you"), get_px("top", "#you")), g*j*h]);
                           checknext.push([xcheck, ycheck, idcounter]);
                           idcounter++;
                    }
                }
            }
            checknow = [];
            checknow = checknext;
            checknext = [];
        }//this is the end of the ourter-most for loop

        var okspotsLength = okspots.length;
        var okspotsDistFromPlayer = [disT(parseInt(this.x), parseInt(this.y), get_px("left", "#you"), get_px("top", "#you"))];
        //add the distance from the player of each index of the okspots array to another array so we can access them later.
        for (i = 1; i < okspotsLength; i++) {//we start on index one INTENTIONALY so as to avoid accessing index 0 DO NOT CHANGE THIS
            okspotsDistFromPlayer.push(okspots[i][4]);
        }
		     //we have created an array of all of the distances of all the okspots, now we need to find the closest to the player
        var closestDistToPlayer = Math.min(...okspotsDistFromPlayer);
		    //now, in order to begin even thinking about finding the okspot closest to the player, we need to find the index of the closest distance to the player
        var indexOfClosestDistToPlayer = okspotsDistFromPlayer.indexOf(closestDistToPlayer);
         //then just index okspots on index found in the previos line.
        var closestOkSpotToPlayer = okspots[indexOfClosestDistToPlayer];
		    //draw this okspot in purple
        var quad2 = new componet(parseInt(this.width,10), parseInt(this.height,10), okspots[indexOfClosestDistToPlayer][0], okspots[indexOfClosestDistToPlayer][1], "rebeccaPurple", $("#npcs"), ["killme"]);
		    //ensure that we can see the closest spot to the player (it may be concealed by another componet)
		    quad2.element.style.zIndex = "5";

        var path = [];
		    //path.push(new componet(parseInt(this.width,10), parseInt(this.height,10), okspots[indexOfClosestDistToPlayer][2], okspots[indexOfClosestDistToPlayer][3], "red", $("#npcs")));
        //path[0].element.style.zIndex = "5";

        var idtraceback = [indexOfClosestDistToPlayer],
        idtochecknext = okspots[indexOfClosestDistToPlayer][3],
        spot;

        for(var y = 0; y < smarts; y++)
        {
           spot = getCol(okspots, 2).indexOf(idtochecknext);
           console.log(spot);
           path.push(new componet(parseInt(this.width,10), parseInt(this.height,10), okspots[spot][0], okspots[spot][1], "red", $("#npcs"), ["killme"]));
           idtraceback.push(spot);
           idtochecknext = okspots[spot][3];
           path[y].element.style.zIndex = "5";
           if(spot == 0)
           {
             y = smarts;
           }
        }
        //clog(idtraceback);
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
