//index.js
import Todo from '../../models/Todo'
import util from '../../utils/util'
import todoStore from '../../store/todoStore'

//获取应用实例
const app = getApp()

Page({
  data: {
    // todos
    todos: [],

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 为了新建后列表能更新，此逻辑必须写在 onShow 事件
    this.syncData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    this.syncData()
  },

  /**
   * 分享
   */
  onShareAppMessage: function (options) {

  },

  /**
   * 同步数据
   */
  syncData() {
    // 获取列表
    this.data.todos = todoStore.getTodos()
    this.update()
  },
  
  handleCompletedChange(e) {
    let uuid = e.currentTarget.dataset.uuid
    let original_todo=todoStore.getTodo(uuid)
    original_todo.repetition.pop()
    todoStore.editTodo(uuid,original_todo)
    todoStore.save()
  },
  
  handleForgot(e) {
    let uuid = e.currentTarget.dataset.uuid
    let original_todo=todoStore.getTodo(uuid)
    original_todo.repetition=util.getRepetitions(new Date())
    todoStore.editTodo(uuid,original_todo)
    todoStore.save()
    this.syncData()
  },


  /**
   *  tap 事件
   */
  handleTodoTap(e) {
    // 判断锁
    if (this.disableTap) return
    // 获取 uuid
    let uuid = e.currentTarget.dataset.uuid
    wx.navigateTo({
      url: '../todo/create?uuid=' + uuid
    })
  },

  /**
   *  longtap 事件
   */
  handleTodoLongTap(e) {
    // 加锁：避免触发 tap 事件
    this.disableTap = true
    // 获取 uuid
    let uuid = e.currentTarget.dataset.uuid
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这个笔记吗？',
      success: (e) => {
        if (e.confirm) {
          todoStore.removeTodo(uuid)
          todoStore.save()
          this.syncData()
        }
      }
    })
  },

  /**
   *  touched 事件
   */
  handleTodoTouched() {
    setTimeout(() => {
      // 解锁 tap 事件
      this.disableTap = false
    }, 200)
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    this.setData(data)
  },

  /**
   * 新建事件
   */
  handleAddTodo (e) {
    wx.navigateTo({
      url: '../todo/create'
    })
  }
})
