// All newly created items will receive
// these style properties:
project.currentStyle = {
	fillColor: 'white',
	strokeColor: 'black',
};

var center = view.center;
var r = Math.min(view.viewSize.width, view.viewSize.height) / 2 - 20;
var s = r/100;

var clockFace = new Group();
//new Path.Circle(center, d);

var hourDial;
var minuteDial;
var secondDial;

var oldSec = -1;


function setup() {	
	// define clockface group
	clockFace.removeChildren();
	
	// Make clockface shadow
	var shadow = new Path.Circle(view.center, r)
	shadow.fillColor = 'black';
	shadow.opacity = 0.3;
	shadow.position = center + s * 5;
	clockFace.addChild(shadow);

	// Make clockface
	var face = new Path.Circle(view.center, r)
	face.strokeWidth = Math.max(s * 3, 1);
	face.fillColor = 'white';
	clockFace.addChild(face);
					
	// Hour marks, first make 12h mark
	var mark12 = new Path.Rectangle(new Rectangle([0, 0],[s * 8, s * 25]));
	mark12.fillColor = '#000000';
	mark12.strokeColor = null;
	mark12.position = center - [0, 80 * s - 1];
	clockFace.addChild(mark12);

	// Make other 11 marks by cloning the 12 mark
	for(var i = 1; i < 12; i++)
	{
		var mark = mark12.clone();
		mark.rotate(i * 360 / 12, center);
		clockFace.addChild(mark);
	}

	// Make hour dial
	var dial = new Path.Rectangle(new Rectangle([0,0], [s * 10, s * 60]));
	dial.fillColor = '#000000';
	dial.strokeColor = null;
	hourDial = new Symbol(dial);
	placeDial(hourDial);

	// Make minute dial
	dial = new Path.Rectangle(new Rectangle([0,0], [s * 10, s * 80]));
	dial.fillColor = '#000000';
	dial.strokeColor = null;
	minuteDial = new Symbol(dial);
	placeDial(minuteDial);

	// Make second dial
	dial = new Path.Rectangle(new Rectangle([0,0], [s * 5, s * 90]));
	dial.fillColor = '#000000';
	dial.strokeColor = null;
	secondDial = new Symbol(dial);
	placeDial(secondDial);

	updateTime();
};

function placeDial(dial)
{
	var inst = dial.place(center);
	clockFace.addChild(inst);
	inst.position = center - [0, inst.bounds.height / 2 - 10 * s];
	return inst;
}

function updateTime()
{

	var now = new Date();
	// Remove old dials
	clockFace.lastChild.remove();
	clockFace.lastChild.remove();
	clockFace.lastChild.remove();

	// Place hour dial
	t = now.getMinutes() + now.getHours() * 60;
	d = placeDial(hourDial);
	d.rotate(t / 2, center);

	// Place minute dial
	t = now.getSeconds() + now.getMinutes() * 60;
	d = placeDial(minuteDial);
	d.rotate(t / 10, center);

	// Place second dial
	var t =  now.getMilliseconds() + now.getSeconds() * 1000;
	var d = placeDial(secondDial);
	d.rotate(t * 6 / 1000, center);
}

function onResize(event)
{
	center = view.center;
	r = Math.min(view.viewSize.width, view.viewSize.height) / 2.2 ;
	s = r/100;
	setup();
};

function onFrame(event)
{
	updateTime();
}

setup();
