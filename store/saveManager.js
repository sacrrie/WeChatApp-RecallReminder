import todoStore from './todoStore'

/**
 * store 管理类
 */
export default {
  /**
   * 读取
   */
  read() {
    todoStore.read()
  },

  /**
   * 保存
   */
  save() {
    todoStore.save()
  }
}
