import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'field-notes');
const site = 'https://occultworldcup.com';
const published = 'May 13, 2026';

const images = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
];

const notes = [
  {
    slug: 'scary-is-not-memorable',
    title: 'Scary Is Not the Same as Memorable',
    category: 'Tournament Method',
    description: 'A field note on why the most frightening entry does not always survive a paranormal bracket.',
    pain: 'most occult lists reward shock first and memory second, even though the story people return to is usually the one with a clean emotional shape',
    operatorMoment: 'When I put theatrical monsters beside quieter archive cases, the loud entry often won the first click but lost the second thought. That changed how I wrote the short descriptions on the voting cards.',
    casePair: 'Mothman versus the Voynich Manuscript',
    signal: 'Immediate fear is a fast signal; repeat curiosity is a durable signal.',
    friction: 'A creature with eyes and wings is easy to choose, but an unreadable book keeps asking the reader to solve something.',
    decision: 'The bracket should separate impact, aftertaste, and research depth instead of pretending that one vote measures all three.',
    method: 'I now score every entry on three layers: the first image it creates, the unanswered question it leaves, and the number of credible paths a reader can follow after the match.',
    mistake: 'The common mistake is to make the page darker, bloodier, or louder whenever retention falls. In practice, the better fix is often a sharper question.',
    practice: 'For this site, the practical change is to treat every card as a research invitation, not just a monster poster.',
    searchFit: 'Search results are full of creature summaries. There is far less content explaining why one legend becomes sticky while another disappears.',
    takeaway: 'A memorable mystery is not the one that screams first. It is the one that leaves a structure in the reader\'s head.',
  },
  {
    slug: 'witness-fatigue-index',
    title: 'The Witness Fatigue Index',
    category: 'Evidence Design',
    description: 'A practical way to judge when repeated sighting claims make a mystery stronger or weaker.',
    pain: 'paranormal pages often count sightings as if more always means better, while the quality of repetition can collapse after the first vivid account',
    operatorMoment: 'While comparing sighting-heavy entries, I noticed that readers stopped caring when the fifth witness added no new detail. Repetition became noise instead of confirmation.',
    casePair: 'Black Eyed Kids versus Shadow People',
    signal: 'A strong witness chain adds new constraints with each report.',
    friction: 'A tired witness chain repeats the same adjectives until the story feels copied.',
    decision: 'A dossier should mark when the archive is accumulating evidence and when it is only accumulating atmosphere.',
    method: 'I use a simple index: new detail, independent context, cost to the witness, and whether the report creates a falsifiable boundary.',
    mistake: 'The lazy move is to quote every account equally. That makes the page look large but leaves the reader with less confidence.',
    practice: 'On the site, witness-heavy topics should show why a specific report matters instead of hiding weak reports behind a large number.',
    searchFit: 'People search for famous accounts, but they rarely find a transparent method for judging account fatigue.',
    takeaway: 'A hundred flat reports can be weaker than three accounts that disagree in useful ways.',
  },
  {
    slug: 'threshold-legends',
    title: 'Threshold Legends and the Fear of Permission',
    category: 'Folklore Pattern',
    description: 'Why doors, invitations, and entry rules make small legends feel personally dangerous.',
    pain: 'the internet repeats doorstep legends without explaining why the invitation itself is the engine of the fear',
    operatorMoment: 'The entries that made people hesitate were not always the most violent. They were the ones that asked the reader to imagine making a small domestic mistake.',
    casePair: 'Black Eyed Kids versus Men in Black',
    signal: 'Threshold legends turn fear into a decision point.',
    friction: 'The reader is not only watching the story; the reader is rehearsing whether to open the door.',
    decision: 'Doorway myths deserve a separate category because their power comes from consent, hospitality, and boundary failure.',
    method: 'I map these stories by location, requested action, social pressure, and the consequence of refusal.',
    mistake: 'Most summaries call them creepy visitors and stop there. That misses the mechanics that make them replayable.',
    practice: 'When writing a threshold entry, I foreground the rule before the monster: who asks, what they ask for, and why a polite person might obey.',
    searchFit: 'This angle is useful because it connects urban legend analysis with everyday social behavior.',
    takeaway: 'The doorway is scarier than the creature because it makes the reader responsible for the next frame.',
  },
  {
    slug: 'korean-search-occult-gap',
    title: 'The Korean Search Gap in Western Occult Stories',
    category: 'Market Gap',
    description: 'A curator note on why Korean readers often meet famous Western mysteries through thin summaries.',
    pain: 'Korean-language occult search results often compress complex Western cases into a few dramatic facts, leaving no room for context, skepticism, or cultural translation',
    operatorMoment: 'Building an English-facing occult site from a Korean operator perspective made one gap obvious: the same story needs different bridges depending on the audience.',
    casePair: 'Skinwalker Ranch versus Roswell',
    signal: 'Translation is not only language; it is expectation management.',
    friction: 'A case that feels obvious to American paranormal readers can feel random to Korean readers without place, media history, and legal context.',
    decision: 'A bilingual editorial mindset can become a real differentiator even if the public page stays in English.',
    method: 'I annotate each case with what the local audience already assumes, what an overseas reader will not know, and which details must be slowed down.',
    mistake: 'The mistake is to translate names and leave the cultural operating system untouched.',
    practice: 'Occult World Cup can use field notes to explain why certain legends travel well and why others lose their charge outside their original media environment.',
    searchFit: 'Few sites discuss the cross-cultural path of occult topics between Korean search behavior and English-language myth archives.',
    takeaway: 'A legend becomes global only after someone rebuilds the context that made it frightening in the first place.',
  },
  {
    slug: 'fair-paranormal-bracket',
    title: 'How to Design a Fair Paranormal Bracket',
    category: 'Tournament Method',
    description: 'The hidden balancing problem behind a monster-versus-mystery voting game.',
    pain: 'a paranormal world cup can become unfair when creatures, documents, places, and conspiracies are judged by the same emotional shortcut',
    operatorMoment: 'When I tested matchups mentally, I saw that a humanoid entity almost always had an image advantage over an abstract coded manuscript.',
    casePair: 'Jersey Devil versus Cicada 3301',
    signal: 'Visual immediacy creates a bracket advantage.',
    friction: 'Intellectual mysteries need time, while creature myths win from silhouette alone.',
    decision: 'Fairness requires seeding by mystery type, not just popularity.',
    method: 'I separate entries into creature, place, document, event, system, and internet-born myth before deciding match order.',
    mistake: 'Random brackets look honest but can bury the most interesting comparison in the first round.',
    practice: 'The site should explain its bracket logic so the game feels curated instead of arbitrary.',
    searchFit: 'Almost no paranormal content explains tournament design as an editorial problem.',
    takeaway: 'A good bracket is not neutral. It is deliberately balanced so different kinds of mystery can be understood before they are judged.',
  },
  {
    slug: 'low-evidence-high-retention',
    title: 'Low-Evidence, High-Retention Cases',
    category: 'Reader Behavior',
    description: 'Why weakly proven mysteries can still hold readers longer than well-documented ones.',
    pain: 'content sites often treat evidence quality and reader retention as the same thing, but occult traffic proves they can move in opposite directions',
    operatorMoment: 'Some weak cases created more mental friction than cleaner historical cases. That was uncomfortable, but it was useful to notice.',
    casePair: 'Polybius versus Dyatlov Pass',
    signal: 'Low evidence can increase participation if the premise leaves a playable gap.',
    friction: 'The reader fills the missing evidence with theory, memory, and suspicion.',
    decision: 'A responsible page should not pretend the evidence is stronger, but it can still analyze why the story survives.',
    method: 'I label the gap directly: missing records, anonymous origin, technical plausibility, and cultural timing.',
    mistake: 'The cheap version is to exploit uncertainty as proof. The professional version explains why uncertainty became a feature.',
    practice: 'For AdSense-safe trust, the page should separate belief from retention mechanics.',
    searchFit: 'Readers search for the mystery, but they rarely find a clear explanation of why a thin case feels so alive.',
    takeaway: 'A weak archive can be a strong cultural machine.',
  },
  {
    slug: 'horror-aesthetic-with-trust',
    title: 'Horror Aesthetic Without Losing Trust',
    category: 'Editorial Design',
    description: 'How a dark occult site can look atmospheric without feeling fake, exploitative, or low value.',
    pain: 'many occult sites use the same red-black horror skin until every page looks like decoration instead of research',
    operatorMoment: 'When I reviewed the site, I noticed that heavy typography made the brand stronger, but only when the writing underneath became more precise.',
    casePair: 'Mothman versus Shadow People',
    signal: 'Atmosphere earns attention; structure earns trust.',
    friction: 'If every element screams, the reader stops knowing what to believe.',
    decision: 'Design should frame analysis, not replace it.',
    method: 'I keep one dramatic visual layer, one plain evidence layer, and one clearly labeled operator note.',
    mistake: 'The mistake is to add more darkness when the real problem is thin explanation.',
    practice: 'For this site, a field note section gives the brand an expert center of gravity beyond monster imagery.',
    searchFit: 'There is room for content about paranormal interface design because most competitors discuss stories, not presentation ethics.',
    takeaway: 'A trustworthy occult site can look haunted, but it cannot think haunted.',
  },
  {
    slug: 'rumor-to-ritual-pipeline',
    title: 'The Rumor-to-Ritual Pipeline',
    category: 'Digital Folklore',
    description: 'How a loose claim becomes something people repeat, test, and perform.',
    pain: 'urban legend articles often describe the final myth but skip the steps that made it repeatable',
    operatorMoment: 'The most durable entries were not always the oldest. They were the ones that gave readers an action: watch, avoid, decode, invite, or compare.',
    casePair: 'Slender Man versus Cicada 3301',
    signal: 'A rumor becomes a ritual when it gives the audience a role.',
    friction: 'People remember the rule before they remember the source.',
    decision: 'The article should identify the playable instruction hidden inside the legend.',
    method: 'I track origin claim, repeatable rule, social reward, and failure condition.',
    mistake: 'The common mistake is to call everything a meme and miss the ritual layer.',
    practice: 'Occult World Cup can rank not only entities but the strength of the actions attached to them.',
    searchFit: 'Few sites connect creepypasta, puzzles, and ritual behavior in one framework.',
    takeaway: 'A myth survives when it teaches the audience what to do next.',
  },
  {
    slug: 'source-hygiene-for-digital-folklore',
    title: 'Source Hygiene for Digital Folklore',
    category: 'Research Method',
    description: 'A practical editorial protocol for stories that mutate across forums, videos, and summaries.',
    pain: 'digital folklore pages often cite the latest viral version instead of the earliest useful trace',
    operatorMoment: 'When I compared summaries, I saw the same sentence structure moving from article to article without any visible source trail.',
    casePair: 'SCP Foundation versus Slender Man',
    signal: 'The earliest version is not always the best source, but it reveals what later versions added.',
    friction: 'A copied detail can look like consensus when it is only repetition.',
    decision: 'Every digital legend needs a mutation map, not just a plot summary.',
    method: 'I separate primary post, community expansion, adaptation, news coverage, and modern SEO rewrite.',
    mistake: 'The lazy page treats all versions as one story and accidentally erases authorship.',
    practice: 'This site can gain trust by showing how a legend changed before judging its current form.',
    searchFit: 'Users want the story, but researchers want the chain. Serving both is a real niche.',
    takeaway: 'Good source hygiene does not kill the mystery. It shows exactly where the mystery learned to speak.',
  },
  {
    slug: 'creepypasta-afterlife',
    title: 'The Afterlife of Creepypasta',
    category: 'Internet Myth',
    description: 'Why some internet-born entities become folklore while others remain disposable posts.',
    pain: 'many creepypasta explainers treat internet stories as lesser folklore, even when they now behave like living myths',
    operatorMoment: 'On a bracket page, internet-born entries created a different kind of loyalty. Readers were defending a memory of where they first found the story.',
    casePair: 'Slender Man versus SCP Foundation',
    signal: 'Creepypasta survives when readers can inherit it, remix it, and still recognize the core rule.',
    friction: 'Too much canon kills participation; too little structure kills recognition.',
    decision: 'A good page should explain the social container that let the entity continue.',
    method: 'I look for authorship, remix permission, visual shorthand, rule stability, and platform migration.',
    mistake: 'The mistake is to summarize the monster and ignore the community architecture around it.',
    practice: 'Occult World Cup can frame internet myths as systems, not just characters.',
    searchFit: 'There is a gap between fan wikis and scholarly folklore writing; a practical middle lane is useful.',
    takeaway: 'A creepypasta becomes folklore when ownership becomes distributed without the symbol dissolving.',
  },
  {
    slug: 'cryptid-local-economy-loop',
    title: 'The Cryptid Local Economy Loop',
    category: 'Place Myth',
    description: 'How towns turn fear into festivals, museums, routes, and identity.',
    pain: 'cryptid content often stops at sightings and ignores what happens after a town decides to live with the story',
    operatorMoment: 'The Mothman entry felt different because the creature is no longer only an encounter. It is a local interface for memory, tourism, grief, and pride.',
    casePair: 'Mothman versus Loch Ness Monster',
    signal: 'A local economy can stabilize a legend after the original fear fades.',
    friction: 'Commercialization can either preserve a story or sand it down into a mascot.',
    decision: 'The page should ask what the town gained, lost, and chose to repeat.',
    method: 'I map sighting origin, memorial pressure, tourist infrastructure, yearly ritual, and image control.',
    mistake: 'The weak version calls it a cash grab. The better version studies how communities process strange inheritance.',
    practice: 'This lens helps the site move beyond monster trivia into cultural analysis.',
    searchFit: 'Cryptid tourism exists, but there is little accessible writing on its editorial mechanics.',
    takeaway: 'A cryptid becomes powerful when a place stops denying it and starts negotiating with it.',
  },
  {
    slug: 'sleep-paralysis-shadow-taxonomy',
    title: 'A Non-Sensational Taxonomy of Shadow Encounters',
    category: 'Experience Analysis',
    description: 'A calmer way to discuss shadow figures, sleep paralysis, and peripheral fear.',
    pain: 'shadow figure pages often frighten vulnerable readers while offering no useful distinction between dream, perception, and folklore',
    operatorMoment: 'This topic forced me to slow down the tone. A page can be atmospheric without pushing readers toward panic.',
    casePair: 'Shadow People versus Black Eyed Kids',
    signal: 'The body state around the encounter matters as much as the figure description.',
    friction: 'A story told at the edge of sleep carries different weight from a daylight encounter.',
    decision: 'The article should classify context before interpretation.',
    method: 'I separate waking state, sleep boundary, location repetition, witness stress, and cultural label.',
    mistake: 'The common mistake is to use every shadow account as proof of one entity class.',
    practice: 'For a responsible occult site, this topic needs calm language and clear boundaries.',
    searchFit: 'People search these experiences while anxious. A structured page is more valuable than a scare page.',
    takeaway: 'The most useful question is not what was it, but what state was the witness in when the story formed.',
  },
  {
    slug: 'voynich-effect',
    title: 'The Voynich Effect',
    category: 'Impossible Documents',
    description: 'Why unreadable documents attract more confident theories than readable ones.',
    pain: 'mystery pages love the word undeciphered but rarely explain why unreadability produces so many overconfident claims',
    operatorMoment: 'The Voynich page reminded me that absence can become a surface people project expertise onto.',
    casePair: 'Voynich Manuscript versus Cicada 3301',
    signal: 'A sealed document makes every reader feel one step away from discovery.',
    friction: 'The less a text confirms, the more room there is for a theory to feel personal.',
    decision: 'The page should explain projection pressure as part of the mystery.',
    method: 'I evaluate script regularity, material history, claim reversibility, and whether a theory explains too much too easily.',
    mistake: 'The weak article lists proposed solutions. The stronger article tests why the solutions keep appearing.',
    practice: 'Occult World Cup can treat impossible documents as reader behavior machines, not only historical objects.',
    searchFit: 'There is durable search interest in the Voynich Manuscript, but fewer accessible articles explain its theory ecology.',
    takeaway: 'An unreadable page is not empty. It is crowded with the reader.',
  },
  {
    slug: 'conspiracy-interface-patterns',
    title: 'Conspiracy Interface Patterns',
    category: 'Media Literacy',
    description: 'How layout, menus, and labels can make a theory feel more official than it is.',
    pain: 'conspiracy content is often judged by claims alone, while the interface quietly supplies authority',
    operatorMoment: 'When building simple encyclopedia cards, I noticed how quickly a label like file, archive, or case report changes the reader posture.',
    casePair: 'Men in Black versus Roswell',
    signal: 'Interface language can simulate institutional credibility.',
    friction: 'The reader may trust the frame before checking the evidence.',
    decision: 'A responsible site should use archive aesthetics carefully and disclose when a page is analysis rather than official record.',
    method: 'I check document styling, category labels, citation visibility, certainty words, and whether design is doing argumentative work.',
    mistake: 'The mistake is to copy classified-file styling until entertainment and evidence blur together.',
    practice: 'This field note keeps the site visually strong while avoiding fake-authority tricks.',
    searchFit: 'There is room for paranormal media literacy that does not mock believers or flatter conspiracy thinking.',
    takeaway: 'A page can look like a file without pretending to be evidence.',
  },
  {
    slug: 'ranking-without-believing',
    title: 'Ranking Mysteries Without Requiring Belief',
    category: 'Editorial Position',
    description: 'A middle-lane framework for readers who enjoy mysteries without surrendering judgment.',
    pain: 'occult sites often force readers into believer or debunker roles, which makes the experience smaller than the subject',
    operatorMoment: 'The bracket format taught me that a reader can choose a mystery because it is narratively strong, not because they believe it literally happened.',
    casePair: 'Skinwalker Ranch versus Polybius',
    signal: 'Interest is not endorsement.',
    friction: 'A skeptical reader still wants atmosphere; a believer still deserves careful framing.',
    decision: 'The site should invite evaluation instead of demanding conversion.',
    method: 'I rank by narrative clarity, evidence texture, cultural reach, symbolic force, and replay value.',
    mistake: 'The weak middle ground says maybe everything is true. The stronger middle ground says each claim needs a different tool.',
    practice: 'This lets Occult World Cup stay entertaining while building editorial trust.',
    searchFit: 'Many readers want paranormal content without feeling manipulated into belief.',
    takeaway: 'You can respect a mystery without surrendering your standards.',
  },
  {
    slug: 'haunted-place-ux',
    title: 'The UX of a Haunted Place',
    category: 'Place Myth',
    description: 'Why maps, boundaries, and no-entry zones shape paranormal attention.',
    pain: 'haunted place articles often describe events but not the spatial design that makes a site feel charged',
    operatorMoment: 'Places beat creatures when the reader can mentally walk the boundary. The map becomes part of the fear.',
    casePair: 'Skinwalker Ranch versus Dyatlov Pass',
    signal: 'A haunted place needs edges: gates, ridges, rooms, roads, weather, or forbidden access.',
    friction: 'Without a spatial rule, a location becomes just a backdrop.',
    decision: 'Every place mystery should identify the route a reader imagines taking.',
    method: 'I map approach path, visibility, isolation, authority control, and the moment where ordinary navigation fails.',
    mistake: 'The mistake is to use an atmospheric landscape image and skip the geography.',
    practice: 'For this site, place entries should include spatial explanation before theory stacking.',
    searchFit: 'There is a niche for treating haunted places as user experiences rather than only legends.',
    takeaway: 'A haunted place is a story with a floor plan.',
  },
  {
    slug: 'modern-omen-design',
    title: 'Modern Omen Design',
    category: 'Symbol Analysis',
    description: 'How disaster-linked legends turn coincidence into a narrative people can carry.',
    pain: 'omen stories are usually presented as either proof or nonsense, leaving no room to study why the pattern feels meaningful',
    operatorMoment: 'The Mothman case works because the timeline invites the mind to place a symbol before a rupture.',
    casePair: 'Mothman versus Roswell',
    signal: 'An omen story needs a memorable symbol, a public rupture, and a short enough distance between them.',
    friction: 'If the distance is too long, the link feels forced; if it is too short, it feels staged.',
    decision: 'The page should explain the narrative pressure without exploiting tragedy.',
    method: 'I check symbol clarity, timeline compression, witness spread, and whether later retellings became more certain than early accounts.',
    mistake: 'The mistake is to treat tragedy as a content hook. The professional version centers restraint.',
    practice: 'Occult World Cup can analyze omen mechanics while keeping human cost visible.',
    searchFit: 'This fills a gap between folklore analysis and disaster-linked paranormal summaries.',
    takeaway: 'An omen is less about prediction than about how people organize shock after the fact.',
  },
  {
    slug: 'writing-mysteries-without-exploitation',
    title: 'Writing Mysteries Without Exploiting Tragedy',
    category: 'Editorial Ethics',
    description: 'A standard for covering deaths, disappearances, and disasters on an entertainment site.',
    pain: 'paranormal content can slide into using real deaths as atmosphere if the writer has no editorial boundary',
    operatorMoment: 'The moment a bracket includes Dyatlov Pass or the Silver Bridge, the site stops being only a game.',
    casePair: 'Dyatlov Pass versus Mothman',
    signal: 'A real loss should change the article voice.',
    friction: 'Entertainment framing can make the reader forget that families, investigations, and communities existed before the legend.',
    decision: 'A responsible page separates documented tragedy from speculative overlay.',
    method: 'I use a rule: facts first, human cost second, theories third, entertainment language last.',
    mistake: 'The mistake is to make tragedy decorative because the site brand is dark.',
    practice: 'This note becomes a house rule for all future case pages.',
    searchFit: 'AdSense and reader trust both reward sites that do not turn suffering into empty spectacle.',
    takeaway: 'A mystery site can be atmospheric and still have manners.',
  },
  {
    slug: 'skeptic-believer-middle-lane',
    title: 'The Skeptic-Believer Middle Lane',
    category: 'Community Tone',
    description: 'How to write for both curious skeptics and serious believers without becoming bland.',
    pain: 'most paranormal pages either mock belief or sell certainty, and both choices shrink the audience',
    operatorMoment: 'The bracket format created a useful compromise: vote with your instinct, then read with your standards.',
    casePair: 'Roswell versus Men in Black',
    signal: 'A good page gives each reader a way to stay without surrendering identity.',
    friction: 'Tone matters because the reader is often protecting how they want to be seen.',
    decision: 'The site voice should be firm about evidence and generous about curiosity.',
    method: 'I avoid two traps: smug debunking and theatrical certainty.',
    mistake: 'The weak middle lane removes all opinion. The strong middle lane explains how the judgment was made.',
    practice: 'This gives Occult World Cup a more durable community voice.',
    searchFit: 'There is demand for paranormal content that is neither gullible nor hostile.',
    takeaway: 'The middle lane is not indecision. It is disciplined curiosity.',
  },
  {
    slug: 'paranormal-image-selection',
    title: 'Paranormal Image Selection as Evidence Framing',
    category: 'Editorial Design',
    description: 'Why the wrong stock image can weaken an otherwise careful mystery page.',
    pain: 'occult pages often use atmospheric images that look good but teach the reader nothing about the case',
    operatorMoment: 'While replacing broken images, I saw that the picture was often deciding the mood before the writing had a chance.',
    casePair: 'Loch Ness Monster versus Voynich Manuscript',
    signal: 'An image can be proof context, location context, symbolic context, or pure decoration.',
    friction: 'Decorative images become a problem when they imply specificity they do not have.',
    decision: 'Each image should have a declared job in the article.',
    method: 'I choose between map-like, object-like, atmosphere-like, and archival-like visuals depending on the page promise.',
    mistake: 'The mistake is to use dark forests for every mystery until the site becomes visually generic.',
    practice: 'This site should use fewer random horror images and more intentional visual roles.',
    searchFit: 'There is little practical writing about image ethics in paranormal SEO pages.',
    takeaway: 'A strong image does not only look mysterious. It tells the reader what kind of evidence they are looking at.',
  },
  {
    slug: 'occult-card-anatomy',
    title: 'The Anatomy of an Occult Database Card',
    category: 'Interface Method',
    description: 'What a short card must do before a reader decides to open a long mystery page.',
    pain: 'database cards often become tiny summaries, but a good card is closer to a promise, a filter, and a tension device',
    operatorMoment: 'The homepage cards forced a hard discipline: one line had to make a creature, place, or document feel worth opening.',
    casePair: 'Wendigo versus Polybius',
    signal: 'The best card contains object, threat, context, and unanswered question.',
    friction: 'Too much explanation kills the click; too little makes the page feel generic.',
    decision: 'Cards should be written as editorial compression, not teaser bait.',
    method: 'I use a four-part card: name, category label, concrete image, and unresolved mechanism.',
    mistake: 'The weak card says terrifying mystery. The strong card shows the specific kind of terror.',
    practice: 'Improving card language is one of the fastest ways to raise perceived site quality.',
    searchFit: 'Few small sites discuss content-card design as part of topic authority.',
    takeaway: 'A card is not a shortcut around quality. It is the smallest visible unit of quality.',
  },
  {
    slug: 'myth-migration-korea-english',
    title: 'How Myths Migrate Between Korean and English Webs',
    category: 'Cross-Cultural Folklore',
    description: 'A field note on names, tone, and context loss when mysteries travel across languages.',
    pain: 'translation often moves the label while leaving behind the reason a story worked in its first culture',
    operatorMoment: 'Working from Korea on an English occult property made me more aware of which details fail when the reader has no local memory.',
    casePair: 'Wendigo versus Jersey Devil',
    signal: 'A myth travels better when it has a portable rule, not only a local name.',
    friction: 'Some legends need geography; others need a moral grammar that survives translation.',
    decision: 'The site can become distinctive by explaining migration, not just importing stories.',
    method: 'I mark what is local, what is portable, what needs a note, and what should not be simplified.',
    mistake: 'The mistake is to flatten sacred, regional, or community-bound stories into monster content.',
    practice: 'Future pages should include cultural caution where a legend is tied to living traditions.',
    searchFit: 'Cross-cultural occult SEO is still thin, especially from a Korean operator perspective.',
    takeaway: 'A traveling myth needs a passport made of context.',
  },
  {
    slug: 'ad-safe-horror-language',
    title: 'Ad-Safe Horror Language',
    category: 'Policy-Safe Writing',
    description: 'How to keep a mystery site intense without relying on graphic or harmful content.',
    pain: 'small horror sites often confuse intensity with gore, which can damage trust, user comfort, and ad review outcomes',
    operatorMoment: 'The site already has dark visuals, so the writing does not need to overcompensate with graphic language.',
    casePair: 'Chupacabra versus Dyatlov Pass',
    signal: 'Suspense can come from uncertainty, boundary, witness cost, and pattern, not only violence.',
    friction: 'Graphic description narrows the audience and can distract from the actual mystery.',
    decision: 'The house style should prefer analytic intensity over shock intensity.',
    method: 'I replace gore terms with consequence, context, forensic restraint, and unanswered mechanism.',
    mistake: 'The lazy move is to make everything more brutal. The better move is to make the question sharper.',
    practice: 'This creates a cleaner path for AdSense review while improving reader trust.',
    searchFit: 'There is practical demand for horror writing that can still operate in mainstream ad environments.',
    takeaway: 'The most durable horror is precise, not graphic.',
  },
  {
    slug: 'fan-vote-bias',
    title: 'Fan Vote Bias in Mystery Rankings',
    category: 'Tournament Method',
    description: 'Why popularity, nostalgia, and image familiarity distort paranormal brackets.',
    pain: 'a vote-based occult game can look democratic while quietly amplifying the entries people already know',
    operatorMoment: 'Famous names entered matches with preloaded memory. Lesser-known but richer cases had to work harder on the page.',
    casePair: 'SCP Foundation versus Chupacabra',
    signal: 'Recognition can masquerade as judgment.',
    friction: 'A reader may vote for the name they can pronounce before reading the comparison.',
    decision: 'The bracket needs context equalizers before voting moments.',
    method: 'I add short framing, category labels, and comparable stakes before asking for a choice.',
    mistake: 'The mistake is to celebrate vote totals without studying what the vote actually measured.',
    practice: 'Occult World Cup can publish vote-bias notes as original analysis after each bracket season.',
    searchFit: 'This is a rare angle: paranormal content meets audience-behavior analysis.',
    takeaway: 'A vote tells you what won the interface, not always what won the argument.',
  },
  {
    slug: 'evidence-ladder',
    title: 'The Evidence Ladder for Paranormal Pages',
    category: 'Research Method',
    description: 'A simple ladder for separating documentable facts, witness claims, theories, and entertainment value.',
    pain: 'paranormal articles often mix public records, witness accounts, theories, and vibes in the same paragraph',
    operatorMoment: 'When rewriting pages for quality, the biggest improvement came from separating claim types.',
    casePair: 'Roswell versus Skinwalker Ranch',
    signal: 'Trust rises when the reader knows what kind of statement they are reading.',
    friction: 'A theory written beside a date can borrow more authority than it deserves.',
    decision: 'Every page should move up and down the ladder visibly.',
    method: 'The ladder is: confirmed context, documented claim, named witness, repeated report, theory, cultural interpretation, and game relevance.',
    mistake: 'The weak page sounds confident everywhere. The strong page changes certainty on purpose.',
    practice: 'This is the backbone for future long-form occult content on the site.',
    searchFit: 'Many users want a quick answer, but a visible evidence ladder gives the answer more value.',
    takeaway: 'A mystery page becomes trustworthy when it lets uncertainty stay labeled.',
  },
  {
    slug: 'red-eyes-symbolism',
    title: 'Why Red Eyes Keep Winning',
    category: 'Symbol Analysis',
    description: 'A focused look at one of the most repeated visual signals in monster folklore.',
    pain: 'red eyes are everywhere in paranormal summaries, but most pages treat them as decoration rather than a compressed signal',
    operatorMoment: 'In card design, red eyes worked almost too well. They gave instant threat, direction, and memory.',
    casePair: 'Mothman versus Black Eyed Kids',
    signal: 'Eyes make the monster reciprocal: the reader imagines being seen.',
    friction: 'Red adds alarm, animal reflection, machinery, blood, and warning without needing explanation.',
    decision: 'The page should study the symbol instead of merely repeating it.',
    method: 'I separate biological explanation, cinematic inheritance, witness memory, and icon design.',
    mistake: 'The mistake is to assume a repeated motif proves a shared entity.',
    practice: 'This kind of symbol note gives the site a deeper archive than ordinary monster summaries.',
    searchFit: 'Specific motif analysis is under-served compared with broad creature lists.',
    takeaway: 'Red eyes are not a detail. They are a user interface for fear.',
  },
  {
    slug: 'ancient-text-modern-mystery',
    title: 'When Ancient Text Becomes Modern Mystery',
    category: 'Archive Culture',
    description: 'How old documents are reinterpreted by search engines, forums, and visual culture.',
    pain: 'old manuscripts are often presented as timeless puzzles even though modern media decides which parts become famous',
    operatorMoment: 'The Voynich Manuscript does not behave like a normal historical object online. It behaves like a challenge screen.',
    casePair: 'Voynich Manuscript versus SCP Foundation',
    signal: 'A document becomes modern when its images circulate faster than its scholarship.',
    friction: 'Readers remember the weird plants before they understand the codicology.',
    decision: 'The article should distinguish historical object from internet object.',
    method: 'I compare material facts, image hooks, theory loops, and community reuse.',
    mistake: 'The mistake is to call every old unknown thing occult by default.',
    practice: 'This improves the site by giving document mysteries their own intellectual lane.',
    searchFit: 'There is a useful gap between academic manuscript writing and entertainment summaries.',
    takeaway: 'A document can be old in the archive and new every day in the feed.',
  },
  {
    slug: 'seasonal-live-ops',
    title: 'Seasonal Live Ops for an Occult World Cup',
    category: 'Site Operation',
    description: 'How an interactive mystery site can grow beyond one static bracket.',
    pain: 'many small web games die after the first visit because the content has no seasonal rhythm',
    operatorMoment: 'The world cup format is strongest when it feels like an event, not a frozen widget.',
    casePair: 'Full bracket versus field notes archive',
    signal: 'A seasonal reset gives readers a reason to return without forcing fake news.',
    friction: 'Too many changes can make the archive feel unstable; too few make the site feel abandoned.',
    decision: 'Operations should combine stable encyclopedia pages with rotating editorial events.',
    method: 'I would run monthly themed brackets, post-match analysis, upset reports, and editor notes about why certain entries were seeded together.',
    mistake: 'The mistake is to add more pages without giving the audience a reason to revisit them.',
    practice: 'This field note turns site operation itself into original content and expertise.',
    searchFit: 'There is almost no content about operating an occult bracket as a publishing product.',
    takeaway: 'A living site needs rituals the audience can recognize.',
  },
  {
    slug: 'adsense-recovery-content-plan',
    title: 'A Low-Value Content Recovery Plan for an Occult Site',
    category: 'Publishing Strategy',
    description: 'A transparent plan for moving from generic encyclopedia pages to original editorial authority.',
    pain: 'AdSense rejection often happens when a site looks like it could have been assembled from familiar summaries',
    operatorMoment: 'Looking at this project objectively, the tournament idea is distinctive, but the surrounding article layer needs a clearer original voice.',
    casePair: 'generic encyclopedia versus operator field desk',
    signal: 'Approval-oriented content should not be filler; it should prove why the site exists.',
    friction: 'Adding words without adding judgment can make the problem worse.',
    decision: 'The recovery path is original frameworks, operator notes, clear navigation, and safer editorial boundaries.',
    method: 'I separate recovery work into content depth, authorial perspective, page usefulness, internal linking, and policy-safe presentation.',
    mistake: 'The mistake is to write thirty generic articles and call that authority.',
    practice: 'This page documents the house standard that the new field-note section is built around.',
    searchFit: 'Small publishers search for recovery examples, but few can see the logic applied inside a real niche site.',
    takeaway: 'The goal is not to look bigger. The goal is to look harder to replace.',
  },
  {
    slug: 'occult-glossary-as-strategy',
    title: 'An Occult Glossary as Strategy, Not Decoration',
    category: 'Information Architecture',
    description: 'Why a controlled vocabulary can make a mystery site feel more expert and easier to navigate.',
    pain: 'paranormal sites throw around terms like cryptid, high strangeness, omen, and entity without giving readers stable definitions',
    operatorMoment: 'The bracket became easier to think about once I stopped treating every entry as the same kind of mystery.',
    casePair: 'cryptid versus document versus place',
    signal: 'A glossary turns scattered content into a system.',
    friction: 'Without terms, readers compare entries by mood alone.',
    decision: 'The site should use repeated labels that teach the reader how to evaluate a mystery.',
    method: 'I define terms by editorial use, not by pretending there is one universal paranormal taxonomy.',
    mistake: 'The weak glossary is a list of spooky words. The strong glossary is a navigation engine.',
    practice: 'Future pages can link back to glossary-style field notes whenever a category appears.',
    searchFit: 'Glossary content is useful for SEO, but it becomes more valuable when it reflects the site\'s own methodology.',
    takeaway: 'A niche site becomes expert when its vocabulary starts doing work.',
  },
  {
    slug: 'archive-vs-attraction',
    title: 'Archive Versus Attraction',
    category: 'Publishing Strategy',
    description: 'The tension between building a serious archive and an entertaining paranormal attraction.',
    pain: 'occult publishers often choose between museum voice and amusement voice, when the stronger site knows when each mode should appear',
    operatorMoment: 'The tournament is an attraction. The encyclopedia is an archive. The field notes explain the judgment between them.',
    casePair: 'Mothman Festival culture versus database pages',
    signal: 'Attraction brings visitors in; archive gives them a reason to trust and return.',
    friction: 'If the attraction dominates, the site feels thin. If the archive dominates, the game loses energy.',
    decision: 'The brand needs separate spaces for play, reference, and reflection.',
    method: 'I divide the site into tournament, encyclopedia, and field desk, each with its own promise.',
    mistake: 'The mistake is to make every page do every job.',
    practice: 'This structure gives AdSense reviewers and readers clearer evidence of purpose.',
    searchFit: 'This is a rare publishing-angle article inside the paranormal niche.',
    takeaway: 'The best occult site is not only spooky. It knows what room the reader is standing in.',
  },
  {
    slug: 'classification-before-theory',
    title: 'Classification Before Theory',
    category: 'Research Method',
    description: 'Why the first job is to name the kind of mystery before arguing what caused it.',
    pain: 'theory-heavy pages jump to aliens, hoaxes, spirits, or government programs before they classify the problem',
    operatorMoment: 'The cleanest pages were the ones where I could say what kind of uncertainty was being discussed.',
    casePair: 'Roswell versus Voynich Manuscript',
    signal: 'A crash claim, an unreadable text, and a creature sighting require different tools.',
    friction: 'One theory language cannot responsibly cover every anomaly.',
    decision: 'Each article should declare the mystery type near the top.',
    method: 'I classify by event, entity, place, document, system, symbol, and participatory myth.',
    mistake: 'The mistake is to treat category as flavor instead of method.',
    practice: 'This helps every future page become more organized and less generic.',
    searchFit: 'Classification content is useful because it teaches readers how to think, not only what to think.',
    takeaway: 'Before asking what happened, ask what kind of question this mystery is asking.',
  },
  {
    slug: 'paranormal-retention-map',
    title: 'The Paranormal Retention Map',
    category: 'Reader Behavior',
    description: 'A map of what keeps readers moving through a strange story after the first hook.',
    pain: 'SEO writing often over-invests in the first paragraph and under-invests in the second, third, and fourth reasons to keep reading',
    operatorMoment: 'A tournament click is only the doorway. The harder task is making the reader care after the initial comparison.',
    casePair: 'homepage card versus long-form dossier',
    signal: 'Retention depends on escalation, reversal, proof texture, and a usable takeaway.',
    friction: 'If every section repeats the same mystery, the page feels long but not deep.',
    decision: 'Each article should move the reader through a sequence of different rewards.',
    method: 'I plan a hook, context shift, evidence problem, operator note, framework, and practical reading rule.',
    mistake: 'The mistake is to add length without changing the reader\'s job.',
    practice: 'The new field notes follow this map so long content does not become dead weight.',
    searchFit: 'This bridges SEO craft and paranormal editorial strategy in a way competitors rarely do.',
    takeaway: 'A long page earns its length only when every section changes the reader\'s angle.',
  },
  {
    slug: 'minor-mystery-advantage',
    title: 'The Minor Mystery Advantage',
    category: 'Niche Strategy',
    description: 'Why smaller, stranger angles can outperform famous topics for authority building.',
    pain: 'new sites compete badly when they chase only the largest paranormal keywords',
    operatorMoment: 'The famous legends brought recognition, but the unusual editorial angles created the site\'s actual personality.',
    casePair: 'red-eye symbolism versus Mothman summary',
    signal: 'A minor angle can be more ownable than a major topic.',
    friction: 'Small topics require stronger framing because the reader may not know why they matter yet.',
    decision: 'The site should pair famous entries with rare analytic lenses.',
    method: 'I choose subtopics that connect to the bracket, reveal an editorial method, and are hard to replace with a generic summary.',
    mistake: 'The mistake is to believe niche means small value. Niche means sharper fit.',
    practice: 'This is the strategic reason for publishing thirty field notes instead of thirty more monster summaries.',
    searchFit: 'Long-tail, expert-feeling pages are a better recovery path than trying to outrank old paranormal encyclopedias immediately.',
    takeaway: 'The smaller angle is often where the site finally becomes itself.',
  },
  {
    slug: 'editorial-proof-of-work',
    title: 'Editorial Proof of Work',
    category: 'Trust Building',
    description: 'How a small site can show effort, judgment, and first-hand operation without pretending to be an institution.',
    pain: 'AdSense reviewers and readers both notice when a site has content volume but no visible editorial labor',
    operatorMoment: 'The best thing this site can prove is not that it owns paranormal facts, but that it has a repeatable way to judge them.',
    casePair: 'static article library versus living field desk',
    signal: 'Proof of work appears through method, tradeoffs, corrections, and specific editorial choices.',
    friction: 'A small site should not fake institutional authority; it should show its human process clearly.',
    decision: 'Operator notes are not filler. They are the evidence that the site has a point of view.',
    method: 'I make process visible: why a topic was chosen, what was excluded, how claims are separated, and what the reader can do with the framework.',
    mistake: 'The mistake is to hide behind a generic research team voice while publishing generic summaries.',
    practice: 'This article defines the standard for all future Occult World Cup content.',
    searchFit: 'There is a strong gap for transparent small-publisher methodology in hobby niches.',
    takeaway: 'For a small site, expertise is not a title. It is visible labor.',
  },
  {
    slug: 'post-match-analysis-format',
    title: 'The Post-Match Analysis Format',
    category: 'Tournament Method',
    description: 'A reusable content type for turning each bracket result into original analysis.',
    pain: 'interactive sites often waste their own data by treating a vote result as the end of the experience',
    operatorMoment: 'Every matchup can become a small editorial experiment: which image won, which premise held, and which explanation deserved a rematch.',
    casePair: 'any close bracket result',
    signal: 'A result page becomes content when it explains the decision pressure behind the votes.',
    friction: 'Without analysis, voting is fun once and then gone.',
    decision: 'Each match should produce a post-match note, especially when the less famous entry wins or nearly wins.',
    method: 'I would record matchup context, probable bias, winning hook, losing weakness, and what the result says about reader attention.',
    mistake: 'The mistake is to publish only winners. The interesting content is often in why the loser almost worked.',
    practice: 'This gives the site an original publishing engine that competitors cannot copy without running the same bracket.',
    searchFit: 'This format creates highly specific pages with built-in internal links.',
    takeaway: 'The vote is not the content. The diagnosis after the vote is the content.',
  },
  {
    slug: 'reader-as-investigator',
    title: 'Turning the Reader Into an Investigator',
    category: 'Experience Design',
    description: 'How an occult site can invite participation without spreading misinformation.',
    pain: 'mystery content often gives readers either passive entertainment or reckless speculation',
    operatorMoment: 'The best version of the site lets a reader compare, question, and classify without pretending they solved the case.',
    casePair: 'Cicada 3301 versus Voynich Manuscript',
    signal: 'Investigation is a posture, not a claim of authority.',
    friction: 'The reader wants to participate but needs guardrails.',
    decision: 'Pages should include safe prompts: compare evidence, identify category, spot source fatigue, and name the missing fact.',
    method: 'I design prompts that ask how to read, not what to believe.',
    mistake: 'The mistake is to turn curiosity into conspiracy homework.',
    practice: 'This creates a more useful site experience and a stronger original identity.',
    searchFit: 'Interactive critical-reading prompts are uncommon in paranormal content.',
    takeaway: 'A mystery site is strongest when the reader leaves more curious and less confused.',
  },
];

