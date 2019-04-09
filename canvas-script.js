function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}
function randFloat(min, max) {
	return Math.random() * (max - min) + min
}

function randFromArray(array) {
	return array[Math.floor(Math.random() * array.length)]
}

function getAngle(x, y) {
	var angle = Math.atan2(y, x) //radians
	// you need to devide by PI, and MULTIPLY by 180:
	// var degrees = (angle * 180) / Math.PI //degrees
	// var degrees = (angle * Math.PI) / 180 //degrees
	return angle
	// return (360 + Math.round(degrees)) % 360
}

var canvas = document.querySelector('#triangles')
var sectionPictures = document.querySelector('.section-pictures')
var ctx = canvas.getContext('2d')
var width = sectionPictures.offsetWidth
var height = sectionPictures.offsetHeight
var triangleCount = 200
var size = 10
var minSpeed = 0.1
var maxSpeed = 1.5
var triangles = []
// var colors = ['#0a315a', '#041f3a', '#0d4b8d', '#673ab7']
var colors = ['#041f3a', '#0d4b8d', '#673ab7']

function canvasSize() {
	width = sectionPictures.offsetWidth
	height = sectionPictures.offsetHeight
	canvas.width = width
	canvas.height = height
}
canvasSize()
window.addEventListener('resize', canvasSize)

window.addEventListener('DOMContentLoaded', function(event) {
	canvasSize()

	for (var i = 0; i < triangleCount; i++) {
		triangles.push(
			new Triangle(randInt(width), randInt(height), randFromArray(colors))
		)
	}

	paint()
})

function paint() {
	ctx.translate(0, 0)
	ctx.clearRect(0, 0, width, height)
	triangles.forEach(function(elem) {
		elem.update()
	})

	window.requestAnimationFrame(paint)
}

function Triangle(x, y, color) {
	this.x = x || width / 2
	this.y = y || height / 2
	this.size = 20
	this.color = color || colors[0]
	if (Math.random() > 0.5) {
		this.velocityX = randFloat(minSpeed * -1, maxSpeed * -1)
		this.velocityY = randFloat(minSpeed * -1, maxSpeed * -1)
	} else {
		this.velocityX = randFloat(minSpeed, maxSpeed)
		this.velocityY = randFloat(minSpeed, maxSpeed)
	}
	this.angle = 0
	this.setAngle = function() {
		this.angle = getAngle(this.velocityX, this.velocityY)
		this.angle += 1.5
	}
	this.setAngle()

	this.update = function() {
		this.x += this.velocityX
		this.y += this.velocityY
		if (this.x < 0) {
			this.x = 1
			this.velocityX = this.velocityX * -1
			this.setAngle()
		}
		if (this.x > width - this.size * 2) {
			this.x = width - this.size * 2
			this.velocityX = this.velocityX * -1
			this.setAngle()
		}
		if (this.y < 0) {
			this.y = 1
			this.velocityY = this.velocityY * -1
			this.setAngle()
		}
		if (this.y > height - this.size * 2) {
			this.y = height - this.size * 2
			this.velocityY = this.velocityY * -1
			this.setAngle()
		}
		ctx.save()
		ctx.fillStyle = this.color
		ctx.translate(this.x, this.y)
		ctx.rotate(this.angle)
		ctx.beginPath()
		ctx.moveTo(-10, 10)
		ctx.lineTo(0, -10)
		ctx.lineTo(10, 10)
		ctx.closePath()
		ctx.fill()
		ctx.restore()
	}
}
