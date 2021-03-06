let container = document.getElementById("main-demo")
let dat = require('../../node_modules/dat.gui/build/dat.gui.min.js')

window.onload = () => {
	let gui = new dat.GUI()
	let scc = new SvgCircularCircle()
	gui.add(scc, 'size', 10, 1000).onChange(scc.render)
	gui.add(scc, 'borderSize', 1, 5).onChange(scc.render)
	gui.add(scc, 'corridorSize', 10, 50).onChange(scc.render)
	gui.add(scc, 'doorSize', 0, 30).onChange(scc.render)
	gui.add(scc, 'rotate').onChange(scc.render)
	gui.addColor(scc, 'color').onChange(scc.render)
	gui.addColor(scc, 'bgcolor').onChange(scc.render)
	gui.add(scc, 'transparent').onChange(scc.render)
}

let SvgCircularCircle = function() {

	this.size = 200
	this.borderSize = 2
	this.corridorSize = 30
	this.doorSize = 10
	this.color = "#ffb52a"
	this.bgcolor = "#111"
	this.rotate = true
	this.transparent = false
	this.id = "scc-"+Math.round(Math.random()*100)

	this.createSVG = () => {
		let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		svg.setAttribute("width", this.size)
		svg.setAttribute("height", this.size)
		svg.setAttribute("id", this.id)
		container.appendChild(svg)
		for (var i = 0; i<this.size; i += this.corridorSize) {
			if (this.size-i>this.corridorSize) {
				this.makeCircle(svg,this.size-i)
			}
		}
	}

	this.makeCircle = (svg,size) => {
		let svgNS = "http://www.w3.org/2000/svg"
		let rect = document.createElementNS(svgNS,'path')
		rect.setAttributeNS(null,'d',this.describeArc(this.size/2,  this.size/2, size/2-size/10/5, 0, 359 - (this.size/size)*this.doorSize))
		rect.setAttributeNS(null,'stroke-width',this.borderSize)
		rect.setAttributeNS(null,'stroke',this.color)
		rect.setAttributeNS(null,"stroke-linecap", "round")
		rect.setAttributeNS(null,'fill',(!this.transparent)?this.bgcolor:"none")
		if (this.rotate) {
			rect.setAttributeNS(null,'transform','rotate('+Math.random()*360+','+this.size/2+', '+this.size/2+')')
		}
		svg.appendChild(rect)
	}

	this.polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
		var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0

		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians))
		}
	}

	this.describeArc = (x, y, radius, startAngle, endAngle) => {
		var start = this.polarToCartesian(x, y, radius, endAngle)
		var end = this.polarToCartesian(x, y, radius, startAngle)

		var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

		var d = [
		"M", start.x, start.y,
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
		]
		if (radius*2>this.corridorSize+2) {
			d.push("L", end.x, end.y+this.corridorSize/2)
		}

		return d.join(" ")
	}

	this.resetSVG = () => {
		if (document.getElementById(this.id)) {
			document.getElementById(this.id).outerHTML = ""
		}
	}

	this.render = () => {
		this.resetSVG()
		this.createSVG()
	}

	this.render()
}