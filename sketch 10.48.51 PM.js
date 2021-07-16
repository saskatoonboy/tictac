// Physics Simulation Engine
// Eric James
// May Wed. 19 2021
//

let pixelForMeterRatio = 0.01;
let forceColour;
let simulating = false;
let setupItems = [];
let canvas;
let settings;
let earthGravityButton;
let frictionButton;
let selector;
let createEntityButton;
let selectedObj = 0;
let massInput;
let positionXInput;
let positionYInput;
let velocityInput;
let velocityDegInput;
let accelerationInput;
let accelerationDegInput;
let ratioInput;
let sizeInput;
let selectorCompare;
let selectorType;
let stopInput;
let secs = 0;
let secsDisplay;
let cAccelerationButton;

function setup() {
  canvas = createCanvas(windowWidth-300, windowHeight);
  canvas.class("inline");

  let div = createDiv();
  div.class("main-div")

  // earth gravity button
  cAccelerationButton = createButton("Constant Acceleration: No");
  cAccelerationButton.mousePressed(cAcceleration);
  cAccelerationButton.class("inline")
  cAccelerationButton.parent(div);
  setupItems.push(cAccelerationButton);

  // earth gravity button
  earthGravityButton = createButton("Earth Gravity: Yes");
  earthGravityButton.mousePressed(earthGravity);
  earthGravityButton.class("inline")
  earthGravityButton.parent(div);
  setupItems.push(earthGravityButton);

  // friction button
  frictionButton = createButton("Friction: Yes");
  frictionButton.mousePressed(friction);
  frictionButton.class("inline")
  frictionButton.parent(div);
  setupItems.push(frictionButton);
  frictionButton.hide();

  rt = newTextInput(div, "MetersPerPixel", 150, 0);

  setupItems.push(createButton("Simulate").mousePressed(simulate).class("inline").parent(div))

  createEntityButton = createButton("Create Object");
  createEntityButton.mousePressed(createEntity);
  createEntityButton.class("inline");
  createEntityButton.parent(div);
  setupItems.push(createEntityButton);

  vt = newTextInput(div, "Velocity", 120,  30);
  at = newTextInput(div, "Acceleration", 120,  30);
  dt = newTextInput(div, "Postion", 75,  75);
  mt = newTextInput(div, "Mass", 150,  0);
  st = newTextInput(div, "Size Factor", 150,  0);
  velocityInput = vt[0];
  velocityDegInput = vt[1];
  accelerationInput = at[0];
  accelerationDegInput = at[1];
  positionXInput = dt[0];
  positionYInput = dt[1];
  massInput = mt[0];
  ratioInput = rt[0];
  sizeInput = st[0];

  let newDiv = createDiv();
  newDiv.parent(div);
  newDiv.class("text-div")
  let text = createP("Stop When: ");
  text.parent(newDiv);

  selectorType = createSelect();
  selectorType.option("Position");
  selectorType.option("Velocity");
  selectorType.option("Acceleration");
  selectorType.option("Seconds");
  selectorType.parent(newDiv);
  selectorType.changed(updateStop);

  selectorCompare = createSelect();
  selectorCompare.option("Mag<");
  selectorCompare.option("X<");
  selectorCompare.option("Y<");
  selectorCompare.option("Mag>");
  selectorCompare.option("X>");
  selectorCompare.option("Y>");
  selectorCompare.option("Mag=");
  selectorCompare.option("X=");
  selectorCompare.option("Y=");
  selectorCompare.option("Mag≠");
  selectorCompare.option("X≠");
  selectorCompare.option("Y≠");
  selectorCompare.parent(newDiv);
  selectorCompare.changed(updateStop);

  selectorCompare2 = createSelect();
  selectorCompare2.option("<");
  selectorCompare2.option(">");
  selectorCompare2.option("=");
  selectorCompare2.option("≠");
  selectorCompare2.parent(newDiv);
  selectorCompare2.changed(updateStop);
  selectorCompare2.hide();
  
  stopInput = createInput();
  stopInput.size(75);
  stopInput.parent(div);
  stopInput.changed(updateStop);

  secsDisplay = createP("Seconds: 0s");
  secsDisplay.parent(div);

}

function draw() {

  background(0);

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    entity.draw();
  }

  if (simulating) {

    secs++;
    //updates
    for (let i=0; i<entities.length; i++) {

      let entity = entities[i];

      // earth gravity
      if (settings.earthGravity) {

        entity.applyForce(createVector(0, 9.8).mult(entity.m));
      }

      if (selectedObj > 0) {
        updateObject()
      }
      if (i==stopObj-1) {
        stopStats.d = entity.d.copy();
        stopStats.v = entity.v.copy();
        stopStats.a = entity.a.copy();
      }
      entity.update();
    }

    if (stopInput.value() != "") {

      stopTest();
    }

    // wind
    // if (mouseIsPressed) {

    //   for (let entity of entities) {
    
    //     entity.applyForce(createVector(6, 0));
    //   }

    // }
  }
  

}

function updateObject() {

  let entity = entities[selectedObj-1];

  massInput.value(entity.m);
  velocityInput.value(entity.v.mag());
  velocityDegInput.value(degrees(entity.v.heading())*-1);
  accelerationInput.value(entity.a.mag());
  accelerationDegInput.value(degrees(entity.a.heading())*-1);
  positionXInput.value(entity.d.x);
  positionYInput.value(entity.d.y*-1+height/pixelForMeterRatio);
  ratioInput.value(pixelForMeterRatio);
  secsDisplay.html("Seconds: "+secs+"s");

}

function mousePressed() {
  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    if (collidePointCircle(mouseX, mouseY, entity.d.x*pixelForMeterRatio, entity.d.y*pixelForMeterRatio, entity.size*pixelForMeterRatio)) {

      selectedObj = i+1;
      updateObject();

    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth-300, windowHeight);
}

function modifyObject() {

  let entity = entities[selectedObj-1];

  pixelForMeterRatio = parseFloat(ratioInput.value());
  entity.m = parseFloat(massInput.value());
  entity.v.x = 1;
  entity.v.setMag(parseFloat(velocityInput.value())*-1);
  entity.v.setHeading(radians(parseFloat(velocityDegInput.value()))*-1);
  entity.a.x = 1;
  entity.a.setMag(parseFloat(accelerationInput.value())*-1);
  entity.a.setHeading(radians(parseFloat(accelerationDegInput.value()))*-1);
  entity.d.x = parseFloat(positionXInput.value());
  entity.d.y = parseFloat(positionYInput.value()*-1+height/pixelForMeterRatio);
  entity.size = parseFloat(sizeInput.value())*entity.m;

}

function keyPressed() {
  print(keyCode)
  if (keyCode === 77) {
    stopInput.value("69.4444444444444444444");
    selectorType.value("Velocity");
    selectorCompare.value("Mag=");
    sizeInput.value("5000");
    ratioInput.value("0.001");
    positionYInput.value("700000");
    positionXInput.value("40000");
    accelerationInput.value("0.01");

    modifyObject();
    stopObj = selectedObj;
    cAcceleration();
  
  }
}
