export async function createFiddle(content: string) {
    return new Promise((resolve, reject) => {
        resolve({
            id: 0,
            content: content
        })
    })
}

export async function getFiddle(id: string) {
    return new Promise((resolve, reject) => {
        resolve({
            id: id,
            content: `console.log('hello world')`
        });
    })
}