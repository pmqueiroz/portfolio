Before starting coding something I must have a entry point, and guess what, I had no ideia where to start. My first approach was search for the source code of other languages that I know most like Javascript, Python, Lua, etc. Digging all this code I found one common thing: the **tokens**.

My first impression was that tokens are kind of a way to represent a small piece of the code with it value and name for what this code does basically. I was sure that I have made nice discovery when I reach this point so I decide to search something about this tokens and how they work or something.

Here comes the book that fell up my hands and I'm literally fascinated with it: [<b>*Compilers: Principles, Techniques and Tools*</b>][compilers-book], although the book it's about compilers there are some comparisons with interpreters and this will work awesome for me. The firsts chapters of the book are about how compilers works and I found that I was right when I gave myself a definition of tokens, they are literally what I thought they are.

Basically the compiler or interpreter read a <b>stream of characters</b> (just a know-it-all way to say 'the code') and then through the **lexical analysis** separate all the lexemes (what I called 'piece of code') and translate them to a token.

Eg.:

```umbra
str name <- "Pedro"
```

This umbra code could be translated as this tokens:

```coffee
<type: Keyword, value: 'str'>
<type: Identifier, value: 'name'>
<type: Punctuator, value: '<-'>
<type: String, value: '"Pedro"'>
```

Each language has a specific way to generate tokens, I decided to make the umbra tokens more descriptive containing beyond the type and value the line of current lexeme and the column, this will make things more easy on the next step: Syntax Analysis.

There are the latest version of umbra tokenizer output:

```coffee
<type: STRING_TYPE__KEYWORD,          value: 'str',      ln: 1, col: 4>
<type: IDENTIFIER__KEYWORD,           value: 'name',     ln: 1, col: 9>
<type: ASSIGNMENT__OPERATOR,          value: '<-',       ln: 1, col: 12>
<type: IDENTIFIER__KEYWORD,           value: '"Pedro"',  ln: 2, col: 0>
```

<!-- variables -->

[compilers-book]: https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools
