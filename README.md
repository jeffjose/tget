<p>
  <a href="https://www.npmjs.com/package/t-get">
    <img alt="tget is wget for torrents" src="https://raw.github.com/jeffjose/tget/master/banner.png">
  </a>
</p>

# tget

[tget](https://www.npmjs.com/package/t-get) is wget for torrents.

```
yarn global add t-get

# if you use npm
npm install -g t-get

# on Arch based distros you can install from the aur
yay -S nodejs-tget
```

## Usage

tget works with a magnet link or a torrent file.

```
tget 'magnet:?xt=urn:btih:0403fb4728bd788fbcb67e87d6feb241ef38c75a'
```

![tget](https://raw.github.com/jeffjose/tget/master/screenshot.png)

## Credits

`tget` is built using the excellent [torrent-stream](https://github.com/mafintosh/torrent-stream) and draws heavy inspiration from [peerflix](https://github.com/mafintosh/peerflix)

## License

MIT
