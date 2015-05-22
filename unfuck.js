+function() {
    'use strict';
    
    // A lot of javascript developers will hate me for
    // extending the standard objects but I honestly 
    // don't care.

    // Alias the objects
    var string = String,
        array = Array,
        object = Object,
        number = Number;
    
	function extend(obj, name, func) {
		object.defineProperty(obj.prototype, name, {
			enumerable: false,
			value: func
		});
	}
	
    // Extending existing stuff
    /**
     * @function regex escape
     * @module Misc
     * @param {string} str - String to be escaped
     * Escapes a string so that it can safely be used in a regex.
     * Taken from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
     */
    RegExp.escape = function(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    
    // String methods

    /**
     * Trims the start and end of a string
     * @function trim 
     * @module String
     * @param {string} [str= ] - A set of trimable characters
     * @example "#!#!Hey!#!#!".trim('#!') == "Hey"
     */
    extend(string, 'trim', function(str) {
        str = RegExp.escape(str || ' ');
	    return this.replace(new RegExp('^[' + str + ']+|[' + str + ']+$', 'g'), '');
    });

    /**
     * Trims the start of a string
     * @function ltrim 
     * @module String
     * @param {string} [str= ] - A set of trimable characters
     * @example "#!#!Hey!#!#!".ltrim('#!') == "Hey!#!#!"
     */
    extend(string, 'ltrim', function(str) {
        str = RegExp.escape(str || ' ');
	    return this.replace(new RegExp('^[' + str + ']+'), '');
    });
    
    /**
     * Trims the end of a string
     * @function rtrim 
     * @module String
     * @param {string} [str= ] - A set of trimable characters
     * @example "#!#!Hey!#!#!".rtrim('#!') == "#!#!Hey"
     */
    extend(string, 'rtrim', function(str) {
        str = RegExp.escape(str || ' ');
	    return this.replace(new RegExp('[' + str + ']+$'), '');
    });
    
    /**
     * @function capitalize 
     * @module String
     * Makes the first character uppercase
     * @example "hello world!".capitalize() === "Hello world!"
     */
    extend(string, 'capitalize', function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    });
    
    /**
     * @function reverse
     * @module String
     * Reverses the string
     * @example "Hello World!".reverse() === "!dlroW olleH";
     */
    extend(string, 'reverse', function() {
        return this.split("").reverse().join("");
    });
    
    /**
     * @function contains
     * @module String
     * @param {string} what - What to search for
     * Test if the string contains a substring
     * @example "Quick brown fox".contains("brown") === true
     */
    extend(string, 'contains', function(what) {
        return this.indexOf(what) !== -1;
    });
    
    /**
     * @function endsWith 
     * @module String
     * @param {string} what - What to search for
     * Tests if a string ends with the provided string
     * @example "Hello World".endsWith("World") === true
     */
    extend(string, 'endsWith', function(what) {
        return this.indexOf(what, this.length - what.length) !== -1;
    });
    
    // Taken from stackoverflow.com's javascript minus the regex
    /**
     * @function format 
     * @module String
     * Tests if a string ends with the provided string
     * @example "Hello {1} {0}!".format("Doe", "John")
     * @example "Hello {first} {last}!".format({first: "John", last: "Doe"})
     */
    extend(string, 'format', function() {
        var str = this.toString();
        if (!arguments.length) {
            return str;
        }
        
        var args = typeof arguments[0],
            args = (("string" == args || "number" == args) ? arguments : arguments[0]);
            
        for (var arg in args) {
            str = str.replace("{" + arg + "}", args[arg]);
        }
        
        return str;
    });
    
    // Array methods
    /**
     * @function contains 
     * @module Array
     * @param {string} item - The item to search for
     * Tests if the array contains the item
     * @example ["Blue", "Red", "Green"].contains("Red")
     */
    extend(array, 'contains', function(item) {
        return this.indexOf(item) !== -1;
    });
    
    /**
     * @function first 
     * @module Array
     * @param {integer} [amount=1] - How many items to return
     * Fetches the first n items
     * @example ["Blue", "Red", "Green"].first(2) === ["Blue", "Red"]
     * @example ["Blue", "Red", "Green"].first() === "Blue"
     * @example ["Blue", "Red", "Green"].first(1) === ["Blue"]
     */
    extend(array, 'first', function(amount) {
        var ret = this.slice(0, Math.max(0, amount == null ? 1 : amount));
        return amount === undefined ? ret[0] : ret;
    });

    /**
     * @alias first 
     * @module Array
     */
	extend(array, 'take', Array.prototype.first)
    
    // Object methods
    
    // Number methods
    /**
     * @function isNaN
     * @module Number
     * Test if you're dealing with number
     * @example (+"asd").isNaN() === true
     */
    extend(number, 'isNaN', function() { 
        return +this !== +this;
    });
}()
