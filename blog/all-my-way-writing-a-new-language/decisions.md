At very beginning I started to think about the language syntax, what will be the reserved keywords and symbols such like as assignment operator (most language uses *'='*) and actually I lost hours thinking about that until I realize that I have a way more important decisions to make. And then I put all this mess stuff in my mind on a note to organize and decide what I need to decide first.

There are two major types of languages: the **interpreted** ones and the **compiled** ones.

Basically a *compiler* receive the code as input and outputs a translated version of the code in another language, and a *interpreter* received the code and execute it in the language of the interpreter, most *interpreters* use `C` lang.

For Umbra I preferred to create a interpreter, and if you ask I had no fundamental reason for that I just rather run directly the code instead of compiling and executing a binary, so the usage will be something like that:

```shell
$ umbra example.u # outputs the executed code
```
