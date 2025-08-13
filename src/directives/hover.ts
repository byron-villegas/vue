import type { Directive } from 'vue'

export const vHover: Directive = {
  mounted(element) {
    element.addEventListener('mouseenter', () => {
      element.classList.add('hovered');
    });

    element.addEventListener('mouseleave', () => {
      element.classList.remove('hovered');
    });
  }
}