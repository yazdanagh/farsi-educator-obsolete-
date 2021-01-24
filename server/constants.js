const darsesInput = [ 
  [ "aa_bakola be_bozorg_tanha", "aab" ],
  [ "be_koochik_chap aa_chasban be_koochik_chap aa_chasban", "baabaa" ],                                         
  [ "be_koochik_chap aa_chasban de_tanha" , "baad" ],
  [ "de_tanha aa_bikola de_tanha" , "daad" ],
  [ "be_koochik_chap aa_chasban me_bozorg_tanha" , "baam" ],
  [ "de_tanha aa_bikola me_bozorg_tanha" , "daam" ],
  [ "be_koochik_chap aa_chasban de_tanha aa_bikola me_bozorg_tanha" , "baadaam" ],
  [ "me_koochik_chap aa_chasban re_tanha" , "maar" ],
  [ "de_tanha re_tanha" , "dar" ],
  [ "aa_bakola re_tanha de_tanha" , "aard" ],
  [ "de_tanha aa_bikola re_tanha aa_bikola" , "daaraa" ],
  [ "me_koochik_chap aa_chasban de_tanha re_tanha" , "maadar" ], 
  [ "de_tanha aa_bikola re_tanha me_bozorg_tanha" , "daaram" ], 
  [ "aa_bakola me_koochik_chap de_chasban" , "aamad" ], 
  [ "ye_koochik_chap aa_chasban re_tanha aa_bikola" , "yaara" ], 
  [ "de_tanha ye_koochik_chap de_chasban"  , "deed" ] , 
  [ "ne_koochik_rast aa_chasban ne_bozorg_tanha"  , "naan" ] , 
  [ "aa_bakola be_koochik_chap aa_chasban ne_bozorg_tanha"  , "aabaan" ] , 
  [ "ne_koochik_rast aa_chasban me_bozorg_tanha"  , "naam" ] , 
  [ "ne_koochik_rast aa_chasban de_tanha re_tanha"  , "naader" ] , 
  [ "de_tanha re_tanha sine_bozorg_tanha"  , "dars" ] , 
  [ "sine_chasban_chap re_chasban de_tanha"  , "sard" ] , 
  [ "sine_chasban_chap re_chasban me_koochik_chap aa_chasban"  , "sarmaa" ] 
]


const harfInput = [
  "alef aa aa_bakola aa_chasban aa_bikola",
  "be be be_bozorg_tanha be_koochik_chap be_koochik_dovar be_bozorg_chasban" ,
  "de de de_tanha de_chasban" ,
  "meem me me_bozorg_tanha me_koochik_chap me_koochik_dovar me_bozorg_chasban" ,
  "re re re_tanha re_chasban" ,
  "ye ye ye_bozorg_tanha ye_koochik_chap ye_koochik_dovar ye_bozorg_chasban" ,
  "noon ne ne_bozorg_tanha ne_koochik_rast ne_koochik_dovar ne_bozorg_chasban" ,
  "sin se sine_chasban_chap sine_chasban_dovar sine_bozorg_chasban sine_bozorg_tanha" ,
  //[ faseleh ] 
]

module.exports = {
  harfInput,
  darsesInput
}
