const axios = require('axios')

function applyCorrections(text, matches) {
    // Define priority: higher for grammar issues
    const priorityMap = {
        'grammar': 2,
        'misspelling': 1,
        'unknownWord': 1,
    }    

    // Assing priority to each match
    matches.forEach(match => {
        const issueType = match.rule.issueType || 'unknown'
        match.priority = priorityMap[issueType] || 0
    })

    // Soft matches by priority descending, then by offset descending
    matches.sort((a, b) => {
        if(b.priority !== a.priority) {
            return b.priority - a.priority
        }
        return b.offset - a.offset
    })

    let correctedText = text;
    const replacedIndices = new Set();

    matches.forEach(match => {
        const { offset, length, replacements } = match;

        // Check if this range has already been modified
        let overlap = false;
        for (let i = offset; i < offset + length; i++) {
            if (replacedIndices.has(i)) {
                overlap = true;
                break;
            }
        }

        if (overlap) {
            // Skip this match to avoid conflicting replacements
            return;
        }

        if (replacements && replacements.length > 0) {
            const replacement = replacements[0].value;

            // Apply the replacement
            correctedText =
                correctedText.slice(0, offset) +
                replacement +
                correctedText.slice(offset + length);

            // Mark the new replacement indices to prevent overlap
            for (let i = offset; i < offset + replacement.length; i++) {
                replacedIndices.add(i);
            }
        }
    });

    return correctedText;
}


exports.checkGrammar = async (req, res) => {
    try {
        const { text } = req.body

        if (!text) {
            return res.status(400).json({
                status: 'fail',
                message: 'Text is requried for grammar checking.'
            })
        }

        const response = await axios.post(
            'https://api.languagetool.org/v2/check',
            new URLSearchParams({
                text: text,
                language: 'en-US',
            }).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        )


        const result = response.data

        // Extract matches from the result
        const suggestions = result.matches || []

        // Apply corrections
        const correctedText = applyCorrections(text, suggestions)

        res.status(200).json({
            status: 'success',
            data: { correctedText, suggestions },
        })

    } catch (error) {
        console.error('Grammar check failed:', error)
        res.status(500).json({
            status: 'error',
            message: 'Grammar check failed.'
        })
    }
}