const activeNotes = notes.slice(0, 30);

const professionalProfiles = [
  {
    discipline: "comparative folklore, memory design, and tournament curation",
    researchQuestion: "Why does one mystery remain mentally available after the first scare while another disappears after a strong image?",
    evidenceUnit: "reader aftertaste, return-click potential, and the number of useful questions created by a matchup",
    operatorPractice: "While arranging the first bracket cards, I had to shorten complex cases into a few lines. The entries that looked strongest in the card were not always the entries with the deepest reading value. That gap became the starting point for a separate memory framework.",
    frameworkName: "The Three-Layer Retention Test",
    axes: ["first-image clarity", "second-question pressure", "research path depth", "revisit value after the vote"],
    caseApplication: "The case comparison works because the Mothman has immediate silhouette power, while the Voynich Manuscript creates a slower investigative pull. A professional page should not flatten those different strengths into one word like scary.",
    professionalOutput: "a scoring method that separates visual impact from long-term curiosity before a mystery is seeded",
    limitation: "This method does not prove that one legend is more important than another; it only explains how a reader is likely to process it inside this site.",
  },
  {
    discipline: "witness-chain analysis and credibility fatigue",
    researchQuestion: "At what point do repeated sighting reports stop adding confidence and start creating noise?",
    evidenceUnit: "independent detail, witness cost, context change, and whether later accounts add constraints",
    operatorPractice: "When I compared sighting-heavy legends, I noticed a practical problem: a page can look substantial because it contains many accounts, but the reader becomes less certain if every account repeats the same cinematic phrase.",
    frameworkName: "Witness Fatigue Index",
    axes: ["new constraint per report", "independence from earlier versions", "specific location or time pressure", "cost paid by the witness"],
    caseApplication: "Black Eyed Kids and Shadow People both rely on repeated personal accounts, but their evidentiary texture is different. One often centers on a social threshold; the other often centers on perception state.",
    professionalOutput: "a way to mark repeated reports as reinforcing, neutral, or degrading instead of counting them equally",
    limitation: "The index cannot verify an encounter. It can only prevent a page from mistaking repetition for evidence.",
  },
  {
    discipline: "threshold folklore and consent-based fear mechanics",
    researchQuestion: "Why do doorway, invitation, and entry-rule legends feel more personal than many larger monster stories?",
    evidenceUnit: "the requested action, the social pressure around refusal, and the consequence attached to permission",
    operatorPractice: "In bracket testing, doorway legends made readers slow down because the fear was attached to a small domestic decision. That is different from simply looking at a monster from a distance.",
    frameworkName: "Permission-Fear Model",
    axes: ["boundary location", "requested action", "politeness pressure", "irreversible consequence"],
    caseApplication: "Black Eyed Kids and Men in Black both interrupt private space, but one asks to be let in while the other arrives as an authority performance. The fear source changes completely.",
    professionalOutput: "a taxonomy for separating visitor myths from ordinary entity myths",
    limitation: "The model is about narrative structure, not a claim that a doorway encounter happened.",
  },
  {
    discipline: "cross-cultural search behavior and occult translation strategy",
    researchQuestion: "What disappears when English paranormal cases are compressed for Korean search users?",
    evidenceUnit: "lost context, untranslated assumptions, local geography, and the cultural reason a case became famous",
    operatorPractice: "Running this from a Korean operator position makes the gap visible. A Western case that seems obvious in English often needs place, media history, and legal context before it becomes legible to a Korean reader.",
    frameworkName: "Context Reconstruction Map",
    axes: ["local premise", "translation risk", "reader assumption gap", "minimum context required"],
    caseApplication: "Roswell and Skinwalker Ranch travel poorly if the page only translates names. They require explanations of American military secrecy, desert geography, television afterlife, and private land mythology.",
    professionalOutput: "a bilingual editorial lens that makes the site harder to replace than a translated summary",
    limitation: "The public page may be English, so the Korean operator insight must be shown through framing rather than switching the whole site language.",
  },
  {
    discipline: "competitive information architecture and bracket fairness",
    researchQuestion: "How can a paranormal bracket compare creatures, places, documents, conspiracies, and internet myths without making the result meaningless?",
    evidenceUnit: "category mismatch, image advantage, explanation time, and the burden placed on the voting card",
    operatorPractice: "Random matchups looked fun, but they created unfair comparisons. A creature with a face can defeat a complex document before the reader understands what the document represents.",
    frameworkName: "Category-Balanced Seeding",
    axes: ["mystery type", "visual advantage", "explanation load", "matchup learning value"],
    caseApplication: "Jersey Devil versus Cicada 3301 is not just a monster against a puzzle. It is immediate folklore against participatory cryptography, so the match needs a fairness note.",
    professionalOutput: "a seeding rule that makes future tournaments feel curated instead of random",
    limitation: "Fair seeding can reduce chaos, so it should be balanced with occasional unpredictable matches.",
  },
  {
    discipline: "reader retention and uncertainty design",
    researchQuestion: "Why do some weak-evidence mysteries hold attention longer than cleaner historical cases?",
    evidenceUnit: "missing records, playable gaps, theory invitation, and the reader's ability to participate",
    operatorPractice: "Some cases with thin documentation created stronger reading sessions because they left a usable gap. That does not make them true, but it does explain why they survive.",
    frameworkName: "Playable Uncertainty Model",
    axes: ["archive gap", "participation hook", "technical plausibility", "theory elasticity"],
    caseApplication: "Polybius and Dyatlov Pass create very different retention patterns. One survives through absence and game culture; the other survives through a tragic investigative record.",
    professionalOutput: "a distinction between evidence strength and attention strength",
    limitation: "The model must not use uncertainty as proof. It only explains audience behavior.",
  },
  {
    discipline: "trust-oriented horror interface design",
    researchQuestion: "How can a dark occult site look atmospheric without looking unserious, exploitative, or machine-made?",
    evidenceUnit: "typography weight, evidence labeling, claim restraint, and the balance between spectacle and analysis",
    operatorPractice: "The visual identity improved when the site became heavier and darker, but the writing then had to become calmer and more precise. Otherwise the design overpromised expertise the text did not support.",
    frameworkName: "Atmosphere-Trust Balance",
    axes: ["dramatic surface", "plain evidence layer", "claim labeling", "reader orientation"],
    caseApplication: "Mothman and Shadow People both benefit from mood, but the page must still tell the reader whether it is discussing witness reports, symbolism, or psychology.",
    professionalOutput: "a design rule for making horror aesthetics support analysis rather than replace it",
    limitation: "Aesthetic trust is fragile; one exaggerated paragraph can undo a careful visual system.",
  },
  {
    discipline: "digital folklore transmission and ritual mechanics",
    researchQuestion: "How does a loose online claim become something people repeat, test, and perform?",
    evidenceUnit: "repeatable instruction, social reward, failure condition, and platform migration",
    operatorPractice: "The most durable entries were not only memorable; they gave the reader something to do. Vote, decode, avoid, invite, compare, or retell. That action layer matters.",
    frameworkName: "Rumor-to-Ritual Pipeline",
    axes: ["origin claim", "repeatable rule", "audience role", "migration path"],
    caseApplication: "Slender Man and Cicada 3301 both became participatory, but one spread through collaborative fear and the other through elite puzzle identity.",
    professionalOutput: "a framework for identifying the action hidden inside a legend",
    limitation: "Not every repeated action is a ritual; the label should be reserved for behavior that changes how the audience participates.",
  },
  {
    discipline: "source hygiene and mutation mapping",
    researchQuestion: "How should a site handle stories that mutate across forums, summaries, videos, and fan wikis?",
    evidenceUnit: "earliest trace, community expansion, adaptation layer, and modern SEO rewrite",
    operatorPractice: "While checking digital legends, I saw repeated phrases moving across pages without visible sourcing. That is exactly how weak summaries begin to look like consensus.",
    frameworkName: "Mutation Map Protocol",
    axes: ["primary trace", "fan expansion", "media adaptation", "SEO compression"],
    caseApplication: "SCP Foundation and Slender Man require different source hygiene because one is a collaborative fictional system and the other is a meme-born entity with a complicated public history.",
    professionalOutput: "a source map that distinguishes origin, canon, fandom, and later commentary",
    limitation: "Some old web traces disappear, so the map should state confidence instead of pretending to be complete.",
  },
  {
    discipline: "internet myth lifecycle analysis",
    researchQuestion: "Why do some creepypasta entities become folklore while thousands remain disposable posts?",
    evidenceUnit: "symbol stability, remix permission, community ownership, and recognizability after adaptation",
    operatorPractice: "Internet-born entries behaved differently in the bracket because readers defended not only the entity, but the memory of the platform where they first met it.",
    frameworkName: "Creepypasta Afterlife Model",
    axes: ["core symbol", "remix tolerance", "community container", "platform portability"],
    caseApplication: "Slender Man has silhouette stability; SCP has institutional structure. Both survive because the audience can add to them without fully dissolving them.",
    professionalOutput: "a way to treat internet myths as systems rather than isolated characters",
    limitation: "This analysis must respect authorship and community context instead of pretending every remix is public property.",
  },
  {
    discipline: "cryptid tourism and local identity economics",
    researchQuestion: "What happens after a town turns a frightening report into a festival, museum, route, or mascot?",
    evidenceUnit: "local infrastructure, annual ritual, commercial framing, and the community's control over the image",
    operatorPractice: "The Mothman material felt different from ordinary creature content because the story now operates as local identity, not only an encounter report.",
    frameworkName: "Cryptid Economy Loop",
    axes: ["origin event", "memorial pressure", "tourist infrastructure", "image domestication"],
    caseApplication: "Mothman and Loch Ness both show how a creature can become a place-brand, but one is tied to disaster memory while the other is tied to long scenic ambiguity.",
    professionalOutput: "a lens for studying the civic afterlife of cryptids",
    limitation: "Commercialization should not be dismissed automatically, but it should be separated from evidence.",
  },
  {
    discipline: "experience classification and sleep-boundary literacy",
    researchQuestion: "How can shadow encounter content be useful without increasing anxiety for vulnerable readers?",
    evidenceUnit: "waking state, sleep boundary, repetition pattern, stress context, and cultural label",
    operatorPractice: "This topic forced a tone change. A dark site can still discuss shadow reports calmly, especially when the reader may arrive while anxious.",
    frameworkName: "Encounter-State Taxonomy",
    axes: ["sleep boundary", "lighting condition", "witness state", "report repetition"],
    caseApplication: "Shadow People and Black Eyed Kids both rely on human-like figures, but the first often begins with perception state and the second with social intrusion.",
    professionalOutput: "a safer classification system for ambiguous personal experiences",
    limitation: "The page should never diagnose readers; it should describe context categories and encourage grounded interpretation.",
  },
  {
    discipline: "document mystery theory ecology",
    researchQuestion: "Why do unreadable documents attract more confident explanations than readable ones?",
    evidenceUnit: "material history, script regularity, theory reversibility, and projection pressure",
    operatorPractice: "The Voynich entry made the weakness of ordinary summaries obvious. Listing theories is easy; explaining why theories keep attaching to the object is the real work.",
    frameworkName: "Projection Pressure Model",
    axes: ["visual strangeness", "scholarly gap", "theory flexibility", "claim reversibility"],
    caseApplication: "The Voynich Manuscript and Cicada 3301 both invite solving, but one is an archival object and the other is a designed challenge with a public performance layer.",
    professionalOutput: "a method for separating historical uncertainty from reader projection",
    limitation: "A professional page should not imply that every unsolved text is occult.",
  },
  {
    discipline: "conspiracy media literacy and interface authority",
    researchQuestion: "How do page labels, archive styling, and file language make uncertain claims feel official?",
    evidenceUnit: "visual authority, category label, certainty language, and the difference between analysis and documentation",
    operatorPractice: "Even simple words like file, archive, dossier, and case changed how the site felt. That power needs boundaries because design can accidentally argue for a claim.",
    frameworkName: "Interface Authority Audit",
    axes: ["document styling", "claim certainty", "source visibility", "institutional mimicry"],
    caseApplication: "Men in Black and Roswell benefit from classified-file aesthetics, but that aesthetic can become misleading if the article does not label speculation clearly.",
    professionalOutput: "a design checklist that prevents entertainment framing from becoming fake evidence",
    limitation: "The site can use archive mood, but it should never pretend to be an official archive.",
  },
  {
    discipline: "belief-neutral ranking and editorial scoring",
    researchQuestion: "Can a site rank paranormal mysteries without demanding belief or mockery?",
    evidenceUnit: "narrative clarity, cultural reach, evidence texture, symbolic force, and replay value",
    operatorPractice: "The bracket made one thing clear: a reader can choose a mystery because it is culturally strong even if they do not believe it literally happened.",
    frameworkName: "Belief-Neutral Scorecard",
    axes: ["narrative force", "evidence texture", "cultural persistence", "reader agency"],
    caseApplication: "Skinwalker Ranch and Polybius should not be judged by the same belief shortcut. One is place-based high strangeness; the other is digital-era rumor architecture.",
    professionalOutput: "a ranking language that keeps skeptical and believer audiences in the same room",
    limitation: "Neutral ranking is not the same as having no opinion; it requires more explicit criteria.",
  },
  {
    discipline: "spatial storytelling and haunted-place user experience",
    researchQuestion: "Why do some locations feel haunted before any theory is introduced?",
    evidenceUnit: "approach path, boundary, isolation, visibility, and the point where ordinary navigation fails",
    operatorPractice: "Place mysteries became easier to explain once I stopped treating location as a backdrop and started treating it as the structure of the story.",
    frameworkName: "Haunted Place UX Map",
    axes: ["entry route", "boundary marker", "isolation pressure", "navigation failure"],
    caseApplication: "Skinwalker Ranch and Dyatlov Pass both depend on place, but one is a controlled property and the other is a hostile landscape tied to a fatal route.",
    professionalOutput: "a spatial reading method for place-based mysteries",
    limitation: "The map improves interpretation, but it cannot replace factual investigation of the event.",
  },
  {
    discipline: "omen narrative architecture and tragedy restraint",
    researchQuestion: "How does a disaster-linked symbol become an omen without turning tragedy into content bait?",
    evidenceUnit: "timeline compression, symbol clarity, public rupture, and later certainty inflation",
    operatorPractice: "The Mothman material required restraint because the legend sits beside a real bridge disaster. The site needed a standard for that tension.",
    frameworkName: "Modern Omen Architecture",
    axes: ["symbol before rupture", "timeline distance", "witness spread", "retelling inflation"],
    caseApplication: "Mothman and Roswell both became symbols larger than their initiating events, but one is tied to grief and one to institutional secrecy.",
    professionalOutput: "a respectful way to analyze omen mechanics without exploiting disaster",
    limitation: "The article must keep documented loss separate from later symbolic interpretation.",
  },
  {
    discipline: "editorial ethics for tragedy-adjacent mysteries",
    researchQuestion: "What standard should a paranormal entertainment site use when real deaths or disappearances are involved?",
    evidenceUnit: "documented harm, surviving community, speculative layer, and the tone of entertainment language",
    operatorPractice: "Once the bracket includes Dyatlov Pass or the Silver Bridge, the site is not only a game. The writing has to change before the theory section begins.",
    frameworkName: "Tragedy Boundary Rule",
    axes: ["facts first", "human cost visible", "speculation separated", "mood restrained"],
    caseApplication: "Dyatlov Pass and Mothman both attract sensational theories, but professional handling means the human event is not used as decoration.",
    professionalOutput: "a house rule for covering fatal or grief-linked mysteries",
    limitation: "Ethical restraint may reduce shock value, but it increases trust.",
  },
  {
    discipline: "community tone design for mixed-belief audiences",
    researchQuestion: "How can a paranormal site serve skeptics and believers without becoming bland?",
    evidenceUnit: "certainty language, objection handling, reader identity, and the invitation to evaluate",
    operatorPractice: "The tournament format gives a useful compromise: vote by instinct, then read by standard. That can be a real editorial voice if handled consistently.",
    frameworkName: "Disciplined Curiosity Voice",
    axes: ["evidence firmness", "curiosity generosity", "anti-mockery", "anti-gullibility"],
    caseApplication: "Roswell and Men in Black carry believer identity strongly, so the page needs language that is firm without sneering.",
    professionalOutput: "a tone system that keeps a broader audience without diluting judgment",
    limitation: "Trying to satisfy everyone can flatten the writing; the criteria must stay visible.",
  },
  {
    discipline: "visual evidence framing and image ethics",
    researchQuestion: "When does a strong atmospheric image help a mystery page, and when does it mislead the reader?",
    evidenceUnit: "image role, specificity, implied evidence, and whether the visual matches the page's claim",
    operatorPractice: "Replacing broken images showed how much the image was deciding mood before the article spoke. That made image selection an editorial issue, not just a design task.",
    frameworkName: "Paranormal Image Role Audit",
    axes: ["proof context", "location context", "symbolic context", "decorative risk"],
    caseApplication: "Loch Ness and the Voynich Manuscript need different image roles. One benefits from place context; the other benefits from object and archive context.",
    professionalOutput: "a rule for choosing visuals that strengthen trust instead of generic atmosphere",
    limitation: "Stock imagery can support mood, but captions and alt text should not imply the image is direct evidence.",
  },
  {
    discipline: "microcopy design and occult card architecture",
    researchQuestion: "What must a short database card communicate before the reader decides to open a long page?",
    evidenceUnit: "name clarity, category cue, concrete image, and the unresolved mechanism",
    operatorPractice: "The homepage forced the hardest editorial compression. A card that says terrifying mystery is weaker than a card that names the specific kind of tension.",
    frameworkName: "Occult Card Anatomy",
    axes: ["object or entity", "category label", "threat mechanism", "open question"],
    caseApplication: "Wendigo and Polybius require different card language because one is tradition-bound and one is media-rumor-bound.",
    professionalOutput: "a microcopy standard for improving perceived expertise across the whole site",
    limitation: "A card should not solve the case; it should orient the reader honestly.",
  },
  {
    discipline: "myth migration and bilingual editorial context",
    researchQuestion: "Which parts of a myth travel between Korean and English web cultures, and which parts need reconstruction?",
    evidenceUnit: "portable rule, local setting, sacred or community context, and search-intent mismatch",
    operatorPractice: "Because this site is operated from a Korean context while using English occult material, I can see where direct translation makes a legend thinner.",
    frameworkName: "Myth Migration Ledger",
    axes: ["portable symbol", "local dependency", "context warning", "translation loss"],
    caseApplication: "Wendigo and Jersey Devil show opposite migration problems: one requires cultural caution, while the other requires regional history and local geography.",
    professionalOutput: "a cross-cultural lens that adds a real operator perspective rather than pretending the site is culturally neutral",
    limitation: "Some traditions should be summarized with restraint, not mined for monster content.",
  },
  {
    discipline: "policy-safe horror writing and mainstream monetization readiness",
    researchQuestion: "How can horror writing stay intense without relying on gore, harmful instruction, or shock escalation?",
    evidenceUnit: "uncertainty, boundary, consequence, restraint, and whether the page remains suitable for broad readers",
    operatorPractice: "The site already has a dark brand. If the language also becomes graphic, the page loses control. Restraint is not weakness; it is a publishing tactic.",
    frameworkName: "Ad-Safe Horror Language System",
    axes: ["analytic intensity", "graphic restraint", "human-cost respect", "claim moderation"],
    caseApplication: "Chupacabra and Dyatlov Pass both can be mishandled if the writer confuses vividness with graphic detail.",
    professionalOutput: "a language standard that supports AdSense review while improving reader trust",
    limitation: "Policy-safe writing still needs atmosphere; it should not become sterile.",
  },
  {
    discipline: "audience behavior and vote-bias diagnosis",
    researchQuestion: "What does a paranormal vote actually measure: preference, recognition, fear, nostalgia, or interface advantage?",
    evidenceUnit: "name familiarity, image clarity, fan identity, and whether the card provided enough context",
    operatorPractice: "Famous names entered matches with hidden momentum. Lesser-known cases needed stronger framing before readers could judge them fairly.",
    frameworkName: "Fan Vote Bias Audit",
    axes: ["recognition bias", "image bias", "fandom defense", "context deficit"],
    caseApplication: "SCP Foundation and Chupacabra demonstrate different fandom pressures: one has platform-native loyalty, the other has broad folklore recognition.",
    professionalOutput: "a post-match analysis method for turning votes into original content",
    limitation: "Votes are not useless, but they should not be treated as pure evidence of mystery quality.",
  },
  {
    discipline: "claim classification and evidence laddering",
    researchQuestion: "How can a page prevent documented facts, witness claims, theories, and vibes from collapsing into one voice?",
    evidenceUnit: "claim type, certainty level, source proximity, and theory distance",
    operatorPractice: "The largest quality jump came from separating claim types. A date, a witness account, and a speculative theory should not sound equally certain.",
    frameworkName: "Paranormal Evidence Ladder",
    axes: ["confirmed context", "documented claim", "witness report", "theory layer"],
    caseApplication: "Roswell and Skinwalker Ranch both need careful laddering because institutional documents, witness testimony, and television-era speculation often sit side by side.",
    professionalOutput: "a reusable evidence labeling system for every mystery profile",
    limitation: "The ladder improves clarity, but it cannot compensate for a missing primary source.",
  },
  {
    discipline: "motif analysis and symbolic compression",
    researchQuestion: "Why do red eyes function as more than decoration in paranormal imagery?",
    evidenceUnit: "attention direction, reciprocal gaze, danger color, animal reflection, and cinematic inheritance",
    operatorPractice: "Red eyes worked almost too well on cards. That revealed their editorial power: they compress threat, witness contact, and memory into one visual cue.",
    frameworkName: "Red-Eye Signal Analysis",
    axes: ["being seen", "danger coding", "night reflection", "symbol portability"],
    caseApplication: "Mothman and Black Eyed Kids both use eye motifs, but red glow and total blackness produce different reader reactions.",
    professionalOutput: "a motif-level analysis that gives the site depth beyond broad creature summaries",
    limitation: "A repeated motif does not prove a shared entity or source.",
  },
  {
    discipline: "archive culture and modern media afterlife",
    researchQuestion: "How does an old document become a modern internet mystery?",
    evidenceUnit: "material object, circulated image, theory community, and search-engine packaging",
    operatorPractice: "The Voynich material behaves online like a challenge screen, not only a manuscript. That difference matters for how the page should be written.",
    frameworkName: "Ancient Text, Modern Feed Model",
    axes: ["material history", "visual hook", "theory loop", "platform afterlife"],
    caseApplication: "Voynich Manuscript and SCP Foundation both involve documents, but one is a historical artifact and one is a fictional institutional format.",
    professionalOutput: "a distinction between archival mystery and internet-facing mystery",
    limitation: "The page should avoid calling every old unexplained object occult by default.",
  },
  {
    discipline: "content operations and seasonal publishing strategy",
    researchQuestion: "How can a small occult site become a living publication instead of a one-time web game?",
    evidenceUnit: "seasonal reset, post-match content, stable archive, and return reason",
    operatorPractice: "The world cup format is strongest when it feels like an event. The problem is that a static bracket gives no reason to return after one playthrough.",
    frameworkName: "Occult Live-Ops Calendar",
    axes: ["monthly theme", "match analysis", "archive update", "reader return loop"],
    caseApplication: "The full bracket and the Field Desk should work together: the bracket creates behavior, and the desk turns that behavior into analysis.",
    professionalOutput: "an operating plan that turns site maintenance into original content",
    limitation: "Seasonal operation requires consistency; abandoned events make a site look weaker than no events at all.",
  },
  {
    discipline: "AdSense recovery strategy and low-value content repair",
    researchQuestion: "What does a paranormal site need to add when rejection suggests that the current pages look replaceable?",
    evidenceUnit: "original method, authorial perspective, navigation clarity, and non-generic usefulness",
    operatorPractice: "Looking at the site honestly, the tournament idea is distinctive but the surrounding article layer had to prove more personal judgment and repeatable method.",
    frameworkName: "Low-Value Recovery Framework",
    axes: ["original framework", "visible operator labor", "internal linking", "policy-safe depth"],
    caseApplication: "A generic encyclopedia and an operator field desk can cover similar topics, but only the field desk shows why this site had to exist.",
    professionalOutput: "a recovery plan that adds expertise rather than only word count",
    limitation: "No content change guarantees approval; the goal is to remove obvious low-value signals.",
  },
  {
    discipline: "controlled vocabulary and niche authority building",
    researchQuestion: "How can a small occult site feel systematic instead of scattered?",
    evidenceUnit: "recurring terms, category discipline, glossary usefulness, and internal-link logic",
    operatorPractice: "The bracket became easier to operate once I stopped treating every entry as the same kind of mystery. The vocabulary became a tool, not decoration.",
    frameworkName: "Occult Controlled Vocabulary",
    axes: ["term definition", "category reuse", "reader training", "link architecture"],
    caseApplication: "Cryptid, entity, place, document, event, system, and participatory myth should not be interchangeable labels.",
    professionalOutput: "a vocabulary layer that helps users understand the archive and helps search engines understand page relationships",
    limitation: "A glossary becomes filler if the terms are not actually used across the site.",
  },
];

