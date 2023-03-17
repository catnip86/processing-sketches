import java.io.File;

class VideoManager {
  PApplet parent;
  boolean isRecording;
  String outputPath;

  VideoManager(PApplet parent, boolean isRecording, String outputPath) {
    this.parent = parent;
    this.isRecording = isRecording;
    this.outputPath = outputPath;
    
    if (isRecording) {      
      File outputDirectory = new File(outputPath);
      if (!outputDirectory.exists()) {
        outputDirectory.mkdir();
      }
    }
  }

  void saveFrame() {
    if (isRecording) {
      parent.saveFrame(outputPath + "/frame-######.png");
    }
  }
}
