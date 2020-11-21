const formatTime = (date, hasTime) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  let result = [year, month, day].map(formatNumber).join('/')
  if (hasTime) {
    result = result + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  return result
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const addDays = (date,days)=>{
    let ans=new Date(date)
    ans.setDate(ans.getDate()+days)
    return ans
    }

const getRepetitions=(date)=>{
    let ans=[]
    const repetitonSpaces=[60,35,16,7,1]
    for (let i=0;i<repetitonSpaces.length;i++){
        ans.push(addDays(date,repetitonSpaces[i]))
        }
    return ans
}

module.exports = {
  formatTime: formatTime,
  uuid: uuid,
  addDays: addDays,
  getRepetitions: getRepetitions
}
