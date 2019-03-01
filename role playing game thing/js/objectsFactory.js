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
    this.element;this.health;
    this.orintation;
    this.front = 1;
    this.element = document.createElement("DIV");
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
        console.log(element);
        element.style.transition = speed + "ms";
        var rotDist = rotarr[0],
        rotRate = rotarr[1],
        dist = distarr[0],
        rate = distarr[1];

        const reps = rotarr.length;
        
        var currentVals = get_aspects(this.element);
        var currentLeft = currentVals.left;
        var currentTop = currentVals.top;
        
        //upate the orientatoin property
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

            console.log(this.orintation);
            //execute disarr[r]
            var xdist = Math.cos(this.orintation * Math.PI / 180) * distarr[r];
            var ydist = Math.sin(this.orintation * Math.PI / 180) * distarr[r];

            console.log(xdist + " " + ydist);
            var xchnage = xdist + left;
            element.style.left = xdist + left + "px";
            element.style.top = ydist + top + "px";
            await sleep(speed)
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