/* THE STORY MACHINE — data: pools, beats, advice.
   Pools sourced from Randomizer_Lists___EDIT_ME. */

const POOLS = {
  STRUCTURAL_CONCEITS: [
    "Tell the whole story in real time. Any editing is spatial, not temporal.",
    "Tell the story out of order.",
    "Bottle film: set the entire film in a single location.",
    "Tell the story in one continuous take (or using rope cuts).",
    "The story takes place across three short scenes, years apart.",
    "Tell it as a frame story; someone recounting it later.",
    "Restrict the film to a single conversation.",
    "Tell the story with no dialogue.",
    "Let an object, not a person, be the throughline.",
    "One scene, repeated. Each pass reveals something new.",
    "Every cut is a match cut.",
    "The film is told by an unreliable narrator.",
    "Tell the story from a single fixed camera position.",
    "Clues are delivered through intercuts.",
    "The entire film is shot using closed framing.",
    "The film is a musical.",
    "Use non-faithful foley sounds.",
    "Use frames within frames in every shot of the film.",
    "Use reflections in surprising ways.",
    "The characters are aware, or become aware, that they are in a film.",
    "Use double exposure to show a merge of ideas.",
    "Start from a misunderstanding. Each beat complicates it.",
  ],
  PERSONAL_THEMES: ["Identity","Memory","Fear","Desire","Transformation","Belonging","Love","Isolation","Curiosity","Ambition","Grief","Hope","Shame","Forgiveness","Resilience","Doubt","Dreams","Joy","Guilt","Obsession","Acceptance","Betrayal","Wonder","Survival","Freedom","Healing","Control","Revenge","Growth","Childhood"],
  SOCIETAL_THEMES: ["Capitalism","Colonialism","Gender roles","Racial inequality","Censorship","Migration","Climate crisis","Mass surveillance","Education systems","Healthcare access","Technology","Labor rights","Democracy","Warfare","Nationalism","Cultural appropriation","Housing inequality","Media bias","Artificial intelligence","Voting rights","Digital privacy","Wealth distribution","Environmental degradation","Corporate influence","Police brutality"],
  PROTAG_ADJECTIVES: ["Nervous","Reluctant","Anxious","Lonely","Stubborn","Hopeful","Bitter","Awkward","Cynical","Idealistic","Curious","Restless","Guarded","Ambitious","Jaded","Tender","Volatile","Withdrawn","Defiant","Earnest","Wounded","Compassionate","Skeptical","Reckless","Quiet","Suspicious","Desperate","Forgiving","Tired","Resentful","Devoted","Disillusioned","Hesitant","Self-righteous","Charming","Insecure","Obsessive","Lost","Paranoid","Driven","Grieving","Distracted","Overworked","Bored","Sentimental"],
  PROTAG_ROLES: ["teacher","nurse","doctor","therapist","bartender","waiter","barista","sock puppet","delivery driver","office worker","cashier","receptionist","janitor","locksmith","mechanic","electrician","hairdresser","florist","photographer","tutor","babysitter","roommate","neighbour","single parent","college student","teenager","grandmother","grandfather","retiree","bus driver","imaginary friend","funeral attendee","dinner-party host","bride","groom","stand-up comedian","karaoke host","street musician","ghost","dog walker","apartment manager","estranged sibling","childhood friend","old flame","sentient object","magician","tour guide","substitute teacher","insomniac","job applicant","first-time father","first-time mother","bookstore clerk","diner regular","tenant","landlord","blind date"],
  PROPS: ["A wedding ring","An unsent letter","A house key","A pregnancy test","A locket","A photograph","A childhood toy","A passport","An unopened envelope","A diary","A ticket stub","A wedding dress","An urn","A worn paperback","A handwritten note","A scratched record","A small cactus","A ceramic mug","An antique phone","A medical scan","A leather journal","A stuffed animal","A bouquet of flowers","A pet collar","A musical instrument","A tape recorder","A wallet found on the ground","A voicemail saved for years","A handwritten recipe","A key","A Polaroid","An ornate box","A camera"],
  PROTAG_RELATIONSHIPS: ["An estranged sibling","A childhood best friend","A first love","Someone from a dating app","An old roommate","A stranger","Former bandmates","A therapist","A mentor","A recently divorced co-parent","An online friend","An unwelcomed guest","A ghost","A new neighbour","An interviewer"],
  SETTINGS: ["A laundromat at 2 a.m.","A simulated space","A time loop","A kitchen","A funeral reception","A dog park","A long bus ride","A park bench","An empty office after hours","A diner","A grocery store","A dimly lit bar","A farm, by the animals","A bus stop","A back porch during a storm","A small town","A post office","A telephone booth","A child's bedroom","An undefined space","An attic full of boxes","A hotel lobby","A bathroom","A used bookstore","A garage workshop","A store","An empty playground","A subway car","A rooftop in summer","A driveway at dusk","An office","An art gallery"],
  RISING_COMPLICATIONS: [
    "An ally turns out to want something different.",
    "A shortcut makes everything harder.",
    "Someone the protagonist lied to finds out.",
    "Help arrives with a condition attached.",
    "The protagonist gets what they asked for, and it is wrong.",
    "A deadline suddenly moves closer.",
    "The protagonist has to choose who to disappoint.",
    "A mistake resurfaces at the worst time.",
    "The protagonist's plan works — for someone else.",
    "The protagonist has to go somewhere they don't want to go.",
    "A small lie becomes a bigger one.",
    "The protagonist is offered an easy way out they can't or won't take.",
    "Someone asks for the one thing the protagonist cannot give.",
    "The protagonist succeeds and realises it changed nothing.",
    "A secret is revealed.",
    "The protagonist has to ask the person they did not want to ask.",
    "The protagonist has to do something they don't want to do.",
    "The thing they were protecting gets exposed anyway.",
    "They win the argument and lose something more important.",
    "The opening they were counting on is closed.",
    "Their flaw causes the exact problem they feared.",
    "Someone offers forgiveness they cannot accept yet.",
    "The stakes become personal in a way they were not before.",
  ],
  FALLING_BEATS: [
    "A small gesture shows the true cost of the choice.",
    "Someone reacts; their reaction is the whole scene.",
    "The protagonist does one ordinary thing, changed.",
    "A silence between two people says everything.",
    "Someone who was present leaves; someone absent arrives.",
    "The protagonist looks at the thing the story began with.",
    "A door, a phone, a light — something closes or opens.",
    "The protagonist is alone with what they did.",
    "Two people occupy the same space differently now.",
    "The world resumes, indifferent, around the protagonist.",
    "The world feels different — suggested through film language.",
    "Someone offers the protagonist a small, ordinary kindness.",
  ],
  RESOLUTION_BEATS: [
    "The closing image is the opening image. The meaning has changed.",
    "The closing image is the opening image. The meaning is the same.",
    "The closing image echoes the opening. The meaning has developed.",
    "The protagonist repeats a first-scene action, differently. They have changed.",
    "The protagonist repeats a first-scene action. They have remained the same.",
    "A relationship settles into a new, quiet equilibrium.",
    "The protagonist keeps something — or finally lets it go.",
    "Someone speaks the line they could not say at the start.",
    "The protagonist is somewhere new, doing something small and true.",
    "An object from the story finds its final place.",
    "The protagonist is seen by someone who did not see them before.",
    "The protagonist disappears.",
    "The protagonist accepts what they spent the film resisting.",
    "The world is the same; the protagonist is not.",
    "Something indicates that the story will repeat itself.",
    "An element of film language shifts, signifying a change.",
  ],
};

