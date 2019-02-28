//spawn the test bee
//enem1 = new entity(50,50,50,50,"url(sprites/bee.png)",[],"test",0);enem1.spawn();
//test move
//enem1.move([90],[100],700);
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
        this.element.style.backgroundImage = url;
    }
    this.spawn = function()
    {
         document.getElementById("npcs").append(this.element);
         this.update();
    }
    this.move = function(rotarr, distarr, speed)
    {
        var rotDist = rotarr[0],
        rotRate = rotarr[1],
        dist = distarr[0],
        rate = distarr[1];

        const reps = rotarr.length;
        var currentVals = get_aspects(this.element);
        var currentLeft = currentVals.left;
        var currentTop = currentVals.top;
        //upate the orientatoin property
        this.orintation = parseInt(this.element.style.transform.replace("rotate(", "").replace("deg)", ""));

        var rotAmm = rotarr.length;
        var distAmm = distarr.lenght;

        for (var r = 0; r < reps; r++)
        {
              //execute rotarr[r]
              this.orintation += rotarr[r];
              this.element.style.transform = "rotate(" + this.orintation % 360 + "deg)";

              //execute disarr[r]
              var xdist = Math.cos(this.orintation) * distarr[r];
              var ydist = Math.sin(this.orintation) * distarr[r];
              this.element.animate({
                  left: "+=" + xdist,
                  top: "+=" + ydist
              }, speed, function() {
                    clog("Animation complete.");
              });

        }
        if (distAmm != rotAmm)//the number of linear motions requested is greater than the number of
        {
            //execute distarr[distAmm]
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
