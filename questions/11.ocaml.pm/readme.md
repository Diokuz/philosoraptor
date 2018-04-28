## Question

Why this code gives `this match case is unused`?

```ocaml
(* Transform immutable string to list of chars *)
let list_of_string s =
    let len = String.length s in
    let rec ilist n = match n with
        | len -> []
        | _ -> s.[n] :: ilist (n + 1)
    in
    ilist 0
```

## Answer

Looks like you cannot match against variable value. In the code above `len` in `| len -> []` does not referenced to `len` in `let len = String.length s in`, but it referenced to `n` argument of `ilist` function.

Also, there is misconception: pattern matching is about _patterns_, not about switch/case on values. [More about pattern matching](http://ocaml.org/learn/tutorials/data_types_and_matching.html#Pattern-matching-on-datatypes).

Anyway, the code above could be rewrited with use of _guards_:

```ocaml
let list_of_string s =
    let len = String.length s in
    let rec ilist n = match n with
        | x when x=len -> []
        | _ -> s.[n] :: ilist (n + 1)
    in
    ilist 0
```

`x` here is somewhat wildcard with condition, and `x=len` is a guard.
