---
title: All my way writing a new language
description: Documenting the whole journey of building Umbra, my own interpreted programming language — from the first decisions to tokens and parsing.
draft: true
---

## Introduction

<img src="/blog/umbra-draw.svg" style="width:var(--image-size-normal)" float="right" shape="ellipse"/>

One thing that fascinates me in programming language is the syntax, most time I started to 'play' with a language was because of it, sometimes I thought it simple and easy or even complicated and fulfilled of weirdo characters, both bring me attention.
But more important than how code will be written, each language has major features underneath.
In my opinion developers generally don't even know for what purpose the language that their language was created for, *<s>including me</s>*.
In fact I'm a web developer but at some point I realized that I must learn more about low level computer science, and I have no patience to learn all this matter in college.
So I decide to make things more practices and write a language from scratch and I will document **all my way** through this challenge here, you may expect a history.

I don't have high hopes doing this, is more for fun and probably I will leave this ideia aside or spend years until get something working minimally.

> Future me: It's have been three years until something really work

Fun fact: until then the name of my language will be Umbra, asking why? I don't know either 😅. Umbra was the name of an old project of mine that I didn't keep so I sort of stole myself the name, I think it's cool.

## Decisions

At very beginning I started to think about the language syntax, what will be the reserved keywords and symbols such like as assignment operator (most language uses *'='*) and actually I spent hours thinking about that until I realize that I have a way more important decisions to make. And then I put all this mess stuff in my mind on a note to organize and decide what I need to decide first.

### Execution Paradigm

We separate programming languages into two major types base on their execution model or paradigm: the **interpreted** languages and **compiled** languages. (*<s>and java</s>*).

Basically, a *compiler* receive the code as input and outputs a translated version in another language (usually machine code), while a *interpreter* received the code and execute it directly in the interpreter's environment, most *interpreters* use `C` lang.

For Umbra I preferred to create a interpreter, and if you ask I had no fundamental reason for that I just rather run directly the code instead of compiling and executing a binary.

> Future me again: Thank God I made that decision. Later, I figured out that compiled languages is way more complicated to build than interpreted ones.

### The cli

I wanted two ways to run the language through the cli, the primary method is passing an initial file to run, and that file may import others file, something like this:

```shell
$ umbra example.u # outputs the executed code
```

And a built-in REPL, just like nodejs approach:

```shell
$ umbra # starts the REPL and awaits commands
```

> Later on, I faced the interesting challenge of saving the state of the program while receiving instructions

## First Researches

Before starting coding I must have a entry point, and guess what, I had no ideia where to start. My first approach was search for the source code of other languages that I know most like Javascript, Python, Lua, etc. Digging all this code I found the first common thing: the **tokens**.

My first impression was that tokens are kind of a way to represent a small piece of the code with it value and name for what this code does basically. I was sure that I have made nice discovery when I reach this point so I decide to search something about this tokens and how they work or something.

Here comes the book that fell up my hands and I'm literally fascinated with it: [***Compilers: Principles, Techniques and Tools***](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools), although the book it's about compilers there are some comparisons with interpreters and this will work awesome for me. The firsts chapters of the book are about how compilers works and I found that I was right when I gave myself a definition of tokens, they are literally what I thought they are.

Basically the compiler or interpreter read a **stream of characters** (just a know-it-all way to say 'the code') and then through the **lexical analysis** separate all the lexemes (what I called 'piece of code') and translate them to a token.

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

## Parsing

Before starting coding I must have a entry point, and guess what, I had no ideia where to start. My first approach was search for the source code of other languages that I know most like Javascript, Python, Lua, etc. Digging all this code I found the first common thing: the **tokens**.

My first impression was that tokens are kind of a way to represent a small piece of the code with it value and name for what this code does basically. I was sure that I have made nice discovery when I reach this point so I decide to search something about this tokens and how they work or something.

Here comes the book that fell up my hands and I'm literally fascinated with it: [***Compilers: Principles, Techniques and Tools***](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools), although the book it's about compilers there are some comparisons with interpreters and this will work awesome for me. The firsts chapters of the book are about how compilers works and I found that I was right when I gave myself a definition of tokens, they are literally what I thought they are.

Basically the compiler or interpreter read a **stream of characters** (just a know-it-all way to say 'the code') and then through the **lexical analysis** separate all the lexemes (what I called 'piece of code') and translate them to a token.

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
