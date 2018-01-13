(function (root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD.
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') { // CommonJS
    factory(exports);
  } else { // Browser globals
    root.Baduk = root.Baduk || {};
    factory(root.Baduk);
  }
}(this, function (exports) {

  // options:
  //   - size: typically 19.
  //   - komi: floating-point number.
  function Board(options) {
    options = options | {};
    this.size = +options.size || 19;
    this.komi = +options.komi || 7.5;
    this.board = new Uint8Array(this.size * this.size);
  }

  Board.prototype = {
    // x, y: integer positions of an intersection on the board.
    get(x, y) { return this.board[x + y * this.size]; },
    set(x, y, color) { return this.board[x + y * this.size] = color; },
  };

  exports.Board = Board;

}));
(function (root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD.
    define(['exports', 'Board'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') { // CommonJS
    factory(exports, require('./board.js').Board);
  } else { // Browser globals
    root.Baduk = root.Baduk || {};
    factory(root.Baduk, root.Baduk.Board);
  }
}(this, function (exports, Board) {

  // Manage an SGF file, only consider its primary history.
  function SGF() {
    this.content = [];
    this.board = new Board();
  }
  SGF.prototype = {
    // source: string of SGF content.
    // options:
    //   - filename: name of the SGF file.
    //   - error: function(string) called for each error.
    parse(source, options) {
      options = options || {};
      var parser = new SGFParser(source, options);
      if (options.error !== undefined) {
        parser.errors.forEach(options.error);
      }
      this.content = parser.content;
      if (this.content.length > 0 && this.content[0].sequence.length > 0) {
        var size = this.content[0].sequence[0]["SZ"];
        var komi = this.content[0].sequence[0]["KM"];
      } else {
        var size = 19;
        var komi = 7.5;
      }
      this.board = new Board({size: size, komi: komi});
    },
    generate() {
      // TODO
    },
  };

  // options:
  //   - filename: name of the SGF file.
  function SGFParser(sgf, options) {
    options = options || {};
    this.source = sgf;
    this.filename = options.filename || "source.sgf";
    this.errors = [];
    this.tokStart = 0;
    this.tokEnd = 0;
    this.line = 1;
    this.col = 1;
    this.content = this.parse(sgf);
  }

  SGFParser.prototype = {
    read(n) {
      n = (n === undefined)? 1: +n;
      var slice = this.source.slice(this.tokEnd, this.tokEnd + n);
      this.tokEnd += n;
      return slice;
    },
    peek() { return this.source[this.tokEnd]; },
    skip() { this.read(); this.consumeToken(); },
    skipMatching(regexp) {
      while (regexp.test(this.peek())) { this.read(); }
      this.consumeToken();
    },
    skipWhitespace() { this.skipMatching(/\s/); },
    token() {
      return this.source.slice(this.tokStart, this.tokEnd);
    },
    consumeToken() {
      var token = this.token();
      for (var i = 0; i < token.length; i++) {
        if (token[i] === "\n") {
          this.line++;
          this.col = 1;
        } else { this.col++; }
      }
      this.tokStart = this.tokEnd;
      return token;
    },
    error(msg) {
      this.errors.push(this.filename + ":" + this.line + ":" + this.col + ": "
        + msg);
    },
    // [gameTree, …]
    parse() {
      var gameTrees = [];
      do {
        var gameTree = this.parseGameTree();
        if (gameTree !== undefined) { gameTrees.push(gameTree); }
        this.skipWhitespace();
      } while (this.peek() === "(");
      return gameTrees;
    },
    // {sequence, gameTrees}
    parseGameTree() {
      if (this.peek() === "(") {
        this.skip();
        var sequence = this.parseSequence();
        this.skipWhitespace();
        var gameTrees = [];
        while (this.peek() === "(") {
          var gameTree = this.parseGameTree();
          if (gameTree !== undefined) { gameTrees.push(gameTree); }
        }
        if (this.peek() === ")") {
          this.skip();
          return { sequence: sequence, gameTrees: gameTrees };
        } else {
          this.error("Expected a `)` in the game tree, got `" + this.peek() + "`");
        }
      } else {
        this.error("Expected a `(` in the game tree, got `" + this.peek() + "`");
      }
    },
    // [node, …]
    parseSequence() {
      var nodes = [];
      do {
        var node = this.parseNode();
        if (node !== undefined) { nodes.push(node); }
        this.skipWhitespace();
      } while (this.peek() === ";");
      return nodes;
    },
    // {identifier: value}
    parseNode() {
      this.skipWhitespace();
      if (this.peek() === ";") {
        this.skip();
        this.skipWhitespace();
        var properties = Object.create(null);
        while (/^[A-Z]$/.test(this.peek())) {
          var property = this.parseProperty();
          if (property !== undefined) {
            properties[property.identifier] = property.value;
          }
        }
        return properties;
      } else {
        this.error("Expected a `;` starting the node, got `" + this.peek() + "`");
      }
    },
    typeFromPropIdent(identifier) {
      switch (identifier) {
        case 'B':
        case 'W': return IDENT_MOVE;
        case 'MN':
        case 'HA':
        case 'FF':
        case 'GM':
        case 'ST':
        case 'SZ':
        case 'OB':
        case 'OW':
        case 'PM': return IDENT_NUMBER;
        case 'V':
        case 'KM':
        case 'TM':
        case 'BL':
        case 'WL': return IDENT_REAL;
        case 'PL': return IDENT_COLOR;
        case 'DM':
        case 'GB':
        case 'GW':
        case 'UC':
        case 'BM':
        case 'TE':
        case 'HO': return IDENT_DOUBLE;
        case 'KO':
        case 'IT':
        case 'DO': return IDENT_NONE;
        case 'C':
        case 'GC': return IDENT_TEXT;
        case 'CA':
        case 'N':
        case 'AN':
        case 'BR':
        case 'BT':
        case 'CP':
        case 'DT':
        case 'RD':
        case 'EV':
        case 'GN':
        case 'ON':
        case 'OT':
        case 'PB':
        case 'PC':
        case 'PW':
        case 'RE':
        case 'RO':
        case 'RU':
        case 'SO':
        case 'US':
        case 'WR':
        case 'WT': return IDENT_SIMPLETEXT;
        case 'AB':
        case 'AE':
        case 'AW':
        case 'TB':
        case 'TW':
        case 'DD':
        case 'MA':
        case 'SL':
        case 'SQ':
        case 'TR':
        case 'CR':
        case 'VW': return IDENT_ELIST_POINT;
        case 'LN':
        case 'AR': return IDENT_LIST_POINT_POINT;
        case 'LB': return IDENT_LIST_POINT_SIMPLETEXT;
        case 'AP': return IDENT_SIMPLETEXT_SIMPLETEXT;
        case 'FG': return IDENT_NUMBER_SIMPLETEXT;
      }
    },
    propIdentTypeIsList(type) {
      return (type === IDENT_ELIST_POINT) ||
        (type === IDENT_LIST_POINT_POINT) ||
        (type === IDENT_LIST_POINT_SIMPLETEXT);
    },
    // {identifier, value}
    parseProperty() {
      this.skipWhitespace();
      var identifier = this.parsePropIdent();
      var type = this.typeFromPropIdent(identifier);
      var isList = this.propIdentTypeIsList(type);
      var value;
      if (isList) { value = []; }
      do {
        var propValue = this.parsePropValue(type);
        if (propValue !== undefined) {
          if (isList) { value.push(propValue); }
          else { value = propValue; }
        }
        this.skipWhitespace();
      } while (this.peek() === "[");
      if (this.peek() === "]") {
        this.skip();
      } else {
        this.error("Expected a `]` ending the property, got `" + this.peek() + "`");
      }
      return { identifier: identifier, value: value };
    },
    parsePropIdent() {
      while (/^[A-Z]$/.test(this.peek())) { this.read(); }
      return this.consumeToken();
    },
    parsePropValue(type) {
      if (this.peek() === "[") {
        this.skip();
        return this.parseCValueType(type);
      } else {
        this.error("Expected a `[` starting the property value, got `" +
          this.peek() + "`");
      }
    },
    parseCValueType(type) {
      if (type === IDENT_MOVE) {
        if (this.peek() === "]") { return []; }
        return this.parsePoint();
      } else if (type === IDENT_NUMBER) {
        return this.parseNumber();
      } else if (type === IDENT_REAL) {
        return this.parseReal();
      } else if (type === IDENT_COLOR) {
        return this.parseColor();
      } else if (type === IDENT_DOUBLE) {
        return this.parseDouble();
      } else if (type === IDENT_TEXT) {
        return this.parseText();
      } else if (type === IDENT_SIMPLETEXT) {
        return this.parseText({simple: true});
      } else if (type === IDENT_NONE) {
        return null;
      } else if (type === IDENT_ELIST_POINT) {
        var points = [];
        while (/[a-zA-Z]/.test(this.peek())) {
          points.push(this.parsePoint());
        }
        return points;
      } else if (type === IDENT_LIST_POINT_POINT) {
        var arrows = [];
        while (/[a-zA-Z]/.test(this.peek())) {
          var from = this.parsePoint();
          if (this.peek() === ":") {
            this.skip();
          } else {
            this.error("Missing `:` in list of composed point:point");
          }
          var to = this.parsePoint();
          arrows.push([from, to]);
        }
        return arrows;
      } else if (type === IDENT_LIST_POINT_SIMPLETEXT) {
        var labels = [];
        while (/[a-zA-Z]/.test(this.peek())) {
          var point = this.parsePoint();
          if (this.peek() === ":") {
            this.skip();
          } else {
            this.error("Missing `:` in list of composed point:simpletext");
          }
          var label = this.parseText({simple: true});
          labels.push({ point: point, label: label });
        }
        return labels;
      } else if (type === IDENT_SIMPLETEXT_SIMPLETEXT) {
        var app = this.parseText({simple: true, composed: true});
        if (this.peek() === ":") {
          this.skip();
        } else {
          this.error("Missing `:` in composed simpletext:simpletext");
        }
        var version = this.parseText({simple: true});
        return { app: app, version: version };
      } else if (type === IDENT_NUMBER_SIMPLETEXT) {
        var flags = this.parseNumber();
        if (flags === undefined) { return null; }
        if (this.peek() === ":") {
          this.skip();
        } else {
          this.error("Missing `:` in composed simpletext:simpletext");
        }
        var name = this.parseText({simple: true});
        return { flags: flags, name: name };
      } else {
        this.error("Invalid property value type " + type);
      }
    },
    parsePoint() {
      var x = this.parseCoordinate();
      var y = this.parseCoordinate();
      return [x, y];
    },
    parseCoordinate() {
      if (/[a-z]/.test(this.peek())) {
        var char = this.read();
        this.consumeToken();
        return char.charCodeAt(0) - 97;
      } else if (/[A-Z]/.test(this.peek())) {
        var char = this.read();
        this.consumeToken();
        return char.charCodeAt(0) - 65 + 26;
      } else {
        this.error("Invalid coordinate '" + this.read() + "'");
      }
    },
    parseColor() {
      if (/[BW]/.test(this.peek())) {
        var color = this.read();
        this.consumeToken();
        return color;
      } else {
        this.error("Unknown color '" + this.read() + "'");
      }
    },
    parseDouble() {
      if (/[12]/.test(this.peek())) {
        var double = +this.read();
        this.consumeToken();
        return double;
      } else {
        this.error("Unknown double '" + this.read() + "'");
      }
    },
    parseNumber() {
      var sign = 1;
      if (/^[\+\-]$/.test(this.peek())) {
        if (this.read() === "-") { sign = -1; }
      }
      var number = 0;
      while (/^\d$/.test(this.peek())) {
        number *= 10;
        number += +this.read();
      }
      this.consumeToken();
      return sign * number;
    },
    parseReal() {
      var number = this.parseNumber();
      var sign = (number >= 0)? 1: -1;
      if (this.peek() === ".") {
        this.read();
        var fractional = 1;
        while (/^\d$/.test(this.peek())) {
          fractional /= 10;
          number += sign * fractional * +this.read();
        }
      }
      this.consumeToken();
      return number;
    },
    parseText(options) {
      options = options || {};
      var simple = !!options.simple;
      var composed = !!options.composed;
      var text = "";
      var escaping = false;
      for (;;) {
        var char = this.peek();
        if (escaping) {
          if (char === "\n") {
            this.read();
            if (this.peek() === "\r") { this.read(); }
          } else if (char === "\r") {
            this.read();
            if (this.peek() === "\n") { this.read(); }
          } else { text += this.read(); }
          escaping = false;
        } else if (char === "]" || char === undefined || (composed && char === ":")) {
          this.consumeToken();
          return text;
        } else if (char === "\\") {
          this.read();
          escaping = true;
        } else if (/\s/.test(char) && (simple || !/[\r\n]/.test(char))) {
          this.read();
          text += " ";
        } else {
          text += this.read();
        }
      }
    },
  };

  var IDENT_MOVE = 1;
  var IDENT_NUMBER = 2;
  var IDENT_REAL = 3;
  var IDENT_COLOR = 4;
  var IDENT_DOUBLE = 5;
  var IDENT_NONE = 6;
  var IDENT_TEXT = 7;
  var IDENT_SIMPLETEXT = 8;
  var IDENT_ELIST_POINT = 9;
  var IDENT_LIST_POINT_POINT = 10;
  var IDENT_LIST_POINT_SIMPLETEXT = 11;
  var IDENT_SIMPLETEXT_SIMPLETEXT = 12;
  var IDENT_NUMBER_SIMPLETEXT = 13;

  exports.SGF = SGF;

}));
