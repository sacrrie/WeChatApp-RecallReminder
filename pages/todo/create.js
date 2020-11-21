// pages/todos/create.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // todo
    edit: false,
    todo: new Todo(),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 是否编辑
    if (options.uuid) {
      this.data.edit = true
      let editTodo = todoStore.getTodo(options.uuid)
      this.data.todo = editTodo
    } else {
      this.data.todo = new Todo()
    }
    this.update()

  },

  /**
   * 分享
   */
  onShareAppMessage: function (options) {

  },

  /**
   * Todo 改变事件
   */
  handleTodoItemChange (e) {
    let todo = e.detail.data.todo
    Object.assign(this.data.todo, todo)
    this.update()
  },
  /**
   * title输入事件
   */
  handleTitleChange (e) {
    this.data.todo.title = e.detail.value
    this.update()
  },

  /**
   * 描述输入事件
   */
  handleDescChange (e) {
    this.data.todo.desc = e.detail.value
    this.update()
  },

  /**
   * 取消按钮点击事件
   */
  handleCancelTap (e) {
    wx.navigateBack()
  },

  
  /**
   * 保存按钮点击事件
   */
  handleSaveTap(e) {
    if (this.data.edit) {
      todoStore.editTodo(this.data.todo.uuid, this.data.todo)
    } else {
      todoStore.addTodo(this.data.todo)
    }
    todoStore.save()
    wx.navigateBack()
    wx.showToast({ title: '保存成功' })
  },


  /**
   * 更新数据
   */
  update (data) {
    data = data || this.data
    this.setData(data)
  }
})