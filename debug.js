document.onload = function(){
    createDebug();
}

function createDebug(building) {
    var debugButton = document.createElement("div");
    debugButton.id = "clickDebug";
    debugButton.className = "debug button";
    document.querySelector("#actions").appendChild(debugButton);
    debugButton.innerHTML = "DEBUG";
    debugButton.addEventListener("click", function(event) {
        clickDebug(building);
    });
}

function clickDebug() {
    console.log("thou art debugging");
    gainResource(mana, mana.cap);
    gainResource(wood, wood.cap);
}