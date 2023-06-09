//下拉动画
export function animation(obj, target, fn1) {
  // console.log(fn1);
  // fn是一个回调函数，在定时器结束的时候添加
  // 每次开定时器之前先清除掉定时器
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    // 步长计算公式  越来越小
    // 步长取整
    var step = (target - obj.scrollTop) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer);
      // 如果fn1存在，调用fn
      if (fn1) {
        fn1();
      }
    } else {
      // 每30毫秒就将新的值给obj.left
      obj.scrollTop = obj.scrollTop + step;
    }
  }, 10);
}

/**
 * 创建SSE长连接对象
 * @param {string} url url
 * @param {(ev) => void)} onOpen 连接成功时
 * @param {(ev) => void)} onMessage 接收到消息时
 * @param {(ev) => void)} onError 发生错误时
 * @returns 对象
 */
export function createSSE(url, onOpen = () => {}, onMessage = () => {}, onError = () => {}) {
  let source = new EventSource(url)
  source.onopen = event => {
    onOpen(event);
  }
  source.onmessage = event => {
    onMessage(event);
  }
  source.onerror = event => {
    onError(event);
  }
  return source;
}