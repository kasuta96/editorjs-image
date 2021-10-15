# Simple Image tool for EditerJs

[Editer.js](https://editorjs.io/)

- Add image by url

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    simpleImage: SimpleImage,
  },

  ...
});
```

## output data

```json
{
  "type": "simpleImage",
  "data": {
    "file": {
      "url": "https://example.com/image.jpg",
      "w": 1080,
      "h": 720
    },
    "caption": "caption here",
    "withBorder": true,
    "withBackground": false,
    "stretched": false
  }
}
```
