let entities = [];
class Entity {

    // colour = colour object of the entity
    // d = postition vector in meters
    // v = velocity vector in meters for second
    // a = acceleration vector in meters for second squared
    // m = mass in kilograms
    // f = net force in newtons
    // size = size in pixels

    constructor(colour, position, mass) {
        this.colour = colour;
        this.d = position;
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.m = mass
        this.f = createVector(0, 0);
        this.size = parseFloat(sizeInput.value())*mass;
        this.kmu = 0.1;
        this.smu = 0.1;
        this.mat = "wood";
        entities.push(this);
    }

    draw() {
        fill(this.colour.getRed(), this.colour.getGreen(), this.colour.getBlue());
        ellipse(this.d.x*pixelForMeterRatio, this.d.y*pixelForMeterRatio, this.size*pixelForMeterRatio);
    }

    calcNormalF(netF, isV) {


        let normalFDir = this.getNormalFDir();
        if (normalFDir != undefined) {
            let angle = normalFDir.heading()-PI/2;
            let normalFMag = netF.mag() * -sin(refAngle(netF.heading()-angle));
            
            let normalF = p5.Vector.fromAngle(normalFDir.heading(), normalFMag);
            
            this.applyForce(normalF);
            return(normalF);
        }
        return normalFDir != undefined;
    }

    update() {


        let netF = p5.Vector.mult(this.a, this.m);
        // normal force
        this.calcNormalF(netF, false);
        let normalF = this.calcNormalF(p5.Vector.mult(this.v, this.m), true)


        if (entities[0].d.y > (height+5)/pixelForMeterRatio) {
            noLoop();
        }

        if (settings.friction) {

            this.friction(normalF);
        }
        this.v.add(this.a);
        this.d.add(this.v);
        if (!settings.cAcceleration) {
            this.a.mult(0); // <-- figure out order, cancels forces

        }
        //this.edges();
    }

    getNormalFDir() {
        let d = p5.Vector.add(this.d, this.v);
        d.add(this.a);
        let x = d.x*pixelForMeterRatio;
        let y = d.y*pixelForMeterRatio;
        let size = this.size*pixelForMeterRatio/2;
        
        let dir;

        if (y >= height - size) {
            dir = p5.Vector.fromAngle(PI/2);
        } else if (y <= size) {
            dir = p5.Vector.fromAngle(PI/2*3);
        }

        //let hit = collideLineCircle(width-300, height, width, height-173.205, x, y, size);

        // if (hit) {
        //     if (dir == undefined) {
        //         dir = p5.Vector.fromAngle(PI/6);
        //     } else {
        //         dir.add(p5.Vector.fromAngle(PI/6));
        //     }
        // }

        
        return dir;

    }

    edges() {
        let x = this.d.x*pixelForMeterRatio;
        let size = this.size*pixelForMeterRatio/2;

        if (x > width - size) {
            this.d.x = (width - size)/pixelForMeterRatio;
            this.v.x *= -1
        } else if (x < size) {
            this.d.x = size/pixelForMeterRatio;
            this.v.x *= -1;
        }

    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.m);
        if (!settings.cAcceleration) {
            this.a.add(f);
        }
    }

    friction(normalF) {
        let diff = height - (this.d.y+this.size)*pixelForMeterRatio;

        if (diff < 1) {
            let mu = this.kmu;
            if (this.v.mag < 0.01) {
                mu = this.smu;
            }

            let f = this.v.copy();
            f.normalize();
            f.mult(-1);
            f.setMag(normalF*mu);

            if (f.mag()*-1 >= this.v.mag()) {
                // firction tp strong
            }

            this.applyForce(f);

        }
    }

    setPosition(x, y) {
        this.d.x = x;
        this.d.y = y;
    }

    setVelocity(x, y) {
        this.v.x = x;
        this.v.y = y;
    }

    setAcceleration(x, y) {
        this.a.x = x;
        this.a.y = y;
    }

    selfDestruct() {
        let i = entities.indexOf(this);
        entities.splice(i);
    }

}