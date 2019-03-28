class Improvise {

    constructor() {}

    /**
     * 
     * @param {*Array of {name, value, probability} (sum of probabilities must be 1) for notes duration} probabilities
     * --> Exemple : [{name: 'noire', value: '4n', probabiltiy: 0.6}]
     * 
     * @return {*The duration picked, based on probabilities}
     */

    static random(objects) {
        
        if (objects instanceof Array) {            
            const duration = new Probability(objects.map(object => {
                
                if (object.probability instanceof String || object.probability > 1)
                    throw new TypeError('Improvise.js: Invalid argument excpetion')
                
                return ({
                    p: (object.probability * 100) + '%',
                    f: (() => object.value)
                })
            }))
            return duration() 
        }
        else throw new TypeError('Improvise.js:  Invalid argument : has to be an array of objects with probability field.')

    }

    static probabilize(objects) {
        
        let remaining = 1;

        if (objects instanceof Array) {

            return objects.map((object, index) => {
                
                if (index !== (objects.length - 1)) {
                    
                    const probability = Math.random() * (Math.min(remaining, 0.4))
                    remaining -= probability
                    
                    return ({
                        ...object,
                        probability: probability
                    })
                    
                } else {
                    return ({
                        ...object, 
                        probability: remaining
                    })
                }
            })
        } else throw new TypeError('Invalid argument : has to be an array of objects.')
    }
        


}

Improvise.Durations = [
    {
        name: 'carree',
        value: '2m'
    },
    {
        name: 'ronde',
        value: '1m',
    },
    {
        name: 'blanche',
        value: '2n',
    },
    {
        name: 'noire',
        value: '4n',
    },
    {
        name: 'croche',
        value: '8n'
    },
    {
        name: 'double-croche',
        value: '16n',
    },
    {
        name: 'triple-croche',
        value: '32n',
    },
]