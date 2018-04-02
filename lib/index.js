import './stylesheets/styles.scss'
import COLORS from './data/colors'
const $ = require('jQuery')

$( document ).ready(function() {
  getTopColor()
  getSwatches()
})

$('textarea').on('keypress', function(e) {
  e.preventDefault();
  $('button').click()
})


const getTopColor = () => {
  fetch("https://color-swatch-api.herokuapp.com/api/v1/top_color")
  .then((response) => response.json())
  .then((topColor) => {
    appendColor(topColor)
  })
  .catch((error) => console.error({error}))
}

const appendColor = (topColor) => {
  let colorName = topColor.value
  $('.top-color').append(`${colorName}`)
}

const getSwatches = () => {
$('button').on('click', function() {
  let text = ($('textarea').val().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().split(' '))
  let uniqueWords = text.filter((word, i, array) => array.indexOf(word) === i)
  let dataColors = Object.keys(COLORS)
    for(var i = 0; i < uniqueWords.length; i++) {
      let color = uniqueWords[i]
      if(dataColors.includes(color)) {
          $('article.colorized-text').append(`<div class="swatch" style="background-color:${COLORS[color]};"></div>`)
        }
    }
    getColors(text, dataColors)
  })
}

const getColors = (text, dataColors) => {
  let anyColor = []
  text.forEach(function(word) {
    if(dataColors.includes(word)){
      anyColor.push(word)
    }
    return anyColor
  })
  postColor(anyColor)
}

const postColor = (colorsArray) => {
  colorsArray.forEach(function(color) {
    fetch("https://color-swatch-api.herokuapp.com/api/v1/colors",
      { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          color: {value: color}
          })
      })
    })
}
