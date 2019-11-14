class Note {
    /** @type number */ midiNumber;
    /** @type number */ amplitude;
    /** @type number */ startMS;
    /** @type number */ endMS;

    /**
     * @param {number} midiNumber
     * @param {number} startMS
     * @param {number} endMS
     */
    constructor(midiNumber, amplitude, startMS, endMS) {
        this.midiNumber = midiNumber;
        this.amplitude = amplitude;
        this.startMS = startMS;
        this.endMS = endMS;
    }

    getDuration() {
        return this.endMS - this.startMS;
    }

    /**
     * @param {number} curMS
     * @param {Color} color
     */
    draw(curMS, color) {
        fill(red(color), green(color), blue(color), this.amplitude * 255);
        noStroke();

        const x = currentLineX - (curMS - this.startMS) * pxPerMS;
        let rectWidth = (this.endMS - this.startMS) * pxPerMS;
        if (x > currentLineX + futurePaddingPX) return;
        if (x + rectWidth <= 0) return;
        if (x + rectWidth > currentLineX + futurePaddingPX) rectWidth = currentLineX + futurePaddingPX - x;
        rect(
            x,
            height / 2 - (this.midiNumber - centeredMidiNumber) * pxPerMidiNumber - noteHeight / 2,
            rectWidth,
            noteHeight,
            noteRadius,
        );
    }
}