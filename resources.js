var mana = {
    name: "mana",
    amt: 0,
    cap: 100,
    perSecond: 0,
    residue: 0,
    category: "personal",
    visible: false,
}
var wood = {
    name: "wood",
    amt: 0,
    cap: 20,
    perSecond: 0,
    inForest: 1000,
    gatheredFromForest: 0,
    residue: 0,
    category: "construction",
    visible: false,
}
var stone = {
    name: "stone",
    amt: 0,
    cap: 0,
    residue: 0,
    category: "construction",
    visible: false,
}
var wisdom = {
    name: "wisdom",
    amt: 0,
    cap: 0,
    residue: 0,
    category: "personal",
    visible: false,
}
var research = {
    name: "research",    
    amt: 0,
    cap: 0,
    residue: 0,
    category: "personal",
    visible: false,
}
var herbs = {
    name: "herbs",
    amt: 0,
    cap: 0,
    residue: 0,
    category: "plants",
    visible: false,
}
var faeberry = {
    name: "fae-berry",
    amt: 0,
    cap: 0,
    residue: 0,
    category: "plants",
    visible: false,
}


function gatherWood() {
    if (wood.inForest > 0) {
        wood.inForest--;
        gainResource(wood, 1);
        wood.gatheredFromForest++;
        if (wood.gatheredFromForest == 3) {
            addMessage("Better start thinking about shelter.");
            createBuildingButton(cottage);
        }
    }
    if(wood.inForest <= 0){
        addMessage("No more wood to gather.");
        document.getElementById("clickGatherWood").classList.add("hidden");
    }
    document.querySelector("#wood").classList.remove("hidden");
}


function gainResource(resource, qty) {
    if (resource.visible == false) {
        createNewResource(resource);
        resource.visible = true;
}
    resource.amt += qty;
    if(resource.cap > 0 && resource.amt > resource.cap) resource.amt = resource.cap;
    updateResourceDisplay(resource);
}
function spendResource(resource, qty) {
    resource.amt -= qty;
    if(resource.cap < 0) resource.amt = 0;
    updateResourceDisplay(resource);
}
function updateResourceDisplay(resource) {
    var resElement = document.getElementById(resource.name);
    resElement.classList.remove("hidden");
    if (resource.cap > 0) {
        resElement.querySelector(".display").innerHTML = resource.name + ": " + resource.amt + "/" + resource.cap;
    } else {
        resElement.querySelector(".display").innerHTML = resource.name + ": " + resource.amt;
    }

}
function updateResourceTooltip(resource) {
    var resElement = document.getElementById(resource.name);
    resElement.querySelector(".tooltip").innerHTML = resource.name + ": " + resource.amt + "/" + resource.cap;
}
function createNewResource(resource){
    var parentResource = document.getElementById(resource.category);
    var newResource = document.createElement("div");
    newResource.id = resource.name;
    newResource.classList.add("resource")
    newResource.classList.add("hasTooltip");
    parentResource.appendChild(newResource);
    //attach a display, then update it
    var newDisplay = document.createElement("span");
    newDisplay.classList.add("display");
    newResource.appendChild(newDisplay);
    updateResourceDisplay(resource);
    // attach a tooltip and event listener
    var newTooltip = document.createElement("span");
    newTooltip.classList.add("tooltip");
    newResource.appendChild(newTooltip);
    newResource.addEventListener("mouseover", function(event) {
        updateResourceTooltip(resource);
    });
    
}


function payCost(costArray) {
    if (costArray.length % 2 != 0) {
       // error, cost array didn't have an even number of elements
       return false;  
    } 
    for (let i = 0; i < costArray.length; i += 2) {
        if (costArray[i].amt < costArray[i + 1]) {
            // not enough of this resource; can't afford purchase
            return false;
        }
    }
    for (let i = 0; i < costArray.length; i += 2) {
        spendResource(costArray[i], costArray[i + 1]);
    }
    return true;
}

// this is for passive gathering and float values (e.g. 0.1 resource/sec)
function gradualGainResource(resource) {
    resource.residue += (resource.perSecond);  // add temp "while concentrating" value here
    nearestInt = Math.floor(resource.residue);
    if(nearestInt > 0){
        resource.residue -= nearestInt;
        gainResource(resource, nearestInt);
    }
}

// THE FOREST
//-----------------------------------------------------------
function tapForestLine() {
    // TODO: show manaflow
    mana.perSecond += 1;
    document.querySelector("#tapForestLine").classList.add("hidden");
}





// ADD EVENT LISTENERS TO INITIAL BUTTONS
window.onload = function() {
    document.querySelector("#clickGatherWood").addEventListener("click", gatherWood);
    document.querySelector("#tapForestLine").addEventListener("click", tapForestLine);    
};

// per-second events
setInterval(passiveGathering, 1000);

function passiveGathering() {
    gradualGainResource(mana);
    gradualGainResource(wood);
}
