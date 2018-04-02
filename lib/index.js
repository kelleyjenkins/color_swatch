import './stylesheets/styles.scss'
import COLORS from './data/colors'
const $ = require('jQuery')


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

getTopColor()


$('button').on('click', function() {
  let text = $('textarea').val().replace(/[^\w\s]|_/g, "").toLowerCase().split(" ")
  let uniqueWords = text.filter(function(word, i, array){ return array.indexOf(word) === i; })
  let dataColors = Object.keys(COLORS)
  const getColorSwatch = (uniqueWords, dataColors) => {
    for(var i = 0; i < uniqueWords.length; i++) {
      console.log(uniqueWords)
      let color = uniqueWords[i]
      if(dataColors.includes(color)) {
          $('article.colorized-text').append(`<div class="swatch" style="background-color:${COLORS[color]};"></div>`)
        }
      }
    }
  })
