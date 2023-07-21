export function createElement1(type, text, parent, className, href, src) {
  let element = document.createElement(type)

  if(text !== undefined) {element.textContent = text}
  if(className !== undefined) {element.className = className}
  if(href !== undefined) {element.href = href}
  if(src !== undefined) {element.src = src}

  parent.appendChild(element)
  return element
}