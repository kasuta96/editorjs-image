/**
 * Build styles
 */
require("./index.css").toString()

/**
 * @class Trans
 * @classdesc Trans Tool for Editor.js
 * @property {TransData} data - Tool`s input and output data
 * @propert {object} api - Editor.js API instance
 *
 * @typedef {object} TransData
 * @description Trans Tool`s input and output data
 * @property {string} original - trans`s original
 * @property {string} translation - trans`s translation
 * @property {'paragraph'|'header'} option - trans`s option
 *
 * @typedef {object} TransConfig
 * @description Trans Tool`s initial configuration
 * @property {string} originalPlaceholder - placeholder to show in trans`s original input
 * @property {string} translationPlaceholder - placeholder to show in trans`s translation input
 * @property {'paragraph'|'header'} defaultOption - option to use as default
 */
class SimpleImage {
  static get toolbox() {
    return {
      title: "Image URL",
      icon: '<svg width="17" height="15" version="1.1" viewBox="0 0 700 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="c" d="m260 600v-100h-160v-140l120-100 100 120 80-70 18.18 19 50.86-41.48-69.04-77.52-80 70-100-120-120 100v-160l440 2.92v152.08h100v-207.48c0-26.24-21.28-47.52-47.52-47.52h-514.64c-44.01 0-79.65 35.75-79.5 79.76 0.33 104.05 1.08 337.53 1.41 441.86 0.14 43.33 35.31 78.38 78.64 78.38h181.61z"/><path id="a" d="m599.61 283.04-71.23 50.5 33.46 47.19 26.71-18.93 33.46 47.2-102.4 72.6-13.38-18.88-44.52 31.56 46.85 66.08 191.44-135.71-100.39-141.61z"/><path id="b" d="m417.63 630.25 71.19-50.57-33.51-47.16-26.69 18.96-33.51-47.17 102.32-72.69 13.4 18.86 44.49-31.61-46.91-66.03-191.31 135.9 100.53 141.51z"/></svg>',
    }
  }

  constructor({ data, api }) {
    this.api = api
    this.data = {
      url: data.url || "",
      caption: data.caption || "",
      withBorder: data.withBorder !== undefined ? data.withBorder : false,
      withBackground: data.withBackground !== undefined ? data.withBackground : false,
      stretched: data.stretched !== undefined ? data.stretched : false,
    }
    this.wrapper = undefined
    this.settings = [
      {
        name: "withBorder",
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`,
      },
      {
        name: "withBackground",
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`,
      },
      {
        name: "stretched",
        icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`,
      },
    ]
  }

  render() {
    this.wrapper = document.createElement("div")
    this.wrapper.classList.add("simple-image")

    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption)
      return this.wrapper
    }

    const input = document.createElement("input")

    input.placeholder = this.api.i18n.t("Paste an image URL")
    input.addEventListener("paste", (event) => {
      this._createImage(event.clipboardData.getData("text"))
    })
    this.wrapper.appendChild(input)
    return this.wrapper
  }

  _createImage(url, captionText) {
    const image = document.createElement("img")
    const caption = document.createElement("input")

    image.src = url
    const w = this.wrapper
    image.onload = function () {
      caption.placeholder = "Caption here"
      caption.value = captionText || ""
      w.innerHTML = ""
      w.appendChild(image)
      w.appendChild(caption)
    }
    image.onerror = function () {
      alert("image url not found")
    }
    this._acceptTuneView()
  }

  save(blockContent) {
    const image = blockContent.querySelector("img")
    const caption = blockContent.querySelector("input")

    return Object.assign(this.data, {
      url: image.src,
      caption: caption.value,
    })
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false
    }

    return true
  }

  renderSettings() {
    const wrapper = document.createElement("div")

    this.settings.forEach((tune) => {
      let button = document.createElement("div")

      button.classList.add("cdx-settings-button")
      button.classList.toggle("cdx-settings-button--active", this.data[tune.name])
      button.innerHTML = tune.icon
      wrapper.appendChild(button)

      button.addEventListener("click", () => {
        this._toggleTune(tune.name)
        button.classList.toggle("cdx-settings-button--active")
      })
    })

    return wrapper
  }

  /**
   * @private
   * Click on the Settings Button
   * @param {string} tune — tune name from this.settings
   */
  _toggleTune(tune) {
    this.data[tune] = !this.data[tune]
    this._acceptTuneView()
  }
  /**
   * Add specified class corresponds with activated tunes
   * @private
   */
  _acceptTuneView() {
    this.settings.forEach((tune) => {
      this.wrapper.classList.toggle(tune.name, !!this.data[tune.name])
    })
  }
}

module.exports = SimpleImage
