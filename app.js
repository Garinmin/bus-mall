'use strict';

const imageSectionTag = document.getElementById('image-pics');
const leftImageTag = document.getElementById('left-image-img');
const centerImageTag = document.getElementById('center-image-img');
const rightImageTag = document.getElementById('right-image-img');
const leftHeaderTag = document.getElementById('left-image-h2');
const centerHeaderTag = document.getElementById('center-image-h2');
const rightHeaderTag = document.getElementById('right-image-h2');

const maxClicks = 25;
let totalClicks = 0;

let leftImageOnThePage = null;
let centerImageOnThePage = null;
let rightImageOnThePage = null;

const Image = function (title, imageSrc) {
  this.title = title;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  Image.all.push(this);
};

// initialize Constructor property
Image.all = [];

function pickNewImage() {

  const previousLeft = leftImageOnThePage;
  const previousCenter = centerImageOnThePage;
  const previousRight = rightImageOnThePage;

  shuffle(Image.all);

  for (let image of Image.all) {
    if (image !== previousLeft && image !== previousCenter && image !== previousRight) {
      leftImageOnThePage = image;
      break;
    }
  }

  for (let image of Image.all) {
    if (image !== previousLeft && image !== previousCenter && image !== previousRight && image !== leftImageOnThePage) {
      centerImageOnThePage = image;
      break;
    }
  }

  for (let image of Image.all) {
    if (image !== previousLeft && image !== previousCenter && image !== previousRight && image !== leftImageOnThePage && image !== centerImageOnThePage) {
      rightImageOnThePage = image;
      break;
    }
  }

  renderNewImages();
}

const renderNewImages = function () {

  leftImageTag.src = leftImageOnThePage.url;
  leftImageTag.alt = leftImageOnThePage.title;
  leftHeaderTag.textContent = leftImageOnThePage.title;

  centerImageTag.src = centerImageOnThePage.url;
  centerImageTag.alt = centerImageOnThePage.title;
  centerHeaderTag.textContent = centerImageOnThePage.title;

  rightImageTag.src = rightImageOnThePage.url;
  rightImageTag.alt = rightImageOnThePage.title;
  rightHeaderTag.textContent = rightImageOnThePage.title;
};

const handleClickOnImage = function (event) {

  if (totalClicks < maxClicks) {

    const thingWeClickedOn = event.target;
    const id = thingWeClickedOn.id;

    if (id === 'left-image-img' || id === 'center-image-img' || id === 'right-image-img') {

      if (id === 'left-image-img') {
        leftImageOnThePage.clicks += 1;
      } 
      
      if (id === 'center-image-img') {
        centerImageOnThePage.clicks += 1;
      }

      if (id === 'right-image-img') {
        rightImageOnThePage.clicks += 1;
      }

      leftImageOnThePage.timesShown += 1;
      centerImageOnThePage.timesShown += 1;
      rightImageOnThePage.timesShown += 1;

      //after we update data it's safe to pick new images
      pickNewImage();
    }
  }

  totalClicks += 1;

  //when they reach total max clicks, remove the clicky function
  if (totalClicks === maxClicks) {
    imageSectionTag.removeEventListener('click', handleClickOnImage);
    alert ('Plese click to "submit" button');

    setItems();
    
  }
  
  const btn = document.getElementById('submit');
  btn.addEventListener('click', getResults);
  parent.innerHTML = '';

  function getResults() {
    renderLikes(); 
    renderShown();
}  
  makeImageChart();
};

function renderLikes() {
  const likesListElem = document.getElementById('image-clicks');
  likesListElem.innerHTML = '';
  for (let i = 0; i < Image.all.length; i++) {
    const imagePicture = Image.all[i];
    const imageItemElem = document.createElement('li');
    likesListElem.appendChild(imageItemElem);
    imageItemElem.textContent = imagePicture.title + ' : ' + imagePicture.clicks;
  }
}

function renderShown() {
  const shownListElem = document.getElementById('image-shown');
  shownListElem.innerHTML = '';
  for (let i = 0; i < Image.all.length; i++) {
    const imagePicture = Image.all[i];
    const imageItemElem = document.createElement('li');
    shownListElem.appendChild(imageItemElem);
    imageItemElem.textContent = imagePicture.title + ' : ' + imagePicture.timesShown;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Add Event Listeners
imageSectionTag.addEventListener('click', handleClickOnImage);

new Image('Bag', './img/bag.jpg');
new Image('Banana', './img/banana.jpg');
new Image('Bathroom', './img/bathroom.jpg');
new Image('Boots', './img/boots.jpg');
new Image('Breakfast', './img/breakfast.jpg');
new Image('Bubblegum', './img/bubblegum.jpg');
new Image('Chair', './img/chair.jpg');
new Image('Cthulhu', './img/cthulhu.jpg');
new Image('Dog-duck', './img/dog-duck.jpg');
new Image('Dragon', './img/dragon.jpg');
new Image('Pen', './img/pen.jpg');
new Image('Pet-sweep', './img/pet-sweep.jpg');
new Image('Scissors', './img/scissors.jpg');
new Image('Shark', './img/shark.jpg');
new Image('Tauntaun', './img/tauntaun.jpg');
new Image('Unicorn', './img/unicorn.jpg');
new Image('Usb', './img/usb.gif');
new Image('Water-can', './img/water-can.jpg');
new Image('Wine-glass', './img/wine-glass.jpg');

pickNewImage();

// create Bar chart

function makeImageChart() {

  const imageNamesArray = [];
  const imageLikesArray = [];


  for (let image of Image.all) {
    imageNamesArray.push(image.title);
    imageLikesArray.push(image.clicks);
  }

  const ctx = document.getElementById('imageChart').getContext('2d');
  const imageChart = new Chart(ctx, {

    type: 'bar',

    data: {
      labels: imageNamesArray,
      datasets: [{
        label: 'Image Likes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: imageLikesArray
      }]
    },

    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//create storage

// Setting items
function setItems() {
  console.log(Image.all);
  // stringify
  let stringifiedImage = JSON.stringify(Image.all);
  console.log(stringifiedImage);
  // setItems method
  localStorage.setItem('orders', stringifiedImage);
}

function getItems() {
  // getItems method
  let items = localStorage.getItem('orders');
  // parse
  // check if I got something back
  if (items !== null) {
    let parsedImage = JSON.parse(items);
    for (let item of parsedImage) {
      let newImage = new Image(item.title, item.url);
        console.log(item.clicks, item.timesShown);
    }
  }  
}
getItems();