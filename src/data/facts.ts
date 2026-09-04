export type FactCategory = 'dev' | 'hero'

export interface Fact {
  id: string
  category: FactCategory
  text: string
}

export const facts: Fact[] = [
  // ── Dev / Tech WOW Facts (1 - 50) ──────────────────────────────────
  {
    id: 'dev-1',
    category: 'dev',
    text: 'NASA lost the $125 million Mars Climate Orbiter in 1999 because one engineering team calculated thrust in Imperial units (pound-seconds) while another team used Metric units (newton-seconds).',
  },
  {
    id: 'dev-2',
    category: 'dev',
    text: 'In 2003, a single cosmic ray hitting a voting machine in Belgium flipped a single bit in computer RAM, mistakenly adding 4,096 extra votes to a political candidate!',
  },
  {
    id: 'dev-3',
    category: 'dev',
    text: 'NASA\'s Voyager 1 spacecraft is over 15 billion miles away from Earth and communicates across interstellar space using an 8-watt transmitter—less power than a standard nightlight!',
  },
  {
    id: 'dev-4',
    category: 'dev',
    text: 'The famous Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) was created by developer Kazuhisa Hashimoto in 1986 because he found his own game Gradius too hard to beat during playtesting.',
  },
  {
    id: 'dev-5',
    category: 'dev',
    text: 'The entire security of the global internet domain system relies on 14 physical keys held by 14 people across the world, who meet every 3 months for a secret key-signing ceremony.',
  },
  {
    id: 'dev-6',
    category: 'dev',
    text: 'Over 90% of the world\'s total money supply exists only as digital bits on computer servers, while less than 10% exists as physical cash or coins.',
  },
  {
    id: 'dev-7',
    category: 'dev',
    text: 'In 2010, an automated high-frequency trading algorithm caused the "Flash Crash", causing the US stock market to plummet nearly 1,000 points and lose $1 Trillion in under 36 minutes!',
  },
  {
    id: 'dev-8',
    category: 'dev',
    text: 'The first computer bug was an actual moth found trapped inside a hardware relay of the Harvard Mark II computer in 1947, taped into the logbook by Grace Hopper\'s team.',
  },
  {
    id: 'dev-9',
    category: 'dev',
    text: 'The Apollo 11 Guidance Computer had less computing power and memory (4KB RAM) than a basic modern car key fob or a single digital image file.',
  },
  {
    id: 'dev-10',
    category: 'dev',
    text: 'The creator of Python named the language after the British comedy show Monty Python\'s Flying Circus, not the snake.',
  },
  {
    id: 'dev-11',
    category: 'dev',
    text: 'JavaScript was created in just 10 days in May 1995 by Brendan Eich at Netscape. Today it powers over 98% of all websites worldwide.',
  },
  {
    id: 'dev-12',
    category: 'dev',
    text: 'GitHub Copilot and AI coding assistants help developers write code, with studies showing engineers complete tasks up to 55% faster when pair-programming with AI.',
  },
  {
    id: 'dev-13',
    category: 'dev',
    text: 'The world\'s first website ever created (info.cern.ch) was launched in 1991 by Tim Berners-Lee and is still online today!',
  },
  {
    id: 'dev-14',
    category: 'dev',
    text: 'Linux runs 100% of the top 500 fastest supercomputers in the world, as well as every Android phone and NASA\'s Mars Rover.',
  },
  {
    id: 'dev-15',
    category: 'dev',
    text: 'Netflix customizes every movie thumbnail image you see in real-time—showing different poster artwork to different users based on their watching history!',
  },
  {
    id: 'dev-16',
    category: 'dev',
    text: 'The first domain name ever registered on the internet was symbolics.com on March 15, 1985. It is still active today as a web museum.',
  },
  {
    id: 'dev-17',
    category: 'dev',
    text: 'CAPTCHAs (the "I am not a robot" tests) were originally used to digitize millions of old scanned books by having humans transcribe words computers couldn\'t read!',
  },
  {
    id: 'dev-18',
    category: 'dev',
    text: 'In 1998, Yahoo turned down the opportunity to buy Google for $1 Million. A few years later in 2002, Google turned down Yahoo\'s offer to buy them for $3 Billion!',
  },
  {
    id: 'dev-19',
    category: 'dev',
    text: 'The symbol "@" was chosen for email addresses in 1971 by Ray Tomlinson simply because it was an underused keyboard character that meant "at".',
  },
  {
    id: 'dev-20',
    category: 'dev',
    text: 'The term "Spam" for unwanted emails comes from a 1970 Monty Python comedy sketch where characters repetitively shout "Spam, Spam, Spam!" until no one can talk.',
  },
  {
    id: 'dev-21',
    category: 'dev',
    text: 'Amazon\'s website going down for just 1 second could cost the company an estimated $1.6 Million in lost sales revenue!',
  },
  {
    id: 'dev-22',
    category: 'dev',
    text: 'The original Apple logo featured Sir Isaac Newton sitting under an apple tree before it was simplified to the iconic bitten apple.',
  },
  {
    id: 'dev-23',
    category: 'dev',
    text: 'Generating 1 billion UUID identifiers every second for 85 years yields less than a 50% chance of a single collision—making them virtually unique across the universe.',
  },
  {
    id: 'dev-24',
    category: 'dev',
    text: 'The world\'s fastest supercomputer can perform over 1 Quintillion (1,000,000,000,000,000,000) calculations per second.',
  },
  {
    id: 'dev-25',
    category: 'dev',
    text: 'Wi-Fi technology was invented as a byproduct of Australian scientist John O\'Sullivan trying to detect microscopic exploding mini black holes in outer space!',
  },
  {
    id: 'dev-26',
    category: 'dev',
    text: 'The word "Robot" comes from a 1920 Czech play R.U.R. by Karel Čapek, derived from the word robota, meaning forced labor.',
  },
  {
    id: 'dev-27',
    category: 'dev',
    text: 'The QWERTY keyboard layout was created in 1873 specifically to slow typists down so mechanical typewriter keys wouldn\'t jam together.',
  },
  {
    id: 'dev-28',
    category: 'dev',
    text: 'NASA\'s Mars Ingenuity Helicopter flew 72 successful flights on Mars using open-source Linux running on a mobile processor!',
  },
  {
    id: 'dev-29',
    category: 'dev',
    text: 'Git was written by Linus Torvalds in less than two weeks in 2005 after BitKeeper ended its free tier for Linux developers.',
  },
  {
    id: 'dev-30',
    category: 'dev',
    text: 'Modern AI image generators process images using "Diffusion Models", which learn by taking clean images, destroying them with random noise, and learning how to reverse the noise.',
  },
  {
    id: 'dev-31',
    category: 'dev',
    text: 'SQLite is embedded inside every smartphone, browser, television, and smart device on Earth, making it the most deployed database software in human history.',
  },
  {
    id: 'dev-32',
    category: 'dev',
    text: 'The MP3 audio format was created by shrinking music files by removing sounds the human ear cannot perceive, cutting file sizes by 90% without noticeable loss.',
  },
  {
    id: 'dev-33',
    category: 'dev',
    text: 'Over 300 billion emails and 100 billion WhatsApp messages are sent across the globe every single day!',
  },
  {
    id: 'dev-34',
    category: 'dev',
    text: 'The original IBM PC in 1981 came with 16KB of RAM and no hard drive—users loaded programs via floppy disks!',
  },
  {
    id: 'dev-35',
    category: 'dev',
    text: 'Steve Jobs chose the name "Apple" partly because he was on a fruitarian diet and thought the name sounded fun, friendly, and came before Atari in the phone book!',
  },
  {
    id: 'dev-36',
    category: 'dev',
    text: 'YouTube was originally created in 2005 as a video dating website where users uploaded videos describing their ideal partner!',
  },
  {
    id: 'dev-37',
    category: 'dev',
    text: 'The first text message ever sent was "Merry Christmas", transmitted over the Vodafone network on December 3, 1992.',
  },
  {
    id: 'dev-38',
    category: 'dev',
    text: 'The world\'s first webcam was created at Cambridge University in 1991 for one single purpose: to monitor a coffee pot so researchers wouldn\'t walk down the hall to find it empty!',
  },
  {
    id: 'dev-39',
    category: 'dev',
    text: 'The total weight of all electricity used to transmit the entire internet across the globe is estimated to weigh about 50 grams—roughly the weight of a single strawberry!',
  },
  {
    id: 'dev-40',
    category: 'dev',
    text: 'GPS satellites must adjust their onboard atomic clocks for Einstein\'s Theory of Relativity—otherwise GPS locations on your phone would drift off by 7 miles every day!',
  },
  {
    id: 'dev-41',
    category: 'dev',
    text: 'In 2013, a man accidentally threw away a hard drive containing 8,000 Bitcoins, which is now buried in a landfill and worth hundreds of millions of dollars!',
  },
  {
    id: 'dev-42',
    category: 'dev',
    text: 'Emojis were invented in Japan in 1999 by Shigetaka Kurita, who drew 176 simple 12x12 pixel icons to help people communicate emotion in tiny mobile text screens.',
  },
  {
    id: 'dev-43',
    category: 'dev',
    text: 'The blue screen of death (BSOD) error screen on Windows was originally written by Steve Ballmer when he headed the Systems Division at Microsoft.',
  },
  {
    id: 'dev-44',
    category: 'dev',
    text: 'Over 500 hours of video content are uploaded to YouTube every single minute across the world!',
  },
  {
    id: 'dev-45',
    category: 'dev',
    text: 'The term "Bluetooth" was named after King Harald Bluetooth, a 10th-century Scandinavian king who united Scandinavia—just like Bluetooth unites devices!',
  },
  {
    id: 'dev-46',
    category: 'dev',
    text: 'Bill Gates wrote his high school class scheduling software and subtly tweaked the code so he was placed in classes full of girls!',
  },
  {
    id: 'dev-47',
    category: 'dev',
    text: 'Minecraft was created by Markus "Notch" Persson in just 6 days in May 2009 before becoming the best-selling video game of all time.',
  },
  {
    id: 'dev-48',
    category: 'dev',
    text: 'Google\'s search homepage is so clean and plain because its founders Larry Page and Sergey Brin didn\'t know HTML well when creating it!',
  },
  {
    id: 'dev-49',
    category: 'dev',
    text: 'The famous Firefox browser logo isn\'t a fox—it\'s actually a Red Panda, an endangered species native to the Himalayas!',
  },
  {
    id: 'dev-50',
    category: 'dev',
    text: 'The password for the computer controlling America\'s nuclear missiles was set to "00000000" for 8 years during the Cold War for quick launch safety!',
  },

  // ── Hero / Anime WOW Facts (51 - 100) ──────────────────────────────
  {
    id: 'hero-1',
    category: 'hero',
    text: 'In DC\'s Final Crisis, Batman broke his sacred "no guns" rule for the only time in history to shoot Darkseid with a Radion bullet to save the universe.',
  },
  {
    id: 'hero-2',
    category: 'hero',
    text: 'The Flash ran so fast in one comic issue that he evacuated 532,000 citizens from a nuclear blast in 0.00001 microseconds—faster than the speed of light!',
  },
  {
    id: 'hero-3',
    category: 'hero',
    text: 'Satoru Gojo\'s "Hollow Purple" in Jujutsu Kaisen combines Red (repulsion) and Blue (attraction) to create an imaginary mass that erases matter from existence.',
  },
  {
    id: 'hero-4',
    category: 'hero',
    text: 'Saitama\'s "Serious Punch" against Boros parted the cloud layer across planet Earth, and his casual sneeze on Jupiter\'s moon blew away Jupiter\'s gas atmosphere!',
  },
  {
    id: 'hero-5',
    category: 'hero',
    text: 'Superman Prime One Million spent 15,000 years meditating inside Earth\'s Sun, emerging as a golden god with infinite reality-warping omnipotence.',
  },
  {
    id: 'hero-6',
    category: 'hero',
    text: 'Black Panther (King T\'Challa) is the wealthiest character in comic history, with Wakanda\'s vibranium reserves valued over $90 Trillion!',
  },
  {
    id: 'hero-7',
    category: 'hero',
    text: 'Deadpool once systematically defeated the entire Marvel Universe, then sliced through the comic panel to confront the real-world comic book writers!',
  },
  {
    id: 'hero-8',
    category: 'hero',
    text: 'Super Saiyan golden hair was created by Akira Toriyama to save his manga assistant hours of having to manually ink Goku\'s black hair in every panel!',
  },
  {
    id: 'hero-9',
    category: 'hero',
    text: 'Superman\'s creators Jerry Siegel and Joe Shuster sold all rights to Superman to DC Comics for just $130 in 1938.',
  },
  {
    id: 'hero-10',
    category: 'hero',
    text: 'Batman co-creator Bill Finger designed the cowl, cape, Jim Gordon, Robin, and Gotham City, but received official credit only in 2015.',
  },
  {
    id: 'hero-11',
    category: 'hero',
    text: 'Peter Parker built his mechanical web-shooters and synthesized custom chemical web fluid as a high school senior using his school lab equipment.',
  },
  {
    id: 'hero-12',
    category: 'hero',
    text: 'Kryptonite was created in 1943 for the Superman radio show so the voice actor could take a vacation while Clark Kent was incapacitated.',
  },
  {
    id: 'hero-13',
    category: 'hero',
    text: 'Sung Jinwoo in Solo Leveling started as an E-Rank hunter dubbed "The Weakest Weapon of All Mankind" before unlocking the System.',
  },
  {
    id: 'hero-14',
    category: 'hero',
    text: 'Pochita, the Chainsaw Devil, replaced Denji\'s destroyed heart to save his life, forming the contract that grants Denji the Chainsaw Man transformation.',
  },
  {
    id: 'hero-15',
    category: 'hero',
    text: 'Demon Slayer creator Koyoharu Gotouge keeps their identity fully anonymous, using a glasses-wearing crocodile as their public avatar.',
  },
  {
    id: 'hero-16',
    category: 'hero',
    text: 'Stan Lee created Spider-Man after watching a fly crawl up a wall. His publisher initially rejected it, claiming readers hated spiders!',
  },
  {
    id: 'hero-17',
    category: 'hero',
    text: 'In Naruto, Itachi Uchiha passed the Chunin Exams alone at age 10 with the highest score in history and became an ANBU Captain by age 13.',
  },
  {
    id: 'hero-18',
    category: 'hero',
    text: 'Thor\'s hammer Mjolnir was forged in the heart of a dying star, enchanted by Odin so only those who are "worthy" can lift it.',
  },
  {
    id: 'hero-19',
    category: 'hero',
    text: 'Gotham City got its name when writer Bill Finger randomly flipped through a New York phone book and spotted "Gotham Jewelers".',
  },
  {
    id: 'hero-20',
    category: 'hero',
    text: 'In Attack on Titan, Captain Levi Ackerman\'s combat style and personality were heavily inspired by Rorschach from Watchmen.',
  },
  {
    id: 'hero-21',
    category: 'hero',
    text: 'Captain America\'s shield is made of a unique Proto-Adamantium and Vibranium alloy created by accident; the secret ratio has never been duplicated.',
  },
  {
    id: 'hero-22',
    category: 'hero',
    text: 'Saitama (One-Punch Man) gained his omnipotent power through a daily routine: 100 push-ups, 100 sit-ups, 100 squats, and a 10km run for 3 years!',
  },
  {
    id: 'hero-23',
    category: 'hero',
    text: 'In My Hero Academia, All Might\'s quirk "One For All" was passed down through 8 previous successors before reaching Izuku Midoriya.',
  },
  {
    id: 'hero-24',
    category: 'hero',
    text: 'Venom was created after a Marvel fan named Randy Schueller submitted a concept for a black stealth suit for Spider-Man. Marvel bought it for $220.',
  },
  {
    id: 'hero-25',
    category: 'hero',
    text: 'Doctor Strange\'s Sanctum Sanctorum is located at 177A Bleecker Street in Manhattan—a real address once shared by Marvel writers!',
  },
  {
    id: 'hero-26',
    category: 'hero',
    text: 'In One Piece, Luffy\'s Devil Fruit was revealed to be the Mythical Zoan Hito Hito no Mi, Model: Nika (Sun God), unlocking Gear 5 powers.',
  },
  {
    id: 'hero-27',
    category: 'hero',
    text: 'Daredevil\'s radar sense is so acute he can read printed text on paper by feeling the tiny elevation of the ink with his fingertips.',
  },
  {
    id: 'hero-28',
    category: 'hero',
    text: 'Wonder Woman\'s creator, William Moulton Marston, was a psychologist who invented the blood pressure lie detector test—inspiring her Lasso of Truth!',
  },
  {
    id: 'hero-29',
    category: 'hero',
    text: 'The Hulk was originally grey in 1962, but color printing problems in 1960s comic presses forced Stan Lee to change his skin to green.',
  },
  {
    id: 'hero-30',
    category: 'hero',
    text: 'In Mob Psycho 100, Shigeo Kageyama\'s power explodes when his emotional stress meter hits 100%, unlocking omnipotent telekinetic energy.',
  },
  {
    id: 'hero-31',
    category: 'hero',
    text: 'Magneto\'s helmet is lined with lead and telepathic shielding specifically engineered to block Charles Xavier\'s mind control.',
  },
  {
    id: 'hero-32',
    category: 'hero',
    text: 'In Bleach, Ichigo\'s Zanpakuto Zangetsu was revealed to be his Quincy powers manifesting as a young Yhwach alongside his inner Hollow.',
  },
  {
    id: 'hero-33',
    category: 'hero',
    text: 'Aquaman can withstand ocean trench pressure (10,000+ meters depth), making his skin impervious to small arms gunfire on land.',
  },
  {
    id: 'hero-34',
    category: 'hero',
    text: 'In Death Note, Light Yagami\'s surname "Yagami" written in Japanese kanji characters translates directly to "God of Night".',
  },
  {
    id: 'hero-35',
    category: 'hero',
    text: 'Thanos creator Jim Starlin admitted that Thanos\'s physical appearance was heavily inspired by DC Comics\' Darkseid.',
  },
  {
    id: 'hero-36',
    category: 'hero',
    text: 'In My Hero Academia, Katsuki Bakugo\'s Explosion quirk secretes nitroglycerin-like sweat from his palms, which he ignites at will.',
  },
  {
    id: 'hero-37',
    category: 'hero',
    text: 'Green Lantern\'s power ring creates hard-light constructs limited only by imagination, but was historically vulnerable to the color yellow.',
  },
  {
    id: 'hero-38',
    category: 'hero',
    text: 'In Vinland Saga, Thorfinn Karlsefni is based on a real 11th-century Icelandic explorer who led an expedition to Vinland (North America) around 1010 AD.',
  },
  {
    id: 'hero-39',
    category: 'hero',
    text: 'Hawkeye was deafened in Marvel comics due to a sonic arrow explosion and wore hearing aids, making him one of Marvel\'s prominent hearing-impaired heroes.',
  },
  {
    id: 'hero-40',
    category: 'hero',
    text: 'In Fullmetal Alchemist, Equivalent Exchange dictates: "To obtain, something of equal value must be lost." Edward Elric sacrificed his right arm for Al\'s soul.',
  },
  {
    id: 'hero-41',
    category: 'hero',
    text: 'The Avengers first assembled in 1963 with Iron Man, Thor, Hulk, Ant-Man, and Wasp. Captain America joined in issue #4.',
  },
  {
    id: 'hero-42',
    category: 'hero',
    text: 'In Cowboy Bebop, Spike Spiegel\'s martial arts style is Jeet Kune Do, directly modeled after Bruce Lee\'s fluid combat philosophy.',
  },
  {
    id: 'hero-43',
    category: 'hero',
    text: 'The Punisher (Frank Castle) first appeared as a mercenary villain trying to kill Spider-Man in The Amazing Spider-Man #129 (1974).',
  },
  {
    id: 'hero-44',
    category: 'hero',
    text: 'In Cyberpunk: Edgerunners, David Martinez\'s Sandevistan cyberware slows down time perception, enabling hyper-speed movement at the risk of cyberpsychosis.',
  },
  {
    id: 'hero-45',
    category: 'hero',
    text: 'Professor X\'s Cerebro supercomputer amplifies his telepathic brainwaves, enabling him to connect with every mind on Earth.',
  },
  {
    id: 'hero-46',
    category: 'hero',
    text: 'In Haikyuu!!, Shoyo Hinata\'s incredible vertical jump exceeds 3.33 meters despite standing at only 164 cm tall.',
  },
  {
    id: 'hero-47',
    category: 'hero',
    text: 'Shazam gains his powers by shouting "SHAZAM!", an acronym for six mythological figures: Solomon, Hercules, Atlas, Zeus, Achilles, and Mercury.',
  },
  {
    id: 'hero-48',
    category: 'hero',
    text: 'Goku\'s "Kamehameha" wave was named by Akira Toriyama\'s wife, who suggested naming it after Hawaii\'s founding monarch, King Kamehameha I.',
  },
  {
    id: 'hero-49',
    category: 'hero',
    text: 'Wolverine\'s classic yellow and blue suit was drawn by Dave Cockrum. Editors loved the high-contrast look so much they made it Wolverine\'s iconic uniform.',
  },
  {
    id: 'hero-50',
    category: 'hero',
    text: 'The Bat-Signal first appeared in Detective Comics #60 in 1942 as a searchlight projected onto Gotham City\'s night sky by Commissioner Jim Gordon.',
  },
]
