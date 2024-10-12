const writeQueue = []
let isWriting = false

async function processQueue() {
    if (writeQueue.length === 0 || isWriting) return 

    isWriting = true 
    const { fn, resolve, reject } = writeQueue.shift()

    try {
        const result = await fn()
        resolve(result)
    } catch (error) {
        reject(error)
    } finally {
        isWriting = false
        processQueue()
    }
}

function enqueueWrite(fn) {
    return new Promise((resolve, reject) => {
        writeQueue.push({ fn, resolve, reject})
        processQueue()
    })
}

module.exports = enqueueWrite

// enqueueWrite: 
// Ensures that write operations are queued and processed one at a time.
// processQueue: 
// Handles the sequential processing of queued write operations.