

export const canvasWidth = 800;
export const canvasHeight = 800;
export const alphaGroups = [
  [ "aa_chasban_rast" ,  "aa_bakola" , "aa_bikola"] ,
  [ "be_koochik_chap" ,  "be_koochik_dovar",  "be_bozorg_rast" , "be_bozorg_tanha" ],
  [ "de_tanha" , "de_chasban_rast" ],
  [ "me_koochik_chap" , "me_koochik_dovar", "me_bozorg_rast", "me_bozorg_tanha" ],
  [ "re_chasban_rast" , "re_tanha" ],
  [ "ye_koochik_chap", "ye_koochik_dovar" , "ye_bozorg_tanha", "ye_bozorg_rast" ],
  [ "faseleh" ] 
]

export const darses = [ 
  [ "be_koochik_chap aa_chasban_rast be_koochik_chap aa_chasban_rast", "baabaa" ], // 0
  [ "aa_bakola be_bozorg_tanha", "aab" ],
  [ "be_koochik_chap aa_chasban_rast de_tanha" , "baad" ],
  [ "be_koochik_chap aa_chasban_rast me_bozorg_tanha" , "baam" ],
  [ "de_tanha aa_bikola me_bozorg_tanha" , "daam" ],
  [ "be_koochik_chap aa_chasban_rast de_tanha aa_bikola me_bozorg_tanha" , "baadaam" ],
  [ "me_koochik_chap aa_chasban_rast re_tanha" , "maar" ],
  [ "de_tanha re_tanha" , "dar" ],
  [ "aa_bakola re_tanha de_tanha" , "aard" ],
  [ "de_tanha aa_bikola re_tanha aa_bikola" , "daaraa" ],
  [ "me_koochik_chap aa_chasban_rast de_tanha re_tanha" , "maadar" ], // 10
  [ "ye_koochik_chap aa_chasban_rast re_tanha aa_bikola" , "yaara" ], 
  [ "de_tanha ye_koochik_chap de_chasban_rast"  , "deed" ] , 
  //"be_koochik_chap aa_chasban_rast be_koochik_chap aa_chasban_rast faseleh aa_bakola be_bozorg_tanha faseleh de_tanha aa_bikola de_tanha",
]
