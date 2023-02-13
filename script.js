import Kalkulator from "./kalkulator.js";
// debugger;
const Obj1 = new Kalkulator();
let przyciski = document.getElementsByClassName("przyc");
let ekran = document.getElementById("ekran");
let lista = document.getElementById("lista");
let wynik = document.querySelectorAll("p");
let box = document.querySelector("input");
const tab1 = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  ":",
  ".",
  "Enter",
  "=",
  "Backspace",
];
let tab2 = ["-", "*", "/", ":", "+"];
function boxLenght() {
  return wynik[1].textContent.length;
}
//SPRAWDZ CIAG
function sprawdzCiag(ciag) {
  let wynik = 0;
  let str = ciag.split("");
  for (let item of tab2) {
    if (str.at(-1) === item) {
      return (wynik = item);
    }
  }
  return wynik;
}
function sprawdzCiag2(ciag) {
  let wynik = 0;
  const reg2 = /[1-9]/g;
  const temp = ciag.match(reg2);
  return temp !== null ? (wynik = 1) : wynik;
}
function drukEkran(element) {
  // wynik[2].textContent = `${wynik[2].textContent}${element.textContent}`;
  wynik[1].textContent = `${wynik[1].textContent}${element.textContent}`;
}
for (let i = 0; i < przyciski.length; i++) {
  przyciski[i].addEventListener("click", function () {
    if (przyciski[i] === przyciski[15]) {
      Obj1.dodaj(wynik[1].textContent);
      wynik[1].textContent = "";
      wynik[0].textContent = Obj1.licz();
    } else {
      return drukEkran(przyciski[i]);
    }
  });
}

//WYNIK PO ENTERZE
function addlistAfterKey(event) {
  if (boxLenght() > 0 && event.key === "Enter") {
    Obj1.dodaj(wynik[1].textContent);
    wynik[1].textContent = "";
    wynik[0].textContent = Obj1.licz();
  }
}
function addNumAfterKey(event) {
  let znak = tab1.filter((element) => event.key === element);
  // debugger;
  // if (wynik[2].textContent !== "") {
  //   if (sprawdzCiag(wynik[2].textContent) !== 0) {

  //   }
  // }
  if (znak[0] !== undefined) {
    if (Number.isInteger(parseInt(znak[0])) || znak[0] === ".") {
      wynik[1].textContent += znak[0];
    } else if (
      znak[0] === "+" ||
      znak[0] === "-" ||
      znak[0] === "/" ||
      znak[0] === "*" ||
      znak[0] === ":"
    ) {
      // debugger;
      //==zaimplementowac co w przypadku gdy ktos bedzie chcial wykonywc ta sama operacje ciagle
      Obj1.dodaj(wynik[1].textContent);
      console.log(Obj1.ciag);
      if (sprawdzCiag2(wynik[1].textContent) === 1) {
        if (sprawdzCiag(wynik[0].textContent) !== 0) {
          Obj1.dodaj(wynik[0].textContent + wynik[1].textContent);
          wynik[0].textContent = Obj1.licz() + znak[0];
          wynik[1].textContent = "";
        } else {
          wynik[1].textContent += znak[0];
          wynik[0].textContent = wynik[1].textContent;
          wynik[1].textContent = " ";
        }
      }
      if (sprawdzCiag2(wynik[0].textContent) === 1) {
        console.log("tu jestem");
        if (sprawdzCiag(wynik[0].textContent) === 0) {
          console.log("teraz tu");
          wynik[0].textContent += znak[0];
        }
      }
    } else if (znak[0] === "Enter" || znak[0] === "=") {
      if (sprawdzCiag(wynik[0].textContent) !== 0) {
        Obj1.dodaj(wynik[0].textContent + wynik[1].textContent);
        wynik[0].textContent = Obj1.licz();
        wynik[1].textContent = " ";
      }
    } else if (znak[0] === "Backspace") {
      wynik[1].textContent = wynik[1].textContent.slice(0, -1);
    }
  }
  console.log(Obj1.dane);
}
//TO DO:
//ZNAKI MUSZA MIESCIC SIE WEWNATRZ EKRANU
//NAPRAWIC KLAWIATURE
//DODAJ PAMIEC KALKULATORA!!

// document.addEventListener("keypress", addlistAfterKey);
// box.addEventListener("keypress", addlistAfterKey);
document.addEventListener("keydown", addNumAfterKey);
