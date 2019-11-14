class Track {
    /** @type Note[] */ notes;
    /** @type Color */ color;

    /**
     * @param {Note[]} notes 
     * @param {Color} color 
     */
    constructor(notes, color) {
        this.notes = notes;
        this.color = color;
    }

    /**
     * @param {number} curMS
     */
    draw(curMS) {
        this.notes.forEach(note => note.draw(curMS, this.color));
    }
}