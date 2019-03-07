window.onload = function () {
  /*
    区域滚动效果
    前提条件：父元素要包裹被滚动的元素，被滚动的子元素要大于父元素。将父元素传入IScroll对象中
  */
  new IScroll(document.querySelector(".jd_cateLeft"), {
    scrollX: false,
    scrollY: true
  });
  new IScroll(document.querySelector(".jd_cateRight"), {
    scrollX: false,
    scrollY: true
  });
};