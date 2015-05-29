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
    var trimable_whitespace = '\uFEFF\xA0 \n\r';
    /**
     * Trims the start and end of a string
     * @function trim 
     * @module String
     * @param {string} [str= ] - A set of trimable characters
     * @example "#!#!Hey!#!#!".trim('#!') == "Hey"
     */
    extend(string, 'trim', function(str) {
        str = RegExp.escape(str || trimable_whitespace);
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
        str = RegExp.escape(str || trimable_whitespace);
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
        str = RegExp.escape(str || trimable_whitespace);
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
     * @function insert
     * @module String
     * @param {number} index - Index to insert at
     * @param {string} str - What to insert
     * Inserts a string at the specified index
     * @example "Quick fox".insert(6, "brown ") === "Quick brown fox"
     */
    extend(string, 'insert', function(index, str) {
        return this.substring(0, index) + str + this.substring(index, this.length);
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
     * Formats the provided string
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
     * @function last 
     * @module Array
     * @param {integer} [amount=1] - How many items to return
     * Fetches the last n items
     * @example ["Blue", "Red", "Green"].last(2) === ["Red", "Green"]
     * @example ["Blue", "Red", "Green"].last() === "Green"
     * @example ["Blue", "Red", "Green"].last(1) === ["Green"]
     */
    extend(array, 'last', function(amount) {
        // Lazy last
        return this.reverse().first(amount).reverse();
    });

    /**
     * @alias first 
     * @module Array
     */
    extend(array, 'take', array.prototype.first)

    /**
     * @function clone 
     * @module Array
     * Clones an array
     * @example 
     * var x = [1, 2, 3];
     * var y = x.clone();
     */
    extend(array, 'clone', function() {
        return this.slice();
    });
    
    /**
     * @function range 
     * @module Array
     * Generates an array of integers
     * @example 
     * Array.range(5) === [0, 1, 2, 3, 4]
     * Array.range(5, 1, 10) === [10, 11, 12, 13, 14]
     * Array.range(5, 10) === [0, 10, 20, 30, 40]
     * Array.range(5, -1) === [0, -1, -2, -3, -4]
     */
    Array.range = function(count, step, start) {
        start = start || 0;
        step  = step  || 1;

        var range = Array(count);
        for (var i = 0; i < count; i++, start += step) {
            range[i] = start;
        }

        return range;
    };

    // Object methods

    /**
     * @function clone 
     * @module Array
     * Clones an array
     * @example 
     * function x(){}
     * x.prototype.foo = 123;
     * x.prototype.bar = function() { return this.foo; }
     * 
     * var y = x.clone();
     */
    extend(object, 'clone', function() {
        // http://davidwalsh.name/javascript-clone
        function mixin(dest, source, copyFunc) {
            var name, s, empty = {};
            for(name in source){
                // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
                // inherited from Object.prototype.  For example, if dest has a custom toString() method,
                // don't overwrite it with the toString() method that source inherited from Object.prototype
                s = source[name];
                if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                    dest[name] = copyFunc ? copyFunc(s) : s;
                }
            }
            return dest;
        }

        if(!this || typeof this != "object" || this.toString() === "[object Function]"){
            return this;
        } if(this.nodeType && "cloneNode" in this){
            return this.cloneNode(true);
        } if(this instanceof Date){
            return new Date(this.getTime());
        } if(this instanceof RegExp){
            return new RegExp(this); 
        }

        var r = this.constructor ? new this.constructor() : {};
        return mixin(r, this, clone);
    });
    
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
}();
