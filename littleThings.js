class Colour {
    
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    getRed() {
        return this.red;
    }
    getGreen() {
        return this.green;
    }
    getBlue() {
        return this.blue;
    }

    random() {
        this.red = random(100, 255);
        this.green = random(100, 255);
        this.blue = random(100, 255);
    }

}

function refAngle(angle) {
    if (angle <= PI/2) {
        return angle;
    } else if (angle <= PI) {
        return PI-angle;
    } else if (angle <= PI/2*3) {
        return angle-PI;
    } else {
        return TWO_PI-angle;
    }
}
