function Obstacle(x, y, obstacle, obsType, MainObj, notreverse) {
  that = this;

  that.obstacle = obstacle;

  that.x = x;
  that.y = y;

  that.getX = (value) => {
    var gameBox = document.getElementById("game-wrapper");
    const fullWidth = gameBox.clientWidth;
    const result = (value * fullWidth) / 100;
    return result;
  };

  that.getY = (value) => {
    var gameBox = document.getElementById("game-wrapper");
    const fullHeight = gameBox.clientHeight;
    const result = (value * fullHeight) / 100;
    return result;
  };

  that.putobs = () => {
    var obs = document.createElement("span");

    obs.classList.add(obstacle);

    obs.classList.add(obsType);

    obs.style.right = that.x + "%";
    obs.style.top = that.y + "%";

    that.obs = obs;

    var gameBox = document.getElementById("game-wrapper");

    gameBox.appendChild(obs);
  };

  that.findCollison = (obs1, obs2) => {
    if (obs1 == obs2) {
      return;
    }
    var rect1 = {
      x: that.getX(obs1.x),
      y: that.getY(obs1.y),
      width: obs1.obs.clientWidth,
      height: obs1.obs.clientHeight,
    };

    var rect2 = {
      x: that.getX(obs2.x),
      y: that.getY(obs2.y),
      width: obs2.obs.clientWidth,
      height: obs2.obs.clientHeight,
    };

    if (
      Math.abs(rect1.x - rect2.x) <
        Math.abs(rect1.width / 2 + rect2.width / 2) - 5 &&
      Math.abs(rect1.y - rect2.y) <
        Math.abs(rect1.height / 2 + rect2.height / 2) - 5
    ) {
      return true;
    }
  };

  that.checkXCollison = (obss, x, smooth) => {
    for (var i = 0; i < obss.length; i++) {
      var obs = obss[i];
      if (
        Math.abs(that.getX(obs.x) - that.getX(x)) <
        Math.abs(obs.obs.clientWidth * (10 + smooth / 10))
      ) {
        return true;
      }
    }
  };

  that.moveYaxis = (obs) => {
    obs.y -= 1;
    obs.obs.style.top = obs.y + "%";
  };

  that.run = (that, smooth) => {
    that.x += smooth;

    that.obs.style.right = that.x + "%";

    if (that.getX(that.x) > that.getX(100) + that.obs.clientWidth / 2) {
      MainObj.Score += 0.5;

      var hiScore = localStorage["flappy-bird-high-score"] || 0;

      if (Number(hiScore) < MainObj.Score) {
        localStorage["flappy-bird-high-score"] = Math.floor(MainObj.Score);
      }

      that.obs.parentElement.removeChild(that.obs);
      MainObj.ObsList = MainObj.ObsList.filter((item) => {
        if (that == item) return false;
        else return item;
      }, that);
    }
  };
  that.velocity = { x: 0, y: 0 };

  that.runBird = () => {
    MainObj.bird.y -= MainObj.bird.velocity.y -= 0.2;

    var gameBox = document.getElementById("game-wrapper");

    if (MainObj.bird.velocity.y < 0) {
      MainObj.bird.obs.classList.remove("up");
      MainObj.bird.obs.classList.add("down");
    } else {
      MainObj.bird.obs.classList.remove("down");
      MainObj.bird.obs.classList.add("up");
    }

    var birdHalfHeight =
      (MainObj.bird.obs.clientHeight / 2 / gameBox.clientHeight) * 100;

    if (MainObj.bird.y > 100 - birdHalfHeight - 5) {
      MainObj.bird.y = 100 - birdHalfHeight - 5;
      MainObj.bird.obs.classList.remove("down");
      MainObj.bird.obs.classList.remove("up");
    }

    if (MainObj.bird.y - birdHalfHeight < 0) {
      MainObj.bird.y = birdHalfHeight;
    }
    MainObj.bird.obs.style.right = that.getX(MainObj.bird.x) + "px";

    MainObj.bird.obs.style.top = that.getY(MainObj.bird.y) + "px";
  };

  that.init = () => {
    that.putobs();
  };

  that.init();
}
