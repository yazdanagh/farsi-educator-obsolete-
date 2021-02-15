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
  [ "be_koochik_chap ye_koochik_dovar ne_koochik_dovar ye_bozorg_chasban"  , "beenee" ] ,
  [ "de_tanha ye_koochik_chap de_chasban"  , "deed" ] , 
  [ "aaba bkc ybc"  , "aabee" ] , 
  
  [ "ne_koochik_chap aa_chasban ne_bozorg_tanha"  , "naan" ] , 
  [ "aa_bakola be_koochik_chap aa_chasban ne_bozorg_tanha"  , "aabaan" ] , 
  [ "ne_koochik_chap aa_chasban me_bozorg_tanha"  , "naam" ] , 
  [ "ne_koochik_chap aa_chasban de_tanha re_tanha"  , "naader" ] , 
  [ "aabi ykc rc aabi nbt "  , "eeraan" ] , 
  [ "bkc aac rt aabi nbt "  , "baaraan" ] , 

  [ "de_tanha re_tanha sine_bozorg_tanha"  , "dars" ] , 
  [ "sine_koochik_chap re_chasban de_tanha"  , "sard" ] , 
  [ "sine_koochik_chap re_chasban me_koochik_chap aa_chasban"  , "sarmaa" ] ,
  [ "sikc ykd nkd ybc" , "seenee" ] ,
  [ "dt aabi rt sikc ybc"  , "daarsee" ] ,
  [ "aabi sikc bbc"  , "asb" ] ,

  [ "pkc aac" , "paa" ] ,
  [ "pkc dc rt" , "pedar" ] ,
  [ "pkc aac rt sikc ybc" , "paarsee" ] ,
  [ "pkc aac rt sikc aac" , "paarsaa" ] ,
  [ "pkc rc ykc dc nbt" , "pareedan" ] ,

  [ "tkc aac rt aabi" , "taaraa" ] ,
  [ "bkc ykd sikd tbc" , "beest" ] ,
  [ "dt sikc tbc" , "dast" ] ,
  [ "mkc aac sikc tbc" , "maast" ] ,
  [ "dt aabi sikc tkd aac nbt" , "daastaan" ] ,
  [ "be_koochik_chap sine_koochik_dovar te_koochik_dovar ne_koochik_dovar ye_bozorg_chasban"  , "bastanee" ] ,

  [ "shikc aac dt ybt", "shaadee" ],
  [ "shikc aac mbt", "shaam" ],
  [ "aaba tkc shibc", "aatash" ],
  [ "rt ykc shibc", "reesh" ],

  [ "bkc aac zt ybt", "baazee" ], 
  [ "sikc aac zt", "saaz" ], 
  [ "zt rt dt", "zard" ], 
  [ "bkc zc", "boz" ], 
  [ "nkc aac zt nkc ykd nbc", "nazaneen" ], 
  [ "sikc bkd zc", "sabz" ], 
  
  [ "dt lkc sikd aac", "delsaa" ], 
  [ "bkc aac lbt", "baal" ], 
  [ "bkc aac lkc shibc", "baalesh" ], 
  [ "lkc aac zt mbt", "laazem" ], 
  [ "bkc lkd aac lbt", "balaal" ], 

  [ "aaba lkc vc", "aaloo" ], 
  [ "pkc lkd vc", "polo" ], 
  [ "vt aabi nkc ykd lbc", "vaaneel" ], 
  [ "rt aabi vt ybt", "raavee" ], 
]


// harfName harfSound key harFrom(harfLead) key harfForm  
const harfInput = [
  "alef aa aaba aa_bakola aac aa_chasban aabi aa_bikola",
  "be be bbt be_bozorg_tanha bkc be_koochik_chap bkd be_koochik_dovar bbc be_bozorg_chasban" ,
  "de de dt de_tanha dc de_chasban" ,
  "meem me mbt me_bozorg_tanha mkc me_koochik_chap mkd me_koochik_dovar mbc me_bozorg_chasban" ,
  "re re rt re_tanha rc re_chasban" ,
  "ye ye ybt  ye_bozorg_tanha ykc ye_koochik_chap ykd ye_koochik_dovar  ybc ye_bozorg_chasban" ,
  "noon ne nbt  ne_bozorg_tanha nkc  ne_koochik_chap nkd ne_koochik_dovar nbc ne_bozorg_chasban" ,
  "sin se sibt sine_bozorg_tanha sikc  sine_koochik_chap sikd sine_koochik_dovar sibc sine_bozorg_chasban" ,
  "pe pe pbt pe_bozorg_tanha  pkc pe_koochik_chap pkd pe_koochik_dovar pbc pe_bozorg_chasban" ,
  "te te tbt te_bozorg_tanha tkc te_koochik_chap tkd te_koochik_dovar tbc te_bozorg_chasban" ,
  "shin she shibt shine_bozorg_tanha shikc  shine_koochik_chap shikd shine_koochik_dovar shibc shine_bozorg_chasban" ,
  "ze ze zt ze_tanha zc ze_chasban" ,
  "lam le lbt le_bozorg_tanha lkc le_koochik_chap lkd le_koochik_dovar lbc le_bozorg_chasban" ,
  "vav ve vt vav_tanha vc vav_chasban" ,
  //[ faseleh ] 
]

module.exports = {
  harfInput,
  darsesInput,
}
