import React, { useState } from 'react';
import * as style from "../book.css"
import HTMLFlipBook from "react-pageflip";
import scene1 from "../../public/images/scene1.png";
import scene2 from "../../public/images/scene2.png";
import scene3 from "../../public/images/scene3.png";
import scene4 from "../../public/images/scene4.png";
import scene5 from "../../public/images/scene5.png";
import scene6 from "../../public/images/scene6.png";
import scene7 from "../../public/images/scene7.png";

function Book() {
    const [language, setLanguage] = useState('en'); // 'en' or 'ar'
    const storyPages = {
        en: [
            {
                id: "001",
                title: "I: When Sleep Knoweth Not Peace",
                content: `Upon the eve when the moon waxed full and silver-bright, and the crows within the darkling woods did cry with restless tongue, all the village of Howling Hollow lay steep'd in hush'd slumber or so it was believ'd.
            Yet one soul amongst them knew no rest. The Insomniac, wearied in flesh but not in mind, sat upright by the dim-lit hearth, poring o'er a curious tome: The Dream Journal, `,
                imagePosition: "top",
                image: scene1
            },
            {
                id: "002",
                content: `penned by a famed authoress whose works did oft entwine waking thoughts with night's illusions. a lady whose name folk seldom spake, though whispers say her quill was guided by visions not wholly her own. With burning eyes and trembling fingers, he did close the book at last, seeking solace in slumber. Donning his night-raiment, he made to retire, yet sleep fled from him still.
            Then came the sound.
            A low, dreadful howl rent the air. not of any mere beast, but of something vast and ancient. Anon, there follow'd the shrieks of a man and a maid, then the thunderous tread of a creature most dire, its gait swift as stormwind and mighty as ruin. The Insomniac, stricken with dread, dar'd not glance through the window, though the moonlight spill'd like ghostfire upon his floor.
            So he sat. still as stone upon the chair beside his tangled bed, his spirit hollowed by the terror of that long, baleful night. There he remain'd, watching not, yet hearing all… and hoping, nay praying, that the dawn might come at last.`,
            },
            {
                id: "003",
                title: "II: A Cry in the Pale Morning",
                content: `When dawn's gentle light didst grace the crooked lanes of Howling Hollow, the village yet slumbered beneath a veil of unease. Among its folk dwelleth a man most fair of face and deft of hand — the one they calleth (the Troublemaker). His locks dark as raven's wing, his smirk ever perched upon his lips, he did conjure from thin air the queen of cards, as though fate itself bowed to his whim.

            `,
                imagePosition: "top",
                image: scene2
            },
            {
                id: "004",
                content: `Whispers abound that his magic swapped the destinies of men, yet none were harmed — or so 'twas claimed. As the sun clomb higher, the (Troublemaker) crossed paths with (the Clone) — a curious soul, neither man nor beast, but a shapeshifter once scorned by the world and brought unto the village by the Seer himself. And forasmuch as all trusted the Seer, none dared doubt the Clone's place amongst them. "Behold!" quoth the (Clone) in mirthful jest, now mirroring the Troublemaker's form. “See how I flip the cards, like thou, though mine magic gloweth red!”
                The (Troublemaker) sighed with a tone most bored, not bitter. “Foolish child. Now thou art trapped in mine likeness till day's end. Will thy jests ne’er end?”
                The (Clone) blinked in sudden dread. “Alas, thou speaketh true. A poor jest indeed…”
                Yet their play was halted by a cry most grievous — the voice of a villager well beloved. They ran swift as the wind, hearts heavy, only to behold a sight most foul. There, upon the cold earth, lay the brother of the crier — torn asunder, his body marred by claw and fang. Tracks of a monstrous beast, larger than any wolf known to man, scarred the soil. "'Tis not but Fenrir himself,” murmured one, “son of Loki, loosed upon the world.”
            `,
            },
            {
                id: "005",
                content: `The (Clone), still cloaked in the guise of the (Troublemaker), did go forth to soothe the grieving soul. But the shock of two twin visages bewildered the bereaved further.
                Meanwhile, the true (Troublemaker) knelt beside the lifeless youth, eyes narrowed, thoughts spinning as a tempest. As he did, a shadow fell upon them — a man cloaked in black, crowned by a croaking crow, staff in hand and secrets behind his eyes. A stranger, aye, newly come to Howling Hollow, and yet known to none.
                “Well now,” spake the dark one, smirking with cruel delight, “What hath we here? Another corpse? Shall these slaughters ne'er cease?” His mirth, most foul, echoed in the cold morning air.
                And all did stare, but none dared speak. For suspicion bloometh where silence taketh root.
            `,
            },
            {
                id: "006",
                title: "III: The Mayor's Vow Beneath the Bell",
                content: `Later that day, beneath the weary sun of afternoon, a herald of the noble mayor didst cry aloud to gather the folk:
                “Make way, make way! The Lord Mayor of our fair village shall speak!”
                And lo, upon the timbered platform in the heart of the square, the mayor did appear—garbed in robes of velvet and gold, his face drawn yet proud. With a voice like thunder he declared,
            `,
                imagePosition: "top",
                image: scene3
            },
            {
                id: "007",
                content: `“A soul hath perished 'neath foulest circumstance—torn asunder in the still of night. We are beset by darkness, mayhap a beast most vile walks among us! But fret not—I, your mayor, shall root out this fiend and present his head to the king himself!”
                A hush fell o'er the crowd,
                Among the gathered stood the Sentinel, cloaked in mystery and shadow. His eyes, ever watchful, did not waver. In his gloved hand he held a vial an enchanted potion of protection, whispered into existence by the Witch herself. He knew this day would come, but whom to save, he yet knew not. In his heart burned the tale of an ancient dark hero, a ghost who shielded the innocent from within the night—though but a tale, the Sentinel lived by its creed. Beside him, the Minion—smiling that fool's grin, his elven ears twitching with glee. All took him for a jester, yet beneath those gleaming eyes lay knowledge far too deep for one of his ilk. And lo—what prowled by the Minion's heel but a cat of sable fur and eyes like molten silver. Too quiet. Too knowing. Some among the folk glanced and shivered, for this was no common beast. 'Twas whispered the Dreamwolf walks among them—shifted into beastly guise, seeking truth in silence. She, more than any, knew the Minion's mask hid more than mirth.
            `,
            },
            {
                id: "008",
                title: "IV: The Last Light of the Mayor",
                content: `As the sun sank 'neath the crooked spires of Howling Hollow, a dreadful stillness did fall upon the village square. Where once the mayor stood proud in pomp and proclamation, now lay his broken corpse, sprawled upon the timbered dais in grotesque mimicry of life. Torn asunder by talons not of this world, his robes—once regal—now hung in tatters, dyed in his own royal crimson.
            `,
                imagePosition: "top",
                image: scene4
            },
            {
                id: "009",
                content: `A shudder passed through the gathered folk, their breath caught in their throats, for 'twas not merely a death—it was a declaration. The beast, whate'er it be, had mocked the mayor's might, leaving his ruin upon the very stage he once ruled. A message in blood: thou art naught but a fool chasing dogs whilst wolves walk freely.
                Then came the Seer, the one cloaked in time and wisdom, gliding forth from shadow's edge. He knelt beside the body, palm outstretched, seeking the final echoes of the mayor's fleeting soul. Yet something foul did cloud the ether—chaos magicks, cast by a sorcerer near in power to himself, veiled the truth in riddles and illusion. No vision came to him this day, save the certainty of a greater hand behind the veil. The Witch arrived swift thereafter, her robe billowing, a vial of healing clutched in her trembling grasp. But alas, she was too late. Again. Her lips trembled not with fear, but with remembrance. Once more, death had bested her craft—just as it had on that wretched eve two centuries past. Though her face bore youth, her eyes held the weight of ages and regrets unspoken. Among the crowd, whispers chased shadows. And above all, silent and still, there sat the cat or so it seemed eyes aglow with ancient knowing. Perched upon a crooked roof, unseen by those below.
            `,
            },
            {
                id: "010",
                title: "V: Whispers Beneath the Moon",
                content: `When the shadowed night grew deep, and moonlight didst hang like silver breath o'er the crooked lanes of Howling Hollow, a silence most grave cloaked the village. 'Twas not the hush of peace, nay — but the stillness of breath held in fear, as though unseen powers, ancient and wrathful, prepared their march upon mortal ground. The air itself quivered, and all who yet lived did know:
            `,
                imagePosition: "top",
                image: scene5
            },
            {
                id: "011",
                content: `Should they tarry long, ere dawn another soul would surely perish. High atop the tallest spire, within a tower of groaning wood and time-worn stone, stood the Seer, his robes trailing like whispered thought. Before him hovered a crystal orb aglow with secret fire, pulsing with the light of realms unseen. There did he chant in tongues long lost, seeking through veil and shadow the truth behind the chaos. For his sight pierceth flesh and word alike — revealing that which lieth hidden in men's hearts.
                Yet far beyond the village edge, deep within a crooked hut where forest shadows twist and tremble, the Mystic Wolf worked in silence. He, once a sorcerer of great renown, now bear'th the curse of fang and fury. Cloaked in the guise of a withered villager, he didst stir dark magic, weaving spells to cloud the Seer's gaze. “Let him see but one,” spake he beneath his breath, “and may his vision falter thereafter.” So moved his hand, and the orb of truth, elsewhere, began to dim. And lo — upon the rooftops of that weary village, where chimney smoke danced with starlight, stood the Sentinel, still as stone, his cloak billowing like a storm-tossed banner. In his grasp, the last vial of the witch's safeguard potion, now spent upon a soul he deemed pure.
            `,
            },
            {
                id: "012",
                title: "VI: Games of the Three Tricksters",
                content: `When the sun sank low and the long shadows didst stretch across the cobbled veins of Howling Hollow, a restless hush fell upon the village, as though the stones themselves did hold their breath. In a narrow crooked alley, where golden gloam did mingle with ancient dust, there stood the Troublemaker, leaning once more ‘gainst timber and stone. His fingers, nimble as a bard's upon lute strings,
            `,
                imagePosition: "top",
                image: scene6
            },
            {
                id: "013",
                content: `didst weave glowing cards between them aglow in hues of sapphire and sunfire, as if enchanted stars played at dice within his grasp. Yet his smirk, ever-present, did hold a weight unknown this twilight — not born of jest, but of purpose. A scheme, dark and deft, did brew within his cunning gaze, even as the world about him seemed to fray.
                Not far hence, behind crates left to rot and time's forgetting, crouched the Joker, half-swallowed by shadow, yet full-fed on mischief. A mask he held, painted and cruel. His grin — curled like a wyrm's tail — did whisper of chaos yet to come. Be he spy, fool, or trickster-born, none could say with truth. And lo — the wind did carry hushed whispers of yet a third, the Robber, thief not of coin nor bauble, but of souls themselves. A pouch, cursed and glowing faint, did hang at his belt like a relic from darker rites. Cloaked in dusk and hidden 'twixt ancient walls, he stood apart, heart torn 'twixt light and shade. A man of good soul once, or so some say — yet now he treadeth the path of shadow, naming his theft a form of art. Some deem him a harbinger of balance, others, of ruin. Whate'er the truth, his craft hath cast unease o'er all of Howling Hollow, where now e'en the gentlest breeze feeleth like a herald of doom.

            `,
            },
            {
                id: "014",
                title: "VII: The Gathering at the Table of Truth",
                content: `Upon the sacred Table of Truth did they gather — the last souls of Howling Hollow, drawn by grief, dread, and duty. Faces grim and voices hushed, none dared jest, for the shadow of a slain boy did yet linger in the air. His brother, eyes red with sorrow and wrath, sat with fists clenched upon the worn oak. Right in front of him, a man clad in black watched in silence — 
            `,
                imagePosition: "top",
                image: scene7
            },
            {
                id: "015",
                content: `his gaze like ink spilled 'cross fresh parchment. Some say he wanders by moonlight alone, and none know whence he came.
                Opposite sat an elder whose cloak bore the scent of forest moss and arcane dust. He spake little, though his eyes gleamed with secrets untold — a whisper of wild magic clung to him, as if the trees themselves did lend him breath. There be those who wonder: was he ever truly a man, or hath the curse of fang and moon taken root?
                Nearby, a woman all robed in midnight silk kept her name close, like a blade in sheath. Her voice, when spoken, did flow as though penned by the hand of a learned scribe. Many a tale had she writ, 'tis said — dreams shaped in ink and shadow. Yet none could tell where fiction ended and truth began.
                Lastly, huddled 'twixt hope and fear, a simple villager of innocent mien did watch the others, lips quivering in silent prayer. They sought not power nor vengeance — only safety, and the light of dawn unmarred by blood. Mayhap the wizards and watchers among them held the answers. Mayhap the blade of justice yet hung above their own heads. For if those who guard be not guardians, but villains veiled in glory — then Howling Hollow is lost indeed, to a darkness no dawn can dispel.

            `,
            },
        ],
        ar: [
            {
                id: "001",
                title: "حين يغفو العالم ويظل اليقظ بلا سلام",
                content: `في تلك الليلة التي اكتمل فيها القمر وتلألأ بضيائه الفضي، كانت الغربان تصرخ في ظلام الغابة بأصواتٍ نافذة، فيما خيّم السكون على قرية "هاولينغ هولو" بأسرها — أو هكذا ظنّ الجميع.
                إلا أن روحًا واحدة لم تعرف النوم. كان ذلك الشخص المصاب بالأرق جالسًا قرب الموقد الخافت، متعب الجسد، لكن عقله مستيقظ لا يهدأ. كان يتصفّح كتابًا غريبًا يُدعى يوميات الأحلام، 
            `,
                imagePosition: "top",
                image: scene1
            },
            {
                id: "002",
                content: `كتبته مؤلفة مشهورة، تُنسج حولها الأقاويل، ويُقال إن حبرها كان يُرشد برؤى لا تنتمي لهذا العالم — امرأة لا يُذكر اسمها إلا همسًا، وإن كانت همسات الظلام تشير إلى صلة خفية بينها وبين الأحلام ذات الأنياب. وما إن أغلق الكتاب بأصابع مرتجفة وعينين متوهجتين من السهر، حتى حاول الاحتماء بالنوم. ارتدى ثيابه الليلية وتوجّه إلى سريره، لكن النوم لم يقترب منه. ثم جاء الصوت. عواء عميق ومروّع مزّق سكون الليل — لم يكن صوت ذئب عادي، بل شيءٌ قديم وعظيم، أقدم من الذاكرة. تبع العواء صراخُ رجلٍ وامرأة، ثم دوي خطوات مخلوق عاتٍ، يركض بسرعة العاصفة وبقوة لا توصف. شعر الرجل بالخوف يشلّ جسده، فلم يجرؤ على النظر من النافذة، رغم أن ضوء القمر كان يتسرّب إلى الأرض كوهج الأشباح.
                جلس في مكانه — صامتًا كالحجر — على كرسيه بجانب سريره الفوضوي، روحه خاوية بعد تلك الليلة الطويلة والمُرعبة. وبقي هناك، لا يرى لكنه يسمع كل شيء... آملاً، أو بالأحرى متوسلاً، أن يطلع الفجر أخيرًا
            `,
            },
            {
                id: "003",
                title: "صرخة في فجرٍ شاحب",
                content: `عندما بزغ نور الفجر فوق أسقف قرية هاولينغ هولو المائلة، كان السكون يلف المكان، لكن قلب القرية كان مضطربًا لا يهدأ. وفيها كان يعيش رجل يُعرف بـ (مثير المتاعب)، فتى جميل الطلعة، داكن الشعر، دائم الابتسامة الواثقة، يتلاعب بأوراق اللعب كأنما يُحرك خيوط القدر بيديه.
                يقول الناس إن سحره قادر على تبديل مصائر الرجال، لكن لم يصب أحد بأذى... على الأقل حتى الآن.
            `,
                imagePosition: "top",
                image: scene2
            },
            {
                id: "004",
                content: `وبينما كان يبدأ نهاره، التقى بـ (المُستنسخ)، ذاك الرجل الغامض، مخلوق من العجائب، يستطيع أن يتحول إلى أي هيئة يشاء. جلبه (العراف العجوز) إلى القرية، وأدخله بين الناس، لأنهم يثقون في حكمة العراف العظيمة.
                فقال (المستنسخ) وهو يضحك بمكر طفولي، وقد أخذ شكل مثير المتاعب:
                "أنظر! أستطيع قلب الأوراق بسحري مثلك تمامًا! لكن ناري حمراء وليست زرقاء وصفراء كنارك!"
                تنهد (مثير المتاعب)، قائلاً بملل دون غضب:
                "متى ستكفّ عن تصرفات الأطفال؟ ها أنت قد علقت بهذا الشكل ليومٍ كامل، أحمق!"
                ردّ المستنسخ بدهشة:
                "آه... صدقتَ، مزحة سيئة حقًا..."
                وما إن انتهت كلماته حتى دوى صراخ رهيب في أرجاء القرية، صرخة من أحد القرويين المعروفين والمحبوبين. ركض الاثنان بسرعة، وإذا بأثر أقدام ضخمة محفورة في الأرض، اثار أقدام لا يقدر عليها إلا وحشٌ أسطوري.
                كان هناك جسد مُمزق... شقيق القروي الحزين قد فارق الحياة، وقد غُرس بأظافر وحشٍ أشبه بذئب، لا، بل أعظم من كل ذئبٍ عرفته البشرية...
                قال أحدهم همسًا: "أهو فنرير؟ ابن لوكي؟ أحقًا خرج من الأسطورة؟"
                اقترب (المستنسخ)، في هيئة (مثير المتاعب)، محاولًا مواساة القروي، لكن رؤيته مرتين في ذات اللحظة زادت من صدمة الحزين.
                أما (مثير المتاعب) الحقيقي، فقد جثا بجوار الجثة، يفحص المشهد بعين ثاقبة.
            `,
            },
            {
                id: "005",
                content: `وفجأة، تقدم رجلٌ غريب، يرتدي السواد، يعلو رأسه غراب، ويستند على عصا غابة ملتوية. غريبٌ قدم حديثًا إلى القرية، ولا يثق به أحد، لكن لا أحد يتكلم.
                قال وهو يضحك بسخرية باردة:
                "أوه... أنظروا ماذا لدينا هنا! جثة أخرى؟ متى ستنتهي هذه المجازر؟"
                ضحكته كانت كالسُمّ، تتسلل بين ثنايا الصمت، فيما بدأ الخوف يتغلغل في القلوب، والشك ينمو في العيون. 
            `,
            },
            {
                id: "006",
                title: "وعد العمدة تحت ظل القوة",
                content: `في عصر ذلك اليوم، وتحت شمس الشاحبة، صاح خادم من خدام عمدة القرية النبيل بأعلى صوته في الساحة:
                "تنحّوا! تنحّوا! العمدة الجليل سيلقي خطابًا هامًا!"
                فوقف العمدة فوق المنصة الخشبية المرتفعة في وسط الساحة، مرتديًا عباءته المزركشة، وصوته يعلو بالحزن والعجلة، وقال:
            `,
                imagePosition: "top",
                image: scene3
            },
            {
                id: "007",
                content: `لقد سقط أحد القرويين صريعًا في ليلة البارحة، ومقتله يحمل بصمات وحش مريع لا يُعرف له مثيل. هناك قاتل بيننا... وقد يكون وحشًا لا بشرًا! لا تخافوا، فسوف أقبض على هذا الكائن، وأرفع رأسه هدية للملك!"
                دبّت القشعريرة في نفوس الحاضرين، وترددت الهمسات بين الأفواه الخائفة.
                وسط هذا الجمع، وقف الحارس الصامت، المعروف بين البعض باسم (الحارس الليلي)، رجل غامض لا يظهر إلا نادرًا، يحمل في يده قنينة صغيرة، فيها جرعة وقاية سحرية صنعتها له الساحرة بوصية منه. لقد علم أن هذا اليوم سيأتي، لكنه لا يعلم بعد لمن سيمنح هذه الحماية.
                قلبه ينبض بأسطورة قديمة، عن بطلٍ أسودٍ يختبئ في الظلال، يحمي الأبرياء دون أن يُكشف أمره.
                وإلى جانبه، يقف (التابع) المبتسم ذو الأذنين المدببتين، يبدو أحمقًا في الظاهر، لكنه يعلم أكثر مما يتصوره الناس.
                وبين الحشود، بجوار هذا (التابع)، كانت هناك قطة سوداء صغيرة ذات عينين لامعتين بشكلٍ غير طبيعي. بدت نظراتها كأنها تخترق النفوس. لقد همس البعض بخوف: "تلك ليست قطة..."
                نعم، قد تكون هذه هي (ذئبة الأحلام)، تحوّلت لتتسلل خفيةً بين الناس، تتجسس عليهم دون أن تكشف عن هيئتها البشرية. لا أحد يعلم عنها الكثير، لكنها، دون شك، تعلم أن هذا التابع الغبي... ليس غبيًا كما يبدو....
            `,
            },
            {
                id: "008",
                title: "الوهج الأخير للعمدة",
                content: `حينما انحدرت الشمس خلف الأبراج المعوجّة لقرية هاولينغ هولو، خيّم الصمت الكئيب على الساحة. المكان الذي وقف فيه العمدة متباهياً في عظمة وكبرياء قبل ساعات فقط، صار الآن مسرحاً لدمه المسفوك. جثته ملقاة بإهانة، كما لو كانت تسخر من الحياة نفسها، ممزقة بأنياب لا تنتمي لهذا العالم. ثيابه، التي كانت يوماً فاخرة، قد تمزّقت وتلطّخت بلونه القرمزي.
            `,
                imagePosition: "top",
                image: scene4
            },
            {
                id: "009",
                content: `ارتجف الحشد المجتمع، وتجمّدت أنفاسهم، فهذا لم يكن موتاً فحسب، بل إعلاناً… العدو، أياً يكن، قد سخر من العمدة، وترك جثته كرسالة: أنت أضعف حتى من أن تمسك بكلب، فكيف بذئبٍ عظيم؟
                ثم أتى (العراف)، ذاك المتوشّح بالزمن والحكمة، يخرج من ظلال الزوايا، يتقدم نحو الجثة دون وجل. ركع بجانبها، ومدّ كفه محاولاً استدعاء آخر ذكريات روح العمدة قبل أن تُسحب. لكن شيئاً خبيثاً شوّش على الأثير—سحرٌ مشوَّش، قد ألقاه ساحرٌ آخر بقوةٍ مماثلة للعراف نفسه. لم يرَ العراف رؤية، لم يسمع همساً… فقط ارتياباً وثقةً أن هناك من يخفي الحقيقة عمداً.
                وصلت (الساحرة) بعده مسرعة، وعباءتها تتطاير خلفها، وفي يدها قنينة شفاء محكمة. لكنها، ويا للأسف، وصلت متأخرة. مرة أخرى. شفتاها ترتجفان لا خوفاً، بل حزناً… فالموت قد انتصر على علمها مجدداً، كما فعل تلك المساء منذ مئتي عام. وجهها يبدو شاباً، لكن عينيها كانتا مرآة لعمرٍ من الذنب والحنين والأسى.
                بين الحشود، لا أحد يعلم أين (التابع)، ذاك السخيف الضاحك دائماً. قد اختفى، لكن لا أحد يهتم، فهو لم يكن إلا مهرّجاً في حفلة من الحزن.
                وفوق الجميع، جلست القطة… أو من تبدو كقطة. عيناها المتوهجتان تراقبان من أعلى السطح المائل، كأنها تعرف كل شيء. لم يلحظها أحد، لكن هي رأت كل شيء… كل شيء.
                الليل يقترب، والقرية لا تُضيء بالأمل، بل ترتجف من الرهبة.
            `,
            },
            {
                id: "010",
                title: "همسات تحت ضوء القمر",
                content: `في ليلةٍ شاحبةٍ أثقلها السكون، كانت أنوار القمر تعلّق كأنفاسٍ من فضّة فوق الأزقة المعوجّة ل هاولينغ هولو، غطّى الصمت القرية بأسره. لم يكن صمتَ طمأنينة، بل سكونَ من يحبس أنفاسه في خوفٍ عظيم، وكأن قوى خفية، عتيقة وغاضبة، تُعدّ العدة لغزو أرض البشر. ارتجف الهواء ذاته، وعرف كل من بقي حيًّا: إن تأخروا كثيرًا، فإن روحًا بريئة أخرى ستسقط لا محالة قبل بزوغ الفجر.   
            `,
                imagePosition: "top",
                image: scene5
            },
            {
                id: "011",
                content: `فوق أعلى برجٍ في القرية، داخل برجٍ من خشب يئنّ من الزمن وحجرٍ هزِمته الأعوام، وقف العراف، وعباءته تتدلّى خلفه كأنها صدى همس قديم. أمامه عُلّقت كرة بلورية تتوهّج بنار الأسرار، تنبض بضوءٍ من عوالم غير مرئية. هنالك همس بألسنةٍ منسية، باحثًا عبر الحجب والظلال عن الحقيقة خلف الفوضى. فإن بصره يخترق الجسد والقول معًا — كاشفًا ما خفي في قلوب البشر.
                لكن بعيدًا عن أطراف القرية، داخل كوخٍ ملتفّ بالظلام في أعماق الغابة، كان الذئب الغامض يعمل في صمت. كان ساحرًا عظيمًا فيما مضى، حتى نالت منه لعنة الأنياب والقوة — حوّله الذئب الألفا إلى ما هو عليه الآن. متخفيًا في هيئة شيخٍ عاجز، كان يختمر السحر المظلم، ناسجًا تعاويذ تُضلّ العراف وتُعمي بصيرته. “دعه يرَ شخصًا واحدًا فقط”، قال هامسًا، “ثم ليصمت بصره إلى الأبد.” وهكذا تحرّكت يده، وبدأت كرة الحقيقة في موضع آخر تخبو وتخمد.
                أما على أسطح البيوت المنهكة، حيث يرقص دخان المداخن مع ضوء النجوم، فوقف الحارس، ساكنًا كالصخر، وعباءته تتطاير كرايةٍ في عاصفة. في قبضته آخر قارورةٍ من جرعة الحماية التي صنعتها الساحرة، وقد سكبها بالفعل على روحٍ رآها بريئة. كانت عيناه تراقبان المشهد في صمت، لا أحد يعلم ما يختلج قلبه — أهو الأمل؟ أم الواجب؟ أم لعله الخوف؟
                وهكذا، بدأت القطع تتحرك، بينما الليل يزحف ببطء، وقد أُلقيت نردات القدر من جديد.
            `,
            },
            {
                id: "012",
                title: "خدع ثلاثي الأزمات",
                content: `حينما انحدرت الشمس نحو المغيب، وانبسطت الظلال الطويلة على حجارة هاولنغ هولو المرصوفة، ساد سكون قَلِق في الأرجاء، كأن الحجارة ذاتها قد حبست أنفاسها.
                في زقاق ضيّق ملتف، حيث يمتزج ضوء الغسق الذهبي بغبار الأزمان، وقف (مُثير المتاعب) مستندًا مرة أخرى إلى الخشب والحجر. كانت أنامله، الخفيفة كعزف شاعر على أوتار عوده،
            `,
                imagePosition: "top",
                image: scene6
            },
            {
                id: "013",
                content: ` تتلاعب بأوراق تتوهّج بين زرقة الياقوت ووهج الشمس، كأنّ نجمين مسحورين يلعبان النرد بين يديه. لكن ابتسامته، الدائمة، كانت في هذه العشية أثقل من المعتاد — لا ولِيدة الهزل، بل نابعة من غاية. هنالك خُطّة تُخمَر في عينيه الماكرة، حتى وإن كان العالم من حوله يتمزق خيطًا بخيط.
                غير بعيد، خلف صناديق أكلها النسيان، جثم (المُهرّج)، نصفه في الظل ونصفه في الشغب. يحمل قناعًا مرسومًا بملامح خبيثة، ولفافة كاذبة في اليد الأخرى. ابتسامته — ملتوية كذيل تنّين — توحي بأن الفوضى لم تبدأ بعد. أهو جاسوس أم أحمق أم مولود من جنس الخداع؟ لا أحد يدري على وجه اليقين.
                ثمّ جاءت الرياح تهمس باسم ثالث — اللصّ، لا يسرق ذهبًا ولا حليًّا، بل الأرواح ذاتها. كيسٌ ملعون متوهّج خافتًا يتدلّى من حزامه، كأنّه أثر من طقوسٍ أكثر ظلامًا. يلفّه الغسق، ويختبئ بين الجدران العتيقة، واقفًا لوحده، وقلبه ممزق بين النور والظل. كان يومًا ما رجلًا طيّبًا، — وربما لا يزال — لكنّه الآن يسلك درب الظلام، ويسمّي سرقته فنًّا. بعضهم يراه باعث توازن، وآخرون ينعتونه رسول الخراب. أيا كانت الحقيقة، فإنّ حِرفته قد نشرت الاضطراب في أرجاء هاولنغ هولو، حتى إن النسيم العابر بات يحمل نذيرًا بالشؤم.
            `,
            },
            {
                id: "014",
                title: "اجتماع حول مائدة الحقيقة",
                content: `عند مائدة الحقيقة اجتمعوا — آخرُ نفوس قرية هاولينغ هولو، جاؤوا بدافع الحزن والرعب والواجب. وجوهٌ مكفهّرة، وأصواتٌ خفيضة، لا أحد تجرأ على المزاح، إذ لا يزال طيفُ الصبي المقتول يخيم في الأجواء. أخوه، بعينين متورمتين من البكاء والغضب، جلس والقبضتان مشدودتان على خشب البلوط العتيق.
                أمامه، جلس رجلٌ بثياب سوداء،
            `,
                imagePosition: "top",
                image: scene7
            },
            {
                id: "015",
                content: `يراقب بصمتٍ — نظرته كالحبر المسكوب على رقٍّ نقي. يُقال إنه يتجول تحت ضوء القمر وحده، ولا أحد يعرف من أين أتى. في الجهة المقابلة، جلس شيخٌ تنبعث من عباءته رائحة الغابات وغبار السحر. لا يتحدث إلا قليلاً، لكن في عينيه بريق أسرارٍ لم تُفصح، كأن السحر البري يسكنه، وكأن الأشجار نفسها قد منحتْه أنفاسها. ويتساءل البعض: هل كان رجلاً بحق، أم أن لعنةَ الناب والقمر قد غزتْ روحه؟
                وبالقرب منهم، جلست امرأة بثوب من حرير الليل، تخفي اسمها كما يُخفى السيف في غمده. صوتها، حين تتحدث، ينساب كما لو كُتب بأنامل كاتبٍ عظيم. يُقال إنها كتبت العديد من الحكايات — أحلامٌ صيغتْ بالحبر والظل. ولكن لا أحد يعلم أين تنتهي الحكاية وتبدأ الحقيقة.
                وأخيرًا، جالسٌ بين الخوف والأمل، فلاحٌ بسيط بملامح بريئة، يراقب الآخرين، وشفته ترتعش في دعاءٍ صامت. لا يسعى للسلطة أو الانتقام — بل للسلام، ولطلوع فجرٍ لا تُلطّخه الدماء.
                فلعلّ السحرة والحماة بينهم يملكون الإجابة. ولعلّ سيف العدالة معلق فوق رؤوسهم هم أنفسهم. فإن كان الحُرّاس ليسوا إلا أشرارًا متخفين بالمجد — فإن هاولينغ هولو حقًا إلى ظلمةٍ لا فجر لها سائرة.
            `,
            },
        ]
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    return (
        <div className="book-container">
            <button
                className="language-toggle mt-15 md:mt-0 lg:mt-0"
                onClick={toggleLanguage}
            >
                {language === 'en' ? 'العربية' : 'English'}
            </button>

            <HTMLFlipBook
                className={`responsive-flipbook ${language === 'ar' ? 'rtl' : ''}`}
                width={300}
                height={450}
                minWidth={250}
                maxWidth={500}
                minHeight={375}
                maxHeight={750}
                maxShadowOpacity={0.5}
                drawShadow={true}
                showCover={true}
                size="stretch"
                mobileScrollSupport={true}
            >
                <div className="page" style={{ background: 'transparent' }}>
                    <div className="page-content cover">
                        <h1 className="story-title">
                            {language === 'en' ? 'The Tale of Howling Hollow' : 'أسطورة هولينج هولو'}
                        </h1>
                    </div>
                </div>

                {storyPages[language].map((page) => (
                    <div className="page" key={page.id}>
                        <div className="page-content">
                            <div className={`story-container ${page.imagePosition}`}>
                                {page.imagePosition === "top" && page.image && (
                                    <img src={page.image} className='rounded-lg story-image' alt="" />
                                )}

                                <div className="story-info">
                                    {page.title && <h2 className="story-page-title text-center">{page.title}</h2>}
                                    <p className={`story-page-content`}>{page.content}</p>
                                </div>

                                {page.imagePosition === "bottom" && (
                                    <img src={page.image} className='rounded-lg story-image' alt="" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </HTMLFlipBook>
        </div>
    );
}

export default Book;