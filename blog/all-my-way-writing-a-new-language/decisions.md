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
