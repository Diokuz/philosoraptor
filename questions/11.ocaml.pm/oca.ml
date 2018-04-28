(* Transform immutable string to list of chars *)
let list_of_string s =
    let len = String.length s in
    let rec ilist n = match n with
        | len -> []
        | _ -> s.[n] :: ilist (n + 1)
    in
    ilist 0
