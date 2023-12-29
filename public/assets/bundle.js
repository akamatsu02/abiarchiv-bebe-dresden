/*!
 * jQuery JavaScript Library v1.12.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-05T19:16Z
 */

(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};

var version = "1.12.3",

    // Define a local copy of jQuery
    jQuery = function( selector, context ) {

        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery.fn.init( selector, context );
    },

    // Support: Android<4.1, IE<9
    // Make sure we trim BOM and NBSP
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,

    // Used by jQuery.camelCase as callback to replace()
    fcamelCase = function( all, letter ) {
        return letter.toUpperCase();
    };

jQuery.fn = jQuery.prototype = {

    // The current version of jQuery being used
    jquery: version,

    constructor: jQuery,

    // Start with an empty selector
    selector: "",

    // The default length of a jQuery object is 0
    length: 0,

    toArray: function() {
        return slice.call( this );
    },

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function( num ) {
        return num != null ?

            // Return just the one element from the set
            ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

            // Return all the elements in a clean array
            slice.call( this );
    },

    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function( elems ) {

        // Build a new jQuery matched element set
        var ret = jQuery.merge( this.constructor(), elems );

        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;
        ret.context = this.context;

        // Return the newly-formed element set
        return ret;
    },

    // Execute a callback for every element in the matched set.
    each: function( callback ) {
        return jQuery.each( this, callback );
    },

    map: function( callback ) {
        return this.pushStack( jQuery.map( this, function( elem, i ) {
            return callback.call( elem, i, elem );
        } ) );
    },

    slice: function() {
        return this.pushStack( slice.apply( this, arguments ) );
    },

    first: function() {
        return this.eq( 0 );
    },

    last: function() {
        return this.eq( -1 );
    },

    eq: function( i ) {
        var len = this.length,
            j = +i + ( i < 0 ? len : 0 );
        return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
    },

    end: function() {
        return this.prevObject || this.constructor();
    },

    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: deletedIds.sort,
    splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if ( name === "__proto__" || target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                    ( copyIsArray = jQuery.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray( src ) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject( src ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

jQuery.extend( {

    // Unique for each copy of jQuery on the page
    expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

    // Assume jQuery is ready without the ready module
    isReady: true,

    error: function( msg ) {
        throw new Error( msg );
    },

    noop: function() {},

    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function( obj ) {
        return jQuery.type( obj ) === "function";
    },

    isArray: Array.isArray || function( obj ) {
        return jQuery.type( obj ) === "array";
    },

    isWindow: function( obj ) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    },

    isNumeric: function( obj ) {

        // parseFloat NaNs numeric-cast false positives (null|true|false|"")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        // adding 1 corrects loss of precision from parseFloat (#15100)
        var realStringObj = obj && obj.toString();
        return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
    },

    isEmptyObject: function( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    },

    isPlainObject: function( obj ) {
        var key;

        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
            return false;
        }

        try {

            // Not own constructor property must be Object
            if ( obj.constructor &&
                !hasOwn.call( obj, "constructor" ) &&
                !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                return false;
            }
        } catch ( e ) {

            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Support: IE<9
        // Handle iteration over inherited properties before own properties.
        if ( !support.ownFirst ) {
            for ( key in obj ) {
                return hasOwn.call( obj, key );
            }
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        for ( key in obj ) {}

        return key === undefined || hasOwn.call( obj, key );
    },

    type: function( obj ) {
        if ( obj == null ) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    },

    // Workarounds based on findings by Jim Driscoll
    // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
    globalEval: function( data ) {
        if ( data && jQuery.trim( data ) ) {

            // We use execScript on Internet Explorer
            // We use an anonymous function so that context is window
            // rather than jQuery in Firefox
            ( window.execScript || function( data ) {
                window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
            } )( data );
        }
    },

    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    },

    nodeName: function( elem, name ) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },

    each: function( obj, callback ) {
        var length, i = 0;

        if ( isArrayLike( obj ) ) {
            length = obj.length;
            for ( ; i < length; i++ ) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    break;
                }
            }
        } else {
            for ( i in obj ) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    break;
                }
            }
        }

        return obj;
    },

    // Support: Android<4.1, IE<9
    trim: function( text ) {
        return text == null ?
            "" :
            ( text + "" ).replace( rtrim, "" );
    },

    // results is for internal usage only
    makeArray: function( arr, results ) {
        var ret = results || [];

        if ( arr != null ) {
            if ( isArrayLike( Object( arr ) ) ) {
                jQuery.merge( ret,
                    typeof arr === "string" ?
                    [ arr ] : arr
                );
            } else {
                push.call( ret, arr );
            }
        }

        return ret;
    },

    inArray: function( elem, arr, i ) {
        var len;

        if ( arr ) {
            if ( indexOf ) {
                return indexOf.call( arr, elem, i );
            }

            len = arr.length;
            i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

            for ( ; i < len; i++ ) {

                // Skip accessing in sparse arrays
                if ( i in arr && arr[ i ] === elem ) {
                    return i;
                }
            }
        }

        return -1;
    },

    merge: function( first, second ) {
        var len = +second.length,
            j = 0,
            i = first.length;

        while ( j < len ) {
            first[ i++ ] = second[ j++ ];
        }

        // Support: IE<9
        // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
        if ( len !== len ) {
            while ( second[ j ] !== undefined ) {
                first[ i++ ] = second[ j++ ];
            }
        }

        first.length = i;

        return first;
    },

    grep: function( elems, callback, invert ) {
        var callbackInverse,
            matches = [],
            i = 0,
            length = elems.length,
            callbackExpect = !invert;

        // Go through the array, only saving the items
        // that pass the validator function
        for ( ; i < length; i++ ) {
            callbackInverse = !callback( elems[ i ], i );
            if ( callbackInverse !== callbackExpect ) {
                matches.push( elems[ i ] );
            }
        }

        return matches;
    },

    // arg is for internal usage only
    map: function( elems, callback, arg ) {
        var length, value,
            i = 0,
            ret = [];

        // Go through the array, translating each of the items to their new values
        if ( isArrayLike( elems ) ) {
            length = elems.length;
            for ( ; i < length; i++ ) {
                value = callback( elems[ i ], i, arg );

                if ( value != null ) {
                    ret.push( value );
                }
            }

        // Go through every key on the object,
        } else {
            for ( i in elems ) {
                value = callback( elems[ i ], i, arg );

                if ( value != null ) {
                    ret.push( value );
                }
            }
        }

        // Flatten any nested arrays
        return concat.apply( [], ret );
    },

    // A global GUID counter for objects
    guid: 1,

    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function( fn, context ) {
        var args, proxy, tmp;

        if ( typeof context === "string" ) {
            tmp = fn[ context ];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if ( !jQuery.isFunction( fn ) ) {
            return undefined;
        }

        // Simulated bind
        args = slice.call( arguments, 2 );
        proxy = function() {
            return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
    },

    now: function() {
        return +( new Date() );
    },

    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
    jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

    // Support: iOS 8.2 (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type( obj );

    if ( type === "function" || jQuery.isWindow( obj ) ) {
        return false;
    }

    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
    support,
    Expr,
    getText,
    isXML,
    tokenize,
    compile,
    select,
    outermostContext,
    sortInput,
    hasDuplicate,

    // Local document vars
    setDocument,
    document,
    docElem,
    documentIsHTML,
    rbuggyQSA,
    rbuggyMatches,
    matches,
    contains,

    // Instance-specific data
    expando = "sizzle" + 1 * new Date(),
    preferredDoc = window.document,
    dirruns = 0,
    done = 0,
    classCache = createCache(),
    tokenCache = createCache(),
    compilerCache = createCache(),
    sortOrder = function( a, b ) {
        if ( a === b ) {
            hasDuplicate = true;
        }
        return 0;
    },

    // General-purpose constants
    MAX_NEGATIVE = 1 << 31,

    // Instance methods
    hasOwn = ({}).hasOwnProperty,
    arr = [],
    pop = arr.pop,
    push_native = arr.push,
    push = arr.push,
    slice = arr.slice,
    // Use a stripped-down indexOf as it's faster than native
    // http://jsperf.com/thor-indexof-vs-for/5
    indexOf = function( list, elem ) {
        var i = 0,
            len = list.length;
        for ( ; i < len; i++ ) {
            if ( list[i] === elem ) {
                return i;
            }
        }
        return -1;
    },

    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

    // Regular expressions

    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",

    // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

    // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
        // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace +
        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
        "*\\]",

    pseudos = ":(" + identifier + ")(?:\\((" +
        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
        // 1. quoted (capture 3; capture 4 or capture 5)
        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
        // 2. simple (capture 6)
        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
        // 3. anything else (capture 2)
        ".*" +
        ")\\)|)",

    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rwhitespace = new RegExp( whitespace + "+", "g" ),
    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
    rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

    rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

    rpseudo = new RegExp( pseudos ),
    ridentifier = new RegExp( "^" + identifier + "$" ),

    matchExpr = {
        "ID": new RegExp( "^#(" + identifier + ")" ),
        "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
        "TAG": new RegExp( "^(" + identifier + "|[*])" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
            "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
    },

    rinputs = /^(?:input|select|textarea|button)$/i,
    rheader = /^h\d$/i,

    rnative = /^[^{]+\{\s*\[native \w/,

    // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

    rsibling = /[+~]/,
    rescape = /'|\\/g,

    // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
    funescape = function( _, escaped, escapedWhitespace ) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ?
            escaped :
            high < 0 ?
                // BMP codepoint
                String.fromCharCode( high + 0x10000 ) :
                // Supplemental Plane codepoint (surrogate pair)
                String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
    },

    // Used for iframes
    // See setDocument()
    // Removing the function wrapper causes a "Permission Denied"
    // error in IE
    unloadHandler = function() {
        setDocument();
    };

// Optimize for push.apply( _, NodeList )
try {
    push.apply(
        (arr = slice.call( preferredDoc.childNodes )),
        preferredDoc.childNodes
    );
    // Support: Android<4.0
    // Detect silently failing push.apply
    arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
    push = { apply: arr.length ?

        // Leverage slice if possible
        function( target, els ) {
            push_native.apply( target, slice.call(els) );
        } :

        // Support: IE<9
        // Otherwise append directly
        function( target, els ) {
            var j = target.length,
                i = 0;
            // Can't trust NodeList.length
            while ( (target[j++] = els[i++]) ) {}
            target.length = j - 1;
        }
    };
}

function Sizzle( selector, context, results, seed ) {
    var m, i, elem, nid, nidselect, match, groups, newSelector,
        newContext = context && context.ownerDocument,

        // nodeType defaults to 9, since context defaults to document
        nodeType = context ? context.nodeType : 9;

    results = results || [];

    // Return early from calls with invalid selector or context
    if ( typeof selector !== "string" || !selector ||
        nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

        return results;
    }

    // Try to shortcut find operations (as opposed to filters) in HTML documents
    if ( !seed ) {

        if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
            setDocument( context );
        }
        context = context || document;

        if ( documentIsHTML ) {

            // If the selector is sufficiently simple, try using a "get*By*" DOM method
            // (excepting DocumentFragment context, where the methods don't exist)
            if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

                // ID selector
                if ( (m = match[1]) ) {

                    // Document context
                    if ( nodeType === 9 ) {
                        if ( (elem = context.getElementById( m )) ) {

                            // Support: IE, Opera, Webkit
                            // TODO: identify versions
                            // getElementById can match elements by name instead of ID
                            if ( elem.id === m ) {
                                results.push( elem );
                                return results;
                            }
                        } else {
                            return results;
                        }

                    // Element context
                    } else {

                        // Support: IE, Opera, Webkit
                        // TODO: identify versions
                        // getElementById can match elements by name instead of ID
                        if ( newContext && (elem = newContext.getElementById( m )) &&
                            contains( context, elem ) &&
                            elem.id === m ) {

                            results.push( elem );
                            return results;
                        }
                    }

                // Type selector
                } else if ( match[2] ) {
                    push.apply( results, context.getElementsByTagName( selector ) );
                    return results;

                // Class selector
                } else if ( (m = match[3]) && support.getElementsByClassName &&
                    context.getElementsByClassName ) {

                    push.apply( results, context.getElementsByClassName( m ) );
                    return results;
                }
            }

            // Take advantage of querySelectorAll
            if ( support.qsa &&
                !compilerCache[ selector + " " ] &&
                (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

                if ( nodeType !== 1 ) {
                    newContext = context;
                    newSelector = selector;

                // qSA looks outside Element context, which is not what we want
                // Thanks to Andrew Dupont for this workaround technique
                // Support: IE <=8
                // Exclude object elements
                } else if ( context.nodeName.toLowerCase() !== "object" ) {

                    // Capture the context ID, setting it first if necessary
                    if ( (nid = context.getAttribute( "id" )) ) {
                        nid = nid.replace( rescape, "\\$&" );
                    } else {
                        context.setAttribute( "id", (nid = expando) );
                    }

                    // Prefix every selector in the list
                    groups = tokenize( selector );
                    i = groups.length;
                    nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
                    while ( i-- ) {
                        groups[i] = nidselect + " " + toSelector( groups[i] );
                    }
                    newSelector = groups.join( "," );

                    // Expand context for sibling selectors
                    newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
                        context;
                }

                if ( newSelector ) {
                    try {
                        push.apply( results,
                            newContext.querySelectorAll( newSelector )
                        );
                        return results;
                    } catch ( qsaError ) {
                    } finally {
                        if ( nid === expando ) {
                            context.removeAttribute( "id" );
                        }
                    }
                }
            }
        }
    }

    // All others
    return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *    property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *    deleting the oldest entry
 */
function createCache() {
    var keys = [];

    function cache( key, value ) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if ( keys.push( key + " " ) > Expr.cacheLength ) {
            // Only keep the most recent entries
            delete cache[ keys.shift() ];
        }
        return (cache[ key + " " ] = value);
    }
    return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
    fn[ expando ] = true;
    return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
    var div = document.createElement("div");

    try {
        return !!fn( div );
    } catch (e) {
        return false;
    } finally {
        // Remove from its parent by default
        if ( div.parentNode ) {
            div.parentNode.removeChild( div );
        }
        // release memory in IE
        div = null;
    }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
    var arr = attrs.split("|"),
        i = arr.length;

    while ( i-- ) {
        Expr.attrHandle[ arr[i] ] = handler;
    }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
    var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
            ( ~b.sourceIndex || MAX_NEGATIVE ) -
            ( ~a.sourceIndex || MAX_NEGATIVE );

    // Use IE sourceIndex if available on both nodes
    if ( diff ) {
        return diff;
    }

    // Check if b follows a
    if ( cur ) {
        while ( (cur = cur.nextSibling) ) {
            if ( cur === b ) {
                return -1;
            }
        }
    }

    return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
    };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
    };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
    return markFunction(function( argument ) {
        argument = +argument;
        return markFunction(function( seed, matches ) {
            var j,
                matchIndexes = fn( [], seed.length, argument ),
                i = matchIndexes.length;

            // Match elements found at the specified indexes
            while ( i-- ) {
                if ( seed[ (j = matchIndexes[i]) ] ) {
                    seed[j] = !(matches[j] = seed[j]);
                }
            }
        });
    });
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
    return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
    var hasCompare, parent,
        doc = node ? node.ownerDocument || node : preferredDoc;

    // Return early if doc is invalid or already selected
    if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
        return document;
    }

    // Update global variables
    document = doc;
    docElem = document.documentElement;
    documentIsHTML = !isXML( document );

    // Support: IE 9-11, Edge
    // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
    if ( (parent = document.defaultView) && parent.top !== parent ) {
        // Support: IE 11
        if ( parent.addEventListener ) {
            parent.addEventListener( "unload", unloadHandler, false );

        // Support: IE 9 - 10 only
        } else if ( parent.attachEvent ) {
            parent.attachEvent( "onunload", unloadHandler );
        }
    }

    /* Attributes
    ---------------------------------------------------------------------- */

    // Support: IE<8
    // Verify that getAttribute really returns attributes and not properties
    // (excepting IE8 booleans)
    support.attributes = assert(function( div ) {
        div.className = "i";
        return !div.getAttribute("className");
    });

    /* getElement(s)By*
    ---------------------------------------------------------------------- */

    // Check if getElementsByTagName("*") returns only elements
    support.getElementsByTagName = assert(function( div ) {
        div.appendChild( document.createComment("") );
        return !div.getElementsByTagName("*").length;
    });

    // Support: IE<9
    support.getElementsByClassName = rnative.test( document.getElementsByClassName );

    // Support: IE<10
    // Check if getElementById returns elements by name
    // The broken getElementById methods don't pick up programatically-set names,
    // so use a roundabout getElementsByName test
    support.getById = assert(function( div ) {
        docElem.appendChild( div ).id = expando;
        return !document.getElementsByName || !document.getElementsByName( expando ).length;
    });

    // ID find and filter
    if ( support.getById ) {
        Expr.find["ID"] = function( id, context ) {
            if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                var m = context.getElementById( id );
                return m ? [ m ] : [];
            }
        };
        Expr.filter["ID"] = function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                return elem.getAttribute("id") === attrId;
            };
        };
    } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find["ID"];

        Expr.filter["ID"] =  function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                var node = typeof elem.getAttributeNode !== "undefined" &&
                    elem.getAttributeNode("id");
                return node && node.value === attrId;
            };
        };
    }

    // Tag
    Expr.find["TAG"] = support.getElementsByTagName ?
        function( tag, context ) {
            if ( typeof context.getElementsByTagName !== "undefined" ) {
                return context.getElementsByTagName( tag );

            // DocumentFragment nodes don't have gEBTN
            } else if ( support.qsa ) {
                return context.querySelectorAll( tag );
            }
        } :

        function( tag, context ) {
            var elem,
                tmp = [],
                i = 0,
                // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                results = context.getElementsByTagName( tag );

            // Filter out possible comments
            if ( tag === "*" ) {
                while ( (elem = results[i++]) ) {
                    if ( elem.nodeType === 1 ) {
                        tmp.push( elem );
                    }
                }

                return tmp;
            }
            return results;
        };

    // Class
    Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
        if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
            return context.getElementsByClassName( className );
        }
    };

    /* QSA/matchesSelector
    ---------------------------------------------------------------------- */

    // QSA and matchesSelector support

    // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
    rbuggyMatches = [];

    // qSa(:focus) reports false when true (Chrome 21)
    // We allow this because of a bug in IE8/9 that throws an error
    // whenever `document.activeElement` is accessed on an iframe
    // So, we allow :focus to pass through QSA all the time to avoid the IE error
    // See http://bugs.jquery.com/ticket/13378
    rbuggyQSA = [];

    if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function( div ) {
            // Select is set to empty string on purpose
            // This is to test IE's treatment of not explicitly
            // setting a boolean content attribute,
            // since its presence should be enough
            // http://bugs.jquery.com/ticket/12359
            docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
                "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                "<option selected=''></option></select>";

            // Support: IE8, Opera 11-12.16
            // Nothing should be selected when empty strings follow ^= or $= or *=
            // The test attribute must be unknown in Opera but "safe" for WinRT
            // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
            if ( div.querySelectorAll("[msallowcapture^='']").length ) {
                rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
            }

            // Support: IE8
            // Boolean attributes and "value" are not treated correctly
            if ( !div.querySelectorAll("[selected]").length ) {
                rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
            }

            // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
            if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
                rbuggyQSA.push("~=");
            }

            // Webkit/Opera - :checked should return selected option elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":checked").length ) {
                rbuggyQSA.push(":checked");
            }

            // Support: Safari 8+, iOS 8+
            // https://bugs.webkit.org/show_bug.cgi?id=136851
            // In-page `selector#id sibing-combinator selector` fails
            if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
                rbuggyQSA.push(".#.+[+~]");
            }
        });

        assert(function( div ) {
            // Support: Windows 8 Native Apps
            // The type and name attributes are restricted during .innerHTML assignment
            var input = document.createElement("input");
            input.setAttribute( "type", "hidden" );
            div.appendChild( input ).setAttribute( "name", "D" );

            // Support: IE8
            // Enforce case-sensitivity of name attribute
            if ( div.querySelectorAll("[name=d]").length ) {
                rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
            }

            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":enabled").length ) {
                rbuggyQSA.push( ":enabled", ":disabled" );
            }

            // Opera 10-11 does not throw on post-comma invalid pseudos
            div.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
        });
    }

    if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
        docElem.webkitMatchesSelector ||
        docElem.mozMatchesSelector ||
        docElem.oMatchesSelector ||
        docElem.msMatchesSelector) )) ) {

        assert(function( div ) {
            // Check to see if it's possible to do matchesSelector
            // on a disconnected node (IE 9)
            support.disconnectedMatch = matches.call( div, "div" );

            // This should fail with an exception
            // Gecko does not error, returns false instead
            matches.call( div, "[s!='']:x" );
            rbuggyMatches.push( "!=", pseudos );
        });
    }

    rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
    rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

    /* Contains
    ---------------------------------------------------------------------- */
    hasCompare = rnative.test( docElem.compareDocumentPosition );

    // Element contains another
    // Purposefully self-exclusive
    // As in, an element does not contain itself
    contains = hasCompare || rnative.test( docElem.contains ) ?
        function( a, b ) {
            var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
            return a === bup || !!( bup && bup.nodeType === 1 && (
                adown.contains ?
                    adown.contains( bup ) :
                    a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
            ));
        } :
        function( a, b ) {
            if ( b ) {
                while ( (b = b.parentNode) ) {
                    if ( b === a ) {
                        return true;
                    }
                }
            }
            return false;
        };

    /* Sorting
    ---------------------------------------------------------------------- */

    // Document order sorting
    sortOrder = hasCompare ?
    function( a, b ) {

        // Flag for duplicate removal
        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if ( compare ) {
            return compare;
        }

        // Calculate position if both inputs belong to the same document
        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
            a.compareDocumentPosition( b ) :

            // Otherwise we know they are disconnected
            1;

        // Disconnected nodes
        if ( compare & 1 ||
            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

            // Choose the first element that is related to our preferred document
            if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                return -1;
            }
            if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                return 1;
            }

            // Maintain original order
            return sortInput ?
                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                0;
        }

        return compare & 4 ? -1 : 1;
    } :
    function( a, b ) {
        // Exit early if the nodes are identical
        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [ a ],
            bp = [ b ];

        // Parentless nodes are either documents or disconnected
        if ( !aup || !bup ) {
            return a === document ? -1 :
                b === document ? 1 :
                aup ? -1 :
                bup ? 1 :
                sortInput ?
                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                0;

        // If the nodes are siblings, we can do a quick check
        } else if ( aup === bup ) {
            return siblingCheck( a, b );
        }

        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while ( (cur = cur.parentNode) ) {
            ap.unshift( cur );
        }
        cur = b;
        while ( (cur = cur.parentNode) ) {
            bp.unshift( cur );
        }

        // Walk down the tree looking for a discrepancy
        while ( ap[i] === bp[i] ) {
            i++;
        }

        return i ?
            // Do a sibling check if the nodes have a common ancestor
            siblingCheck( ap[i], bp[i] ) :

            // Otherwise nodes in our document sort first
            ap[i] === preferredDoc ? -1 :
            bp[i] === preferredDoc ? 1 :
            0;
    };

    return document;
};

Sizzle.matches = function( expr, elements ) {
    return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    // Make sure that attribute selectors are quoted
    expr = expr.replace( rattributeQuotes, "='$1']" );

    if ( support.matchesSelector && documentIsHTML &&
        !compilerCache[ expr + " " ] &&
        ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
        ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

        try {
            var ret = matches.call( elem, expr );

            // IE 9's matchesSelector returns false on disconnected nodes
            if ( ret || support.disconnectedMatch ||
                    // As well, disconnected nodes are said to be in a document
                    // fragment in IE 9
                    elem.document && elem.document.nodeType !== 11 ) {
                return ret;
            }
        } catch (e) {}
    }

    return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
    // Set document vars if needed
    if ( ( context.ownerDocument || context ) !== document ) {
        setDocument( context );
    }
    return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    var fn = Expr.attrHandle[ name.toLowerCase() ],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
            fn( elem, name, !documentIsHTML ) :
            undefined;

    return val !== undefined ?
        val :
        support.attributes || !documentIsHTML ?
            elem.getAttribute( name ) :
            (val = elem.getAttributeNode(name)) && val.specified ?
                val.value :
                null;
};

Sizzle.error = function( msg ) {
    throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
    var elem,
        duplicates = [],
        j = 0,
        i = 0;

    // Unless we *know* we can detect duplicates, assume their presence
    hasDuplicate = !support.detectDuplicates;
    sortInput = !support.sortStable && results.slice( 0 );
    results.sort( sortOrder );

    if ( hasDuplicate ) {
        while ( (elem = results[i++]) ) {
            if ( elem === results[ i ] ) {
                j = duplicates.push( i );
            }
        }
        while ( j-- ) {
            results.splice( duplicates[ j ], 1 );
        }
    }

    // Clear input after sorting to release objects
    // See https://github.com/jquery/sizzle/pull/225
    sortInput = null;

    return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
    var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

    if ( !nodeType ) {
        // If no nodeType, this is expected to be an array
        while ( (node = elem[i++]) ) {
            // Do not traverse comment nodes
            ret += getText( node );
        }
    } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if ( typeof elem.textContent === "string" ) {
            return elem.textContent;
        } else {
            // Traverse its children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                ret += getText( elem );
            }
        }
    } else if ( nodeType === 3 || nodeType === 4 ) {
        return elem.nodeValue;
    }
    // Do not include comment or processing instruction nodes

    return ret;
};

Expr = Sizzle.selectors = {

    // Can be adjusted by the user
    cacheLength: 50,

    createPseudo: markFunction,

    match: matchExpr,

    attrHandle: {},

    find: {},

    relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
    },

    preFilter: {
        "ATTR": function( match ) {
            match[1] = match[1].replace( runescape, funescape );

            // Move the given value to match[3] whether quoted or unquoted
            match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

            if ( match[2] === "~=" ) {
                match[3] = " " + match[3] + " ";
            }

            return match.slice( 0, 4 );
        },

        "CHILD": function( match ) {
            /* matches from matchExpr["CHILD"]
                1 type (only|nth|...)
                2 what (child|of-type)
                3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                4 xn-component of xn+y argument ([+-]?\d*n|)
                5 sign of xn-component
                6 x of xn-component
                7 sign of y-component
                8 y of y-component
            */
            match[1] = match[1].toLowerCase();

            if ( match[1].slice( 0, 3 ) === "nth" ) {
                // nth-* requires argument
                if ( !match[3] ) {
                    Sizzle.error( match[0] );
                }

                // numeric x and y parameters for Expr.filter.CHILD
                // remember that false/true cast respectively to 0/1
                match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

            // other types prohibit arguments
            } else if ( match[3] ) {
                Sizzle.error( match[0] );
            }

            return match;
        },

        "PSEUDO": function( match ) {
            var excess,
                unquoted = !match[6] && match[2];

            if ( matchExpr["CHILD"].test( match[0] ) ) {
                return null;
            }

            // Accept quoted arguments as-is
            if ( match[3] ) {
                match[2] = match[4] || match[5] || "";

            // Strip excess characters from unquoted arguments
            } else if ( unquoted && rpseudo.test( unquoted ) &&
                // Get excess from tokenize (recursively)
                (excess = tokenize( unquoted, true )) &&
                // advance to the next closing parenthesis
                (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                // excess is a negative index
                match[0] = match[0].slice( 0, excess );
                match[2] = unquoted.slice( 0, excess );
            }

            // Return only captures needed by the pseudo filter method (type and argument)
            return match.slice( 0, 3 );
        }
    },

    filter: {

        "TAG": function( nodeNameSelector ) {
            var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
            return nodeNameSelector === "*" ?
                function() { return true; } :
                function( elem ) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
        },

        "CLASS": function( className ) {
            var pattern = classCache[ className + " " ];

            return pattern ||
                (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                classCache( className, function( elem ) {
                    return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
                });
        },

        "ATTR": function( name, operator, check ) {
            return function( elem ) {
                var result = Sizzle.attr( elem, name );

                if ( result == null ) {
                    return operator === "!=";
                }
                if ( !operator ) {
                    return true;
                }

                result += "";

                return operator === "=" ? result === check :
                    operator === "!=" ? result !== check :
                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                    operator === "*=" ? check && result.indexOf( check ) > -1 :
                    operator === "$=" ? check && result.slice( -check.length ) === check :
                    operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                    false;
            };
        },

        "CHILD": function( type, what, argument, first, last ) {
            var simple = type.slice( 0, 3 ) !== "nth",
                forward = type.slice( -4 ) !== "last",
                ofType = what === "of-type";

            return first === 1 && last === 0 ?

                // Shortcut for :nth-*(n)
                function( elem ) {
                    return !!elem.parentNode;
                } :

                function( elem, context, xml ) {
                    var cache, uniqueCache, outerCache, node, nodeIndex, start,
                        dir = simple !== forward ? "nextSibling" : "previousSibling",
                        parent = elem.parentNode,
                        name = ofType && elem.nodeName.toLowerCase(),
                        useCache = !xml && !ofType,
                        diff = false;

                    if ( parent ) {

                        // :(first|last|only)-(child|of-type)
                        if ( simple ) {
                            while ( dir ) {
                                node = elem;
                                while ( (node = node[ dir ]) ) {
                                    if ( ofType ?
                                        node.nodeName.toLowerCase() === name :
                                        node.nodeType === 1 ) {

                                        return false;
                                    }
                                }
                                // Reverse direction for :only-* (if we haven't yet done so)
                                start = dir = type === "only" && !start && "nextSibling";
                            }
                            return true;
                        }

                        start = [ forward ? parent.firstChild : parent.lastChild ];

                        // non-xml :nth-child(...) stores cache data on `parent`
                        if ( forward && useCache ) {

                            // Seek `elem` from a previously-cached index

                            // ...in a gzip-friendly way
                            node = parent;
                            outerCache = node[ expando ] || (node[ expando ] = {});

                            // Support: IE <9 only
                            // Defend against cloned attroperties (jQuery gh-1709)
                            uniqueCache = outerCache[ node.uniqueID ] ||
                                (outerCache[ node.uniqueID ] = {});

                            cache = uniqueCache[ type ] || [];
                            nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                            diff = nodeIndex && cache[ 2 ];
                            node = nodeIndex && parent.childNodes[ nodeIndex ];

                            while ( (node = ++nodeIndex && node && node[ dir ] ||

                                // Fallback to seeking `elem` from the start
                                (diff = nodeIndex = 0) || start.pop()) ) {

                                // When found, cache indexes on `parent` and break
                                if ( node.nodeType === 1 && ++diff && node === elem ) {
                                    uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            }

                        } else {
                            // Use previously-cached element index if available
                            if ( useCache ) {
                                // ...in a gzip-friendly way
                                node = elem;
                                outerCache = node[ expando ] || (node[ expando ] = {});

                                // Support: IE <9 only
                                // Defend against cloned attroperties (jQuery gh-1709)
                                uniqueCache = outerCache[ node.uniqueID ] ||
                                    (outerCache[ node.uniqueID ] = {});

                                cache = uniqueCache[ type ] || [];
                                nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                                diff = nodeIndex;
                            }

                            // xml :nth-child(...)
                            // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                            if ( diff === false ) {
                                // Use the same loop as above to seek `elem` from the start
                                while ( (node = ++nodeIndex && node && node[ dir ] ||
                                    (diff = nodeIndex = 0) || start.pop()) ) {

                                    if ( ( ofType ?
                                        node.nodeName.toLowerCase() === name :
                                        node.nodeType === 1 ) &&
                                        ++diff ) {

                                        // Cache the index of each encountered element
                                        if ( useCache ) {
                                            outerCache = node[ expando ] || (node[ expando ] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[ node.uniqueID ] ||
                                                (outerCache[ node.uniqueID ] = {});

                                            uniqueCache[ type ] = [ dirruns, diff ];
                                        }

                                        if ( node === elem ) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        // Incorporate the offset, then check against cycle size
                        diff -= last;
                        return diff === first || ( diff % first === 0 && diff / first >= 0 );
                    }
                };
        },

        "PSEUDO": function( pseudo, argument ) {
            // pseudo-class names are case-insensitive
            // http://www.w3.org/TR/selectors/#pseudo-classes
            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
            // Remember that setFilters inherits from pseudos
            var args,
                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                    Sizzle.error( "unsupported pseudo: " + pseudo );

            // The user may use createPseudo to indicate that
            // arguments are needed to create the filter function
            // just as Sizzle does
            if ( fn[ expando ] ) {
                return fn( argument );
            }

            // But maintain support for old signatures
            if ( fn.length > 1 ) {
                args = [ pseudo, pseudo, "", argument ];
                return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                    markFunction(function( seed, matches ) {
                        var idx,
                            matched = fn( seed, argument ),
                            i = matched.length;
                        while ( i-- ) {
                            idx = indexOf( seed, matched[i] );
                            seed[ idx ] = !( matches[ idx ] = matched[i] );
                        }
                    }) :
                    function( elem ) {
                        return fn( elem, 0, args );
                    };
            }

            return fn;
        }
    },

    pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function( selector ) {
            // Trim the selector passed to compile
            // to avoid treating leading and trailing
            // spaces as combinators
            var input = [],
                results = [],
                matcher = compile( selector.replace( rtrim, "$1" ) );

            return matcher[ expando ] ?
                markFunction(function( seed, matches, context, xml ) {
                    var elem,
                        unmatched = matcher( seed, null, xml, [] ),
                        i = seed.length;

                    // Match elements unmatched by `matcher`
                    while ( i-- ) {
                        if ( (elem = unmatched[i]) ) {
                            seed[i] = !(matches[i] = elem);
                        }
                    }
                }) :
                function( elem, context, xml ) {
                    input[0] = elem;
                    matcher( input, null, xml, results );
                    // Don't keep the element (issue #299)
                    input[0] = null;
                    return !results.pop();
                };
        }),

        "has": markFunction(function( selector ) {
            return function( elem ) {
                return Sizzle( selector, elem ).length > 0;
            };
        }),

        "contains": markFunction(function( text ) {
            text = text.replace( runescape, funescape );
            return function( elem ) {
                return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
            };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction( function( lang ) {
            // lang value must be a valid identifier
            if ( !ridentifier.test(lang || "") ) {
                Sizzle.error( "unsupported lang: " + lang );
            }
            lang = lang.replace( runescape, funescape ).toLowerCase();
            return function( elem ) {
                var elemLang;
                do {
                    if ( (elemLang = documentIsHTML ?
                        elem.lang :
                        elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                        elemLang = elemLang.toLowerCase();
                        return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                    }
                } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                return false;
            };
        }),

        // Miscellaneous
        "target": function( elem ) {
            var hash = window.location && window.location.hash;
            return hash && hash.slice( 1 ) === elem.id;
        },

        "root": function( elem ) {
            return elem === docElem;
        },

        "focus": function( elem ) {
            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        "enabled": function( elem ) {
            return elem.disabled === false;
        },

        "disabled": function( elem ) {
            return elem.disabled === true;
        },

        "checked": function( elem ) {
            // In CSS3, :checked should return both checked and selected elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            var nodeName = elem.nodeName.toLowerCase();
            return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        "selected": function( elem ) {
            // Accessing this property makes selected-by-default
            // options in Safari work properly
            if ( elem.parentNode ) {
                elem.parentNode.selectedIndex;
            }

            return elem.selected === true;
        },

        // Contents
        "empty": function( elem ) {
            // http://www.w3.org/TR/selectors/#empty-pseudo
            // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
            //   but not by others (comment: 8; processing instruction: 7; etc.)
            // nodeType < 6 works because attributes (2) do not appear as children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                if ( elem.nodeType < 6 ) {
                    return false;
                }
            }
            return true;
        },

        "parent": function( elem ) {
            return !Expr.pseudos["empty"]( elem );
        },

        // Element/input types
        "header": function( elem ) {
            return rheader.test( elem.nodeName );
        },

        "input": function( elem ) {
            return rinputs.test( elem.nodeName );
        },

        "button": function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === "button" || name === "button";
        },

        "text": function( elem ) {
            var attr;
            return elem.nodeName.toLowerCase() === "input" &&
                elem.type === "text" &&

                // Support: IE<8
                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
        },

        // Position-in-collection
        "first": createPositionalPseudo(function() {
            return [ 0 ];
        }),

        "last": createPositionalPseudo(function( matchIndexes, length ) {
            return [ length - 1 ];
        }),

        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
            return [ argument < 0 ? argument + length : argument ];
        }),

        "even": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 0;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "odd": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 1;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; --i >= 0; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; ++i < length; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        })
    }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
    Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
    Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
    var matched, match, tokens, type,
        soFar, groups, preFilters,
        cached = tokenCache[ selector + " " ];

    if ( cached ) {
        return parseOnly ? 0 : cached.slice( 0 );
    }

    soFar = selector;
    groups = [];
    preFilters = Expr.preFilter;

    while ( soFar ) {

        // Comma and first run
        if ( !matched || (match = rcomma.exec( soFar )) ) {
            if ( match ) {
                // Don't consume trailing commas as valid
                soFar = soFar.slice( match[0].length ) || soFar;
            }
            groups.push( (tokens = []) );
        }

        matched = false;

        // Combinators
        if ( (match = rcombinators.exec( soFar )) ) {
            matched = match.shift();
            tokens.push({
                value: matched,
                // Cast descendant combinators to space
                type: match[0].replace( rtrim, " " )
            });
            soFar = soFar.slice( matched.length );
        }

        // Filters
        for ( type in Expr.filter ) {
            if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                (match = preFilters[ type ]( match ))) ) {
                matched = match.shift();
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                });
                soFar = soFar.slice( matched.length );
            }
        }

        if ( !matched ) {
            break;
        }
    }

    // Return the length of the invalid excess
    // if we're just parsing
    // Otherwise, throw an error or return tokens
    return parseOnly ?
        soFar.length :
        soFar ?
            Sizzle.error( selector ) :
            // Cache the tokens
            tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
    var i = 0,
        len = tokens.length,
        selector = "";
    for ( ; i < len; i++ ) {
        selector += tokens[i].value;
    }
    return selector;
}

function addCombinator( matcher, combinator, base ) {
    var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;

    return combinator.first ?
        // Check against closest ancestor/preceding element
        function( elem, context, xml ) {
            while ( (elem = elem[ dir ]) ) {
                if ( elem.nodeType === 1 || checkNonElements ) {
                    return matcher( elem, context, xml );
                }
            }
        } :

        // Check against all ancestor/preceding elements
        function( elem, context, xml ) {
            var oldCache, uniqueCache, outerCache,
                newCache = [ dirruns, doneName ];

            // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
            if ( xml ) {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        if ( matcher( elem, context, xml ) ) {
                            return true;
                        }
                    }
                }
            } else {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        outerCache = elem[ expando ] || (elem[ expando ] = {});

                        // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)
                        uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

                        if ( (oldCache = uniqueCache[ dir ]) &&
                            oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                            // Assign to newCache so results back-propagate to previous elements
                            return (newCache[ 2 ] = oldCache[ 2 ]);
                        } else {
                            // Reuse newcache so results back-propagate to previous elements
                            uniqueCache[ dir ] = newCache;

                            // A match means we're done; a fail means we have to keep checking
                            if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                return true;
                            }
                        }
                    }
                }
            }
        };
}

function elementMatcher( matchers ) {
    return matchers.length > 1 ?
        function( elem, context, xml ) {
            var i = matchers.length;
            while ( i-- ) {
                if ( !matchers[i]( elem, context, xml ) ) {
                    return false;
                }
            }
            return true;
        } :
        matchers[0];
}

function multipleContexts( selector, contexts, results ) {
    var i = 0,
        len = contexts.length;
    for ( ; i < len; i++ ) {
        Sizzle( selector, contexts[i], results );
    }
    return results;
}

function condense( unmatched, map, filter, context, xml ) {
    var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

    for ( ; i < len; i++ ) {
        if ( (elem = unmatched[i]) ) {
            if ( !filter || filter( elem, context, xml ) ) {
                newUnmatched.push( elem );
                if ( mapped ) {
                    map.push( i );
                }
            }
        }
    }

    return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
    if ( postFilter && !postFilter[ expando ] ) {
        postFilter = setMatcher( postFilter );
    }
    if ( postFinder && !postFinder[ expando ] ) {
        postFinder = setMatcher( postFinder, postSelector );
    }
    return markFunction(function( seed, results, context, xml ) {
        var temp, i, elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,

            // Get initial elements from seed or context
            elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

            // Prefilter to get matcher input, preserving a map for seed-results synchronization
            matcherIn = preFilter && ( seed || !selector ) ?
                condense( elems, preMap, preFilter, context, xml ) :
                elems,

            matcherOut = matcher ?
                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                    // ...intermediate processing is necessary
                    [] :

                    // ...otherwise use results directly
                    results :
                matcherIn;

        // Find primary matches
        if ( matcher ) {
            matcher( matcherIn, matcherOut, context, xml );
        }

        // Apply postFilter
        if ( postFilter ) {
            temp = condense( matcherOut, postMap );
            postFilter( temp, [], context, xml );

            // Un-match failing elements by moving them back to matcherIn
            i = temp.length;
            while ( i-- ) {
                if ( (elem = temp[i]) ) {
                    matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                }
            }
        }

        if ( seed ) {
            if ( postFinder || preFilter ) {
                if ( postFinder ) {
                    // Get the final matcherOut by condensing this intermediate into postFinder contexts
                    temp = [];
                    i = matcherOut.length;
                    while ( i-- ) {
                        if ( (elem = matcherOut[i]) ) {
                            // Restore matcherIn since elem is not yet a final match
                            temp.push( (matcherIn[i] = elem) );
                        }
                    }
                    postFinder( null, (matcherOut = []), temp, xml );
                }

                // Move matched elements from seed to results to keep them synchronized
                i = matcherOut.length;
                while ( i-- ) {
                    if ( (elem = matcherOut[i]) &&
                        (temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

                        seed[temp] = !(results[temp] = elem);
                    }
                }
            }

        // Add elements to results, through postFinder if defined
        } else {
            matcherOut = condense(
                matcherOut === results ?
                    matcherOut.splice( preexisting, matcherOut.length ) :
                    matcherOut
            );
            if ( postFinder ) {
                postFinder( null, results, matcherOut, xml );
            } else {
                push.apply( results, matcherOut );
            }
        }
    });
}

function matcherFromTokens( tokens ) {
    var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[ tokens[0].type ],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator( function( elem ) {
            return elem === checkContext;
        }, implicitRelative, true ),
        matchAnyContext = addCombinator( function( elem ) {
            return indexOf( checkContext, elem ) > -1;
        }, implicitRelative, true ),
        matchers = [ function( elem, context, xml ) {
            var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                (checkContext = context).nodeType ?
                    matchContext( elem, context, xml ) :
                    matchAnyContext( elem, context, xml ) );
            // Avoid hanging onto element (issue #299)
            checkContext = null;
            return ret;
        } ];

    for ( ; i < len; i++ ) {
        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
            matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
        } else {
            matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

            // Return special upon seeing a positional matcher
            if ( matcher[ expando ] ) {
                // Find the next relative operator (if any) for proper handling
                j = ++i;
                for ( ; j < len; j++ ) {
                    if ( Expr.relative[ tokens[j].type ] ) {
                        break;
                    }
                }
                return setMatcher(
                    i > 1 && elementMatcher( matchers ),
                    i > 1 && toSelector(
                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                        tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                    ).replace( rtrim, "$1" ),
                    matcher,
                    i < j && matcherFromTokens( tokens.slice( i, j ) ),
                    j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                    j < len && toSelector( tokens )
                );
            }
            matchers.push( matcher );
        }
    }

    return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
    var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function( seed, context, xml, results, outermost ) {
            var elem, j, matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                // We must always have either seed elements or outermost context
                elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                // Use integer dirruns iff this is the outermost matcher
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;

            if ( outermost ) {
                outermostContext = context === document || context || outermost;
            }

            // Add elements passing elementMatchers directly to results
            // Support: IE<9, Safari
            // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
            for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                if ( byElement && elem ) {
                    j = 0;
                    if ( !context && elem.ownerDocument !== document ) {
                        setDocument( elem );
                        xml = !documentIsHTML;
                    }
                    while ( (matcher = elementMatchers[j++]) ) {
                        if ( matcher( elem, context || document, xml) ) {
                            results.push( elem );
                            break;
                        }
                    }
                    if ( outermost ) {
                        dirruns = dirrunsUnique;
                    }
                }

                // Track unmatched elements for set filters
                if ( bySet ) {
                    // They will have gone through all possible matchers
                    if ( (elem = !matcher && elem) ) {
                        matchedCount--;
                    }

                    // Lengthen the array for every element, matched or not
                    if ( seed ) {
                        unmatched.push( elem );
                    }
                }
            }

            // `i` is now the count of elements visited above, and adding it to `matchedCount`
            // makes the latter nonnegative.
            matchedCount += i;

            // Apply set filters to unmatched elements
            // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
            // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
            // no element matchers and no seed.
            // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
            // case, which will result in a "00" `matchedCount` that differs from `i` but is also
            // numerically zero.
            if ( bySet && i !== matchedCount ) {
                j = 0;
                while ( (matcher = setMatchers[j++]) ) {
                    matcher( unmatched, setMatched, context, xml );
                }

                if ( seed ) {
                    // Reintegrate element matches to eliminate the need for sorting
                    if ( matchedCount > 0 ) {
                        while ( i-- ) {
                            if ( !(unmatched[i] || setMatched[i]) ) {
                                setMatched[i] = pop.call( results );
                            }
                        }
                    }

                    // Discard index placeholder values to get only actual matches
                    setMatched = condense( setMatched );
                }

                // Add matches to results
                push.apply( results, setMatched );

                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                if ( outermost && !seed && setMatched.length > 0 &&
                    ( matchedCount + setMatchers.length ) > 1 ) {

                    Sizzle.uniqueSort( results );
                }
            }

            // Override manipulation of globals by nested matchers
            if ( outermost ) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
            }

            return unmatched;
        };

    return bySet ?
        markFunction( superMatcher ) :
        superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
    var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[ selector + " " ];

    if ( !cached ) {
        // Generate a function of recursive functions that can be used to check each element
        if ( !match ) {
            match = tokenize( selector );
        }
        i = match.length;
        while ( i-- ) {
            cached = matcherFromTokens( match[i] );
            if ( cached[ expando ] ) {
                setMatchers.push( cached );
            } else {
                elementMatchers.push( cached );
            }
        }

        // Cache the compiled function
        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

        // Save selector and tokenization
        cached.selector = selector;
    }
    return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
    var i, tokens, token, type, find,
        compiled = typeof selector === "function" && selector,
        match = !seed && tokenize( (selector = compiled.selector || selector) );

    results = results || [];

    // Try to minimize operations if there is only one selector in the list and no seed
    // (the latter of which guarantees us context)
    if ( match.length === 1 ) {

        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice( 0 );
        if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                support.getById && context.nodeType === 9 && documentIsHTML &&
                Expr.relative[ tokens[1].type ] ) {

            context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
            if ( !context ) {
                return results;

            // Precompiled matchers will still verify ancestry, so step up a level
            } else if ( compiled ) {
                context = context.parentNode;
            }

            selector = selector.slice( tokens.shift().value.length );
        }

        // Fetch a seed set for right-to-left matching
        i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
        while ( i-- ) {
            token = tokens[i];

            // Abort if we hit a combinator
            if ( Expr.relative[ (type = token.type) ] ) {
                break;
            }
            if ( (find = Expr.find[ type ]) ) {
                // Search, expanding context for leading sibling combinators
                if ( (seed = find(
                    token.matches[0].replace( runescape, funescape ),
                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                )) ) {

                    // If seed is empty or no tokens remain, we can return early
                    tokens.splice( i, 1 );
                    selector = seed.length && toSelector( tokens );
                    if ( !selector ) {
                        push.apply( results, seed );
                        return results;
                    }

                    break;
                }
            }
        }
    }

    // Compile and execute a filtering function if one is not provided
    // Provide `match` to avoid retokenization if we modified the selector above
    ( compiled || compile( selector, match ) )(
        seed,
        context,
        !documentIsHTML,
        results,
        !context || rsibling.test( selector ) && testContext( context.parentNode ) || context
    );
    return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
    // Should return 1, but returns 4 (following)
    return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
    div.innerHTML = "<a href='#'></a>";
    return div.firstChild.getAttribute("href") === "#" ;
}) ) {
    addHandle( "type|href|height|width", function( elem, name, isXML ) {
        if ( !isXML ) {
            return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
        }
    });
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
    div.innerHTML = "<input/>";
    div.firstChild.setAttribute( "value", "" );
    return div.firstChild.getAttribute( "value" ) === "";
}) ) {
    addHandle( "value", function( elem, name, isXML ) {
        if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
            return elem.defaultValue;
        }
    });
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
    return div.getAttribute("disabled") == null;
}) ) {
    addHandle( booleans, function( elem, name, isXML ) {
        var val;
        if ( !isXML ) {
            return elem[ name ] === true ? name.toLowerCase() :
                    (val = elem.getAttributeNode( name )) && val.specified ?
                    val.value :
                null;
        }
    });
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
    var matched = [],
        truncate = until !== undefined;

    while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
        if ( elem.nodeType === 1 ) {
            if ( truncate && jQuery( elem ).is( until ) ) {
                break;
            }
            matched.push( elem );
        }
    }
    return matched;
};


var siblings = function( n, elem ) {
    var matched = [];

    for ( ; n; n = n.nextSibling ) {
        if ( n.nodeType === 1 && n !== elem ) {
            matched.push( n );
        }
    }

    return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
    if ( jQuery.isFunction( qualifier ) ) {
        return jQuery.grep( elements, function( elem, i ) {
            /* jshint -W018 */
            return !!qualifier.call( elem, i, elem ) !== not;
        } );

    }

    if ( qualifier.nodeType ) {
        return jQuery.grep( elements, function( elem ) {
            return ( elem === qualifier ) !== not;
        } );

    }

    if ( typeof qualifier === "string" ) {
        if ( risSimple.test( qualifier ) ) {
            return jQuery.filter( qualifier, elements, not );
        }

        qualifier = jQuery.filter( qualifier, elements );
    }

    return jQuery.grep( elements, function( elem ) {
        return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
    } );
}

jQuery.filter = function( expr, elems, not ) {
    var elem = elems[ 0 ];

    if ( not ) {
        expr = ":not(" + expr + ")";
    }

    return elems.length === 1 && elem.nodeType === 1 ?
        jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
        jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
            return elem.nodeType === 1;
        } ) );
};

jQuery.fn.extend( {
    find: function( selector ) {
        var i,
            ret = [],
            self = this,
            len = self.length;

        if ( typeof selector !== "string" ) {
            return this.pushStack( jQuery( selector ).filter( function() {
                for ( i = 0; i < len; i++ ) {
                    if ( jQuery.contains( self[ i ], this ) ) {
                        return true;
                    }
                }
            } ) );
        }

        for ( i = 0; i < len; i++ ) {
            jQuery.find( selector, self[ i ], ret );
        }

        // Needed because $( selector, context ) becomes $( context ).find( selector )
        ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
        ret.selector = this.selector ? this.selector + " " + selector : selector;
        return ret;
    },
    filter: function( selector ) {
        return this.pushStack( winnow( this, selector || [], false ) );
    },
    not: function( selector ) {
        return this.pushStack( winnow( this, selector || [], true ) );
    },
    is: function( selector ) {
        return !!winnow(
            this,

            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            typeof selector === "string" && rneedsContext.test( selector ) ?
                jQuery( selector ) :
                selector || [],
            false
        ).length;
    }
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

    init = jQuery.fn.init = function( selector, context, root ) {
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if ( !selector ) {
            return this;
        }

        // init accepts an alternate rootjQuery
        // so migrate can support jQuery.sub (gh-2101)
        root = root || rootjQuery;

        // Handle HTML strings
        if ( typeof selector === "string" ) {
            if ( selector.charAt( 0 ) === "<" &&
                selector.charAt( selector.length - 1 ) === ">" &&
                selector.length >= 3 ) {

                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [ null, selector, null ];

            } else {
                match = rquickExpr.exec( selector );
            }

            // Match html or make sure no context is specified for #id
            if ( match && ( match[ 1 ] || !context ) ) {

                // HANDLE: $(html) -> $(array)
                if ( match[ 1 ] ) {
                    context = context instanceof jQuery ? context[ 0 ] : context;

                    // scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    jQuery.merge( this, jQuery.parseHTML(
                        match[ 1 ],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ) );

                    // HANDLE: $(html, props)
                    if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
                        for ( match in context ) {

                            // Properties of context are called as methods if possible
                            if ( jQuery.isFunction( this[ match ] ) ) {
                                this[ match ]( context[ match ] );

                            // ...and otherwise set as attributes
                            } else {
                                this.attr( match, context[ match ] );
                            }
                        }
                    }

                    return this;

                // HANDLE: $(#id)
                } else {
                    elem = document.getElementById( match[ 2 ] );

                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if ( elem && elem.parentNode ) {

                        // Handle the case where IE and Opera return items
                        // by name instead of ID
                        if ( elem.id !== match[ 2 ] ) {
                            return rootjQuery.find( selector );
                        }

                        // Otherwise, we inject the element directly into the jQuery object
                        this.length = 1;
                        this[ 0 ] = elem;
                    }

                    this.context = document;
                    this.selector = selector;
                    return this;
                }

            // HANDLE: $(expr, $(...))
            } else if ( !context || context.jquery ) {
                return ( context || root ).find( selector );

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
            } else {
                return this.constructor( context ).find( selector );
            }

        // HANDLE: $(DOMElement)
        } else if ( selector.nodeType ) {
            this.context = this[ 0 ] = selector;
            this.length = 1;
            return this;

        // HANDLE: $(function)
        // Shortcut for document ready
        } else if ( jQuery.isFunction( selector ) ) {
            return typeof root.ready !== "undefined" ?
                root.ready( selector ) :

                // Execute immediately if ready is not present
                selector( jQuery );
        }

        if ( selector.selector !== undefined ) {
            this.selector = selector.selector;
            this.context = selector.context;
        }

        return jQuery.makeArray( selector, this );
    };

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

    // methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };

jQuery.fn.extend( {
    has: function( target ) {
        var i,
            targets = jQuery( target, this ),
            len = targets.length;

        return this.filter( function() {
            for ( i = 0; i < len; i++ ) {
                if ( jQuery.contains( this, targets[ i ] ) ) {
                    return true;
                }
            }
        } );
    },

    closest: function( selectors, context ) {
        var cur,
            i = 0,
            l = this.length,
            matched = [],
            pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
                jQuery( selectors, context || this.context ) :
                0;

        for ( ; i < l; i++ ) {
            for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

                // Always skip document fragments
                if ( cur.nodeType < 11 && ( pos ?
                    pos.index( cur ) > -1 :

                    // Don't pass non-elements to Sizzle
                    cur.nodeType === 1 &&
                        jQuery.find.matchesSelector( cur, selectors ) ) ) {

                    matched.push( cur );
                    break;
                }
            }
        }

        return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
    },

    // Determine the position of an element within
    // the matched set of elements
    index: function( elem ) {

        // No argument, return index in parent
        if ( !elem ) {
            return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
        }

        // index in selector
        if ( typeof elem === "string" ) {
            return jQuery.inArray( this[ 0 ], jQuery( elem ) );
        }

        // Locate the position of the desired element
        return jQuery.inArray(

            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[ 0 ] : elem, this );
    },

    add: function( selector, context ) {
        return this.pushStack(
            jQuery.uniqueSort(
                jQuery.merge( this.get(), jQuery( selector, context ) )
            )
        );
    },

    addBack: function( selector ) {
        return this.add( selector == null ?
            this.prevObject : this.prevObject.filter( selector )
        );
    }
} );

function sibling( cur, dir ) {
    do {
        cur = cur[ dir ];
    } while ( cur && cur.nodeType !== 1 );

    return cur;
}

jQuery.each( {
    parent: function( elem ) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function( elem ) {
        return dir( elem, "parentNode" );
    },
    parentsUntil: function( elem, i, until ) {
        return dir( elem, "parentNode", until );
    },
    next: function( elem ) {
        return sibling( elem, "nextSibling" );
    },
    prev: function( elem ) {
        return sibling( elem, "previousSibling" );
    },
    nextAll: function( elem ) {
        return dir( elem, "nextSibling" );
    },
    prevAll: function( elem ) {
        return dir( elem, "previousSibling" );
    },
    nextUntil: function( elem, i, until ) {
        return dir( elem, "nextSibling", until );
    },
    prevUntil: function( elem, i, until ) {
        return dir( elem, "previousSibling", until );
    },
    siblings: function( elem ) {
        return siblings( ( elem.parentNode || {} ).firstChild, elem );
    },
    children: function( elem ) {
        return siblings( elem.firstChild );
    },
    contents: function( elem ) {
        return jQuery.nodeName( elem, "iframe" ) ?
            elem.contentDocument || elem.contentWindow.document :
            jQuery.merge( [], elem.childNodes );
    }
}, function( name, fn ) {
    jQuery.fn[ name ] = function( until, selector ) {
        var ret = jQuery.map( this, fn, until );

        if ( name.slice( -5 ) !== "Until" ) {
            selector = until;
        }

        if ( selector && typeof selector === "string" ) {
            ret = jQuery.filter( selector, ret );
        }

        if ( this.length > 1 ) {

            // Remove duplicates
            if ( !guaranteedUnique[ name ] ) {
                ret = jQuery.uniqueSort( ret );
            }

            // Reverse order for parents* and prev-derivatives
            if ( rparentsprev.test( name ) ) {
                ret = ret.reverse();
            }
        }

        return this.pushStack( ret );
    };
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
    var object = {};
    jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
        object[ flag ] = true;
    } );
    return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *    options: an optional list of space-separated options that will change how
 *            the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *    once:            will ensure the callback list can only be fired once (like a Deferred)
 *
 *    memory:            will keep track of previous values and will call any callback added
 *                    after the list has been fired right away with the latest "memorized"
 *                    values (like a Deferred)
 *
 *    unique:            will ensure a callback can only be added once (no duplicate in the list)
 *
 *    stopOnFalse:    interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ?
        createOptions( options ) :
        jQuery.extend( {}, options );

    var // Flag to know if list is currently firing
        firing,

        // Last fire value for non-forgettable lists
        memory,

        // Flag to know if list was already fired
        fired,

        // Flag to prevent firing
        locked,

        // Actual callback list
        list = [],

        // Queue of execution data for repeatable lists
        queue = [],

        // Index of currently firing callback (modified by add/remove as needed)
        firingIndex = -1,

        // Fire callbacks
        fire = function() {

            // Enforce single-firing
            locked = options.once;

            // Execute callbacks for all pending executions,
            // respecting firingIndex overrides and runtime changes
            fired = firing = true;
            for ( ; queue.length; firingIndex = -1 ) {
                memory = queue.shift();
                while ( ++firingIndex < list.length ) {

                    // Run callback and check for early termination
                    if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
                        options.stopOnFalse ) {

                        // Jump to end and forget the data so .add doesn't re-fire
                        firingIndex = list.length;
                        memory = false;
                    }
                }
            }

            // Forget the data if we're done with it
            if ( !options.memory ) {
                memory = false;
            }

            firing = false;

            // Clean up if we're done firing for good
            if ( locked ) {

                // Keep an empty list if we have data for future add calls
                if ( memory ) {
                    list = [];

                // Otherwise, this object is spent
                } else {
                    list = "";
                }
            }
        },

        // Actual Callbacks object
        self = {

            // Add a callback or a collection of callbacks to the list
            add: function() {
                if ( list ) {

                    // If we have memory from a past run, we should fire after adding
                    if ( memory && !firing ) {
                        firingIndex = list.length - 1;
                        queue.push( memory );
                    }

                    ( function add( args ) {
                        jQuery.each( args, function( _, arg ) {
                            if ( jQuery.isFunction( arg ) ) {
                                if ( !options.unique || !self.has( arg ) ) {
                                    list.push( arg );
                                }
                            } else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

                                // Inspect recursively
                                add( arg );
                            }
                        } );
                    } )( arguments );

                    if ( memory && !firing ) {
                        fire();
                    }
                }
                return this;
            },

            // Remove a callback from the list
            remove: function() {
                jQuery.each( arguments, function( _, arg ) {
                    var index;
                    while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                        list.splice( index, 1 );

                        // Handle firing indexes
                        if ( index <= firingIndex ) {
                            firingIndex--;
                        }
                    }
                } );
                return this;
            },

            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            has: function( fn ) {
                return fn ?
                    jQuery.inArray( fn, list ) > -1 :
                    list.length > 0;
            },

            // Remove all callbacks from the list
            empty: function() {
                if ( list ) {
                    list = [];
                }
                return this;
            },

            // Disable .fire and .add
            // Abort any current/pending executions
            // Clear all callbacks and values
            disable: function() {
                locked = queue = [];
                list = memory = "";
                return this;
            },
            disabled: function() {
                return !list;
            },

            // Disable .fire
            // Also disable .add unless we have memory (since it would have no effect)
            // Abort any pending executions
            lock: function() {
                locked = true;
                if ( !memory ) {
                    self.disable();
                }
                return this;
            },
            locked: function() {
                return !!locked;
            },

            // Call all callbacks with the given context and arguments
            fireWith: function( context, args ) {
                if ( !locked ) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    queue.push( args );
                    if ( !firing ) {
                        fire();
                    }
                }
                return this;
            },

            // Call all the callbacks with the given arguments
            fire: function() {
                self.fireWith( this, arguments );
                return this;
            },

            // To know if the callbacks have already been called at least once
            fired: function() {
                return !!fired;
            }
        };

    return self;
};


jQuery.extend( {

    Deferred: function( func ) {
        var tuples = [

                // action, add listener, listener list, final state
                [ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
                [ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
                [ "notify", "progress", jQuery.Callbacks( "memory" ) ]
            ],
            state = "pending",
            promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done( arguments ).fail( arguments );
                    return this;
                },
                then: function( /* fnDone, fnFail, fnProgress */ ) {
                    var fns = arguments;
                    return jQuery.Deferred( function( newDefer ) {
                        jQuery.each( tuples, function( i, tuple ) {
                            var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
                            deferred[ tuple[ 1 ] ]( function() {
                                var returned = fn && fn.apply( this, arguments );
                                if ( returned && jQuery.isFunction( returned.promise ) ) {
                                    returned.promise()
                                        .progress( newDefer.notify )
                                        .done( newDefer.resolve )
                                        .fail( newDefer.reject );
                                } else {
                                    newDefer[ tuple[ 0 ] + "With" ](
                                        this === promise ? newDefer.promise() : this,
                                        fn ? [ returned ] : arguments
                                    );
                                }
                            } );
                        } );
                        fns = null;
                    } ).promise();
                },

                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function( obj ) {
                    return obj != null ? jQuery.extend( obj, promise ) : promise;
                }
            },
            deferred = {};

        // Keep pipe for back-compat
        promise.pipe = promise.then;

        // Add list-specific methods
        jQuery.each( tuples, function( i, tuple ) {
            var list = tuple[ 2 ],
                stateString = tuple[ 3 ];

            // promise[ done | fail | progress ] = list.add
            promise[ tuple[ 1 ] ] = list.add;

            // Handle state
            if ( stateString ) {
                list.add( function() {

                    // state = [ resolved | rejected ]
                    state = stateString;

                // [ reject_list | resolve_list ].disable; progress_list.lock
                }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
            }

            // deferred[ resolve | reject | notify ]
            deferred[ tuple[ 0 ] ] = function() {
                deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
                return this;
            };
            deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
        } );

        // Make the deferred a promise
        promise.promise( deferred );

        // Call given func if any
        if ( func ) {
            func.call( deferred, deferred );
        }

        // All done!
        return deferred;
    },

    // Deferred helper
    when: function( subordinate /* , ..., subordinateN */ ) {
        var i = 0,
            resolveValues = slice.call( arguments ),
            length = resolveValues.length,

            // the count of uncompleted subordinates
            remaining = length !== 1 ||
                ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

            // the master Deferred.
            // If resolveValues consist of only a single Deferred, just use that.
            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

            // Update function for both resolve and progress values
            updateFunc = function( i, contexts, values ) {
                return function( value ) {
                    contexts[ i ] = this;
                    values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                    if ( values === progressValues ) {
                        deferred.notifyWith( contexts, values );

                    } else if ( !( --remaining ) ) {
                        deferred.resolveWith( contexts, values );
                    }
                };
            },

            progressValues, progressContexts, resolveContexts;

        // add listeners to Deferred subordinates; treat others as resolved
        if ( length > 1 ) {
            progressValues = new Array( length );
            progressContexts = new Array( length );
            resolveContexts = new Array( length );
            for ( ; i < length; i++ ) {
                if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                    resolveValues[ i ].promise()
                        .progress( updateFunc( i, progressContexts, progressValues ) )
                        .done( updateFunc( i, resolveContexts, resolveValues ) )
                        .fail( deferred.reject );
                } else {
                    --remaining;
                }
            }
        }

        // if we're not waiting on anything, resolve the master
        if ( !remaining ) {
            deferred.resolveWith( resolveContexts, resolveValues );
        }

        return deferred.promise();
    }
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

    // Add the callback
    jQuery.ready.promise().done( fn );

    return this;
};

jQuery.extend( {

    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,

    // Hold (or release) the ready event
    holdReady: function( hold ) {
        if ( hold ) {
            jQuery.readyWait++;
        } else {
            jQuery.ready( true );
        }
    },

    // Handle when the DOM is ready
    ready: function( wait ) {

        // Abort if there are pending holds or we're already ready
        if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
            return;
        }

        // Remember that the DOM is ready
        jQuery.isReady = true;

        // If a normal DOM Ready event fired, decrement, and wait if need be
        if ( wait !== true && --jQuery.readyWait > 0 ) {
            return;
        }

        // If there are functions bound, to execute
        readyList.resolveWith( document, [ jQuery ] );

        // Trigger any bound ready events
        if ( jQuery.fn.triggerHandler ) {
            jQuery( document ).triggerHandler( "ready" );
            jQuery( document ).off( "ready" );
        }
    }
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
    if ( document.addEventListener ) {
        document.removeEventListener( "DOMContentLoaded", completed );
        window.removeEventListener( "load", completed );

    } else {
        document.detachEvent( "onreadystatechange", completed );
        window.detachEvent( "onload", completed );
    }
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

    // readyState === "complete" is good enough for us to call the dom ready in oldIE
    if ( document.addEventListener ||
        window.event.type === "load" ||
        document.readyState === "complete" ) {

        detach();
        jQuery.ready();
    }
}

jQuery.ready.promise = function( obj ) {
    if ( !readyList ) {

        readyList = jQuery.Deferred();

        // Catch cases where $(document).ready() is called
        // after the browser event has already occurred.
        // Support: IE6-10
        // Older IE sometimes signals "interactive" too soon
        if ( document.readyState === "complete" ||
            ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

            // Handle it asynchronously to allow scripts the opportunity to delay ready
            window.setTimeout( jQuery.ready );

        // Standards-based browsers support DOMContentLoaded
        } else if ( document.addEventListener ) {

            // Use the handy event callback
            document.addEventListener( "DOMContentLoaded", completed );

            // A fallback to window.onload, that will always work
            window.addEventListener( "load", completed );

        // If IE event model is used
        } else {

            // Ensure firing before onload, maybe late but safe also for iframes
            document.attachEvent( "onreadystatechange", completed );

            // A fallback to window.onload, that will always work
            window.attachEvent( "onload", completed );

            // If IE and not a frame
            // continually check to see if the document is ready
            var top = false;

            try {
                top = window.frameElement == null && document.documentElement;
            } catch ( e ) {}

            if ( top && top.doScroll ) {
                ( function doScrollCheck() {
                    if ( !jQuery.isReady ) {

                        try {

                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            top.doScroll( "left" );
                        } catch ( e ) {
                            return window.setTimeout( doScrollCheck, 50 );
                        }

                        // detach all dom ready events
                        detach();

                        // and execute any waiting functions
                        jQuery.ready();
                    }
                } )();
            }
        }
    }
    return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
    break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

    // Minified: var a,b,c,d
    var val, div, body, container;

    body = document.getElementsByTagName( "body" )[ 0 ];
    if ( !body || !body.style ) {

        // Return for frameset docs that don't have a body
        return;
    }

    // Setup
    div = document.createElement( "div" );
    container = document.createElement( "div" );
    container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
    body.appendChild( container ).appendChild( div );

    if ( typeof div.style.zoom !== "undefined" ) {

        // Support: IE<8
        // Check if natively block-level elements act like inline-block
        // elements when setting their display to 'inline' and giving
        // them layout
        div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

        support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
        if ( val ) {

            // Prevent IE 6 from affecting layout for positioned elements #11048
            // Prevent IE from shrinking the body in IE 7 mode #12869
            // Support: IE<8
            body.style.zoom = 1;
        }
    }

    body.removeChild( container );
} );


( function() {
    var div = document.createElement( "div" );

    // Support: IE<9
    support.deleteExpando = true;
    try {
        delete div.test;
    } catch ( e ) {
        support.deleteExpando = false;
    }

    // Null elements to avoid leaks in IE.
    div = null;
} )();
var acceptData = function( elem ) {
    var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
        nodeType = +elem.nodeType || 1;

    // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
    return nodeType !== 1 && nodeType !== 9 ?
        false :

        // Nodes accept data unless otherwise specified; rejection can be conditional
        !noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if ( data === undefined && elem.nodeType === 1 ) {

        var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

        data = elem.getAttribute( name );

        if ( typeof data === "string" ) {
            try {
                data = data === "true" ? true :
                    data === "false" ? false :
                    data === "null" ? null :

                    // Only convert to a number if it doesn't change the string
                    +data + "" === data ? +data :
                    rbrace.test( data ) ? jQuery.parseJSON( data ) :
                    data;
            } catch ( e ) {}

            // Make sure we set the data so it isn't changed later
            jQuery.data( elem, key, data );

        } else {
            data = undefined;
        }
    }

    return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
    var name;
    for ( name in obj ) {

        // if the public data object is empty, the private is still empty
        if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
            continue;
        }
        if ( name !== "toJSON" ) {
            return false;
        }
    }

    return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
    if ( !acceptData( elem ) ) {
        return;
    }

    var ret, thisCache,
        internalKey = jQuery.expando,

        // We have to handle DOM nodes and JS objects differently because IE6-7
        // can't GC object references properly across the DOM-JS boundary
        isNode = elem.nodeType,

        // Only DOM nodes need the global jQuery cache; JS object data is
        // attached directly to the object so GC can occur automatically
        cache = isNode ? jQuery.cache : elem,

        // Only defining an ID for JS objects if its cache already exists allows
        // the code to shortcut on the same path as a DOM node with no cache
        id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

    // Avoid doing any more work than we need to when trying to get data on an
    // object that has no data at all
    if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
        data === undefined && typeof name === "string" ) {
        return;
    }

    if ( !id ) {

        // Only DOM nodes need a new unique ID for each element since their data
        // ends up in the global cache
        if ( isNode ) {
            id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
        } else {
            id = internalKey;
        }
    }

    if ( !cache[ id ] ) {

        // Avoid exposing jQuery metadata on plain JS objects when the object
        // is serialized using JSON.stringify
        cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
    }

    // An object can be passed to jQuery.data instead of a key/value pair; this gets
    // shallow copied over onto the existing cache
    if ( typeof name === "object" || typeof name === "function" ) {
        if ( pvt ) {
            cache[ id ] = jQuery.extend( cache[ id ], name );
        } else {
            cache[ id ].data = jQuery.extend( cache[ id ].data, name );
        }
    }

    thisCache = cache[ id ];

    // jQuery data() is stored in a separate object inside the object's internal data
    // cache in order to avoid key collisions between internal data and user-defined
    // data.
    if ( !pvt ) {
        if ( !thisCache.data ) {
            thisCache.data = {};
        }

        thisCache = thisCache.data;
    }

    if ( data !== undefined ) {
        thisCache[ jQuery.camelCase( name ) ] = data;
    }

    // Check for both converted-to-camel and non-converted data property names
    // If a data property was specified
    if ( typeof name === "string" ) {

        // First Try to find as-is property data
        ret = thisCache[ name ];

        // Test for null|undefined property data
        if ( ret == null ) {

            // Try to find the camelCased property
            ret = thisCache[ jQuery.camelCase( name ) ];
        }
    } else {
        ret = thisCache;
    }

    return ret;
}

function internalRemoveData( elem, name, pvt ) {
    if ( !acceptData( elem ) ) {
        return;
    }

    var thisCache, i,
        isNode = elem.nodeType,

        // See jQuery.data for more information
        cache = isNode ? jQuery.cache : elem,
        id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

    // If there is already no cache entry for this object, there is no
    // purpose in continuing
    if ( !cache[ id ] ) {
        return;
    }

    if ( name ) {

        thisCache = pvt ? cache[ id ] : cache[ id ].data;

        if ( thisCache ) {

            // Support array or space separated string names for data keys
            if ( !jQuery.isArray( name ) ) {

                // try the string as a key before any manipulation
                if ( name in thisCache ) {
                    name = [ name ];
                } else {

                    // split the camel cased version by spaces unless a key with the spaces exists
                    name = jQuery.camelCase( name );
                    if ( name in thisCache ) {
                        name = [ name ];
                    } else {
                        name = name.split( " " );
                    }
                }
            } else {

                // If "name" is an array of keys...
                // When data is initially created, via ("key", "val") signature,
                // keys will be converted to camelCase.
                // Since there is no way to tell _how_ a key was added, remove
                // both plain key and camelCase key. #12786
                // This will only penalize the array argument path.
                name = name.concat( jQuery.map( name, jQuery.camelCase ) );
            }

            i = name.length;
            while ( i-- ) {
                delete thisCache[ name[ i ] ];
            }

            // If there is no data left in the cache, we want to continue
            // and let the cache object itself get destroyed
            if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
                return;
            }
        }
    }

    // See jQuery.data for more information
    if ( !pvt ) {
        delete cache[ id ].data;

        // Don't destroy the parent cache unless the internal data object
        // had been the only thing left in it
        if ( !isEmptyDataObject( cache[ id ] ) ) {
            return;
        }
    }

    // Destroy the cache
    if ( isNode ) {
        jQuery.cleanData( [ elem ], true );

    // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
    /* jshint eqeqeq: false */
    } else if ( support.deleteExpando || cache != cache.window ) {
        /* jshint eqeqeq: true */
        delete cache[ id ];

    // When all else fails, undefined
    } else {
        cache[ id ] = undefined;
    }
}

jQuery.extend( {
    cache: {},

    // The following elements (space-suffixed to avoid Object.prototype collisions)
    // throw uncatchable exceptions if you attempt to set expando properties
    noData: {
        "applet ": true,
        "embed ": true,

        // ...but Flash objects (which have this classid) *can* handle expandos
        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },

    hasData: function( elem ) {
        elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
        return !!elem && !isEmptyDataObject( elem );
    },

    data: function( elem, name, data ) {
        return internalData( elem, name, data );
    },

    removeData: function( elem, name ) {
        return internalRemoveData( elem, name );
    },

    // For internal use only.
    _data: function( elem, name, data ) {
        return internalData( elem, name, data, true );
    },

    _removeData: function( elem, name ) {
        return internalRemoveData( elem, name, true );
    }
} );

jQuery.fn.extend( {
    data: function( key, value ) {
        var i, name, data,
            elem = this[ 0 ],
            attrs = elem && elem.attributes;

        // Special expections of .data basically thwart jQuery.access,
        // so implement the relevant behavior ourselves

        // Gets all values
        if ( key === undefined ) {
            if ( this.length ) {
                data = jQuery.data( elem );

                if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
                    i = attrs.length;
                    while ( i-- ) {

                        // Support: IE11+
                        // The attrs elements can be null (#14894)
                        if ( attrs[ i ] ) {
                            name = attrs[ i ].name;
                            if ( name.indexOf( "data-" ) === 0 ) {
                                name = jQuery.camelCase( name.slice( 5 ) );
                                dataAttr( elem, name, data[ name ] );
                            }
                        }
                    }
                    jQuery._data( elem, "parsedAttrs", true );
                }
            }

            return data;
        }

        // Sets multiple values
        if ( typeof key === "object" ) {
            return this.each( function() {
                jQuery.data( this, key );
            } );
        }

        return arguments.length > 1 ?

            // Sets one value
            this.each( function() {
                jQuery.data( this, key, value );
            } ) :

            // Gets one value
            // Try to fetch any internally stored data first
            elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
    },

    removeData: function( key ) {
        return this.each( function() {
            jQuery.removeData( this, key );
        } );
    }
} );


jQuery.extend( {
    queue: function( elem, type, data ) {
        var queue;

        if ( elem ) {
            type = ( type || "fx" ) + "queue";
            queue = jQuery._data( elem, type );

            // Speed up dequeue by getting out quickly if this is just a lookup
            if ( data ) {
                if ( !queue || jQuery.isArray( data ) ) {
                    queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
                } else {
                    queue.push( data );
                }
            }
            return queue || [];
        }
    },

    dequeue: function( elem, type ) {
        type = type || "fx";

        var queue = jQuery.queue( elem, type ),
            startLength = queue.length,
            fn = queue.shift(),
            hooks = jQuery._queueHooks( elem, type ),
            next = function() {
                jQuery.dequeue( elem, type );
            };

        // If the fx queue is dequeued, always remove the progress sentinel
        if ( fn === "inprogress" ) {
            fn = queue.shift();
            startLength--;
        }

        if ( fn ) {

            // Add a progress sentinel to prevent the fx queue from being
            // automatically dequeued
            if ( type === "fx" ) {
                queue.unshift( "inprogress" );
            }

            // clear up the last queue stop function
            delete hooks.stop;
            fn.call( elem, next, hooks );
        }

        if ( !startLength && hooks ) {
            hooks.empty.fire();
        }
    },

    // not intended for public consumption - generates a queueHooks object,
    // or returns the current one
    _queueHooks: function( elem, type ) {
        var key = type + "queueHooks";
        return jQuery._data( elem, key ) || jQuery._data( elem, key, {
            empty: jQuery.Callbacks( "once memory" ).add( function() {
                jQuery._removeData( elem, type + "queue" );
                jQuery._removeData( elem, key );
            } )
        } );
    }
} );

jQuery.fn.extend( {
    queue: function( type, data ) {
        var setter = 2;

        if ( typeof type !== "string" ) {
            data = type;
            type = "fx";
            setter--;
        }

        if ( arguments.length < setter ) {
            return jQuery.queue( this[ 0 ], type );
        }

        return data === undefined ?
            this :
            this.each( function() {
                var queue = jQuery.queue( this, type, data );

                // ensure a hooks for this queue
                jQuery._queueHooks( this, type );

                if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
                    jQuery.dequeue( this, type );
                }
            } );
    },
    dequeue: function( type ) {
        return this.each( function() {
            jQuery.dequeue( this, type );
        } );
    },
    clearQueue: function( type ) {
        return this.queue( type || "fx", [] );
    },

    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function( type, obj ) {
        var tmp,
            count = 1,
            defer = jQuery.Deferred(),
            elements = this,
            i = this.length,
            resolve = function() {
                if ( !( --count ) ) {
                    defer.resolveWith( elements, [ elements ] );
                }
            };

        if ( typeof type !== "string" ) {
            obj = type;
            type = undefined;
        }
        type = type || "fx";

        while ( i-- ) {
            tmp = jQuery._data( elements[ i ], type + "queueHooks" );
            if ( tmp && tmp.empty ) {
                count++;
                tmp.empty.add( resolve );
            }
        }
        resolve();
        return defer.promise( obj );
    }
} );


( function() {
    var shrinkWrapBlocksVal;

    support.shrinkWrapBlocks = function() {
        if ( shrinkWrapBlocksVal != null ) {
            return shrinkWrapBlocksVal;
        }

        // Will be changed later if needed.
        shrinkWrapBlocksVal = false;

        // Minified: var b,c,d
        var div, body, container;

        body = document.getElementsByTagName( "body" )[ 0 ];
        if ( !body || !body.style ) {

            // Test fired too early or in an unsupported environment, exit.
            return;
        }

        // Setup
        div = document.createElement( "div" );
        container = document.createElement( "div" );
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild( container ).appendChild( div );

        // Support: IE6
        // Check if elements with layout shrink-wrap their children
        if ( typeof div.style.zoom !== "undefined" ) {

            // Reset CSS: box-sizing; display; margin; border
            div.style.cssText =

                // Support: Firefox<29, Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                "box-sizing:content-box;display:block;margin:0;border:0;" +
                "padding:1px;width:1px;zoom:1";
            div.appendChild( document.createElement( "div" ) ).style.width = "5px";
            shrinkWrapBlocksVal = div.offsetWidth !== 3;
        }

        body.removeChild( container );

        return shrinkWrapBlocksVal;
    };

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css( elem, "display" ) === "none" ||
            !jQuery.contains( elem.ownerDocument, elem );
    };



function adjustCSS( elem, prop, valueParts, tween ) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ?
            function() { return tween.cur(); } :
            function() { return jQuery.css( elem, prop, "" ); },
        initial = currentValue(),
        unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

        // Starting value computation is required for potential unit mismatches
        initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
            rcssNum.exec( jQuery.css( elem, prop ) );

    if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

        // Trust units reported by jQuery.css
        unit = unit || initialInUnit[ 3 ];

        // Make sure we update the tween properties later on
        valueParts = valueParts || [];

        // Iteratively approximate from a nonzero starting point
        initialInUnit = +initial || 1;

        do {

            // If previous iteration zeroed out, double until we get *something*.
            // Use string for doubling so we don't accidentally see scale as unchanged below
            scale = scale || ".5";

            // Adjust and apply
            initialInUnit = initialInUnit / scale;
            jQuery.style( elem, prop, initialInUnit + unit );

        // Update scale, tolerating zero or NaN from tween.cur()
        // Break the loop if scale is unchanged or perfect, or if we've just had enough.
        } while (
            scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
        );
    }

    if ( valueParts ) {
        initialInUnit = +initialInUnit || +initial || 0;

        // Apply relative offset (+=/-=) if specified
        adjusted = valueParts[ 1 ] ?
            initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
            +valueParts[ 2 ];
        if ( tween ) {
            tween.unit = unit;
            tween.start = initialInUnit;
            tween.end = adjusted;
        }
    }
    return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
    var i = 0,
        length = elems.length,
        bulk = key == null;

    // Sets many values
    if ( jQuery.type( key ) === "object" ) {
        chainable = true;
        for ( i in key ) {
            access( elems, fn, i, key[ i ], true, emptyGet, raw );
        }

    // Sets one value
    } else if ( value !== undefined ) {
        chainable = true;

        if ( !jQuery.isFunction( value ) ) {
            raw = true;
        }

        if ( bulk ) {

            // Bulk operations run against the entire set
            if ( raw ) {
                fn.call( elems, value );
                fn = null;

            // ...except when executing function values
            } else {
                bulk = fn;
                fn = function( elem, key, value ) {
                    return bulk.call( jQuery( elem ), value );
                };
            }
        }

        if ( fn ) {
            for ( ; i < length; i++ ) {
                fn(
                    elems[ i ],
                    key,
                    raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
                );
            }
        }
    }

    return chainable ?
        elems :

        // Gets
        bulk ?
            fn.call( elems ) :
            length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
        "details|dialog|figcaption|figure|footer|header|hgroup|main|" +
        "mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
    var list = nodeNames.split( "|" ),
        safeFrag = document.createDocumentFragment();

    if ( safeFrag.createElement ) {
        while ( list.length ) {
            safeFrag.createElement(
                list.pop()
            );
        }
    }
    return safeFrag;
}


( function() {
    var div = document.createElement( "div" ),
        fragment = document.createDocumentFragment(),
        input = document.createElement( "input" );

    // Setup
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

    // IE strips leading whitespace when .innerHTML is used
    support.leadingWhitespace = div.firstChild.nodeType === 3;

    // Make sure that tbody elements aren't automatically inserted
    // IE will insert them into empty tables
    support.tbody = !div.getElementsByTagName( "tbody" ).length;

    // Make sure that link elements get serialized correctly by innerHTML
    // This requires a wrapper element in IE
    support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

    // Makes sure cloning an html5 element does not cause problems
    // Where outerHTML is undefined, this still works
    support.html5Clone =
        document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

    // Check if a disconnected checkbox will retain its checked
    // value of true after appended to the DOM (IE6/7)
    input.type = "checkbox";
    input.checked = true;
    fragment.appendChild( input );
    support.appendChecked = input.checked;

    // Make sure textarea (and checkbox) defaultValue is properly cloned
    // Support: IE6-IE11+
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

    // #11217 - WebKit loses check when the name is after the checked attribute
    fragment.appendChild( div );

    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)
    input = document.createElement( "input" );
    input.setAttribute( "type", "radio" );
    input.setAttribute( "checked", "checked" );
    input.setAttribute( "name", "t" );

    div.appendChild( input );

    // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
    // old WebKit doesn't clone checked state correctly in fragments
    support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

    // Support: IE<9
    // Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
    support.noCloneEvent = !!div.addEventListener;

    // Support: IE<9
    // Since attributes and properties are the same in IE,
    // cleanData must set properties to undefined rather than use removeAttribute
    div[ jQuery.expando ] = 1;
    support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
    option: [ 1, "<select multiple='multiple'>", "</select>" ],
    legend: [ 1, "<fieldset>", "</fieldset>" ],
    area: [ 1, "<map>", "</map>" ],

    // Support: IE8
    param: [ 1, "<object>", "</object>" ],
    thead: [ 1, "<table>", "</table>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

    // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
    // unless wrapped in a div with non-breaking characters in front of it.
    _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
    var elems, elem,
        i = 0,
        found = typeof context.getElementsByTagName !== "undefined" ?
            context.getElementsByTagName( tag || "*" ) :
            typeof context.querySelectorAll !== "undefined" ?
                context.querySelectorAll( tag || "*" ) :
                undefined;

    if ( !found ) {
        for ( found = [], elems = context.childNodes || context;
            ( elem = elems[ i ] ) != null;
            i++
        ) {
            if ( !tag || jQuery.nodeName( elem, tag ) ) {
                found.push( elem );
            } else {
                jQuery.merge( found, getAll( elem, tag ) );
            }
        }
    }

    return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
        jQuery.merge( [ context ], found ) :
        found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
    var elem,
        i = 0;
    for ( ; ( elem = elems[ i ] ) != null; i++ ) {
        jQuery._data(
            elem,
            "globalEval",
            !refElements || jQuery._data( refElements[ i ], "globalEval" )
        );
    }
}


var rhtml = /<|&#?\w+;/,
    rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
    if ( rcheckableType.test( elem.type ) ) {
        elem.defaultChecked = elem.checked;
    }
}

function buildFragment( elems, context, scripts, selection, ignored ) {
    var j, elem, contains,
        tmp, tag, tbody, wrap,
        l = elems.length,

        // Ensure a safe fragment
        safe = createSafeFragment( context ),

        nodes = [],
        i = 0;

    for ( ; i < l; i++ ) {
        elem = elems[ i ];

        if ( elem || elem === 0 ) {

            // Add nodes directly
            if ( jQuery.type( elem ) === "object" ) {
                jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

            // Convert non-html into a text node
            } else if ( !rhtml.test( elem ) ) {
                nodes.push( context.createTextNode( elem ) );

            // Convert html into DOM nodes
            } else {
                tmp = tmp || safe.appendChild( context.createElement( "div" ) );

                // Deserialize a standard representation
                tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                wrap = wrapMap[ tag ] || wrapMap._default;

                tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

                // Descend through wrappers to the right content
                j = wrap[ 0 ];
                while ( j-- ) {
                    tmp = tmp.lastChild;
                }

                // Manually add leading whitespace removed by IE
                if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
                    nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
                }

                // Remove IE's autoinserted <tbody> from table fragments
                if ( !support.tbody ) {

                    // String was a <table>, *may* have spurious <tbody>
                    elem = tag === "table" && !rtbody.test( elem ) ?
                        tmp.firstChild :

                        // String was a bare <thead> or <tfoot>
                        wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
                            tmp :
                            0;

                    j = elem && elem.childNodes.length;
                    while ( j-- ) {
                        if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
                            !tbody.childNodes.length ) {

                            elem.removeChild( tbody );
                        }
                    }
                }

                jQuery.merge( nodes, tmp.childNodes );

                // Fix #12392 for WebKit and IE > 9
                tmp.textContent = "";

                // Fix #12392 for oldIE
                while ( tmp.firstChild ) {
                    tmp.removeChild( tmp.firstChild );
                }

                // Remember the top-level container for proper cleanup
                tmp = safe.lastChild;
            }
        }
    }

    // Fix #11356: Clear elements from fragment
    if ( tmp ) {
        safe.removeChild( tmp );
    }

    // Reset defaultChecked for any radios and checkboxes
    // about to be appended to the DOM in IE 6/7 (#8060)
    if ( !support.appendChecked ) {
        jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
    }

    i = 0;
    while ( ( elem = nodes[ i++ ] ) ) {

        // Skip elements already in the context collection (trac-4087)
        if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
            if ( ignored ) {
                ignored.push( elem );
            }

            continue;
        }

        contains = jQuery.contains( elem.ownerDocument, elem );

        // Append to fragment
        tmp = getAll( safe.appendChild( elem ), "script" );

        // Preserve script evaluation history
        if ( contains ) {
            setGlobalEval( tmp );
        }

        // Capture executables
        if ( scripts ) {
            j = 0;
            while ( ( elem = tmp[ j++ ] ) ) {
                if ( rscriptType.test( elem.type || "" ) ) {
                    scripts.push( elem );
                }
            }
        }
    }

    tmp = null;

    return safe;
}


( function() {
    var i, eventName,
        div = document.createElement( "div" );

    // Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
    for ( i in { submit: true, change: true, focusin: true } ) {
        eventName = "on" + i;

        if ( !( support[ i ] = eventName in window ) ) {

            // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
            div.setAttribute( eventName, "t" );
            support[ i ] = div.attributes[ eventName ].expando === false;
        }
    }

    // Null elements to avoid leaks in IE.
    div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
    return true;
}

function returnFalse() {
    return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
    try {
        return document.activeElement;
    } catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
    var origFn, type;

    // Types can be a map of types/handlers
    if ( typeof types === "object" ) {

        // ( types-Object, selector, data )
        if ( typeof selector !== "string" ) {

            // ( types-Object, data )
            data = data || selector;
            selector = undefined;
        }
        for ( type in types ) {
            on( elem, type, selector, data, types[ type ], one );
        }
        return elem;
    }

    if ( data == null && fn == null ) {

        // ( types, fn )
        fn = selector;
        data = selector = undefined;
    } else if ( fn == null ) {
        if ( typeof selector === "string" ) {

            // ( types, selector, fn )
            fn = data;
            data = undefined;
        } else {

            // ( types, data, fn )
            fn = data;
            data = selector;
            selector = undefined;
        }
    }
    if ( fn === false ) {
        fn = returnFalse;
    } else if ( !fn ) {
        return elem;
    }

    if ( one === 1 ) {
        origFn = fn;
        fn = function( event ) {

            // Can use an empty set, since event contains the info
            jQuery().off( event );
            return origFn.apply( this, arguments );
        };

        // Use same guid so caller can remove using origFn
        fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
    }
    return elem.each( function() {
        jQuery.event.add( this, types, fn, data, selector );
    } );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

    global: {},

    add: function( elem, types, handler, data, selector ) {
        var tmp, events, t, handleObjIn,
            special, eventHandle, handleObj,
            handlers, type, namespaces, origType,
            elemData = jQuery._data( elem );

        // Don't attach events to noData or text/comment nodes (but allow plain objects)
        if ( !elemData ) {
            return;
        }

        // Caller can pass in an object of custom data in lieu of the handler
        if ( handler.handler ) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
        }

        // Make sure that the handler has a unique ID, used to find/remove it later
        if ( !handler.guid ) {
            handler.guid = jQuery.guid++;
        }

        // Init the element's event structure and main handler, if this is the first
        if ( !( events = elemData.events ) ) {
            events = elemData.events = {};
        }
        if ( !( eventHandle = elemData.handle ) ) {
            eventHandle = elemData.handle = function( e ) {

                // Discard the second event of a jQuery.event.trigger() and
                // when an event is called after a page has unloaded
                return typeof jQuery !== "undefined" &&
                    ( !e || jQuery.event.triggered !== e.type ) ?
                    jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
                    undefined;
            };

            // Add elem as a property of the handle fn to prevent a memory leak
            // with IE non-native events
            eventHandle.elem = elem;
        }

        // Handle multiple events separated by a space
        types = ( types || "" ).match( rnotwhite ) || [ "" ];
        t = types.length;
        while ( t-- ) {
            tmp = rtypenamespace.exec( types[ t ] ) || [];
            type = origType = tmp[ 1 ];
            namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

            // There *must* be a type, no attaching namespace-only handlers
            if ( !type ) {
                continue;
            }

            // If event changes its type, use the special event handlers for the changed type
            special = jQuery.event.special[ type ] || {};

            // If selector defined, determine special event api type, otherwise given type
            type = ( selector ? special.delegateType : special.bindType ) || type;

            // Update special based on newly reset type
            special = jQuery.event.special[ type ] || {};

            // handleObj is passed to all event handlers
            handleObj = jQuery.extend( {
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                namespace: namespaces.join( "." )
            }, handleObjIn );

            // Init the event handler queue if we're the first
            if ( !( handlers = events[ type ] ) ) {
                handlers = events[ type ] = [];
                handlers.delegateCount = 0;

                // Only use addEventListener/attachEvent if the special events handler returns false
                if ( !special.setup ||
                    special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

                    // Bind the global event handler to the element
                    if ( elem.addEventListener ) {
                        elem.addEventListener( type, eventHandle, false );

                    } else if ( elem.attachEvent ) {
                        elem.attachEvent( "on" + type, eventHandle );
                    }
                }
            }

            if ( special.add ) {
                special.add.call( elem, handleObj );

                if ( !handleObj.handler.guid ) {
                    handleObj.handler.guid = handler.guid;
                }
            }

            // Add to the element's handler list, delegates in front
            if ( selector ) {
                handlers.splice( handlers.delegateCount++, 0, handleObj );
            } else {
                handlers.push( handleObj );
            }

            // Keep track of which events have ever been used, for event optimization
            jQuery.event.global[ type ] = true;
        }

        // Nullify elem to prevent memory leaks in IE
        elem = null;
    },

    // Detach an event or set of events from an element
    remove: function( elem, types, handler, selector, mappedTypes ) {
        var j, handleObj, tmp,
            origCount, t, events,
            special, handlers, type,
            namespaces, origType,
            elemData = jQuery.hasData( elem ) && jQuery._data( elem );

        if ( !elemData || !( events = elemData.events ) ) {
            return;
        }

        // Once for each type.namespace in types; type may be omitted
        types = ( types || "" ).match( rnotwhite ) || [ "" ];
        t = types.length;
        while ( t-- ) {
            tmp = rtypenamespace.exec( types[ t ] ) || [];
            type = origType = tmp[ 1 ];
            namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

            // Unbind all events (on this namespace, if provided) for the element
            if ( !type ) {
                for ( type in events ) {
                    jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                }
                continue;
            }

            special = jQuery.event.special[ type ] || {};
            type = ( selector ? special.delegateType : special.bindType ) || type;
            handlers = events[ type ] || [];
            tmp = tmp[ 2 ] &&
                new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

            // Remove matching events
            origCount = j = handlers.length;
            while ( j-- ) {
                handleObj = handlers[ j ];

                if ( ( mappedTypes || origType === handleObj.origType ) &&
                    ( !handler || handler.guid === handleObj.guid ) &&
                    ( !tmp || tmp.test( handleObj.namespace ) ) &&
                    ( !selector || selector === handleObj.selector ||
                        selector === "**" && handleObj.selector ) ) {
                    handlers.splice( j, 1 );

                    if ( handleObj.selector ) {
                        handlers.delegateCount--;
                    }
                    if ( special.remove ) {
                        special.remove.call( elem, handleObj );
                    }
                }
            }

            // Remove generic event handler if we removed something and no more handlers exist
            // (avoids potential for endless recursion during removal of special event handlers)
            if ( origCount && !handlers.length ) {
                if ( !special.teardown ||
                    special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

                    jQuery.removeEvent( elem, type, elemData.handle );
                }

                delete events[ type ];
            }
        }

        // Remove the expando if it's no longer used
        if ( jQuery.isEmptyObject( events ) ) {
            delete elemData.handle;

            // removeData also checks for emptiness and clears the expando if empty
            // so use it instead of delete
            jQuery._removeData( elem, "events" );
        }
    },

    trigger: function( event, data, elem, onlyHandlers ) {
        var handle, ontype, cur,
            bubbleType, special, tmp, i,
            eventPath = [ elem || document ],
            type = hasOwn.call( event, "type" ) ? event.type : event,
            namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

        cur = tmp = elem = elem || document;

        // Don't do events on text and comment nodes
        if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
            return;
        }

        // focus/blur morphs to focusin/out; ensure we're not firing them right now
        if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
            return;
        }

        if ( type.indexOf( "." ) > -1 ) {

            // Namespaced trigger; create a regexp to match event type in handle()
            namespaces = type.split( "." );
            type = namespaces.shift();
            namespaces.sort();
        }
        ontype = type.indexOf( ":" ) < 0 && "on" + type;

        // Caller can pass in a jQuery.Event object, Object, or just an event type string
        event = event[ jQuery.expando ] ?
            event :
            new jQuery.Event( type, typeof event === "object" && event );

        // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
        event.isTrigger = onlyHandlers ? 2 : 3;
        event.namespace = namespaces.join( "." );
        event.rnamespace = event.namespace ?
            new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
            null;

        // Clean up the event in case it is being reused
        event.result = undefined;
        if ( !event.target ) {
            event.target = elem;
        }

        // Clone any incoming data and prepend the event, creating the handler arg list
        data = data == null ?
            [ event ] :
            jQuery.makeArray( data, [ event ] );

        // Allow special events to draw outside the lines
        special = jQuery.event.special[ type ] || {};
        if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
            return;
        }

        // Determine event propagation path in advance, per W3C events spec (#9951)
        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
        if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

            bubbleType = special.delegateType || type;
            if ( !rfocusMorph.test( bubbleType + type ) ) {
                cur = cur.parentNode;
            }
            for ( ; cur; cur = cur.parentNode ) {
                eventPath.push( cur );
                tmp = cur;
            }

            // Only add window if we got to document (e.g., not plain obj or detached DOM)
            if ( tmp === ( elem.ownerDocument || document ) ) {
                eventPath.push( tmp.defaultView || tmp.parentWindow || window );
            }
        }

        // Fire handlers on the event path
        i = 0;
        while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

            event.type = i > 1 ?
                bubbleType :
                special.bindType || type;

            // jQuery handler
            handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
                jQuery._data( cur, "handle" );

            if ( handle ) {
                handle.apply( cur, data );
            }

            // Native handler
            handle = ontype && cur[ ontype ];
            if ( handle && handle.apply && acceptData( cur ) ) {
                event.result = handle.apply( cur, data );
                if ( event.result === false ) {
                    event.preventDefault();
                }
            }
        }
        event.type = type;

        // If nobody prevented the default action, do it now
        if ( !onlyHandlers && !event.isDefaultPrevented() ) {

            if (
                ( !special._default ||
                 special._default.apply( eventPath.pop(), data ) === false
                ) && acceptData( elem )
            ) {

                // Call a native DOM method on the target with the same name name as the event.
                // Can't use an .isFunction() check here because IE6/7 fails that test.
                // Don't do default actions on window, that's where global variables be (#6170)
                if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

                    // Don't re-trigger an onFOO event when we call its FOO() method
                    tmp = elem[ ontype ];

                    if ( tmp ) {
                        elem[ ontype ] = null;
                    }

                    // Prevent re-triggering of the same event, since we already bubbled it above
                    jQuery.event.triggered = type;
                    try {
                        elem[ type ]();
                    } catch ( e ) {

                        // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                        // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                    }
                    jQuery.event.triggered = undefined;

                    if ( tmp ) {
                        elem[ ontype ] = tmp;
                    }
                }
            }
        }

        return event.result;
    },

    dispatch: function( event ) {

        // Make a writable jQuery.Event from the native event object
        event = jQuery.event.fix( event );

        var i, j, ret, matched, handleObj,
            handlerQueue = [],
            args = slice.call( arguments ),
            handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
            special = jQuery.event.special[ event.type ] || {};

        // Use the fix-ed jQuery.Event rather than the (read-only) native event
        args[ 0 ] = event;
        event.delegateTarget = this;

        // Call the preDispatch hook for the mapped type, and let it bail if desired
        if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
            return;
        }

        // Determine handlers
        handlerQueue = jQuery.event.handlers.call( this, event, handlers );

        // Run delegates first; they may want to stop propagation beneath us
        i = 0;
        while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
            event.currentTarget = matched.elem;

            j = 0;
            while ( ( handleObj = matched.handlers[ j++ ] ) &&
                !event.isImmediatePropagationStopped() ) {

                // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                // a subset or equal to those in the bound event (both can have no namespace).
                if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

                    event.handleObj = handleObj;
                    event.data = handleObj.data;

                    ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
                        handleObj.handler ).apply( matched.elem, args );

                    if ( ret !== undefined ) {
                        if ( ( event.result = ret ) === false ) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }
            }
        }

        // Call the postDispatch hook for the mapped type
        if ( special.postDispatch ) {
            special.postDispatch.call( this, event );
        }

        return event.result;
    },

    handlers: function( event, handlers ) {
        var i, matches, sel, handleObj,
            handlerQueue = [],
            delegateCount = handlers.delegateCount,
            cur = event.target;

        // Support (at least): Chrome, IE9
        // Find delegate handlers
        // Black-hole SVG <use> instance trees (#13180)
        //
        // Support: Firefox<=42+
        // Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
        if ( delegateCount && cur.nodeType &&
            ( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

            /* jshint eqeqeq: false */
            for ( ; cur != this; cur = cur.parentNode || this ) {
                /* jshint eqeqeq: true */

                // Don't check non-elements (#13208)
                // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
                    matches = [];
                    for ( i = 0; i < delegateCount; i++ ) {
                        handleObj = handlers[ i ];

                        // Don't conflict with Object.prototype properties (#13203)
                        sel = handleObj.selector + " ";

                        if ( matches[ sel ] === undefined ) {
                            matches[ sel ] = handleObj.needsContext ?
                                jQuery( sel, this ).index( cur ) > -1 :
                                jQuery.find( sel, this, null, [ cur ] ).length;
                        }
                        if ( matches[ sel ] ) {
                            matches.push( handleObj );
                        }
                    }
                    if ( matches.length ) {
                        handlerQueue.push( { elem: cur, handlers: matches } );
                    }
                }
            }
        }

        // Add the remaining (directly-bound) handlers
        if ( delegateCount < handlers.length ) {
            handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
        }

        return handlerQueue;
    },

    fix: function( event ) {
        if ( event[ jQuery.expando ] ) {
            return event;
        }

        // Create a writable copy of the event object and normalize some properties
        var i, prop, copy,
            type = event.type,
            originalEvent = event,
            fixHook = this.fixHooks[ type ];

        if ( !fixHook ) {
            this.fixHooks[ type ] = fixHook =
                rmouseEvent.test( type ) ? this.mouseHooks :
                rkeyEvent.test( type ) ? this.keyHooks :
                {};
        }
        copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

        event = new jQuery.Event( originalEvent );

        i = copy.length;
        while ( i-- ) {
            prop = copy[ i ];
            event[ prop ] = originalEvent[ prop ];
        }

        // Support: IE<9
        // Fix target property (#1925)
        if ( !event.target ) {
            event.target = originalEvent.srcElement || document;
        }

        // Support: Safari 6-8+
        // Target should not be a text node (#504, #13143)
        if ( event.target.nodeType === 3 ) {
            event.target = event.target.parentNode;
        }

        // Support: IE<9
        // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
        event.metaKey = !!event.metaKey;

        return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
    },

    // Includes some event props shared by KeyEvent and MouseEvent
    props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
        "metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

    fixHooks: {},

    keyHooks: {
        props: "char charCode key keyCode".split( " " ),
        filter: function( event, original ) {

            // Add which for key events
            if ( event.which == null ) {
                event.which = original.charCode != null ? original.charCode : original.keyCode;
            }

            return event;
        }
    },

    mouseHooks: {
        props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
            "pageX pageY screenX screenY toElement" ).split( " " ),
        filter: function( event, original ) {
            var body, eventDoc, doc,
                button = original.button,
                fromElement = original.fromElement;

            // Calculate pageX/Y if missing and clientX/Y available
            if ( event.pageX == null && original.clientX != null ) {
                eventDoc = event.target.ownerDocument || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = original.clientX +
                    ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
                    ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                event.pageY = original.clientY +
                    ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
                    ( doc && doc.clientTop  || body && body.clientTop  || 0 );
            }

            // Add relatedTarget, if necessary
            if ( !event.relatedTarget && fromElement ) {
                event.relatedTarget = fromElement === event.target ?
                    original.toElement :
                    fromElement;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            // Note: button is not normalized, so don't use it
            if ( !event.which && button !== undefined ) {
                event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
            }

            return event;
        }
    },

    special: {
        load: {

            // Prevent triggered image.load events from bubbling to window.load
            noBubble: true
        },
        focus: {

            // Fire native event if possible so blur/focus sequence is correct
            trigger: function() {
                if ( this !== safeActiveElement() && this.focus ) {
                    try {
                        this.focus();
                        return false;
                    } catch ( e ) {

                        // Support: IE<9
                        // If we error on focus to hidden element (#1486, #12518),
                        // let .trigger() run the handlers
                    }
                }
            },
            delegateType: "focusin"
        },
        blur: {
            trigger: function() {
                if ( this === safeActiveElement() && this.blur ) {
                    this.blur();
                    return false;
                }
            },
            delegateType: "focusout"
        },
        click: {

            // For checkbox, fire native event so checked state will be right
            trigger: function() {
                if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
                    this.click();
                    return false;
                }
            },

            // For cross-browser consistency, don't fire native .click() on links
            _default: function( event ) {
                return jQuery.nodeName( event.target, "a" );
            }
        },

        beforeunload: {
            postDispatch: function( event ) {

                // Support: Firefox 20+
                // Firefox doesn't alert if the returnValue field is not set.
                if ( event.result !== undefined && event.originalEvent ) {
                    event.originalEvent.returnValue = event.result;
                }
            }
        }
    },

    // Piggyback on a donor event to simulate a different one
    simulate: function( type, elem, event ) {
        var e = jQuery.extend(
            new jQuery.Event(),
            event,
            {
                type: type,
                isSimulated: true

                // Previously, `originalEvent: {}` was set here, so stopPropagation call
                // would not be triggered on donor event, since in our own
                // jQuery.event.stopPropagation function we had a check for existence of
                // originalEvent.stopPropagation method, so, consequently it would be a noop.
                //
                // Guard for simulated events was moved to jQuery.event.stopPropagation function
                // since `originalEvent` should point to the original event for the
                // constancy with other events and for more focused logic
            }
        );

        jQuery.event.trigger( e, null, elem );

        if ( e.isDefaultPrevented() ) {
            event.preventDefault();
        }
    }
};

jQuery.removeEvent = document.removeEventListener ?
    function( elem, type, handle ) {

        // This "if" is needed for plain objects
        if ( elem.removeEventListener ) {
            elem.removeEventListener( type, handle );
        }
    } :
    function( elem, type, handle ) {
        var name = "on" + type;

        if ( elem.detachEvent ) {

            // #8545, #7054, preventing memory leaks for custom events in IE6-8
            // detachEvent needed property on element, by name of that event,
            // to properly expose it to GC
            if ( typeof elem[ name ] === "undefined" ) {
                elem[ name ] = null;
            }

            elem.detachEvent( name, handle );
        }
    };

jQuery.Event = function( src, props ) {

    // Allow instantiation without the 'new' keyword
    if ( !( this instanceof jQuery.Event ) ) {
        return new jQuery.Event( src, props );
    }

    // Event object
    if ( src && src.type ) {
        this.originalEvent = src;
        this.type = src.type;

        // Events bubbling up the document may have been marked as prevented
        // by a handler lower down the tree; reflect the correct value.
        this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined &&

                // Support: IE < 9, Android < 4.0
                src.returnValue === false ?
            returnTrue :
            returnFalse;

    // Event type
    } else {
        this.type = src;
    }

    // Put explicitly provided properties onto the event object
    if ( props ) {
        jQuery.extend( this, props );
    }

    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || jQuery.now();

    // Mark it as fixed
    this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,

    preventDefault: function() {
        var e = this.originalEvent;

        this.isDefaultPrevented = returnTrue;
        if ( !e ) {
            return;
        }

        // If preventDefault exists, run it on the original event
        if ( e.preventDefault ) {
            e.preventDefault();

        // Support: IE
        // Otherwise set the returnValue property of the original event to false
        } else {
            e.returnValue = false;
        }
    },
    stopPropagation: function() {
        var e = this.originalEvent;

        this.isPropagationStopped = returnTrue;

        if ( !e || this.isSimulated ) {
            return;
        }

        // If stopPropagation exists, run it on the original event
        if ( e.stopPropagation ) {
            e.stopPropagation();
        }

        // Support: IE
        // Set the cancelBubble property of the original event to true
        e.cancelBubble = true;
    },
    stopImmediatePropagation: function() {
        var e = this.originalEvent;

        this.isImmediatePropagationStopped = returnTrue;

        if ( e && e.stopImmediatePropagation ) {
            e.stopImmediatePropagation();
        }

        this.stopPropagation();
    }
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
}, function( orig, fix ) {
    jQuery.event.special[ orig ] = {
        delegateType: fix,
        bindType: fix,

        handle: function( event ) {
            var ret,
                target = this,
                related = event.relatedTarget,
                handleObj = event.handleObj;

            // For mouseenter/leave call the handler if related is outside the target.
            // NB: No relatedTarget if the mouse left/entered the browser window
            if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
                event.type = handleObj.origType;
                ret = handleObj.handler.apply( this, arguments );
                event.type = fix;
            }
            return ret;
        }
    };
} );

// IE submit delegation
if ( !support.submit ) {

    jQuery.event.special.submit = {
        setup: function() {

            // Only need this for delegated form submit events
            if ( jQuery.nodeName( this, "form" ) ) {
                return false;
            }

            // Lazy-add a submit handler when a descendant form may potentially be submitted
            jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

                // Node name check avoids a VML-related crash in IE (#9807)
                var elem = e.target,
                    form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

                        // Support: IE <=8
                        // We use jQuery.prop instead of elem.form
                        // to allow fixing the IE8 delegated submit issue (gh-2332)
                        // by 3rd party polyfills/workarounds.
                        jQuery.prop( elem, "form" ) :
                        undefined;

                if ( form && !jQuery._data( form, "submit" ) ) {
                    jQuery.event.add( form, "submit._submit", function( event ) {
                        event._submitBubble = true;
                    } );
                    jQuery._data( form, "submit", true );
                }
            } );

            // return undefined since we don't need an event listener
        },

        postDispatch: function( event ) {

            // If form was submitted by the user, bubble the event up the tree
            if ( event._submitBubble ) {
                delete event._submitBubble;
                if ( this.parentNode && !event.isTrigger ) {
                    jQuery.event.simulate( "submit", this.parentNode, event );
                }
            }
        },

        teardown: function() {

            // Only need this for delegated form submit events
            if ( jQuery.nodeName( this, "form" ) ) {
                return false;
            }

            // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
            jQuery.event.remove( this, "._submit" );
        }
    };
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

    jQuery.event.special.change = {

        setup: function() {

            if ( rformElems.test( this.nodeName ) ) {

                // IE doesn't fire change on a check/radio until blur; trigger it on click
                // after a propertychange. Eat the blur-change in special.change.handle.
                // This still fires onchange a second time for check/radio after blur.
                if ( this.type === "checkbox" || this.type === "radio" ) {
                    jQuery.event.add( this, "propertychange._change", function( event ) {
                        if ( event.originalEvent.propertyName === "checked" ) {
                            this._justChanged = true;
                        }
                    } );
                    jQuery.event.add( this, "click._change", function( event ) {
                        if ( this._justChanged && !event.isTrigger ) {
                            this._justChanged = false;
                        }

                        // Allow triggered, simulated change events (#11500)
                        jQuery.event.simulate( "change", this, event );
                    } );
                }
                return false;
            }

            // Delegated event; lazy-add a change handler on descendant inputs
            jQuery.event.add( this, "beforeactivate._change", function( e ) {
                var elem = e.target;

                if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
                    jQuery.event.add( elem, "change._change", function( event ) {
                        if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
                            jQuery.event.simulate( "change", this.parentNode, event );
                        }
                    } );
                    jQuery._data( elem, "change", true );
                }
            } );
        },

        handle: function( event ) {
            var elem = event.target;

            // Swallow native change events from checkbox/radio, we already triggered them above
            if ( this !== elem || event.isSimulated || event.isTrigger ||
                ( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

                return event.handleObj.handler.apply( this, arguments );
            }
        },

        teardown: function() {
            jQuery.event.remove( this, "._change" );

            return !rformElems.test( this.nodeName );
        }
    };
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
    jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

        // Attach a single capturing handler on the document while someone wants focusin/focusout
        var handler = function( event ) {
            jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
        };

        jQuery.event.special[ fix ] = {
            setup: function() {
                var doc = this.ownerDocument || this,
                    attaches = jQuery._data( doc, fix );

                if ( !attaches ) {
                    doc.addEventListener( orig, handler, true );
                }
                jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
            },
            teardown: function() {
                var doc = this.ownerDocument || this,
                    attaches = jQuery._data( doc, fix ) - 1;

                if ( !attaches ) {
                    doc.removeEventListener( orig, handler, true );
                    jQuery._removeData( doc, fix );
                } else {
                    jQuery._data( doc, fix, attaches );
                }
            }
        };
    } );
}

jQuery.fn.extend( {

    on: function( types, selector, data, fn ) {
        return on( this, types, selector, data, fn );
    },
    one: function( types, selector, data, fn ) {
        return on( this, types, selector, data, fn, 1 );
    },
    off: function( types, selector, fn ) {
        var handleObj, type;
        if ( types && types.preventDefault && types.handleObj ) {

            // ( event )  dispatched jQuery.Event
            handleObj = types.handleObj;
            jQuery( types.delegateTarget ).off(
                handleObj.namespace ?
                    handleObj.origType + "." + handleObj.namespace :
                    handleObj.origType,
                handleObj.selector,
                handleObj.handler
            );
            return this;
        }
        if ( typeof types === "object" ) {

            // ( types-object [, selector] )
            for ( type in types ) {
                this.off( type, selector, types[ type ] );
            }
            return this;
        }
        if ( selector === false || typeof selector === "function" ) {

            // ( types [, fn] )
            fn = selector;
            selector = undefined;
        }
        if ( fn === false ) {
            fn = returnFalse;
        }
        return this.each( function() {
            jQuery.event.remove( this, types, fn, selector );
        } );
    },

    trigger: function( type, data ) {
        return this.each( function() {
            jQuery.event.trigger( type, data, this );
        } );
    },
    triggerHandler: function( type, data ) {
        var elem = this[ 0 ];
        if ( elem ) {
            return jQuery.event.trigger( type, data, elem, true );
        }
    }
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
    rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

    // Support: IE 10-11, Edge 10240+
    // In IE/Edge using regex groups here causes severe slowdowns.
    // See https://connect.microsoft.com/IE/feedback/details/1736512/
    rnoInnerhtml = /<script|<style|<link/i,

    // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    safeFragment = createSafeFragment( document ),
    fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
    return jQuery.nodeName( elem, "table" ) &&
        jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

        elem.getElementsByTagName( "tbody" )[ 0 ] ||
            elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
        elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
    elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
    return elem;
}
function restoreScript( elem ) {
    var match = rscriptTypeMasked.exec( elem.type );
    if ( match ) {
        elem.type = match[ 1 ];
    } else {
        elem.removeAttribute( "type" );
    }
    return elem;
}

function cloneCopyEvent( src, dest ) {
    if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
        return;
    }

    var type, i, l,
        oldData = jQuery._data( src ),
        curData = jQuery._data( dest, oldData ),
        events = oldData.events;

    if ( events ) {
        delete curData.handle;
        curData.events = {};

        for ( type in events ) {
            for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                jQuery.event.add( dest, type, events[ type ][ i ] );
            }
        }
    }

    // make the cloned public data object a copy from the original
    if ( curData.data ) {
        curData.data = jQuery.extend( {}, curData.data );
    }
}

function fixCloneNodeIssues( src, dest ) {
    var nodeName, e, data;

    // We do not need to do anything for non-Elements
    if ( dest.nodeType !== 1 ) {
        return;
    }

    nodeName = dest.nodeName.toLowerCase();

    // IE6-8 copies events bound via attachEvent when using cloneNode.
    if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
        data = jQuery._data( dest );

        for ( e in data.events ) {
            jQuery.removeEvent( dest, e, data.handle );
        }

        // Event data gets referenced instead of copied if the expando gets copied too
        dest.removeAttribute( jQuery.expando );
    }

    // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
    if ( nodeName === "script" && dest.text !== src.text ) {
        disableScript( dest ).text = src.text;
        restoreScript( dest );

    // IE6-10 improperly clones children of object elements using classid.
    // IE10 throws NoModificationAllowedError if parent is null, #12132.
    } else if ( nodeName === "object" ) {
        if ( dest.parentNode ) {
            dest.outerHTML = src.outerHTML;
        }

        // This path appears unavoidable for IE9. When cloning an object
        // element in IE9, the outerHTML strategy above is not sufficient.
        // If the src has innerHTML and the destination does not,
        // copy the src.innerHTML into the dest.innerHTML. #10324
        if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
            dest.innerHTML = src.innerHTML;
        }

    } else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

        // IE6-8 fails to persist the checked state of a cloned checkbox
        // or radio button. Worse, IE6-7 fail to give the cloned element
        // a checked appearance if the defaultChecked value isn't also set

        dest.defaultChecked = dest.checked = src.checked;

        // IE6-7 get confused and end up setting the value of a cloned
        // checkbox/radio button to an empty string instead of "on"
        if ( dest.value !== src.value ) {
            dest.value = src.value;
        }

    // IE6-8 fails to return the selected option to the default selected
    // state when cloning options
    } else if ( nodeName === "option" ) {
        dest.defaultSelected = dest.selected = src.defaultSelected;

    // IE6-8 fails to set the defaultValue to the correct value when
    // cloning other types of input fields
    } else if ( nodeName === "input" || nodeName === "textarea" ) {
        dest.defaultValue = src.defaultValue;
    }
}

function domManip( collection, args, callback, ignored ) {

    // Flatten any nested arrays
    args = concat.apply( [], args );

    var first, node, hasScripts,
        scripts, doc, fragment,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[ 0 ],
        isFunction = jQuery.isFunction( value );

    // We can't cloneNode fragments that contain checked, in WebKit
    if ( isFunction ||
            ( l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test( value ) ) ) {
        return collection.each( function( index ) {
            var self = collection.eq( index );
            if ( isFunction ) {
                args[ 0 ] = value.call( this, index, self.html() );
            }
            domManip( self, args, callback, ignored );
        } );
    }

    if ( l ) {
        fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
        first = fragment.firstChild;

        if ( fragment.childNodes.length === 1 ) {
            fragment = first;
        }

        // Require either new content or an interest in ignored elements to invoke the callback
        if ( first || ignored ) {
            scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
            hasScripts = scripts.length;

            // Use the original fragment for the last item
            // instead of the first because it can end up
            // being emptied incorrectly in certain situations (#8070).
            for ( ; i < l; i++ ) {
                node = fragment;

                if ( i !== iNoClone ) {
                    node = jQuery.clone( node, true, true );

                    // Keep references to cloned scripts for later restoration
                    if ( hasScripts ) {

                        // Support: Android<4.1, PhantomJS<2
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge( scripts, getAll( node, "script" ) );
                    }
                }

                callback.call( collection[ i ], node, i );
            }

            if ( hasScripts ) {
                doc = scripts[ scripts.length - 1 ].ownerDocument;

                // Reenable scripts
                jQuery.map( scripts, restoreScript );

                // Evaluate executable scripts on first document insertion
                for ( i = 0; i < hasScripts; i++ ) {
                    node = scripts[ i ];
                    if ( rscriptType.test( node.type || "" ) &&
                        !jQuery._data( node, "globalEval" ) &&
                        jQuery.contains( doc, node ) ) {

                        if ( node.src ) {

                            // Optional AJAX dependency, but won't run scripts if not present
                            if ( jQuery._evalUrl ) {
                                jQuery._evalUrl( node.src );
                            }
                        } else {
                            jQuery.globalEval(
                                ( node.text || node.textContent || node.innerHTML || "" )
                                    .replace( rcleanScript, "" )
                            );
                        }
                    }
                }
            }

            // Fix #11809: Avoid leaking memory
            fragment = first = null;
        }
    }

    return collection;
}

function remove( elem, selector, keepData ) {
    var node,
        elems = selector ? jQuery.filter( selector, elem ) : elem,
        i = 0;

    for ( ; ( node = elems[ i ] ) != null; i++ ) {

        if ( !keepData && node.nodeType === 1 ) {
            jQuery.cleanData( getAll( node ) );
        }

        if ( node.parentNode ) {
            if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
                setGlobalEval( getAll( node, "script" ) );
            }
            node.parentNode.removeChild( node );
        }
    }

    return elem;
}

jQuery.extend( {
    htmlPrefilter: function( html ) {
        return html.replace( rxhtmlTag, "<$1></$2>" );
    },

    clone: function( elem, dataAndEvents, deepDataAndEvents ) {
        var destElements, node, clone, i, srcElements,
            inPage = jQuery.contains( elem.ownerDocument, elem );

        if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
            !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

            clone = elem.cloneNode( true );

        // IE<=8 does not properly clone detached, unknown element nodes
        } else {
            fragmentDiv.innerHTML = elem.outerHTML;
            fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
        }

        if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
                ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

            // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
            destElements = getAll( clone );
            srcElements = getAll( elem );

            // Fix all IE cloning issues
            for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

                // Ensure that the destination node is not null; Fixes #9587
                if ( destElements[ i ] ) {
                    fixCloneNodeIssues( node, destElements[ i ] );
                }
            }
        }

        // Copy the events from the original to the clone
        if ( dataAndEvents ) {
            if ( deepDataAndEvents ) {
                srcElements = srcElements || getAll( elem );
                destElements = destElements || getAll( clone );

                for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
                    cloneCopyEvent( node, destElements[ i ] );
                }
            } else {
                cloneCopyEvent( elem, clone );
            }
        }

        // Preserve script evaluation history
        destElements = getAll( clone, "script" );
        if ( destElements.length > 0 ) {
            setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
        }

        destElements = srcElements = node = null;

        // Return the cloned set
        return clone;
    },

    cleanData: function( elems, /* internal */ forceAcceptData ) {
        var elem, type, id, data,
            i = 0,
            internalKey = jQuery.expando,
            cache = jQuery.cache,
            attributes = support.attributes,
            special = jQuery.event.special;

        for ( ; ( elem = elems[ i ] ) != null; i++ ) {
            if ( forceAcceptData || acceptData( elem ) ) {

                id = elem[ internalKey ];
                data = id && cache[ id ];

                if ( data ) {
                    if ( data.events ) {
                        for ( type in data.events ) {
                            if ( special[ type ] ) {
                                jQuery.event.remove( elem, type );

                            // This is a shortcut to avoid jQuery.event.remove's overhead
                            } else {
                                jQuery.removeEvent( elem, type, data.handle );
                            }
                        }
                    }

                    // Remove cache only if it was not already removed by jQuery.event.remove
                    if ( cache[ id ] ) {

                        delete cache[ id ];

                        // Support: IE<9
                        // IE does not allow us to delete expando properties from nodes
                        // IE creates expando attributes along with the property
                        // IE does not have a removeAttribute function on Document nodes
                        if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
                            elem.removeAttribute( internalKey );

                        // Webkit & Blink performance suffers when deleting properties
                        // from DOM nodes, so set to undefined instead
                        // https://code.google.com/p/chromium/issues/detail?id=378607
                        } else {
                            elem[ internalKey ] = undefined;
                        }

                        deletedIds.push( id );
                    }
                }
            }
        }
    }
} );

jQuery.fn.extend( {

    // Keep domManip exposed until 3.0 (gh-2225)
    domManip: domManip,

    detach: function( selector ) {
        return remove( this, selector, true );
    },

    remove: function( selector ) {
        return remove( this, selector );
    },

    text: function( value ) {
        return access( this, function( value ) {
            return value === undefined ?
                jQuery.text( this ) :
                this.empty().append(
                    ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
                );
        }, null, value, arguments.length );
    },

    append: function() {
        return domManip( this, arguments, function( elem ) {
            if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                var target = manipulationTarget( this, elem );
                target.appendChild( elem );
            }
        } );
    },

    prepend: function() {
        return domManip( this, arguments, function( elem ) {
            if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                var target = manipulationTarget( this, elem );
                target.insertBefore( elem, target.firstChild );
            }
        } );
    },

    before: function() {
        return domManip( this, arguments, function( elem ) {
            if ( this.parentNode ) {
                this.parentNode.insertBefore( elem, this );
            }
        } );
    },

    after: function() {
        return domManip( this, arguments, function( elem ) {
            if ( this.parentNode ) {
                this.parentNode.insertBefore( elem, this.nextSibling );
            }
        } );
    },

    empty: function() {
        var elem,
            i = 0;

        for ( ; ( elem = this[ i ] ) != null; i++ ) {

            // Remove element nodes and prevent memory leaks
            if ( elem.nodeType === 1 ) {
                jQuery.cleanData( getAll( elem, false ) );
            }

            // Remove any remaining nodes
            while ( elem.firstChild ) {
                elem.removeChild( elem.firstChild );
            }

            // If this is a select, ensure that it displays empty (#12336)
            // Support: IE<9
            if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
                elem.options.length = 0;
            }
        }

        return this;
    },

    clone: function( dataAndEvents, deepDataAndEvents ) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

        return this.map( function() {
            return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
        } );
    },

    html: function( value ) {
        return access( this, function( value ) {
            var elem = this[ 0 ] || {},
                i = 0,
                l = this.length;

            if ( value === undefined ) {
                return elem.nodeType === 1 ?
                    elem.innerHTML.replace( rinlinejQuery, "" ) :
                    undefined;
            }

            // See if we can take a shortcut and just use innerHTML
            if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                ( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                ( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

                value = jQuery.htmlPrefilter( value );

                try {
                    for ( ; i < l; i++ ) {

                        // Remove element nodes and prevent memory leaks
                        elem = this[ i ] || {};
                        if ( elem.nodeType === 1 ) {
                            jQuery.cleanData( getAll( elem, false ) );
                            elem.innerHTML = value;
                        }
                    }

                    elem = 0;

                // If using innerHTML throws an exception, use the fallback method
                } catch ( e ) {}
            }

            if ( elem ) {
                this.empty().append( value );
            }
        }, null, value, arguments.length );
    },

    replaceWith: function() {
        var ignored = [];

        // Make the changes, replacing each non-ignored context element with the new content
        return domManip( this, arguments, function( elem ) {
            var parent = this.parentNode;

            if ( jQuery.inArray( this, ignored ) < 0 ) {
                jQuery.cleanData( getAll( this ) );
                if ( parent ) {
                    parent.replaceChild( elem, this );
                }
            }

        // Force callback invocation
        }, ignored );
    }
} );

jQuery.each( {
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
}, function( name, original ) {
    jQuery.fn[ name ] = function( selector ) {
        var elems,
            i = 0,
            ret = [],
            insert = jQuery( selector ),
            last = insert.length - 1;

        for ( ; i <= last; i++ ) {
            elems = i === last ? this : this.clone( true );
            jQuery( insert[ i ] )[ original ]( elems );

            // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
            push.apply( ret, elems.get() );
        }

        return this.pushStack( ret );
    };
} );


var iframe,
    elemdisplay = {

        // Support: Firefox
        // We have to pre-define these values for FF (#10227)
        HTML: "block",
        BODY: "block"
    };

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
    var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

        display = jQuery.css( elem[ 0 ], "display" );

    // We don't have any data stored on the element,
    // so use "detach" method as fast way to get rid of the element
    elem.detach();

    return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
    var doc = document,
        display = elemdisplay[ nodeName ];

    if ( !display ) {
        display = actualDisplay( nodeName, doc );

        // If the simple way fails, read from inside an iframe
        if ( display === "none" || !display ) {

            // Use the already-created iframe if possible
            iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
                .appendTo( doc.documentElement );

            // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
            doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

            // Support: IE
            doc.write();
            doc.close();

            display = actualDisplay( nodeName, doc );
            iframe.detach();
        }

        // Store the correct default display
        elemdisplay[ nodeName ] = display;
    }

    return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
    var ret, name,
        old = {};

    // Remember the old values, and insert the new ones
    for ( name in options ) {
        old[ name ] = elem.style[ name ];
        elem.style[ name ] = options[ name ];
    }

    ret = callback.apply( elem, args || [] );

    // Revert the old values
    for ( name in options ) {
        elem.style[ name ] = old[ name ];
    }

    return ret;
};


var documentElement = document.documentElement;



( function() {
    var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
        reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
        container = document.createElement( "div" ),
        div = document.createElement( "div" );

    // Finish early in limited (non-browser) environments
    if ( !div.style ) {
        return;
    }

    div.style.cssText = "float:left;opacity:.5";

    // Support: IE<9
    // Make sure that element opacity exists (as opposed to filter)
    support.opacity = div.style.opacity === "0.5";

    // Verify style float existence
    // (IE uses styleFloat instead of cssFloat)
    support.cssFloat = !!div.style.cssFloat;

    div.style.backgroundClip = "content-box";
    div.cloneNode( true ).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";

    container = document.createElement( "div" );
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
        "padding:0;margin-top:1px;position:absolute";
    div.innerHTML = "";
    container.appendChild( div );

    // Support: Firefox<29, Android 2.3
    // Vendor-prefix box-sizing
    support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
        div.style.WebkitBoxSizing === "";

    jQuery.extend( support, {
        reliableHiddenOffsets: function() {
            if ( pixelPositionVal == null ) {
                computeStyleTests();
            }
            return reliableHiddenOffsetsVal;
        },

        boxSizingReliable: function() {

            // We're checking for pixelPositionVal here instead of boxSizingReliableVal
            // since that compresses better and they're computed together anyway.
            if ( pixelPositionVal == null ) {
                computeStyleTests();
            }
            return boxSizingReliableVal;
        },

        pixelMarginRight: function() {

            // Support: Android 4.0-4.3
            if ( pixelPositionVal == null ) {
                computeStyleTests();
            }
            return pixelMarginRightVal;
        },

        pixelPosition: function() {
            if ( pixelPositionVal == null ) {
                computeStyleTests();
            }
            return pixelPositionVal;
        },

        reliableMarginRight: function() {

            // Support: Android 2.3
            if ( pixelPositionVal == null ) {
                computeStyleTests();
            }
            return reliableMarginRightVal;
        },

        reliableMarginLeft: function() {

            // Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
            if ( pixelPositionVal == null ) {
                computeStyleTests();
            }
            return reliableMarginLeftVal;
        }
    } );

    function computeStyleTests() {
        var contents, divStyle,
            documentElement = document.documentElement;

        // Setup
        documentElement.appendChild( container );

        div.style.cssText =

            // Support: Android 2.3
            // Vendor-prefix box-sizing
            "-webkit-box-sizing:border-box;box-sizing:border-box;" +
            "position:relative;display:block;" +
            "margin:auto;border:1px;padding:1px;" +
            "top:1%;width:50%";

        // Support: IE<9
        // Assume reasonable values in the absence of getComputedStyle
        pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
        pixelMarginRightVal = reliableMarginRightVal = true;

        // Check for getComputedStyle so that this code is not run in IE<9.
        if ( window.getComputedStyle ) {
            divStyle = window.getComputedStyle( div );
            pixelPositionVal = ( divStyle || {} ).top !== "1%";
            reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
            boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

            // Support: Android 4.0 - 4.3 only
            // Some styles come back with percentage values, even though they shouldn't
            div.style.marginRight = "50%";
            pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

            // Support: Android 2.3 only
            // Div with explicit width and no margin-right incorrectly
            // gets computed margin-right based on width of container (#3333)
            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
            contents = div.appendChild( document.createElement( "div" ) );

            // Reset CSS: box-sizing; display; margin; border; padding
            contents.style.cssText = div.style.cssText =

                // Support: Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
            contents.style.marginRight = contents.style.width = "0";
            div.style.width = "1px";

            reliableMarginRightVal =
                !parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

            div.removeChild( contents );
        }

        // Support: IE6-8
        // First check that getClientRects works as expected
        // Check if table cells still have offsetWidth/Height when they are set
        // to display:none and there are still other visible table cells in a
        // table row; if so, offsetWidth/Height are not reliable for use when
        // determining if an element has been hidden directly using
        // display:none (it is still safe to use offsets if a parent element is
        // hidden; don safety goggles and see bug #4512 for more information).
        div.style.display = "none";
        reliableHiddenOffsetsVal = div.getClientRects().length === 0;
        if ( reliableHiddenOffsetsVal ) {
            div.style.display = "";
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            contents = div.getElementsByTagName( "td" );
            contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
            reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
            if ( reliableHiddenOffsetsVal ) {
                contents[ 0 ].style.display = "";
                contents[ 1 ].style.display = "none";
                reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
            }
        }

        // Teardown
        documentElement.removeChild( container );
    }

} )();


var getStyles, curCSS,
    rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
    getStyles = function( elem ) {

        // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;

        if ( !view || !view.opener ) {
            view = window;
        }

        return view.getComputedStyle( elem );
    };

    curCSS = function( elem, name, computed ) {
        var width, minWidth, maxWidth, ret,
            style = elem.style;

        computed = computed || getStyles( elem );

        // getPropertyValue is only needed for .css('filter') in IE9, see #12537
        ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

        // Support: Opera 12.1x only
        // Fall back to style even without computed
        // computed is undefined for elems on document fragments
        if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
            ret = jQuery.style( elem, name );
        }

        if ( computed ) {

            // A tribute to the "awesome hack by Dean Edwards"
            // Chrome < 17 and Safari 5.0 uses "computed value"
            // instead of "used value" for margin-right
            // Safari 5.1.7 (at least) returns percentage for a larger set of values,
            // but width seems to be reliably pixels
            // this is against the CSSOM draft spec:
            // http://dev.w3.org/csswg/cssom/#resolved-values
            if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        // Support: IE
        // IE returns zIndex value as an integer.
        return ret === undefined ?
            ret :
            ret + "";
    };
} else if ( documentElement.currentStyle ) {
    getStyles = function( elem ) {
        return elem.currentStyle;
    };

    curCSS = function( elem, name, computed ) {
        var left, rs, rsLeft, ret,
            style = elem.style;

        computed = computed || getStyles( elem );
        ret = computed ? computed[ name ] : undefined;

        // Avoid setting ret to empty string here
        // so we don't default to auto
        if ( ret == null && style && style[ name ] ) {
            ret = style[ name ];
        }

        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels
        // but not position css attributes, as those are
        // proportional to the parent element instead
        // and we can't measure the parent instead because it
        // might trigger a "stacking dolls" problem
        if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

            // Remember the original values
            left = style.left;
            rs = elem.runtimeStyle;
            rsLeft = rs && rs.left;

            // Put in the new values to get a computed value out
            if ( rsLeft ) {
                rs.left = elem.currentStyle.left;
            }
            style.left = name === "fontSize" ? "1em" : ret;
            ret = style.pixelLeft + "px";

            // Revert the changed values
            style.left = left;
            if ( rsLeft ) {
                rs.left = rsLeft;
            }
        }

        // Support: IE
        // IE returns zIndex value as an integer.
        return ret === undefined ?
            ret :
            ret + "" || "auto";
    };
}




function addGetHookIf( conditionFn, hookFn ) {

    // Define the hook, we'll check on the first run if it's really needed.
    return {
        get: function() {
            if ( conditionFn() ) {

                // Hook not needed (or it's not possible to use it due
                // to missing dependency), remove it.
                delete this.get;
                return;
            }

            // Hook needed; redefine it so that the support test is not executed again.
            return ( this.get = hookFn ).apply( this, arguments );
        }
    };
}


var

        ralpha = /alpha\([^)]*\)/i,
    ropacity = /opacity\s*=\s*([^)]*)/i,

    // swappable if display is none or starts with table except
    // "table", "table-cell", or "table-caption"
    // see here for display values:
    // https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    },

    cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
    emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

    // shortcut for names that are not vendor prefixed
    if ( name in emptyStyle ) {
        return name;
    }

    // check for vendor prefixed names
    var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
        i = cssPrefixes.length;

    while ( i-- ) {
        name = cssPrefixes[ i ] + capName;
        if ( name in emptyStyle ) {
            return name;
        }
    }
}

function showHide( elements, show ) {
    var display, elem, hidden,
        values = [],
        index = 0,
        length = elements.length;

    for ( ; index < length; index++ ) {
        elem = elements[ index ];
        if ( !elem.style ) {
            continue;
        }

        values[ index ] = jQuery._data( elem, "olddisplay" );
        display = elem.style.display;
        if ( show ) {

            // Reset the inline display of this element to learn if it is
            // being hidden by cascaded rules or not
            if ( !values[ index ] && display === "none" ) {
                elem.style.display = "";
            }

            // Set elements which have been overridden with display: none
            // in a stylesheet to whatever the default browser style is
            // for such an element
            if ( elem.style.display === "" && isHidden( elem ) ) {
                values[ index ] =
                    jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
            }
        } else {
            hidden = isHidden( elem );

            if ( display && display !== "none" || !hidden ) {
                jQuery._data(
                    elem,
                    "olddisplay",
                    hidden ? display : jQuery.css( elem, "display" )
                );
            }
        }
    }

    // Set the display of most of the elements in a second loop
    // to avoid the constant reflow
    for ( index = 0; index < length; index++ ) {
        elem = elements[ index ];
        if ( !elem.style ) {
            continue;
        }
        if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
            elem.style.display = show ? values[ index ] || "" : "none";
        }
    }

    return elements;
}

function setPositiveNumber( elem, value, subtract ) {
    var matches = rnumsplit.exec( value );
    return matches ?

        // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
        value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
    var i = extra === ( isBorderBox ? "border" : "content" ) ?

        // If we already have the right measurement, avoid augmentation
        4 :

        // Otherwise initialize for horizontal or vertical properties
        name === "width" ? 1 : 0,

        val = 0;

    for ( ; i < 4; i += 2 ) {

        // both box models exclude margin, so add it if we want it
        if ( extra === "margin" ) {
            val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
        }

        if ( isBorderBox ) {

            // border-box includes padding, so remove it if we want content
            if ( extra === "content" ) {
                val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
            }

            // at this point, extra isn't border nor margin, so remove border
            if ( extra !== "margin" ) {
                val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
            }
        } else {

            // at this point, extra isn't content, so add padding
            val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

            // at this point, extra isn't content nor padding, so add border
            if ( extra !== "padding" ) {
                val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
            }
        }
    }

    return val;
}

function getWidthOrHeight( elem, name, extra ) {

    // Start with offset property, which is equivalent to the border-box value
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles( elem ),
        isBorderBox = support.boxSizing &&
            jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

    // Support: IE11 only
    // In IE 11 fullscreen elements inside of an iframe have
    // 100x too small dimensions (gh-1764).
    if ( document.msFullscreenElement && window.top !== window ) {

        // Support: IE11 only
        // Running getBoundingClientRect on a disconnected node
        // in IE throws an error.
        if ( elem.getClientRects().length ) {
            val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
        }
    }

    // some non-html elements return undefined for offsetWidth, so check for null/undefined
    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
    if ( val <= 0 || val == null ) {

        // Fall back to computed then uncomputed css if necessary
        val = curCSS( elem, name, styles );
        if ( val < 0 || val == null ) {
            val = elem.style[ name ];
        }

        // Computed unit is not pixels. Stop here and return.
        if ( rnumnonpx.test( val ) ) {
            return val;
        }

        // we need the check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        valueIsBorderBox = isBorderBox &&
            ( support.boxSizingReliable() || val === elem.style[ name ] );

        // Normalize "", auto, and prepare for extra
        val = parseFloat( val ) || 0;
    }

    // use the active box-sizing model to add/subtract irrelevant styles
    return ( val +
        augmentWidthOrHeight(
            elem,
            name,
            extra || ( isBorderBox ? "border" : "content" ),
            valueIsBorderBox,
            styles
        )
    ) + "px";
}

jQuery.extend( {

    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
        opacity: {
            get: function( elem, computed ) {
                if ( computed ) {

                    // We should always get a number back from opacity
                    var ret = curCSS( elem, "opacity" );
                    return ret === "" ? "1" : ret;
                }
            }
        }
    },

    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
        "animationIterationCount": true,
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
    },

    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {

        // normalize float css property
        "float": support.cssFloat ? "cssFloat" : "styleFloat"
    },

    // Get and set the style property on a DOM Node
    style: function( elem, name, value, extra ) {

        // Don't set styles on text and comment nodes
        if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
            return;
        }

        // Make sure that we're working with the right name
        var ret, type, hooks,
            origName = jQuery.camelCase( name ),
            style = elem.style;

        name = jQuery.cssProps[ origName ] ||
            ( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

        // Check if we're setting a value
        if ( value !== undefined ) {
            type = typeof value;

            // Convert "+=" or "-=" to relative numbers (#7345)
            if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
                value = adjustCSS( elem, name, ret );

                // Fixes bug #9237
                type = "number";
            }

            // Make sure that null and NaN values aren't set. See: #7116
            if ( value == null || value !== value ) {
                return;
            }

            // If a number was passed in, add the unit (except for certain CSS properties)
            if ( type === "number" ) {
                value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
            }

            // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
            // but it would mean to define eight
            // (for every problematic property) identical functions
            if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
                style[ name ] = "inherit";
            }

            // If a hook was provided, use that value, otherwise just set the specified value
            if ( !hooks || !( "set" in hooks ) ||
                ( value = hooks.set( elem, value, extra ) ) !== undefined ) {

                // Support: IE
                // Swallow errors from 'invalid' CSS values (#5509)
                try {
                    style[ name ] = value;
                } catch ( e ) {}
            }

        } else {

            // If a hook was provided get the non-computed value from there
            if ( hooks && "get" in hooks &&
                ( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

                return ret;
            }

            // Otherwise just get the value from the style object
            return style[ name ];
        }
    },

    css: function( elem, name, extra, styles ) {
        var num, val, hooks,
            origName = jQuery.camelCase( name );

        // Make sure that we're working with the right name
        name = jQuery.cssProps[ origName ] ||
            ( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

        // If a hook was provided get the computed value from there
        if ( hooks && "get" in hooks ) {
            val = hooks.get( elem, true, extra );
        }

        // Otherwise, if a way to get the computed value exists, use that
        if ( val === undefined ) {
            val = curCSS( elem, name, styles );
        }

        //convert "normal" to computed value
        if ( val === "normal" && name in cssNormalTransform ) {
            val = cssNormalTransform[ name ];
        }

        // Return, converting to number if forced or a qualifier was provided and val looks numeric
        if ( extra === "" || extra ) {
            num = parseFloat( val );
            return extra === true || isFinite( num ) ? num || 0 : val;
        }
        return val;
    }
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
    jQuery.cssHooks[ name ] = {
        get: function( elem, computed, extra ) {
            if ( computed ) {

                // certain elements can have dimension info if we invisibly show them
                // however, it must have a current display style that would benefit from this
                return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
                    elem.offsetWidth === 0 ?
                        swap( elem, cssShow, function() {
                            return getWidthOrHeight( elem, name, extra );
                        } ) :
                        getWidthOrHeight( elem, name, extra );
            }
        },

        set: function( elem, value, extra ) {
            var styles = extra && getStyles( elem );
            return setPositiveNumber( elem, value, extra ?
                augmentWidthOrHeight(
                    elem,
                    name,
                    extra,
                    support.boxSizing &&
                        jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                    styles
                ) : 0
            );
        }
    };
} );

if ( !support.opacity ) {
    jQuery.cssHooks.opacity = {
        get: function( elem, computed ) {

            // IE uses filters for opacity
            return ropacity.test( ( computed && elem.currentStyle ?
                elem.currentStyle.filter :
                elem.style.filter ) || "" ) ?
                    ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
                    computed ? "1" : "";
        },

        set: function( elem, value ) {
            var style = elem.style,
                currentStyle = elem.currentStyle,
                opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
                filter = currentStyle && currentStyle.filter || style.filter || "";

            // IE has trouble with opacity if it does not have layout
            // Force it by setting the zoom level
            style.zoom = 1;

            // if setting opacity to 1, and no other filters exist -
            // attempt to remove filter attribute #6652
            // if value === "", then remove inline opacity #12685
            if ( ( value >= 1 || value === "" ) &&
                    jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
                    style.removeAttribute ) {

                // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                // if "filter:" is present at all, clearType is disabled, we want to avoid this
                // style.removeAttribute is IE Only, but so apparently is this code path...
                style.removeAttribute( "filter" );

                // if there is no filter style applied in a css rule
                // or unset inline opacity, we are done
                if ( value === "" || currentStyle && !currentStyle.filter ) {
                    return;
                }
            }

            // otherwise, set new filter values
            style.filter = ralpha.test( filter ) ?
                filter.replace( ralpha, opacity ) :
                filter + " " + opacity;
        }
    };
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
    function( elem, computed ) {
        if ( computed ) {
            return swap( elem, { "display": "inline-block" },
                curCSS, [ elem, "marginRight" ] );
        }
    }
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
    function( elem, computed ) {
        if ( computed ) {
            return (
                parseFloat( curCSS( elem, "marginLeft" ) ) ||

                // Support: IE<=11+
                // Running getBoundingClientRect on a disconnected node in IE throws an error
                // Support: IE8 only
                // getClientRects() errors on disconnected elems
                ( jQuery.contains( elem.ownerDocument, elem ) ?
                    elem.getBoundingClientRect().left -
                        swap( elem, { marginLeft: 0 }, function() {
                            return elem.getBoundingClientRect().left;
                        } ) :
                    0
                )
            ) + "px";
        }
    }
);

// These hooks are used by animate to expand properties
jQuery.each( {
    margin: "",
    padding: "",
    border: "Width"
}, function( prefix, suffix ) {
    jQuery.cssHooks[ prefix + suffix ] = {
        expand: function( value ) {
            var i = 0,
                expanded = {},

                // assumes a single number if not a string
                parts = typeof value === "string" ? value.split( " " ) : [ value ];

            for ( ; i < 4; i++ ) {
                expanded[ prefix + cssExpand[ i ] + suffix ] =
                    parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
            }

            return expanded;
        }
    };

    if ( !rmargin.test( prefix ) ) {
        jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
    }
} );

jQuery.fn.extend( {
    css: function( name, value ) {
        return access( this, function( elem, name, value ) {
            var styles, len,
                map = {},
                i = 0;

            if ( jQuery.isArray( name ) ) {
                styles = getStyles( elem );
                len = name.length;

                for ( ; i < len; i++ ) {
                    map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                }

                return map;
            }

            return value !== undefined ?
                jQuery.style( elem, name, value ) :
                jQuery.css( elem, name );
        }, name, value, arguments.length > 1 );
    },
    show: function() {
        return showHide( this, true );
    },
    hide: function() {
        return showHide( this );
    },
    toggle: function( state ) {
        if ( typeof state === "boolean" ) {
            return state ? this.show() : this.hide();
        }

        return this.each( function() {
            if ( isHidden( this ) ) {
                jQuery( this ).show();
            } else {
                jQuery( this ).hide();
            }
        } );
    }
} );


function Tween( elem, options, prop, end, easing ) {
    return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
    constructor: Tween,
    init: function( elem, options, prop, end, easing, unit ) {
        this.elem = elem;
        this.prop = prop;
        this.easing = easing || jQuery.easing._default;
        this.options = options;
        this.start = this.now = this.cur();
        this.end = end;
        this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
    },
    cur: function() {
        var hooks = Tween.propHooks[ this.prop ];

        return hooks && hooks.get ?
            hooks.get( this ) :
            Tween.propHooks._default.get( this );
    },
    run: function( percent ) {
        var eased,
            hooks = Tween.propHooks[ this.prop ];

        if ( this.options.duration ) {
            this.pos = eased = jQuery.easing[ this.easing ](
                percent, this.options.duration * percent, 0, 1, this.options.duration
            );
        } else {
            this.pos = eased = percent;
        }
        this.now = ( this.end - this.start ) * eased + this.start;

        if ( this.options.step ) {
            this.options.step.call( this.elem, this.now, this );
        }

        if ( hooks && hooks.set ) {
            hooks.set( this );
        } else {
            Tween.propHooks._default.set( this );
        }
        return this;
    }
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
    _default: {
        get: function( tween ) {
            var result;

            // Use a property on the element directly when it is not a DOM element,
            // or when there is no matching style property that exists.
            if ( tween.elem.nodeType !== 1 ||
                tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
                return tween.elem[ tween.prop ];
            }

            // passing an empty string as a 3rd parameter to .css will automatically
            // attempt a parseFloat and fallback to a string if the parse fails
            // so, simple values such as "10px" are parsed to Float.
            // complex values such as "rotate(1rad)" are returned as is.
            result = jQuery.css( tween.elem, tween.prop, "" );

            // Empty strings, null, undefined and "auto" are converted to 0.
            return !result || result === "auto" ? 0 : result;
        },
        set: function( tween ) {

            // use step hook for back compat - use cssHook if its there - use .style if its
            // available and use plain properties where available
            if ( jQuery.fx.step[ tween.prop ] ) {
                jQuery.fx.step[ tween.prop ]( tween );
            } else if ( tween.elem.nodeType === 1 &&
                ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
                    jQuery.cssHooks[ tween.prop ] ) ) {
                jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
            } else {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    }
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function( tween ) {
        if ( tween.elem.nodeType && tween.elem.parentNode ) {
            tween.elem[ tween.prop ] = tween.now;
        }
    }
};

jQuery.easing = {
    linear: function( p ) {
        return p;
    },
    swing: function( p ) {
        return 0.5 - Math.cos( p * Math.PI ) / 2;
    },
    _default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
    fxNow, timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
    window.setTimeout( function() {
        fxNow = undefined;
    } );
    return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
    var which,
        attrs = { height: type },
        i = 0;

    // if we include width, step value is 1 to do all cssExpand values,
    // if we don't include width, step value is 2 to skip over Left and Right
    includeWidth = includeWidth ? 1 : 0;
    for ( ; i < 4 ; i += 2 - includeWidth ) {
        which = cssExpand[ i ];
        attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
    }

    if ( includeWidth ) {
        attrs.opacity = attrs.width = type;
    }

    return attrs;
}

function createTween( value, prop, animation ) {
    var tween,
        collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
        index = 0,
        length = collection.length;
    for ( ; index < length; index++ ) {
        if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

            // we're done with this property
            return tween;
        }
    }
}

function defaultPrefilter( elem, props, opts ) {
    /* jshint validthis: true */
    var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden( elem ),
        dataShow = jQuery._data( elem, "fxshow" );

    // handle queue: false promises
    if ( !opts.queue ) {
        hooks = jQuery._queueHooks( elem, "fx" );
        if ( hooks.unqueued == null ) {
            hooks.unqueued = 0;
            oldfire = hooks.empty.fire;
            hooks.empty.fire = function() {
                if ( !hooks.unqueued ) {
                    oldfire();
                }
            };
        }
        hooks.unqueued++;

        anim.always( function() {

            // doing this makes sure that the complete handler will be called
            // before this completes
            anim.always( function() {
                hooks.unqueued--;
                if ( !jQuery.queue( elem, "fx" ).length ) {
                    hooks.empty.fire();
                }
            } );
        } );
    }

    // height/width overflow pass
    if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

        // Make sure that nothing sneaks out
        // Record all 3 overflow attributes because IE does not
        // change the overflow attribute when overflowX and
        // overflowY are set to the same value
        opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

        // Set display property to inline-block for height/width
        // animations on inline elements that are having width/height animated
        display = jQuery.css( elem, "display" );

        // Test default display if display is currently "none"
        checkDisplay = display === "none" ?
            jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

        if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

            // inline-level elements accept inline-block;
            // block-level elements need to be inline with layout
            if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
                style.display = "inline-block";
            } else {
                style.zoom = 1;
            }
        }
    }

    if ( opts.overflow ) {
        style.overflow = "hidden";
        if ( !support.shrinkWrapBlocks() ) {
            anim.always( function() {
                style.overflow = opts.overflow[ 0 ];
                style.overflowX = opts.overflow[ 1 ];
                style.overflowY = opts.overflow[ 2 ];
            } );
        }
    }

    // show/hide pass
    for ( prop in props ) {
        value = props[ prop ];
        if ( rfxtypes.exec( value ) ) {
            delete props[ prop ];
            toggle = toggle || value === "toggle";
            if ( value === ( hidden ? "hide" : "show" ) ) {

                // If there is dataShow left over from a stopped hide or show
                // and we are going to proceed with show, we should pretend to be hidden
                if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
                    hidden = true;
                } else {
                    continue;
                }
            }
            orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

        // Any non-fx value stops us from restoring the original display value
        } else {
            display = undefined;
        }
    }

    if ( !jQuery.isEmptyObject( orig ) ) {
        if ( dataShow ) {
            if ( "hidden" in dataShow ) {
                hidden = dataShow.hidden;
            }
        } else {
            dataShow = jQuery._data( elem, "fxshow", {} );
        }

        // store state if its toggle - enables .stop().toggle() to "reverse"
        if ( toggle ) {
            dataShow.hidden = !hidden;
        }
        if ( hidden ) {
            jQuery( elem ).show();
        } else {
            anim.done( function() {
                jQuery( elem ).hide();
            } );
        }
        anim.done( function() {
            var prop;
            jQuery._removeData( elem, "fxshow" );
            for ( prop in orig ) {
                jQuery.style( elem, prop, orig[ prop ] );
            }
        } );
        for ( prop in orig ) {
            tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

            if ( !( prop in dataShow ) ) {
                dataShow[ prop ] = tween.start;
                if ( hidden ) {
                    tween.end = tween.start;
                    tween.start = prop === "width" || prop === "height" ? 1 : 0;
                }
            }
        }

    // If this is a noop like .hide().hide(), restore an overwritten display value
    } else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
        style.display = display;
    }
}

function propFilter( props, specialEasing ) {
    var index, name, easing, value, hooks;

    // camelCase, specialEasing and expand cssHook pass
    for ( index in props ) {
        name = jQuery.camelCase( index );
        easing = specialEasing[ name ];
        value = props[ index ];
        if ( jQuery.isArray( value ) ) {
            easing = value[ 1 ];
            value = props[ index ] = value[ 0 ];
        }

        if ( index !== name ) {
            props[ name ] = value;
            delete props[ index ];
        }

        hooks = jQuery.cssHooks[ name ];
        if ( hooks && "expand" in hooks ) {
            value = hooks.expand( value );
            delete props[ name ];

            // not quite $.extend, this wont overwrite keys already present.
            // also - reusing 'index' from above because we have the correct "name"
            for ( index in value ) {
                if ( !( index in props ) ) {
                    props[ index ] = value[ index ];
                    specialEasing[ index ] = easing;
                }
            }
        } else {
            specialEasing[ name ] = easing;
        }
    }
}

function Animation( elem, properties, options ) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always( function() {

            // don't match elem in the :animated selector
            delete tick.elem;
        } ),
        tick = function() {
            if ( stopped ) {
                return false;
            }
            var currentTime = fxNow || createFxNow(),
                remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

                // Support: Android 2.3
                // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                temp = remaining / animation.duration || 0,
                percent = 1 - temp,
                index = 0,
                length = animation.tweens.length;

            for ( ; index < length ; index++ ) {
                animation.tweens[ index ].run( percent );
            }

            deferred.notifyWith( elem, [ animation, percent, remaining ] );

            if ( percent < 1 && length ) {
                return remaining;
            } else {
                deferred.resolveWith( elem, [ animation ] );
                return false;
            }
        },
        animation = deferred.promise( {
            elem: elem,
            props: jQuery.extend( {}, properties ),
            opts: jQuery.extend( true, {
                specialEasing: {},
                easing: jQuery.easing._default
            }, options ),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function( prop, end ) {
                var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                animation.tweens.push( tween );
                return tween;
            },
            stop: function( gotoEnd ) {
                var index = 0,

                    // if we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                    length = gotoEnd ? animation.tweens.length : 0;
                if ( stopped ) {
                    return this;
                }
                stopped = true;
                for ( ; index < length ; index++ ) {
                    animation.tweens[ index ].run( 1 );
                }

                // resolve when we played the last frame
                // otherwise, reject
                if ( gotoEnd ) {
                    deferred.notifyWith( elem, [ animation, 1, 0 ] );
                    deferred.resolveWith( elem, [ animation, gotoEnd ] );
                } else {
                    deferred.rejectWith( elem, [ animation, gotoEnd ] );
                }
                return this;
            }
        } ),
        props = animation.props;

    propFilter( props, animation.opts.specialEasing );

    for ( ; index < length ; index++ ) {
        result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
        if ( result ) {
            if ( jQuery.isFunction( result.stop ) ) {
                jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
                    jQuery.proxy( result.stop, result );
            }
            return result;
        }
    }

    jQuery.map( props, createTween, animation );

    if ( jQuery.isFunction( animation.opts.start ) ) {
        animation.opts.start.call( elem, animation );
    }

    jQuery.fx.timer(
        jQuery.extend( tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        } )
    );

    // attach callbacks from options
    return animation.progress( animation.opts.progress )
        .done( animation.opts.done, animation.opts.complete )
        .fail( animation.opts.fail )
        .always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

    tweeners: {
        "*": [ function( prop, value ) {
            var tween = this.createTween( prop, value );
            adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
            return tween;
        } ]
    },

    tweener: function( props, callback ) {
        if ( jQuery.isFunction( props ) ) {
            callback = props;
            props = [ "*" ];
        } else {
            props = props.match( rnotwhite );
        }

        var prop,
            index = 0,
            length = props.length;

        for ( ; index < length ; index++ ) {
            prop = props[ index ];
            Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
            Animation.tweeners[ prop ].unshift( callback );
        }
    },

    prefilters: [ defaultPrefilter ],

    prefilter: function( callback, prepend ) {
        if ( prepend ) {
            Animation.prefilters.unshift( callback );
        } else {
            Animation.prefilters.push( callback );
        }
    }
} );

jQuery.speed = function( speed, easing, fn ) {
    var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
        complete: fn || !fn && easing ||
            jQuery.isFunction( speed ) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
    };

    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
        opt.duration in jQuery.fx.speeds ?
            jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

    // normalize opt.queue - true/undefined/null -> "fx"
    if ( opt.queue == null || opt.queue === true ) {
        opt.queue = "fx";
    }

    // Queueing
    opt.old = opt.complete;

    opt.complete = function() {
        if ( jQuery.isFunction( opt.old ) ) {
            opt.old.call( this );
        }

        if ( opt.queue ) {
            jQuery.dequeue( this, opt.queue );
        }
    };

    return opt;
};

jQuery.fn.extend( {
    fadeTo: function( speed, to, easing, callback ) {

        // show any hidden elements after setting opacity to 0
        return this.filter( isHidden ).css( "opacity", 0 ).show()

            // animate to the value specified
            .end().animate( { opacity: to }, speed, easing, callback );
    },
    animate: function( prop, speed, easing, callback ) {
        var empty = jQuery.isEmptyObject( prop ),
            optall = jQuery.speed( speed, easing, callback ),
            doAnimation = function() {

                // Operate on a copy of prop so per-property easing won't be lost
                var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                // Empty animations, or finishing resolves immediately
                if ( empty || jQuery._data( this, "finish" ) ) {
                    anim.stop( true );
                }
            };
            doAnimation.finish = doAnimation;

        return empty || optall.queue === false ?
            this.each( doAnimation ) :
            this.queue( optall.queue, doAnimation );
    },
    stop: function( type, clearQueue, gotoEnd ) {
        var stopQueue = function( hooks ) {
            var stop = hooks.stop;
            delete hooks.stop;
            stop( gotoEnd );
        };

        if ( typeof type !== "string" ) {
            gotoEnd = clearQueue;
            clearQueue = type;
            type = undefined;
        }
        if ( clearQueue && type !== false ) {
            this.queue( type || "fx", [] );
        }

        return this.each( function() {
            var dequeue = true,
                index = type != null && type + "queueHooks",
                timers = jQuery.timers,
                data = jQuery._data( this );

            if ( index ) {
                if ( data[ index ] && data[ index ].stop ) {
                    stopQueue( data[ index ] );
                }
            } else {
                for ( index in data ) {
                    if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                        stopQueue( data[ index ] );
                    }
                }
            }

            for ( index = timers.length; index--; ) {
                if ( timers[ index ].elem === this &&
                    ( type == null || timers[ index ].queue === type ) ) {

                    timers[ index ].anim.stop( gotoEnd );
                    dequeue = false;
                    timers.splice( index, 1 );
                }
            }

            // start the next in the queue if the last step wasn't forced
            // timers currently will call their complete callbacks, which will dequeue
            // but only if they were gotoEnd
            if ( dequeue || !gotoEnd ) {
                jQuery.dequeue( this, type );
            }
        } );
    },
    finish: function( type ) {
        if ( type !== false ) {
            type = type || "fx";
        }
        return this.each( function() {
            var index,
                data = jQuery._data( this ),
                queue = data[ type + "queue" ],
                hooks = data[ type + "queueHooks" ],
                timers = jQuery.timers,
                length = queue ? queue.length : 0;

            // enable finishing flag on private data
            data.finish = true;

            // empty the queue first
            jQuery.queue( this, type, [] );

            if ( hooks && hooks.stop ) {
                hooks.stop.call( this, true );
            }

            // look for any active animations, and finish them
            for ( index = timers.length; index--; ) {
                if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                    timers[ index ].anim.stop( true );
                    timers.splice( index, 1 );
                }
            }

            // look for any animations in the old queue and finish them
            for ( index = 0; index < length; index++ ) {
                if ( queue[ index ] && queue[ index ].finish ) {
                    queue[ index ].finish.call( this );
                }
            }

            // turn off finishing flag
            delete data.finish;
        } );
    }
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
    var cssFn = jQuery.fn[ name ];
    jQuery.fn[ name ] = function( speed, easing, callback ) {
        return speed == null || typeof speed === "boolean" ?
            cssFn.apply( this, arguments ) :
            this.animate( genFx( name, true ), speed, easing, callback );
    };
} );

// Generate shortcuts for custom animations
jQuery.each( {
    slideDown: genFx( "show" ),
    slideUp: genFx( "hide" ),
    slideToggle: genFx( "toggle" ),
    fadeIn: { opacity: "show" },
    fadeOut: { opacity: "hide" },
    fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
    jQuery.fn[ name ] = function( speed, easing, callback ) {
        return this.animate( props, speed, easing, callback );
    };
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
    var timer,
        timers = jQuery.timers,
        i = 0;

    fxNow = jQuery.now();

    for ( ; i < timers.length; i++ ) {
        timer = timers[ i ];

        // Checks the timer has not already been removed
        if ( !timer() && timers[ i ] === timer ) {
            timers.splice( i--, 1 );
        }
    }

    if ( !timers.length ) {
        jQuery.fx.stop();
    }
    fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
    jQuery.timers.push( timer );
    if ( timer() ) {
        jQuery.fx.start();
    } else {
        jQuery.timers.pop();
    }
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
    if ( !timerId ) {
        timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
    }
};

jQuery.fx.stop = function() {
    window.clearInterval( timerId );
    timerId = null;
};

jQuery.fx.speeds = {
    slow: 600,
    fast: 200,

    // Default speed
    _default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
    time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
    type = type || "fx";

    return this.queue( type, function( next, hooks ) {
        var timeout = window.setTimeout( next, time );
        hooks.stop = function() {
            window.clearTimeout( timeout );
        };
    } );
};


( function() {
    var a,
        input = document.createElement( "input" ),
        div = document.createElement( "div" ),
        select = document.createElement( "select" ),
        opt = select.appendChild( document.createElement( "option" ) );

    // Setup
    div = document.createElement( "div" );
    div.setAttribute( "className", "t" );
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    a = div.getElementsByTagName( "a" )[ 0 ];

    // Support: Windows Web Apps (WWA)
    // `type` must use .setAttribute for WWA (#14901)
    input.setAttribute( "type", "checkbox" );
    div.appendChild( input );

    a = div.getElementsByTagName( "a" )[ 0 ];

    // First batch of tests.
    a.style.cssText = "top:1px";

    // Test setAttribute on camelCase class.
    // If it works, we need attrFixes when doing get/setAttribute (ie6/7)
    support.getSetAttribute = div.className !== "t";

    // Get the style information from getAttribute
    // (IE uses .cssText instead)
    support.style = /top/.test( a.getAttribute( "style" ) );

    // Make sure that URLs aren't manipulated
    // (IE normalizes it by default)
    support.hrefNormalized = a.getAttribute( "href" ) === "/a";

    // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
    support.checkOn = !!input.value;

    // Make sure that a selected-by-default option has a working selected property.
    // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
    support.optSelected = opt.selected;

    // Tests for enctype support on a form (#6743)
    support.enctype = !!document.createElement( "form" ).enctype;

    // Make sure that the options inside disabled selects aren't marked as disabled
    // (WebKit marks them as disabled)
    select.disabled = true;
    support.optDisabled = !opt.disabled;

    // Support: IE8 only
    // Check if we can trust getAttribute("value")
    input = document.createElement( "input" );
    input.setAttribute( "value", "" );
    support.input = input.getAttribute( "value" ) === "";

    // Check if an input maintains its value after becoming a radio
    input.value = "t";
    input.setAttribute( "type", "radio" );
    support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
    rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
    val: function( value ) {
        var hooks, ret, isFunction,
            elem = this[ 0 ];

        if ( !arguments.length ) {
            if ( elem ) {
                hooks = jQuery.valHooks[ elem.type ] ||
                    jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                if (
                    hooks &&
                    "get" in hooks &&
                    ( ret = hooks.get( elem, "value" ) ) !== undefined
                ) {
                    return ret;
                }

                ret = elem.value;

                return typeof ret === "string" ?

                    // handle most common string cases
                    ret.replace( rreturn, "" ) :

                    // handle cases where value is null/undef or number
                    ret == null ? "" : ret;
            }

            return;
        }

        isFunction = jQuery.isFunction( value );

        return this.each( function( i ) {
            var val;

            if ( this.nodeType !== 1 ) {
                return;
            }

            if ( isFunction ) {
                val = value.call( this, i, jQuery( this ).val() );
            } else {
                val = value;
            }

            // Treat null/undefined as ""; convert numbers to string
            if ( val == null ) {
                val = "";
            } else if ( typeof val === "number" ) {
                val += "";
            } else if ( jQuery.isArray( val ) ) {
                val = jQuery.map( val, function( value ) {
                    return value == null ? "" : value + "";
                } );
            }

            hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

            // If set returns undefined, fall back to normal setting
            if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
                this.value = val;
            }
        } );
    }
} );

jQuery.extend( {
    valHooks: {
        option: {
            get: function( elem ) {
                var val = jQuery.find.attr( elem, "value" );
                return val != null ?
                    val :

                    // Support: IE10-11+
                    // option.text throws exceptions (#14686, #14858)
                    // Strip and collapse whitespace
                    // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                    jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
            }
        },
        select: {
            get: function( elem ) {
                var value, option,
                    options = elem.options,
                    index = elem.selectedIndex,
                    one = elem.type === "select-one" || index < 0,
                    values = one ? null : [],
                    max = one ? index + 1 : options.length,
                    i = index < 0 ?
                        max :
                        one ? index : 0;

                // Loop through all the selected options
                for ( ; i < max; i++ ) {
                    option = options[ i ];

                    // oldIE doesn't update selected after form reset (#2551)
                    if ( ( option.selected || i === index ) &&

                            // Don't return options that are disabled or in a disabled optgroup
                            ( support.optDisabled ?
                                !option.disabled :
                                option.getAttribute( "disabled" ) === null ) &&
                            ( !option.parentNode.disabled ||
                                !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

                        // Get the specific value for the option
                        value = jQuery( option ).val();

                        // We don't need an array for one selects
                        if ( one ) {
                            return value;
                        }

                        // Multi-Selects return an array
                        values.push( value );
                    }
                }

                return values;
            },

            set: function( elem, value ) {
                var optionSet, option,
                    options = elem.options,
                    values = jQuery.makeArray( value ),
                    i = options.length;

                while ( i-- ) {
                    option = options[ i ];

                    if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

                        // Support: IE6
                        // When new option element is added to select box we need to
                        // force reflow of newly added node in order to workaround delay
                        // of initialization properties
                        try {
                            option.selected = optionSet = true;

                        } catch ( _ ) {

                            // Will be executed only in IE6
                            option.scrollHeight;
                        }

                    } else {
                        option.selected = false;
                    }
                }

                // Force browsers to behave consistently when non-matching value is set
                if ( !optionSet ) {
                    elem.selectedIndex = -1;
                }

                return options;
            }
        }
    }
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
    jQuery.valHooks[ this ] = {
        set: function( elem, value ) {
            if ( jQuery.isArray( value ) ) {
                return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
            }
        }
    };
    if ( !support.checkOn ) {
        jQuery.valHooks[ this ].get = function( elem ) {
            return elem.getAttribute( "value" ) === null ? "on" : elem.value;
        };
    }
} );




var nodeHook, boolHook,
    attrHandle = jQuery.expr.attrHandle,
    ruseDefault = /^(?:checked|selected)$/i,
    getSetAttribute = support.getSetAttribute,
    getSetInput = support.input;

jQuery.fn.extend( {
    attr: function( name, value ) {
        return access( this, jQuery.attr, name, value, arguments.length > 1 );
    },

    removeAttr: function( name ) {
        return this.each( function() {
            jQuery.removeAttr( this, name );
        } );
    }
} );

jQuery.extend( {
    attr: function( elem, name, value ) {
        var ret, hooks,
            nType = elem.nodeType;

        // Don't get/set attributes on text, comment and attribute nodes
        if ( nType === 3 || nType === 8 || nType === 2 ) {
            return;
        }

        // Fallback to prop when attributes are not supported
        if ( typeof elem.getAttribute === "undefined" ) {
            return jQuery.prop( elem, name, value );
        }

        // All attributes are lowercase
        // Grab necessary hook if one is defined
        if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
            name = name.toLowerCase();
            hooks = jQuery.attrHooks[ name ] ||
                ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
        }

        if ( value !== undefined ) {
            if ( value === null ) {
                jQuery.removeAttr( elem, name );
                return;
            }

            if ( hooks && "set" in hooks &&
                ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                return ret;
            }

            elem.setAttribute( name, value + "" );
            return value;
        }

        if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
            return ret;
        }

        ret = jQuery.find.attr( elem, name );

        // Non-existent attributes return null, we normalize to undefined
        return ret == null ? undefined : ret;
    },

    attrHooks: {
        type: {
            set: function( elem, value ) {
                if ( !support.radioValue && value === "radio" &&
                    jQuery.nodeName( elem, "input" ) ) {

                    // Setting the type on a radio button after the value resets the value in IE8-9
                    // Reset value to default in case type is set after value during creation
                    var val = elem.value;
                    elem.setAttribute( "type", value );
                    if ( val ) {
                        elem.value = val;
                    }
                    return value;
                }
            }
        }
    },

    removeAttr: function( elem, value ) {
        var name, propName,
            i = 0,
            attrNames = value && value.match( rnotwhite );

        if ( attrNames && elem.nodeType === 1 ) {
            while ( ( name = attrNames[ i++ ] ) ) {
                propName = jQuery.propFix[ name ] || name;

                // Boolean attributes get special treatment (#10870)
                if ( jQuery.expr.match.bool.test( name ) ) {

                    // Set corresponding property to false
                    if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
                        elem[ propName ] = false;

                    // Support: IE<9
                    // Also clear defaultChecked/defaultSelected (if appropriate)
                    } else {
                        elem[ jQuery.camelCase( "default-" + name ) ] =
                            elem[ propName ] = false;
                    }

                // See #9699 for explanation of this approach (setting first, then removal)
                } else {
                    jQuery.attr( elem, name, "" );
                }

                elem.removeAttribute( getSetAttribute ? name : propName );
            }
        }
    }
} );

// Hooks for boolean attributes
boolHook = {
    set: function( elem, value, name ) {
        if ( value === false ) {

            // Remove boolean attributes when set to false
            jQuery.removeAttr( elem, name );
        } else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

            // IE<8 needs the *property* name
            elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

        } else {

            // Support: IE<9
            // Use defaultChecked and defaultSelected for oldIE
            elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
        }
        return name;
    }
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
    var getter = attrHandle[ name ] || jQuery.find.attr;

    if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
        attrHandle[ name ] = function( elem, name, isXML ) {
            var ret, handle;
            if ( !isXML ) {

                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[ name ];
                attrHandle[ name ] = ret;
                ret = getter( elem, name, isXML ) != null ?
                    name.toLowerCase() :
                    null;
                attrHandle[ name ] = handle;
            }
            return ret;
        };
    } else {
        attrHandle[ name ] = function( elem, name, isXML ) {
            if ( !isXML ) {
                return elem[ jQuery.camelCase( "default-" + name ) ] ?
                    name.toLowerCase() :
                    null;
            }
        };
    }
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
    jQuery.attrHooks.value = {
        set: function( elem, value, name ) {
            if ( jQuery.nodeName( elem, "input" ) ) {

                // Does not return so that setAttribute is also used
                elem.defaultValue = value;
            } else {

                // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                return nodeHook && nodeHook.set( elem, value, name );
            }
        }
    };
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

    // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    nodeHook = {
        set: function( elem, value, name ) {

            // Set the existing or create a new attribute node
            var ret = elem.getAttributeNode( name );
            if ( !ret ) {
                elem.setAttributeNode(
                    ( ret = elem.ownerDocument.createAttribute( name ) )
                );
            }

            ret.value = value += "";

            // Break association with cloned elements by also using setAttribute (#9646)
            if ( name === "value" || value === elem.getAttribute( name ) ) {
                return value;
            }
        }
    };

    // Some attributes are constructed with empty-string values when not defined
    attrHandle.id = attrHandle.name = attrHandle.coords =
        function( elem, name, isXML ) {
            var ret;
            if ( !isXML ) {
                return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
                    ret.value :
                    null;
            }
        };

    // Fixing value retrieval on a button requires this module
    jQuery.valHooks.button = {
        get: function( elem, name ) {
            var ret = elem.getAttributeNode( name );
            if ( ret && ret.specified ) {
                return ret.value;
            }
        },
        set: nodeHook.set
    };

    // Set contenteditable to false on removals(#10429)
    // Setting to empty string throws an error as an invalid value
    jQuery.attrHooks.contenteditable = {
        set: function( elem, value, name ) {
            nodeHook.set( elem, value === "" ? false : value, name );
        }
    };

    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    jQuery.each( [ "width", "height" ], function( i, name ) {
        jQuery.attrHooks[ name ] = {
            set: function( elem, value ) {
                if ( value === "" ) {
                    elem.setAttribute( name, "auto" );
                    return value;
                }
            }
        };
    } );
}

if ( !support.style ) {
    jQuery.attrHooks.style = {
        get: function( elem ) {

            // Return undefined in the case of empty string
            // Note: IE uppercases css property names, but if we were to .toLowerCase()
            // .cssText, that would destroy case sensitivity in URL's, like in "background"
            return elem.style.cssText || undefined;
        },
        set: function( elem, value ) {
            return ( elem.style.cssText = value + "" );
        }
    };
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
    rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
    prop: function( name, value ) {
        return access( this, jQuery.prop, name, value, arguments.length > 1 );
    },

    removeProp: function( name ) {
        name = jQuery.propFix[ name ] || name;
        return this.each( function() {

            // try/catch handles cases where IE balks (such as removing a property on window)
            try {
                this[ name ] = undefined;
                delete this[ name ];
            } catch ( e ) {}
        } );
    }
} );

jQuery.extend( {
    prop: function( elem, name, value ) {
        var ret, hooks,
            nType = elem.nodeType;

        // Don't get/set properties on text, comment and attribute nodes
        if ( nType === 3 || nType === 8 || nType === 2 ) {
            return;
        }

        if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

            // Fix name and attach hooks
            name = jQuery.propFix[ name ] || name;
            hooks = jQuery.propHooks[ name ];
        }

        if ( value !== undefined ) {
            if ( hooks && "set" in hooks &&
                ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                return ret;
            }

            return ( elem[ name ] = value );
        }

        if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
            return ret;
        }

        return elem[ name ];
    },

    propHooks: {
        tabIndex: {
            get: function( elem ) {

                // elem.tabIndex doesn't always return the
                // correct value when it hasn't been explicitly set
                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                // Use proper attribute retrieval(#12072)
                var tabindex = jQuery.find.attr( elem, "tabindex" );

                return tabindex ?
                    parseInt( tabindex, 10 ) :
                    rfocusable.test( elem.nodeName ) ||
                        rclickable.test( elem.nodeName ) && elem.href ?
                            0 :
                            -1;
            }
        }
    },

    propFix: {
        "for": "htmlFor",
        "class": "className"
    }
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

    // href/src property should get the full normalized URL (#10299/#12915)
    jQuery.each( [ "href", "src" ], function( i, name ) {
        jQuery.propHooks[ name ] = {
            get: function( elem ) {
                return elem.getAttribute( name, 4 );
            }
        };
    } );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
    jQuery.propHooks.selected = {
        get: function( elem ) {
            var parent = elem.parentNode;

            if ( parent ) {
                parent.selectedIndex;

                // Make sure that it also works with optgroups, see #5701
                if ( parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
            }
            return null;
        },
        set: function( elem ) {
            var parent = elem.parentNode;
            if ( parent ) {
                parent.selectedIndex;

                if ( parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
            }
        }
    };
}

jQuery.each( [
    "tabIndex",
    "readOnly",
    "maxLength",
    "cellSpacing",
    "cellPadding",
    "rowSpan",
    "colSpan",
    "useMap",
    "frameBorder",
    "contentEditable"
], function() {
    jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
    jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
    return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
    addClass: function( value ) {
        var classes, elem, cur, curValue, clazz, j, finalValue,
            i = 0;

        if ( jQuery.isFunction( value ) ) {
            return this.each( function( j ) {
                jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
            } );
        }

        if ( typeof value === "string" && value ) {
            classes = value.match( rnotwhite ) || [];

            while ( ( elem = this[ i++ ] ) ) {
                curValue = getClass( elem );
                cur = elem.nodeType === 1 &&
                    ( " " + curValue + " " ).replace( rclass, " " );

                if ( cur ) {
                    j = 0;
                    while ( ( clazz = classes[ j++ ] ) ) {
                        if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                            cur += clazz + " ";
                        }
                    }

                    // only assign if different to avoid unneeded rendering.
                    finalValue = jQuery.trim( cur );
                    if ( curValue !== finalValue ) {
                        jQuery.attr( elem, "class", finalValue );
                    }
                }
            }
        }

        return this;
    },

    removeClass: function( value ) {
        var classes, elem, cur, curValue, clazz, j, finalValue,
            i = 0;

        if ( jQuery.isFunction( value ) ) {
            return this.each( function( j ) {
                jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
            } );
        }

        if ( !arguments.length ) {
            return this.attr( "class", "" );
        }

        if ( typeof value === "string" && value ) {
            classes = value.match( rnotwhite ) || [];

            while ( ( elem = this[ i++ ] ) ) {
                curValue = getClass( elem );

                // This expression is here for better compressibility (see addClass)
                cur = elem.nodeType === 1 &&
                    ( " " + curValue + " " ).replace( rclass, " " );

                if ( cur ) {
                    j = 0;
                    while ( ( clazz = classes[ j++ ] ) ) {

                        // Remove *all* instances
                        while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
                            cur = cur.replace( " " + clazz + " ", " " );
                        }
                    }

                    // Only assign if different to avoid unneeded rendering.
                    finalValue = jQuery.trim( cur );
                    if ( curValue !== finalValue ) {
                        jQuery.attr( elem, "class", finalValue );
                    }
                }
            }
        }

        return this;
    },

    toggleClass: function( value, stateVal ) {
        var type = typeof value;

        if ( typeof stateVal === "boolean" && type === "string" ) {
            return stateVal ? this.addClass( value ) : this.removeClass( value );
        }

        if ( jQuery.isFunction( value ) ) {
            return this.each( function( i ) {
                jQuery( this ).toggleClass(
                    value.call( this, i, getClass( this ), stateVal ),
                    stateVal
                );
            } );
        }

        return this.each( function() {
            var className, i, self, classNames;

            if ( type === "string" ) {

                // Toggle individual class names
                i = 0;
                self = jQuery( this );
                classNames = value.match( rnotwhite ) || [];

                while ( ( className = classNames[ i++ ] ) ) {

                    // Check each className given, space separated list
                    if ( self.hasClass( className ) ) {
                        self.removeClass( className );
                    } else {
                        self.addClass( className );
                    }
                }

            // Toggle whole class name
            } else if ( value === undefined || type === "boolean" ) {
                className = getClass( this );
                if ( className ) {

                    // store className if set
                    jQuery._data( this, "__className__", className );
                }

                // If the element has a class name or if we're passed "false",
                // then remove the whole classname (if there was one, the above saved it).
                // Otherwise bring back whatever was previously saved (if anything),
                // falling back to the empty string if nothing was stored.
                jQuery.attr( this, "class",
                    className || value === false ?
                    "" :
                    jQuery._data( this, "__className__" ) || ""
                );
            }
        } );
    },

    hasClass: function( selector ) {
        var className, elem,
            i = 0;

        className = " " + selector + " ";
        while ( ( elem = this[ i++ ] ) ) {
            if ( elem.nodeType === 1 &&
                ( " " + getClass( elem ) + " " ).replace( rclass, " " )
                    .indexOf( className ) > -1
            ) {
                return true;
            }
        }

        return false;
    }
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu" ).split( " " ),
    function( i, name ) {

    // Handle event binding
    jQuery.fn[ name ] = function( data, fn ) {
        return arguments.length > 0 ?
            this.on( name, null, data, fn ) :
            this.trigger( name );
    };
} );

jQuery.fn.extend( {
    hover: function( fnOver, fnOut ) {
        return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
    }
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

    // Attempt to parse using the native JSON parser first
    if ( window.JSON && window.JSON.parse ) {

        // Support: Android 2.3
        // Workaround failure to string-cast null input
        return window.JSON.parse( data + "" );
    }

    var requireNonComma,
        depth = null,
        str = jQuery.trim( data + "" );

    // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
    // after removing valid tokens
    return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

        // Force termination if we see a misplaced comma
        if ( requireNonComma && comma ) {
            depth = 0;
        }

        // Perform no more replacements after returning to outermost depth
        if ( depth === 0 ) {
            return token;
        }

        // Commas must not follow "[", "{", or ","
        requireNonComma = open || comma;

        // Determine new depth
        // array/object open ("[" or "{"): depth += true - false (increment)
        // array/object close ("]" or "}"): depth += false - true (decrement)
        // other cases ("," or primitive): depth += true - true (numeric cast)
        depth += !close - !open;

        // Remove this token
        return "";
    } ) ) ?
        ( Function( "return " + str ) )() :
        jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
    var xml, tmp;
    if ( !data || typeof data !== "string" ) {
        return null;
    }
    try {
        if ( window.DOMParser ) { // Standard
            tmp = new window.DOMParser();
            xml = tmp.parseFromString( data, "text/xml" );
        } else { // IE
            xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
            xml.async = "false";
            xml.loadXML( data );
        }
    } catch ( e ) {
        xml = undefined;
    }
    if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
        jQuery.error( "Invalid XML: " + data );
    }
    return xml;
};


var
    rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,

    // IE leaves an \r character at EOL
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
    prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
    transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = "*/".concat( "*" ),

    // Document location
    ajaxLocation = location.href,

    // Segment location into parts
    ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

    // dataTypeExpression is optional and defaults to "*"
    return function( dataTypeExpression, func ) {

        if ( typeof dataTypeExpression !== "string" ) {
            func = dataTypeExpression;
            dataTypeExpression = "*";
        }

        var dataType,
            i = 0,
            dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

        if ( jQuery.isFunction( func ) ) {

            // For each dataType in the dataTypeExpression
            while ( ( dataType = dataTypes[ i++ ] ) ) {

                // Prepend if requested
                if ( dataType.charAt( 0 ) === "+" ) {
                    dataType = dataType.slice( 1 ) || "*";
                    ( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

                // Otherwise append
                } else {
                    ( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
                }
            }
        }
    };
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

    var inspected = {},
        seekingTransport = ( structure === transports );

    function inspect( dataType ) {
        var selected;
        inspected[ dataType ] = true;
        jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
            var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
            if ( typeof dataTypeOrTransport === "string" &&
                !seekingTransport && !inspected[ dataTypeOrTransport ] ) {

                options.dataTypes.unshift( dataTypeOrTransport );
                inspect( dataTypeOrTransport );
                return false;
            } else if ( seekingTransport ) {
                return !( selected = dataTypeOrTransport );
            }
        } );
        return selected;
    }

    return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
    var deep, key,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for ( key in src ) {
        if ( src[ key ] !== undefined ) {
            ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
        }
    }
    if ( deep ) {
        jQuery.extend( true, target, deep );
    }

    return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
    var firstDataType, ct, finalDataType, type,
        contents = s.contents,
        dataTypes = s.dataTypes;

    // Remove auto dataType and get content-type in the process
    while ( dataTypes[ 0 ] === "*" ) {
        dataTypes.shift();
        if ( ct === undefined ) {
            ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
        }
    }

    // Check if we're dealing with a known content-type
    if ( ct ) {
        for ( type in contents ) {
            if ( contents[ type ] && contents[ type ].test( ct ) ) {
                dataTypes.unshift( type );
                break;
            }
        }
    }

    // Check to see if we have a response for the expected dataType
    if ( dataTypes[ 0 ] in responses ) {
        finalDataType = dataTypes[ 0 ];
    } else {

        // Try convertible dataTypes
        for ( type in responses ) {
            if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
                finalDataType = type;
                break;
            }
            if ( !firstDataType ) {
                firstDataType = type;
            }
        }

        // Or just use first one
        finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if ( finalDataType ) {
        if ( finalDataType !== dataTypes[ 0 ] ) {
            dataTypes.unshift( finalDataType );
        }
        return responses[ finalDataType ];
    }
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
    var conv2, current, conv, tmp, prev,
        converters = {},

        // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice();

    // Create converters map with lowercased keys
    if ( dataTypes[ 1 ] ) {
        for ( conv in s.converters ) {
            converters[ conv.toLowerCase() ] = s.converters[ conv ];
        }
    }

    current = dataTypes.shift();

    // Convert to each sequential dataType
    while ( current ) {

        if ( s.responseFields[ current ] ) {
            jqXHR[ s.responseFields[ current ] ] = response;
        }

        // Apply the dataFilter if provided
        if ( !prev && isSuccess && s.dataFilter ) {
            response = s.dataFilter( response, s.dataType );
        }

        prev = current;
        current = dataTypes.shift();

        if ( current ) {

            // There's only work to do if current dataType is non-auto
            if ( current === "*" ) {

                current = prev;

            // Convert response if prev dataType is non-auto and differs from current
            } else if ( prev !== "*" && prev !== current ) {

                // Seek a direct converter
                conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                // If none found, seek a pair
                if ( !conv ) {
                    for ( conv2 in converters ) {

                        // If conv2 outputs current
                        tmp = conv2.split( " " );
                        if ( tmp[ 1 ] === current ) {

                            // If prev can be converted to accepted input
                            conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                converters[ "* " + tmp[ 0 ] ];
                            if ( conv ) {

                                // Condense equivalence converters
                                if ( conv === true ) {
                                    conv = converters[ conv2 ];

                                // Otherwise, insert the intermediate dataType
                                } else if ( converters[ conv2 ] !== true ) {
                                    current = tmp[ 0 ];
                                    dataTypes.unshift( tmp[ 1 ] );
                                }
                                break;
                            }
                        }
                    }
                }

                // Apply converter (if not an equivalence)
                if ( conv !== true ) {

                    // Unless errors are allowed to bubble, catch and return them
                    if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
                        response = conv( response );
                    } else {
                        try {
                            response = conv( response );
                        } catch ( e ) {
                            return {
                                state: "parsererror",
                                error: conv ? e : "No conversion from " + prev + " to " + current
                            };
                        }
                    }
                }
            }
        }
    }

    return { state: "success", data: response };
}

jQuery.extend( {

    // Counter for holding the number of active queries
    active: 0,

    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},

    ajaxSettings: {
        url: ajaxLocation,
        type: "GET",
        isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
        global: true,
        processData: true,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */

        accepts: {
            "*": allTypes,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
        },

        contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
        },

        responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
        },

        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {

            // Convert anything to text
            "* text": String,

            // Text to html (true = no transformation)
            "text html": true,

            // Evaluate text as a json expression
            "text json": jQuery.parseJSON,

            // Parse text as xml
            "text xml": jQuery.parseXML
        },

        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
            url: true,
            context: true
        }
    },

    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function( target, settings ) {
        return settings ?

            // Building a settings object
            ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

            // Extending ajaxSettings
            ajaxExtend( jQuery.ajaxSettings, target );
    },

    ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
    ajaxTransport: addToPrefiltersOrTransports( transports ),

    // Main method
    ajax: function( url, options ) {

        // If url is an object, simulate pre-1.5 signature
        if ( typeof url === "object" ) {
            options = url;
            url = undefined;
        }

        // Force options to be an object
        options = options || {};

        var

            // Cross-domain detection vars
            parts,

            // Loop variable
            i,

            // URL without anti-cache param
            cacheURL,

            // Response headers as string
            responseHeadersString,

            // timeout handle
            timeoutTimer,

            // To know if global events are to be dispatched
            fireGlobals,

            transport,

            // Response headers
            responseHeaders,

            // Create the final options object
            s = jQuery.ajaxSetup( {}, options ),

            // Callbacks context
            callbackContext = s.context || s,

            // Context for global events is callbackContext if it is a DOM node or jQuery collection
            globalEventContext = s.context &&
                ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery( callbackContext ) :
                    jQuery.event,

            // Deferreds
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks( "once memory" ),

            // Status-dependent callbacks
            statusCode = s.statusCode || {},

            // Headers (they are sent all at once)
            requestHeaders = {},
            requestHeadersNames = {},

            // The jqXHR state
            state = 0,

            // Default abort message
            strAbort = "canceled",

            // Fake xhr
            jqXHR = {
                readyState: 0,

                // Builds headers hashtable if needed
                getResponseHeader: function( key ) {
                    var match;
                    if ( state === 2 ) {
                        if ( !responseHeaders ) {
                            responseHeaders = {};
                            while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
                                responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
                            }
                        }
                        match = responseHeaders[ key.toLowerCase() ];
                    }
                    return match == null ? null : match;
                },

                // Raw string
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null;
                },

                // Caches the header
                setRequestHeader: function( name, value ) {
                    var lname = name.toLowerCase();
                    if ( !state ) {
                        name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                        requestHeaders[ name ] = value;
                    }
                    return this;
                },

                // Overrides response content-type header
                overrideMimeType: function( type ) {
                    if ( !state ) {
                        s.mimeType = type;
                    }
                    return this;
                },

                // Status-dependent callbacks
                statusCode: function( map ) {
                    var code;
                    if ( map ) {
                        if ( state < 2 ) {
                            for ( code in map ) {

                                // Lazy-add the new callback in a way that preserves old ones
                                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                            }
                        } else {

                            // Execute the appropriate callbacks
                            jqXHR.always( map[ jqXHR.status ] );
                        }
                    }
                    return this;
                },

                // Cancel the request
                abort: function( statusText ) {
                    var finalText = statusText || strAbort;
                    if ( transport ) {
                        transport.abort( finalText );
                    }
                    done( 0, finalText );
                    return this;
                }
            };

        // Attach deferreds
        deferred.promise( jqXHR ).complete = completeDeferred.add;
        jqXHR.success = jqXHR.done;
        jqXHR.error = jqXHR.fail;

        // Remove hash character (#7531: and string promotion)
        // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
        // Handle falsy url in the settings object (#10093: consistency with old signature)
        // We also use the url parameter if available
        s.url = ( ( url || s.url || ajaxLocation ) + "" )
            .replace( rhash, "" )
            .replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

        // Alias method option to type as per ticket #12004
        s.type = options.method || options.type || s.method || s.type;

        // Extract dataTypes list
        s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

        // A cross-domain request is in order when we have a protocol:host:port mismatch
        if ( s.crossDomain == null ) {
            parts = rurl.exec( s.url.toLowerCase() );
            s.crossDomain = !!( parts &&
                ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
                    ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
                        ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
            );
        }

        // Convert data if not already a string
        if ( s.data && s.processData && typeof s.data !== "string" ) {
            s.data = jQuery.param( s.data, s.traditional );
        }

        // Apply prefilters
        inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

        // If request was aborted inside a prefilter, stop there
        if ( state === 2 ) {
            return jqXHR;
        }

        // We can fire global events as of now if asked to
        // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
        fireGlobals = jQuery.event && s.global;

        // Watch for a new set of requests
        if ( fireGlobals && jQuery.active++ === 0 ) {
            jQuery.event.trigger( "ajaxStart" );
        }

        // Uppercase the type
        s.type = s.type.toUpperCase();

        // Determine if request has content
        s.hasContent = !rnoContent.test( s.type );

        // Save the URL in case we're toying with the If-Modified-Since
        // and/or If-None-Match header later on
        cacheURL = s.url;

        // More options handling for requests with no content
        if ( !s.hasContent ) {

            // If data is available, append data to url
            if ( s.data ) {
                cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

                // #9682: remove data so that it's not used in an eventual retry
                delete s.data;
            }

            // Add anti-cache in url if needed
            if ( s.cache === false ) {
                s.url = rts.test( cacheURL ) ?

                    // If there is already a '_' parameter, set its value
                    cacheURL.replace( rts, "$1_=" + nonce++ ) :

                    // Otherwise add one to the end
                    cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
            }
        }

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ) {
            if ( jQuery.lastModified[ cacheURL ] ) {
                jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
            }
            if ( jQuery.etag[ cacheURL ] ) {
                jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
            }
        }

        // Set the correct header, if data is being sent
        if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
            jqXHR.setRequestHeader( "Content-Type", s.contentType );
        }

        // Set the Accepts header for the server, depending on the dataType
        jqXHR.setRequestHeader(
            "Accept",
            s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
                s.accepts[ s.dataTypes[ 0 ] ] +
                    ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                s.accepts[ "*" ]
        );

        // Check for headers option
        for ( i in s.headers ) {
            jqXHR.setRequestHeader( i, s.headers[ i ] );
        }

        // Allow custom headers/mimetypes and early abort
        if ( s.beforeSend &&
            ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

            // Abort if not done already and return
            return jqXHR.abort();
        }

        // aborting is no longer a cancellation
        strAbort = "abort";

        // Install callbacks on deferreds
        for ( i in { success: 1, error: 1, complete: 1 } ) {
            jqXHR[ i ]( s[ i ] );
        }

        // Get transport
        transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

        // If no transport, we auto-abort
        if ( !transport ) {
            done( -1, "No Transport" );
        } else {
            jqXHR.readyState = 1;

            // Send global event
            if ( fireGlobals ) {
                globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
            }

            // If request was aborted inside ajaxSend, stop there
            if ( state === 2 ) {
                return jqXHR;
            }

            // Timeout
            if ( s.async && s.timeout > 0 ) {
                timeoutTimer = window.setTimeout( function() {
                    jqXHR.abort( "timeout" );
                }, s.timeout );
            }

            try {
                state = 1;
                transport.send( requestHeaders, done );
            } catch ( e ) {

                // Propagate exception as error if not done
                if ( state < 2 ) {
                    done( -1, e );

                // Simply rethrow otherwise
                } else {
                    throw e;
                }
            }
        }

        // Callback for when everything is done
        function done( status, nativeStatusText, responses, headers ) {
            var isSuccess, success, error, response, modified,
                statusText = nativeStatusText;

            // Called once
            if ( state === 2 ) {
                return;
            }

            // State is "done" now
            state = 2;

            // Clear timeout if it exists
            if ( timeoutTimer ) {
                window.clearTimeout( timeoutTimer );
            }

            // Dereference transport for early garbage collection
            // (no matter how long the jqXHR object will be used)
            transport = undefined;

            // Cache response headers
            responseHeadersString = headers || "";

            // Set readyState
            jqXHR.readyState = status > 0 ? 4 : 0;

            // Determine if successful
            isSuccess = status >= 200 && status < 300 || status === 304;

            // Get response data
            if ( responses ) {
                response = ajaxHandleResponses( s, jqXHR, responses );
            }

            // Convert no matter what (that way responseXXX fields are always set)
            response = ajaxConvert( s, response, jqXHR, isSuccess );

            // If successful, handle type chaining
            if ( isSuccess ) {

                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if ( s.ifModified ) {
                    modified = jqXHR.getResponseHeader( "Last-Modified" );
                    if ( modified ) {
                        jQuery.lastModified[ cacheURL ] = modified;
                    }
                    modified = jqXHR.getResponseHeader( "etag" );
                    if ( modified ) {
                        jQuery.etag[ cacheURL ] = modified;
                    }
                }

                // if no content
                if ( status === 204 || s.type === "HEAD" ) {
                    statusText = "nocontent";

                // if not modified
                } else if ( status === 304 ) {
                    statusText = "notmodified";

                // If we have data, let's convert it
                } else {
                    statusText = response.state;
                    success = response.data;
                    error = response.error;
                    isSuccess = !error;
                }
            } else {

                // We extract error from statusText
                // then normalize statusText and status for non-aborts
                error = statusText;
                if ( status || !statusText ) {
                    statusText = "error";
                    if ( status < 0 ) {
                        status = 0;
                    }
                }
            }

            // Set data for the fake xhr object
            jqXHR.status = status;
            jqXHR.statusText = ( nativeStatusText || statusText ) + "";

            // Success/Error
            if ( isSuccess ) {
                deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
            } else {
                deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
            }

            // Status-dependent callbacks
            jqXHR.statusCode( statusCode );
            statusCode = undefined;

            if ( fireGlobals ) {
                globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                    [ jqXHR, s, isSuccess ? success : error ] );
            }

            // Complete
            completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

            if ( fireGlobals ) {
                globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

                // Handle the global AJAX counter
                if ( !( --jQuery.active ) ) {
                    jQuery.event.trigger( "ajaxStop" );
                }
            }
        }

        return jqXHR;
    },

    getJSON: function( url, data, callback ) {
        return jQuery.get( url, data, callback, "json" );
    },

    getScript: function( url, callback ) {
        return jQuery.get( url, undefined, callback, "script" );
    }
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {

        // shift arguments if data argument was omitted
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        // The url can be an options object (which then must have .url)
        return jQuery.ajax( jQuery.extend( {
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        }, jQuery.isPlainObject( url ) && url ) );
    };
} );


jQuery._evalUrl = function( url ) {
    return jQuery.ajax( {
        url: url,

        // Make this explicit, since user can override this through ajaxSetup (#11264)
        type: "GET",
        dataType: "script",
        cache: true,
        async: false,
        global: false,
        "throws": true
    } );
};


jQuery.fn.extend( {
    wrapAll: function( html ) {
        if ( jQuery.isFunction( html ) ) {
            return this.each( function( i ) {
                jQuery( this ).wrapAll( html.call( this, i ) );
            } );
        }

        if ( this[ 0 ] ) {

            // The elements to wrap the target around
            var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

            if ( this[ 0 ].parentNode ) {
                wrap.insertBefore( this[ 0 ] );
            }

            wrap.map( function() {
                var elem = this;

                while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
                    elem = elem.firstChild;
                }

                return elem;
            } ).append( this );
        }

        return this;
    },

    wrapInner: function( html ) {
        if ( jQuery.isFunction( html ) ) {
            return this.each( function( i ) {
                jQuery( this ).wrapInner( html.call( this, i ) );
            } );
        }

        return this.each( function() {
            var self = jQuery( this ),
                contents = self.contents();

            if ( contents.length ) {
                contents.wrapAll( html );

            } else {
                self.append( html );
            }
        } );
    },

    wrap: function( html ) {
        var isFunction = jQuery.isFunction( html );

        return this.each( function( i ) {
            jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
        } );
    },

    unwrap: function() {
        return this.parent().each( function() {
            if ( !jQuery.nodeName( this, "body" ) ) {
                jQuery( this ).replaceWith( this.childNodes );
            }
        } ).end();
    }
} );


function getDisplay( elem ) {
    return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
    while ( elem && elem.nodeType === 1 ) {
        if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
            return true;
        }
        elem = elem.parentNode;
    }
    return false;
}

jQuery.expr.filters.hidden = function( elem ) {

    // Support: Opera <= 12.12
    // Opera reports offsetWidths and offsetHeights less than zero on some elements
    return support.reliableHiddenOffsets() ?
        ( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
            !elem.getClientRects().length ) :
            filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
    return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
    var name;

    if ( jQuery.isArray( obj ) ) {

        // Serialize array item.
        jQuery.each( obj, function( i, v ) {
            if ( traditional || rbracket.test( prefix ) ) {

                // Treat each array item as a scalar.
                add( prefix, v );

            } else {

                // Item is non-scalar (array or object), encode its numeric index.
                buildParams(
                    prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                    v,
                    traditional,
                    add
                );
            }
        } );

    } else if ( !traditional && jQuery.type( obj ) === "object" ) {

        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
        }

    } else {

        // Serialize scalar item.
        add( prefix, obj );
    }
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
    var prefix,
        s = [],
        add = function( key, value ) {

            // If value is a function, invoke it and return its value
            value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
        };

    // Set traditional to true for jQuery <= 1.3.2 behavior.
    if ( traditional === undefined ) {
        traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }

    // If an array was passed in, assume that it is an array of form elements.
    if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

        // Serialize the form elements
        jQuery.each( a, function() {
            add( this.name, this.value );
        } );

    } else {

        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( prefix in a ) {
            buildParams( prefix, a[ prefix ], traditional, add );
        }
    }

    // Return the resulting serialization
    return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
    serialize: function() {
        return jQuery.param( this.serializeArray() );
    },
    serializeArray: function() {
        return this.map( function() {

            // Can add propHook for "elements" to filter or add form elements
            var elements = jQuery.prop( this, "elements" );
            return elements ? jQuery.makeArray( elements ) : this;
        } )
        .filter( function() {
            var type = this.type;

            // Use .is(":disabled") so that fieldset[disabled] works
            return this.name && !jQuery( this ).is( ":disabled" ) &&
                rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                ( this.checked || !rcheckableType.test( type ) );
        } )
        .map( function( i, elem ) {
            var val = jQuery( this ).val();

            return val == null ?
                null :
                jQuery.isArray( val ) ?
                    jQuery.map( val, function( val ) {
                        return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                    } ) :
                    { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
        } ).get();
    }
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

    // Support: IE6-IE8
    function() {

        // XHR cannot access local files, always use ActiveX for that case
        if ( this.isLocal ) {
            return createActiveXHR();
        }

        // Support: IE 9-11
        // IE seems to error on cross-domain PATCH requests when ActiveX XHR
        // is used. In IE 9+ always use the native XHR.
        // Note: this condition won't catch Edge as it doesn't define
        // document.documentMode but it also doesn't support ActiveX so it won't
        // reach this code.
        if ( document.documentMode > 8 ) {
            return createStandardXHR();
        }

        // Support: IE<9
        // oldIE XHR does not support non-RFC2616 methods (#13240)
        // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
        // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
        // Although this check for six methods instead of eight
        // since IE also does not support "trace" and "connect"
        return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
            createStandardXHR() || createActiveXHR();
    } :

    // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;

var xhrId = 0,
    xhrCallbacks = {},
    xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
    window.attachEvent( "onunload", function() {
        for ( var key in xhrCallbacks ) {
            xhrCallbacks[ key ]( undefined, true );
        }
    } );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

    jQuery.ajaxTransport( function( options ) {

        // Cross domain only allowed if supported through XMLHttpRequest
        if ( !options.crossDomain || support.cors ) {

            var callback;

            return {
                send: function( headers, complete ) {
                    var i,
                        xhr = options.xhr(),
                        id = ++xhrId;

                    // Open the socket
                    xhr.open(
                        options.type,
                        options.url,
                        options.async,
                        options.username,
                        options.password
                    );

                    // Apply custom fields if provided
                    if ( options.xhrFields ) {
                        for ( i in options.xhrFields ) {
                            xhr[ i ] = options.xhrFields[ i ];
                        }
                    }

                    // Override mime type if needed
                    if ( options.mimeType && xhr.overrideMimeType ) {
                        xhr.overrideMimeType( options.mimeType );
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
                        headers[ "X-Requested-With" ] = "XMLHttpRequest";
                    }

                    // Set headers
                    for ( i in headers ) {

                        // Support: IE<9
                        // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                        // request header to a null-value.
                        //
                        // To keep consistent with other XHR implementations, cast the value
                        // to string and ignore `undefined`.
                        if ( headers[ i ] !== undefined ) {
                            xhr.setRequestHeader( i, headers[ i ] + "" );
                        }
                    }

                    // Do send the request
                    // This may raise an exception which is actually
                    // handled in jQuery.ajax (so no try/catch here)
                    xhr.send( ( options.hasContent && options.data ) || null );

                    // Listener
                    callback = function( _, isAbort ) {
                        var status, statusText, responses;

                        // Was never called and is aborted or complete
                        if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

                            // Clean up
                            delete xhrCallbacks[ id ];
                            callback = undefined;
                            xhr.onreadystatechange = jQuery.noop;

                            // Abort manually if needed
                            if ( isAbort ) {
                                if ( xhr.readyState !== 4 ) {
                                    xhr.abort();
                                }
                            } else {
                                responses = {};
                                status = xhr.status;

                                // Support: IE<10
                                // Accessing binary-data responseText throws an exception
                                // (#11426)
                                if ( typeof xhr.responseText === "string" ) {
                                    responses.text = xhr.responseText;
                                }

                                // Firefox throws an exception when accessing
                                // statusText for faulty cross-domain requests
                                try {
                                    statusText = xhr.statusText;
                                } catch ( e ) {

                                    // We normalize with Webkit giving an empty statusText
                                    statusText = "";
                                }

                                // Filter status for non standard behaviors

                                // If the request is local and we have data: assume a success
                                // (success with no data won't get notified, that's the best we
                                // can do given current implementations)
                                if ( !status && options.isLocal && !options.crossDomain ) {
                                    status = responses.text ? 200 : 404;

                                // IE - #1450: sometimes returns 1223 when it should be 204
                                } else if ( status === 1223 ) {
                                    status = 204;
                                }
                            }
                        }

                        // Call complete if needed
                        if ( responses ) {
                            complete( status, statusText, responses, xhr.getAllResponseHeaders() );
                        }
                    };

                    // Do send the request
                    // `xhr.send` may raise an exception, but it will be
                    // handled in jQuery.ajax (so no try/catch here)
                    if ( !options.async ) {

                        // If we're in sync mode we fire the callback
                        callback();
                    } else if ( xhr.readyState === 4 ) {

                        // (IE6 & IE7) if it's in cache and has been
                        // retrieved directly we need to fire the callback
                        window.setTimeout( callback );
                    } else {

                        // Register the callback, but delay it in case `xhr.send` throws
                        // Add to the list of active xhr callbacks
                        xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
                    }
                },

                abort: function() {
                    if ( callback ) {
                        callback( undefined, true );
                    }
                }
            };
        }
    } );
}

// Functions to create xhrs
function createStandardXHR() {
    try {
        return new window.XMLHttpRequest();
    } catch ( e ) {}
}

function createActiveXHR() {
    try {
        return new window.ActiveXObject( "Microsoft.XMLHTTP" );
    } catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
    accepts: {
        script: "text/javascript, application/javascript, " +
            "application/ecmascript, application/x-ecmascript"
    },
    contents: {
        script: /\b(?:java|ecma)script\b/
    },
    converters: {
        "text script": function( text ) {
            jQuery.globalEval( text );
            return text;
        }
    }
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
    if ( s.cache === undefined ) {
        s.cache = false;
    }
    if ( s.crossDomain ) {
        s.type = "GET";
        s.global = false;
    }
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

    // This transport only deals with cross domain requests
    if ( s.crossDomain ) {

        var script,
            head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

        return {

            send: function( _, callback ) {

                script = document.createElement( "script" );

                script.async = true;

                if ( s.scriptCharset ) {
                    script.charset = s.scriptCharset;
                }

                script.src = s.url;

                // Attach handlers for all browsers
                script.onload = script.onreadystatechange = function( _, isAbort ) {

                    if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                        // Handle memory leak in IE
                        script.onload = script.onreadystatechange = null;

                        // Remove the script
                        if ( script.parentNode ) {
                            script.parentNode.removeChild( script );
                        }

                        // Dereference the script
                        script = null;

                        // Callback if not abort
                        if ( !isAbort ) {
                            callback( 200, "success" );
                        }
                    }
                };

                // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                // Use native DOM manipulation to avoid our domManip AJAX trickery
                head.insertBefore( script, head.firstChild );
            },

            abort: function() {
                if ( script ) {
                    script.onload( undefined, true );
                }
            }
        };
    }
} );




var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
    jsonp: "callback",
    jsonpCallback: function() {
        var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
        this[ callback ] = true;
        return callback;
    }
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

    var callbackName, overwritten, responseContainer,
        jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
            "url" :
            typeof s.data === "string" &&
                ( s.contentType || "" )
                    .indexOf( "application/x-www-form-urlencoded" ) === 0 &&
                rjsonp.test( s.data ) && "data"
        );

    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

        // Get callback name, remembering preexisting value associated with it
        callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
            s.jsonpCallback() :
            s.jsonpCallback;

        // Insert callback into url or form data
        if ( jsonProp ) {
            s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
        } else if ( s.jsonp !== false ) {
            s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
        }

        // Use data converter to retrieve json after script execution
        s.converters[ "script json" ] = function() {
            if ( !responseContainer ) {
                jQuery.error( callbackName + " was not called" );
            }
            return responseContainer[ 0 ];
        };

        // force json dataType
        s.dataTypes[ 0 ] = "json";

        // Install callback
        overwritten = window[ callbackName ];
        window[ callbackName ] = function() {
            responseContainer = arguments;
        };

        // Clean-up function (fires after converters)
        jqXHR.always( function() {

            // If previous value didn't exist - remove it
            if ( overwritten === undefined ) {
                jQuery( window ).removeProp( callbackName );

            // Otherwise restore preexisting value
            } else {
                window[ callbackName ] = overwritten;
            }

            // Save back as free
            if ( s[ callbackName ] ) {

                // make sure that re-using the options doesn't screw things around
                s.jsonpCallback = originalSettings.jsonpCallback;

                // save the callback name for future use
                oldCallbacks.push( callbackName );
            }

            // Call if it was a function and we have a response
            if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                overwritten( responseContainer[ 0 ] );
            }

            responseContainer = overwritten = undefined;
        } );

        // Delegate to script
        return "script";
    }
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
    if ( !data || typeof data !== "string" ) {
        return null;
    }
    if ( typeof context === "boolean" ) {
        keepScripts = context;
        context = false;
    }
    context = context || document;

    var parsed = rsingleTag.exec( data ),
        scripts = !keepScripts && [];

    // Single tag
    if ( parsed ) {
        return [ context.createElement( parsed[ 1 ] ) ];
    }

    parsed = buildFragment( [ data ], context, scripts );

    if ( scripts && scripts.length ) {
        jQuery( scripts ).remove();
    }

    return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
    if ( typeof url !== "string" && _load ) {
        return _load.apply( this, arguments );
    }

    var selector, type, response,
        self = this,
        off = url.indexOf( " " );

    if ( off > -1 ) {
        selector = jQuery.trim( url.slice( off, url.length ) );
        url = url.slice( 0, off );
    }

    // If it's a function
    if ( jQuery.isFunction( params ) ) {

        // We assume that it's the callback
        callback = params;
        params = undefined;

    // Otherwise, build a param string
    } else if ( params && typeof params === "object" ) {
        type = "POST";
    }

    // If we have elements to modify, make the request
    if ( self.length > 0 ) {
        jQuery.ajax( {
            url: url,

            // If "type" variable is undefined, then "GET" method will be used.
            // Make value of this field explicit since
            // user can override it through ajaxSetup method
            type: type || "GET",
            dataType: "html",
            data: params
        } ).done( function( responseText ) {

            // Save response for use in complete callback
            response = arguments;

            self.html( selector ?

                // If a selector was specified, locate the right elements in a dummy div
                // Exclude scripts to avoid IE 'Permission Denied' errors
                jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

                // Otherwise use the full result
                responseText );

        // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
        } ).always( callback && function( jqXHR, status ) {
            self.each( function() {
                callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
            } );
        } );
    }

    return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
    "ajaxStart",
    "ajaxStop",
    "ajaxComplete",
    "ajaxError",
    "ajaxSuccess",
    "ajaxSend"
], function( i, type ) {
    jQuery.fn[ type ] = function( fn ) {
        return this.on( type, fn );
    };
} );




jQuery.expr.filters.animated = function( elem ) {
    return jQuery.grep( jQuery.timers, function( fn ) {
        return elem === fn.elem;
    } ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
    return jQuery.isWindow( elem ) ?
        elem :
        elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
}

jQuery.offset = {
    setOffset: function( elem, options, i ) {
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
            position = jQuery.css( elem, "position" ),
            curElem = jQuery( elem ),
            props = {};

        // set position first, in-case top/left are set even on static elem
        if ( position === "static" ) {
            elem.style.position = "relative";
        }

        curOffset = curElem.offset();
        curCSSTop = jQuery.css( elem, "top" );
        curCSSLeft = jQuery.css( elem, "left" );
        calculatePosition = ( position === "absolute" || position === "fixed" ) &&
            jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

        // need to be able to calculate position if either top or left
        // is auto and position is either absolute or fixed
        if ( calculatePosition ) {
            curPosition = curElem.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
        } else {
            curTop = parseFloat( curCSSTop ) || 0;
            curLeft = parseFloat( curCSSLeft ) || 0;
        }

        if ( jQuery.isFunction( options ) ) {

            // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
            options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
        }

        if ( options.top != null ) {
            props.top = ( options.top - curOffset.top ) + curTop;
        }
        if ( options.left != null ) {
            props.left = ( options.left - curOffset.left ) + curLeft;
        }

        if ( "using" in options ) {
            options.using.call( elem, props );
        } else {
            curElem.css( props );
        }
    }
};

jQuery.fn.extend( {
    offset: function( options ) {
        if ( arguments.length ) {
            return options === undefined ?
                this :
                this.each( function( i ) {
                    jQuery.offset.setOffset( this, options, i );
                } );
        }

        var docElem, win,
            box = { top: 0, left: 0 },
            elem = this[ 0 ],
            doc = elem && elem.ownerDocument;

        if ( !doc ) {
            return;
        }

        docElem = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        if ( !jQuery.contains( docElem, elem ) ) {
            return box;
        }

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if ( typeof elem.getBoundingClientRect !== "undefined" ) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow( doc );
        return {
            top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
            left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
        };
    },

    position: function() {
        if ( !this[ 0 ] ) {
            return;
        }

        var offsetParent, offset,
            parentOffset = { top: 0, left: 0 },
            elem = this[ 0 ];

        // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
        // because it is its only offset parent
        if ( jQuery.css( elem, "position" ) === "fixed" ) {

            // we assume that getBoundingClientRect is available when computed position is fixed
            offset = elem.getBoundingClientRect();
        } else {

            // Get *real* offsetParent
            offsetParent = this.offsetParent();

            // Get correct offsets
            offset = this.offset();
            if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
                parentOffset = offsetParent.offset();
            }

            // Add offsetParent borders
            parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
            parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
        }

        // Subtract parent offsets and element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        return {
            top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
            left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
        };
    },

    offsetParent: function() {
        return this.map( function() {
            var offsetParent = this.offsetParent;

            while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
                jQuery.css( offsetParent, "position" ) === "static" ) ) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || documentElement;
        } );
    }
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
    var top = /Y/.test( prop );

    jQuery.fn[ method ] = function( val ) {
        return access( this, function( elem, method, val ) {
            var win = getWindow( elem );

            if ( val === undefined ) {
                return win ? ( prop in win ) ? win[ prop ] :
                    win.document.documentElement[ method ] :
                    elem[ method ];
            }

            if ( win ) {
                win.scrollTo(
                    !top ? val : jQuery( win ).scrollLeft(),
                    top ? val : jQuery( win ).scrollTop()
                );

            } else {
                elem[ method ] = val;
            }
        }, method, val, arguments.length, null );
    };
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
    jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
        function( elem, computed ) {
            if ( computed ) {
                computed = curCSS( elem, prop );

                // if curCSS returns percentage, fallback to offset
                return rnumnonpx.test( computed ) ?
                    jQuery( elem ).position()[ prop ] + "px" :
                    computed;
            }
        }
    );
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
    jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
    function( defaultExtra, funcName ) {

        // margin is only for outerHeight, outerWidth
        jQuery.fn[ funcName ] = function( margin, value ) {
            var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

            return access( this, function( elem, type, value ) {
                var doc;

                if ( jQuery.isWindow( elem ) ) {

                    // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                    // isn't a whole lot we can do. See pull request at this URL for discussion:
                    // https://github.com/jquery/jquery/pull/764
                    return elem.document.documentElement[ "client" + name ];
                }

                // Get document width or height
                if ( elem.nodeType === 9 ) {
                    doc = elem.documentElement;

                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                    // whichever is greatest
                    // unfortunately, this causes bug #3838 in IE6/8 only,
                    // but there is currently no good, small way to fix it.
                    return Math.max(
                        elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                        elem.body[ "offset" + name ], doc[ "offset" + name ],
                        doc[ "client" + name ]
                    );
                }

                return value === undefined ?

                    // Get width or height on the element, requesting but not forcing parseFloat
                    jQuery.css( elem, type, extra ) :

                    // Set width or height on the element
                    jQuery.style( elem, type, value, extra );
            }, type, chainable ? margin : undefined, chainable, null );
        };
    } );
} );


jQuery.fn.extend( {

    bind: function( types, data, fn ) {
        return this.on( types, null, data, fn );
    },
    unbind: function( types, fn ) {
        return this.off( types, null, fn );
    },

    delegate: function( selector, types, data, fn ) {
        return this.on( types, selector, data, fn );
    },
    undelegate: function( selector, types, fn ) {

        // ( namespace ) or ( selector, types [, fn] )
        return arguments.length === 1 ?
            this.off( selector, "**" ) :
            this.off( types, selector || "**", fn );
    }
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
    return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
    define( "jquery", [], function() {
        return jQuery;
    } );
}



var

    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    _$ = window.$;

jQuery.noConflict = function( deep ) {
    if ( window.$ === jQuery ) {
        window.$ = _$;
    }

    if ( deep && window.jQuery === jQuery ) {
        window.jQuery = _jQuery;
    }

    return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
    window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

/*!
 Make sure Zeta Producer uses an own Alias for jQuery, which still points to  
 the correct version after a user loads in an additional jQuery version 
*/
var $z = jQuery;

/*!
 * jQuery Browser Plugin 0.1.0
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2015 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 05-07-2015
 */
/*global window: false */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], function ($) {
      return factory($);
    });
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    // Node-like environment
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function(jQuery) {
  "use strict";

  function uaMatch( ua ) {
    // If an UA is not provided, default to the current browser UA.
    if ( ua === undefined ) {
      ua = window.navigator.userAgent;
    }
    ua = ua.toLowerCase();

    var match = /(edge)\/([\w.]+)/.exec( ua ) ||
        /(opr)[\/]([\w.]+)/.exec( ua ) ||
        /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(iemobile)[\/]([\w.]+)/.exec( ua ) ||
        /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    var platform_match = /(ipad)/.exec( ua ) ||
        /(ipod)/.exec( ua ) ||
        /(windows phone)/.exec( ua ) ||
        /(iphone)/.exec( ua ) ||
        /(kindle)/.exec( ua ) ||
        /(silk)/.exec( ua ) ||
        /(android)/.exec( ua ) ||
        /(win)/.exec( ua ) ||
        /(mac)/.exec( ua ) ||
        /(linux)/.exec( ua ) ||
        /(cros)/.exec( ua ) ||
        /(playbook)/.exec( ua ) ||
        /(bb)/.exec( ua ) ||
        /(blackberry)/.exec( ua ) ||
        [];

    var browser = {},
        matched = {
          browser: match[ 5 ] || match[ 3 ] || match[ 1 ] || "",
          version: match[ 2 ] || match[ 4 ] || "0",
          versionNumber: match[ 4 ] || match[ 2 ] || "0",
          platform: platform_match[ 0 ] || ""
        };

    if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
      browser.versionNumber = parseInt(matched.versionNumber, 10);
    }

    if ( matched.platform ) {
      browser[ matched.platform ] = true;
    }

    // These are all considered mobile platforms, meaning they run a mobile browser
    if ( browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
      browser.ipod || browser.kindle || browser.playbook || browser.silk || browser[ "windows phone" ]) {
      browser.mobile = true;
    }

    // These are all considered desktop platforms, meaning they run a desktop browser
    if ( browser.cros || browser.mac || browser.linux || browser.win ) {
      browser.desktop = true;
    }

    // Chrome, Opera 15+ and Safari are webkit based browsers
    if ( browser.chrome || browser.opr || browser.safari ) {
      browser.webkit = true;
    }

    // IE11 has a new token so we will assign it msie to avoid breaking changes
    if ( browser.rv || browser.iemobile) {
      var ie = "msie";

      matched.browser = ie;
      browser[ie] = true;
    }

    // Edge is officially known as Microsoft Edge, so rewrite the key to match
    if ( browser.edge ) {
      delete browser.edge;
      var msedge = "msedge";

      matched.browser = msedge;
      browser[msedge] = true;
    }

    // Blackberry browsers are marked as Safari on BlackBerry
    if ( browser.safari && browser.blackberry ) {
      var blackberry = "blackberry";

      matched.browser = blackberry;
      browser[blackberry] = true;
    }

    // Playbook browsers are marked as Safari on Playbook
    if ( browser.safari && browser.playbook ) {
      var playbook = "playbook";

      matched.browser = playbook;
      browser[playbook] = true;
    }

    // BB10 is a newer OS version of BlackBerry
    if ( browser.bb ) {
      var bb = "blackberry";

      matched.browser = bb;
      browser[bb] = true;
    }

    // Opera 15+ are identified as opr
    if ( browser.opr ) {
      var opera = "opera";

      matched.browser = opera;
      browser[opera] = true;
    }

    // Stock Android browsers are marked as Safari on Android.
    if ( browser.safari && browser.android ) {
      var android = "android";

      matched.browser = android;
      browser[android] = true;
    }

    // Kindle browsers are marked as Safari on Kindle
    if ( browser.safari && browser.kindle ) {
      var kindle = "kindle";

      matched.browser = kindle;
      browser[kindle] = true;
    }

     // Kindle Silk browsers are marked as Safari on Kindle
    if ( browser.safari && browser.silk ) {
      var silk = "silk";

      matched.browser = silk;
      browser[silk] = true;
    }

    // Assign the name and platform variable
    browser.name = matched.browser;
    browser.platform = matched.platform;
    return browser;
  }

  // Run the matching process, also assign the function to the returned object
  // for manual, jQuery-free use if desired
  window.jQBrowser = uaMatch( window.navigator.userAgent );
  window.jQBrowser.uaMatch = uaMatch;

  // Only assign to jQuery.browser if jQuery is loaded
  if ( $z ) {
    $z.browser = window.jQBrowser;
  }

  return window.jQBrowser;
}));
/*!
 * jQuery Migrate - v1.4.1 - 2016-05-19
 * Copyright jQuery Foundation and other contributors
 */
(function( jQuery, window, undefined ) {
// See http://bugs.jquery.com/ticket/13335
// "use strict";


jQuery.migrateVersion = "1.4.1";


var warnedAbout = {"jQuery.browser is deprecated":true};

// List of warnings already given; public read only
jQuery.migrateWarnings = [];

// Set to true to prevent console output; migrateWarnings still maintained
// jQuery.migrateMute = false;

// Show a message on the console so devs know we're active
if ( window.console && window.console.log ) {
    window.console.log( "JQMIGRATE: Migrate is installed" +
        ( jQuery.migrateMute ? "" : " with logging active" ) +
        ", version " + jQuery.migrateVersion );
}

// Set to false to disable traces that appear with warnings
if ( jQuery.migrateTrace === undefined ) {
    jQuery.migrateTrace = true;
}

// Forget any warnings we've already given; public
jQuery.migrateReset = function() {
    warnedAbout = {"jQuery.browser is deprecated":true}; // we ignore warnings about jQuery.browser because we use a replacement script with the same function name
    jQuery.migrateWarnings.length = 0;
};

function migrateWarn( msg) {
    var console = window.console;
    if ( !warnedAbout[ msg ] ) {
        warnedAbout[ msg ] = true;
        jQuery.migrateWarnings.push( msg );
        if ( console && console.warn && !jQuery.migrateMute ) {
            console.warn( "JQMIGRATE: " + msg );
            if ( jQuery.migrateTrace && console.trace ) {
                console.trace();
            }
        }
    }
}

function migrateWarnProp( obj, prop, value, msg ) {
    if ( Object.defineProperty ) {
        // On ES5 browsers (non-oldIE), warn if the code tries to get prop;
        // allow property to be overwritten in case some other plugin wants it
        try {
            Object.defineProperty( obj, prop, {
                configurable: true,
                enumerable: true,
                get: function() {
                    migrateWarn( msg );
                    return value;
                },
                set: function( newValue ) {
                    migrateWarn( msg );
                    value = newValue;
                }
            });
            return;
        } catch( err ) {
            // IE8 is a dope about Object.defineProperty, can't warn there
        }
    }

    // Non-ES5 (or broken) browser; just set the property
    jQuery._definePropertyBroken = true;
    obj[ prop ] = value;
}

if ( document.compatMode === "BackCompat" ) {
    // jQuery has never supported or tested Quirks Mode
    migrateWarn( "jQuery is not compatible with Quirks Mode" );
}


var attrFn = jQuery( "<input/>", { size: 1 } ).attr("size") && jQuery.attrFn,
    oldAttr = jQuery.attr,
    valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get ||
        function() { return null; },
    valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set ||
        function() { return undefined; },
    rnoType = /^(?:input|button)$/i,
    rnoAttrNodeType = /^[238]$/,
    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    ruseDefault = /^(?:checked|selected)$/i;

// jQuery.attrFn
migrateWarnProp( jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated" );

jQuery.attr = function( elem, name, value, pass ) {
    var lowerName = name.toLowerCase(),
        nType = elem && elem.nodeType;

    if ( pass ) {
        // Since pass is used internally, we only warn for new jQuery
        // versions where there isn't a pass arg in the formal params
        if ( oldAttr.length < 4 ) {
            migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
        }
        if ( elem && !rnoAttrNodeType.test( nType ) &&
            (attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name])) ) {
            return jQuery( elem )[ name ]( value );
        }
    }

    // Warn if user tries to set `type`, since it breaks on IE 6/7/8; by checking
    // for disconnected elements we don't warn on $( "<button>", { type: "button" } ).
    if ( name === "type" && value !== undefined && rnoType.test( elem.nodeName ) && elem.parentNode ) {
        migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
    }

    // Restore boolHook for boolean property/attribute synchronization
    if ( !jQuery.attrHooks[ lowerName ] && rboolean.test( lowerName ) ) {
        jQuery.attrHooks[ lowerName ] = {
            get: function( elem, name ) {
                // Align boolean attributes with corresponding properties
                // Fall back to attribute presence where some booleans are not supported
                var attrNode,
                    property = jQuery.prop( elem, name );
                return property === true || typeof property !== "boolean" &&
                    ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?

                    name.toLowerCase() :
                    undefined;
            },
            set: function( elem, value, name ) {
                var propName;
                if ( value === false ) {
                    // Remove boolean attributes when set to false
                    jQuery.removeAttr( elem, name );
                } else {
                    // value is true since we know at this point it's type boolean and not false
                    // Set boolean attributes to the same name and set the DOM property
                    propName = jQuery.propFix[ name ] || name;
                    if ( propName in elem ) {
                        // Only set the IDL specifically if it already exists on the element
                        elem[ propName ] = true;
                    }

                    elem.setAttribute( name, name.toLowerCase() );
                }
                return name;
            }
        };

        // Warn only for attributes that can remain distinct from their properties post-1.9
        if ( ruseDefault.test( lowerName ) ) {
            migrateWarn( "jQuery.fn.attr('" + lowerName + "') might use property instead of attribute" );
        }
    }

    return oldAttr.call( jQuery, elem, name, value );
};

// attrHooks: value
jQuery.attrHooks.value = {
    get: function( elem, name ) {
        var nodeName = ( elem.nodeName || "" ).toLowerCase();
        if ( nodeName === "button" ) {
            return valueAttrGet.apply( this, arguments );
        }
        if ( nodeName !== "input" && nodeName !== "option" ) {
            migrateWarn("jQuery.fn.attr('value') no longer gets properties");
        }
        return name in elem ?
            elem.value :
            null;
    },
    set: function( elem, value ) {
        var nodeName = ( elem.nodeName || "" ).toLowerCase();
        if ( nodeName === "button" ) {
            return valueAttrSet.apply( this, arguments );
        }
        if ( nodeName !== "input" && nodeName !== "option" ) {
            migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");
        }
        // Does not return so that setAttribute is also used
        elem.value = value;
    }
};


var matched, browser,
    oldInit = jQuery.fn.init,
    oldFind = jQuery.find,
    oldParseJSON = jQuery.parseJSON,
    rspaceAngle = /^\s*</,
    rattrHashTest = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
    rattrHashGlob = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
    // Note: XSS check is done below after string is trimmed
    rquickExpr = /^([^<]*)(<[\w\W]+>)([^>]*)$/;

// $(html) "looks like html" rule change
jQuery.fn.init = function( selector, context, rootjQuery ) {
    var match, ret;

    if ( selector && typeof selector === "string" ) {
        if ( !jQuery.isPlainObject( context ) &&
                (match = rquickExpr.exec( jQuery.trim( selector ) )) && match[ 0 ] ) {

            // This is an HTML string according to the "old" rules; is it still?
            if ( !rspaceAngle.test( selector ) ) {
                migrateWarn("$(html) HTML strings must start with '<' character");
            }
            if ( match[ 3 ] ) {
                migrateWarn("$(html) HTML text after last tag is ignored");
            }

            // Consistently reject any HTML-like string starting with a hash (gh-9521)
            // Note that this may break jQuery 1.6.x code that otherwise would work.
            if ( match[ 0 ].charAt( 0 ) === "#" ) {
                migrateWarn("HTML string cannot start with a '#' character");
                jQuery.error("JQMIGRATE: Invalid selector string (XSS)");
            }

            // Now process using loose rules; let pre-1.8 play too
            // Is this a jQuery context? parseHTML expects a DOM element (#178)
            if ( context && context.context && context.context.nodeType ) {
                context = context.context;
            }

            if ( jQuery.parseHTML ) {
                return oldInit.call( this,
                        jQuery.parseHTML( match[ 2 ], context && context.ownerDocument ||
                            context || document, true ), context, rootjQuery );
            }
        }
    }

    ret = oldInit.apply( this, arguments );

    // Fill in selector and context properties so .live() works
    if ( selector && selector.selector !== undefined ) {
        // A jQuery object, copy its properties
        ret.selector = selector.selector;
        ret.context = selector.context;

    } else {
        ret.selector = typeof selector === "string" ? selector : "";
        if ( selector ) {
            ret.context = selector.nodeType? selector : context || document;
        }
    }

    return ret;
};
jQuery.fn.init.prototype = jQuery.fn;

jQuery.find = function( selector ) {
    var args = Array.prototype.slice.call( arguments );

    // Support: PhantomJS 1.x
    // String#match fails to match when used with a //g RegExp, only on some strings
    if ( typeof selector === "string" && rattrHashTest.test( selector ) ) {

        // The nonstandard and undocumented unquoted-hash was removed in jQuery 1.12.0
        // First see if qS thinks it's a valid selector, if so avoid a false positive
        try {
            document.querySelector( selector );
        } catch ( err1 ) {

            // Didn't *look* valid to qSA, warn and try quoting what we think is the value
            selector = selector.replace( rattrHashGlob, function( _, attr, op, value ) {
                return "[" + attr + op + "\"" + value + "\"]";
            } );

            // If the regexp *may* have created an invalid selector, don't update it
            // Note that there may be false alarms if selector uses jQuery extensions
            try {
                document.querySelector( selector );
                migrateWarn( "Attribute selector with '#' must be quoted: " + args[ 0 ] );
                args[ 0 ] = selector;
            } catch ( err2 ) {
                migrateWarn( "Attribute selector with '#' was not fixed: " + args[ 0 ] );
            }
        }
    }

    return oldFind.apply( this, args );
};

// Copy properties attached to original jQuery.find method (e.g. .attr, .isXML)
var findProp;
for ( findProp in oldFind ) {
    if ( Object.prototype.hasOwnProperty.call( oldFind, findProp ) ) {
        jQuery.find[ findProp ] = oldFind[ findProp ];
    }
}

// Let $.parseJSON(falsy_value) return null
jQuery.parseJSON = function( json ) {
    if ( !json ) {
        migrateWarn("jQuery.parseJSON requires a valid JSON string");
        return null;
    }
    return oldParseJSON.apply( this, arguments );
};

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

// Don't clobber any existing jQuery.browser in case it's different
if ( !jQuery.browser ) {
    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    jQuery.browser = browser;
}

// Warn if the code tries to get jQuery.browser
migrateWarnProp( jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated" );

// jQuery.boxModel deprecated in 1.3, jQuery.support.boxModel deprecated in 1.7
jQuery.boxModel = jQuery.support.boxModel = (document.compatMode === "CSS1Compat");
migrateWarnProp( jQuery, "boxModel", jQuery.boxModel, "jQuery.boxModel is deprecated" );
migrateWarnProp( jQuery.support, "boxModel", jQuery.support.boxModel, "jQuery.support.boxModel is deprecated" );

jQuery.sub = function() {
    function jQuerySub( selector, context ) {
        return new jQuerySub.fn.init( selector, context );
    }
    jQuery.extend( true, jQuerySub, this );
    jQuerySub.superclass = this;
    jQuerySub.fn = jQuerySub.prototype = this();
    jQuerySub.fn.constructor = jQuerySub;
    jQuerySub.sub = this.sub;
    jQuerySub.fn.init = function init( selector, context ) {
        var instance = jQuery.fn.init.call( this, selector, context, rootjQuerySub );
        return instance instanceof jQuerySub ?
            instance :
            jQuerySub( instance );
    };
    jQuerySub.fn.init.prototype = jQuerySub.fn;
    var rootjQuerySub = jQuerySub(document);
    migrateWarn( "jQuery.sub() is deprecated" );
    return jQuerySub;
};

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
    migrateWarn( "jQuery.fn.size() is deprecated; use the .length property" );
    return this.length;
};


var internalSwapCall = false;

// If this version of jQuery has .swap(), don't false-alarm on internal uses
if ( jQuery.swap ) {
    jQuery.each( [ "height", "width", "reliableMarginRight" ], function( _, name ) {
        var oldHook = jQuery.cssHooks[ name ] && jQuery.cssHooks[ name ].get;

        if ( oldHook ) {
            jQuery.cssHooks[ name ].get = function() {
                var ret;

                internalSwapCall = true;
                ret = oldHook.apply( this, arguments );
                internalSwapCall = false;
                return ret;
            };
        }
    });
}

jQuery.swap = function( elem, options, callback, args ) {
    var ret, name,
        old = {};

    if ( !internalSwapCall ) {
        migrateWarn( "jQuery.swap() is undocumented and deprecated" );
    }

    // Remember the old values, and insert the new ones
    for ( name in options ) {
        old[ name ] = elem.style[ name ];
        elem.style[ name ] = options[ name ];
    }

    ret = callback.apply( elem, args || [] );

    // Revert the old values
    for ( name in options ) {
        elem.style[ name ] = old[ name ];
    }

    return ret;
};


// Ensure that $.ajax gets the new parseJSON defined in core.js
jQuery.ajaxSetup({
    converters: {
        "text json": jQuery.parseJSON
    }
});


var oldFnData = jQuery.fn.data;

jQuery.fn.data = function( name ) {
    var ret, evt,
        elem = this[0];

    // Handles 1.7 which has this behavior and 1.8 which doesn't
    if ( elem && name === "events" && arguments.length === 1 ) {
        ret = jQuery.data( elem, name );
        evt = jQuery._data( elem, name );
        if ( ( ret === undefined || ret === evt ) && evt !== undefined ) {
            migrateWarn("Use of jQuery.fn.data('events') is deprecated");
            return evt;
        }
    }
    return oldFnData.apply( this, arguments );
};


var rscriptType = /\/(java|ecma)script/i;

// Since jQuery.clean is used internally on older versions, we only shim if it's missing
if ( !jQuery.clean ) {
    jQuery.clean = function( elems, context, fragment, scripts ) {
        // Set context per 1.8 logic
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;

        migrateWarn("jQuery.clean() is deprecated");

        var i, elem, handleScript, jsTags,
            ret = [];

        jQuery.merge( ret, jQuery.buildFragment( elems, context ).childNodes );

        // Complex logic lifted directly from jQuery 1.8
        if ( fragment ) {
            // Special handling of each script element
            handleScript = function( elem ) {
                // Check if we consider it executable
                if ( !elem.type || rscriptType.test( elem.type ) ) {
                    // Detach the script and store it in the scripts array (if provided) or the fragment
                    // Return truthy to indicate that it has been handled
                    return scripts ?
                        scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
                        fragment.appendChild( elem );
                }
            };

            for ( i = 0; (elem = ret[i]) != null; i++ ) {
                // Check if we're done after handling an executable script
                if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
                    // Append to fragment and handle embedded scripts
                    fragment.appendChild( elem );
                    if ( typeof elem.getElementsByTagName !== "undefined" ) {
                        // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
                        jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

                        // Splice the scripts into ret after their former ancestor and advance our index beyond them
                        ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
                        i += jsTags.length;
                    }
                }
            }
        }

        return ret;
    };
}

var eventAdd = jQuery.event.add,
    eventRemove = jQuery.event.remove,
    eventTrigger = jQuery.event.trigger,
    oldToggle = jQuery.fn.toggle,
    oldLive = jQuery.fn.live,
    oldDie = jQuery.fn.die,
    oldLoad = jQuery.fn.load,
    ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
    rajaxEvent = new RegExp( "\\b(?:" + ajaxEvents + ")\\b" ),
    rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
    hoverHack = function( events ) {
        if ( typeof( events ) !== "string" || jQuery.event.special.hover ) {
            return events;
        }
        if ( rhoverHack.test( events ) ) {
            migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
        }
        return events && events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
    };

// Event props removed in 1.9, put them back if needed; no practical way to warn them
if ( jQuery.event.props && jQuery.event.props[ 0 ] !== "attrChange" ) {
    jQuery.event.props.unshift( "attrChange", "attrName", "relatedNode", "srcElement" );
}

// Undocumented jQuery.event.handle was "deprecated" in jQuery 1.7
if ( jQuery.event.dispatch ) {
    migrateWarnProp( jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated" );
}

// Support for 'hover' pseudo-event and ajax event warnings
jQuery.event.add = function( elem, types, handler, data, selector ){
    if ( elem !== document && rajaxEvent.test( types ) ) {
        migrateWarn( "AJAX events should be attached to document: " + types );
    }
    eventAdd.call( this, elem, hoverHack( types || "" ), handler, data, selector );
};
jQuery.event.remove = function( elem, types, handler, selector, mappedTypes ){
    eventRemove.call( this, elem, hoverHack( types ) || "", handler, selector, mappedTypes );
};

jQuery.each( [ "load", "unload", "error" ], function( _, name ) {

    jQuery.fn[ name ] = function() {
        var args = Array.prototype.slice.call( arguments, 0 );

        // If this is an ajax load() the first arg should be the string URL;
        // technically this could also be the "Anything" arg of the event .load()
        // which just goes to show why this dumb signature has been deprecated!
        // jQuery custom builds that exclude the Ajax module justifiably die here.
        if ( name === "load" && typeof args[ 0 ] === "string" ) {
            return oldLoad.apply( this, args );
        }

        migrateWarn( "jQuery.fn." + name + "() is deprecated" );

        args.splice( 0, 0, name );
        if ( arguments.length ) {
            return this.bind.apply( this, args );
        }

        // Use .triggerHandler here because:
        // - load and unload events don't need to bubble, only applied to window or image
        // - error event should not bubble to window, although it does pre-1.7
        // See http://bugs.jquery.com/ticket/11820
        this.triggerHandler.apply( this, args );
        return this;
    };

});

jQuery.fn.toggle = function( fn, fn2 ) {

    // Don't mess with animation or css toggles
    if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
        return oldToggle.apply( this, arguments );
    }
    migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");

    // Save reference to arguments for access in closure
    var args = arguments,
        guid = fn.guid || jQuery.guid++,
        i = 0,
        toggler = function( event ) {
            // Figure out which function to execute
            var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
            jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

            // Make sure that clicks stop
            event.preventDefault();

            // and execute the function
            return args[ lastToggle ].apply( this, arguments ) || false;
        };

    // link all the functions, so any of them can unbind this click handler
    toggler.guid = guid;
    while ( i < args.length ) {
        args[ i++ ].guid = guid;
    }

    return this.click( toggler );
};

jQuery.fn.live = function( types, data, fn ) {
    migrateWarn("jQuery.fn.live() is deprecated");
    if ( oldLive ) {
        return oldLive.apply( this, arguments );
    }
    jQuery( this.context ).on( types, this.selector, data, fn );
    return this;
};

jQuery.fn.die = function( types, fn ) {
    migrateWarn("jQuery.fn.die() is deprecated");
    if ( oldDie ) {
        return oldDie.apply( this, arguments );
    }
    jQuery( this.context ).off( types, this.selector || "**", fn );
    return this;
};

// Turn global events into document-triggered events
jQuery.event.trigger = function( event, data, elem, onlyHandlers  ){
    if ( !elem && !rajaxEvent.test( event ) ) {
        migrateWarn( "Global events are undocumented and deprecated" );
    }
    return eventTrigger.call( this,  event, data, elem || document, onlyHandlers  );
};
jQuery.each( ajaxEvents.split("|"),
    function( _, name ) {
        jQuery.event.special[ name ] = {
            setup: function() {
                var elem = this;

                // The document needs no shimming; must be !== for oldIE
                if ( elem !== document ) {
                    jQuery.event.add( document, name + "." + jQuery.guid, function() {
                        jQuery.event.trigger( name, Array.prototype.slice.call( arguments, 1 ), elem, true );
                    });
                    jQuery._data( this, name, jQuery.guid++ );
                }
                return false;
            },
            teardown: function() {
                if ( this !== document ) {
                    jQuery.event.remove( document, name + "." + jQuery._data( this, name ) );
                }
                return false;
            }
        };
    }
);

jQuery.event.special.ready = {
    setup: function() {
        if ( this === document ) {
            migrateWarn( "'ready' event is deprecated" );
        }
    }
};

var oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack,
    oldFnFind = jQuery.fn.find;

jQuery.fn.andSelf = function() {
    migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
    return oldSelf.apply( this, arguments );
};

jQuery.fn.find = function( selector ) {
    var ret = oldFnFind.apply( this, arguments );
    ret.context = this.context;
    ret.selector = this.selector ? this.selector + " " + selector : selector;
    return ret;
};


// jQuery 1.6 did not support Callbacks, do not warn there
if ( jQuery.Callbacks ) {

    var oldDeferred = jQuery.Deferred,
        tuples = [
            // action, add listener, callbacks, .then handlers, final state
            [ "resolve", "done", jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"), "resolved" ],
            [ "reject", "fail", jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"), "rejected" ],
            [ "notify", "progress", jQuery.Callbacks("memory"),
                jQuery.Callbacks("memory") ]
        ];

    jQuery.Deferred = function( func ) {
        var deferred = oldDeferred(),
            promise = deferred.promise();

        deferred.pipe = promise.pipe = function( /* fnDone, fnFail, fnProgress */ ) {
            var fns = arguments;

            migrateWarn( "deferred.pipe() is deprecated" );

            return jQuery.Deferred(function( newDefer ) {
                jQuery.each( tuples, function( i, tuple ) {
                    var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
                    // deferred.done(function() { bind to newDefer or newDefer.resolve })
                    // deferred.fail(function() { bind to newDefer or newDefer.reject })
                    // deferred.progress(function() { bind to newDefer or newDefer.notify })
                    deferred[ tuple[1] ](function() {
                        var returned = fn && fn.apply( this, arguments );
                        if ( returned && jQuery.isFunction( returned.promise ) ) {
                            returned.promise()
                                .done( newDefer.resolve )
                                .fail( newDefer.reject )
                                .progress( newDefer.notify );
                        } else {
                            newDefer[ tuple[ 0 ] + "With" ](
                                this === promise ? newDefer.promise() : this,
                                fn ? [ returned ] : arguments
                            );
                        }
                    });
                });
                fns = null;
            }).promise();

        };

        deferred.isResolved = function() {
            migrateWarn( "deferred.isResolved is deprecated" );
            return deferred.state() === "resolved";
        };

        deferred.isRejected = function() {
            migrateWarn( "deferred.isRejected is deprecated" );
            return deferred.state() === "rejected";
        };

        if ( func ) {
            func.call( deferred, deferred );
        }

        return deferred;
    };

}

})( jQuery, window );

/*! 
 * jQuery FlexSlider v2.7.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public

    //if rtl value was not passed and html is in rtl..enable it by default.
    if(typeof options.rtl=='undefined' && $('html').attr('dir')=='rtl'){
      options.rtl=true;
    }
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // deprecating this idea, as devices are being released with both of these events
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : ( slider.vars.rtl ? "marginRight" : "marginLeft" );
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (slider.vars.rtl?
                                ((keycode === 37) ? slider.getTarget('next') :
                                (keycode === 39) ? slider.getTarget('prev') : false)
                                :
                                ((keycode === 39) ? slider.getTarget('next') :
                                (keycode === 37) ? slider.getTarget('prev') : false)
                                )
                                ;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromX;
                if(slider.vars.rtl){
                  posFromX = -1*($slide.offset().right - $(slider).scrollLeft()); // Find position of slide relative to right of slider container
                }
                else
                {
                  posFromX = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                }
                if( posFromX <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);

              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { 
                slide.attr( 'data-thumb-alt', '' ); 
              }
              
              item = $( '<a></a>' ).attr( 'href', '#' ).text( j );
              if ( slider.vars.controlNav === "thumbnails" ) {
                item = $( '<img/>' ).attr( 'src', slide.attr( 'data-thumb' ) );
              }
              
              if ( '' !== slide.attr( 'data-thumb-alt' ) ) {
                item.attr( 'alt', slide.attr( 'data-thumb-alt' ) );
              }

              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { 
                  var caption = $('<span></span>' ).addClass( namespace + 'caption' ).text( captn );
                  item.append( caption );
                }
              }
              
              var liElement = $( '<li>' );
              item.appendTo( liElement );
              liElement.append( '</li>' );

              slider.controlNavScaffold.append(liElement);
              j++;

            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;
                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : (slider.vars.rtl?-1:1)*(startX - localX);
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));
              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = (slider.vars.rtl?-1:1)*accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).innerHeight()}, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * ((slider.vars.rtl)?1:-1)) + "px";
          }());

      if (slider.transitions) {
        if (slider.isFirefox) {
          target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + (parseInt(target)+'px') + ",0,0)";
        } else {
          target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + ((slider.vars.rtl?-1:1)*parseInt(target)+'px') + ",0,0)";
        }
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
          if(slider.vars.rtl){
            if (slider.isFirefox) {
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "right", "display": "block"});
            } else {
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            }
              
           }
            else{
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            }
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        if(slider.vars.rtl){
          slider.slides.css({"width": "100%", "float": 'right', "marginLeft": "-100%", "position": "relative"});
        }
        else{
          slider.slides.css({"width": "100%", "float": 'left', "marginRight": "-100%", "position": "relative"});
        }
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      if (slider.isFirefox) { slider.w = slider.width(); }
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,       //{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Browser Specific
    isFirefox: false,             // {NEW} Boolean: Set to true when Firefox is the browser used.

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {},             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  rtl: false             //{NEW} Boolean: Whether or not to enable RTL mode
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === false ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})($z);
/*!
 * $Id: app.js 2022-03-29 09:59:36 +0200 Stefan S  ce2e80fd20f48b0d72c7d6fc0a585c212ca4f1ef $
 * Copyright Zeta Software GmbH
 */
/* jshint strict: false, multistr: true, smarttabs:true, jquery:true, devel:true */

document.documentElement.className = document.documentElement.className.replace(/no-js/g, 'js');

var nualc = navigator.userAgent.toLowerCase();

$z.support.placeholder = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
})();
$z.support.IntersectionObserver = 'IntersectionObserver' in window;
$z.support.beforeprint = 'onbeforeprint' in window;

var isDebug = false;
if (document.getElementsByTagName("html")[0].getAttribute("data-zpdebug") == "true") {
  isDebug = true;
}
// logs to the browser-console with a timestamp
function setDebug(isDebug=false) {        
        var timestamp = function(){};
        timestamp.toString = function(){
            var ts = new Date();
            var pad = "000";
            var ms = ts.getMilliseconds().toString();
            var timestamp = ts.toLocaleTimeString("de-DE") + "." + pad.substring(0,pad.length - ms.length) + ms + ": ";

            return timestamp;    
        };
        
        if (isDebug) {
            window.debug = {
              log:   window.console.log.bind(window.console, '%s', timestamp),
              error: window.console.error.bind(window.console, '%s', timestamp),
              info:  window.console.info.bind(window.console, '%s', timestamp),
              warn:  window.console.warn.bind(window.console, '%s', timestamp)
            };
        } else {
            var __no_op = function() {};

            window.debug = {
              log: __no_op,
              error: __no_op,
              warn: __no_op,
              info: __no_op
            }
        }
}
setDebug(isDebug);

// display nice notifications in a lightbox
function zpalert(oArg){
    var title =  oArg.hasOwnProperty('title') ? oArg.title : 'Hinweis';
    var text =   oArg.hasOwnProperty('text') ? oArg.text : 'Ein Fehler ist aufgetreten!';
    var button = oArg.hasOwnProperty('button') ? oArg.button : true;
    var icon =   oArg.hasOwnProperty('icon') ? oArg.icon : 'info';
    
    var iconEl = "";
    
    switch ( icon ) {
        case "info":
            iconEl = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ';
            break;
        
        case "warning":
            iconEl = iconEl = '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
            break;
        
        default:
            iconEl = '<i class="fa ' + faiconclass + '" aria-hidden="true"></i>';
    }
    
    var buttonEl = "";
    if ( button ){
        buttonEl = '<a href="#" class="button primary closezpalert"><span>OK</span></a>';
    }
    var titleEl = "";
    if ( title ){
        titleEl = '<h3 style="margin: 0 0 1rem 0;">' + iconEl + title + '</h3>';
    }
    $z.fancybox(
        '<div class="zpalert" style="min-width: 320px; box-sizing: border-box;">\
            ' + titleEl + '<p>' + text + '</p><p class="buttons" style="text-align: right;">' + buttonEl + '</p>\
        </div>',
        {
            'showCloseButton'    : false,
            'autoDimensions'    : true,
            'width'             : 'auto',
            'height'            : 'auto',
            'transitionIn'        : 'fade',
            'transitionOut'        : 'fade',
            'padding'            : 20,
            'opacity'            : false,
            'overlayColor'        : '#000',
            'overlayOpacity'    : 0.7,
            'onComplete'        : function(){
                $z('.closezpalert').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    $z.fancybox.close();
                });
            },
            'onStart'            :function(){
                $z('#fancybox-content').css('background', '#fff').css('color','#333');
            }
        }
    );
}

// function to preload images
function zpPreloadImage(url)
{
    var img=new Image();
    img.src=url;
}

// add classes to nav menus which help to decide wether hierarchies collapse left or right
function zpIsLeftOrRight(navselector){
    navselector = typeof navselector !== 'undefined' ? navselector : "ul.nav > li";
    $z(navselector).each(function(i,o){
        var current = $z(this);
        var elwidth = current.width();
        var elleft = current.offset().left;
        var elmiddle = elleft + (elwidth / 2);
        var helperClass = "zpisleft";
        
        if ( elmiddle >= $z(document).width()/2 ){
            helperClass = "zpisright";
        }
        current.removeClass('zpisleft zpisright');
        current.addClass(helperClass);
    });
}

// get a parameter from the querystring by name
function zpGetParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// add or update a QueryString Parameter in a URL
function zpUpdateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        // update parameter
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        // add parameter
        if ( typeof(value) !== "undefined" && value !== "" ){
            return uri + separator + key + "=" + value;
        }
    }
}

function zpTextOverflow(e, filler){
    filler = typeof filler !== 'undefined' ? filler : "…";
    
    $z(e).each(function(d){
        var wordcount = 0;
        var nodes = $z(this).find("*");
        var nodecount = nodes.length;
        var done = false;
        
        while ( !done && $z(this).overflown() && nodecount >= 0 ){
            //console.log(Date.now() + " Article No.:" + d + " Nodecount: " + nodecount);
            if ( nodecount > 0 ){
                var chtml = $z(nodes).eq(nodecount-1).html();
                var target = $z(nodes).eq(nodecount-1);
            }
            else{
                var chtml = $z(this).html();
                var target = $z(this);
            }
            var words = chtml.split(" ");
            
            for (i = words.length; i >= 0; i--){
                if ( i == words.length ){ // only runs this in the first iteration of the for loop
                    // schnell an die richtige Wortanzahl rantasten, wenn mehr als 7 wörter durschsucht werden müssen.
                    while ( i >=2 && $z(this).overflown() ){
                        i = parseInt(i / 2);
                        //console.log("    " + Date.now() + " Wordsestimate: " + i);
                        $z(target).html(words.slice(0,i).join(" ") + filler);
                    }
                    i = i * 2;
                }
                //console.log("    Wordcount: " + i );
                if ( i > 0 ) {
                    $z(target).html(words.slice(0,i).join(" ") + filler);
                }
                else{
                    $z(target).remove();
                }
                if (!$z(this).overflown()){
                    done = true;
                    break;
                }
            }
            nodecount--;
        }
    });
};

//
// Debounce calls to "callback" routine so that multiple calls
// made to the event handler before the expiration of "delay" are
// coalesced into a single call to "callback". Also causes the
// wait period to be reset upon receipt of a call to the
// debounced routine.
//
function zpdebounce(delay, callback) {
    if (typeof(delay)==='undefined') delay = 250;
    var timeout = null;
    return function () {
        //
        // if a timeout has been registered before then
        // cancel it so that we can setup a fresh timeout
        //
        if (timeout) {
            clearTimeout(timeout);
        }
        var args = arguments;
        timeout = setTimeout(function () {
            callback.apply(null, args);
            timeout = null;
        }, delay);
    };
}
//
// Throttle calls to "callback" routine and ensure that it
// is not invoked any more often than "delay" milliseconds.
// http://blogorama.nerdworks.in/javascriptfunctionthrottlingan/
//
function zpthrottle(delay, callback) {
    if (typeof(delay)==='undefined') delay = 250;
    var timeout = null;
    var previousCall = new Date().getTime();
    return function() {
        var time = new Date().getTime();

        //
        // if "delay" milliseconds have expired since
        // the previous call then propagate this call to
        // "callback"
        //
        if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
            
             // make sure callback is called again in case event ended before timer elapsed
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                callback.apply(null, arguments);
                timeout = null;
            }, delay);
        }
    };
}

function trace(s) {
  try { console.log(s); } catch (e) { alert(s); }
}

// test for touch device
function is_touch_device() {
    //return !!('ontouchstart' in window) || !!(navigator.msMaxTouchPoints) || !!(navigator.maxTouchPoints) || window.DocumentTouch && document instanceof DocumentTouch ;

    // use same logic as jquery.flexslider.js
    //var msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
    //touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch);
    // in the responsive preview, we set the touch class manually, so we also need to check tor that, so we can simulate
    var touch = 'ontouchstart' in window || navigator.maxTouchPoints || $z('body').hasClass('touch');
    return touch;
}


// Helper for Nav-Menues with hover effects to make them work via alternating clicks
// 1st Click will open the Submenues, 2nd Click will load the link associated with the clicked element
function hoverToClickMenu(element, breakpointMobileMenu, instancenumber, triangleMode) { 
    //var listenEvent = 'ontouchend' in document.documentElement ? "touchend" : "click";
    var listenEvent = "click";
        
    // The stock browser on Android 4.X can't cancel touchend events and will thus always fire an additional click event, so we need to revert to click events StS 2015-02-24
    if ( nualc.indexOf("android 4") > -1 && nualc.indexOf("chrome") === -1 ) {
        listenEvent = "click";
    }
    
    /* clean up added styles after the user resizes the browser window and might reach desktop resolution */
    if ( instancenumber == 1 && (breakpointMobileMenu !== undefined || triangleMode)  ) {
            var menuResizeTimer;
            
            var clearAddedStyles = function(){
                if (  triangleMode || $z(window).width() > parseInt(breakpointMobileMenu) ){                    
                    $z(".hoverToClickMenuAdded").children("ul").css({'display' : '', 'visibility' : ''});
                    $z(".hoverToClickMenuAdded").removeClass("clicked").removeClass("open").removeClass("hoverToClickMenuAdded");
                }
            };
            
            $z(window).resize(function(e) {
                clearTimeout(menuResizeTimer);
                menuResizeTimer = setTimeout(clearAddedStyles, 250);
            });
    }

    var firstClick = function(element, event) {
        var event = event || window.event;
        var mobileMenu = false;
        if ( breakpointMobileMenu !== undefined && $z(window).width() <= parseInt(breakpointMobileMenu) ){
            triangleMode = true;
            mobileMenu = true;
        }
        else if ( !is_touch_device() && breakpointMobileMenu !== undefined && listenEvent == "click" && $z(window).width() > parseInt(breakpointMobileMenu) ) {
            // we're NOT displaying a mobile menu on non-touch devices, so return and don't modify the click behavior
            return true;
        }
        
        if ( triangleMode ){
            if ( (event.pageX - $z(element).offset().left) <= parseInt($z(element).css("padding-left")) || (event.pageX - $z(element).offset().left) > (parseInt($z(element).css("padding-left")) + $z(element).width() -6) ){
                // user clicked on triangle to the left or right of a link
                var hasVisibleChilds = $z(element).parent().children("ul").css("display") == "block" && $z(element).parent().children("ul").css("visibility") == "visible";
                //var hasVisibleChilds = $z(element).parent().children("ul").is(":visible") && $z(element).parent().children("ul").css("visibility") !== "hidden";
                if ( hasVisibleChilds && ($z(element).parent().hasClass("open") ||  $z(element).parent().hasClass("active")) ){
                    $z(element).parent().removeClass("clicked").removeClass("open").addClass("closed");
                    $z(element).parent().children("ul").css({'display' : 'none', 'visibility' : ''});
                    
                    // remove manually set classes and styles on mouseout, so a consecutive mouseover on non touch devices will trigger the open state again
                    if ( !is_touch_device() ){
                        $z(element).parent().prevAll(".clicked").off("mouseleave.nav");
                        $z(element).parent().off("mouseleave.nav");
                        $z(element).parent().on("mouseleave.nav", function(e){
                            // return if mobile menu is active
                            if ( $z(element).parents("nav.on").length || $z(element).parents("#nav.on").length || mobileMenu ){
                                //console.log("Mobile menu is didplayed. Returning early. breakpointMobileMenu: " + breakpointMobileMenu);
                                return;
                            }
                            $z(element).parent().removeClass("hoverToClickMenuAdded").removeClass("clicked").removeClass("open").removeClass("closed");
                            $z(element).parent().children("ul").css({'display' : '', 'visibility' : ''});
                        });
                    }
                }
                else{
                    $z(element).parent().addClass("hoverToClickMenuAdded").removeClass("closed").addClass("clicked").addClass("open");
                    $z(element).parent().children("ul").css({'display' : 'block', 'visibility' : 'visible'});
                }
                event.preventDefault();
                return false;
            }    
            else{
                // user clicked directly on link, so we load the url immediately
                return true;
            }
        }
        else{
            var otherMenus = $z(element).parent().prevAll(".clicked").add($z(element).parent().nextAll(".clicked"));
            otherMenus.removeClass("clicked").removeClass("open");
            otherMenus.find("ul").css({'display' : '', 'visibility' : ''});
            otherMenus.find(".clicked").removeClass("clicked");
            otherMenus.find(".open").removeClass("open");
            otherMenus.find(".hoverToClickMenuAdded").removeClass("hoverToClickMenuAdded");
            var hasVisibleChilds = $z(element).parent().children("ul").css("display") == "block" && $z(element).parent().children("ul").css("visibility") == "visible";
        
            if ( $z(element).parent().hasClass("clicked") || hasVisibleChilds ){ // TODO ZP13 check layouts for incompatibilities due to commenting out this: || ($z(element).parent().children("xul").css("display") == "block" && $z(element).parent().children("xul").css("visibility") == "visible") ) {
                // element has been clicked before, so now we fire a click
                return true;
            }
            // element has been clicked for the first time, so we do not fire a click and only show submenues
        
            // add ".open" classname to parent li element so we can style it if we want
            $z(element).parent().addClass("clicked").addClass("open");
            // in case suckerfish is used
            $z(element).parent().children("ul").css({'display' : 'block', 'visibility' : 'visible'});
            return false;
        }
    };
    $z(element).off("click touchend");
    $z(element).on( listenEvent , function(event) {
        var firstClickResult = firstClick($z(this), event);
        if ( !firstClickResult ){
            event.preventDefault();
        }
        return firstClickResult;
    });
}

// For IE8 and earlier version which don't have native support for Date.now.
if (!Date.now) {
  Date.now = function() {
    return new Date().valueOf();
  };
}

// polyfill for array.find (native substitute for underscrote _.find
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find && Object.defineProperty) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     'use strict';
     if (this == null) {
       throw new TypeError('Array.prototype.find called on null or undefined');
     }
     if (typeof predicate !== 'function') {
       throw new TypeError('predicate must be a function');
     }
     var list = Object(this);
     var length = list.length >>> 0;
     var thisArg = arguments[1];
     var value;

     for (var i = 0; i < length; i++) {
       value = list[i];
       if (predicate.call(thisArg, value, i, list)) {
         return value;
       }
     }
     return undefined;
    }
  });
}

// lets us define css classes which only apply after all assets are loaded
$z(window).on('load', function(){
    $z("body").addClass("loaded");
});
                
$z(document).ready(function () {
    var url = window.location.href;
    var responsivePreview = false;
    var pvmode = zpGetParameterByName("responsivepreview", url); //url.searchParams.get("responsivepreview");
    if ( pvmode ){
        responsivePreview = true;
        window.location = window.location.origin + "/supplemental-external-previewing/index.html?url=" + url;
        //alert("Responsive-Preview Reload");
    }
    
    if ( $z(".zpgrid").length === 0 ){
        // we have a layout that was not modified for ZP13 i.e. a copied Layout from Version 12.5 or earlier
        // layouts not modified have no div with class .zpgrid, so we append the class to the document body
        $z('.zparea[data-areaname="Standard"], .zparea[data-areaname="Banner"], .zparea[data-areaname="Footer"]').addClass("zpgrid copiedlayout");
    }

    //define some helper css classes
    $z("html").removeClass("no-js");
    $z("html, body").addClass("js");
    // recognize IE (since IE10 doesn't support conditional comments anymore)
    // removed in jQuery 1.9, so be careful!
    if ( $z.browser.msie || !!navigator.userAgent.match(/Trident.*rv\:11\./) ) {
        $z("html").removeClass("notie");
        $z("html").addClass("ie");
        $z("html").addClass("ie" + parseInt($z.browser.version, 10));
    }
    else if( !!navigator.userAgent.match(/Edge\/\d\d/) ){
        $z("html").addClass("edge");
    }
    else if ($z.browser.mozilla){
        $z("html").addClass("mozilla");
    }
    else if ($z.browser.safari && !navigator.appVersion.match(/Chrome\//) ){
        $z("html").addClass("safari");
        if ( navigator.appVersion.match(/version\/(\d+)/i) ){
            $z("html").addClass("safari" + navigator.appVersion.match(/version\/(\d+)/i)[1]);
        }
    }
    
    // detect object-fit css support
    if ( document.createElement("detect").style.objectFit === "" ) {
        $z("body").addClass("objectfit");
    }
    
    // system prefers reduced motion (used i.e. to switch off animations in css)
    if ( window.matchMedia && window.matchMedia( "(prefers-reduced-motion: reduce)" ).matches ){
        $z("body:not(.zppreview)").addClass("zpreducemotion");
    }
    
    // add a top-padding to html5 audio because firefox has a time indicator implemented as a bubble which would be cut off due to our overflow hidden grid system
    if ($z.browser.mozilla){
        $z("audio").animate({paddingTop: '+=12px'}, 0); // we only use .animate() here, as that is a convenient way to be able to add values to (possibly) existing values
    }
    
    if(is_touch_device()) {
        // add .touch class to body if we run on a touch device, so we can use the class in css (used e.g. in ONLINE-CMS)
        $z("body").removeClass("notouch");
        $z("body").addClass("touch");
        
        // fix for hover menues (which contain submenues) to make them work on touch devices
        var breakpointmobilemenu = $z(".clickhovermenu").data("breakpointmobilemenu");
        var trianglemode = $z(".clickhovermenu").data("trianglemode") || false;
        $z(".touchhovermenu li:has(li) > a").each(function(i){
            hoverToClickMenu(this, breakpointmobilemenu, i, trianglemode);
        });
    }
    else{
        // In case we want to substitute hover with click menues on non touch devices too
        $z("body").removeClass("touch");
        $z("body").addClass("notouch");
        var breakpointmobilemenu = $z(".clickhovermenu").data("breakpointmobilemenu");
        var trianglemode = $z(".clickhovermenu").data("trianglemode") || false;
        $z(".clickhovermenu li:has(li) > a").each(function(i){
            hoverToClickMenu(this, breakpointmobilemenu, i, trianglemode);
        });
    }
        
    // make sure, the mobile menu is closed, if a link to an article on the same page is clicked
    $z('#nav ul li a:not(#mobilenavtoggle), nav ul li a:not(#mobilenavtoggle), div.nav-collapse ul li a:not(#mobilenavtoggle):not(.btn-navbar)').on('click.closeafterclick', function(e){
    //$('.nav-collapse ul li a').on('click', function(e){
        //console.log("Clicked on nav. defaultPrevented: " + e.isDefaultPrevented() + " ", e);
        if ( !e.isDefaultPrevented() && $z(".btn-navbar[data-toggle], #mobilenavtoggle").is(":visible") ){
            $z('.btn-navbar[data-toggle], #mobilenavtoggle').click();
        }
    });
    
    // set correct dimensions for breakout elements which in CSS are only approximated due to problems with browsers handling scrollbars differently when using vw/vh
    function setBreakout(){
        var bodyWidth = $z("body").outerWidth();
        // any widget
        $z(".supportsbreakout body:not(.withnews) .zpBreakout:not(.hasNews):not(.zpwBild.left):not(.zpwBild.right)").css("width",bodyWidth+"px").css("padding-left", "0").css("margin-left","calc(-" + bodyWidth/2 + "px + 50% )");
        $z("body.supportsbreakout:not(.withnews) .zpBreakout:not(.hasNews):not(.zpwBild.left):not(.zpwBild.right)").css("width",bodyWidth+"px").css("padding-left", "0").css("margin-left","calc(-" + bodyWidth/2 + "px + 50% )");
        // image widget
        $z(".supportsbreakout body:not(.withnews) .zpColumn.c12 .zpwBild.zpBreakout:not(.hasNews), body.supportsbreakout:not(.withnews) .zpColumn.c12 .zpwBild.zpBreakout:not(.hasNews)").each( function(index, value){
            // adjust css of image wrapper
            $z(this).css("width",bodyWidth+"px").css("padding-left", "0").css("margin-left","calc(-" + bodyWidth/2 + "px + 50% )")
            // set image width to browser-window-width, so it also enlarges if necessary
            $z(this).find('img.singleImage').css('width', bodyWidth + 'px').css('max-width','none');
            // set width of image description to column-width and horizontally center it
            var columnWidth = parseInt($z(this).parent('.zpColumnItem').width()) + "px";
            $z(this).find('.imagedescription').css("max-width", columnWidth).css("margin-left", "auto").css("margin-right", "auto");
        });
    }
    
    setBreakout();
    
    $z(window).resize(zpdebounce(100, function(event) {
        setBreakout();
        // set some helper classnames on first level menu items to assist dropdown positioning
        zpIsLeftOrRight();
    }));
    
    // animate Containers on Scroll
    function isElementInViewport (el) {
        //special bonus for those using jQuery
        if (el instanceof jQuery) {
            el = el[0];
        }
        
        var rect = el.getBoundingClientRect();

        //document.documentElement.clientHeight is a fallback for IE8
        return ( (rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) ) || (rect.bottom >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) );
    }
    
    var lastScrollTop = 0;
    var hasAnimatableContent = $z("body:not(.zpreducemotion) .zpanimate").length;
    if ( hasAnimatableContent ){
        if ( $z.support.IntersectionObserver ){
            var zpanimCallback = function(entries, observer) { 
                entries.forEach(function(entry) {
                    if ( entry.isIntersecting ){
                        //console.log("IntersectionObserver. Element became visible: ", entry.target);
                        observer.unobserve(entry.target);
                        $z(entry.target).find(".zpanimate").addBack().addClass("show");
                    }
                });
            };
            var zpanimObserver = new IntersectionObserver(zpanimCallback, {rootMargin: '0px', threshold: 0});
        }
    
        // wrap animatable content in wrapper with overflow hidden to prevent scrollbars due to content shifted to the right
        $z('body:not(.zpreducemotion) .zpanimate.slideleft, \
            body:not(.zpreducemotion) .zpanimate.floatin, \
            body:not(.zpreducemotion) .zpanimate.zoomout').each(function(i, el){
            var currentElement = $z(this);
            
            var inlineStyles = "";
            if ( currentElement.hasClass("zpColumn")){
                // effects in columns need different wrapper css due to different parent styles
                inlineStyles += "margin: 0 !important;";
                inlineStyles += "padding: 0 !important;";
            } else{
                inlineStyles += "padding-left:" + $z(this).css("padding-left") + " !important;";
                if ( !currentElement.hasClass("zpBreakout") ){
                    inlineStyles += "margin-left: auto !important;";
                    inlineStyles += "margin-right: auto !important;";
                }
                else{
                    inlineStyles += "margin-left:" + $z(this).css("margin-left") + ";";
                    inlineStyles += "margin-right" + $z(this).css("margin-right") + ";";;
                }
                inlineStyles += "padding-top: 0 !important;";
                inlineStyles += "padding-bottom: 0 !important;";
            }
            // in order to avoid errors due to JS returning rounded values, we use getComputedStyles
            // inlineStyles += "width:" + $z(this).css("width") + ";";
            inlineStyles += " width:" + (window.getComputedStyle(this).width || "") + ";";
            
            // remove margins from current element since they'll be applied to wrapper by the zpContainer/zpRow class css
            currentElement.css("margin-top", "0px");
            currentElement.css("margin-bottom", "0px");
            // depending if current Element is zpRow or zpContainer, use propper className in wrapper too, so the correct CSS applies to the wrapper
            var currentElementClass = "zpContainer";
            
            var currentContainerId = ''; // we set the wrapper to the same IDs, so the inline CSS applies to the wrappers too 
            var currentRowId = '';         // and keeps margins etc. set in the "Darstellungs-Tab"
            var currentColumnId = '';
            if ( currentElement.hasClass("zpContainer") ){
                currentContainerId = ' data-container-id="' + currentElement.attr("data-zpleid") + '"';
            }
            if ( currentElement.hasClass("zpRow") ){
                currentRowId = ' data-row-id="' + currentElement.attr("data-row-id") + '"';
                currentElementClass = "zpRow";
            }
            if ( currentElement.hasClass("zpColumn") ){
                currentColumnId = ' data-column-id="' + currentElement.attr("data-column-id") + '"';
                currentElementClass = " zpColumn";
            }
            if ( currentElement.hasClass("floatin") ){
                currentElementClass += " floatin";
            }
            if ( currentElement.hasClass("zpBreakout") ){
                currentElementClass += " zpBreakout";
            }
            // remove inline-scripts from ZP search-page as these destroy the dom during animation
            var currentScript = currentElement.find('script.zpsearchinlinescript').text();
            currentElement.find('script.zpsearchinlinescript').remove();
            currentElement.css("width", "100%").wrap('<div' + currentContainerId + currentRowId + currentColumnId + ' class="zpanimatewrap ' + currentElementClass + '" style="' + inlineStyles + '">');
            // unwrap the content again after the animation finished to make sure it properly displays and doesn't get disturbed by the wrapper
            currentElement.off("webkitTransitionEnd.zpaniwrap otransitionend.zpaniwrap oTransitionEnd.zpaniwrap msTransitionEnd.zpaniwrap transitionend.zpaniwrap animationend.zpaniwrap" );
            currentElement.on( "webkitTransitionEnd.zpaniwrap otransitionend.zpaniwrap oTransitionEnd.zpaniwrap msTransitionEnd.zpaniwrap transitionend.zpaniwrap animationend.zpaniwrap", function(event) {
                if ( event && event.currentTarget == event.target ){
                    //console.log(new Date().toISOString() + ": transitionEnd() Event:", event);
                    if ( currentElement.parent().hasClass("zpanimatewrap") ){
                        currentElement.addClass("played").unwrap(); // .played is used to avoid animations playing again if el is unwrapped
                    }
                    // reset added CSS – width and margins
                    currentElement.css("width", "");
                    currentElement.css("margin-top", "");
                    currentElement.css("margin-bottom", "");    
                }
            });
        }); ;
        
        function doAnimations(e){
            var delay = 0;
            var st = $z(this).scrollTop();
            if (st > lastScrollTop){
                var scrollDirection = "down";
            }
            else{
                var scrollDirection = "up";
            }
            lastScrollTop = st;
            $z("body:not(.zpreducemotion) .zpanimate:not(.zppreview)").each(function(i, el){
                // find children with position fixed and hide them because they'd be positioned wrong
                var fixedChilds = $z(el).find('*').filter(function(){
                    var $this = $(this);
                    //return $this.css('position') == 'relative';
                    return $this.css('position') == 'fixed';
                });
                fixedChilds.hide();
                
                $z(el).off("webkitTransitionEnd.zpaniend otransitionend.zpaniend oTransitionEnd.zpaniend msTransitionEnd.zpaniend transitionend.zpaniend animationend.zpaniend" );
                $z(el).on( "webkitTransitionEnd.zpaniend otransitionend.zpaniend oTransitionEnd.zpaniend msTransitionEnd.zpaniend transitionend.zpaniend animationend.zpaniend", function(event) {
                    if ( event && event.currentTarget == event.target ){
                        // remove animation classes so that fixed Widgets (e.g. Reservierungs-Popup) are placed correctly
                        $z(el).removeClass("zpanimate show played slideleft slideright fadein floatin zoomout pulse");
                        // show fixed children again
                        fixedChilds.fadeIn();
                        // set breakout dimensions
                        setBreakout();
                    }
                });
                
                var viewportTestElement = el;
                // FYI: el is a Dom-Object, not a jQuery-Object
                if ( el.className.indexOf("floatin") !== -1 ){
                    // Elements with Effect "Einschweben" have a translateY(50%) applied, so we need to get the proper .top coordinates of the parent-wrapper in order to find out if it's in viewport
                    viewportTestElement = el.parentElement;
                }
                
                if ( $z.support.IntersectionObserver ){
                    zpanimObserver.observe(viewportTestElement);
                }
                else{
                    if ( isElementInViewport(viewportTestElement) ) {
                        if ( ! $z(this).hasClass("show")){
                            var currentElement = $z(this);
                            // animate consecutively visible elements via setTimeout, so the elements are animated consecutive and not at the same time 
                            if ( typeof this.timeoutId !== 'undefined' ) {
                                clearTimeout(this.timeoutId);
                            }
                            this.timeoutId = setTimeout(function() { 
                                currentElement.addClass("show");
                            }, delay);
                            delay += 250;
                        }
                    }
                    else{
                        // reset delay once we reach an element out of viewport, so once this reaches viewport, it isn't animated with delay
                        delay = 0;
                    }
                }
            });
        }
        
        $z(window).off('load.zpanim scroll.zpanim');
        $z(window).on('load.zpanim', doAnimations); 
        if ( ! $z.support.IntersectionObserver ){
            $z(window).on('scroll.zpanim', zpthrottle(50, doAnimations)); 
        }
    }
    
    // set some helper classnames on first level menu items to assist dropdown positioning
    zpIsLeftOrRight();
        
    // wire up xmenu language selection
    function setLanguageSelectWidth(element){
        // find the width of the selected element and set the width of the select accordingly, so the selected element will never be cut off
        var text = $z(element).find("option:selected").text() || "";
        $z('a.xmenulink').css("vertical-align","top");
        var itemwrapper = $z('i.zpextralang').attr('data-itemwrapper').split(',') || ["",""];
        var $link = $('<a class="xmenulink">').html(text);
        $link.insertBefore('i.zpextralang');
        
        // set styles, so it displays properly and width is calculated correctly
        $z('i.zpextralang').css('color', $link.css('color'));
        $z('i.zpextralang').css('line-height', $link.css('line-height'));
        $z('i.zpextralang').css('padding', $link.css('padding'));
        $z('i.zpextralang').css('margin-left', $link.css('margin-left'));
        $z('i.zpextralang').css('margin-top', $link.css('margin-top'));
        $z('i.zpextralang').css('margin-bottom', $link.css('margin-bottom'));
        $z('i.zpextralang').css('border-width', $link.css('border-width'));
        $z('i.zpextralang').css('border-style', $link.css('border-style'));
        
        $z(element).css('font-family', $link.css('font-family'));
        $z(element).css('font-size', $link.css('font-size'));
        $z(element).css('font-weight', $link.css('font-weight'));
        $z(element).css('font-style', $link.css('font-style'));
        $z(element).css('font-style', $link.css('font-style'));
        $z(element).css('text-shadow', $link.css('text-shadow'));
        $z(element).css('color', $link.css('color'));
        $z(element).css('text-decoration', $link.css('text-decoration'));
        
        // measure link-width
        var width = parseInt($link.innerWidth());// + 5;
        // remove link-element we only temporarily inserted to measure
        $link.remove();
        
        var arrowWidth = .5 *1.4142;// ".5em"; //parseInt($z(element).css("padding-right")) || 0;
        $z(element).css("width", "calc( "+ width + "px + " + arrowWidth + "em)");
    }
    $z('#zpextralang').each(function(){
        // set select width to width of selected option
        setLanguageSelectWidth(this); //$z('a.xmenulink').last();
    });

    $z('#zpextralang').on("change", function(){
        var url = this.value;
        if ( url ){
            //setLanguageSelectWidth(this);
            // go to the respective url
            window.location.href = url;
        }
    });   
});

// define zp Namespace for later use in individual widgets
// define zp Namespace for later use in individual widgets if not only defined
if ( typeof(zp)==="undefined" ){
    var zp = {  
    }; // end zp
}
// test HTML5 field-type support and store it in zp.html5support
zp.html5support = {number: false, email: false, tel: false, url: false, date: false, time: false, color: false, search: false};
var tester = document.createElement('input');
for(var i in zp.html5support){
    // Use try/catch because IE9 throws "Invalid Argument" when trying to use unsupported input types
    try {
        tester.type = i;
        if(tester.type === i){
            zp.html5support[i] = true;
        }
    } catch (e){}
}

(function($){
    // make $z.unique also work on arrays and not only DOM-Elements (without this, we have a problem with the EventCalendars in Chrome)
    // http://stackoverflow.com/a/7366133
    var _old = $.unique;
    $.unique = function(arr){
        // do the default behavior only if we got an array of elements
        if ( arr.length == 0  || !!arr[0].nodeType){
            return _old.apply(this,arguments);
        }
        else {
            // reduce the array to contain no dupes via grep/inArray
            return $.grep(arr,function(v,k){
                return $.inArray(v,arr) === k;
            });
        }
    };
    
    // custom function to shorten and suffix text with _filler_ to make it fit its container - StS 2016-10-27
    // call it like this: $z(".mySelector").fitText();
    $.fn.fitText = function( filler ){
        filler = typeof filler !== 'undefined' ? filler : "…";
        
        zpTextOverflow(this, filler);
    
        return this;
    }
    
    // custom function to find out if content of an element is overflowing 
    $.fn.overflown=function(direction){
        if (typeof(direction)==='undefined') direction = "any";
        var e=this[0];
        var buffer = 4; // needs to be greater than value + buffer to be considered overflown. Compensates Browser rounding-bugs(cough, IE)…
        if ( typeof e !== "undefined" ){
            switch(direction) {
                case "x":
                    return e.scrollWidth>(e.clientWidth+buffer);
                    break;
                case "y":
                    return e.scrollHeight>(e.clientHeight+buffer);
                    break;
                default:
                    return e.scrollHeight>(e.clientHeight+buffer)||e.scrollWidth>(e.clientWidth+buffer);
            }
        }
        else{
            return false;
        }
    }
    
})($z);

/*!
  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
  @version v3.6.1
  @link https://github.com/dollarshaveclub/stickybits#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
  @license MIT
*/
!function(t){"function"==typeof define&&define.amd?define(t):t()}(function(){"use strict";var s=function(){function t(t,s){var e=void 0!==s?s:{};this.version="3.6.1",this.userAgent=window.navigator.userAgent||"no `userAgent` provided by the browser",this.props={customStickyChangeNumber:e.customStickyChangeNumber||null,noStyles:e.noStyles||!1,stickyBitStickyOffset:e.stickyBitStickyOffset||0,parentClass:e.parentClass||"js-stickybit-parent",scrollEl:"string"==typeof e.scrollEl?document.querySelector(e.scrollEl):e.scrollEl||window,stickyClass:e.stickyClass||"js-is-sticky",stuckClass:e.stuckClass||"js-is-stuck",stickyChangeClass:e.stickyChangeClass||"js-is-sticky--change",useStickyClasses:e.useStickyClasses||!1,useFixed:e.useFixed||!1,useGetBoundingClientRect:e.useGetBoundingClientRect||!1,verticalPosition:e.verticalPosition||"top"},this.props.positionVal=this.definePosition()||"fixed",this.instances=[];var i=this.props,n=i.positionVal,o=i.verticalPosition,r=i.noStyles,a=i.stickyBitStickyOffset,l=i.useStickyClasses,c="top"!==o||r?"":a+"px",f="fixed"!==n?n:"";this.els="string"==typeof t?document.querySelectorAll(t):t,"length"in this.els||(this.els=[this.els]);for(var u=0;u<this.els.length;u++){var p=this.els[u];if(p.style[o]=c,p.style.position=f,"fixed"===n||l){var h=this.addInstance(p,this.props);this.instances.push(h)}}}var s=t.prototype;return s.definePosition=function(){var t;if(this.props.useFixed)t="fixed";else{for(var s=["","-o-","-webkit-","-moz-","-ms-"],e=document.head.style,i=0;i<s.length;i+=1)e.position=s[i]+"sticky";t=e.position?e.position:"fixed",e.position=""}return t},s.addInstance=function(t,s){var e=this,i={el:t,parent:t.parentNode,props:s};this.isWin=this.props.scrollEl===window;var n=this.isWin?window:this.getClosestParent(i.el,i.props.scrollEl);return this.computeScrollOffsets(i),i.parent.className+=" "+s.parentClass,i.state="default",i.stateContainer=function(){return e.manageState(i)},n.addEventListener("scroll",i.stateContainer),i},s.getClosestParent=function(t,s){var e=s,i=t;if(i.parentElement===e)return e;for(;i.parentElement!==e;)i=i.parentElement;return e},s.getTopPosition=function(t){if(this.props.useGetBoundingClientRect)return t.getBoundingClientRect().top+(this.props.scrollEl.pageYOffset||document.documentElement.scrollTop);for(var s=0;s=t.offsetTop+s,t=t.offsetParent;);return s},s.computeScrollOffsets=function(t){var s=t,e=s.props,i=s.el,n=s.parent,o=!this.isWin&&"fixed"===e.positionVal,r="bottom"!==e.verticalPosition,a=o?this.getTopPosition(e.scrollEl):0,l=o?this.getTopPosition(n)-a:this.getTopPosition(n),c=null!==e.customStickyChangeNumber?e.customStickyChangeNumber:i.offsetHeight,f=l+n.offsetHeight;return s.offset=a+e.stickyBitStickyOffset,s.stickyStart=r?l-s.offset:0,s.stickyChange=s.stickyStart+c,s.stickyStop=r?f-(i.offsetHeight+s.offset):f-window.innerHeight,s},s.toggleClasses=function(t,s,e){var i=t,n=i.className.split(" ");e&&-1===n.indexOf(e)&&n.push(e);var o=n.indexOf(s);-1!==o&&n.splice(o,1),i.className=n.join(" ")},s.manageState=function(t){var s=t,e=s.el,i=s.props,n=s.state,o=s.stickyStart,r=s.stickyChange,a=s.stickyStop,l=e.style,c=i.noStyles,f=i.positionVal,u=i.scrollEl,p=i.stickyClass,h=i.stickyChangeClass,d=i.stuckClass,y=i.verticalPosition,k="bottom"!==y,g=function(t){t()},m=this.isWin&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)||g,v=this.toggleClasses,C=this.isWin?window.scrollY||window.pageYOffset:u.scrollTop,w=k&&C<=o&&("sticky"===n||"stuck"===n),S=a<=C&&"sticky"===n;o<C&&C<a&&("default"===n||"stuck"===n)?(s.state="sticky",m(function(){v(e,d,p),l.position=f,c||(l.bottom="",l[y]=i.stickyBitStickyOffset+"px")})):w?(s.state="default",m(function(){v(e,p),v(e,d),"fixed"===f&&(l.position="")})):S&&(s.state="stuck",m(function(){v(e,p,d),"fixed"!==f||c||(l.top="",l.bottom="0",l.position="absolute")}));var b=r<=C&&C<=a;return C<r/2||a<C?m(function(){v(e,h)}):b&&m(function(){v(e,"stub",h)}),s},s.update=function(t){void 0===t&&(t=null);for(var s=0;s<this.instances.length;s+=1){var e=this.instances[s];if(this.computeScrollOffsets(e),t)for(var i in t)e.props[i]=t[i]}return this},s.removeInstance=function(t){var s=t.el,e=t.props,i=this.toggleClasses;s.style.position="",s.style[e.verticalPosition]="",i(s,e.stickyClass),i(s,e.stuckClass),i(s.parentNode,e.parentClass)},s.cleanup=function(){for(var t=0;t<this.instances.length;t+=1){var s=this.instances[t];s.props.scrollEl.removeEventListener("scroll",s.stateContainer),this.removeInstance(s)}this.manageState=!1,this.instances=[]},t}();if("undefined"!=typeof window){var t=window.$z||window.$||window.jQuery||window.Zepto;t&&(t.fn.stickybits=function(t){return new s(this,t)})}});

/*!
 * END $Id: app.js 2022-03-29 09:59:36 +0200 Stefan S  ce2e80fd20f48b0d72c7d6fc0a585c212ca4f1ef $ 
 */



/*! $Id: imagebreakout.js imagebreakout.js imagebreakout.js imagebreakout.js $ */

$z(document).ready(function () {
    function setImageBreakout(){
        var bodyWidth = $z("body").outerWidth();
        // image widget
        $z(".supportsbreakout body:not(.withnews) .zpColumn .zpwBild.zpBreakout.left:not(.hasNews), body.supportsbreakout:not(.withnews) .zpColumn .zpwBild.zpBreakout.left:not(.hasNews)").each( function(index, value){
            // adjust css of image wrapper
            // // $z(this).css("width",bodyWidth+"px").css("padding-left", "0").css("margin-left","calc(-" + bodyWidth/2 + "px + 50% )")
            //var offset = $z(this).offset().left;
            var offset = $z(this).css("margin-left","0").css("margin-right", "0").css("width", "").offset().left;
            //console.warn("Breakout IMG offset: " + offset);
            $z(this).css({
                "padding": "0",
                "margin-left": "-" + offset + "px",
                "margin-right": "-15px",
                "margin-bottom": "0",
                "border-radius": "" 
            });
            
            // set image width to browser-window-width, so it also enlarges if necessary
            // // $z(this).find('img.singleImage').css('width', bodyWidth + 'px').css('max-width','none');
            
            // set width of image description to column-width and horizontally center it
            var columnWidth = parseInt($z(this).parent('.zpColumnItem').width()) + "px";
            $z(this).find('.imagedescription').css("max-width", columnWidth).css("margin-left", "auto").css("margin-right", "auto");
        });
        
        $z(".supportsbreakout body:not(.withnews) .zpColumn .zpwBild.zpBreakout.right:not(.hasNews), body.supportsbreakout:not(.withnews) .zpColumn .zpwBild.zpBreakout.right:not(.hasNews)").each( function(index, value){
            // adjust css of image wrapper
            // // $z(this).css("width",bodyWidth+"px").css("padding-left", "0").css("margin-left","calc(-" + bodyWidth/2 + "px + 50% )")
            var offset = bodyWidth - ( $z(this).css("margin-left","0").css("margin-right", "0").css("width", "").offset().left + $z(this).width() );
            $z(this).css({
                "padding": "0",
                "margin-right": "-" + offset + "px",
                "margin-left": "-15px",
                "margin-bottom": "0",
                "border-radius": "" 
            });
            
            // set image width to browser-window-width, so it also enlarges if necessary
            // // $z(this).find('img.singleImage').css('width', bodyWidth + 'px').css('max-width','none');
            
            // set width of image description to column-width and horizontally center it
            var columnWidth = parseInt($z(this).parent('.zpColumnItem').width()) + "px";
            $z(this).find('.imagedescription').css("max-width", columnWidth).css("margin-left", "auto").css("margin-right", "auto");
        });
        
        // make sure parent column has no top/bottom padding
        $z("body:not(.withnews):not(#addspecificity) .zpColumn:has(.zpwBild.zpBreakout)").css({
            "margin-top": "0px",
            "margin-bottom": "0px"
        });
    }
    
    // if we have breakout images, take care of them at load and resize
    if ( $z('.zpwBild.zpBreakout').length > 0 ){
        var resizeTimeout = null;
        $z(window).resize(zpthrottle(200, function(event) {
            var event = event || window.event;
            if ( event && $z(event.target.nodeType).length == 0 ){// enable window.resize only for the window object (resizing elements might also trigger window.resize) which doesn't have a nodeType
                setImageBreakout();
            }
        }));
        setImageBreakout();
    }
});
/*! $Id: imagegallery.js imagegallery.js imagegallery.js imagegallery.js $ */

/** 
* jQuery Plugin to add basic "swipe" support on touch-enabled devices
*
* @author Yair Even Or
* @version 1.0.0 (March 20, 2013)
*/

(function($){
    "use strict";

    $.event.special.swipe = {
        setup: function(){
            $(this).bind('touchstart', $.event.special.swipe.handler);
        },

        teardown: function(){
            $(this).unbind('touchstart', $.event.special.swipe.handler);
        },

        handler: function(event){
            var args = [].slice.call( arguments, 1 ), // clone arguments array, remove original event from cloned array
                touches = event.originalEvent.touches,
                startX, startY,
                deltaX = 0, deltaY = 0,
                that = this;

            event = $.event.fix(event);

            if( touches.length == 1 ){
                startX = touches[0].pageX;
                startY = touches[0].pageY;
                this.addEventListener('touchmove', onTouchMove, false);
            }

            function cancelTouch(){
                that.removeEventListener('touchmove', onTouchMove);
                startX = startY = null;
            }

            function onTouchMove(e){
                //e.preventDefault();

                var Dx = startX - e.touches[0].pageX,
                    Dy = startY - e.touches[0].pageY;

                if( Math.abs(Dx) >= 50 ){
                    cancelTouch();
                    deltaX = (Dx > 0) ? -1 : 1;
                }
                else if( Math.abs(Dy) >= 20 ){
                    cancelTouch();
                    deltaY = (Dy > 0) ? 1 : -1;
                }

                event.type = 'swipe';
                args.unshift(event, deltaX, deltaY); // add back the new event to the front of the arguments with the delatas
                return ($.event.dispatch || $.event.handle).apply(that, args);
            }
        }
    };
})($z);

/*! 
 * ZP Image-Gallery Widget
 * Copyright $Date:   imagegallery.js $ Zeta Software GmbH
 */
 
 // This code depends on jquery.fancybox css and js being loded via the global "_Shared"-Widget.

// define zp Namespace for later use in individual widgets if not only defined
if ( typeof(zp)==="undefined" ){
    var zp = {};
}

$z(document).ready(function () {
    zp.ImageGallery = function (){
        this.root = null;
        this.numbershow = true;
        this.template = "";
        this.titleshow = false;
        this.htmltitle = "";
        this.articleid = "";
        this.kind = "gallery";
        this.width = 200;
        this.height = 150;
        this.bordercolor = "silver";
        this.borderwidth = 0;
        this.margin = 10;
        this.overlaycolor = "black";
        this.titleposition = "over"; /* inside, over - not supported by us: outside*/
        this.transition = "elastic"; /* elastic, fade, none */
        this.slideshow = false;
        this.slideshowinterval = 5000;
        this.slideshowtimer = 0;
        this.lang = "de";
        //this.easing = "swing";
        //this.changefade = "fast";
        var igal = this;
    
        this.init = function (elemid){
            function showHideNavButtons(){
                // hide pev/next links when at beginning or end of pages
                if ( currentPage == 1 ){
                    $z(igal.root + " .zppaging a.zppprev").addClass("off");
                }
                else if ( currentPage == numPages ) {
                    $z(igal.root + " .zppaging a.zppnext").addClass("off");
                }
            }

            if(!($z.fancybox)){
                trace("Fehler: Fancybox ist nicht geladen");
            }
        
            igal.root = elemid;
            igal.ispaging = $z(igal.root).attr("data-ispaging")=="true"?true:false;
            igal.imageeffect = $z(igal.root).attr("data-imageeffect") || ""
            igal.prevtext = $z(igal.root).data("prevtext");
            igal.nextext = $z(igal.root).data("nexttext");
            igal.pagetext = $z(igal.root).data("pagetext");
            igal.numbershow = $z(igal.root).data("numbershow")!==0?true:false;
            igal.template = $z(igal.root).data("template");
            igal.titleshow = $z(igal.root).data("titleshow")!==0?true:false;
            igal.htmltitle = $z(igal.root).data("htmltitle");
            igal.kind = $z(igal.root).data("kind");
            igal.articleid = $z(igal.root).data("article-id");
            igal.bordercompensatedwWidth = $z(igal.root).data("bordercompensatedwWidth");
            igal.width = $z(igal.root).data("width");
            if ( parseInt(igal.width) ){
                igal.width = igal.width + "px";
            }
            igal.height = $z(igal.root).data("height");
            if ( parseInt(igal.height) ){
                igal.height = igal.height + "px";
            }
            
            if ( igal.ispaging ){
                var currentPage = 1;
                igal.imagesperpage = parseInt($z(igal.root).data("imagesperpage"));
                var data = JSON.parse($z("#article-full-json-"+igal.articleid).html());    
                var numImages = data.images.length;
                var numPages = igal.imagesperpage > 0 ? Math.ceil(numImages / igal.imagesperpage) : 1;
            
                // check if url contains bookmarked parameters pointing to a specific page
                if ( numPages > 1 && document.location.hash === "#a"+igal.articleid && parseInt(zpGetParameterByName("page")) > 0 ){
                    currentPage = parseInt(zpGetParameterByName("page"));
                    if ( currentPage > numPages ){
                        currentPage = numPages;
                    }
                    else if ( currentPage < 1 ){
                        currentPage = 1;
                    }
                }
            
                // render the gallery with paging
                $("noscript#"+igal.articleid).replaceWith(renderGallery(data, currentPage, igal.imagesperpage, igal.articleid, igal.imageeffect));
                        
                if ( numPages > 1 ){
                    var currentPageText = igal.pagetext.replace("{0}", '<span class="pageno">' + currentPage + '</span>').replace("{1}", numPages);
                
                    $(igal.root).append('<div class="zppaging"><span class="zppprev"><a class="zppprev" href="#a'+igal.articleid+'">' + igal.prevtext + '</a></span>' + currentPageText +' <span class="zppnext"><a class="zppnext" href="#a'+igal.articleid+'">' + igal.nextext + '</a></span> </div>');
                
                    showHideNavButtons();
                
                    $z(igal.root + " .zppaging a").off("click");
                    $z(igal.root + " .zppaging a").on("click", function(e){
                        //e.preventDefault();
            
                        $z(igal.root + " .zppaging a").removeClass("off");
                
                        if ( $z(this).hasClass("zppprev") ){
                            if ( currentPage > 1 ){
                                currentPage = currentPage - 1;
                            }
                        }
                        else if ( $z(this).hasClass("zppnext") ){
                            if ( currentPage < numPages ){
                                currentPage = currentPage + 1;
                            }
                        }
                        // update pagenumber in paging text
                        $z(igal.root + " .zppaging span.pageno").html(currentPage);
                        // URL in Browser-Adressleiste aktualisieren, ohne dass der Browser die Seite lädt und zur Sprungmarke scrollt
                        if (history.pushState){
                            window.history.pushState("object or string", "Title", window.location.pathname + "?page=" + currentPage + "#a" + igal.articleid);
                        }
            
                        showHideNavButtons();
            
                        $(igal.root + ' .gallery-item').remove();
                        $(igal.root).prepend(renderGallery(data, currentPage, igal.imagesperpage, igal.articleid, igal.imageeffect));
                        // initialize fancybox with the new images
                        fancy();
                    });
                }
            }
        
        
            // make it more responsive, as it used to be always fill layout width and cut off by news columns
            if ( igal.height == "auto" && $z(igal.root).hasClass("zpSlideshow") ){
                igal.width = "auto";
                var factor = $z(igal.root).data("maxheight") / $z(igal.root).data("width");
                var newwidth = $z(igal.root).parent().parent().width();
                var newhight = Math.round(newwidth * factor);
                $z(igal.root).parent().width(newwidth + 2).height(newhight + 6);
                $z(igal.root).width(newwidth + 2).height(newhight + 6);
                $z(igal.root + " .slide").width(newwidth).height(newhight + 4).css({"paddingRight":"2px", "paddingBottom":"2px"});
                $z(igal.root + " .slide .caption").width(newwidth - 2);
            }
            igal.bordercolor = $z(igal.root).data("bordercolor");
            igal.borderwidth = $z(igal.root).data("borderwidth");
            igal.margin = $z(igal.root).data("margin");
            igal.marginhor = parseInt(igal.margin)-4; // -4px compensates for space between inline-block elements https://css-tricks.com/fighting-the-space-between-inline-block-elements/
            igal.titleposition = $z(igal.root).data("titleposition");
            igal.zoom = $z(igal.root).data("transition");
            igal.transition = $z(igal.root).data("inner-transition");
        
            if (igal.transition === "none") {
                igal.changeFade = 0;
            } else {
                igal.changeFade = 100;
            }

            igal.slideshow = $z(igal.root).data("slideshow")!==0?true:false;
            igal.slideshowinterval = $z(igal.root).data("slideshowinterval") * 1000;
            igal.slideshowtimer = 0;
            igal.lang = $z(igal.root).data("lang");
        
            fancy();
        
            function fancy(){
                $z(igal.root + " .fancybox:not(.svg)").fancybox({
                    'hideOnContentClick': true,
                    'padding': 0,    //Space between FancyBox wrapper and content
                    'margin': 30,    //Space between viewport and FancyBox wrapper
                    'cyclic'         : !igal.ispaging, 
                    'centerOnScroll': true,
                    'changeSpeed'    : 0, 
                    'changeFade'    : igal.changeFade,
                    'speedIn'        : 300,
                    'speedOut'        : 300,
                    'transitionIn'    : igal.zoom,
                    'transitionOut'    : igal.zoom, 
                    'easingIn'        : 'easeOutCubic', 
                    'easingOut'        : 'easeInCubic', 
                    'titleShow'        : igal.titleshow,
                    'overlayColor'    : igal.overlaycolor,
                    'overlayOpacity': 0.85,
                    'titlePosition'    : igal.titleposition,
                    'titleFormat'    : function(title, currentArray, currentIndex) {
                        if ( typeof igal.htmltitle != 'undefined' && igal.htmltitle !== null && igal.htmltitle !== "" ){
                            // single image
                            title = igal.htmltitle;
                        }
                        else{
                            // slideshow or gallery where data-attr ist set with the anchor
                            var htmlTitle = $z(igal.root + " .fancybox").eq(currentIndex).data("htmltitle");
                            if ( htmlTitle && htmlTitle != "" ){
                                title = safe_decodeURI(htmlTitle);
                            }
                        }
                        // add a classname to links in the lightbox
                        title = title.replace(/<a href/g,'<a class="zpigaltitlelb" href');
                        if ( currentArray.length > 1 && igal.numbershow ){
                            if ( igal.lang === "en" ){
                                return '<span id="fancybox-title-over">Image ' +  (currentIndex + 1) + ' of ' + currentArray.length + (title ? ": " + title : "") + '</span>';
                            }
                            else{
                                return '<span id="fancybox-title-over">Bild ' +  (currentIndex + 1) + ' von ' + currentArray.length + (title ? ": " + title : "") + '</span>';
                            }
                    
                        }
                        else{
                            return '<span id="fancybox-title-over">' + title + '</span>';
                        }
                    },
                    'onComplete'        : function(){
                        //if user set slideshow = 1 then play slideshow
                        if ( igal.slideshow ){
                            igal.slideshowtimer = setInterval($z.fancybox.next, igal.slideshowinterval);
                        }
                        // add swipe to fancybox
                        $z("#fancybox-content").off("swipe");
                        $z("#fancybox-content").on("swipe", function onSwipe(e, Dx, Dy){
                            if ( Dx < 0 ){ // swipeLeft
                                $z.fancybox.prev();
                            }
                            else if ( Dx > 0 ){ // swipeRight
                                $z.fancybox.next();
                            }
                        });    
                    },
                    'onCleanup'        : function(){
                        //if user set slideshow = 1 then stop slideshow on close of fancybox
                        if ( igal.slideshow ){
                            clearInterval(igal.slideshowtimer);
                        }
                    }
                });
                $z(igal.root + " .fancybox.svg").fancybox({
                    'type':'iframe',
                    'width':'100%',
                    'height':'100%',
                    'hideOnContentClick': true,
                    'padding': 0,    //Space between FancyBox wrapper and content
                    'margin': 30,    //Space between viewport and FancyBox wrapper
                    'cyclic'         : !igal.ispaging, 
                    'centerOnScroll': true,
                    'changeSpeed'    : 0, 
                    'changeFade'    : igal.changeFade,
                    'speedIn'        : 300,
                    'speedOut'        : 300,
                    'transitionIn'    : igal.zoom,
                    'transitionOut'    : igal.zoom, 
                    'easingIn'        : 'easeOutCubic', 
                    'easingOut'        : 'easeInCubic', 
                    'titleShow'        : igal.titleshow,
                    'overlayColor'    : igal.overlaycolor,
                    'overlayOpacity': 0.85,
                    'titlePosition'    : igal.titleposition,
                    'titleFormat'    : function(title, currentArray, currentIndex) {
                        if ( typeof igal.htmltitle != 'undefined' && igal.htmltitle !== null && igal.htmltitle !== "" ){
                            // single image
                            title = igal.htmltitle;
                        }
                        else{
                            // slideshow or gallery where data-attr ist set with the anchor
                            var htmlTitle = $z(igal.root + " .fancybox").eq(currentIndex).data("htmltitle");
                            if ( htmlTitle && htmlTitle != "" ){
                                title = safe_decodeURI(htmlTitle);
                            }
                        }
                        // add a classname to links in the lightbox
                        title = title.replace(/<a href/g,'<a class="zpigaltitlelb" href');
                        if ( currentArray.length > 1 && igal.numbershow ){
                            if ( igal.lang === "en" ){
                                return '<span id="fancybox-title-over">Image ' +  (currentIndex + 1) + ' of ' + currentArray.length + (title ? ": " + title : "") + '</span>';
                            }
                            else{
                                return '<span id="fancybox-title-over">Bild ' +  (currentIndex + 1) + ' von ' + currentArray.length + (title ? ": " + title : "") + '</span>';
                            }
                    
                        }
                        else{
                            return '<span id="fancybox-title-over">' + title + '</span>';
                        }
                    },
                    'onComplete'        : function(){
                        //if user set slideshow = 1 then play slideshow
                        if ( igal.slideshow ){
                            igal.slideshowtimer = setInterval($z.fancybox.next, igal.slideshowinterval);
                        }
                        // add swipe to fancybox
                        $z("#fancybox-content").off("swipe");
                        $z("#fancybox-content").on("swipe", function onSwipe(e, Dx, Dy){
                            if ( Dx < 0 ){ // swipeLeft
                                $z.fancybox.prev();
                            }
                            else if ( Dx > 0 ){ // swipeRight
                                $z.fancybox.next();
                            }
                        });    
                    },
                    'onCleanup'        : function(){
                        //if user set slideshow = 1 then stop slideshow on close of fancybox
                        if ( igal.slideshow ){
                            clearInterval(igal.slideshowtimer);
                        }
                    }
                });
            }
        
            // style the fancybox anchors
            var head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        
            if ( igal.kind === "singleimage" ){
                var mystyles = "    .zpColumnItem:not(:last-child) " + igal.root + "{overflow: hidden;";
                mystyles += " width: " + igal.width + "; float: none !important; margin-bottom: 5px;";
                mystyles += "}\n";
            }
            else{
                var mystyles = "    " + igal.root + "{overflow: hidden;";
                if (igal.kind === "singleimageleft"){
                    mystyles += " width: " + igal.width + "; min-height: " + igal.height + "; float: left; margin-right: 20px; margin-bottom: 5px;";
                }
                else if (igal.kind === "singleimageright"){
                    mystyles += " width: " + igal.width + "; min-height: " + igal.height + "; float: right; margin-left: 20px; margin-bottom: 5px;";
                }
                else if (igal.kind === "singleimagecenter"){
                    mystyles += " width: " + igal.width + "; float: none !important; margin: 0 auto 5px auto;";
                }
                else if (igal.kind === "singleimager"){
                    mystyles += " width: " + igal.width + "; float: none !important; margin: 0 0 5px auto;";
                }
                mystyles += "}\n";
            }
            mystyles += igal.root + "[data-kind=singleimage] > a { \
                margin: 0 !important; \
            }\n";    

            mystyles += igal.root + "[data-kind='singleimage'] > a, " + igal.root + "[data-kind='singleimage'] .slide > a { \
                    width: " + igal.width + "; \
                    height: " + igal.height + "; \
                    box-sizing: border-box; \
                    margin: 0 " + igal.marginhor + "px " + igal.margin + "px 0;";
                
        
            if ( igal.bordercolor == "default" ){
                mystyles += "";
            }
            else if ( igal.bordercolor !== "transparent" ){
                mystyles += "    border: " + igal.borderwidth + "px solid " + igal.bordercolor + "; box-sizing: border-box;";
            }
            else{
                mystyles += "    border: none " + ";";
            }
        
            mystyles += "        padding: 0px; \
                    display: inline-block; \
                    text-align: center; \
                    vertical-align: middle; \
                    overflow: hidden; \
                }";
    
                //we need to switch borders off, since they would possibly be cut off anyway when portrait and landscape imgs are mixed and imgs will be cropped
                mystyles += igal.root +" > a img { \
                    border: none !important;}";
                            
            var rules = document.createTextNode(mystyles.replace(/\s+/g,' '));
            style.type = 'text/css';
            if(style.styleSheet){
                    style.styleSheet.cssText = rules.nodeValue;
            }
            else{
                style.appendChild(rules);
            }
            head.appendChild(style);
        };
        
        function safe_decodeURI(uri){
            return decodeURI(uri.replace(/%(?![0-9a-fA-F][0-9a-fA-F]+)/g, '%25'));
        };
    
        function renderGallery(data, page, imagesPerPage, articleid, effectclass){
            var result = "";
        
            for (i = (page*imagesPerPage)-imagesPerPage; i < data.images.length; i++ ){
                if ( imagesPerPage > 0 && i >= (page * imagesPerPage) ){
                    break;
                }
                var image = data.images[i];
            
                result += '<div class="gallery-item ' + image.thumbTitlePosition + '">';
                result += '    <a class="fancybox zpnolayoutlinkstyles" href="' + image.imagePath + '" title="' + image.description + '" data-htmltitle="' + encodeURI(image.encodedDescription) + '" data-fancybox-group="g' + igal.articleid + '" aria-label="Bild in Lightbox öffnen (open image in lightbox)">';
                if (igal.template == "flex"){
                    result += '    <img class="' + effectclass + '" src="' + image.thumbPath + '" title="' + image.description + '" alt="' + image.altText + '" />';
                }
                else{
                    result += '    <img class="' + effectclass + '" src="' + image.thumbPath + '" width="' + image.width + '" title="' + image.description + '" alt="' + image.altText + '" />';
                }
                result += '    </a>';
                if ( safe_decodeURI(image.encodedDescription) ){
                    result += '    <div class="zpiacaption ' + image.thumbTitlePosition + '"><span>' + safe_decodeURI(image.encodedDescription) + ' &nbsp;</span></div>';
                }
                result += '</div>';
            
                if ( imagesPerPage > 0 && i >= (page * imagesPerPage)-1 ){
                    result += '<div class="gallery-item last"></div>';
                }
            }
            return result;
        }
    };
    
    zp.Slideshow = function (){
        this.root = null;
        this.slideshowinterval = 5000;
        this.pauseonhover = true;
        var sshow = this;
    
        this.init = function (elemid){
            sshow.root = elemid;
            sshow.slideshowinterval = $z(sshow.root).data("slideshowinterval") * 1000;
            sshow.pauseonhover = $z(sshow.root).data("pauseonhover")!==0?true:false;
            // hide all slides except first
            $z(elemid + ' div.slide:not(:first)').css("opacity", "0");
            // start the slideshow
            sshow.slideshow = setInterval( function() { sshow.slideSwitch(elemid); }, sshow.slideshowinterval );
            // handle swipes
            $z(sshow.root).on("swipe", function onSwipe(e, Dx, Dy){
                if ( Dx !== 0 ){  //horizontalSwipe
                    // reset the slider auto play timer
                    clearInterval(sshow.slideshow);
                    sshow.slideshow = setInterval( function() { sshow.slideSwitch(elemid); }, sshow.slideshowinterval );
                }
                if ( Dx < 0 ){ // swipeLeft
                    sshow.slideSwitch(elemid, "prev");
                }
                else if ( Dx > 0 ){ // swipeRight
                    sshow.slideSwitch(elemid, "next");
                }
            });
            // handle arrow keys
            $z(sshow.root).hover(function() {
                if (sshow.pauseonhover){
                    clearInterval(sshow.slideshow);
                }
                $z(document).keydown(function(event) {
                    // 37 = left arrow - 39 = right arrow
                    if ( event.which === 37 ){
                        sshow.slideSwitch(elemid, "prev");
                    }
                    else if ( event.which === 39 ){
                        sshow.slideSwitch(elemid, "next");
                    }
                });
            }, function() {
                // unbind the keydown handler on mouseleave
                 $z(document).unbind("keydown");
                // restart the slideshow
                if (sshow.pauseonhover){
                    sshow.slideshow = setInterval( function() { sshow.slideSwitch(elemid); }, sshow.slideshowinterval );
                }
            });
        };
    
        this.slideSwitch = function (elemid, direction) {
            direction = typeof direction !== 'undefined' ? direction : 'next';
    
            var $active = $z(elemid + ' div.slide.active');
            if ( $active.length === 0 ){ $active = $z(elemid + ' div.slide:first');}
            var $next;
            if ( direction === "next" ){
                $next = $active.next(".slide").length ? $active.next(".slide") : $z(elemid + ' div.slide:first');
            }
            else if ( direction === "prev" ){
                $next = $active.prev(".slide").length ? $active.prev(".slide") : $z(elemid + ' div.slide:last');
            }

            $active.addClass('last-active')
                .css({"z-index": 101});

            $next.css({"opacity": "0.0"})
                    .addClass('active')
                    .css({"z-index": 102}) 
                    .animate({"opacity": "1.0"}, 500, function() {
                            $active.removeClass('active last-active')
                            .css({"z-index": "100", "opacity": "0"});
            });
        };
    };

    // initialize each zpImageGallery
    $z(".zpImageGallery[id]").each(function (){
        new zp.ImageGallery().init("#" + this.id.toString());
    });
    
    //play each zpSlideshow (part of zpImageGallery)
    $z(".zpSlideshow[id]").each(function (){
        new zp.Slideshow().init("#" + this.id.toString());
    });
    
    // handle special design-blocks (grosses bild links/rechts
    $z(document).ready(function() {
        $z('.zpwBild.zpWideImageLeft').parents('.zpContainer').addClass('zpWideImageLeft');
        $z('.zpwBild.zpWideImageRight').parents('.zpContainer').addClass('zpWideImageRight');
        $z('.zpwBild.zpWideImageLeft, .zpwBild.zpWideImageRight').parents('.zpRow').addClass('zpWideImage');
        $z('.zpwBild.zpWideImageLeft, .zpwBild.zpWideImageRight').parents('.zpColumn').addClass('zpWideImage');
    });
});

$z(window).on('load', function() {        
    var fadeduration = 300;
    var zoomEvent = "click";
    var zoomThreshold = 1.2;
    
    var zoomInCallback = function(){
        $z(this).addClass("zoomed");
        var currentContainer = $z(this).parents("div.zoomable");
        var currentImage = currentContainer.find("img:first");
        var borderRadius = currentImage.css("border-radius");
        var border = currentImage.css("border");
        var boxShadow = currentImage.css("box-shadow");
        
        // add image styles to container, so that image styles are inherited from the image
        currentContainer.css("border-radius", borderRadius);
        currentContainer.css("border", border);
        currentContainer.css("box-shadow", boxShadow);
    };
    var zoomOutCallback = function(){
        $z(this).removeClass("zoomed");
        var currentContainer = $z(this).parents("div.zoomable");
        // remove image styles from container after a delay (fadeduration), so animations can finish
        setTimeout(function() { 
            currentContainer.css("border-radius", "");
            currentContainer.css("border", "");
            currentContainer.css("box-shadow", "");    
        },fadeduration);
    };
    
    // zoomed product images    
    $z('.zpwBild .productimage.zoomable').each(function(e){
        var that = $(this);
        var currentImage = that.find("img:first");
        var displayedWidth = parseInt(currentImage.css("width"));
        var zoomUrl = that.attr("data-zoom");
        
        
        if ( zoomUrl ){
            // only zoom if image in data-zoom is wider than currently displayed image
            var zoomImg = new Image();
            zoomImg.src = zoomUrl;
            zoomImg.onload = function() {
                if ( displayedWidth * zoomThreshold < zoomImg.naturalWidth ){
                    that.zoom({onZoomIn: zoomInCallback, onZoomOut: zoomOutCallback, duration: fadeduration, on: zoomEvent, url: zoomUrl});
                }
            };
        } else {
            // only zoom if image is actually wider than already displayed
            currentImage.eq(0).onload = function(){
                if ( displayedWidth * zoomThreshold < that.find("img:first").get(0).naturalWidth ){
                    that.zoom({onZoomIn: zoomInCallback, onZoomOut: zoomOutCallback, duration: fadeduration, on: zoomEvent});
                }
            };
        }
    });
    // trigger mouseover on image which is overlayed by zoom-image
    $z('.zpwBild .productimage.zoomable').each(function(e){
        $z(this).off('mouseenter.zoomable');
        $z(this).on('mouseenter.zoomable', function(e){
            $(this).find("img:first").addClass('hover');
        });
        $z(this).off('mouseleave.zoomable');
        $z(this).on('mouseleave.zoomable', function(e){
            $(this).find("img:first").removeClass('hover');
        });
    });
    
});

/*!
    Zoom 1.7.18
    license: MIT
    http://www.jacklmoore.com/zoom
*/
// used in singleImage and shop "articleDetails"!
(function ($) {
    var defaults = {
        url: false,
        callback: false,
        target: false,
        duration: 120,
        on: 'mouseover', // other options: grab, click, toggle
        touch: true, // enables a touch fallback
        onZoomIn: false,
        onZoomOut: false,
        magnify: 1
    };

    // Core Zoom Logic, independent of event listeners.
    $.zoom = function(target, source, img, magnify) {
        var targetHeight,
            targetWidth,
            sourceHeight,
            sourceWidth,
            xRatio,
            yRatio,
            offset,
            $target = $(target),
            position = $target.css('position'),
            $source = $(source);
            
            // Added by StS: cancel zoom if zoom image is not as wide as original image's container
            if ( $source.outerWidth() > img.width){
                //return;
            }

        // The parent element needs positioning so that the zoomed element can be correctly positioned within.
        target.style.position = /(absolute|fixed)/.test(position) ? position : 'relative';
        target.style.overflow = 'hidden';
        img.style.width = img.style.height = '';

        $(img)
            .addClass('zoomImg')
            .css({
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
                width: img.width * magnify,
                height: img.height * magnify,
                border: 'none',
                maxWidth: 'none',
                maxHeight: 'none'
            })
            .appendTo(target);

        return {
            init: function() {
                targetWidth = $target.outerWidth();
                targetHeight = $target.outerHeight();

                if (source === target) {
                    sourceWidth = targetWidth;
                    sourceHeight = targetHeight;
                } else {
                    sourceWidth = $source.outerWidth();
                    sourceHeight = $source.outerHeight();
                }

                xRatio = (img.width - targetWidth) / sourceWidth;
                yRatio = (img.height - targetHeight) / sourceHeight;

                offset = $source.offset();
            },
            move: function (e) {
                var left = (e.pageX - offset.left),
                    top = (e.pageY - offset.top);

                top = Math.max(Math.min(top, sourceHeight), 0);
                left = Math.max(Math.min(left, sourceWidth), 0);

                img.style.left = (left * -xRatio) + 'px';
                img.style.top = (top * -yRatio) + 'px';
            }
        };
    };

    $.fn.zoom = function (options) {
        return this.each(function () {
            var
            settings = $.extend({}, defaults, options || {}),
            //target will display the zoomed image
            target = settings.target && $(settings.target)[0] || this,
            //source will provide zoom location info (thumbnail)
            source = this,
            $source = $(source),
            img = document.createElement('img'),
            $img = $(img),
            mousemove = 'mousemove.zoom',
            clicked = false,
            touched = false;

            // If a url wasn't specified, look for an image element.
            if (!settings.url) {
                var srcElement = source.querySelector('img');
                if (srcElement) {
                    settings.url = srcElement.getAttribute('data-src') || srcElement.currentSrc || srcElement.src;
                }
                if (!settings.url) {
                    return;
                }
            }

            $source.one('zoom.destroy', function(position, overflow){
                $source.off(".zoom");
                target.style.position = position;
                target.style.overflow = overflow;
                img.onload = null;
                $img.remove();
            }.bind(this, target.style.position, target.style.overflow));

            img.onload = function () {
                var zoom = $.zoom(target, source, img, settings.magnify);

                function start(e) {
                    zoom.init();
                    zoom.move(e);

                    // Skip the fade-in for IE8 and lower since it chokes on fading-in
                    // and changing position based on mousemovement at the same time.
                    $img.stop()
                    .fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
                }

                function stop() {
                    $img.stop()
                    .fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
                }

                // Mouse events
                if (settings.on === 'grab') {
                    $source
                        .on('mousedown.zoom',
                            function (e) {
                                if (e.which === 1) {
                                    $(document).one('mouseup.zoom',
                                        function () {
                                            stop();

                                            $(document).off(mousemove, zoom.move);
                                        }
                                    );

                                    start(e);

                                    $(document).on(mousemove, zoom.move);

                                    e.preventDefault();
                                }
                            }
                        );
                } else if (settings.on === 'click') {
                    $source.on('click.zoom',
                        function (e) {
                            if (clicked) {
                                // bubble the event up to the document to trigger the unbind.
                                return;
                            } else {
                                clicked = true;
                                start(e);
                                $(document).on(mousemove, zoom.move);
                                $(document).one('click.zoom',
                                    function () {
                                        stop();
                                        clicked = false;
                                        $(document).off(mousemove, zoom.move);
                                    }
                                );
                                return false;
                            }
                        }
                    );
                } else if (settings.on === 'toggle') {
                    $source.on('click.zoom',
                        function (e) {
                            if (clicked) {
                                stop();
                            } else {
                                start(e);
                            }
                            clicked = !clicked;
                        }
                    );
                } else if (settings.on === 'mouseover') {
                    zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

                    $source
                        .on('mouseenter.zoom', start)
                        .on('mouseleave.zoom', stop)
                        .on(mousemove, zoom.move);
                }

                // Touch fallback
                if (settings.touch) {
                    if (settings.on !== 'click'){ //added by sseiz to improve page scrolling possibilities
                        $source.on('touchstart.zoom', function (e) {
                            e.preventDefault();
                            if (touched) {
                                touched = false;
                                stop();
                            } else {
                                touched = true;
                                start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
                            }
                        })
                    }
                    $source.on('touchmove.zoom', function (e) {
                        if (clicked) {
                            e.preventDefault();
                        }
                        zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
                    })
                    if (settings.on !== 'click'){    //added by sseiz to improve page scrolling possibilities
                        $source.on('touchend.zoom', function (e) {
                            e.preventDefault();
                            if (touched) {
                                touched = false;
                                stop();
                            }
                        });
                    }
                }
                
                if ($.isFunction(settings.callback)) {
                    settings.callback.call(img);
                }
            };

            img.src = settings.url;
        });
    };

    $.fn.zoom.defaults = defaults;
}($z));

/*! $Id: zptabledata.js 2020-03-25 08:11:37 +0000 Stefan Seiz  3d93f37b8e671f6f33a3d7907ff3b8a8c5ed823c $ */

// make first column fixed (non scrolling)
// http://jsfiddle.net/4XG7T/3/

$z(document).ready(function () {
    $z('table.zptabledata[data-kind="firstfixed"]').each(function(){
        var $table = $z(this);
        var $fixedColumn = $table.clone().insertBefore($table).addClass('zpfixed-column').css('border-collapse', 'collapse');
        var minwidth = $table.attr("data-fixedwidth");
        var maxwidth = parseInt(minwidth) + 10;

        $fixedColumn.removeClass("zptabledata").removeAttr("id").removeAttr("data-kind").removeAttr("data-fixedbg").removeAttr("data-fixedwidth");
        $fixedColumn.css("max-width", maxwidth +"px");
        $fixedColumn.find('td').css("min-width", minwidth+"px");
        $table.find('th::first-child,td:first-child').css('visibility', 'hidden').css("min-width", minwidth+"px");;
        $fixedColumn.find('th:not(:first-child),td:not(:first-child)').css('visibility', 'hidden');
        $fixedColumn.css("background-color", $table.attr("data-fixedbg"));
    });
    
    var inverse = false;
    var mySorter = function (a, b){
        // natural sort
        var insensitive = true;
        var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
           //sre = /(^[ ]*|[ ]*$)/g,
           sre = /([ ])/g,
           // only support german date formatting mm.dd.yyyy
           //dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-\.]\d{1,4}[\/\-\.]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
           dre = /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/,
           //hre = /^0x[0-9a-f]+$/i,
           hre = /^[0-9.,]+\s?[$€£¥m]?(km|cm|mm|mi|pt|px)?$/gi,
           i = function (s) { return insensitive && ('' + s).toLowerCase() || '' + s },
           // convert all to strings strip whitespace
           x = i($.text([a])).replace(sre, '') || '',
           y = i($.text([b])).replace(sre, '') || '',
           // chunk/tokenize
           xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
           yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
           // numeric, currency or date detection
           xC = x.match(hre) ? x.match(hre).join("").replace(/[^0-9]/g, "") : "",
           yC = y.match(hre) ? y.match(hre).join("").replace(/[^0-9]/g, "") : "",
           xD = parseInt(xC) || (xN.length != 1 && x.match(dre) && Date.parse(x.match(dre)[3] + "-" + x.match(dre)[2] + "-" + x.match(dre)[1])),
           yD = parseInt(yC) || xD && y.match(dre) && Date.parse(y.match(dre)[3] + "-" + y.match(dre)[2] + "-" + y.match(dre)[1]) || null;
        // first try and sort Hex codes or Dates
        if (yD) {
            return xD > yD ?
            inverse ? -1 : 1
            : inverse ? 1 : -1;
        }
        //number to string
        if (isNaN(x) !== isNaN(y)) {
            return isNaN(x) ?
            inverse ? -1 : 1
            : inverse ? 1 : -1;
        }
            //string to string
        else if (isNaN(x) === isNaN(y)) {
            if (isNaN(x)) {
                return x > y ?
                inverse ? -1 : 1
                : inverse ? 1 : -1;
            }
            else {
                return parseInt(x) > parseInt(y) ?
                inverse ? -1 : 1
                : inverse ? 1 : -1;
            }
        }
        return 0;

    }
    
    function isOdd(num) { return num % 2;}
    function fixZebra(table, oddRowStyle, evenRowStyle){
        // fix potential zebra-stripe styling 
        $("tr:not(:first)", table).each(function( index, value){
            if ( isOdd(index) ){
                $(this).attr('style', oddRowStyle);
            }
            else{
                $(this).attr('style', evenRowStyle);
            }
        });
    }
    // make tables sortable client side if a link in TH is clicked
    $("table.zptabledata.sortable.clientside").each(function () {
        var table = $(this);
        var oddRowStyle =  table.find('tr').eq(1).attr('style') || "";
        var evenRowStyle = table.find('tr').eq(2).attr('style') || "";
        $("th", table).each(function () {
            var th = $(this),
                thIndex = th.index();
            // sort default column
            if ( th.hasClass("sorted") ){
                console.log("thIndex sorted column: " + thIndex);
                th.addClass("asc");
                table.find("> tbody > tr > td").filter(function () {
                    return $(this).index() === thIndex;
                }).sortElements(
                    mySorter,
                    function () {
                        //parentNote is the element we want to move
                        return this.parentNode;
                    }
                );
                inverse = !inverse;
            }
            fixZebra(table, oddRowStyle, evenRowStyle)
            
            // sort by clicked column
            th.click(function () {
                $("th", table).not(this).removeClass("sorted asc desc");
                
                if ( $(this).hasClass("sorted") ) {
                    if ( $(this).hasClass("asc") ) {
                        $(this).removeClass("asc");
                        $(this).addClass("desc");
                    }
                    else {
                        $(this).removeClass("desc");
                        $(this).addClass("asc");
                    }
                }
                else {
                    $(this).addClass("sorted"); //inidcates which column is sorted by
                    $(this).addClass("asc");
                }

                if ( $(table).hasClass("clientside") ) {
                    table.find("> tbody > tr > td").filter(function () {
                        return $(this).index() === thIndex;
                    }).sortElements(
                        mySorter,
                        function () {
                            //parentNote is the element we want to move
                            return this.parentNode;
                        }
                    );
                    inverse = !inverse;
                }
                fixZebra(table, oddRowStyle, evenRowStyle)
            });

        });
    });
});

/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function () {

    var sort = [].sort;

    return function (comparator, getSortable) {

        getSortable = getSortable || function () { return this; };

        var placements = this.map(function () {

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function () {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function (i) {
            placements[i].call(getSortable.call(this));
        });

    };

})();

!function(c){var d,s,n,i,e,h,a,o,r,f,t,l,u,p=0,g={},b=[],y=0,w={},x=[],m=null,v=new Image,I=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,O=/[^\.]\.(swf)\s*$/i,C=1,M=0,j="",k=!1,S=c.extend(c("<div/>")[0],{prop:0}),P=c.browser.msie&&c.browser.version<7&&!window.XMLHttpRequest,Q=function(){s.hide(),v.onerror=v.onload=null,m&&m.abort(),d.empty()},T=function(){if(!1===g.onError(b,p,g))return s.hide(),void(k=!1);g.titleShow=!1,g.width="auto",g.height="auto",d.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'),E()},B=function(){var i,t,e,n,a,o,r=b[p];if(Q(),g=c.extend({},c.fn.fancybox.defaults,void 0===c(r).data("fancybox")?g:c(r).data("fancybox")),!1!==(o=g.onStart(b,p,g)))if("object"==typeof o&&(g=c.extend(g,o)),e=g.title||(r.nodeName?c(r).attr("title"):r.title)||"",r.nodeName&&!g.orig&&(g.orig=c(r).children("img:first").length?c(r).children("img:first"):c(r)),""===e&&g.orig&&g.titleFromAlt&&(e=g.orig.attr("alt")),i=g.href||(r.nodeName?c(r).attr("href"):r.href)||null,(/^(?:javascript)/i.test(i)||"#"==i)&&(i=null),g.type?(t=g.type,i||(i=g.content)):g.content?t="html":i&&(t=i.match(I)?"image":i.match(O)?"swf":c(r).hasClass("iframe")?"iframe":0===i.indexOf("#")?"inline":"ajax"),t)switch("inline"==t&&(r=i.substr(i.indexOf("#")),t=0<c(r).length?"inline":"ajax"),g.type=t,g.href=i,g.title=e,g.autoDimensions&&("html"==g.type||"inline"==g.type||"ajax"==g.type?(g.width="auto",g.height="auto"):g.autoDimensions=!1),g.modal&&(g.overlayShow=!0,g.hideOnOverlayClick=!1,g.hideOnContentClick=!1,g.enableEscapeButton=!1,g.showCloseButton=!1),g.padding=parseInt(g.padding,10),g.margin=parseInt(g.margin,10),d.css("padding",g.padding+g.margin),c(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){c(this).replaceWith(h.children())}),t){case"html":d.html(g.content),E();break;case"inline":if(!0===c(r).parent().is("#fancybox-content"))return void(k=!1);c('<div class="fancybox-inline-tmp" />').hide().insertBefore(c(r)).bind("fancybox-cleanup",function(){c(this).replaceWith(h.children())}).bind("fancybox-cancel",function(){c(this).replaceWith(d.children())}),c(r).appendTo(d),E();break;case"image":k=!1,c.fancybox.showActivity(),(v=new Image).onerror=function(){T()},v.onload=function(){k=!0,v.onerror=v.onload=null,A()},v.src=i;break;case"swf":g.scrolling="no",n='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+g.width+'" height="'+g.height+'"><param name="movie" value="'+i+'"></param>',a="",c.each(g.swf,function(t,e){n+='<param name="'+t+'" value="'+e+'"></param>',a+=" "+t+'="'+e+'"'}),n+='<embed src="'+i+'" type="application/x-shockwave-flash" width="'+g.width+'" height="'+g.height+'"'+a+"></embed></object>",d.html(n),E();break;case"ajax":k=!1,c.fancybox.showActivity(),g.ajax.win=g.ajax.success,m=c.ajax(c.extend({},g.ajax,{url:i,data:g.ajax.data||{},error:function(t,e,n){0<t.status&&T()},success:function(t,e,n){if(200==("object"==typeof n?n:m).status){if("function"==typeof g.ajax.win){if(!1===(o=g.ajax.win(i,t,e,n)))return void s.hide();"string"!=typeof o&&"object"!=typeof o||(t=o)}d.html(t),E()}}}));break;case"iframe":D()}else T();else k=!1},E=function(){var t=g.width,e=g.height;t=-1<t.toString().indexOf("%")?parseInt((c(window).width()-2*g.margin)*parseFloat(t)/100,10)+"px":"auto"==t?"auto":t+"px",e=-1<e.toString().indexOf("%")?parseInt((c(window).height()-2*g.margin)*parseFloat(e)/100,10)+"px":"auto"==e?"auto":e+"px",d.wrapInner('<div style="width:'+t+";height:"+e+";overflow: "+("auto"==g.scrolling?"auto":"yes"==g.scrolling?"scroll":"hidden")+';position:relative;"></div>'),g.width=d.width(),g.height=d.height(),D()},A=function(){g.width=v.width,g.height=v.height,c("<img />").attr({id:"fancybox-img",src:v.src,alt:g.title}).appendTo(d),D()},D=function(){var t,e;return s.hide(),i.is(":visible")&&!1===w.onCleanup(x,y,w)?(c(".fancybox-inline-tmp").trigger("fancybox-cancel"),void(k=!1)):(k=!0,c(h.add(n)).unbind(),c(window).unbind("resize.fb scroll.fb"),c(document).unbind("keydown.fb"),i.is(":visible")&&"outside"!==w.titlePosition&&i.css("height",i.height()),x=b,y=p,(w=g).overlayShow?(n.css({"background-color":w.overlayColor,opacity:w.overlayOpacity,cursor:w.hideOnOverlayClick?"pointer":"auto",height:c(document).height()}),n.is(":visible")||(P&&c("select:not(#fancybox-tmp select)").filter(function(){return"hidden"!==this.style.visibility}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"}),n.show())):n.hide(),u=H(),F(),i.is(":visible")?(c(a.add(r).add(f)).hide(),t=i.position(),l={top:t.top,left:t.left,width:i.width(),height:i.height()},e=l.width==u.width&&l.height==u.height,void h.fadeTo(w.changeFade,.3,function(){var t=function(){h.html(d.contents()).fadeTo(w.changeFade,1,N)};c(".fancybox-inline-tmp").trigger("fancybox-change"),h.empty().removeAttr("filter").css({"border-width":w.padding,width:u.width-2*w.padding,height:g.autoDimensions?"auto":u.height-M-2*w.padding}),e?t():(S.prop=0,c(S).animate({prop:1},{duration:w.changeSpeed,easing:w.easingChange,step:q,complete:t}))})):(i.removeAttr("style"),h.css("border-width",w.padding),"elastic"==w.transitionIn?(l=R(),h.html(d.contents()),i.show(),w.opacity&&(u.opacity=0),S.prop=0,void c(S).animate({prop:1},{duration:w.speedIn,easing:w.easingIn,step:q,complete:N})):("inside"==w.titlePosition&&0<M&&o.show(),h.css({width:u.width-2*w.padding,height:g.autoDimensions?"auto":u.height-M-2*w.padding}).html(d.contents()),void i.css(u).fadeIn("none"==w.transitionIn?0:w.speedIn,N))))},F=function(){var t;if(j=w.title||"",M=0,o.empty().removeAttr("style").removeClass(),!1!==w.titleShow)if((j=c.isFunction(w.titleFormat)?w.titleFormat(j,x,y,w):!(!(t=j)||!t.length)&&("float"==w.titlePosition?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+t+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+w.titlePosition+'">'+t+"</div>"))&&""!==j){switch(o.addClass("fancybox-title-"+w.titlePosition).html(j).appendTo("body").show(),w.titlePosition){case"inside":o.css({width:u.width-2*w.padding,marginLeft:w.padding,marginRight:w.padding}),M=o.outerHeight(!0),o.appendTo(e),u.height+=M;break;case"over":o.css({marginLeft:w.padding,width:u.width-2*w.padding,bottom:w.padding}).appendTo(e);break;case"float":o.css("left",-1*parseInt((o.width()-u.width-40)/2,10)).appendTo(i);break;default:o.css({width:u.width-2*w.padding,paddingLeft:w.padding,paddingRight:w.padding}).appendTo(i)}o.hide()}else o.hide();else o.hide()},N=function(){c.support.opacity||(h.get(0).style.removeAttribute("filter"),i.get(0).style.removeAttribute("filter")),g.autoDimensions&&h.css("height","auto"),i.css("height","auto"),j&&j.length&&o.show(),w.showCloseButton&&a.show(),function(){if((w.enableEscapeButton||w.enableKeyboardNav)&&c(document).bind("keydown.fb",function(t){27==t.keyCode&&w.enableEscapeButton?(t.preventDefault(),c.fancybox.close()):37!=t.keyCode&&39!=t.keyCode||!w.enableKeyboardNav||"INPUT"===t.target.tagName||"TEXTAREA"===t.target.tagName||"SELECT"===t.target.tagName||(t.preventDefault(),c.fancybox[37==t.keyCode?"prev":"next"]())}),!w.showNavArrows)return r.hide(),f.hide();(w.cyclic&&1<x.length||0!==y)&&r.show(),(w.cyclic&&1<x.length||y!=x.length-1)&&f.show()}(),w.hideOnContentClick&&h.bind("click",c.fancybox.close),w.hideOnOverlayClick&&n.bind("click",c.fancybox.close),c(window).bind("resize.fb",c.fancybox.resize),w.centerOnScroll&&c(window).bind("scroll.fb",c.fancybox.center),"iframe"==w.type&&c('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(c.browser.msie?'allowtransparency="true""':"")+' scrolling="'+g.scrolling+'" src="'+w.href+'"></iframe>').appendTo(h),i.show(),k=!1,c.fancybox.center(),w.onComplete(x,y,w),L()},L=function(){var t;x.length-1>y&&void 0!==(t=x[y+1].href)&&t.match(I)&&((new Image).src=t),0<y&&void 0!==(t=x[y-1].href)&&t.match(I)&&((new Image).src=t)},q=function(t){var e={width:parseInt(l.width+(u.width-l.width)*t,10),height:parseInt(l.height+(u.height-l.height)*t,10),top:parseInt(l.top+(u.top-l.top)*t,10),left:parseInt(l.left+(u.left-l.left)*t,10)};void 0!==u.opacity&&(e.opacity=t<.5?.5:t),i.css(e),h.css({width:e.width-2*w.padding,height:e.height-M*t-2*w.padding})},z=function(){return[c(window).width()-2*w.margin,c(window).height()-2*w.margin,c(document).scrollLeft()+w.margin,c(document).scrollTop()+w.margin]},H=function(){var t,e=z(),n={},i=w.autoScale,a=2*w.padding;return-1<w.width.toString().indexOf("%")?n.width=parseInt(e[0]*parseFloat(w.width)/100,10):n.width=w.width+a,-1<w.height.toString().indexOf("%")?n.height=parseInt(e[1]*parseFloat(w.height)/100,10):n.height=w.height+a,i&&(n.width>e[0]||n.height>e[1])&&("image"==g.type||"swf"==g.type?(t=w.width/w.height,n.width>e[0]&&(n.width=e[0],n.height=parseInt((n.width-a)/t+a,10)),n.height>e[1]&&(n.height=e[1],n.width=parseInt((n.height-a)*t+a,10))):(n.width=Math.min(n.width,e[0]),n.height=Math.min(n.height,e[1]))),n.top=parseInt(Math.max(e[3]-20,e[3]+.5*(e[1]-n.height-40)),10),n.left=parseInt(Math.max(e[2]-20,e[2]+.5*(e[0]-n.width-40)),10),n},R=function(){var t,e,n,i,a=!!g.orig&&c(g.orig);return a&&a.length?((i=(n=a).offset()).top+=parseInt(n.css("paddingTop"),10)||0,i.left+=parseInt(n.css("paddingLeft"),10)||0,i.top+=parseInt(n.css("border-top-width"),10)||0,i.left+=parseInt(n.css("border-left-width"),10)||0,i.width=n.width(),i.height=n.height(),{width:(t=i).width+2*w.padding,height:t.height+2*w.padding,top:t.top-w.padding-20,left:t.left-w.padding-20}):(e=z(),{width:2*w.padding,height:2*w.padding,top:parseInt(e[3]+.5*e[1],10),left:parseInt(e[2]+.5*e[0],10)})},K=function(){s.is(":visible")?(c("div",s).css("top",-40*C+"px"),C=(C+1)%12):clearInterval(t)};c.fn.fancybox=function(t){return c(this).length&&c(this).data("fancybox",c.extend({},t,c.metadata?c(this).metadata():{})).unbind("click.fb").bind("click.fb",function(t){if(t.preventDefault(),!k){k=!0,c(this).blur(),b=[],p=0;var e=c(this).attr("data-fancybox-group")||"";e&&""!=e&&"nofollow"!==e?(b=c("a[data-fancybox-group="+e+"], area[data-fancybox-group="+e+"]"),p=b.index(this)):b.push(this),B()}}),this},c.fancybox=function(t){var e;if(!k){if(k=!0,e=void 0!==arguments[1]?arguments[1]:{},b=[],p=parseInt(e.index,10)||0,c.isArray(t)){for(var n=0,i=t.length;n<i;n++)"object"==typeof t[n]?c(t[n]).data("fancybox",c.extend({},e,t[n])):t[n]=c({}).data("fancybox",c.extend({content:t[n]},e));b=jQuery.merge(b,t)}else"object"==typeof t?c(t).data("fancybox",c.extend({},e,t)):t=c({}).data("fancybox",c.extend({content:t},e)),b.push(t);(p>b.length||p<0)&&(p=0),B()}},c.fancybox.showActivity=function(){clearInterval(t),s.show(),t=setInterval(K,66)},c.fancybox.hideActivity=function(){s.hide()},c.fancybox.next=function(){return c.fancybox.pos(y+1)},c.fancybox.prev=function(){return c.fancybox.pos(y-1)},c.fancybox.pos=function(t){k||(t=parseInt(t),b=x,-1<t&&t<x.length?(p=t,B()):w.cyclic&&1<x.length&&(p=t>=x.length?0:x.length-1,B()))},c.fancybox.cancel=function(){k||(k=!0,c(".fancybox-inline-tmp").trigger("fancybox-cancel"),Q(),g.onCancel(b,p,g),k=!1)},c.fancybox.close=function(){if(!k&&!i.is(":hidden"))if(k=!0,w&&!1===w.onCleanup(x,y,w))k=!1;else if(Q(),c(a.add(r).add(f)).hide(),c(h.add(n)).unbind(),c(window).unbind("resize.fb scroll.fb"),c(document).unbind("keydown.fb"),h.find("iframe").attr("src",P&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank"),"inside"!==w.titlePosition&&o.empty(),i.stop(),"elastic"==w.transitionOut){l=R();var t=i.position();u={top:t.top,left:t.left,width:i.width(),height:i.height()},w.opacity&&(u.opacity=1),o.empty().hide(),S.prop=1,c(S).animate({prop:0},{duration:w.speedOut,easing:w.easingOut,step:q,complete:e})}else i.fadeOut("none"==w.transitionOut?0:w.speedOut,e);function e(){n.fadeOut("fast"),o.empty().hide(),i.hide(),c(".fancybox-inline-tmp").trigger("fancybox-cleanup"),h.empty(),w.onClosed(x,y,w),x=g=[],y=p=0,w=g={},k=!1}},c.fancybox.resize=function(){n.is(":visible")&&n.css("height",c(document).height()),c.fancybox.center(!0)},c.fancybox.center=function(){var t,e;k||(e=!0===arguments[0]?1:0,t=z(),!e&&(i.width()>t[0]||i.height()>t[1])||i.stop().animate({top:parseInt(Math.max(t[3]-20,t[3]+.5*(t[1]-h.height()-40)-w.padding)),left:parseInt(Math.max(t[2]-20,t[2]+.5*(t[0]-h.width()-40)-w.padding))},"number"==typeof arguments[0]?arguments[0]:200))},c.fancybox.init=function(){c("#fancybox-wrap").length||(c("body").append(d=c('<div id="fancybox-tmp"></div>'),s=c('<div id="fancybox-loading"><div></div></div>'),n=c('<div id="fancybox-overlay"></div>'),i=c('<div id="fancybox-wrap"></div>')),(e=c('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(i)).append(h=c('<div id="fancybox-content"></div>'),a=c('<a id="fancybox-close"></a>'),o=c('<div id="fancybox-title"></div>'),r=c('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span><span class="zp-sronly">Voriges Bild (prev. image)</span></a>'),f=c('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span><span class="zp-sronly">Nächstes Bild (next image)</span></a>')),a.click(c.fancybox.close),s.click(c.fancybox.cancel),r.click(function(t){t.preventDefault(),c.fancybox.prev()}),f.click(function(t){t.preventDefault(),c.fancybox.next()}),c.fn.mousewheel&&i.bind("mousewheel.fb",function(t,e){k?t.preventDefault():0!=c(t.target).get(0).clientHeight&&c(t.target).get(0).scrollHeight!==c(t.target).get(0).clientHeight||(t.preventDefault(),c.fancybox[0<e?"prev":"next"]())}),c.support.opacity||i.addClass("fancybox-ie"),P&&(s.addClass("fancybox-ie6"),i.addClass("fancybox-ie6"),c('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(e)))},c.fn.fancybox.defaults={padding:10,margin:40,opacity:!1,modal:!1,cyclic:!1,scrolling:"auto",width:560,height:340,autoScale:!0,autoDimensions:!0,centerOnScroll:!1,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:!0,hideOnContentClick:!1,overlayShow:!0,overlayOpacity:.7,overlayColor:"#777",titleShow:!0,titlePosition:"float",titleFormat:null,titleFromAlt:!1,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:!0,showNavArrows:!0,enableEscapeButton:!0,enableKeyboardNav:!0,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}},c(document).ready(function(){c.fancybox.init()})}($z),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(t,e,n,i,a){return jQuery.easing[jQuery.easing.def](t,e,n,i,a)},easeInQuad:function(t,e,n,i,a){return i*(e/=a)*e+n},easeOutQuad:function(t,e,n,i,a){return-i*(e/=a)*(e-2)+n},easeInOutQuad:function(t,e,n,i,a){return(e/=a/2)<1?i/2*e*e+n:-i/2*(--e*(e-2)-1)+n},easeInCubic:function(t,e,n,i,a){return i*(e/=a)*e*e+n},easeOutCubic:function(t,e,n,i,a){return i*((e=e/a-1)*e*e+1)+n},easeInOutCubic:function(t,e,n,i,a){return(e/=a/2)<1?i/2*e*e*e+n:i/2*((e-=2)*e*e+2)+n},easeInQuart:function(t,e,n,i,a){return i*(e/=a)*e*e*e+n},easeOutQuart:function(t,e,n,i,a){return-i*((e=e/a-1)*e*e*e-1)+n},easeInOutQuart:function(t,e,n,i,a){return(e/=a/2)<1?i/2*e*e*e*e+n:-i/2*((e-=2)*e*e*e-2)+n},easeInQuint:function(t,e,n,i,a){return i*(e/=a)*e*e*e*e+n},easeOutQuint:function(t,e,n,i,a){return i*((e=e/a-1)*e*e*e*e+1)+n},easeInOutQuint:function(t,e,n,i,a){return(e/=a/2)<1?i/2*e*e*e*e*e+n:i/2*((e-=2)*e*e*e*e+2)+n},easeInSine:function(t,e,n,i,a){return-i*Math.cos(e/a*(Math.PI/2))+i+n},easeOutSine:function(t,e,n,i,a){return i*Math.sin(e/a*(Math.PI/2))+n},easeInOutSine:function(t,e,n,i,a){return-i/2*(Math.cos(Math.PI*e/a)-1)+n},easeInExpo:function(t,e,n,i,a){return 0==e?n:i*Math.pow(2,10*(e/a-1))+n},easeOutExpo:function(t,e,n,i,a){return e==a?n+i:i*(1-Math.pow(2,-10*e/a))+n},easeInOutExpo:function(t,e,n,i,a){return 0==e?n:e==a?n+i:(e/=a/2)<1?i/2*Math.pow(2,10*(e-1))+n:i/2*(2-Math.pow(2,-10*--e))+n},easeInCirc:function(t,e,n,i,a){return-i*(Math.sqrt(1-(e/=a)*e)-1)+n},easeOutCirc:function(t,e,n,i,a){return i*Math.sqrt(1-(e=e/a-1)*e)+n},easeInOutCirc:function(t,e,n,i,a){return(e/=a/2)<1?-i/2*(Math.sqrt(1-e*e)-1)+n:i/2*(Math.sqrt(1-(e-=2)*e)+1)+n},easeInElastic:function(t,e,n,i,a){var o=1.70158,r=0,c=i;if(0==e)return n;if(1==(e/=a))return n+i;if(r||(r=.3*a),c<Math.abs(i)){c=i;o=r/4}else o=r/(2*Math.PI)*Math.asin(i/c);return-c*Math.pow(2,10*(e-=1))*Math.sin((e*a-o)*(2*Math.PI)/r)+n},easeOutElastic:function(t,e,n,i,a){var o=1.70158,r=0,c=i;if(0==e)return n;if(1==(e/=a))return n+i;if(r||(r=.3*a),c<Math.abs(i)){c=i;o=r/4}else o=r/(2*Math.PI)*Math.asin(i/c);return c*Math.pow(2,-10*e)*Math.sin((e*a-o)*(2*Math.PI)/r)+i+n},easeInOutElastic:function(t,e,n,i,a){var o=1.70158,r=0,c=i;if(0==e)return n;if(2==(e/=a/2))return n+i;if(r||(r=a*(.3*1.5)),c<Math.abs(i)){c=i;o=r/4}else o=r/(2*Math.PI)*Math.asin(i/c);return e<1?c*Math.pow(2,10*(e-=1))*Math.sin((e*a-o)*(2*Math.PI)/r)*-.5+n:c*Math.pow(2,-10*(e-=1))*Math.sin((e*a-o)*(2*Math.PI)/r)*.5+i+n},easeInBack:function(t,e,n,i,a,o){return null==o&&(o=1.70158),i*(e/=a)*e*((o+1)*e-o)+n},easeOutBack:function(t,e,n,i,a,o){return null==o&&(o=1.70158),i*((e=e/a-1)*e*((o+1)*e+o)+1)+n},easeInOutBack:function(t,e,n,i,a,o){return null==o&&(o=1.70158),(e/=a/2)<1?i/2*(e*e*((1+(o*=1.525))*e-o))+n:i/2*((e-=2)*e*((1+(o*=1.525))*e+o)+2)+n},easeInBounce:function(t,e,n,i,a){return i-jQuery.easing.easeOutBounce(t,a-e,0,i,a)+n},easeOutBounce:function(t,e,n,i,a){return(e/=a)<1/2.75?i*(7.5625*e*e)+n:e<2/2.75?i*(7.5625*(e-=1.5/2.75)*e+.75)+n:e<2.5/2.75?i*(7.5625*(e-=2.25/2.75)*e+.9375)+n:i*(7.5625*(e-=2.625/2.75)*e+.984375)+n},easeInOutBounce:function(t,e,n,i,a){return e<a/2?.5*jQuery.easing.easeInBounce(t,2*e,0,i,a)+n:.5*jQuery.easing.easeOutBounce(t,2*e-a,0,i,a)+.5*i+n}});