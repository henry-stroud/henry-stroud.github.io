/* global Waypoint, d3, Glider */
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

  new Waypoint({
    element: document.querySelector('#skill-title'),
    handler: function() {
      // anime({
      //   targets: '#skill-title',
      //   translateX: 250,
      //   duration: 3000
      // })
    },
    offset: '100%'
  })

  //   var ctx = document.getElementById('myChart').getContext('2d');
  // var chart = new Chart(ctx, {
  //     // The type of chart we want to create
  //     type: 'bar',
  //
  //     // The data for our dataset
  //     data: {
  //         labels: ['JavaScript', 'February', 'March', 'April', 'May', 'June', 'July'],
  //         datasets: [{
  //             label: 'My First dataset',
  //             backgroundColor: 'rgb(255, 99, 132)',
  //             borderColor: 'rgb(255, 99, 132)',
  //             data: [0, 10, 5, 2, 20, 30, 45]
  //         }]
  //     },
  //
  //     // Configuration options go here
  //     options: {}
  // });

  new Waypoint({
    element: document.querySelector('.bubble'),
    handler: function() {
      let data = [
        {
          cat: 'framework', name: 'ExpressJS', value: 30,
          icon: 'img/express.png'
        }, {
          cat: 'framework', name: 'ReactJS', value: 100,
          icon: 'img/react.png'
        }, {
          cat: 'tooling', name: 'Atom', value: 10,
          icon: 'img/atom.png'
        }, {
          cat: 'tooling', name: 'Google Chrome & Devtools', value: 70,
          icon: 'img/chrome-devtools.svg'
        }, {
          cat: 'backend', name: 'MongoDB', value: 70,
          icon: 'img/mongodb.png'
        }, {
          cat: 'backend', name: 'NodeJS', value: 100,
          icon: 'img/nodejs.png'
        }, {
          cat: 'language', name: 'HTML5', value: 100,
          icon: 'img/html5.png'
        }, {
          cat: 'language', name: 'JavaScript', value: 100,
          icon: 'img/javascript.png'
        }, {
          cat: 'language', name: 'SASS', value: 20,
          icon: 'img/sass.png'
        }, {
          cat: 'language', name: 'CSS3', value: 30,
          icon: 'img/css3.svg'
        }, {
          cat: 'workflow', name: 'Bulma', value: 30,
          icon: 'img/bulma-logo.png'
        }, {
          cat: 'workflow', name: 'npm', value: 100,
          icon: 'img/npm.png'
        } , {
          cat: 'workflow', name: 'BabelJS', value: 50,
          icon: 'img/babel.png'
        }, {
          cat: 'workflow', name: 'Python', value: 70,
          icon: 'img/python.png'
        }, {
          cat: 'workflow', name: 'Flask', value: 30,
          icon: 'img/flask.png'
        }, {
          cat: 'workflow', name: 'PostgresQL', value: 40,
          icon: 'img/postgresql-logo.png'
        }, {
          cat: 'workflow', name: 'GitHub', value: 70,
          icon: 'img/github.svg'
        }, {
          cat: 'workflow', name: 'Mocha', value: 50,
          icon: 'img/mocha.svg'
        }, {
          cat: 'workflow', name: 'Photoshop', value: 20,
          icon: 'img/photoshop.svg'
        }, {
          cat: 'workflow', name: 'Illustrator', value: 20,
          icon: 'img/illustrator.png'
        }, {
          cat: 'workflow', name: 'Ableton', value: 20,
          icon: 'img/ableton.png'
        }, {
          cat: 'workflow', name: 'Webpack', value: 30,
          icon: 'img/webpack.svg'
        }, {
          cat: 'legacy', name: 'jQuery', value: 50,
          icon: 'img/jquery.png'
        }]

      const svg = d3.select('.bubble')
      const width = document.body.clientWidth
      const height = +svg.attr('height')
      const centerX = width * 0.25
      const centerY = height * 0.25
      const strength = 0.05

      const format = d3.format(',d')

      const scaleColor = d3.scaleOrdinal(d3.schemeCategory20c)

      const pack = d3.pack()
        .size([width , height ])
        .padding(1.5)

      const forceCollide = d3.forceCollide(d => d.r + 1)

      const simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody())
        .force('collide', forceCollide)
        .force('x', d3.forceX(centerX ).strength(strength))
        .force('y', d3.forceY(centerY ).strength(strength))

      if ('matchMedia' in window && window.matchMedia('(max-device-width: 767px)').matches) {
        data = data.filter(el => {
          return el.value >= 50
        })
      }

      const root = d3.hierarchy({ children: data })
        .sum(d => d.value)


      const nodes = pack(root).leaves().map(node => {
        console.log('node:', node.x, (node.x - centerX) * 2)
        const data = node.data
        return {
          x: centerX + (node.x - centerX) * 3, // magnify start position to have transition to center movement
          y: centerY + (node.y - centerY) * 3,
          r: 0, // for tweening
          radius: node.r, //original radius
          id: data.cat + '.' + (data.name.replace(/\s/g, '-')),
          cat: data.cat,
          name: data.name,
          value: data.value,
          icon: data.icon,
          desc: data.desc
        }
      })
      simulation.nodes(nodes).on('tick', ticked)

      svg.style('background-color', '#031e43')
      const node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', 'node')
        .call(d3.drag()
          .on('start', (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.2).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (d) => {
            d.fx = d3.event.x
            d.fy = d3.event.y
          })
          .on('end', (d) => {
            if (!d3.event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          }))

      node.append('circle')
        .attr('id', d => d.id)
        .attr('r', 0)
        .style('fill', () => d3.rgb(0, 128, 0, 0))
        .style('stroke', () => d3.rgb('#ffffff'))
        .transition().duration(5000).ease(d3.easeCubic)
        .tween('circleIn', (d) => {
          const i = d3.interpolateNumber(0, d.radius)
          return (t) => {
            d.r = i(t)
            simulation.force('collide', forceCollide)
          }
        })

      node.append('clipPath')
        .attr('id', d => `clip-${d.id}`)
        .append('use')
        .attr('xlink:href', d => `#${d.id}`)

      node.filter(d => !String(d.icon).includes('img/'))
        .append('text')
        .classed('node-icon', true)
        .attr('clip-path', d => `url(#clip-${d.id})`)
        .selectAll('tspan')
        .data(d => d.icon.split(';'))
        .enter()
        .append('tspan')
        .attr('x', 0)
        .attr('y', (d, i, nodes) => (13 + (i - nodes.length / 2 - 0.5) * 10))
        .text(name => name)

      node.filter(d => String(d.icon).includes('img/'))
        .append('image')
        .classed('node-icon', true)
        .attr('clip-path', d => `url(#clip-${d.id})`)
        .attr('xlink:href', d => d.icon)
        .attr('x', d => - d.radius * 0.7)
        .attr('y', d => - d.radius * 0.7)
        .attr('height', d => d.radius * 2 * 0.7)
        .attr('width', d => d.radius * 2 * 0.7)

      node.append('title')
        .text(d => (d.cat + '::' + d.name + '\n' + format(d.value)))

      const legendOrdinal = d3.legendColor()
        .scale(scaleColor)
        .shape('circle')

      svg.append('g')
        .classed('legend-color', true)
        .attr('text-anchor', 'start')
        .attr('transform','translate(20,30)')
        .style('font-size','12px')
        .call(legendOrdinal)

      const sizeScale = d3.scaleOrdinal()
        .domain(['less use', 'more use'])
        .range([5, 10] )

      const legendSize = d3.legendSize()
        .scale(sizeScale)
        .shape('circle')
        .shapePadding(10)
        .labelAlign('end')

      svg.append('g')
        .classed('legend-size', true)
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(150, 25)')
        .style('font-size', '12px')
        .call(legendSize)


      const infoBox = node.append('foreignObject')
        .classed('circle-overlay hidden', true)
        .attr('x', -350 * 0.5 * 0.8)
        .attr('y', -350 * 0.5 * 0.8)
        .attr('height', 350 * 0.8)
        .attr('width', 350 * 0.8)
        .append('xhtml:div')
        .classed('circle-overlay__inner', true)

      infoBox.append('h2')
        .classed('circle-overlay__title', true)
        .text(d => d.name)

      infoBox.append('p')
        .classed('circle-overlay__body', true)
        .html(d => d.desc)

      function ticked() {
        node
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .select('circle')
          .attr('r', d => d.r)
      }
      this.destroy()
    },
    offset: '50%'
  })

  new Waypoint({
    element: document.querySelector('.logos'),
    handler: function() {
      $('.logos').attr( 'data-aos', 'undraw' )
    },
    offset: '30%'
  })

  const path = document.querySelector('#player-connect path')
  const totalLength = path.getTotalLength()

  const path2 = document.querySelector('#youbet-logo path')
  const totalLength2 = path2.getTotalLength()

  const path3 = document.querySelector('#logo-a path')
  const totalLength3 = path3.getTotalLength()

  const path4 = document.querySelector('#battleship path')
  const totalLength4 = path4.getTotalLength()

  console.log(totalLength4, 'battleship')

  console.log(totalLength3, 'logo a')

  console.log(totalLength2, 'youbet path ')

  console.log(totalLength, 'player connect path')

  // new Waypoint({
  //   element: document.querySelector('.logos'),
  //   handler: function() {
  //     $('.logos').css({
  //       display: 'none'
  //     })
  //   },
  //   offset: '-20%'
  // })

  new Glider(document.querySelector('.glider'), {
    slidesToShow: '1',
    dots: '#dots',
    draggable: false,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  })

  const youBet = document.querySelector('#youbet-image')

  youBet.addEventListener('click', () => {

  })

  // const dots = document.querySelectorAll('#dots')
  // console.log(dots, 'THESE')

  // if (dots.classList.includes('active')) {
  //   console.log(dots, 'activo')
  // }

  const allDots = document.querySelectorAll('#dots')

  console.log(allDots[0].childNodes, 'dots')

  const $youBetLogo = $('.youbet-logo')
  const $playerConnectLogo = $('.player-connect-logo')


  // allDots[0].childNodes.forEach((x) => {
  //   x.addEventListener('click', (e) => {
  //     console.log(e.target.getAttribute('data-index'))
  //     if (e.target.getAttribute('data-index') === '0') {
  //       console.log(e.target, 'this node is active')
  //       $youBetLogo.removeClass('removed')
  //       $youBetLogo.addClass('display')
  //       $playerConnectLogo.removeClass('display')
  //       $playerConnectLogo.addClass('removed')
  //     }
  //     if (e.target.getAttribute('data-index') === '1') {
  //       console.log(e.target, 'this node is active')
  //       $youBetLogo.addClass('removed')
  //       $youBetLogo.removeClass('display')
  //       $playerConnectLogo.addClass('display')
  //       $playerConnectLogo.removeClass('removed')
  //     }
  //     if (e.target.getAttribute('data-index') === '2') {
  //       console.log(e.target, 'this node is active')
  //       $youBetLogo.addClass('removed')
  //       $youBetLogo.removeClass('display')
  //     }
  //     if (e.target.getAttribute('data-index') === '3') {
  //       console.log(e.target, 'this node is active')
  //       $youBetLogo.addClass('removed')
  //       $youBetLogo.removeClass('display')
  //     }
  //   })
  // })



  // $(function() {
  //   $(window).scroll(function () {
  //     if ($(this).scrollTop() > 500) {
  //       $('*').addClass('changeColor')
  //     }
  //     if ($(this).scrollTop() < 500) {
  //       $('*').removeClass('changeColor')
  //     }
  //   })
  // })

})
