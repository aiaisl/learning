var fs = require("fs");
var events = require("events");
exports.playerEventMessage = new events.EventEmitter();
var audio = document.createElement("audio");
(function (SwitchMode) {
    SwitchMode[SwitchMode["Single"] = 0] = "Single";
    SwitchMode[SwitchMode["SingleCycle"] = 1] = "SingleCycle";
    SwitchMode[SwitchMode["Order"] = 2] = "Order";
    SwitchMode[SwitchMode["Cycle"] = 3] = "Cycle";
    SwitchMode[SwitchMode["Random"] = 4] = "Random";
})(exports.SwitchMode || (exports.SwitchMode = {}));
var SwitchMode = exports.SwitchMode;
var Playlist = (function () {
    function Playlist(control, voices) {
        var _this = this;
        this.control = control;
        this.voices = voices;
        var index = parseFloat(fs.readFileSync(path.join(__dirname, "../123"), "utf8"));
        var t = parseFloat(fs.readFileSync(path.join(__dirname, "../pro"), "utf8"));
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
    Playlist.prototype.next = function (control, m) {
        var mode;
        if (m != undefined) {
            mode = m;
        }
        else {
            mode = SwitchMode[this.switchMode];
        }
        switch (mode) {
            case "Random": {
                var newVoiceIndex = Math.floor(Math.random() * 10);
                if (newVoiceIndex == this.currentVoiceIndex) {
                    this.next();
                }
                else {
                    this.startPlay(newVoiceIndex);
                }
            }
            case "Order": {
                if (this.currentVoiceIndex < this.voices.length - 1) {
                    this.startPlay(++this.currentVoiceIndex);
                }
                else {
                    console.log("已经是最后一首了");
                }
            }
            case "Cycle": {
                if (this.currentVoiceIndex < this.voices.length - 1) {
                    this.startPlay(++this.currentVoiceIndex);
                }
                else {
                    this.startPlay(0);
                }
            }
            case "SingleCycle": {
            }
            case "Single": {
                if (this.currentVoiceIndex < this.voices.length - 1) {
                    this.startPlay(++this.currentVoiceIndex);
                }
                else {
                    this.startPlay(0);
                }
            }
        }
    };
    Playlist.prototype.prev = function () {
        this.startPlay(--this.currentVoiceIndex);
    };
    Playlist.prototype.startPlay = function (index) {
        exports.playerEventMessage.emit("change", index);
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
//# sourceMappingURL=player.js.map