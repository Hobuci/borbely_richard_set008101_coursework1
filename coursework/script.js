/*
 * ROT13 cipher function; takes an input text and shifts each character by 13 places.
 * Can only process letters of the alphabet separated by spaces.
 */
function rot13_encode() {
	//declare alphabet
	const alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m",
					"n","o","p","q","r","s","t","u","v","w","x","y","z" ];
	//clear output area
	document.getElementById("ciphered_rot13").value = null;
	
	//get input text from textbox
	var input_text = document.getElementById("deciphered_rot13").value.toLowerCase();
	var output_text = [];
	
	if(input_text != "")
	{//if the input text is not empty, process it
		for(var i = 0; i < input_text.length; i++)
		{//loop through the input text and get each character's location in the alphabet array
			//if the location is larger than 12, do 'location MOD 13' to wrap around the alphabet
			//if the location is smaller than 12, add 13 to the new location
			//handle spaces
			if(input_text[i] == " "){
				output_text[i] = " ";
			}
			else
			{
				var letter = input_text[i];
				var location = alphabet.indexOf(letter);
				
				if(location > 12){
					output_text[i] = alphabet[location % 13];
				}
				else{
					output_text[i] = alphabet[location + 13];
				}
			}
		}
	}else{alert("Input Area Empty!");}
	
	//output
	for(var i = 0; i < output_text.length; i++)
	{
		document.getElementById("ciphered_rot13").value += output_text[i];
	}
}
function rot13_decode() {
	//declare alphabet
	const alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m",
					"n","o","p","q","r","s","t","u","v","w","x","y","z" ];
	//clear output area
	document.getElementById("deciphered_rot13").value = null;
	
	var input_text = document.getElementById("ciphered_rot13").value.toLowerCase();
	var output_text = [];
	
	if(input_text != "")
	{
		for(var i = 0; i < input_text.length; i++)
		{
			if(input_text[i] == " "){
				output_text[i] = " ";
			}
			else
			{
				var letter = input_text[i];
				var location = alphabet.indexOf(letter);
				
				if(location > 12){
					output_text[i] = alphabet[location % 13];
				}
				else{
					output_text[i] = alphabet[location + 13];
				}
			}
		}
	}else{alert("Input Area Empty!");}
	
	//output
	for(var i = 0; i < output_text.length; i++)
	{
		document.getElementById("deciphered_rot13").value += output_text[i];
	}
}

/*
 * Transposition cipher function; takes an input text and encodes each word to be backwards but in the same order.
 * Can only process letters of the alphabet separated by spaces.
 */
function transposition_encode(){
	//clear output area
	document.getElementById("ciphered_transposition").value = null;
	
	//get input text from textbox
	var input_text = document.getElementById("deciphered_transposition").value.toLowerCase();
	var output_text = "";
	var words = [];
	
	if(input_text != "")
	{//if the input text is not empty, process it
		var word = [];
		var wordCount = 0;
		for(var i = input_text.length - 1; i >= 0; i--)
		{//loop through the input text backwards and build up a word, if it hits a space it means a word ended
			//put the word (backwards) in an array and continue
			if(input_text[i] == " " && word != null && i != 0){
				words[wordCount] = word;
				wordCount++;
				word = "";
			}
			else{
				word += input_text[i];
				if(i == 0){ //if i = 0, then we got to the end of the input, add the last word to the array
					words[wordCount] = word;
				}
			}
		}
	}
	else{alert("Input Area Empty!");}
	
	//output
	for(var i = words.length - 1; i >= 0; i--)
	{//loop through the words array and build up the output text separated by a space
		output_text += words[i];
		if(i > 0){output_text += " ";}
	}document.getElementById("ciphered_transposition").value = output_text;
}
function transposition_decode(){
	//clear output area
	document.getElementById("deciphered_transposition").value = null;
	
	var input_text = document.getElementById("ciphered_transposition").value.toLowerCase();
	var output_text = "";
	var words = [];
	
	if(input_text != "")
	{
		var word = [];
		var wordCount = 0;
		for(var i = input_text.length - 1; i >= 0; i--)
		{
			if(input_text[i] == " " && word != null && i != 0){
				words[wordCount] = word;
				wordCount++;
				word = "";
			}
			else{
				word += input_text[i];
				if(i == 0){
					words[wordCount] = word;
				}
			}
		}
	}
	else{alert("Input Area Empty!");}
	
	//output
	for(var i = words.length - 1; i >= 0; i--)
	{
		output_text += words[i];
		if(i > 0){output_text += " ";}
	}document.getElementById("deciphered_transposition").value = output_text;
}

