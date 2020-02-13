import convert from "./convert.js"
import eventManager from "./eventManager.js"

convert.runIt();
eventManager.runIt();

$('.ui.dropdown')
  .dropdown({
    fullTextSearch: true
  })