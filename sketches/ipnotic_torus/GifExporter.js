class GifExporter {
    constructor(fileName, duration, fps) {
      this.animLoopInstance = null;
      this.fileName = fileName;
      this.downloadButton = document.getElementById("download-gif");
      this.downloadButton.disabled = true;
      this.downloadButton.textContent = "Collecting frames...";

      createLoop({
        duration: duration,
        framesPerSecond: fps,
        gif: {
          fileName: this.fileName,
          download: false,
          onInstance: (instance) => {
            this.animLoopInstance = instance;
          },
          onFinishRender: (blob) => {
            this.downloadButton.href = URL.createObjectURL(blob);
            this.downloadButton.download = this.fileName;
            this.downloadButton.disabled = false;
            this.downloadButton.textContent = "Download GIF";
          },
          onStartRender: () => {
            this.downloadButton.textContent = "Rendering GIF...";
          },
        },
      });
    }

    getTheta() {
      return this.animLoopInstance.theta;
    }
}  