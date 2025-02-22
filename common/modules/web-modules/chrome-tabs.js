((window, factory) => {
  if (typeof define == 'function' && define.amd) {
    define([], () => factory(window))
  } else if (typeof module == 'object' && module.exports) {
    module.exports = factory(window)
  } else {
    window.ChromeTabs = factory(window)
  }
})(window, (window) => {
  const TAB_CONTENT_MARGIN = 0
  const TAB_CONTENT_OVERLAP_DISTANCE = 1

  const TAB_OVERLAP_DISTANCE = (TAB_CONTENT_MARGIN * 2) + TAB_CONTENT_OVERLAP_DISTANCE

  const TAB_CONTENT_MIN_WIDTH = 140
  const TAB_CONTENT_MAX_WIDTH = 160

  const TAB_SIZE_SMALL = 84
  const TAB_SIZE_SMALLER = 60
  const TAB_SIZE_MINI = 48

  const noop = _ => {}

  const closest = (value, array) => {
    let closest = Infinity
    let closestIndex = -1

    array.forEach((v, i) => {
      if (Math.abs(value - v) < closest) {
        closest = Math.abs(value - v)
        closestIndex = i
      }
    })

    return closestIndex
  }

  const tabTemplate = `
    <div class="chrome-tab">
      <div class="chrome-tab-dividers"></div>
      <div class="chrome-tab-background"></div>
      <div class="chrome-tab-content">
        <div class="chrome-tab-favicon" hidden></div>
        <div class="chrome-tab-title"></div>
        <div class="chrome-tab-drag-handle"></div>
        <div class="chrome-tab-close"></div>
      </div>
    </div>
  `

  const defaultTapProperties = {
    name: 'New tab',
    title: 'New tab',
    favicon: false
  }

  let instanceId = 0

  class ChromeTabs {
    constructor() {
    }

    init(el) {
      this.el = el

      this.instanceId = instanceId
      this.el.setAttribute('data-chrome-tabs-instance-id', this.instanceId)
      instanceId += 1

      this.setupCustomProperties()
      $(this.el).on('click', '.chrome-tab', (event) => {
        this.setCurrentTab(event.currentTarget)
      })

      $(this.el).on('click', '.chrome-tab-close', (event) => {
        event.stopPropagation()
        const $tab = $(event.currentTarget).closest('.chrome-tab')
        if (!this.checkDestroy({ detail: { tabEl: $tab[0] } })) {
          return
        }
        this.removeTab($tab[0])
      })
    }

    emit(eventName, data) {
      this.el.dispatchEvent(new CustomEvent(eventName, { detail: data }))
    }

    setupCustomProperties() {
      this.el.style.setProperty('--tab-content-margin', `${ TAB_CONTENT_MARGIN }px`)
    }

    setupStyleEl() {
      this.styleEl = document.createElement('style')
      this.el.appendChild(this.styleEl)
    }

    get tabContentEl() {
      return this.el.querySelector('.x-scrollbar__content') ?? this.el.querySelector('.chrome-tabs-content')
    }

    createNewTabEl() {
      const div = document.createElement('div')
      div.innerHTML = tabTemplate
      return div.firstElementChild
    }

    addTab(tabProperties, { animate = false, background = false } = {}) {
      const tabEl = this.createNewTabEl()

      if (animate) {
        tabEl.classList.add('chrome-tab-was-just-added')
        setTimeout(() => tabEl.classList.remove('chrome-tab-was-just-added'), 500)
      }

      tabProperties = Object.assign({}, defaultTapProperties, tabProperties)
      this.tabContentEl.appendChild(tabEl)
      this.updateTab(tabEl, tabProperties)
      this.emit('created', { tabEl })
      if (!background) this.setCurrentTab(tabEl)
      return tabEl;
    }

    get activeTabEl() {
      return this.el.querySelector('.chrome-tab[active]')
    }

    hasActiveTab() {
      return !!this.activeTabEl
    }

    setCurrentTab(tabEl) {
      const activeTabEl = this.activeTabEl
      if (activeTabEl === tabEl) return
      if (activeTabEl) activeTabEl.removeAttribute('active')
      tabEl.setAttribute('active', '')
      this.emit('activeChange', { tabEl })
    }

    removeTab(tabEl) {
      const isActive = tabEl === this.activeTabEl
      let needActiveElem = null
      if (isActive) {
        if (tabEl.nextElementSibling) {
          needActiveElem = tabEl.nextElementSibling;
        } else if (tabEl.previousElementSibling) {
          needActiveElem = tabEl.previousElementSibling
        }
      }
      this.emit('beforeDestroy', { tabEl })
      tabEl.parentNode.removeChild(tabEl)
      this.emit('destroyed', { tabEl })
      if (isActive && needActiveElem) {
        this.setCurrentTab(needActiveElem)
      }
    }

    updateTab(tabEl, tabProperties) {
      if (tabProperties.name) {
        tabEl.querySelector('.chrome-tab-title').textContent = tabProperties.name
      }

      const faviconEl = tabEl.querySelector('.chrome-tab-favicon')
      if (tabProperties.favicon) {
        $(faviconEl).addClass(tabProperties.favicon)
        faviconEl.removeAttribute('hidden', '')
      }

      if (tabProperties.id) {
        tabEl.setAttribute('data-tab-id', tabProperties.id)
      }

      if (tabProperties.title) {
        tabEl.setAttribute('title', tabProperties.title)
      }

      if (tabProperties.type) {
        tabEl.setAttribute('data-tab-type', tabProperties.type)
      }

      if (tabProperties.attr) {
        for (let i in tabProperties.attr) {
          tabEl.setAttribute(i, tabProperties.attr[i])
        }
      }
    }

    checkDestroy(event) {
      return true
    }

    dispose() {
      this.el = null;
    }
  }

  return ChromeTabs
})
