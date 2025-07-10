import type { Directive } from 'vue'

export const vHover: Directive = {
  mounted(el) {
    el.addEventListener('mouseenter', () => {
      el.classList.add('hovered')
    })
    el.addEventListener('mouseleave', () => {
      el.classList.remove('hovered')
    })
  }
}