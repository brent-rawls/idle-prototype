var cottage = {
    name: "cottage", 
    cost: [wood, 5],
    buildSuccess: "a cozy cottage in the woods",
    buildFailure: "you'll need more wood to keep the elements at bay",
    buildButtonId: "buildCottage",
}
var library = {
    name: "library", 
    cost: [wood, 5],
    buildSuccess: "time to fill this place with books",
    buildFailure: "not enough resources",
    buildButtonId: "buildLibrary",
}
var shed = {
    name: "shed", 
    cost: [wood, 5],
    buildSuccess: "still time to put supplies away before the frost",
    buildFailure: "not enough resources",
    buildButtonId: "buildShed",
}
var garden = {
    name: "garden", 
    cost: [wood, 5, mana, 10],
    buildSuccess: "magic to coax life from the earth",
    buildFailure: "not enough resources",
    buildButtonId: "buildGarden",
}
var workshop = {
    name: "workshop", 
    cost: [wood, 5],
    buildSuccess: "busy hands are powerful spells",
    buildFailure: "not enough resources",
    buildButtonId: "buildWorkshop",
}


function unlockNewBuildings(old){
    switch(old){
        case(cottage):
            createBuildingButton(library);
            createBuildingButton(shed);
            createBuildingButton(garden);
            createBuildingButton(workshop);
            break;
        default: break;
    }
}


function createBuildingButton(building) {
    var newBuildingButton = document.createElement("div");
    newBuildingButton.id = building.buildButtonId;
    newBuildingButton.className = "buildingButton button";
    document.querySelector("#buildingMenu").appendChild(newBuildingButton);
    newBuildingButton.innerHTML = building.name;
    newBuildingButton.addEventListener("click", function(event) {
        buildBuilding(building);
    });
}

function createBuildingIndicator(building) {
    var newBuildingIndicator = document.createElement("div");
    newBuildingIndicator.id = building.buildingIndicatorId;
    newBuildingIndicator.className = "buildingIndicator button";
    document.querySelector("#buildingsList").appendChild(newBuildingIndicator);
    newBuildingIndicator.innerHTML = building.name;
}

function buildBuilding(building) {
    let canBuild = payCost(building.cost);
    if (canBuild == true) {
        addMessage(building.buildSuccess);
        document.getElementById(building.buildButtonId).classList.add("hidden");
        createBuildingIndicator(building);
        unlockNewBuildings(building);
    } else {
        addMessage(building.buildFailure);
    }
}
