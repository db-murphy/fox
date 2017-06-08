import Vue from 'vue'
import Header from 'src/components/Icons/TabClose/TabClose'

describe('Header.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Header)
    })
    expect(vm.$el.querySelector('i').className)
      .to.equal('icon-tab-close')
  })
})
