# tget

tget is wget for torrents.

```
npm install -g t-get
```

## Usage

tget works with a magnet link.

```
tget "magnet:?xt=urn:btih:ef330b39f4801d25b4245212e75a38634bfc856e"
```

Remember to put `"` around your magnet link since they usually contain `&`.
`tget` will print a terminal interface.

## Credits usage

tget is built using the excellent [torrent-stream](https://github.com/mafintosh/torrent-stream) and draws heavy inspiration from [peerflix](https://github.com/mafintosh/peerflix)

## License

MIT
