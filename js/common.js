/*当页面的DOM元素加载完成时执行 --- 解决移动端click事件300ms延迟*/
document.addEventListener('DOMContentLoaded', function() {
  /*初始化方法*/
  FastClick.attach(document.body);
}, false);