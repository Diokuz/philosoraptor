let list_of_string s =
    let len = String.length s in
    let rec ilist n = match n with
        | x when x=len -> []
        | _ -> s.[n] :: ilist (n + 1)
    in
    ilist 0
