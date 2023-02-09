let przyciski = document.getElementsByClassName("przyc");
let ekran = document.getElementById("ekran");
let lista = document.getElementById("lista");
let wynik = document.querySelectorAll("li");
let box = document.querySelector("input");

function boxLenght() {
  return box.value.length;
}
function drukEkran(element) {
  wynik[3].textContent = `${wynik[3].textContent}${element.textContent}`;
}

class Kalkulator {
  constructor(ciag = "", dane = []) {
    this.ciag = ciag;
    this.dane = dane;
  }
  drukuj() {
    console.log(ciag);
  }
  dodaj(str) {
    // this.ciag = this.ciag.map((el) => str);
    this.ciag = str;
    // console.log(this.ciag);
  }
  licz() {
    let wynik = 0;
    const reg1 = /[\+\-\:\*\/]/;
    const reg2 = /^\d+$/;
    let temp = [];
    let int = [];
    this.ciag.match(reg1) === null
      ? (temp = this.ciag.match(reg2))
      : (temp = this.ciag.match(reg1));
    const str = this.ciag.replace(temp, ",").split(",");
    function stringNaInt() {
      int = str.map((el) => parseInt(el));
    }
    console.log();
    // console.log(temp);
    if (temp === null) {
      wynik = "Wykurwiaj z tymi literkami";
    } else if (temp[0] === "+") {
      stringNaInt();
      //   console.log("dodaje?");
      wynik = int[0] + int[1];
    } else if (temp[0] === "-") {
      stringNaInt();
      wynik = int[0] - int[1];
    } else if (temp[0] === "*") {
      stringNaInt();
      wynik = int[0] * int[1];
    } else if (temp[0] === "/" || temp[0] === ":") {
      stringNaInt();
      wynik = int[0] / int[1];
      wynik = Math.round((wynik + Number.EPSILON) * 100) / 100;
      wynik === Infinity ? (wynik = "Nie mozesz dzielic przez 0") : wynik;
    }
    // console.log(typeof wynik);
    if (typeof wynik === "number") {
      this.dane.push(wynik);
    }
    return wynik;
  }
}
const Obj1 = new Kalkulator();
for (let i = 0; i < przyciski.length; i++) {
  przyciski[i].addEventListener("click", function () {
    return drukEkran(przyciski[i]);
  });
}
// function createObj(event) {
//   const Obj1 = new Kalkulator(tab.push(event));
//   return Obj1;
// }
// debugger;
function addlistAfterKey(event) {
  if (boxLenght() > 0 && event.code === "Enter") {
    Obj1.dodaj(box.value);
    box.value = "";
    wynik[2].textContent = Obj1.licz();
  }
}
box.addEventListener("keypress", addlistAfterKey);
// for (let i = 0; i < przyciski.length; i++) {
//   przyciski[i].addEventListener("click", function () {
//     wynik[1].textContent += przyciski[i].textContent;
//   });
// }
