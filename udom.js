/*
 *	QuerySelectors
 */

var M=function(selector, parent){
	if(typeof parent == 'undefined')
		parent = document;
	return parent.querySelectorAll(selector);
}

var S=function(selector, parent){
	if(typeof parent == 'undefined')
		parent = document;
	return parent.querySelector(selector);
}

Element.prototype.findM = function(selector) {
	return M(selector, this);
};

Element.prototype.findS = function(selector) {
	return S(selector, this);
};

/**
 *	Event Appliers 
 */

/*
 * Single Element events
 */

Element.prototype.listen = function(event, callback){
	this.addEventListener(event, callback);
}

Element.prototype.clickE = function(callback){
	this.listen('click', callback);
}

Element.prototype.changeE = function(callback){
	this.listen('change', callback);
}

Element.prototype.catch = function(event, selector, callback){
	this.listen(event, function(evt){
		if(M(selector).has(evt.target))
			callback(evt);
	});
};

/*
 * MultiElement events
 */

NodeList.prototype.listen = function(event, callback){
	for(var i = 0; i < this.length; i++)
		this[i].listen(event, callback);
};

NodeList.prototype.clickE = function(callback){
	this.listen('click', callback);
};

NodeList.prototype.changeE = function(callback){
	this.listen('change', callback);
};

NodeList.prototype.catch = function(event, selector, callback){
	for(var i = 0; i < this.length; i++)
		this[i].catch(event, selector, callback);
};

/**
 *	Attribure
 */

Element.prototype.attr = function(name, value){
	if(typeof value == 'undefined'){
		return this.getAttribute(name);
	}else{
		this.setAttribute(name, value);
	}
}


Element.prototype.addClass = function(name) {
	this.classList.add(name);
};

Element.prototype.removeClass = function(name) {
	this.classList.remove(name);
};

NodeList.prototype.removeAttr = function(name) {
	for (var i = 0; i < this.length; i++)
		this[i].removeAttribute(name);
};

NodeList.prototype.addClass = function(name) {
	for (var i = 0; i < this.length; i++)
		this[i].classList.add(name);
};

NodeList.prototype.removeClass = function(name) {
	for (var i = 0; i < this.length; i++)
		this[i].classList.remove(name);
};

/**
 *	Append
 */

Element.prototype.append = function(html){
	var parent = document.createElement('template');
	parent.innerHTML = html;
	if(parent.content.children.length == 1)
		return this.appendChild(parent.content.children[0]);
	else{
		var appended = [];
		for (var i = 0; i < parent.content.children.length; i++){
			appended.push(parent.content.children[i]);
			this.appendChild(parent.content.children[i]);
		}
		return appended;
	}
}

/*
 *	Utils
 */

NodeList.prototype.has = function (element) {
	for (var i = 0; i < this.length; i++) {
		if(this[i].isEqualNode(element))
			return true;
	}
	return false;
}
