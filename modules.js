export const gameBoard = document.querySelector("#gameBoard")
export const context = gameBoard.getContext("2d")
export const scoreText = document.querySelector("#scoreText")
export const resetBtn = document.querySelector("#resetButton")
export const gameWidth = gameBoard.width
export const gameHeight = gameBoard.height
export const boardBackground = "rgb(107, 179, 189)"
export const paddleOneColor = "rgb(167, 50, 56)"
export const paddleTwoColor = "rgb(12, 143, 62)"
export const ballColor = "rgb(235, 238, 81)"
export const paddleBorder = "black"
export const ballBorderColor = "black"
export const ballRadius = 10
export const paddleSpeed = 100
export const paddleWidth = 23
export const paddleHeight = 130
export let intervalId
export let SPEED = 1.4
export let ballSpeed = SPEED
export let ballX = gameWidth / 2 - ballRadius
export let ballY = gameHeight / 2 - ballRadius
export let ballXDirection = 0
export let ballYDirection = 0
export let playerOneScore = 0
export let playerTwoScore = 0
export let x
export let y

let paddleOne = {
	width: paddleWidth,
	height: paddleHeight,
	x: 0,
	y: gameHeight / 2 - paddleHeight / 2,
}

let paddleTwo = {
	width: paddleWidth,
	height: paddleHeight,
	x: gameWidth - paddleWidth,
	y: gameHeight / 2 - paddleHeight / 2,
}

export function startGame() {
	createBall()
	nextTick()
}

export function nextTick() {
	intervalId = setTimeout(() => {
		clearBoard()
		drawPaddles()
		drawLines()
		moveBall()
		drawBall(ballX, ballY)
		checkCollision()
		nextTick()
	}, 10)
}

export function clearBoard() {
	context.fillStyle = boardBackground
	context.fillRect(0, 0, gameWidth, gameHeight)
}

export function drawLines() {
	context.strokeStyle = "black"
	context.beginPath()
	context.arc(gameWidth / 2, gameHeight / 2, 30, 0, Math.PI * 2)
	context.moveTo(gameWidth / 2, 0)
	context.lineTo(gameWidth / 2, gameHeight)
	context.moveTo(gameWidth / 2, gameHeight / 2)
	context.stroke()
}

export function drawPaddles() {
	context.strokeStyle = paddleBorder

	context.fillStyle = paddleOneColor
	context.fillRect(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height)
	context.strokeRect(
		paddleOne.x,
		paddleOne.y,
		paddleOne.width,
		paddleOne.height
	)

	context.fillStyle = paddleTwoColor
	context.fillRect(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height)
	context.strokeRect(
		paddleTwo.x,
		paddleTwo.y,
		paddleTwo.width,
		paddleTwo.height
	)
}

export function createBall() {
	if (Math.round(Math.random()) == 1) {
		ballXDirection = ballSpeed
	} else {
		ballXDirection = -ballSpeed
	}

	if (Math.round(Math.random()) == 1) {
		ballYDirection = ballSpeed
	} else {
		ballYDirection = -ballSpeed
	}
	ballX = gameWidth / 2
	ballY = gameHeight / 2
	drawBall(ballX, ballY)
}

export function moveBall() {
	ballX += ballSpeed * ballXDirection
	ballY += ballSpeed * ballYDirection
}

export function drawBall(x, y) {
	context.fillStyle = ballColor
	context.strokeStyle = ballBorderColor
	context.lineWidth = 2
	context.beginPath()
	context.arc(x, y, ballRadius, 0, 2 * Math.PI)
	context.stroke()
	context.fill()
}

export function checkCollision() {
	if (ballY <= 0 + ballRadius || ballY >= gameHeight - ballRadius) {
		ballYDirection *= -1
	}

	if (ballX <= 0 + ballRadius) {
		playerTwoScore += 1
		ballSpeed = SPEED
		updateScore()
		createBall()
		return
	}

	if (ballX >= gameWidth - ballRadius) {
		ballSpeed = SPEED
		playerOneScore += 1
		updateScore()
		createBall()
		return
	}

	if (ballX <= paddleOne.x + paddleOne.width + ballRadius) {
		if (ballY > paddleOne.y && ballY < paddleOne.y + paddleOne.height) {
			ballX = paddleOne.x + paddleOne.width + ballRadius
			ballXDirection *= -1
			ballSpeed += 0.2
		}
	}

	if (ballX >= paddleTwo.x - ballRadius) {
		if (ballY > paddleTwo.y && ballY < paddleTwo.y + paddleTwo.height) {
			ballX = paddleTwo.x - ballRadius
			ballXDirection *= -1
			ballSpeed += 0.2
		}
	}
}

export function updateScore() {
	scoreText.textContent = `${playerOneScore}:${playerTwoScore}`
}

export function changeDirection(event) {
	const keyPressed = event.keyCode
	const paddle1Up = 87
	const paddle1Down = 83
	const paddle2Up = 38
	const paddle2Down = 40

	switch (keyPressed) {
		case paddle1Up:
			if (paddleOne.y > 0) {
				paddleOne.y -= paddleSpeed
			}
			break
		case paddle1Down:
			if (paddleOne.y < gameHeight - paddleHeight) {
				paddleOne.y += paddleSpeed
			}
			break
		case paddle2Up:
			if (paddleTwo.y > 0) {
				paddleTwo.y -= paddleSpeed
			}
			break
		case paddle2Down:
			if (paddleTwo.y < gameHeight - paddleHeight) {
				paddleTwo.y += paddleSpeed
			}
			break
	}
}

export function resetGame() {
	playerOneScore = 0
	playerTwoScore = 0
	// scoreText.textContent = "0:0"
	paddleOne = {
		width: paddleWidth,
		height: paddleHeight,
		x: 0,
		y: gameHeight / 2 - paddleHeight / 2,
	}

	paddleTwo = {
		width: paddleWidth,
		height: paddleHeight,
		x: gameWidth - paddleWidth,
		y: gameHeight / 2 - paddleHeight / 2,
	}
	updateScore()
	clearInterval(intervalId)
	createBall()
	startGame()
}
