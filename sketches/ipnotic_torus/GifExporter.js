class GifExporter {
    constructor(numFrames, fileName) {
      this.numFrames = numFrames;
      this.fileName = fileName;
      this.frameCounter = 0;
      this.gifExport = new GIF({
        workers: 2,
        quality: 10,
        width: width,
        height: height,
        workerScript: 'libraries/gif.worker.js'
      });
  
      this.gifExport.on('finished', (blob) => {
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;
        downloadLink.download = this.fileName;
        downloadLink.click();
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