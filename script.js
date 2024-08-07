document
  .getElementById("checkCasting")
  .addEventListener("click", checkScreenSharing);

function checkScreenSharing() {
  // Checking for screen capture API usage
  navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((stream) => {
      // Screen capture is active
      document.getElementById("status").innerText =
        "Status: Screen Sharing Active";
      // Stop the stream immediately
      let tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    })
    .catch((error) => {
      // Screen capture is not active or denied
      document.getElementById("status").innerText =
        "Status: Screen Sharing Not Active";
    });

  // Monitoring network traffic for media resources
  monitorNetworkTraffic();
}

function monitorNetworkTraffic() {
  if (window.performance && window.performance.getEntriesByType) {
    const resources = window.performance.getEntriesByType("resource");
    let mediaResources = resources.filter(
      (resource) =>
        resource.initiatorType === "media" || resource.initiatorType === "video"
    );
    if (mediaResources.length > 0) {
      document.getElementById("status").innerText =
        "Status: Media Streaming Detected";
    } else {
      document.getElementById("status").innerText =
        "Status: No Media Streaming Detected";
    }
  } else {
    console.warn("Network Performance API not supported in this browser.");
    document.getElementById("status").innerText =
      "Status: Unable to Monitor Network Traffic";
  }
}