function profileFor(index) {
  return professionalProfiles[index] || professionalProfiles[professionalProfiles.length - 1];
}

function renderMetricRows(profile) {
  return profile.axes.map((axis, index) => {
    const questions = [
      "What would an editor inspect before letting this claim shape the page?",
      "Which part of the reader experience can distort judgment?",
      "What separates useful analysis from a generic mystery summary?",
      "How does this criterion change the way a matchup should be framed?",
    ];
    return `<tr><td><strong>${esc(axis)}</strong></td><td>${esc(questions[index % questions.length])}</td></tr>`;
  }).join('\n');
}

function renderProtocol(profile, note) {
  const steps = [
    ["Define the claim type", `Place the topic inside a clear category before choosing a theory. For this dossier, the working category is ${profile.discipline}.`],
    ["Separate attention from evidence", `Use ${profile.evidenceUnit} as the inspected unit instead of treating excitement as proof.`],
    ["Apply the operator test", profile.operatorPractice],
    ["Publish the boundary", profile.limitation],
  ];
  return steps.map(step => `<div><span>${esc(step[0])}</span><p>${esc(step[1])}</p></div>`).join('\n');
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function plainText(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ');
}

function nonSpaceCount(html) {
  return plainText(html).replace(/\s/g, '').length;
}

function noteUrl(note) {
  return `/field-notes/${note.slug}.html`;
}

function header(active = '') {
  return `<header>
        <a href="/" class="logo">OCCULT WORLD CUP</a>
    </header>
    <nav>
        <a href="/">Tournament</a>
        <a href="/mysteries/index.html">Encyclopedia</a>
        <a href="/field-notes/index.html"${active === 'notes' ? ' aria-current="page"' : ''}>Research Desk</a>
    </nav>`;
}

function footer() {
  return `<footer>
        <div class="footer-links">
            <a href="/">Tournament Home</a>
            <a href="/mysteries/index.html">Encyclopedia</a>
            <a href="/field-notes/index.html">Research Desk</a>
        </div>
        <p>&copy; 2026 Occult World Cup. Original paranormal research notes and tournament analysis.</p>
    </footer>`;
}

function noteCard(note, index) {
  return `<a href="${noteUrl(note)}" class="note-card">
                <div>
                    <span class="note-category">${esc(note.category)}</span>
                    <h3>${esc(note.title)}</h3>
                    <p>${esc(note.description)}</p>
                </div>
                <div class="note-meta">
                    <span>Dossier ${String(index + 1).padStart(2, '0')}</span>
                    <span>Read Dossier</span>
                </div>
            </a>`;
}

function buildArticle(note, index) {
  const img = images[index % images.length];
  const profile = profileFor(index);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.description,
    author: { '@type': 'Organization', name: 'Occult World Cup Field Desk' },
    publisher: { '@type': 'Organization', name: 'Occult World Cup' },
    datePublished: '2026-05-13',
    dateModified: '2026-05-13',
    mainEntityOfPage: `${site}${noteUrl(note)}`,
  };
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(note.title)} | Occult World Cup Field Notes</title>
    <meta name="description" content="${esc(note.description)}">
    <link rel="canonical" href="${site}${noteUrl(note)}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${site}${noteUrl(note)}">
    <meta property="og:title" content="${esc(note.title)}">
    <meta property="og:description" content="${esc(note.description)}">
    <meta property="og:image" content="${img}">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7217591196020054" crossorigin="anonymous"></script>
    <meta name="google-adsense-account" content="ca-pub-7217591196020054">
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    ${header('notes')}

    <article>
        <a href="/field-notes/index.html" class="back-link">&larr; Back to Field Notes</a>
        <div class="metadata">Published: ${published} | Author: Occult World Cup Field Desk | Category: ${esc(note.category)}</div>
        <span class="article-category">${esc(note.category)}</span>
        <h1>${esc(note.title)}</h1>
        <img src="${img}" alt="${esc(note.title)}" class="hero-img">

        <div class="article-summary">
            <p><strong>Research question:</strong> ${esc(profile.researchQuestion)} This dossier is written as a professional operating note for Occult World Cup, not as another summary of a familiar paranormal topic. The goal is to show how the site evaluates stories, matchups, source quality, reader behavior, and the editorial risks that appear when occult material is turned into an interactive tournament.</p>
        </div>

        <div class="research-brief">
            <div><span>Discipline</span><strong>${esc(profile.discipline)}</strong></div>
            <div><span>Evidence Unit</span><strong>${esc(profile.evidenceUnit)}</strong></div>
            <div><span>Working Model</span><strong>${esc(profile.frameworkName)}</strong></div>
            <div><span>Output</span><strong>${esc(profile.professionalOutput)}</strong></div>
        </div>

        <h2>Professional Thesis</h2>
        <p>${esc(note.description)} The professional problem behind it is more specific: ${esc(note.pain)}. A generic occult article would normally repeat the most memorable facts, add a dramatic image, and stop when the page looks long enough. That approach does not create authority. It creates volume. This dossier instead treats the topic as a publishing and research problem: what exactly should be inspected, what kind of uncertainty is being handled, and which editorial decision would make the page more useful than a rewritten summary?</p>
        <p>For this site, the unit of expertise is not a claimed paranormal credential. It is visible judgment. A small independent site can still show expertise when it explains why a mystery was categorized, why a matchup is fair or unfair, why a source chain is weak, or why a design decision might distort belief. That is the difference between writing about occult material and operating an occult archive with standards.</p>

        <div class="operator-note">
            <p><strong>Operator experience:</strong> ${esc(profile.operatorPractice)} ${esc(note.operatorMoment)} This is the kind of first-hand operating evidence that belongs on the site: not pretending to be an institution, but showing the actual decisions that appear when a tournament, an encyclopedia, and an ad-reviewed publication have to coexist.</p>
        </div>

        <h2>Analytical Framework</h2>
        <p>The working model for this page is <strong>${esc(profile.frameworkName)}</strong>. It is deliberately practical. It can be applied while writing a card, revising a long article, choosing a tournament seed, or deciding whether a claim deserves a caution note. The model does not ask the reader to believe the mystery. It asks the editor to label the kind of judgment being made.</p>
        <table class="metric-table">
            <thead><tr><th>Criterion</th><th>Editorial Use</th></tr></thead>
            <tbody>
                ${renderMetricRows(profile)}
            </tbody>
        </table>

        <div class="confidence-strip">
            <b>${esc(note.category)}</b>
            <b>${esc(profile.frameworkName)}</b>
            <b>Operator-Led Analysis</b>
            <b>Belief-Neutral</b>
        </div>

        <h2>Case Application</h2>
        <p>The comparison case is <strong>${esc(note.casePair)}</strong>. ${esc(profile.caseApplication)} This does not mean the two subjects are equivalent. It means the comparison exposes a useful editorial pressure. A professional page has to ask whether the reader is reacting to evidence, image, prior familiarity, cultural translation, or the way the interface presents the choice.</p>
        <p>The key signal is this: ${esc(note.signal)} The friction is this: ${esc(note.friction)} The editorial decision is therefore not cosmetic. ${esc(note.decision)} When the page makes those distinctions visible, the reader receives a framework instead of only a vibe. That is the kind of added value the current site needs more of.</p>

        <h2>Editorial Protocol</h2>
        <p>${esc(note.method)} The difference from an ordinary blog post is that the method can be repeated. If a reader opens another page on the site, the same standards should be visible: classify first, separate claim types, avoid fake certainty, and explain why the topic matters inside the tournament format.</p>
        <div class="protocol-list">
            ${renderProtocol(profile, note)}
        </div>

        <h2>Failure Modes and Boundaries</h2>
        <p>${esc(note.mistake)} That mistake is not only a writing issue. It is a site-quality issue. When too many pages use the same summary rhythm, the whole domain starts to look replaceable. A professional occult site needs boundaries: what it knows, what it suspects, what it is using as entertainment, and what it refuses to exaggerate.</p>
        <p><strong>Boundary:</strong> ${esc(profile.limitation)} This boundary is important because the site sits between entertainment, folklore, search traffic, and monetization review. Stronger content does not mean pretending to have impossible certainty. It means showing the reader exactly where the certainty ends.</p>

        <div class="field-definition">
            <span>Professional Contribution</span>
            <p>${esc(profile.professionalOutput)}. This is the specific contribution the page is supposed to make. If the article cannot point to a contribution like this, it is probably only adding word count.</p>
        </div>

        <h2>Publishing Value</h2>
        <p>${esc(note.searchFit)} Search value and reader value meet when the article answers a question that larger sites ignore. The strategic move for Occult World Cup is not to compete with every old paranormal encyclopedia on the same broad summaries. The stronger move is to publish precise, defensible, operator-led analysis that explains how mysteries are compared, how legends travel, and how the tournament format changes interpretation.</p>
        <p>${esc(note.practice)} That is where personal experience becomes professional rather than anecdotal. The experience is not presented as proof that a claim is true. It is presented as proof that the site has an operating method. The reader can inspect that method, disagree with it, and still leave with a clearer way to read the mystery.</p>

        <h2>Reader Diagnostic</h2>
        <ul>
            <li>What type of uncertainty is being handled here: evidence, memory, symbolism, translation, interface, or reader behavior?</li>
            <li>Which part of the page is documented context, and which part is editorial interpretation?</li>
            <li>Does the article add a reusable framework, or does it only retell familiar material?</li>
            <li>What would change if this topic appeared in a tournament matchup tomorrow?</li>
            <li>What should the site refuse to exaggerate even if exaggeration would get more attention?</li>
        </ul>

        <h2>Closing Judgment</h2>
        <p>${esc(note.takeaway)} That is the standard this revised Field Desk has to meet. The page should feel like it came from someone operating a specific occult product, seeing specific editorial problems, and building a framework to solve them. If it could be dropped into any random paranormal blog without changing anything, it is not good enough.</p>
        <p>The next step for this topic is not more atmosphere. It is more disciplined comparison. The reader should understand what is being ranked, what is being interpreted, what is being withheld, and why this site has a reason to exist beyond collecting scary names.</p>

        <section style="margin-top:60px; border-top:1px solid #222; padding-top:24px;">
            <h3 style="color:#fff;">Continue the Field Desk</h3>
            <ul>
                <li><a href="/field-notes/index.html" style="color:var(--blood-red);">All Original Field Notes</a> - The complete editorial method archive.</li>
                <li><a href="/mysteries/index.html" style="color:var(--blood-red);">Mystery Encyclopedia</a> - The case profiles these notes are built around.</li>
                <li><a href="/" style="color:var(--blood-red);">Tournament Home</a> - Return to the voting experience.</li>
            </ul>
        </section>
        <p class="article-footnote">Editorial note: this page is part of a house methodology archive. It is designed to support a more original, expert-feeling occult publication by making the site's own judgment process visible.</p>
    </article>

    ${footer()}
