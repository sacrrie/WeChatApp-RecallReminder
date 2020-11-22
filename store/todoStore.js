import util from '../utils/util'
import Store from './Store'
import Todo from '../models/Todo'

/**
 * NoteStore 类
 */
class TodoStore extends Store {
  constructor() {
    super()
    this.todos = []
    this.key = '__todos__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__todos_inited__', false)
    let isInited = wx.getStorageSync('__todos_inited__')
    if (isInited) return
    this.todos = this.todos.concat([new Todo({
      title: '欢迎使用复习提醒',
      createdAt: new Date('2010-5-20')
    }), new Todo({
      title: '点击左勾选框完成一项复习',
      createdAt: new Date('2010-5-20')
    }),
    new Todo({
      title: '点击下面的 + 新建一项复习项',
      createdAt: new Date('2010-5-20')
    }),
    new Todo({
      title: '没掌握点右边按钮重置',
      createdAt: new Date('2010-5-20')
    }),
    new Todo({
      title: '单击可以查看详情和修改',
      createdAt: new Date('2010-5-20')
    }),
    new Todo({
      title: '长按可删除复习项',
      createdAt: new Date('2010-5-20')
    }),])
    this.save()
    wx.setStorageSync('__todos_inited__', true)
  }

  /**
   * 获取 todos
   */
   
  getAllTodos() {
    return this.todos
  }
  
  /**
   * 获取今天应该复习的项目
   */
  getTodos () {
    let todos = this.todos
    let date = new Date()

    return todos.filter(item => new Date(item.repetition[item.repetition.length-1]) <= date)
  }
  
  /**
   * 获取所有完成的项目
   */
  getCompletedTodos () {
    let todos = this.todos

    return todos.filter(item => item.repetition.length===0)
  }

  /**
   * 获取 Todo
   */
  getTodo(uuid) {
    return this.todos.find((item) => item.uuid === uuid)
  }

  /**
   * 获取索引
   */
  getIndex(todo) {
    return this.todos.indexOf(todo)
  }


  /**
   * 设置
   */
  setTodos(todos) {
    this.todos = todos
  }

  /**
   * 清空
   */
  clearTodos() {
    this.todos = []
  }

  /**
   * 添加
   */
  addTodo(todo) {
    this.todos.push(todo)
  }
  /**
   * 编辑
   */
  editTodo(uuid, newTodo) {
    let todo = this.getTodo(uuid)
    if (todo) Object.assign(todo, newTodo)
  }


  /**
   * 根据uuid删除
   */
  removeTodo(uuid) {
    let todo = this.getTodo(uuid)
    let index = this.getIndex(todo)
    if (index < 0) return false
    return this.removeTodoByIndex(index)
  }

  /**
   * 根据索引删除
   */
  removeTodoByIndex(index) {
    this.todos.splice(index, 1)
    return true
  }


  /**
   * 读取
   */
  read() {
    let todos = wx.getStorageSync(this.key) || []
    this.todos = todos
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.todos)
  }

}

export default new TodoStore()