let score = {
  eazy: [
    {
      name: "",
      skore: "",
      id: "",
    },
  ],
  medium: [
    {
      name: "",
      skore: "",
      id: "",
    },
  ],
  hard: [
    {
      name: "",
      skore: "",
      id: "",
    },
  ],
};

let databasescore = localStorage.getItem("dataScore");
let btntambah = document.querySelector(".btn-tambah");
// localStorage.clear();

if (databasescore !== null) {
  databasescore = JSON.parse(databasescore);

  //   btntambah.addEventListener("click", () => {
  //     let newS = {
  //       nama: "oko",
  //       score: 150,
  //       id: "okogi",
  //     };

  //     databasescore.eazy.push(newS);
  //     console.log(databasescore);
  //   });
  console.log(databasescore);
} else {
  let installpage = document.querySelector(".install");
  let btnInstall = document.querySelector(".btn-install-game");

  installpage.classList.toggle("d-none");

  btnInstall.addEventListener("click", () => {
    newscore = JSON.stringify(score);
    install(newscore);
  });
}

function install(score) {
  localStorage.setItem("dataScore", score);
}
