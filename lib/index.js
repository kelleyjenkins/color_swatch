import './stylesheets/styles.scss'
import COLORS from './data/colors'


const getTopColor = () => {
  fetch("https://color-swatch-api.herokuapp.com/api/v1/top_color")
  .then((response) => response.json())
  .then((topColor) => {
    appendColor(topColor)
  })
  .catch((error) => console.error({error}))
}

getTopColor()
