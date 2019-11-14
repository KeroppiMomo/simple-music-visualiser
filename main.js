const pxPerMS = 0.1;
const pxPerMidiNumber = 10;
const centeredMidiNumber = 60; // A4
let currentLineX;
const noteHeight = 10;
const noteRadius = 2;
const futurePaddingPX = 200;

/** @type Track[] */ let tracks = [];

async function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    currentLineX = width * 0.7;
    const midi = await Midi.fromUrl("test.mid");
    colorMode(HSL);
    tracks = midi.tracks.map(track => new Track(
        track.notes.map(note => new Note(
            note.midi,
            note.velocity,
            note.time * 1000,
            (note.time + note.duration) * 1000
        )), color(random(0, 360), 82, 73)
    ));
    colorMode(RGB);
}

function draw() {
    background(10, 10, 10);

    tracks.forEach(part => part.draw(millis()));

    // Future Padding
    noFill();
    noStroke();
    for (let x = currentLineX; x <= currentLineX + futurePaddingPX; x++) {
        const fraction = map(x, currentLineX, currentLineX + futurePaddingPX, 0, 1);
        const curColor = lerpColor(color(0, 150), color(0, 255), fraction);
        stroke(curColor);
        strokeWeight(1);
        line(x, 0, x, height);
    }

    // Current Line
    stroke(100, 100, 100);
    strokeWeight(2);
    line(currentLineX, 0, currentLineX, height);
}