// messaging
function addMessage(text) {
    var messages = document.querySelector("#messages");
    var msg = document.createElement("DIV");
    msg.innerHTML = text;
    messages.prepend(msg);
    var messageCount = messages.childElementCount;
    if (messageCount > 5) {
        messages.removeChild(messages.childNodes[5]);
    }
}



// save/load/reset/initialize
function resetAll(){}