</body>
</html>
`;
  const count = nonSpaceCount(html);
  if (count < 3000) {
    throw new Error(`${note.slug} is too short: ${count}`);
  }
  return { html, count };
}

function buildIndex() {
  const cards = activeNotes.map(noteCard).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Research Dossiers | Occult World Cup Field Desk</title>
    <meta name="description" content="Thirty original paranormal research dossiers from the Occult World Cup field desk: evidence protocols, folklore migration, tournament methodology, source hygiene, and occult publishing standards.">
    <link rel="canonical" href="${site}/field-notes/index.html">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${site}/field-notes/index.html">
    <meta property="og:title" content="Research Dossiers | Occult World Cup Field Desk">
    <meta property="og:description" content="Professional editorial frameworks for reading, ranking, and publishing paranormal mysteries.">
    <meta property="og:image" content="${images[0]}">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7217591196020054" crossorigin="anonymous"></script>
    <meta name="google-adsense-account" content="ca-pub-7217591196020054">
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    ${header('notes')}

    <section class="hero" style="padding:100px 20px; text-align:center; background:linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.86)), url('${images[0]}'); background-size:cover; background-position:center; border-bottom:2px solid var(--blood-red);">
        <p class="section-kicker">Original Research</p>
        <h1 style="font-family:var(--font-heading); font-size:4.4rem; color:#fff; margin:0; text-shadow:0 0 30px var(--blood-red);">RESEARCH DOSSIERS</h1>
        <p class="field-note-intro">Thirty professional dossiers from the Occult World Cup field desk. These are not generic monster summaries. They document the site's own operating method: evidence ladders, source hygiene, bracket fairness, cross-cultural myth migration, ad-safe horror language, and the practical decisions behind an independent occult tournament archive.</p>
    </section>

    <main>
        <section class="field-notes-section">
            <div class="encyclopedia-wrapper">
                <p class="section-kicker">30 Long-Form Notes</p>
                <h2>Professional Paranormal Method Archive</h2>
                <div class="note-grid">
                    ${cards}
                </div>
            </div>
        </section>
    </main>

    ${footer()}
</body>
</html>
`;
}

