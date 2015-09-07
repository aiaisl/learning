var audio = document.createElement("audio");
var Playlist = (function () {
    function Playlist(control, voices) {
        control.startPlay(voices[5]);
    }
    Playlist.prototype.next = function () {
    };
    Playlist.prototype.prev = function () {
    };
    return Playlist;
})();
exports.Playlist = Playlist;
var Control = (function () {
    function Control(voice) {
        if (voice) {
            this.startPlay(voice);
        }
    }
    Control.prototype.startPlay = function (voice) {
        audio.src = voice.src;
        audio.play();
    };
    Control.prototype.play = function () {
        audio.play();
    };
    Control.prototype.stop = function () {
        audio.pause();
    };
    Control.prototype.pause = function () {
        audio.pause();
    };
    Object.defineProperty(Control.prototype, "progress", {
        get: function () {
            return Math.floor(this.audio.currentTime / this.audio.duration * 10000) / 100;
        },
        set: function (setTime) {
            this.audio.currentTime = setTime * this.audio.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "currentTime", {
        get: function () {
            return this.audio.currentTime;
        },
        set: function (setTime) {
            this.audio.currentTime = setTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "song", {
        get: function () {
            return this.audio;
        },
        enumerable: true,
        configurable: true
    });
    return Control;
})();
exports.Control = Control;
