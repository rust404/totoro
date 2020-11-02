const code = `
/* 手把手教你画一只龙猫 */
/* 第一步，添加上背景颜色 */
.container {
  height: 50%;
  background-color: #7e7667;
}

.inner {
  position: relative;
  max-width: 450px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}

/* 第二步，添加两只眼睛 */
.eye {
  position: absolute;
  top: 20%;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
}

.eye::before {
  position: absolute;
  top: 50%;
  display: block;
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #000;
}

.eye.left {
  left: 15%;
}
.eye.left::before {
  right: 0;
  transform: translate(0%, -50%);
}
.eye.right {
  right: 15%;
}
.eye.right::before {
  left: 0;
  transform: translate(0%, -50%);
}

/* 第三步 画上鼻子 */
.nose {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 40px;
  height: 10px;
  border-radius: 20px/5px;
  background-color: #000;
}
.nose::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  display: block;
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #000;
}

/* 第四步，画上它的大肚子 */
.tummy {
  position: absolute;
  left: 50%;
  bottom: -55vh;
  transform: translate(-50%);
  width: 100vh;
  height: 80vh;
  border-radius: 50vh/40vh;
  background-color: #ddc67a;
}

/* 最后，画上它肚子上的几个小月牙 */
.moon {
  position: absolute;
  top: 10%;
  left: 50%;
  width: 60px;
  height: 40px;
  border-radius: 30px/20px;
  background-color: transparent;
  box-shadow: 0 -8px 0 0 #7e7667;
}
.moon.one {
  top: 50px;
  left: 43%;
  transform: translate(-50%);
}
.moon.two {
  top: 80px;
  left: 30%;
  transform: translate(-50%);
}
.moon.three {
  top: 100px;
  left: 45%;
  transform: translate(-50%);
}
.moon.four {
  top: 70px;
  left: 60%;
  transform: translate(-50%);
}
.moon.five {
  top: 100px;
  left: 70%;
  transform: translate(-50%);
}

/* 大功告成! */
`
class Engine {
  constructor(options) {
    this.codePanel = document.querySelector(options.codePanel)
    this.codeContainer = this.codePanel.querySelector('code')
    this.styleContainer = document.createElement('style')
    this.codeContainer.innerHTML = ''
    document.head.appendChild(this.styleContainer)
    this.styleContent = options.styleContent
    this.timer = null
    this.position = 0
    this.gap = 50
    this.step = 5
  }
  getSpeed() {
    return 1000 / this.gap * this.step
  }
  start() {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      const str = this.read()
      if (str === undefined) {
        this.stop()
        return
      }
      const curContent = this.styleContent.slice(0, this.position)
      this.codeContainer.innerHTML = curContent
      this.styleContainer.innerHTML = curContent
      hljs.highlightBlock(this.codeContainer);
      this.codePanel.scrollTo(0, 999999)
    }, this.gap)
  }
  stop() {
    clearInterval(this.timer)
  }
  speedUp() {
    this.stop()
    this.step = this.step + 1 <= 10 ? this.step + 1 : this.step
    this.start()
  }
  slowDown() {
    this.stop()
    this.step = this.step - 1 >= 1 ? this.step - 1 : this.step
    this.start()
  }
  skip() {
    this.stop()
    this.position = 0
    this.codeContainer.innerHTML = this.styleContent
    this.styleContainer.innerHTML = this.styleContent
    hljs.highlightBlock(this.codeContainer);
  }
  read() {
    const str = this.styleContent.slice(this.position, this.position+this.step)
    this.position += this.step
    return str
  }
}

const engine = new Engine({
  codePanel: '#codePanel',
  styleContent: code
})
engine.start()

document.querySelector('#skipBtn').addEventListener('click', () => {
  engine.skip()
})
document.querySelector('#startBtn').addEventListener('click', () => {
  engine.start()
})
document.querySelector('#stopBtn').addEventListener('click', () => {
  engine.stop()
})
document.querySelector('#speedUpBtn').addEventListener('click', () => {
  engine.speedUp()
})
document.querySelector('#slowDownBtn').addEventListener('click', () => {
  engine.slowDown()
})
