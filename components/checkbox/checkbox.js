// components/checkbox/checkbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  ready() {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleToggle (e) {
      if (this.data.checked) {
        this.data.checked = !this.data.checked
        this.setData(this.data)
        this.triggerEvent('uncheck', this)
          }
        else {
        this.data.checked = !this.data.checked
        this.setData(this.data)
        this.triggerEvent('check', this)
            
            }
    }
  }
})