/* Writing order — from the original Story Arc Builder */
const WRITE_ORDER = ['theme','protagonist','climax','inciting','resolution','falling','rising1','rising2','rising3'];

const NEXT_LABELS = {
  theme: 'THEME', protagonist: 'PROTAGONIST', climax: 'CLIMAX',
  inciting: 'INCITING', resolution: 'RESOLUTION', falling: 'FALLING',
  rising1: 'RISING I', rising2: 'RISING II', rising3: 'RISING III',
};

/* Each beat: machine button, panel, fields, randomizer, advice */
const BEATS = {
  theme: {
    label: 'Theme', short: 'THEME', color: '#f5b800',
    sub: 'One personal. One societal. One sentence to hold them.',
    fields: [
      { key: 'personalTheme', label: 'Personal theme', rows: 1, ph: 'Grief. Belonging. Control…' },
      { key: 'societalTheme', label: 'Societal theme', rows: 1, ph: 'Surveillance. Housing. Labor…' },
      { key: 'themeStatement', label: 'Theme statement', rows: 3, ph: 'A sentence with a point of view, joining the two.' },
    ],
    roll: () => 'PERSONAL — ' + rand(POOLS.PERSONAL_THEMES) + '   ·   SOCIETAL — ' + rand(POOLS.SOCIETAL_THEMES),
    advice: [
      'A theme is an argument, not a topic.',
      'If the film could end either way, the theme is not done.',
      'Cheap to shoot, expensive to feel. Theme costs nothing.',
      'Test it: can a stranger disagree with your statement? Good.',
    ],
  },
  protagonist: {
    label: 'Protagonist', short: 'PROTAG', color: '#00d4f5',
    sub: 'The human face of the theme.',
    fields: [
      { key: 'protagonistName', label: 'Name', rows: 1, ph: 'A name.' },
      { key: 'protagonistDesc', label: 'Who are they?', rows: 2, ph: 'Before everything changes.' },
      { key: 'need', label: 'Need — internal', rows: 2, ph: 'What they must learn. They may not know it.' },
      { key: 'want', label: 'Want — external', rows: 2, ph: 'The concrete goal. The engine of the plot.' },
      { key: 'flaw', label: 'Fatal flaw', rows: 2, ph: 'The way they defeat themselves.' },
    ],
    roll: () => { const a = rand(POOLS.PROTAG_ADJECTIVES); return a + ' ' + rand(POOLS.PROTAG_ROLES) + '   ·   with ' + rand(POOLS.PROTAG_RELATIONSHIPS).toLowerCase(); },
    advice: [
      'Cast someone you already know. Write toward them.',
      'The want is visible. The need is not. Film the want.',
      'One flaw, used twice, beats three flaws used once.',
      'Wardrobe from their closet. Character from yours.',
    ],
  },
  climax: {
    label: 'Climax', short: 'CLIMAX', color: '#c96fff',
    sub: 'Want and need collide. A choice reveals who they are.',
    fields: [
      { key: 'climaxConflict', label: 'Conflict — what forces the choice', rows: 3, ph: 'The moment delay stops being possible.' },
      { key: 'climaxChoice', label: 'Choice — what they decide', rows: 3, ph: 'What it costs them.' },
    ],
    // No randomizer. Want = tragedy, need = comedy.
    roll: null,
    fate: {
      want: 'They get what they WANT. — tragedy',
      need: 'They get what they NEED. — comedy',
    },
    advice: [
      'The climax is a decision, not an event.',
      'Two people, one room, one question. That is enough.',
      'Shoot the choice on the face, not the action.',
      'If they get their want: tragedy. Their need: comedy.',
    ],
  },
  inciting: {
    label: 'Inciting Incident', short: 'INCITING', color: '#ff9d2e',
    sub: 'The latest possible moment the story can start.',
    fields: [
      { key: 'inciting', label: 'Event', rows: 4, ph: 'What disrupts the ordinary world?' },
    ],
    rollCat: ['PROP', 'SETTING', 'CHARACTER'],
    roll: (cat) => {
      if (cat === 'PROP') return 'PROP — ' + rand(POOLS.PROPS);
      if (cat === 'SETTING') return 'SETTING — ' + rand(POOLS.SETTINGS);
      return 'CHARACTER — ' + rand(POOLS.PROTAG_RELATIONSHIPS);
    },
    advice: [
      'Start as late as you possibly can. Then later.',
      'An object can incite. Objects work for free.',
      'It must make the climax inevitable in hindsight.',
      'One location. One disruption. Go.',
    ],
  },
  resolution: {
    label: 'Resolution', short: 'RESOLVE', color: '#9fe870',
    sub: 'The new normal. Echo the beginning.',
    fields: [
      { key: 'resolution', label: 'Resolution', rows: 3, ph: 'The final moments of the film.' },
      { key: 'change', label: 'Change', rows: 3, ph: 'What is different now — or refuses to be.' },
    ],
    roll: () => rand(POOLS.RESOLUTION_BEATS),
    advice: [
      'Reuse your opening location. It reads as design.',
      'Show the change. Never say it.',
      'The last image is the theme, answered.',
      'Shorter than you think. Then shorter.',
    ],
  },
  falling: {
    label: 'Falling Action', short: 'FALLING', color: '#ff6f91',
    sub: 'The immediate ripples. Often one beat is enough.',
    fields: [
      { key: 'falling', label: 'Event', rows: 4, ph: 'What happens just after the choice?' },
    ],
    roll: () => rand(POOLS.FALLING_BEATS),
    advice: [
      'A reaction shot can be the whole scene.',
      'Silence is free and reads as confidence.',
      'Cut it to the bone. Grief moves fast on film.',
      'You may already have this shot in coverage.',
    ],
  },
  rising1: {
    label: 'Rising Action I', short: 'RISE I', color: '#46e3b1',
    sub: 'The first complication.',
    fields: [{ key: 'rising1', label: 'Beat one', rows: 4, ph: 'The first obstacle after the incident.' }],
    roll: () => rand(POOLS.RISING_COMPLICATIONS),
    advice: [
      'First attempt fails. Cheaply, on screen.',
      'Reuse your inciting location. Save a company move.',
      'Escalate pressure, not production value.',
      'One beat, one intention, one obstacle.',
    ],
  },
  rising2: {
    label: 'Rising Action II', short: 'RISE II', color: '#3ab6ff',
    sub: 'Raise the stakes.',
    fields: [{ key: 'rising2', label: 'Beat two', rows: 4, ph: 'What makes it worse?' }],
    roll: () => rand(POOLS.RISING_COMPLICATIONS),
    advice: [
      'Make it personal. Personal is free.',
      'The flaw should start costing them here.',
      'Schedule this scene with your longest setup first.',
      'A partial win that makes things worse.',
    ],
  },
  rising3: {
    label: 'Rising Action III', short: 'RISE III', color: '#7a8cff',
    sub: 'The last straw before the climax.',
    fields: [{ key: 'rising3', label: 'Beat three', rows: 4, ph: 'What forces the climax?' }],
    roll: () => rand(POOLS.RISING_COMPLICATIONS),
    advice: [
      'Close every exit. Quietly.',
      'This beat should make the climax necessary.',
      'Night scenes cost. Ask if dusk will do.',
      'End it on the protagonist, deciding to walk in.',
    ],
  },
};

/* Fly-through tour: order across the panel + one line each. */
const TOUR = [
  { id: 'theme',      line: 'Theme.', body: 'One personal, one societal. A sentence that argues.' },
  { id: 'protagonist',line: 'Protagonist.', body: 'A want they chase. A need they cannot see.' },
  { id: 'inciting',   line: 'Inciting incident.', body: 'The latest possible moment to begin.' },
  { id: 'rising1',    line: 'Rising action, one.', body: 'The first attempt. It fails.' },
  { id: 'rising2',    line: 'Rising action, two.', body: 'The stakes turn personal.' },
  { id: 'rising3',    line: 'Rising action, three.', body: 'The last straw.' },
  { id: 'climax',     line: 'Climax.', body: 'Want and need collide. They choose.' },
  { id: 'falling',    line: 'Falling action.', body: 'The ripples. Often a single beat.' },
  { id: 'resolution', line: 'Resolution.', body: 'The new normal. The beginning, echoed.' },
];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
