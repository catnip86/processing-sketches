class GifExporter {
    constructor(numFrames, fileName) {
      this.numFrames = numFrames;
      this.fileName = fileName;
      this.frameCounter = 0;
      this.downloadButton = document.getElementById("download-gif");
      this.downloadButton.disabled = true;
      this.gifExport = new GIF({
        workers: 2,
        quality: 10,
        width: width,
        height: height,
        workerScript: 'libraries/gif.worker.js'
      });
  
      this.gifExport.on("finished", (blob) => {
        this.blobURL = URL.createObjectURL(blob);
        this.downloadButton.textContent = "Download GIF";
        this.downloadButton.disabled = false;
      });
      
      this.downloadButton.addEventListener("click", () => {
        if (this.blobURL) {
          const a = document.createElement("a");
          a.href = this.blobURL;
          a.download = this.fileName;
          a.click();
        }
      });
    }
  
    captureFrame() {
      if (this.frameCounter < this.numFrames) {
        this.gifExport.addFrame(canvas, { delay: 1000 / frameRate(), copy: true });
        this.frameCounter++;
      } else if (this.frameCounter === this.numFrames) {
        this.gifExport.render();
        this.frameCounter++;
      }
    }
}  