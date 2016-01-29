(function(global, $) {

	//create new object
	var Jnf = function(firstName, lastName, language) {
		return new Jnf.init(firstName, lastName, language);
	}

	//private inside scope of the IFFE
	var supportedLangs = ['en', 'es'];

	var greetings = {
		en: 'Hello',
		es: 'Hola'
	};

	var formatGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	};

	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	};

	Jnf.prototype = {
		//this refers to the calling object at execution time
		fullName: function() {
			return this.firstName + ' ' + this.lastName;
		},
		validate: function() {
			if (supportedLangs.indexOf(this.language) === -1) {
				throw 'Invalid Language';
			}
		},
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstName + '!';
		},
		formalGreeting: function() {
			return formatGreetings[this.language] + ',' + this.fullName();
		},
		greet: function(formal) {
			var msg;

			if (formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			if (console) {
				console.log(msg);
			}

			//makes the method chainable by returning the calling object
			return this;
		},
		log: function() {
			if (console) {
				console.log(logMessages[this.language] + ': ' + this.fullName());
			}
			return this;
		},
		setLang: function(lang) {
			this.language = lang;
			this.validate();
			return this;
		},
		HTMLGreeting: function(selector, formal) {
			if (!$) {
				throw 'jQuery not loaded';
			}
			if (!selector) {
				throw 'Missing selector';
			}
			var msg;
			if (formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}			

			$(selector).html(msg);

			return this;
		}
	};

	//the actual object is created here, allowing us to create new object without "new"
	Jnf.init = function(firstName, lastName, language) {
		var self = this;
		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = language || 'en';

		self.validate();
	}

	//this is why we don't have to use "new"
	Jnf.init.prototype = Jnf.prototype;

	//attach Jnf to global object and give shorthand "J$"
	global.Jnf = global.J$ = Jnf;
	
}(window, jQuery));