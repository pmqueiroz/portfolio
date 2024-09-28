Before starting coding I must have a entry point, and guess what, I had no ideia where to start. My first approach was search for the source code of other languages that I know most like Javascript, Python, Lua, etc. Digging all this code I found the first common thing: the **tokens**.

My first impression was that tokens are kind of a way to represent a small piece of the code with it value and name for what this code does basically. I was sure that I have made nice discovery when I reach this point so I decide to search something about this tokens and how they work or something.

Here comes the book that fell up my hands and I'm literally fascinated with it: [<b>*Compilers: Principles, Techniques and Tools*</b>][compilers-book], although the book it's about compilers there are some comparisons with interpreters and this will work awesome for me. The firsts chapters of the book are about how compilers works and I found that I was right when I gave myself a definition of tokens, they are literally what I thought they are.

Basically the compiler or interpreter read a <b>stream of characters</b> (just a know-it-all way to say 'the code') and then through the **lexical analysis** separate all the lexemes (what I called 'piece of code') and translate them to a token.

Eg.:

```umbra
mut name str = "Peam"
```

This umbra code could be translated as this tokens:

```coffee
<type: MUT,        lexeme: 'mut'>
<type: IDENTIFIER, lexeme: 'name'>
<type: STR_TYPE,   lexeme: 'str'>
<type: EQUAL,      lexeme: '='>
<type: STRING,     lexeme: '"Peam"'>
```

Each language has a specific way to generate tokens, I decided to make the umbra tokens more descriptive containing beyond the type and value the line of current lexeme and the column range, this will make things more easy on the next step: Syntax Analysis.

There are the latest version of umbra tokenizer output:

```coffee
<type: MUT,        lexeme: 'mut',    line: 1, column: [1, 3] >
<type: IDENTIFIER, lexeme: 'name',   line: 1, column: [5, 8] >
<type: STR_TYPE,   lexeme: 'str',    line: 1, column: [10, 12] >
<type: EQUAL,      lexeme: '=',      line: 1, column: [14, 14] >
<type: STRING,     lexeme: '"Peam"', line: 1, column: [16, 21] >
```

<!-- variables -->

[compilers-book]: https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools
