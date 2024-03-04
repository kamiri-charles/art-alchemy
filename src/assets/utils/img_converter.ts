export const image_to_array_buffer = (image: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target?.result);
        };
        reader.onerror = (event) => {
            reject(event.target?.error);
        };
        reader.readAsArrayBuffer(image);
    });
}

export const array_buffer_to_image = (arrayBuffer: ArrayBuffer) => {
    return new Blob([arrayBuffer]);
}