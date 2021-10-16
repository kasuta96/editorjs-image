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
    "url": "https://example.com/image.jpg",
    "caption": "caption here",
    "withBorder": true,
    "withBackground": false,
    "stretched": false
  }
}
```
