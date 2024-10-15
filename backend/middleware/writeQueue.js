function enqueueWrite(writeOperation) {
    console.log('enqueueWrite: Operation enqueued');
    return new Promise((resolve, reject) => {
        queue.push({ writeOperation, resolve, reject });
        processQueue();
    });
}

function processQueue() {
    if (isWriting || queue.length === 0) return;

    isWriting = true;
    const { writeOperation, resolve, reject } = queue.shift();
    console.log('enqueueWrite: Processing write operation');

    writeOperation()
        .then(() => {
            console.log('enqueueWrite: Write operation completed');
            isWriting = false;
            resolve();
            processQueue();
        })
        .catch((err) => {
            console.error('enqueueWrite: Write operation failed', err);
            isWriting = false;
            reject(err);
            processQueue();
        });
}
