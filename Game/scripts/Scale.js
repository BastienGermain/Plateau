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

        const absolute = [relative[0]]

        for (let i = 1; i < relative.length; ++i)
            absolute[i] = absolute[i-1] + relative[i]

        return absolute
    }

    /**
    * 
    * @param {*String at "A2" format} tonic 
    * @param {*String at "major" format} mode
    * 
    * @return {*Array of frequencies : notes of the scale}
    */

    static create(tonic, mode) {
        const intervals = this.absolute([0, ...this.Modes[mode]])
        const scale = Tone.Frequency(tonic).harmonize(intervals).map(element => Tone.Frequency(element).toNote())
        return scale.concat(scale.map(note => Tone.Frequency(note).transpose(12).toNote()))
    }

}

/**
 * Pour compléter si vous avez la foi... : https://feelyoursound.com/scale-chords/
 */

Scale.Modes = {
    'augmented': [3, 1, 3, 1, 3, 1],
    'augmented-fifth': [2, 2, 1, 2, 1, 1, 2, 1],
    'blues-major': [3, 2, 1, 1, 2, 3],
    'blues-minor': [3, 2, 1, 1, 3, 2],
    'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'diminished': [2, 1, 2, 1, 2, 1, 2, 1],
    'dorian': [2, 1, 2, 2, 2, 1, 2],
    'half-whole': [1, 2, 1, 2, 1, 2, 1, 2],
    'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
    'japanese': [1, 4, 2, 1, 4],
    'locrian': [1, 2, 2, 1, 2, 2, 2], 
    'lydian': [2, 2, 2, 1, 2, 2, 1],
    'major': [2, 2, 1, 2, 2, 2, 1],
    'melodic-minor': [2, 1, 2, 2, 2, 2, 1],
    'minor': [2, 1, 2, 2, 1, 2, 2],
    'mixolydian': [2, 2, 1, 2, 2, 1, 2],
    'pentatonic-major': [2, 2, 3, 2, 3],
    'pentatonic-minor': [3, 2, 2, 3, 2],
    'phrygian': [1, 2, 2, 2, 1, 2, 2],
    'raga-bhairava': [1, 3, 1, 2, 1, 3, 1],
    'raga-bihag': [4, 1, 2, 1, 4, 1],
    'raga-darbari-kanada': [1, 4, 1, 2, 1, 4, 1],
    'raga-bhimpalasi': [3, 2, 2, 3, 2],
    'raga-kirvani': [2, 1, 4, 1, 3, 1],
    'oriental': [1, 3, 1, 1, 3, 1, 2],
    'wholetone': [2, 2, 2, 2, 2, 2],
    'whole-half': [2, 1, 2, 1, 2, 1, 2, 1],
}

Scale.SimpleModesNames = [
    'major',
    'minor',
    'melodic-minor',
    'harmonic-minor',
    'pentatonic-major',
    'pentatonic-minor',
    'augmented',
    'diminished',
    'chromatic',
    'whole-half',
    'half-whole',
    'wholetone',
    'augmented-fifth',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'locrian',
]

Scale.ComplexModesNames = [
    'blues-major',
    'blues-minor',
    'japanese',
    'oriental',
    'raga-bhairava',
    'raga-bihag',
    'raga-darbari-kanada',
    'raga-bhimpalasi',
    'raga-kirvani'
]