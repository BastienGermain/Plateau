class Improvise {

    constructor() {}

    /**
     * 
     * @param {*Array of probabilities (sum must be 1) for each note duration} probabilities
     * @return {*The duration picked, based on probabilities}
     */
    static duration(probabilities) {
        if (probabilities instanceof Array) {
            const levels = probabilities.map((probability, index, array) => (index !== 0) && (probability += probabilities[index-1]))
            console.log(levels)
        }
    }
}