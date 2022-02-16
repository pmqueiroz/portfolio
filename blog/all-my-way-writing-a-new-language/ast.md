Now we have the tokens done we can go through the `syntax analysis` or `parser`. 
Even though is common to call parser by syntax analysis, actually the analysis is single step from the parser. The step that will detect whether the input code is following the language grammar and then throw an error if something is bad, the **syntax error**. As the name suggest the parser needs to return the input in other representation than tokens, which is a tree-like structure, the most used is called **abstract syntax tree (AST)**

<cluster>
   <img src="/blog/ast-eg.png" align="right" width="300px"/>
   <img src="/blog/symbol_table.png" align="right" width="200px"/>
</cluster>

Along with syntax tree we have a symbol table that storages information about the identifiers in source program such as its types, id (lexeme), memory address, etc.

To be honest I'm feeling that I will get stuck here for a while, I spent few hours already reading about this and I didn't come to any decision in how to implement. In fact C don't have too many ways to implement this properly (with properly i meant "not a trash way to do") as a high-level program language has but I have not enough knowledgement in C to discern the best way.

Somehow the way I will structure the data of the symbol table and the syntax tree will take me a few hours or even days, I have to think a way more the best way to avoid many regrets that I'm sure and expect that I will have, just need to reduce them.
