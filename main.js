window.addEventListener('DOMContentLoaded', () => {

  consoleText(['Henry Stroud', 'Web Developer'], 'text',['tomato'])

  function consoleText(words, id, colors) {
    let visible = true
    const con = document.getElementById('console')
    let letterCount = 1
    let x = 1
    let waiting = false
    const target = document.getElementById(id)
    const chevron = document.getElementById('chevron')
    const scroll = document.getElementById('scroll')
    target.setAttribute('style', 'color:' + colors[0])
    const interval = window.setInterval(function() {
      if (letterCount === 14) {
        clearInterval(interval)
        chevron.className = 'fas fa-chevron-down visible animated bounceInDown'
        scroll.className = 'scroll-down animated fadeIn delay-1s'
      }
      if (letterCount === 0 && waiting === false) {
        waiting = true
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function() {
          const usedWord = words.shift()
          words.push(usedWord)
          x = 1
          target.setAttribute('style', 'color:' + colors[0])
          letterCount += x
          waiting = false
        }, 700)
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true
        window.setTimeout(function() {
          x = -1
          letterCount += x
          waiting = false
        }, 700)
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x
      }
    }, 100)
    window.setInterval(function() {
      if (visible === true) {
        con.className = 'console-underscore hidden'
        visible = false

      } else {
        con.className = 'console-underscore'

        visible = true
      }
    }, 330)
  }
})