/*
 * Subtitution key cipher; takes an input text and a key, shifts each character by the location of the key's characters in the alphabet.
 * Can only process letters of the alphabet separated by spaces.
 */
function keycipher_encode(){
	//declare alphabet
	const alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m",
					"n","o","p","q","r","s","t","u","v","w","x","y","z" ];
	//clear output area
	document.getElementById("ciphered_keycipher").value = null;
	
	//get input text from textbox
	var key = document.getElementById("key_keycipher").value.toLowerCase();
	var input_text = document.getElementById("deciphered_keycipher").value.toLowerCase();
	var output_text = [];

	if(input_text != "")
	{//if the input text is not empty, process it
		//make the key always longer than the input
		key = generate_newkey(key, key.length, input_text.length);
		for(var i = 0; i < input_text.length; i++)
		{//move each character of the input message according to the corresponding key character's location in the alphabet
			var location = alphabet.indexOf(input_text[i]) + alphabet.indexOf(key[i]);
			
			//handle spaces
			if(input_text[i] == " "){
				output_text[i] = " ";
			}
			else
			{
				if(location > 25){
					output_text[i] = alphabet[location % 26];
				}
				else{
					output_text[i] = alphabet[location];
				}
			}
		}
	}
	else{alert("Input Area Empty!");}
	//output
	for(var i = 0; i < output_text.length; i++)
	{
		document.getElementById("ciphered_keycipher").value += output_text[i];
	}
}
function keycipher_decode(){

	const alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m",
					"n","o","p","q","r","s","t","u","v","w","x","y","z" ];

	document.getElementById("deciphered_keycipher").value = null;
	
	var key = document.getElementById("key_keycipher").value.toLowerCase();
	var input_text = document.getElementById("ciphered_keycipher").value.toLowerCase();
	var output_text = [];

	if(input_text != "")
	{
		key = generate_newkey(key, key.length, input_text.length);
		for(var i = 0; i < input_text.length; i++)
		{
			var location = alphabet.indexOf(input_text[i]) - alphabet.indexOf(key[i]);
			
			if(input_text[i] == " "){
				output_text[i] = " ";
			}
			else
			{
				if(location < 0){
					output_text[i] = alphabet[26 - (-1 * location)];
				}
				else{
					output_text[i] = alphabet[location];
				}
			}
		}
	}
	else{alert("Input Area Empty!");}
	//output
	for(var i = 0; i < output_text.length; i++)
	{
		document.getElementById("deciphered_keycipher").value += output_text[i];
	}
}
function generate_newkey(key, keyLength, inputLength){
	//if the key is not as long as the input text, repeat it
	var keysNeeded;
	
	if(keyLength < inputLength){//calculate how many times the key needs to be repeated
		keysNeeded = Math.floor(inputLength / keyLength); //floor will consistently give the same number unlike round
		if(inputLength % keyLength == 0){
			keysNeeded--;
		}
	}
	for(var i = 0; i < keysNeeded; i++){//loop for number of keys
		for(var j = 0; j < keyLength; j++){//loop for building the key up
			key += key[j];
		}
	}
	return key;
}
function clearKeyArea() {
	document.getElementById("key_keycipher").value = "";
}


function animation_fade() {
	//this doesn't work, its like it never applies, unless in debug mode
	document.getElementById("content").style.opacity = 0;
	for(var i = 1; i <= 90; i++)
	{
		document.getElementById("content").style.opacity = i/100;
	}
}












