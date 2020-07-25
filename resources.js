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
    inForest: 1000,
    gatheredFromForest: 0,
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
    resElement.querySelector(".display").innerHTML = resource.name + ": " + resource.amt + "/" + resource.cap;
}


function payCost(costArray) {
    if (costArray.length % 2 != 0) {
       //error, cost array didn't have an even number of elements
       return false;  
    } 
    for (let i = 0; i < costArray.length; i += 2) {
        if (costArray[i].amt < costArray[i + 1]) {
            //not enough of this resource; can't afford purchase
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
    resource.residue += (resource.perSecond);  //add temp "while concentrating" value here
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
