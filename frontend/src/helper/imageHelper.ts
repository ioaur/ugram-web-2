const imageResize = (imgtag: HTMLImageElement) => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.drawImage(imgtag, 0, 0);

    let MAX_WIDTH = 1000;
    let MAX_HEIGHT = 1000;
    let width = imgtag.width;
    let height = imgtag.height;

    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
    }
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.drawImage(imgtag, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg");
};

export { imageResize };
