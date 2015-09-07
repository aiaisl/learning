var audio = document.createElement("audio");
var fs = require("fs");
audio.paused;
var Playlist = (function () {
    function Playlist(control, voices) {
        var _this = this;
        this.control = control;
        this.voices = voices;
        var index = parseFloat(fs.readFileSync(path.join(__dirname, "123"), "utf8"));
        var t = parseFloat(fs.readFileSync(path.join(__dirname, "pro"), "utf8"));
        if (index) {
            this.startPlay(index);
            console.log(t);
            this.control.currentTime = t;
        }
        else {
            this.startPlay(10);
        }
        audio.onended = function (ev) {
            _this.next();
        };
    }
    Playlist.prototype.next = function () {
        this.startPlay(++this.currentVoiceIndex);
    };
    Playlist.prototype.prev = function () {
        this.startPlay(--this.currentVoiceIndex);
    };
    Playlist.prototype.startPlay = function (index) {
        this.currentVoiceIndex = index;
        this.control.startPlay(this.voices[index]);
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
            return Math.floor(audio.currentTime / audio.duration * 10000) / 100;
        },
        set: function (setTime) {
            audio.currentTime = setTime * audio.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "currentTime", {
        get: function () {
            return audio.currentTime;
        },
        set: function (setTime) {
            audio.currentTime = setTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "song", {
        get: function () {
            return audio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "paused", {
        get: function () {
            return audio.paused;
        },
        enumerable: true,
        configurable: true
    });
    return Control;
})();
exports.Control = Control;
