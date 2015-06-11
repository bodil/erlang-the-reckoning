/*global setTimeout */

var events = require("pink/lib/events");

function Video(slide, url) {

  // --- activate

  this.activate = () => {
    console.log("hi from activate");
    if (this.video) this.video.parentNode.removeChild(this.video);
    this.video = document.createElement("video");
    this.video.classList.add("video");
    this.video.autoplay = true;
    this.video.muted = true;
    this.video.src = url;
    slide.parentNode.appendChild(this.video);
    setTimeout((() => {
      this.video.classList.add("active");
    }).bind(this), 1);
  };

  // --- cleanup

  this.cleanup = () => {
    if (this.video) {
      const bg = this.video;
      events.once(bg, events.vendorPrefix("TransitionEnd"), () => {
        bg.parentNode.removeChild(bg);
      }, this);
      bg.classList.remove("active");
      this.video = null;
    }
  };

}

module.exports = Video;
