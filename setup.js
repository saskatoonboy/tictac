
let stopObj = 0;
let stopStats = {
    d:undefined,
    v:undefined,
    a:undefined
}

class Settings {

    constructor() {
        this.earthGravity = true;
        this.friction = false;
        this.cAcceleration = false;
    }

}

settings = new Settings();

function earthGravity() {

    settings.earthGravity = !settings.earthGravity;

    if (settings.earthGravity) {
        earthGravityButton.html("Earth Gravity: Yes");
    } else {
        earthGravityButton.html("Earth Gravity: No");
    }

}

function friction() {

    settings.friction = !settings.friction;

    if (settings.friction) {
        frictionButton.html("Friction: Yes");
    } else {
        frictionButton.html("Friction: No");
    }

}

function simulate() {

  simulating = true;
  for (let setupItem of setupItems) {
    setupItem.hide();
  }

}

function createEntity() {

    sizeInput.value(500);
    new Entity(new Colour(random(255), random(255), random(255)), createVector(10000, 10000), 10);
    selectedObj = entities.length;
    updateObject();

}

function newTextInput(div, label, textw1, textw2) {

    let newDiv = createDiv();
    newDiv.parent(div);
    newDiv.class("text-div")
    let text = createP(label + ": ");
    text.parent(newDiv);
  
    let input1 = createInput();
    input1.size(textw1);
    input1.parent(newDiv);
    input1.changed(modifyObject);
  
    let input2;

    if (textw2 > 0) {
        
        input2 = createInput();
        input2.size(textw2);
        input2.parent(newDiv);
        input2.changed(modifyObject);
    }

    return [input1, input2];

}

function updateStop()  {
    stopObj = selectedObj;
    if (selectorType.value() == "Seconds") {
        selectorCompare.hide();
        selectorCompare2.show();
        selectorCompare2.style("display", "inline");
    } else {
        selectorCompare.show();
        selectorCompare2.hide();
        selectorCompare.style("display", "inline");
    }
}

function stopTest() {
    let entity = entities[stopObj-1];
    let testValue = entity.a;
    let compareValue = stopStats.a;
    if (selectorType.value() === "Velocity") {
        testValue = entity.v;
        compareValue = stopStats.v;
    } else if (selectorType.value() === "Position") {
        testValue = entity.d;
        compareValue = stopStats.d;
    } else if (selectorType.value() === "Seconds") {
        
        if (selectorCompare2.value().includes("<")) {
            if  (secs < stopInput.value()) {
                noLoop();
                print("less");
                return;
            }
        } else if (selectorCompare2.value().includes(">")) {
            if  (secs > stopInput.value()) {
                noLoop();
                print("more");
                return;
            }
        } else if (selectorCompare2.value().includes("=")) {
            if ((secs <= parseFloat(stopInput.value()) && secs-1 >= parseFloat(stopInput.value())) || (secs >= parseFloat(stopInput.value()) && secs-1 <= stopInput.value())) {
                noLoop();
                print("equals");
                return;
            }
        } else if (selectorCompare2.value().includes("≠")) {
            if (!((secs <= parseFloat(stopInput.value()) && secs-1 >= parseFloat(stopInput.value())) || (secs >= parseFloat(stopInput.value()) && secs-1 <= parseFloat(stopInput.value())))) {
                noLoop();
                print("not equals");
                return;
            }
        }
        return;
    }
    let inputValue = parseFloat(stopInput.value());
    if (selectorCompare.value().includes("X")) {
        testValue = testValue.x;
        compareValue = compareValue.x;
    } else if (selectorCompare.value().includes("Y")) {
        if (selectorType.value().includes("Position")) {
            inputValue = parseFloat(stopInput.value()*-1+height/pixelForMeterRatio);
        }
        testValue = testValue.y;
        compareValue = compareValue.y;
    } else if (selectorCompare.value().includes("Mag")) {
        testValue = testValue.mag();
        compareValue = compareValue.mag();
    }

    if (selectorCompare.value().includes("<")) {
        if  (testValue < inputValue) {
            noLoop();
            print("less wrong",  testValue, inputValue);
            return;
        }
    } else if (selectorCompare.value().includes(">")) {
        if  (testValue > inputValue) {
            noLoop();
            print("more wrong");
            return;
        }
    } else if (selectorCompare.value().includes("=")) {
        if ((testValue <= inputValue && compareValue >= inputValue) || (testValue >= inputValue && compareValue <= inputValue)) {
            noLoop();
            print("equals wrong");
            return;
        }
    } else if (selectorCompare.value().includes("≠")) {
        if (!((testValue <= inputValue && compareValue >= inputValue) || (testValue >= inputValue && compareValue <= inputValue))) {
            noLoop();
            print("not equals wrong");
            return;
        }
    } 

}

function cAcceleration() {

    if (settings.cAcceleration === false) {
        settings.earthGravity = true;
        settings.friction = true;
        friction();
        earthGravity();
        cAccelerationButton.html("Constant Acceleration: Yes");
    } else {
        cAccelerationButton.html("Constant Acceleration: No");
    }

    settings.cAcceleration = !settings.cAcceleration;


}