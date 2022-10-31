export const log = (...params) => {
  const logBox = document.getElementById('log');

  const li = document.createElement('li');
  li.innerHTML = params.join(' ');

  logBox.appendChild(li);
  logBox.scrollTop = logBox.clientHeight + logBox.scrollHeight;
}