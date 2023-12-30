const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

const getRandomColor = () => {
  const randomColor = () => Math.floor(Math.random() * 256);
  return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
};

const setRandomColors = () => {
  document.documentElement.style.setProperty("--g1", getRandomColor());
  document.documentElement.style.setProperty("--g2", getRandomColor());
};

const toggle = () => {
  toggled = !toggled;
  setRandomColors(); 
  document.body.classList.toggle("toggled");
};

const handleOnClick = (index) => {
  toggle();

  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

const createTile = (index) => {
  const tile = document.createElement("div");

  tile.classList.add("tile");

  tile.style.opacity = toggled ? 0 : 1;

  tile.onclick = (e) => handleOnClick(index);

  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";

  const size = document.body.clientWidth > 800 ? 100 : 50;

  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

setRandomColors(); 
createGrid();

window.onresize = () => {
  setRandomColors(); // Set new random colors on window resize
  createGrid();
};
