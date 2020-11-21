import Model from './Model'
import util from '../utils/util'


/**
 * Todo 模型类
 */
class Todo extends Model {
  constructor (model) {
    super()
    Object.assign(this, {
      title: '',
      desc: '',
      date: new Date(),
      level: 1,
      completed: false,
      createdAt: new Date(),
      completedAt: new Date(),
      repetition: []
    }, model)


    this.repetition=util.getRepetitions(this.createdAt)
  }
}

export default Todo
