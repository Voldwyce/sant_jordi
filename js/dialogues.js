const dialogues = [
  {
    id: "intro",
    personaje: "",
    texto: "...",
    tipo: "dialogo",
    fondo: "scene_dragon_attack.png"
  },
  {
    id: "act1_01",
    personaje: "Narrador",
    texto: "Hace mucho, en la villa de Montblanc, un dragón emergió del bosque. Su aliento incendiaba cosechas y su mirada hacía temblar al más valiente.",
    tipo: "dialogo",
    fondo: "scene_dragon_attack.png"
  },
  {
    id: "act1_02",
    personaje: "Narrador",
    texto: "Para evitar su furia, los habitantes ofrecieron sacrificios: una vida humana al día. El dragón aceptó.",
    tipo: "dialogo",
    fondo: "scene_pueblo_sacrificio.png"
  },
  {
    id: "act1_03",
    personaje: "Narrador",
    texto: "Un día, un caballero solitario llegó a Montblanc...",
    tipo: "dialogo",
    fondo: "scene_camino_caballero.png"
  },
  {
    id: "nombre",
    tipo: "nombre",
    texto: "¿Cuál es tu nombre, forastero?",
    fondo: "scene_camino_caballero.png"
  },
  {
    id: "act1_04",
    personaje: "Narrador",
    texto: "Bienvenido, {{nombre}}. El pueblo te mira con esperanza y miedo. No eres de aquí, pero quizá eres lo que necesitan.",
    tipo: "dialogo",
    fondo: "scene_pueblo_sacrificio.png"
  },
  {
    id: "decision_01",
    tipo: "decision",
    texto: "¿Quieres ir al castillo?",
    opciones: [
      { texto: "Sí", siguiente: "hablar_npcs" },
      { texto: "No", siguiente: "fin_no_ayuda" }
    ],
    fondo: "scene_pueblo_sacrificio.png"
  },
  {
    id: "hablar_npcs",
    personaje: "Anciano",
    texto: "Yo vi al dragón con mis propios ojos. Ninguna espada lo atraviesa. ¿Eres tan valiente?",
    tipo: "dialogo",
    fondo: "npc_anciano.png"
  },
  {
    id: "nino_miedo",
    personaje: "Niño",
    texto: "Mi hermano fue llevado el mes pasado... no volvió.",
    tipo: "dialogo",
    fondo: "npc_nino.png"
  },
  {
    id: "panadera",
    personaje: "Panadera",
    texto: "Todos rezan por un milagro...",
    tipo: "dialogo",
    fondo: "npc_panadera.png"
  },
  {
    id: "act1_final",
    personaje: "Narrador",
    texto: "Con sus palabras en mente, acabas llegando al castillo.",
    tipo: "dialogo",
    fondo: "scene_pueblo_sacrificio.png"
  },
  {
    id: "act2_01",
    personaje: "Narrador",
    texto: "El rey te espera en la sala del trono. Su mirada es seria.",
    tipo: "dialogo",
    fondo: "scene_sala_trono.png"
  },
  {
    id: "rey_01",
    personaje: "Rey",
    texto: "{{nombre}}... el sorteo... Mi hija debe ser sacrificada hoy al dragón.",
    tipo: "dialogo"
  },
  {
    id: "rey_02",
    personaje: "Rey",
    texto: "Como padre, me duele. Como rey... no puedo romper la tradición. ¿Estarías dispuesto a enfrentarte al dragon?",
    tipo: "decision",
    opciones: [
      { texto: "Sí, la salvaré", siguiente: "act2_preparacion" },
      { texto: "No puedo hacerlo", siguiente: "renuncia_honorable" }
    ]
  },
  {
    id: "renuncia_honorable",
    personaje: "Narrador",
    texto: "El rey asiente con tristeza. Respetan tu decisión. La princesa parte hacia su destino...",
    tipo: "dialogo",
    fondo: "scene_game_over_dragon.png"
  },
  {
    id: "fin_no_ayuda",
    personaje: "",
    texto: "FIN. A veces, no hacer nada también es una elección...",
    tipo: "final",
    fondo: "scene_game_over_dragon.png"
  },
  {
    id: "act2_preparacion",
    personaje: "Narrador",
    texto: "Te preparas. Una espada oxidada, una armadura prestada... y la esperanza de todo un reino.",
    tipo: "dialogo",
    fondo: "scene_armamento.png"
  },
  {
    id: "despedida_princesa",
    personaje: "Princesa",
    texto: "Gracias por darme una esperanza que ya no tenía, deposito mi vida en tus manos.",
    tipo: "dialogo",
    fondo: "scene_princesa_despedida.png"
  },
  {
    id: "camino_al_claro",
    personaje: "Narrador",
    texto: "La niebla del bosque se disipa. Frente a ti, una roca solitaria. Allí está la princesa... de pie, inmóvil, con los ojos cerrados. El dragón la rodea.",
    tipo: "dialogo",
    fondo: "scene_dragon_princesa.png"
  },
  {
    id: "inicio_minijuego_llamas",
    personaje: "",
    texto: "",
    tipo: "minijuego_llamas"
  },
  {
    id: "post_llamas",
    personaje: "Narrador",
    texto: "Esquivando las llamas, te lanzas hacia el dragón, dispuesto a acabar con el.",
    tipo: "dialogo",
    fondo: "scene_golpe_espada.png"
  },
  {
    id: "rosa_brota",
    personaje: "Narrador",
    texto: "De su herida mana algo imposible: una rosa roja, vibrante, brota donde antes solo hubo fuego.",
    tipo: "dialogo",
    fondo: "scene_rosa_brotando.png"
  },
  {
    id: "caballero_ofrece_rosa",
    personaje: "Narrador",
    texto: "El caballero, aún jadeante, recoge la rosa y se acerca a la princesa.",
    tipo: "dialogo",
    fondo: "scene_ceballero_rosa.png"
  },
  {
    id: "beso_princesa",
    personaje: "Narrador",
    texto: "Ella sonríe y besa al caballero. No como princesa, sino como quien vuelve a creer.",
    tipo: "dialogo",
    fondo: "scene_beso_caballero_princesa.png"
  },
  {
    id: "celebracion_pueblo",
    personaje: "Narrador",
    texto: "Esa noche, en Montblanc, el miedo se disipo, como la después de la batalla. Nadie olvidará tu nombre.",
    tipo: "dialogo",
    fondo: "scene_celebracion.png",
    desbloqueaDragon: true
  },
  {
    id: "fin_bueno",
    personaje: "",
    texto: "FIN. En la herida del dragón floreció algo más que una rosa: nació una leyenda, la leyenda de Sant {{nombre}}.",
    tipo: "final",
    fondo: "scene_rosa_brotando.png"
  },
  {
    id: "fin_derrota_llamas",
    personaje: "",
    texto: "El caballero fue derrotado antes de poder salvar a la princesa...",
    tipo: "final",
    fondo: "game_over_dragon.png"
  }  
];
