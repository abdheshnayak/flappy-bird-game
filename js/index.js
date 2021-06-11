function Game() {
  var obj = this;

  obj.startAnimating = startAnimating;
  obj.putObstacle = putObstacle;
  obj.update = update;
  obj.animate = animate;
  obj.startAnimating = startAnimating;
  obj.stopGame = stopGame;
  obj.init = init;
  obj.bird;
  obj.ObsList;
  obj.Score;

  obj.PILLARS = ["pillor-down1", "pillor-down2", "pillor-down3"];

  const getCarClass = (obss) => {
    return obss[Math.floor(Math.random() * obss.length)];
  };

  document.getElementById("flappy-bird-high-score").innerText =
    localStorage["flappy-bird-high-score"] || 0;

  function init() {
    roadAnimator.classList.remove("animate");
    roadAnimator.classList.add("animate");
    document.getElementById("play").classList.add("hide");

    document.querySelector(".background").innerHTML = "";
    document.querySelector(".background").classList.remove("animate");

    document.querySelector(".background").classList.add("animate");

    this.bird = new Obstacle(70, 50, "bird", "obstacle", this, true);

    this.ObsList = [];
    obj.Score = 0;

    const flyEvent = (e) => {
      if (obj.bird.obs.classList.contains("crash")) {
        return;
      } else {
        obj.bird.velocity.y = 2.5;
      }
    };

    document
      .getElementById("fly-btn")
      .addEventListener("click", flyEvent, this);

    document
      .querySelector(".background")
      .addEventListener("click", flyEvent, this);
  }

  document.addEventListener("keypress", (e) => {
    if (obj.bird.obs.classList.contains("crash")) {
      if (e.key == "s") {
        obj.stop = false;
        obj.startAnimating(100);
      } else {
        return;
      }
    }

    if (e.code == "Space" || e.key == "0" || e.key == "a") {
      obj.bird.velocity.y = 2.5;
    }
  });

  var stop = false;
  var frameCount = 0;
  var fps, fpsInterval, startTime, now, then, elapsed;

  // initialize the timer variables and start the animation

  const roadAnimator = document.querySelector(".background");

  function putObstacle() {
    if (obj.ObsList.length <= 0) {
      obj.ObsList.push(
        new Obstacle(0, 100, getCarClass(obj.PILLARS), "obstacle", this)
      );
    }

    // if (obj.ObsList.length > 20) {

    //   return;
    // }

    for (var i = 0; i < obj.ObsList.length; i++) {
      let obs = obj.ObsList[i];

      if (!obs.checkXCollison(obj.ObsList, -5, 0.25)) {
        var y = Math.floor(Math.random() * (120 - 75) + 75);
        obj.ObsList.push(
          new Obstacle(-5, y, getCarClass(obj.PILLARS), "obstacle", this)
        );

        obj.ObsList.push(
          new Obstacle(
            -5,
            y - 100,
            getCarClass(obj.PILLARS),
            "obstacle-up",
            this
          )
        );

        return;
      }
    }
  }

  obj.roadSpeed = 1;

  function update(progress) {
    document.getElementById("score").innerText = Math.floor(obj.Score);
    document.getElementById("time").innerText = progress + " sec";
    document.getElementById("flappy-bird-high-score").innerText =
      localStorage["flappy-bird-high-score"] || 0;

    obj.bird.runBird();

    obj.putObstacle();

    obj.ObsList.forEach((obs, index) => {
      obs.run(obs, 0.25 * (3 + (1 * progress) / 10), obj.ObsList);
      if (obs.findCollison(obs, obj.bird)) {
        // stop the game bird died
        stop = true;

        roadAnimator.classList.remove("animate");
        document.querySelector(".background").classList.remove("animate");

        document.getElementById("play").classList.remove("hide");

        obj.bird.obs.classList.add("crash");

        // alert(game)
      }
    });
  }

  function stopGame() {
    stop = true;
  }

  function startAnimating(fps) {
    obj.init();
    stop = false;
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    // console.log(that);
    obj.animate();
  }
  function animate() {
    // request another frame

    if (stop) {
      return;
    }
    // console.log("running");

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)

      then = now - (elapsed % fpsInterval);

      timeInterval = Math.floor(
        (new Date(then).getTime() - new Date(startTime).getTime()) / 1000
      );
      obj.update(timeInterval);
      // Put your drawing code here
    }
  }

  // obj.startAnimating(50);
}

const x = new Game();
// x.startAnimating(100);

document.getElementById("play-btn").addEventListener("click", (e) => {
  x.startAnimating(100);
});
console.log("sttoped");
