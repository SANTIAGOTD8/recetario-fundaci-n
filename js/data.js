// Recetas: [vegetal, emoji, nombre, ingredientes (", "), pasos ("|")]
// Se colocan en las casillas 3, 6, 9... 99 (33 casillas). Se invierte para que la primera quede en la 3.
const F=[
["Brócoli","🥦","Arbolitos con queso","brócoli, queso rallado, sal","Lava y separa el brócoli en arbolitos|Hiérvelo 4 minutos en agua con sal|Escúrrelo y cúbrelo con queso hasta que se derrita"],
["Arracacha","🥔","Puré de arracacha","arracacha, mantequilla, leche, sal","Pela y corta en trozos|Cocina 20 minutos hasta que esté blanda|Machaca con mantequilla, leche y sal"],
["Guatila","🥒","Guatila con hogao","guatila, cebolla, tomate, sal","Pela y quita la semilla|Cocínala en agua 10 minutos|Mézclala con cebolla y tomate sofritos"],
["Alcachofa","🌱","Alcachofa con limón","alcachofa, limón, sal, mayonesa","Hierve 30 minutos con sal y limón|Arranca las hojas una a una|Moja la base de cada hoja en mayonesa y raspa con los dientes"],
["Pimentón","🫑","Pimentón relleno","pimentón, arroz cocido, queso","Corta la tapa y saca las semillas|Rellena con arroz y queso|Cocina tapado en la estufa a fuego bajo 10 minutos"],
["Zuquini","🥒","Tortitas de zuquini","zuquini, huevo, harina, sal","Ralla el zuquini y exprime el agua|Mezcla con huevo, harina y sal|Dora cucharadas en sartén con poquito aceite"],
["Calabaza","🎃","Sopa de calabaza","calabaza, cebolla, caldo, leche","Pica y cocina con cebolla en caldo 15 minutos|Licúa hasta que quede cremosa|Agrega un chorrito de leche y sirve caliente"],
["Cilantro","🌿","Salsa verde","cilantro, cebolla, limón, sal","Lava y pica el cilantro y la cebolla|Mezcla con limón y sal|Sírvela sobre arroz, papa o huevo"],
["Berenjena","🍆","Berenjena con queso","berenjena, tomate, queso, sal, aceite","Corta en rodajas y ponles sal 10 minutos|Fríe las rodajas 3 minutos por lado|Cubre con tomate y queso y tapa la sartén 3 minutos"],
["Remolacha","🟣","Ensalada rosada","remolacha, zanahoria, limón, sal","Cocina la remolacha 30 minutos, pela y deja enfriar|Ralla con la zanahoria|Aliña con limón y sal"],
["Ñame","🍠","Tortitas de ñame","ñame, queso, sal","Pela y cocina el ñame hasta que esté blando|Machaca con queso y sal|Forma tortitas y dóralas en sartén"],
["Rábano","🌸","Rábano crujiente","rábano, limón, sal","Lava y corta en rodajas finas|Mezcla con limón y sal|Sírvelo con arroz o en ensalada"],
["Espinaca","🥬","Huevo con espinaca","espinaca, huevos, cebolla, sal","Lava y pica la espinaca|Sofríe con cebolla 2 minutos|Agrega los huevos batidos y revuelve"],
["Habas","🫘","Habas con papa","habas, papa, cebolla, sal","Desgrana las habas|Cocínalas con la papa 20 minutos|Mezcla con cebolla sofrita"],
["Nabos","🥔","Sopa de nabo","nabo, papa, zanahoria, caldo, cilantro","Pela y pica las verduras|Hierve en caldo 20 minutos|Sirve con cilantro picado"],
["Acelga","🥬","Arroz con acelga","acelga, arroz, cebolla, sal","Pica la acelga y la cebolla|Sofríe la cebolla, agrega arroz y agua|Añade la acelga al final y cocina 5 minutos"],
["Ahuyama","🎃","Bolitas de ahuyama","ahuyama, queso, harina, sal","Cocina y machaca la ahuyama|Mezcla con queso, harina y sal|Haz bolitas y dóralas en sartén con poquito aceite"],
["Guascas","🌿","Ajiaco sencillo","guascas, papas, pollo, mazorca, sal","Cocina el pollo y las papas en agua|Agrega la mazorca y las guascas|Cocina 30 minutos y sirve con crema"],
["Repollo","🥬","Ensalada de repollo","repollo, zanahoria, limón, sal","Pica el repollo fino y ralla la zanahoria|Mezcla las dos|Aliña con limón y sal"],
["Tomate","🍅","Salsa de tomate casera","tomate, cebolla, ajo, sal","Pica todo|Cocina 15 minutos|Aplasta o licúa y sirve con arroz o pasta"],
["Aguacate","🥑","Guacamole","aguacate, tomate, limón, sal","Aplasta el aguacate|Mezcla con tomate picado, limón y sal|Come con arepa o galletas"],
["Cebolla larga","🧅","Hogao colombiano","cebolla larga, tomate, sal","Pica la cebolla y el tomate|Sofríe 10 minutos a fuego bajo|Sirve sobre arroz, papa o huevo"],
["Lentejas","🫘","Lentejas con verduras","lentejas, zanahoria, cebolla, papa","Remoja las lentejas 1 hora|Cocina 40 minutos con las verduras|Sirve con arroz"],
["Yuca","🍠","Palitos de yuca","yuca, sal, aceite","Pela, quita el centro duro y corta en palitos|Hierve 20 minutos hasta que estén blandos (la yuca cruda no se come)|Fríe hasta dorar en poquito aceite"],
["Plátano","🍌","Patacones","plátano verde, sal, aceite","Pela y corta en trozos gruesos|Fríe 3 minutos|Aplasta, sala y fríe de nuevo hasta dorar"],
["Papaya","🥭","Batido de papaya","papaya, leche, azúcar o miel","Pela y quita las semillas|Licúa con leche y un poquito de azúcar|Sirve bien frío"],
["Sapote","🍊","Crema de sapote","sapote, leche, hielo","Saca la pulpa y quita las semillas|Licúa con leche y hielo|Sirve en vasos"],
["Pitahaya","🐉","Copa de pitahaya","pitahaya, yogur, banano","Corta la pitahaya y saca la pulpa en cubos|Pica el banano|Mezcla con yogur en un vaso"],
["Champiñones","🍄","Champiñones salteados","champiñones, ajo, mantequilla, sal","Límpialos con un paño húmedo (compra solo los de tienda, nunca hongos del campo)|Córtalos en láminas|Saltea 5 minutos con ajo y mantequilla"],
["Piña","🍍","Piña asada con canela","piña, canela, miel","Pela y corta en rodajas|Espolvorea canela y un chorrito de miel|Dora en sartén 3 minutos por lado"],
["Pepino","🥒","Agua fresca de pepino","pepino, limón, agua, azúcar, hierbabuena","Pela y corta el pepino|Licúa con agua, limón y azúcar|Cuela y sirve con hielo y hierbabuena"],
["Guanábana","🍈","Jugo de guanábana","guanábana, leche, azúcar","Saca la pulpa y quita TODAS las semillas|Licúa con leche y azúcar|Sirve bien frío"],
["Pera","🍐","Pera con canela","pera, canela, miel, agua","Corta en trozos y saca el centro|Cocina en una olla con un poquito de agua, canela y miel 10 minutos|Sirve tibia o fría"]
].reverse();


// Recetas de reserva sin casilla. Para usarlas, muévelas a F (el tablero tiene 33 casillas de receta).
const RESERVA=[
["Apio","🌿","Palitos de apio rellenos","apio, queso crema, pasas","Lava y corta el apio en palitos|Rellénalos con queso crema|Decora con pasas"],
["Cebolla cabezona","🧅","Cebolla caramelizada","cebolla cabezona, aceite, azúcar, sal","Corta en tiras finas|Cocina a fuego bajo 20 minutos con una pizca de azúcar|Sirve sobre arroz, arepa o carne"],
["Melón","🍈","Paletas de melón","melón, limón, miel","Pela, quita las semillas y licúa con limón y miel|Vierte en moldes con palito|Congela 4 horas"]
];
