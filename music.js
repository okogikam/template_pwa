let divMusic = document.querySelector(".music");

bgm();

function bgm() {
  let a = document.createElement("audio");
  let s = document.createElement("source");

  s.src = "./bgm.mp3";
  s.type = "audio/mpeg";

  a.append(s);
  a.setAttribute("autoplay", "");
  a.setAttribute("loop", "");
  a.setAttribute("muted", "");
  divMusic.append(a);
}
