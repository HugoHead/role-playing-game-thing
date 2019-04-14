function makeElements()
{
	//componet(width, height, x, y, colorOrURL, parant, classes, id)
	var terain1 = new componet(484, 192, 600, 99, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain2 = new componet(387, 400, 1150, 200, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain3 = new componet(367, 168, 343, 373, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain4 = new componet(384, 168, 700, 373, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain5 = new componet(190, 500, 340, 255, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain6 = new componet(384, 192, 404, 732, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain7 = new componet(387, 192, 1150, 545, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain8 = new componet(384, 192, 766, 595, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain9 = new componet(384, 195, 174, 540, "green", $("#game_elements"), ["darn_obstacle"]);
	var terain10 = new componet(384, 192, 337, -6, "green", $("#game_elements"), ["darn_obstacle"]);
  var topBar = new componet(1074, 192, 10, -250, "green", $("#game_elements"), ["darn_obstacle", "topBar"]);
  var bottomBar = new componet(394, 10, 20, 914, "green", $("#game_elements"), ["darn_obstacle"]);
  var barThatPreventsEscapefromTheMerchantArea = new componet(192, 402, 1074, -269, "green", $("#game_elements"), ["darn_obstacle"])    ;
	var cave1 = new componet(635, 198, 449, 539, "green", $("#game_elements"), ["cave"]);
	var cave2 = new componet(363, 198, 721, -6, "green", $("#game_elements"), ["cave"]);
	//var chasm = new componet(200, 200, 30, 400, "darkgray", $("#game_elements"), ["chasm"], "chasm1");
	var chasm = new componet(200, 200, 30, 400, "darkgray", $("#game_elements"), ["chasm"], "chasm1");
	chasm.element.style.zIndex = -2;
    return [terain1,terain2,terain3,terain4,terain5,terain6,terain7,terain8,terain9,terain10,topBar,barThatPreventsEscapefromTheMerchantArea,cave1,cave2];
}
