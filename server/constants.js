const darsesInput = [

  // alef & be 
   [ "aabia bbt", "aab" ],
 //[ "aabia be_bozorg_tanha", "aab" ],
 //[ "be_koochik_chap aa_chasban be_koochik_chap aa_chasban", "baabaa" ],                                         
 //[ "be_koochik_chap aa_chasban be_koochik_chap aa_chasban", "baabaa" ],                                         

  // de
// [ "be_koochik_chap aa_chasban de_tanha" , "baad" ],
// [ "de_tanha aa_bikola de_tanha" , "daad" ],
// [ "aaba bkc aac dt", "aabaad" ],
// [ "aaba dt aabi bbt", "aadaab" ],
//
//
// // meem 
// [ "be_koochik_chap aa_chasban me_bozorg_tanha" , "baam" ],
// [ "de_tanha aa_bikola me_bozorg_tanha" , "daam" ],
// [ "be_koochik_chap aa_chasban de_tanha aa_bikola me_bozorg_tanha" , "baadaam" ],
// [ "aaba mkc dc", "aamad" ],
// [ "aaba dt mbt", "aadam" ],
//
// // re 
// [ "me_koochik_chap aa_chasban de_tanha re_tanha" , "maadar" ], 
// [ "aa_bakola re_tanha de_tanha" , "aard" ],
// [ "me_koochik_chap aa_chasban re_tanha" , "maar" ],
// [ "de_tanha aa_bikola re_tanha aa_bikola" , "daaraa" ],
// [ "bkc rc aabi dt rt" , "baraadar" ],
// [ "de_tanha re_tanha" , "dar" ],
// [ "de_tanha aa_bikola re_tanha me_bozorg_tanha" , "daaram" ], 
//
// // noon 
// [ "ne_koochik_chap aa_chasban ne_bozorg_tanha"  , "naan" ] , 
// [ "aa_bakola be_koochik_chap aa_chasban ne_bozorg_tanha"  , "aabaan" ] , 
// [ "bkc aac rt aabi nbt "  , "baaraan" ] , 
// [ "ne_koochik_chap aa_chasban me_bozorg_tanha"  , "naam" ] , 
// [ "ne_koochik_chap aa_chasban de_tanha re_tanha"  , "naader" ] , 
// [ "aabi nkc aac rt"  , "anaar" ] , 
// [ "mkc nbc"  , "man" ] , 
//
//
// // ye
// [ "ye_koochik_chap aa_chasban de_tanha" , "yaad" ], 
// [ "ye_koochik_chap aa_chasban re_tanha aa_bikola" , "yaara" ], 
// [ "dt rt ykc aac" , "daryaa" ], 
// [ "aaba bkc ybc"  , "aabee" ] , 
// [ "be_koochik_chap ye_koochik_dovar ne_koochik_dovar ye_bozorg_chasban"  , "beenee" ] ,
// [ "aabi ykc rc aabi nbt "  , "eeraan" ] , 
// [ "de_tanha ye_koochik_chap de_chasban"  , "deed" ] , 
// 
// 
// // sin
// [ "de_tanha re_tanha sine_bozorg_tanha"  , "dars" ] , 
// [ "sine_koochik_chap re_chasban de_tanha"  , "sard" ] , 
// [ "sine_koochik_chap re_chasban me_koochik_chap aa_chasban"  , "sarmaa" ] ,
// [ "sikc ykd nkd ybc" , "seenee" ] ,
// //[ "dt aabi rt sikc ybc"  , "daarsee" ] ,
// [ "aabi sikc bbc"  , "asb" ] ,
// [ "sikc ykd bbc"  , "seeb" ] ,
//
// // pe
// [ "pkc aac" , "paa" ] ,
// [ "pkc dc rt" , "pedar" ] ,
// [ "pkc nkd ykd rc" , "paneer" ] ,
// [ "pkc aac rt sikc ybc" , "paarsee" ] ,
// [ "pkc aac rt sikc aac" , "paarsaa" ] ,
// [ "pkc rc ykc dc nbt" , "pareedan" ] ,
//
// // te
// [ "tkc aac rt aabi" , "taaraa" ] ,
// [ "bkc ykd sikd tbc" , "beest" ] ,
// [ "dt sikc tbc" , "dast" ] ,
// [ "mkc aac sikc tbc" , "maast" ] ,
// [ "rt aabi sikc tbc" , "raast" ] ,
// [ "dt aabi sikc tkd aac nbt" , "daastaan" ] ,
// [ "bkc sikd tkd nkd ybc"  , "bastanee" ] ,
//
// // shin
// [ "shikc aac dt ybt", "shaadee" ],
// [ "shikc aac mbt", "shaam" ],
// [ "aaba tkc shibc", "aatash" ],
// [ "aaba rt shibt", "aarash" ],
// [ "rt ykc shibc", "reesh" ],
// [ "shikc ykd rc", "sheer" ],
// [ "shikc mkd aac", "shoma" ],
//
// // ze
// [ "bkc aac zt ybt", "baazee" ], 
// [ "zt rt dt", "zard" ], 
// [ "zt nbt", "zan" ], 
// [ "sikc aac zt", "saaz" ], 
// [ "bkc zc", "boz" ], 
// [ "nkc aac zt nkc ykd nbc", "nazaneen" ], 
// [ "sikc bkd zc", "sabz" ], 
// [ "aaba zt aabi dt ybt", "aazaadee" ], 
//
//
// // khe
// [ "dt rt khkc tbc", "derakht" ],
// [ "sikc khkd tbc", "sakht" ],
// [ "nkc khbc", "nakh" ],
// [ "tkc khkd tbc", "takht" ],
// [ "sikc aac khkc tbc", "saakht" ],
//
//
// // che
// [ "chkc nkd aac rt", "chenaar" ],
// [ "mkc chbc", "moch" ],
// [ "chkc rc bbt", "charb" ],
// [ "pkc rc chkc mbc", "parcham" ],
// [ "chkc shikd mbc", "cheshm" ],
//
//
// // kaf
// [ "kkc aac rt", "kaar" ],
// [ "bkc aac dt kkc nkd kbc", "baadkonak" ],
// [ "kkc nkd dc", "kand" ],
// [ "kkc ykd kbc", "keik" ],
// [ "shikc aac pkc rc kbt", "shaaparak" ],
// [ "kkc rc mbt", "kerm" ],
// [ "kkc mkd kbc", "komak" ],
// [ "khkc aac kbt", "khaak" ],
//
// // gaf
// [ "rt nkc gbc", "rang" ],
// [ "bkc rc gbt", "barg" ],
// [ "gkc rc gbt", "gorg" ],
// [ "sikc gbc", "sag" ],
// [ "gkc rc mbt", "garm" ],
// [ "sikc nkd gbc", "sang" ],
// [ "rt nkc gbc", "rang" ],
//
// 
// // le
// [ "dt lkc sikd aac", "delsaa" ], 
// [ "bkc aac lbt", "baal" ], 
// [ "bkc aac lkc shibc", "baalesh" ], 
// [ "lkc aac zt mbt", "laazem" ], 
// [ "bkc lkd aac lbt", "balaal" ], 
// ["bkc lkd nkd dc", "boland"],
// ["lkc bbc", "lab"],
// ["khkc aac lkc ybc", "khalee"],
// [ "chkc nkd gkd aac lbt", "changaal" ],
// [ "pkc lkd nkd gbc", "palang" ],
// 
// // fe
// ["bkc rc fbt", "barf"],
// ["fkc ykd lbc", "feel"],
// ["fkc rc dt aabi", "fardaa"],
// ["fkc rc ykc aac dt", "faryaad"],
// 
// 
// // ghaf
// ["ghkc nkd dc", "ghand"],
// ["ghkc aac shikc ghbc", "ghaashogh"],
// //["chkc aac ghbt", "chaagh"],
// ["bkc shikd ghkd aac bbt", "boshghaab"],
// ["ghkc rc mkc zc", "ghermez"],
// ["ghkc bkd lbc", "ghabl"],
//
// // vav
// ["sikc vc zt nbt", "soozan"],
// ["zt vt rt", "zoor"],
// ["dt vt rt", "door"],
// ["mkc vc shibt", "moosh"],
// ["aaba vt aabi zt", "aavaaz"],
// ["nkc vc aabi", "navaa"],
// ["mkc vc zc", "moz"],
// [ "pkc lkd vc", "polo" ], 
// [ "aaba lkc vc", "aaloo" ], 
// [ "vt aabi nkc ykd lbc", "vaaneel" ], 
//
// // jim
// [ "aabi ykc nkd jkd aac", "eenja" ],
// [ "gkc nkd jbc", "ganj" ],
// [ "jkc aac nbt", "jaan" ],
// [ "jkc ykd kbc jkc ykd kbc", "jeek jeek" ],
// [ "jkc aac dt vt", "jaadoo" ],
//
// // he
// [ "hkc mkd aac mbt", "hamaam" ],
// [ "hkc rc kkc tbc", "harekat" ],
// [ "hkc mkd ykd dc", "hameed" ],
// [ "hkc aac lbt", "haal" ],
// [ "mkc hkd lbc", "mahal" ],
//
// // hhe
// ["mkc aac hhat" , "maah" ],
// ["rt aabi hhat" , "raah" ],
// ["khkc nkd dc hhat" , "khandeh" ],
// ["khkc aac lkc hhac" , "khaleh" ],
// ["khkc aac nkc hhac" , "khaneh" ],
// ["zt rt aabi fkc hhac" , "zarafeh" ],
// ["mkc hhv mbc" , "mohem" ],
// ["hha mkd ykd shikd hhac" , "hamisheh" ],
//
// // zhe
// ["zht aabi kkc tbc" , "zhaakat" ],
// ["mkc aac zht ykc kbc" , "mazheek" ],
// ["bkc ykd zhc nbt" , "beezhan" ],
//
// // sad
// [ "sadekc dc aabi", "sedaa" ],
// [ "sadekc dc fbt", "sadaf" ],
// [ "sadekc aac fbt", "saaf" ],
// [ "sadekc nkd dc lkc ybc", "sandalee" ],
//
// // zze
// [ "aaba zzt rt", "aazar" ],
// [ "lkc zzc tbt", "lezat" ],
// [ "gkc zzc shikc tbc", "gozaasht" ],
// [ "zzt rt tbt", "zorat" ],
//
// // ein
// [ "einekc lkd ybc", "ali" ],
// [ "einekc mkd hhac", "ameh" ],
// [ "einekc mkd vc", "amoo" ],
// [ "einekc zc ykc zc", "azeez" ],
// [ "shikc mkd einebc", "shamea" ],
// [ "einekc ykd dc ybt", "eidee"],
// [ "shikc rc vt einebt", "shoroo"],
//
// // sse
// [ "kkc sskd ykd fbc", "kaseef"],
// [ "lkc sskd hhac", "laseh"],
// [ "sskc aac nkc ykd hhac", "sanieh"],
//
// // zad
// [ "mkc rc ykc zadebc", "mareez"],
// [ "rt zadekc aac", "reza"],
// [ "einekc vc zadebt", "avaz"],
//
// // ghein
// [ "gheinekc mbc", "gham"],
// [ "kkc lkd aac gheinebt", "khalaagh"],
// [ "bkc aac gheinebt", "baagh"],
// [ "mkc rc gheinebt", "morgh"],
// [ "jkc gheinekd dc", "joghd"],
// [ "gheinekc aac zt", "ghaaz"],
// [ "gheinekc rc vt bbt", "ghoroob"],
//
// // ta
// [ "ghkc vc tac ybc", "ghootee"],
// [ "tac aac lkc bkd ybc", "taalebee" ],
// [ "tac vc tac ybc", "tootee" ],
// [ "vt sikc tat", "vasat" ],
// [ "vt tac nbc", "vatan" ],
// [ "hkc ykd aac tat", "hayaat" ],
// 
// // za
// [ "zac rc fbt", "zarf" ],
// [ "zac hhv rc", "zohr" ],
// [ "nkc zad mbc", "nazm" ],
// [ "hkc aac fkc zar", "haafez" ],
// [ "lkc hkd zad hhac", "lahzeh" ],
// [ "khkc dc aabi hkc aac fkc zar", "khodahafez" ],
// [ "mkc vc aabi zac bbc", "movazeb" ],

]


