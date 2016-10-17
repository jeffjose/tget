# tget

tget is wget for torrents.

```
npm install -g t-get
```

## Usage

tget works with a magnet link or a torrent file.

```
tget 'magnet:?xt=urn:btih:0403fb4728bd788fbcb67e87d6feb241ef38c75a'
```

Remember to put `"` around your magnet link since they usually contain `&`.
`tget` will print a terminal interface.

![tget](https://raw.github.com/jeffjose/tget/master/tget.png)

## Credits

tget is built using the excellent [torrent-stream](https://github.com/mafintosh/torrent-stream) and draws heavy inspiration from [peerflix](https://github.com/mafintosh/peerflix)

## License

MIT
