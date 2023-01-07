let canvas = document.getElementById('canvas');
let cfx = canvas.getContext('2d')

let wall = {new:Array(20).fill(0).map(()=>Array(10).fill(0)), 
			old:Array(20).fill(0).map(()=>Array(10).fill(0))};

let pos = {x:5,y:-2};
const tets = [
  [['□', '■', '□'], ['■', '■', '■'], ['□', '□', '□']], 
  [['■', '□', '□'], ['■', '■', '■'], ['□', '□', '□']], 
  [['□', '□', '■'], ['■', '■', '■'], ['□', '□', '□']], 
  [['■', '■', '□'], ['■', '■', '□'], ['□', '□', '□']], 
  [['□', '■', '■'], ['■', '■', '□'], ['□', '□', '□']], 
  [['■', '■', '□'], ['□', '■', '■'], ['□', '□', '□']],
  [['□', '□', '□', '□'], ['■', '■', '■', '■'], ['□', '□', '□', '□']], // I
];
let tet = tets[Math.floor(Math.random() * tets.length)];



const setCoords = (t, p) =>
t.map((r, i) => 
	  r.map((c, j) => 
			({ x: p.x + j, y: p.y + i, z: c == '■' }))).reduce((acc,val)=>acc.concat(val), []);

let coords = setCoords(tet,pos);

const placeOnWell = (c,w) => {
	c.forEach(b => {
		if(b.y >= 0 && b.z){
			w[b.y][b.x] = 1;
		}
	});
};

const removeFromWell = (c,w) => {
	const ww = w;
	coords.forEach(b => {
		if(b.y >= 0 && b.z){
			ww[b.y][b.x] = 0;
		}
	});
};

const renderWall = () => {
	wall.old.map((a,i)=>{
		a.map((b,j) => {
			if(b === 0){
				cfx.fillStyle = 'gray';
			}else if(b === 1){
				cfx.fillStyle = 'black';
			}
			cfx.fillRect(j*11,i*11,10,10);
		});
	});
	wall.new.map((a,i)=>{
		a.map((b,j) => {
				if(b === 1){
					cfx.fillStyle = 'black';
					cfx.fillRect(j*11,i*11,10,10);
				}
			});
	});
}

const canMove = (dir) => {
	return true;	
}

const move = (dir) => {
	removeFromWell(coords,wall.new);
	if(dir == 'down') { pos.y += 1; }
	coords = setCoords(tet,pos);
	placeOnWell(coords,wall.new);
}

let before = Date.now();
const update = () => {
	let current = Date.now();
	if(current - before >= 350){
		before = current;
		canMove('down') && move('down');
	}
	renderWall();
	requestAnimationFrame(update);
}
requestAnimationFrame(update);
