var queue = [];
var scheme;
var size_pre = 0;
var metafeature = 'c';
var clickcount = 0;
var glyph; 
var stor; 
var replies = [];

function isGoodVariant(item, list){
	// jQuery.inArray(rnd, stack) === -1
	for (var j = 0; j < list.length; j++){
		if (item[metafeature] == list[j][metafeature]) {
			return false;
		}
	}
	return true;
}

function shuffle2(array, limit) {	
    var i = array.length,
        j = 0,
        temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	var argh = array.splice(0, 1);
	i = array.length;
	// console.log(array);
	while (i--) {
		if (array[i][metafeature] !== argh[0][metafeature]) {
			argh.push(array[i]);
		}        
		if (argh.length == limit) {
			break;
		}
    }

    // return array;
    return argh;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomStack(threshold, size) {
	// console.log("in", "0 ↔", threshold, size);
	// return;
	var stack = []; 
	for (;;) {
		var rnd = getRandomInt(0, threshold);
		if(jQuery.inArray(rnd, stack) === -1) {
			// console.log("push",rnd);
			stack.push(rnd)
			if (stack.length === size){
				break;
			}
		}
	}
	// console.log(stack);
	return stack;
}

$(function() {   // Handler for .ready() called.
	document.getElementById('toggle').addEventListener('click', function (e) {
		document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
		document.getElementById('toggle').classList.toggle('x');
	});
	
	setUp();
	
	$('#linkabout').click(function(){
		$('.main').addClass('hidden');
		$('#blockabout').removeClass('hidden');
	});
	
	$('#link_lang').click(function(){
		$('.main').addClass('hidden');
		$('#blocklang').removeClass('hidden');
	});

	$('#link_rules').click(function(){
		$('.main').addClass('hidden');
		$('#blockrules').removeClass('hidden');
	});
	
	// $('#linkcontact').click(function(){
		// $('.main').addClass('hidden');
		// $('#blockcontact').removeClass('hidden');
	// });
	
	$('.custom-menu-brand').click(function(){
		$('.main').addClass('hidden');
		$('#blocksearch').removeClass('hidden');
	});
	
	// $('#link_amh').click(function(){
		// fname = "amh.json";	
		// prepareQueue();
	// });
	
	// $('#link_hbr').click(function(){
		// fname = "hbr.json";			
		// prepareQueue();
	// });
	// $('#link_hira').click(function(){
		// fname = "hiragana.json";	
		// prepareQueue();
	// });
	
// var fname = "hbr.json";	
	var curusername = Cookies.get('name')|'user'; // => 'value'
	// curusername = "Alex";
	
	// if (curusername) {
		// $('.pure-menu-heading').text(curusername);
		// $('#loginfoo').remove();
		// // addClass("hidden");
	// } else {
		// $('#what').html('Your name?');
	// }
	
	$('#okname').click(function(){
		var nameis = $('#usernameinput').val();
		if (nameis) {
			// alert(nameis);
			Cookies.set('name', nameis);
			$('#loginfoo').remove();
		}
	});
	
	$(document).on('click', ".languages", function(event){
		prepareQueue(event.target.id);
		$('.main').addClass('hidden');
		$('#blocksearch').removeClass('hidden');
	});
	
	// Cookies.remove('name');
	$(document).on('click', "#drop", function(){
		console.log("restart");
		stor.removeAll();
		location.reload();
	});
	
	$(document).on('click', ".answer", function(){
	// $('.answer').click(function(){
		// $('.main').addClass('hidden');
		// $('#blockabout').removeClass('hidden');
		// alert('oooooooooooooo!');
			++clickcount;
			// console.log("meow", stor.get());
		
		if ($(this).hasClass('ok')){
			$('#kana').addClass("kanamarkok");
			$(this).removeClass('ok');
			$(this).addClass("markok");
			
			var key = glyph+'.ok';
			
			// console.log("key", key);
			
			var now = stor.get(key);
			stor.set(key, ++now);
			// console.log(glyph, JSON.stringify(replies), "ok");
			// console.log("ok", now);
			
			$(".answer" ).each(function(i) {
				$( this ).hide("slow"); // $( this ).fadeIn().fadeOut( 1000 * ( i + 1 ) );
			});
			 
			$(".answer" ).promise().done(function() {
				// console.log("finished");
				$('.answer').removeClass('markok');
				$('.answer').removeClass('ok');
				$('.answer').removeClass('markwrong');
				$('#kana').removeClass('kanamarkok');
				$('#kana').removeClass('kanamarkwrong');
				if (clickcount > 10) {
					console.log("check & reload");
					clickcount = 0;
					prepareQueue();
				} else {
					// console.log("fire!");
					// console.log(queue);
					// console.log(size_pre);
					prepareQueue();
					// fillTest();
				}
				$('.answer').show();
			  });
			
		} else {
			// $(this).css('background-color', 'red');
			$(this).addClass("markwrong");
			$('#kana').addClass("kanamarkwrong");
			
			// console.log(Cookies.get('name'), glyph, replies, "fail");
			var key = glyph+'.no';
			
			var now = stor.get(key);
			stor.set(key, ++now);
			// console.log(glyph, replies, "fail");
			console.log("fail", glyph);
		}
	});

	// var fname = "hiragana.json";
	// var fname = "amh.json";
	
	// prepareQueue();
	
	
	  // .fail(function( jqxhr, textStatus, error ) {
		// var err = textStatus + ", " + error;
		// console.log( "Request Failed: " + err );
		// window.location.replace(document.location.origin);
		// console.info("doing reload...");
	// })
	;
});

function setUp(){
	$.getJSON('scheme.json').done(function( data ) {
		scheme  = data;
		var ls = Storages.localStorage;
		var cur_lang;
		$.each(data, function(k,v) {
			// console.log(v.name);
			var lang = v.file.split('.')[0];
			if (!cur_lang) { cur_lang = lang; }
			var ns2=Storages.initNamespaceStorage(lang);
			var stor2 = ns2.localStorage;
			// console.log(stor2.keys());
			$( '<div class="pure-g pure-form-stacked languagediv"><div class="pure-u-1-2"><button class="button-small pure-button languages" id="'+lang+'">'+v.name+'</button></div><div class="pure-u-1-2" ><!--<span style="color:orange">■■■</span><span style="color:gray">■</span>--></div></div>').appendTo( "#blocklang" );
		});
		prepareQueue(cur_lang);
		
	});
}

function prepareQueue(lang){
		// console.log(lang);ww
		queue = [];
		
		// var langs = Storages.localStorage;
		// console.log(langs.isSet(event.target.id));
		// if (langs.isSet(lang)){
		
		// } else {
		
		if (!stor || (lang && stor && (stor._ns !== lang))) {
			stor = Storages.initNamespaceStorage(lang).localStorage;
		} 
		// console.log(stor._ns);
		// console.log("ot exist -> load");
		$.getJSON( (lang||stor._ns) +'.json' + '?v3').done(function( data ) {
			if (stor.keys().length === 0) {
				$.each(data, function(k,v) {
					// console.log(v.h);
					stor.set(v.h+'.ok', 0);
					stor.set(v.h+'.no', 0);
				});
			}
			var internal = stor.get();
				$.each(data, function(k,v) {
					// console.log(v);
					var state = internal[v.h];
					// console.log(state);
					if ((state.ok > 5 && state.no === 0) || (state.ok > state.no*3 && state.no > 0)) {
						// console.log(v.h+" is ok");
					} else {
						queue.push(v);
						// console.log(v.h, state);
					}
				});
			// var lang = fname.split('.')[0];
			
			// console.log(stor.keys().length);
			// if (lang === 'hiragana'){
				// console.log("hiragana");
				// stor.removeAll();
			// }
			// window.localStorage.clear();
			// console.log('data test',data[0].h);
			
			
			
			// console.log("in stor " + lang);
			// stor.set('♥.ok', 5);
			// stor.set('♥.no', 2);
			// console.log('meme', stor.get('♥').ok);
			
			// $.each(internal,  function(k,v) {
					// console.log(k, 'ok: '+ v.ok, 'no: '+v.no);
			// });

			
			// Storage {hbr: "{"♥":{"ok":5,"no":2}}", length: 1}
			// console.log(window.localStorage);


			// console.log(queue);
			// console.log(JSON.stringify(queue));
			fillTest();
			// }
		
		// 
		});
		// is loaded in local storage?
}
function fillTest() {
	// var threshold = 70;
	// var threshold = 33; // amh
	var len = queue.length;
	console.log("len", len);
	replies = [];
	var obj;
	var size = 4;
	if (!len){
		// console.log("the end");
		// console.log('meme', stor.keys());
		
		var all_ok = 0;
		var all_no = 0;
		$.each(stor.get(), function(k,v) {
			all_ok+=v.ok;
			all_no+=v.no;
		});
		var all_res = all_ok+all_no;
		// console.log("results", all_res, all_ok, all_no);
		$('#kana').html('<div id="results"><span id="grats">Congratulations!</span><div id="resall">TOTAL: '+all_res+'</div><div id="resok">RIGHT: '+all_ok+'</div><div id="resno">WRONG: '+all_no+'</div><button id="drop" class="pure-button">RESTART</button></div>');
		
		$('#choices').empty();
		return;
	} else if (len < size){ 
		size = len;
	}
	
	if (len === 1) {
		console.log("1", queue);
		obj = queue[0];
		replies = [obj[metafeature]]
	} else {
		console.log("size", size);
		
		// console.log(JSON.stringify(queue));
		// var du  = shuffle2(queue, size);
		// console.log(JSON.stringify(du));
		
		
		// var rndArray = getRandomStack(len-1, size);
		// obj = queue[rndArray[0]];
		// replies = $.map(rndArray, function(val) {return queue[val][metafeature];});
		// shuffle(replies);
		// console.log("r0", replies);
		
		// replies  = shuffle2(queue, size);
		var objs  = shuffle2(queue, size);
		
		replies = objs.map(function(a) {return a[metafeature];});
		var rrr = getRandomInt(0, size - 1);
		obj = objs[rrr];
	}
	
	glyph = obj.h;
	$('#kana').html(glyph);
	
	if (size_pre !== size){
		console.log("redraw buttons");
		$('#choices').empty();
		for (i = 1; i < (size+1); i++) { 
			// console.log("button"+i);
			$('#choices').append('<div class="buttondiv pure-u-1-'+size+'" ><a class="pure-button answer" id="answer'+i+'" href="#"></a></div>');
		}
		size_pre = size;
	}
	// console.log(replies);
	$.each(replies, function( i, v) {
		var name = '#answer' + (i + 1);
		$(name).html(v);
		if (obj[metafeature] === v) { $(name).addClass("ok"); }
	});
}