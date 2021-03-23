'use strict';

// Globals
const imageSectionTag = document.getElementById('image-pics');
const leftImageTag = document.getElementById('left-image-img');
const centerImageTag = document.getElementById('center-image-img');
const rightImageTag = document.getElementById('right-image-img');
const leftHeaderTag = document.getElementById('left-image-h2');
const centerHeaderTag = document.getElementById('center-image-h2');
const rightHeaderTag = document.getElementById('right-image-h2');

const maxClicks = 2;
let totalClicks = 0;
let totalView = 0;

// Variables to store the imagess already on the page
let leftImageOnThePage = null;
let centerImageOnThePage = null;
let rightImageOnThePage = null;

const Image = function (title, imageSrc) {
  this.title = title;
  this.clicks = 0;
  this.view = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  // the all array is a property of the Image constructor
  Image.all.push(this);
};

// initialize Constructor property
Image.all = [];

/* function getRandomImg() {
    return Math.floor(Math.random() * Image.all.length);
  } */


function pickNewImage() {
  shuffle(Image.all);
  leftImageOnThePage = Image.all[0];
  centerImageOnThePage = Image.all[1];
  rightImageOnThePage = Image.all[2];
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

  // if they can still click, do clicky things
  if (totalClicks < maxClicks) {

    const thingWeClickedOn = event.target;
    const id = thingWeClickedOn.id;

    //track the clicks and times shown
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


      leftImageOnThePage.view += 1;
      centerImageOnThePage.view += 1;
      rightImageOnThePage.view += 1;

      //after we update data it's safe to pick new images
      pickNewImage();
    }
  }
  // increment amount of clicks
  totalClicks += 1;

  //when they reach total max clicks, remove the clicky function
  if (totalClicks === maxClicks) {
    imageSectionTag.removeEventListener('click', handleClickOnImage);
    alert ('All this clicking to stop');

    //display the clicks to the page
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
    imageItemElem.textContent = imagePicture.title + ' : ' + imagePicture.view;
  }
}
/* fisher yates style shuffle
https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
*/

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


// Instantiate Image objects
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


  // refactoring opportunity?
  // for (let i = 0; i < Goat.all.length; i++) {
  //   const singleGoatName = Goat.all[i].name;
  //   goatNamesArray.push(singleGoatName);

  // }

  // for (let i = 0; i < Goat.all.length; i++) {
  //   const currentGoat = Goat.all[i];
  //   const singleGoatLikes = currentGoat.clicks;
  //   goatLikesArray.push(singleGoatLikes);
  // }

  /* alternate way to build local arrays
     Notice the "of" */

  for (let image of Image.all) {
    imageNamesArray.push(image.title);
    imageLikesArray.push(image.clicks);
  }

  const ctx = document.getElementById('imageChart').getContext('2d');
  const imageChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imageNamesArray,
      datasets: [{
        label: 'Image Likes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: imageLikesArray
      }]
    },

    // Configuration options go here
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
