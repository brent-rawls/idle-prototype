var mana = {
    name: "mana",
    amt: 0,
    cap: 100,
    perSecond: 0,
    residue: 0,
}
var wood = {
    name: "wood",
    amt: 0,
    cap: 20,
    perSecond: 0,
    inForest: 10,
    residue: 0,
}
var stone = {
    amt: 0,
    cap: 0,
    residue: 0,
}
var wisdom = {
    amt: 0,
    cap: 0,
    residue: 0,
}
var research = {
    amt: 0,
    cap: 0,
    residue: 0,
}

function clickGatherWood() {
    if (wood.inForest > 0) {
        wood.inForest--;
        gainResource(wood, 1);
    }
    if(wood.inForest <= 0){
        addMessage("No more wood to gather.");
        document.getElementById("clickGatherWood").classList.add("hidden");
    }
}

//redo this, make buildings into objects, make costs into arrays
function clickBuildCottage() {
    if (wood.amt < 5) {
        addMessage("You'll need more wood to keep the elements out.");
    }
    else {
        spendResource(wood, 5);
        addMessage("A cozy place to stay, for now.");
        document.getElementById("buildCottage").classList.add("hidden");
        var newDiv = document.createElement("div");
        newDiv.id = "cottage";
        newDiv.className = "cottage class";
        document.getElementById("buildingsList").appendChild(newDiv);
        newDiv.innerHTML = "this is your new cottage";
    }
}



function gainResource(resource, qty) {
    resource.amt += qty;
    if(resource.cap > 0 && resource.amt > resource.cap) resource.amt = resource.cap;
    document.getElementById(resource.name).innerHTML = resource.name + ": " + resource.amt + "/" + resource.cap;
    //document.getElementById(resource.name).innerHTML = "${resource.name}: ${resource.amt}/${resource.cap}";
}
function spendResource(resource, qty) {
    resource.amt -= qty;
    if(resource.cap < 0) resource.amt = 0;
    document.getElementById(resource.name).innerHTML = resource.name + ": " + resource.amt + "/" + resource.cap;
    //document.getElementById(resource.name).innerHTML = "${resource.name}: ${resource.amt}/${resource.cap}";
}



//messaging
function addMessage(text) {
    var msg = document.createElement("DIV");
    msg.innerHTML = text;
    document.getElementById("messages").prepend(msg);
}

// this is for passive gathering and float values (e.g. 0.1 resource/sec)
function gradualGainResource(resource) {
    resource.residue += (resource.perSecond);  //add temp "while concentrating" value here
    nearestInt = Math.floor(resource.residue);
    if(nearestInt > 0){
        resource.residue -= nearestInt;
        gainResource(resource, nearestInt);
    }
}

// per-second events
setInterval(passiveGathering, 1000);

function passiveGathering() {
    gradualGainResource(mana);
    gradualGainResource(wood);
}

// save/load/reset/initialize
function resetAll(){}