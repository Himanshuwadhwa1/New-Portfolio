export type FactCategory = 'dev' | 'hero'

export interface Fact {
  id: string
  category: FactCategory
  text: string
}

export const facts: Fact[] = [
  // ── Dev Facts (1 - 50) ──────────────────────────────────────
  {
    id: 'dev-1',
    category: 'dev',
    text: 'React 19 introduces the React Compiler (React Server Components helper) which automatically memoizes values and functions, removing the need for manual useMemo and useCallback in most cases.',
  },
  {
    id: 'dev-2',
    category: 'dev',
    text: 'GitHub Copilot uses OpenAI\'s Codex model. A study showed developers using Copilot completed tasks 55% faster than those who didn\'t.',
  },
  {
    id: 'dev-3',
    category: 'dev',
    text: 'The first computer bug was an actual moth found trapped inside a relay in the Harvard Mark II computer in 1947 by Grace Hopper.',
  },
  {
    id: 'dev-4',
    category: 'dev',
    text: 'The creator of C++, Bjarne Stroustrup, originally named it "C with Classes" before it was renamed to C++ in 1983.',
  },
  {
    id: 'dev-5',
    category: 'dev',
    text: 'JavaScript was created in just 10 days in May 1995 by Brendan Eich while working at Netscape.',
  },
  {
    id: 'dev-6',
    category: 'dev',
    text: 'Python is named after the British comedy troupe Monty Python, not the snake.',
  },
  {
    id: 'dev-7',
    category: 'dev',
    text: 'Vite (meaning "quick" in French) was created by Evan You, the creator of Vue.js, to solve slow startup times in large development environments.',
  },
  {
    id: 'dev-8',
    category: 'dev',
    text: 'TSConfig "strict" mode does not just enable strictNullChecks; it activates 8 distinct type-checking flags that catch common runtime bugs.',
  },
  {
    id: 'dev-9',
    category: 'dev',
    text: 'SQL was originally called SEQUEL (Structured English Query Language) but was changed due to a trademark conflict.',
  },
  {
    id: 'dev-10',
    category: 'dev',
    text: 'TypeScript was launched by Microsoft in 2012. It was designed by Anders Hejlsberg, who also designed C# and Turbo Pascal.',
  },
  {
    id: 'dev-11',
    category: 'dev',
    text: 'The primary storage of the Apollo 11 Guidance Computer had only 74 kilobytes of memory. A modern favicon is often larger.',
  },
  {
    id: 'dev-12',
    category: 'dev',
    text: 'Git was written by Linus Torvalds in 2005. He created it in less than two weeks because he disliked the proprietary version control system BitKeeper.',
  },
  {
    id: 'dev-13',
    category: 'dev',
    text: 'In modern LLMs, tokens are not words. 100 tokens are roughly equivalent to 75 English words.',
  },
  {
    id: 'dev-14',
    category: 'dev',
    text: 'JSON (JavaScript Object Notation) was popularized by Douglas Crockford in 2001. It is officially specified to have no comments.',
  },
  {
    id: 'dev-15',
    category: 'dev',
    text: 'The first website ever created is still online! You can visit it at info.cern.ch, where it has been hosted since 1991.',
  },
  {
    id: 'dev-16',
    category: 'dev',
    text: 'CSS variables (Custom Properties) are dynamic. Unlike Sass variables, they can be read and updated directly in JavaScript at runtime.',
  },
  {
    id: 'dev-17',
    category: 'dev',
    text: 'The term "spam" for unwanted email comes from a 1970 Monty Python sketch where characters repeat the word "Spam" excessively.',
  },
  {
    id: 'dev-18',
    category: 'dev',
    text: 'Next.js was originally named "next" when Vercel launched it in 2016 as a minimalist framework for server-rendered React applications.',
  },
  {
    id: 'dev-19',
    category: 'dev',
    text: 'The zip file format was invented by Phil Katz, who released it to the public domain in 1989 after a legal dispute with the creators of ARC.',
  },
  {
    id: 'dev-20',
    category: 'dev',
    text: 'Docker was open-sourced in 2013. It is written in Go and leverages Linux kernel features like namespaces and cgroups to create isolation.',
  },
  {
    id: 'dev-21',
    category: 'dev',
    text: 'The first computer mouse was invented by Douglas Engelbart in 1964 and was carved out of a single block of wood.',
  },
  {
    id: 'dev-22',
    category: 'dev',
    text: 'PHP originally stood for "Personal Home Page." Today, it officially stands for the recursive acronym "PHP: Hypertext Preprocessor."',
  },
  {
    id: 'dev-23',
    category: 'dev',
    text: 'A RAG (Retrieval-Augmented Generation) system combines LLMs with external databases to prevent hallucination by providing factual source context.',
  },
  {
    id: 'dev-24',
    category: 'dev',
    text: 'In 2009, Ryan Dahl created Node.js because he wanted a way to show a file upload progress bar in a web browser without polling.',
  },
  {
    id: 'dev-25',
    category: 'dev',
    text: 'A study found that developers spent about 35% of their time writing code, while the other 65% is spent debugging, in meetings, or analyzing requirements.',
  },
  {
    id: 'dev-26',
    category: 'dev',
    text: 'WebAssembly (Wasm) lets languages like Rust, C++, and Go run in web browsers at near-native execution speed alongside JavaScript.',
  },
  {
    id: 'dev-27',
    category: 'dev',
    text: 'SemVer (Semantic Versioning) uses MAJOR.MINOR.PATCH. A MAJOR change breaks backwards compatibility, while a MINOR change adds features safely.',
  },
  {
    id: 'dev-28',
    category: 'dev',
    text: 'SVG images are XML files. This means you can inject CSS directly inside them to make them animate or adjust to dark mode.',
  },
  {
    id: 'dev-29',
    category: 'dev',
    text: 'HTTP status code 418 "I\'m a teapot" was defined in 1998 as an April Fools\' joke and remains an official internet standard.',
  },
  {
    id: 'dev-30',
    category: 'dev',
    text: 'The first computer programmer was Ada Lovelace, who in 1843 wrote an algorithm for Charles Babbage\'s mechanical Analytical Engine.',
  },
  {
    id: 'dev-31',
    category: 'dev',
    text: 'The CSS "z-index" property only works on elements that have a "position" value other than "static" (unless they are flex/grid items).',
  },
  {
    id: 'dev-32',
    category: 'dev',
    text: 'The term "billion-dollar mistake" was coined by Tony Hoare in 2009 to describe his invention of the null pointer reference in ALGOL W.',
  },
  {
    id: 'dev-33',
    category: 'dev',
    text: 'The most popular programming language on GitHub by repository count is JavaScript, closely followed by Python and TypeScript.',
  },
  {
    id: 'dev-34',
    category: 'dev',
    text: 'Linux is a kernel, not a full operating system. Systems like Ubuntu or Fedora are distributions that package the Linux kernel with user tools.',
  },
  {
    id: 'dev-35',
    category: 'dev',
    text: 'The QWERTY keyboard layout was designed in 1873 to intentionally slow down typists to prevent mechanical typewriter keys from jamming.',
  },
  {
    id: 'dev-36',
    category: 'dev',
    text: 'The word "algorithm" is named after the 9th-century Persian mathematician Muhammad ibn Musa al-Khwarizmi.',
  },
  {
    id: 'dev-37',
    category: 'dev',
    text: 'Tailwind CSS was created by Adam Wathan and released in 2017. It utility-first classes allow rapid layout design without writing custom CSS rules.',
  },
  {
    id: 'dev-38',
    category: 'dev',
    text: 'Kubernetes (K8s) gets its abbreviation because there are 8 letters between the "K" and the "s" in the word.',
  },
  {
    id: 'dev-39',
    category: 'dev',
    text: 'In JavaScript, the expression "typeof null" returns "object". This is a famous bug from the language\'s first version that was never fixed.',
  },
  {
    id: 'dev-40',
    category: 'dev',
    text: 'A "git rebase" rewrites commit history by moving or combining commits, whereas a "git merge" combines branches using a single merge commit.',
  },
  {
    id: 'dev-41',
    category: 'dev',
    text: 'Modern browser engines compile JavaScript to machine code on the fly using Just-In-Time (JIT) compilation to run Web apps smoothly.',
  },
  {
    id: 'dev-42',
    category: 'dev',
    text: 'The first high-level programming language was Fortran (Formula Translation), developed by IBM in 1954.',
  },
  {
    id: 'dev-43',
    category: 'dev',
    text: 'GraphQL was developed internally by Facebook in 2012 to address network loading issues on their mobile apps, and was open-sourced in 2015.',
  },
  {
    id: 'dev-44',
    category: 'dev',
    text: 'The first electronic digital computer, the ENIAC, occupied about 1,800 square feet and weighed more than 27 tons.',
  },
  {
    id: 'dev-45',
    category: 'dev',
    text: 'DNS (Domain Name System) maps human-readable domains to IP addresses. It was created in 1983 by Paul Mockapetris.',
  },
  {
    id: 'dev-46',
    category: 'dev',
    text: 'An API key should never be stored directly in client-side React code. Anyone can open the browser console and read it.',
  },
  {
    id: 'dev-47',
    category: 'dev',
    text: 'Markdown was created in 2004 by John Gruber and Aaron Swartz to allow writers to format text easily using a simple readable format.',
  },
  {
    id: 'dev-48',
    category: 'dev',
    text: 'In Python, list comprehensions are typically faster than traditional for loops because their looping is optimized in C code.',
  },
  {
    id: 'dev-49',
    category: 'dev',
    text: 'Rust was created by Graydon Hoare at Mozilla in 2006. It ensures memory safety without a garbage collector through its ownership model.',
  },
  {
    id: 'dev-50',
    category: 'dev',
    text: 'Git\'s main branch was historically named "master," but many tools and hosting platforms migrated to "main" starting in 2020 for clarity.',
  },

  // ── Hero Facts (51 - 100) ───────────────────────────────────
  {
    id: 'hero-1',
    category: 'hero',
    text: 'Superman\'s co-creators Jerry Siegel and Joe Shuster sold the rights to the character to DC Comics for just $130 in 1938.',
  },
  {
    id: 'hero-2',
    category: 'hero',
    text: 'Batman was created by Bob Kane and Bill Finger, though Finger\'s massive contributions (the cape, cowl, and color scheme) went unrecognized for decades.',
  },
  {
    id: 'hero-3',
    category: 'hero',
    text: 'In the comic "Spider-Man: Blue", Peter Parker leaves a tape recorder message for Gwen Stacy every Valentine\'s Day after her death.',
  },
  {
    id: 'hero-4',
    category: 'hero',
    text: 'In Jujutsu Kaisen, Satoru Gojo wears his blindfold because his "Six Eyes" quirk gives him overwhelming sensory information, exhausting his brain.',
  },
  {
    id: 'hero-5',
    category: 'hero',
    text: 'The creator of Demon Slayer, Koyoharu Gotouge, uses a crocodile wearing glasses as their avatar and has kept their true identity anonymous.',
  },
  {
    id: 'hero-6',
    category: 'hero',
    text: 'In Chainsaw Man, Denji\'s dog-like devil partner Pochita replaced Denji\'s damaged heart to save his life, creating the Chainsaw Man.',
  },
  {
    id: 'hero-7',
    category: 'hero',
    text: 'Solo Leveling\'s main character, Sung Jinwoo, started as the weakest hunter of all E-Rank hunters before the double dungeon incident.',
  },
  {
    id: 'hero-8',
    category: 'hero',
    text: 'Spider-Man\'s web shooters are mechanical gadgets Peter Parker built himself, showing his genius-level intellect as a teenager.',
  },
  {
    id: 'hero-9',
    category: 'hero',
    text: 'Black Panther is the richest superhero in comics. Wakanda\'s vibranium reserve gives him a net worth estimated at over $90 trillion.',
  },
  {
    id: 'hero-10',
    category: 'hero',
    text: 'Goku\'s iconic "Kamehameha" wave was named by Akira Toriyama\'s wife, who inspired it from the legendary Hawaiian King Kamehameha.',
  },
  {
    id: 'hero-11',
    category: 'hero',
    text: 'Wolverine\'s classic yellow costume was actually drawn by mistake by artist Dave Cockrum, but the editors liked the contrast and kept it.',
  },
  {
    id: 'hero-12',
    category: 'hero',
    text: 'In My Hero Academia, Izuku Midoriya was originally designed to remain quirkless and use gadgets to fight, but the concept was changed to make him inherit One For All.',
  },
  {
    id: 'hero-13',
    category: 'hero',
    text: 'Kryptonite wasn\'t created in the comics. It was introduced in the 1943 Superman radio show so the voice actor could take a vacation.',
  },
  {
    id: 'hero-14',
    category: 'hero',
    text: 'The Gotham City name was chosen by writer Bill Finger when he flipped open a telephone directory and saw "Gotham Jewelers."',
  },
  {
    id: 'hero-15',
    category: 'hero',
    text: 'In Attack on Titan, Hajime Isayama was inspired to create the Titans after a creepy encounter with a drunk customer at an internet cafe.',
  },
  {
    id: 'hero-16',
    category: 'hero',
    text: 'One Punch Man\'s Saitama wears a yellow suit with red gloves as a tribute to Anpanman, a legendary Japanese children\'s superhero.',
  },
  {
    id: 'hero-17',
    category: 'hero',
    text: 'Iron Man\'s JARVIS is an acronym that stands for "Just A Rather Very Intelligent System" in the Marvel Cinematic Universe.',
  },
  {
    id: 'hero-18',
    category: 'hero',
    text: 'Deadpool was created as a parody of DC\'s Deathstroke. His real name is Wade Wilson, a direct play on Deathstroke\'s name, Slade Wilson.',
  },
  {
    id: 'hero-19',
    category: 'hero',
    text: 'In Hunter x Hunter, the Nen combat system is widely regarded by fans as one of the most logically consistent power systems in anime.',
  },
  {
    id: 'hero-20',
    category: 'hero',
    text: 'In Naruto, the spiral pattern on Naruto\'s forehead protector and back represents the whirlpool country of his mother\'s Uzumaki clan.',
  },
  {
    id: 'hero-21',
    category: 'hero',
    text: 'Wonder Woman was created by William Moulton Marston, the psychologist who also helped invent the lie detector test (polygraph).',
  },
  {
    id: 'hero-22',
    category: 'hero',
    text: 'In Demon Slayer, Tanjiro\'s scar changes shape twice throughout the series as his demon slayer mark awakens.',
  },
  {
    id: 'hero-23',
    category: 'hero',
    text: 'The Hulk was originally gray in his first comic appearance. Printing issues made it hard to keep the gray consistent, so he was changed to green.',
  },
  {
    id: 'hero-24',
    category: 'hero',
    text: 'In Jujutsu Kaisen 0, Yuta Okkotsu\'s ring represents a promise of marriage he made to Rika Orimoto before her tragic accident.',
  },
  {
    id: 'hero-25',
    category: 'hero',
    text: 'Daredevil\'s radar sense is so advanced he can read printed text by feeling the ink\'s raise on a page with his fingertips.',
  },
  {
    id: 'hero-26',
    category: 'hero',
    text: 'In Death Note, Ryuk\'s love for apples was chosen by Tsugumi Ohba simply because they contrast well with the dark, gothic Shinigami design.',
  },
  {
    id: 'hero-27',
    category: 'hero',
    text: 'In Spider-Man: Into the Spider-Verse, the framerate of Miles Morales is animated at 12 fps early on (on the twos) and rises to 24 fps as he masters his powers.',
  },
  {
    id: 'hero-28',
    category: 'hero',
    text: 'The Joker was originally supposed to be killed off in his second appearance in Batman #1, but the editor saved him because he saw potential.',
  },
  {
    id: 'hero-29',
    category: 'hero',
    text: 'In Fullmetal Alchemist, Edward Elric\'s automail arm and leg are mechanical prosthetics that link directly to his nervous system.',
  },
  {
    id: 'hero-30',
    category: 'hero',
    text: 'In Bleach, Ichigo Kurosaki\'s name can be translated to "one protector" or "fifteen," which is why he wears the number 15 on some shirts.',
  },
  {
    id: 'hero-31',
    category: 'hero',
    text: 'Thor\'s hammer, Mjolnir, was forged in the heart of a dying star (a neutron star), making it incredibly dense and heavy.',
  },
  {
    id: 'hero-32',
    category: 'hero',
    text: 'In One Piece, Luffy\'s Devil Fruit was originally known as the Gomu Gomu no Mi, but was revealed to have a legendary secret name in Wano.',
  },
  {
    id: 'hero-33',
    category: 'hero',
    text: 'In My Hero Academia, Katsuki Bakugo\'s quirk allows him to secrete nitroglycerin-like sweat from his palms and ignite it at will.',
  },
  {
    id: 'hero-34',
    category: 'hero',
    text: 'The Batman "Bat-Signal" first appeared in Detective Comics #60 in 1942 to contact Batman from the GCPD rooftop.',
  },
  {
    id: 'hero-35',
    category: 'hero',
    text: 'In Jujutsu Kaisen, Megumi Fushiguro\'s Ten Shadows technique was historically used by a Zen\'in clan head to defeat a Six Eyes user in a duel.',
  },
  {
    id: 'hero-36',
    category: 'hero',
    text: 'In Marvel Comics, Hawkeye went deaf twice due to explosive sonic arrows and uses hearing aids to hear his teammates.',
  },
  {
    id: 'hero-37',
    category: 'hero',
    text: 'Captain America\'s shield is made of a unique blend of vibranium and steel alloy that has never been successfully duplicated.',
  },
  {
    id: 'hero-38',
    category: 'hero',
    text: 'In Solo Leveling, the system gives Jinwoo daily quests (100 pushups, 100 situps, 10km run) as a reference to One Punch Man.',
  },
  {
    id: 'hero-39',
    category: 'hero',
    text: 'The Flash (Barry Allen) has a ring that stores his friction-proof superhero costume, releasing it when popped open.',
  },
  {
    id: 'hero-40',
    category: 'hero',
    text: 'In Naruto, Itachi Uchiha was originally designed to be a criminal commander, but was later rewritten as a tragic double agent.',
  },
  {
    id: 'hero-41',
    category: 'hero',
    text: 'The Venom symbiote was originally a concept created by a fan named Randy Schueller, which Marvel bought for $220 in 1982.',
  },
  {
    id: 'hero-42',
    category: 'hero',
    text: 'In Demon Slayer, Zenitsu Agatsuma\'s hair turned yellow after he was struck by lightning while training on a tree.',
  },
  {
    id: 'hero-43',
    category: 'hero',
    text: 'Doctor Strange was inspired by radio magic shows and was created by Steve Ditko to bring a psychedelic aesthetic to Marvel.',
  },
  {
    id: 'hero-44',
    category: 'hero',
    text: 'Aquaman can withstand the crushing pressures of the deep ocean, giving him super-strength and dense muscles on land.',
  },
  {
    id: 'hero-45',
    category: 'hero',
    text: 'In Chainsaw Man, Power is the Blood Fiend who can manipulate blood from her body to form weapons like hammers and spears.',
  },
  {
    id: 'hero-46',
    category: 'hero',
    text: 'Robin (Dick Grayson) was introduced in 1940 to appeal to younger readers and to soften Batman\'s dark and scary detective tone.',
  },
  {
    id: 'hero-47',
    category: 'hero',
    text: 'In Jujutsu Kaisen, Kento Nanami uses a binding vow called "Overtime," which limits his cursed energy during work hours but boosts it by 20% after.',
  },
  {
    id: 'hero-48',
    category: 'hero',
    text: 'Professor X\'s school for mutants is located at 1407 Graymalkin Lane in Westchester County, New York.',
  },
  {
    id: 'hero-49',
    category: 'hero',
    text: 'In Demon Slayer, Nezuko Kamado wears a bamboo muzzle to prevent her from accidentally tasting human blood or biting anyone.',
  },
  {
    id: 'hero-50',
    category: 'hero',
    text: 'The Daily Planet newspaper in Metropolis was originally named the Daily Star in Superman\'s earliest comic book stories.',
  },
]