// harfName,
//       harfSound HarfKey harFrom(harfLead) primaryKey
//       harfSound HarfKey harfForm primaryKey  
//       if primaryKey is self
//           harfKey renders as itself in alphaTile and resolve as itself in placeHolderInst 
//       else 
//           harfKey renders as primaryKey in alphaTile and resolve ast itself in placeHolderInst
const harfInput = [
  `alef 
       aa aaba aa_bakola self
       aa aac aa_chasban self
       aa aabi aa_bikola self
       aa_a aabia aa_bikola_a aabi
       aa_e aabie aa_bikola_e aabi
       aa_o aabio aa_bikola_o aabi`,
  `be 
       be bbt be_bozorg_tanha self 
       be bkc be_koochik_chap self 
       be_a bkca _ bkc 
       be_e bkce _ bkc 
       be_o bkco _ bkc 
       be bkd be_koochik_dovar self 
       be_a bkda _ bkd 
       be_e bkde _ bkd 
       be_o bkdo _ bkd 
       be bbc be_bozorg_chasban self`,
// `de 
//      de dt de_tanha 
//      de_a dta _ 
//      de_e dte _ 
//      de_o dto _ 
//      de dc de_chasban 
//      de_a dca _ 
//      de_e dce _ 
//      de_o dco _` ,
// `meem 
//      me mbt me_bozorg_tanha 
//      me mkc me_koochik_chap 
//      me_a mkca _ 
//      me_e mkce _ 
//      me_o mkco _ 
//      mkd me_koochik_dovar 
//      me_a mkda _ 
//      me_e mkde _ 
//      me_o mkdo _ 
//      me mbc me_bozorg_chasban`,
  //"re re rt re_tanha rc re_chasban" ,
  //"noon ne nbt  ne_bozorg_tanha nkc  ne_koochik_chap nkd ne_koochik_dovar nbc ne_bozorg_chasban" ,
  //"ye ye ybt  ye_bozorg_tanha ykc ye_koochik_chap ykd ye_koochik_dovar  ybc ye_bozorg_chasban" ,
  //"sin se sibt sine_bozorg_tanha sikc  sine_koochik_chap sikd sine_koochik_dovar sibc sine_bozorg_chasban" ,
  //"pe pe pbt pe_bozorg_tanha  pkc pe_koochik_chap pkd pe_koochik_dovar pbc pe_bozorg_chasban" ,
  //"te te tbt te_bozorg_tanha tkc te_koochik_chap tkd te_koochik_dovar tbc te_bozorg_chasban" ,
  //"shin she shibt shine_bozorg_tanha shikc  shine_koochik_chap shikd shine_koochik_dovar shibc shine_bozorg_chasban" ,
  //"ze ze zt ze_tanha zc ze_chasban" ,
  //"khe khe khbt khe_bozorg_tanha khkc khe_koochik_chap khkd khe_koochik_dovar khbc khe_bozorg_chasban" ,
  //"che che chbt che_bozorg_tanha chkc che_koochik_chap chkd che_koochik_dovar chbc che_bozorg_chasban" ,
  //"kaf ke kbt ke_bozorg_tanha kkc ke_koochik_chap kkd ke_koochik_dovar kbc ke_bozorg_chasban" ,
  //"gaf ge gbt ge_bozorg_tanha gkc ge_koochik_chap gkd ge_koochik_dovar gbc ge_bozorg_chasban" ,
  //"lam le lbt le_bozorg_tanha lkc le_koochik_chap lkd le_koochik_dovar lbc le_bozorg_chasban" ,
  //"fe fe fbt fe_bozorg_tanha fkc fe_koochik_chap fkd fe_koochik_dovar fbc fe_bozorg_chasban" ,
  //"ghaf ghe ghbt ghe_bozorg_tanha ghkc ghe_koochik_chap ghkd ghe_koochik_dovar ghbc ghe_bozorg_chasban" ,
  //"vav ve vt vav_tanha vc vav_chasban",
  //"jim je jbt je_bozorg_tanha jkc je_koochik_chap jkd je_koochik_dovar jbc je_bozorg_chasban" ,
  //"he he hkc he_koochik_chap hkd he_koochik_dovar hbt he_bozorg_tanha hbc he_bozorg_chasban" ,
  //"hhe he hhat hhe_akhar_tanha hhv hhe_vasat hhac hhe_akhar_chasban hha hhe_aval", 
  //"zhe zhe zht zhe_tanha zhc zhe_chasban" ,
  //"sad se sadebt sade_bozorg_tanha sadekc sade_koochik_chap sadekd sade_koochik_dovar sadebc sade_bozorg_chasban",
  //"zze ze zzt zale_tanha zzc zale_chasban" ,
  //"ein ee einebt eine_bozorg_tanha einekc eine_koochik_chap einekd eine_koochik_dovar einebc eine_bozorg_chasban",
  //"sse se ssbt sse_bozorg_tanha sskc sse_koochik_chap sskd sse_koochik_dovar ssbc sse_bozorg_chasban" ,
  //"zad ze zadebt zade_bozorg_tanha zadekc zade_koochik_chap zadekd zade_koochik_dovar zadebc zade_bozorg_chasban",
  //"ghein ghe gheinebt gheine_bozorg_tanha gheinekc gheine_koochik_chap gheinekd gheine_koochik_dovar gheinebc gheine_bozorg_chasban",
  //"ta te tat ta_tanha tac ta_chap tar ta_rast tad ta_dovar", 
  //"za ze zat za_tanha zac za_chap zar za_rast zad za_dovar", 

  //[ faseleh ] 
]

module.exports = {
  harfInput,
  darsesInput,
}
