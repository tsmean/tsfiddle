export function log(input) {
  const div = document.createElement('DIV');
  div.innerHTML = '> ' + input;
  document.getElementById('output').appendChild(div);
}