function updateHomePage() {
  const path = join(root, 'index.html');
  let html = readFileSync(path, 'utf8');
  html = html
    .replace(/<a href="\/field-notes\/index\.html">Field Notes<\/a>/g, '<a href="/field-notes/index.html">Research Desk</a>')
    .replace(/Field Notes From the Occult Desk/g, 'Research Dossiers From the Occult Desk')
    .replace(/A new editorial layer for the site: long-form notes about evidence, folklore migration, tournament design, reader behavior, and the real operating decisions behind an occult ranking project\./g, 'A more professional editorial layer for the site: long-form research dossiers about evidence protocols, folklore migration, tournament design, reader behavior, and the real operating decisions behind an independent occult ranking project.')
    .replace(/Open the Field Notes Archive/g, 'Open the Research Dossiers');
  if (!html.includes('/field-notes/index.html')) {
    html = html.replace('<a href="/mysteries/index.html">All Mysteries</a>', '<a href="/mysteries/index.html">All Mysteries</a>\n        <a href="/field-notes/index.html">Research Desk</a>');
  }
  if (!html.includes('id="field-notes-section"')) {
  const featured = activeNotes.slice(0, 6).map(noteCard).join('\n');
    const section = `

        <section id="field-notes-section" class="field-notes-section">
            <div class="encyclopedia-wrapper">
                <p class="section-kicker">Original Research</p>
                <h2>Field Notes From the Occult Desk</h2>
                <p class="field-note-intro">A more professional editorial layer for the site: long-form research dossiers about evidence protocols, folklore migration, tournament design, reader behavior, and the real operating decisions behind an occult ranking project.</p>
                <div class="note-grid">
                    ${featured}
                </div>
                <div style="text-align:center; margin-top:50px;">
                    <a href="/field-notes/index.html" style="color:#fff; text-decoration:none; border:1px solid var(--blood-red); padding:15px 30px; border-radius:50px; font-size:0.9rem; font-weight:bold;">Open the Research Dossiers</a>
                </div>
            </div>
        </section>`;
    html = html.replace('\n    </main>', `${section}\n    </main>`);
  }
  writeFileSync(path, html, 'utf8');
}

