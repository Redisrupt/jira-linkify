export const toggleStyles = noMaxWidth => {
  const ele = document.querySelector('.application-main');
  if (noMaxWidth) {
    ele.classList.add('max');
  } else {
    ele.classList.remove('max');
  }
};
