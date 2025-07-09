import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Navbar from '../Navbar.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Navbar, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
