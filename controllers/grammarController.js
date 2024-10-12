const axios = require('axios')

function applyCorrections(text, matches) {

    // Sort matches in descending order of offset to avoid index shifting
    matches.sort((a, b) => b.offset - a.offset)

    let correctedText = text 

    matches.forEach(match => {
        if (match.replacements && match.replacements.length > 0) {
            const { offset, length } = match
            const replacement = match.replacements[0].value

            correctedText =
                correctedText.slice(0, offset) +
                replacement +
                correctedText.slice(offset + length)
        }
    });

    return correctedText
}

exports.checkGrammar = async (req, res) => {
    try {
        const response = await axios.post('https://api.languagetool.org/v2/check', 
           new URLSearchParams({
                text: text,
                language: 'en-US',
           }).toString(),
           {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
           }           
        )

          
        const result = response.data
        
        // Extract matches from the result
        const suggestions = result.matches || []

        // Apply corrections
        const correctedText = applyCorrections(text, suggestions)
    
        res.json({ correctedText: correctedText, suggestions: suggestions })
    } catch (error) {
        console.error('Grammar check failed:', error)
        res.status(500).send('Grammar check failed')
    }   
}