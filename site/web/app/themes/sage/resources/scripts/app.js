/**
 * External Dependencies
 */
import 'jquery'
import Experience from './Experience/Experience.js'
import { Navegacion } from './header.js'
import { PostHeader } from './postHeader.js'
import {Infescrol} from './infiniteScroll.js'
import { RollThumb } from './academic.js'

let w = window.innerWidth

$(() => {
    // Front page
    if (document.body.classList.contains('home') && w > 791) {
      const experience = new Experience(document.querySelector('canvas.webgl'))
    }

    // Navegación
    const navegación = new Navegacion

    // single page
    if (document.body.classList.contains('single')) {
      const postHeader = new PostHeader
    }

    // // Academic archive
    // if (document.body.classList.contains('post-type-archive-academic')  && w >= 768) {
    //   const rollThumb = new RollThumb
    // }

    // if (document.body.classList.contains('post-type-archive-project') || document.body.classList.contains('post-type-archive-story') || document.body.classList.contains('post-type-archive-academic')) {
    //   const infescrol = new Infescrol
    // }
});

let instance = null

const app = {
  infescrol: () => {

    if (document.body.classList.contains('post-type-archive-project') || document.body.classList.contains('post-type-archive-story') || document.body.classList.contains('post-type-archive-academic') || document.body.classList.contains('tax-project_type')) {
      return new Infescrol()
    }
  },

  rollThumb: () => {
    if (document.body.classList.contains('post-type-archive-academic')) {
      return new RollThumb()
    }
  }
}

app.infescrol()
app.rollThumb()

export default app