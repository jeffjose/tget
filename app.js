#!/usr/bin/env node

var optimist = require("optimist");
var rc = require("rc");
var clivas = require("clivas");
var numeral = require("numeral");
var progress = require("progress");
var colors = require("colors");
var parsetorrent = require("parse-torrent");
var torrentStream = require("torrent-stream");

var argv = rc(
  "tget",
  {},
  optimist.usage("Usage: $0 magnet-link-or-torrent [,...]").argv
);

var input = argv._;

if (input.length == 0) {
  optimist.showHelp();
  process.exit(1);
}

var totalLength = null;
var downLength = null;
var bar = null;
var timerId = null;
var prevLength = null;
var engine = null;
var verified = 0;
var downloadedPercentage = 0;

var bytes = function(num) {
  return numeral(num).format("0.0b");
};

var setupEngine = function(torrent) {
  engine = torrentStream(torrent, {
    connections: 100,
    path: "."
  });

  engine.on("verify", function() {
    verified++;
    downloadedPercentage = Math.floor(
      (verified / engine.torrent.pieces.length) * 100
    );
  });

  engine.on("ready", function() {
    engine.files.forEach(function(file) {
      file.select();
    });

    totalLengthBytes = engine.files.reduce(function(prevLength, currFile) {
      return prevLength + currFile.length;
    }, 0);

    totalLength = engine.torrent.pieces.length;

    speed = bytes(engine.swarm.downloadSpeed()) + "/s";

    bar = new progress(
      " downloading " +
        engine.files.length +
        " files (" +
        bytes(totalLengthBytes) +
        ") [:bar] :percent :etas :speed :peers",
      {
        complete: "=",
        incomplete: " ",
        width: 30,
        total: totalLength
      }
    );

    timerId = setInterval(draw, 500);
  });

  engine.on("idle", function() {
    engine.destroy();
    clearInterval(timerId);
    clivas.clear();
    console.log("------------------");
    engine.files.forEach(function(file) {
      console.log(file.name + " " + bytes(file.length));
    });
    console.log("------------------");
    console.log(
      " downloaded " +
        engine.files.length +
        " files (" +
        bytes(totalLength) +
        ")"
    );
  });
};

for (let arg of input) {
  parsetorrent.remote(arg, function(err, parsedtorrent) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }

    setupEngine(parsedtorrent);
  });
};

var draw = function() {
  _speed = bytes(engine.swarm.downloadSpeed()) + "/s";
  speed = "{green:" + _speed + "}";
  peers = engine.swarm.wires.length + " peers";

  if (verified >= engine.torrent.pieces.length) {
    clivas.clear();
    clivas.line(" downloading last few pieces " + speed + " " + peers);
  } else {
    bar.tick(verified - prevLength, {
      speed: _speed.green,
      peers: peers
    });
  }
  prevLength = verified;
};
