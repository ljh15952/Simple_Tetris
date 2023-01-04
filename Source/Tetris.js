let canvas = document.getElementById('canvas');
let cfx = canvas.getContext('2d')

let wall = {new:Array(20).fill(0).map(()=>Array(10).fill(0)), 
			old:Array(20).fill(0).map(()=>Array(10).fill(0))};

wall.old[5][5] = 1; //검은색 블록이 잘 찍히나 테스트 용

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

const update = () => {
	renderWall();
	requestAnimationFrame(update);
}
requestAnimationFrame(update);
