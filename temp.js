cont = document.getElementById("container-0");
li = cont.getElementsByTagName("li");

for (let item of li) {
  item.style.transform = "translate(calc(210px - 600%))";
}
