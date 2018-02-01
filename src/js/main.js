import Class from './module/Class'

function main() {
  const c = new Class()
  document.getElementById('module').innerHTML = c.message
}

main()
