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

  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.min.js', function() {
    // anime({
    //   targets: 'a',
    //   translateX: 250,
    //   rotate: '1turn',
    //   duration: 800
    // })
    // anime({
    //   targets: ['.circle-logo', 'feTurbulence', 'feDisplacementMap'],
    //   points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
    //   baseFrequency: 0,
    //   scale: 1,
    //   loop: true,
    //   direction: 'alternate',
    //   easing: 'easeInOutExpo'
    // })
  })

  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js', function() {
    var animationTime = 3000 // in ms
    var reactLogo = Snap('.react-logo')
    reactLogo.click(animateLogo)
    var reactCircle = Snap('#react-circle')

    var reactEllipses = []

    reactEllipses[0] = Snap('#react-ellipse-0')
    reactEllipses[1] = Snap('#react-ellipse-1')
    reactEllipses[2] = Snap('#react-ellipse-2')
    animateLogo()

    function animateLogo() {
      reactCircle.attr({
        r: 0
      }).animate({
        r: 60
      }, animationTime * 1, mina.backout)

      reactEllipses.forEach(function(path, index) {
        path.attr({
          'stroke-dasharray': (path.getTotalLength()),
          'stroke-dashoffset': (Math.pow(-1, index) * path.getTotalLength())
        }).animate({
          'stroke-dashoffset': 0
        }, animationTime * 1, mina.backin)
      })

    }
  })



})