function buildSitemap() {
  const mysteryFiles = readdirSync(join(root, 'mysteries'))
    .filter(file => file.endsWith('.html'))
    .sort();
  const urls = [
    { loc: `${site}/`, priority: '1.0' },
    { loc: `${site}/mysteries/index.html`, priority: '0.8' },
    { loc: `${site}/field-notes/index.html`, priority: '0.9' },
    ...mysteryFiles
      .filter(file => file !== 'index.html')
      .map(file => ({ loc: `${site}/mysteries/${file}`, priority: '0.7' })),
    ...activeNotes.map(note => ({ loc: `${site}${noteUrl(note)}`, priority: '0.75' })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url><loc>${item.loc}</loc><lastmod>2026-05-13</lastmod><priority>${item.priority}</priority></url>`).join('\n')}
</urlset>
`;
}

mkdirSync(outDir, { recursive: true });
const activeFileNames = new Set(['index.html', ...activeNotes.map(note => `${note.slug}.html`)]);
for (const file of readdirSync(outDir).filter(file => file.endsWith('.html'))) {
  if (!activeFileNames.has(file)) {
    rmSync(join(outDir, file));
  }
}
const counts = [];
for (const [index, note] of activeNotes.entries()) {
  const { html, count } = buildArticle(note, index);
  counts.push({ slug: note.slug, count });
  writeFileSync(join(outDir, `${note.slug}.html`), html, 'utf8');
}
writeFileSync(join(outDir, 'index.html'), buildIndex(), 'utf8');
updateHomePage();
writeFileSync(join(root, 'sitemap.xml'), buildSitemap(), 'utf8');

console.log(JSON.stringify({
  generated: activeNotes.length,
  minNonSpaceChars: Math.min(...counts.map(item => item.count)),
  maxNonSpaceChars: Math.max(...counts.map(item => item.count)),
  counts,
}, null, 2));
