const wrap = document.getElementById('field');
const clearBtn = document.getElementById('clear-btn');
const backgroundBtn = document.getElementById('background-btn');
const colorBtn = document.getElementById('color-btn');
const eraserBtn = document.getElementById('eraser-btn');
const gridCount = document.getElementById('cell-grid-input');
let cellCount = 30;
let cells = cellCount * cellCount;
let selectedColor = 'gray';
let previousColors = [];
let drawing = false;

function buildGrid() {
	const cellGrid = [...Array(cells).keys()];
	field.innerHTML = '';
	cellGrid.forEach(cell => {
		const col = Math.trunc(cell / cellCount) + 1;
		const row = Math.trunc(cell / cellCount) + 1;
		let node = document.createElement("DIV");
		node.classList.add('cell');
		node.id = cell + 1;
		wrap.appendChild(node);
	})
	clear();
}

if (wrap) {
	buildGrid();		
}

wrap.addEventListener('click', function(event) {
	const target = event.target;
	target.classList.toggle('active');
	if (target.classList.contains('cell')) {
		if (target.classList.contains('active')) {
			target.style.backgroundColor = selectedColor;		
		} else {
			target.style.backgroundColor = 'transparent';
		}
	}
})


wrap.addEventListener('mousedown', function() { 
	drawing = true;
  // simulating hold event
  setTimeout(function() {
	addEventListener('mouseover', function(event){
		if (drawing && event.target.classList.contains('cell')) {
			event.target.classList.toggle('active');
			event.target.style.backgroundColor = selectedColor;
		}
	})
  }, 50);
});

window.addEventListener('mouseup', function() { drawing = false })

function clear() {
	const allCells = document.querySelectorAll('.cell');
	allCells.forEach(cell => {
		cell.classList.remove('active');
		cell.style.backgroundColor = 'transparent';
	})
}

clearBtn.addEventListener('click', clear());

const bg = document.getElementById('bg');
backgroundBtn.addEventListener('click', function() {
	bg.click();
})

bg.addEventListener('change', function(event) {
	const color = event.target.value;
	wrap.style.backgroundColor = color;
	backgroundBtn.style.backgroundColor = color;
}, false);

const color = document.getElementById('color');
colorBtn.addEventListener('click', function() {
	color.click();
})

const list = document.getElementById('recent-colors');
color.addEventListener('change', function(event) {
	const color = event.target.value;
	selectedColor = color;
	colorBtn.style.backgroundColor = color;
	if (previousColors) {
		previousColors.unshift(color);
		if (previousColors.length > 8) {
			previousColors = previousColors.slice(0,8);	
		}
		console.log(previousColors);
		list.innerHTML = '';
		previousColors.forEach(color => {
			let node = document.createElement("DIV");
			node.classList.add('swatch');
			node.style.backgroundColor = color;
			list.appendChild(node);
		})
		const swatches = document.querySelectorAll('.swatch');
		swatches.forEach(swatch => {
			swatch.addEventListener('click', function(event) {
				selectedColor = event.target.style.backgroundColor;
				colorBtn.style.backgroundColor = selectedColor;
			})
		})
		
	}
}, false);

eraserBtn.addEventListener('click', function() {
	selectedColor = 'transparent';
	colorBtn.style.backgroundColor = 'transparent';
})

gridCount.addEventListener('change', function(event) {
	cellCount = event.target.value;
	cells = cellCount * cellCount;
	field.style.gridTemplateColumns = `repeat(${cellCount}, 1fr)`;
	field.style.gridTemplateRows = `repeat(${cellCount}, 1fr)`;
	buildGrid();
})