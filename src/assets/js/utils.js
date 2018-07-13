String.prototype.toMoney = function () {
  let s = this.split('.')
  let s0 = s[0]
  let end = s0.length % 3
  let arr = []
  if (end != 0) {
    arr.push(s0.substring(0, end))
  }
  let count = Math.floor(s0.length / 3)
  if (count > 0) {
    s0 = s0.substring(end)
    do {
      arr.push(s0.substring(0, 3))
      s0 = s0.substring(3)
    } while (s0.length)
  }
  s[0] = arr.join(',')
  return s.join('.')
}