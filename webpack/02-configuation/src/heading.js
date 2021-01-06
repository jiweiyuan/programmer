export default () => {
 const element =  document.createElement('h2')
 element.textContent = 'Hello Webpack!!!'
 element.addEventListener('click', () => {
   alert('Hello Webpack!')
 })
 return element
}