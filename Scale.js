class Scale {

    constructor() {}

    /**
     * Transforms relative intervals into absolute intervals
     * Example : [0, 1, 2, 1, 3, 1]  will become [0, 1, 3, 4, 7, 8]
     * 
     * @param {*Array of relative intervals} relatives
     * 
     * @return {*Array of absolute intervals}
    */

    static absolute (relative) {

        const absolute = [relative[0]];

        for (let i = 1; i < relative.length; ++i)
            absolute[i] = absolute[i-1] + relative[i];

        return absolute;
    }

    /**
    * 
    * @param {*String at "A2" format} tonic 
    * @param {*String at "major" format} mode
    * 
    * @return {*Array of frequencies : notes of the scale}
    */

    static create(tonic, mode) {

        const intervals = this.absolute([0, ...this.Modes[mode]]);
        const scale = Tone.Frequency(tonic).harmonize(intervals).map(element => Tone.Frequency(element).toNote());        
        return scale.concat(scale.map(note => Tone.Frequency(note).transpose(12).toNote()));
    }

}

/**
 * Pour compléter si vous avez la foi... : https://feelyoursound.com/scale-chords/
 */

Scale.Modes = {
    'major': [2, 2, 1, 2, 2, 2, 1],
    'minor': [2, 1, 2, 2, 1, 2, 2],
    'melodic-minor': [2, 1, 2, 2, 2, 2, 1],
    'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
    'pentatonic-major': [2, 2, 3, 2, 3],
    'blues-major': [3, 2, 1, 1, 2, 3],
    'pentatonic-minor': [3, 2, 2, 3, 2],
    'blues-minor': [3, 2, 1, 1, 3, 2],
    'augmented': [3, 1, 3, 1, 3, 1],
    'diminished': [2, 1, 2, 1, 2, 1, 2, 1],
    'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'whole-half': [2, 1, 2, 1, 2, 1, 2, 1],
    'half-whole': [1, 2, 1, 2, 1, 2, 1, 2],
    'wholetone': [2, 2, 2, 2, 2, 2],
    'augmented-fifth': [2, 2, 1, 2, 1, 1, 2, 1],
    'japanese': [1, 4, 2, 1, 4],
    'oriental': [1, 3, 1, 1, 3, 1, 2],
    'dorian': [2, 1, 2, 2, 2, 1, 2],
    'phrygian': [1, 2, 2, 2, 1, 2, 2],
    'lydian': [2, 2, 2, 1, 2, 2, 1],
    'mixolydian': [2, 2, 1, 2, 2, 1, 2],
    'locrian': [1, 2, 2, 1, 2, 2, 2], 
    'raga-bhairava': [1, 3, 1, 2, 1, 3, 1],
    'raga-bihag': [4, 1, 2, 1, 4, 1],
    'raga-darbari-kanada': [1, 4, 1, 2, 1, 4, 1],
    'raga-bhimpalasi': [3, 2, 2, 3, 2],
    'raga-kirvani': [2, 1, 4, 1, 3, 1],
}

Scale.ClassicModes = {
    'major': [2, 2, 1, 2, 2, 2, 1],
    'minor': [2, 1, 2, 2, 1, 2, 2],
    'melodic-minor': [2, 1, 2, 2, 2, 2, 1],
    'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
    'pentatonic-major': [2, 2, 3, 2, 3],
    'blues-major': [3, 2, 1, 1, 2, 3],
    'pentatonic-minor': [3, 2, 2, 3, 2],
    'blues-minor': [3, 2, 1, 1, 3, 2],
    'augmented': [3, 1, 3, 1, 3, 1],
    'diminished': [2, 1, 2, 1, 2, 1, 2, 1],
    'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'whole-half': [2, 1, 2, 1, 2, 1, 2, 1],
    'half-whole': [1, 2, 1, 2, 1, 2, 1, 2],
    'wholetone': [2, 2, 2, 2, 2, 2],
    'augmented-fifth': [2, 2, 1, 2, 1, 1, 2, 1],
    'japanese': [1, 4, 2, 1, 4],
    'oriental': [1, 3, 1, 1, 3, 1, 2],
    'dorian': [2, 1, 2, 2, 2, 1, 2],
    'phrygian': [1, 2, 2, 2, 1, 2, 2],
    'lydian': [2, 2, 2, 1, 2, 2, 1],
    'mixolydian': [2, 2, 1, 2, 2, 1, 2],
    'locrian': [1, 2, 2, 1, 2, 2, 2], 
}

Scale.StrangeModes = {
    'raga-bhairava': [1, 3, 1, 2, 1, 3, 1],
    'raga-bihag': [4, 1, 2, 1, 4, 1],
    'raga-darbari-kanada': [1, 4, 1, 2, 1, 4, 1],
    'raga-bhimpalasi': [3, 2, 2, 3, 2],
    'raga-kirvani': [2, 1, 4, 1, 3, 1]
}

Scale.ModesNames = [
    'major',
    'minor',
    'melodic-minor',
    'harmonic-minor',
    'pentatonic-major',
    'blues-major',
    'pentatonic-minor',
    'blues-minor',
    'augmented',
    'diminished',
    'chromatic',
    'whole-half',
    'half-whole',
    'wholetone',
    'augmented-fifth',
    'japanese',
    'oriental',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'locrian',
    'raga-bhairava',
    'raga-bihag',
    'raga-darbari-kanada',
    'raga-bhimpalasi',
    'raga-kirvani'
]

Scale.ClassicModesNames = [
    'major',
    'minor',
    'melodic-minor',
    'harmonic-minor',
    'pentatonic-major',
    'blues-major',
    'pentatonic-minor',
    'blues-minor',
    'augmented',
    'diminished',
    'chromatic',
    'whole-half',
    'half-whole',
    'wholetone',
    'augmented-fifth',
    'japanese',
    'oriental',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'locrian'
]

Scale.StrangeModesNames = [
    'raga-bhairava',
    'raga-bihag',
    'raga-darbari-kanada',
    'raga-bhimpalasi',
    'raga-kirvani'
]