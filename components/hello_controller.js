import { Controller } from '@hotwired/stimulus'

// Minimal controller proving the Stimulus setup works end to end.
export default class extends Controller {
  static targets = ['output']

  greet () {
    this.outputTarget.textContent = '¡Yo leo!'
  }
}
