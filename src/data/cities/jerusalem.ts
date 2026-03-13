import type { City } from "@/types";

export const jerusalemData: City = {
  id: "jerusalem",
  name: {
    ar: "القدس",
    en: "Jerusalem",
    transliteration: "Al-Quds",
  },
  region: "jerusalem",
  coordinates: {
    lat: 31.7683,
    lng: 35.2137,
  },
  description: {
    ar: "القدس، قلب فلسطين النابض وروحها. مدينة الأديان الثلاثة ومهد الحضارات. تحتضن المسجد الأقصى وكنيسة القيامة، وتحمل في حجارتها قصص آلاف السنين.",
    en: "Jerusalem, the beating heart and soul of Palestine. City of the three faiths and cradle of civilizations. Home to Al-Aqsa Mosque and the Church of the Holy Sepulchre, its stones carry stories of thousands of years.",
    transliteration: "Al-Quds, qalb Filastin an-naabid wa roohaha.",
  },
  heroImage: "/images/cities/jerusalem-hero.jpg",
  population: {
    pre1948: 164000,
    current: 936000,
  },
  established: "3000 BCE",
  status: "occupied",
  sections: [
    {
      type: "history",
      content: {
        title: {
          ar: "تاريخ القدس",
          en: "History of Jerusalem",
          transliteration: "Tarikh Al-Quds",
        },
        description: {
          ar: "رحلة عبر آلاف السنين من تاريخ المدينة المقدسة",
          en: "A journey through thousands of years of the Holy City's history",
          transliteration: "Rihla 'abr alaf as-sineen min tarikh al-madina al-muqaddasa",
        },
        items: [
          {
            id: "jrs-hist-1",
            title: {
              ar: "الكنعانيون واليبوسيون",
              en: "Canaanites and Jebusites",
              transliteration: "Al-Kan'aniyyun wal-Yabusiyyun",
            },
            description: {
              ar: "استوطن الكنعانيون واليبوسيون القدس منذ أكثر من 5000 عام. أسسوا مدينة 'يبوس' وبنوا أسوارها وحصونها.",
              en: "The Canaanites and Jebusites settled Jerusalem over 5,000 years ago. They founded the city of 'Jebus' and built its walls and fortifications.",
              transliteration: "Istawtan al-Kan'aniyyun wal-Yabusiyyun al-Quds mundhu akthar min 5000 'aam.",
            },
            kidsVersion: {
              ar: "منذ زمن بعيد جداً، عاش ناس يُسمون اليبوسيين في القدس وبنوا مدينة جميلة!",
              en: "A very long time ago, people called Jebusites lived in Jerusalem and built a beautiful city!",
              transliteration: "Mundhu zaman ba'id jiddan...",
            },
            deepDiveContent: {
              ar: "تشير الحفريات الأثرية إلى أن المنطقة كانت مأهولة منذ العصر الحجري النحاسي (4500-3300 ق.م). اليبوسيون، وهم قبيلة كنعانية، أسسوا مدينة محصنة على تلة أوفل بالقرب من نبع جيحون.",
              en: "Archaeological excavations indicate the area was inhabited since the Chalcolithic period (4500-3300 BCE). The Jebusites, a Canaanite tribe, established a fortified city on the Ophel hill near the Gihon Spring.",
              transliteration: "Tushir al-hafriyyat...",
            },
            sources: ["Kathleen Kenyon archaeological findings", "Biblical Archaeology Review"],
          },
          {
            id: "jrs-hist-2",
            title: {
              ar: "العصر الإسلامي الأول",
              en: "Early Islamic Period",
              transliteration: "Al-'Asr al-Islami al-Awwal",
            },
            description: {
              ar: "فُتحت القدس في عهد الخليفة عمر بن الخطاب عام 637م. كتب العهدة العمرية التي ضمنت حقوق جميع سكان المدينة.",
              en: "Jerusalem was opened in the era of Caliph Umar ibn al-Khattab in 637 CE. He wrote the Covenant of Umar, guaranteeing the rights of all city inhabitants.",
              transliteration: "Futihat al-Quds fi 'ahd al-Khalifa 'Umar ibn al-Khattab...",
            },
            kidsVersion: {
              ar: "جاء قائد عظيم اسمه عمر بن الخطاب ووعد بحماية كل الناس في القدس!",
              en: "A great leader named Umar ibn al-Khattab came and promised to protect everyone in Jerusalem!",
              transliteration: "Ja' qa'id 'athim ismuhu...",
            },
            deepDiveContent: {
              ar: "العهدة العمرية وثيقة تاريخية فريدة تضمن حرية العبادة والأمان لأهل الكتاب. رفض عمر الصلاة داخل كنيسة القيامة حتى لا يتخذها المسلمون مسجداً فيما بعد.",
              en: "The Covenant of Umar is a unique historical document guaranteeing freedom of worship and safety for the People of the Book. Umar refused to pray inside the Church of the Holy Sepulchre so Muslims would not later convert it into a mosque.",
              transliteration: "Al-'Uhda al-'Umariyya wathiqa tarikhiyya farida...",
            },
            sources: ["Tarikh at-Tabari", "The History of Jerusalem - Moshe Gil"],
          },
          {
            id: "jrs-hist-3",
            title: {
              ar: "النكبة والتهجير",
              en: "Nakba and Displacement",
              transliteration: "An-Nakba wat-Tahjir",
            },
            description: {
              ar: "في عام 1948، هُجّر معظم سكان القدس الغربية. سقطت أحياء عريقة مثل القطمون والطالبية والبقعة.",
              en: "In 1948, most residents of West Jerusalem were displaced. Historic neighborhoods like Qatamon, Talbiyeh, and Al-Baqa'a fell.",
              transliteration: "Fi 'aam 1948, hujjir mu'tham sukkan al-Quds al-Gharbiyya...",
            },
            kidsVersion: {
              ar: "في سنة 1948، اضطر كثير من أهل القدس لمغادرة بيوتهم. نحفظ ذكراهم دائماً.",
              en: "In 1948, many people from Jerusalem had to leave their homes. We always remember them.",
              transliteration: "Fi sanat 1948...",
            },
            deepDiveContent: {
              ar: "شهدت القدس الغربية تطهيراً عرقياً منظماً. هُجّر حوالي 60,000 فلسطيني من أحيائهم. مذبحة دير ياسين في 9 أبريل 1948 كانت نقطة تحول أثارت الذعر والنزوح الجماعي.",
              en: "West Jerusalem witnessed systematic ethnic cleansing. About 60,000 Palestinians were displaced from their neighborhoods. The Deir Yassin massacre on April 9, 1948, was a turning point that sparked panic and mass exodus.",
              transliteration: "Shahidat al-Quds al-Gharbiyya tathiran 'irqiyan munathaman...",
            },
            sources: ["Ilan Pappé - The Ethnic Cleansing of Palestine", "Benny Morris - 1948"],
          },
        ],
      },
    },
    {
      type: "tatreez",
      content: {
        title: {
          ar: "تطريز القدس",
          en: "Jerusalem Tatreez",
          transliteration: "Tatriz Al-Quds",
        },
        description: {
          ar: "أنماط التطريز المقدسي تتميز بدقتها وألوانها الغنية",
          en: "Jerusalemite embroidery patterns are known for their precision and rich colors",
          transliteration: "Anmat at-tatriz al-Maqdisi tatamayyaz bi-diqqatiha...",
        },
        items: [
          {
            id: "jrs-tat-1",
            title: {
              ar: "وردة القدس",
              en: "Jerusalem Rose",
              transliteration: "Wardat Al-Quds",
            },
            description: {
              ar: "نمط الوردة المقدسية يرمز للجمال والصمود. يتكون من ثماني بتلات ويُطرز بالأحمر والأسود.",
              en: "The Jerusalem Rose pattern symbolizes beauty and resilience. It consists of eight petals embroidered in red and black.",
              transliteration: "Namat al-warda al-Maqdisiyya yarmuz lil-jamal was-sumud...",
            },
            kidsVersion: {
              ar: "وردة القدس الجميلة لها ثماني أوراق مثل النجمة! 🌹",
              en: "The beautiful Jerusalem Rose has eight petals like a star! 🌹",
              transliteration: "Wardat al-Quds al-jamila...",
            },
            deepDiveContent: {
              ar: "وردة القدس من أقدم الأنماط الفلسطينية. تطورت عبر القرون وأصبحت رمزاً للمدينة. كانت العرائس المقدسيات يطرزن هذا النمط على ثوب الزفاف كبركة.",
              en: "The Jerusalem Rose is one of the oldest Palestinian patterns. It evolved over centuries and became a symbol of the city. Jerusalemite brides would embroider this pattern on their wedding dress as a blessing.",
              transliteration: "Wardat al-Quds min aqdam al-anmat al-Filastiniyya...",
            },
          },
          {
            id: "jrs-tat-2",
            title: {
              ar: "قبة الصخرة",
              en: "Dome of the Rock",
              transliteration: "Qubbat As-Sakhra",
            },
            description: {
              ar: "نمط مستوحى من القبة الذهبية، يُطرز بخيوط ذهبية وزرقاء ويمثل المسجد الأقصى.",
              en: "A pattern inspired by the golden dome, embroidered with gold and blue threads representing Al-Aqsa Mosque.",
              transliteration: "Namat mustaw-ha min al-Qubba adh-Dhahabiyya...",
            },
            kidsVersion: {
              ar: "القبة الذهبية اللامعة تزين أثواب القدس! ✨",
              en: "The shiny golden dome decorates Jerusalem's dresses! ✨",
              transliteration: "Al-Qubba adh-Dhahabiyya al-lami'a...",
            },
            deepDiveContent: {
              ar: "بدأ هذا النمط في القرن التاسع عشر وأصبح من أشهر رموز التطريز الفلسطيني. يتطلب مهارة عالية بسبب تفاصيله الدقيقة.",
              en: "This pattern began in the 19th century and became one of the most famous symbols of Palestinian embroidery. It requires high skill due to its intricate details.",
              transliteration: "Bada' hadha an-namat fi al-qarn at-tasi' 'ashar...",
            },
          },
        ],
      },
    },
    {
      type: "food",
      content: {
        title: {
          ar: "مأكولات القدس",
          en: "Jerusalem Cuisine",
          transliteration: "Ma'kulat Al-Quds",
        },
        description: {
          ar: "المطبخ المقدسي يجمع بين نكهات الشام وتأثيرات متنوعة",
          en: "Jerusalemite cuisine combines Levantine flavors with diverse influences",
          transliteration: "Al-Matbakh al-Maqdisi yajma' bayna nakahaat ash-Sham...",
        },
        items: [
          {
            id: "jrs-food-1",
            title: {
              ar: "المسخن",
              en: "Musakhan",
              transliteration: "Al-Musakhan",
            },
            description: {
              ar: "خبز الطابون مع الدجاج والسماق والبصل المكرمل وزيت الزيتون. طبق الأعياد والمناسبات.",
              en: "Taboon bread with chicken, sumac, caramelized onions, and olive oil. A dish for celebrations and special occasions.",
              transliteration: "Khubz at-tabun ma' ad-dajaj was-summaq...",
            },
            kidsVersion: {
              ar: "دجاج لذيذ على خبز خاص مع بصل حلو! 🍗",
              en: "Delicious chicken on special bread with sweet onions! 🍗",
              transliteration: "Dajaj ladhidh 'ala khubz khass...",
            },
            deepDiveContent: {
              ar: "المسخن من أقدم الأطباق الفلسطينية. يُعد في فرن الطابون التقليدي. السماق يعطيه نكهته الحامضة المميزة، والبصل يُطهى ببطء حتى يتكرمل.",
              en: "Musakhan is one of the oldest Palestinian dishes. It's prepared in a traditional taboon oven. Sumac gives it its distinctive tangy flavor, and onions are slow-cooked until caramelized.",
              transliteration: "Al-Musakhan min aqdam al-atbaq al-Filastiniyya...",
            },
          },
          {
            id: "jrs-food-2",
            title: {
              ar: "كعك القدس",
              en: "Jerusalem Sesame Bread",
              transliteration: "Ka'k Al-Quds",
            },
            description: {
              ar: "خبز مستدير مغطى بالسمسم، يُباع في أسواق البلدة القديمة منذ قرون.",
              en: "Round bread covered with sesame seeds, sold in Old City markets for centuries.",
              transliteration: "Khubz mustadeer mughatta bis-simsim...",
            },
            kidsVersion: {
              ar: "خبز دائري مقرمش مع الكثير من السمسم! 🥯",
              en: "Crunchy round bread with lots of sesame seeds! 🥯",
              transliteration: "Khubz da'iri muqarmash...",
            },
            deepDiveContent: {
              ar: "كعك القدس يُعد منذ العصر المملوكي. الباعة يحملونه على عربات في شوارع البلدة القديمة. يُؤكل مع الزعتر والزيت أو مع الفلافل.",
              en: "Jerusalem ka'ak has been made since the Mamluk era. Vendors carry it on carts through Old City streets. It's eaten with za'atar and oil or with falafel.",
              transliteration: "Ka'k al-Quds yu'add mundhu al-'asr al-Mamluki...",
            },
          },
        ],
      },
    },
    {
      type: "dialect",
      content: {
        title: {
          ar: "لهجة القدس",
          en: "Jerusalem Dialect",
          transliteration: "Lahjat Al-Quds",
        },
        description: {
          ar: "اللهجة المقدسية تتميز برقتها وتأثرها باللهجات الشامية",
          en: "The Jerusalemite dialect is known for its gentleness and Levantine influences",
          transliteration: "Al-Lahja al-Maqdisiyya tatamayyaz bi-riqqatiha...",
        },
        items: [
          {
            id: "jrs-dial-1",
            title: {
              ar: "شو أخبارك",
              en: "How are you?",
              transliteration: "Shu akhbarak",
            },
            description: {
              ar: "تحية مقدسية شائعة للسؤال عن الحال",
              en: "A common Jerusalemite greeting to ask about wellbeing",
              transliteration: "Tahiyya Maqdisiyya sha'i'a...",
            },
            deepDiveContent: {
              ar: "في القدس، 'شو أخبارك' تُقال بنبرة لطيفة. الرد عادة: 'الحمد لله، كيفك إنت؟'",
              en: "In Jerusalem, 'shu akhbarak' is said with a gentle tone. The reply is usually: 'Alhamdulillah, how are you?'",
              transliteration: "Fi al-Quds, 'shu akhbarak' tuqal bi-nabra latifa...",
            },
            audio: "/audio/dialect/jerusalem/shu-akhbarak.mp3",
          },
          {
            id: "jrs-dial-2",
            title: {
              ar: "يا زلمة",
              en: "Hey man",
              transliteration: "Ya zalame",
            },
            description: {
              ar: "نداء ودي بين الأصدقاء والمعارف",
              en: "A friendly call between friends and acquaintances",
              transliteration: "Nida' wuddi bayna al-asdiqa'...",
            },
            deepDiveContent: {
              ar: "'يا زلمة' من الكلمات المميزة للهجة الفلسطينية عموماً. تُستخدم للنداء أو للتعبير عن الدهشة.",
              en: "'Ya zalame' is a distinctive word in Palestinian dialect in general. It's used as a call or to express surprise.",
              transliteration: "'Ya zalame' min al-kalimat al-mumayyiza...",
            },
            audio: "/audio/dialect/jerusalem/ya-zalame.mp3",
          },
          {
            id: "jrs-dial-3",
            title: {
              ar: "إيش هاد",
              en: "What is this?",
              transliteration: "Eish had",
            },
            description: {
              ar: "سؤال استفهامي عن شيء ما",
              en: "An interrogative question about something",
              transliteration: "Su'al istifhami 'an shay' ma",
            },
            deepDiveContent: {
              ar: "في القدس يُنطق 'إيش' بدلاً من 'شو' في بعض الأحيان، وهي من السمات اللهجوية المقدسية.",
              en: "In Jerusalem, 'eish' is sometimes used instead of 'shu', which is a characteristic of the Jerusalemite dialect.",
              transliteration: "Fi al-Quds yuntaq 'eish' badalan min 'shu'...",
            },
            audio: "/audio/dialect/jerusalem/eish-had.mp3",
          },
        ],
      },
    },
    {
      type: "landmarks",
      content: {
        title: {
          ar: "معالم القدس",
          en: "Jerusalem Landmarks",
          transliteration: "Ma'alim Al-Quds",
        },
        description: {
          ar: "مواقع تاريخية ودينية تحكي قصة المدينة المقدسة",
          en: "Historic and religious sites that tell the story of the Holy City",
          transliteration: "Mawaaqi' tarikhiyya wa-diniyya tahki qissat al-Madina al-Muqaddasa",
        },
        items: [
          {
            id: "jrs-land-1",
            title: {
              ar: "المسجد الأقصى",
              en: "Al-Aqsa Mosque",
              transliteration: "Al-Masjid Al-Aqsa",
            },
            description: {
              ar: "أولى القبلتين وثالث الحرمين الشريفين. يضم مسجد قبة الصخرة والمصلى القبلي.",
              en: "The first qibla and third holiest mosque in Islam. It includes the Dome of the Rock and the Qibli Mosque.",
              transliteration: "Ula al-qiblatayn wa-thalith al-Haramayn ash-Sharifayn...",
            },
            kidsVersion: {
              ar: "المسجد الأقصى مكان مقدس جداً للمسلمين. قبته الذهبية تلمع في الشمس! ☀️",
              en: "Al-Aqsa Mosque is a very holy place for Muslims. Its golden dome shines in the sun! ☀️",
              transliteration: "Al-Masjid al-Aqsa makan muqaddas jiddan...",
            },
            deepDiveContent: {
              ar: "المسجد الأقصى بُني في عهد الخليفة الأموي عبد الملك بن مروان. مساحته 144 دونماً ويضم عدة مبانٍ وقباب. قبة الصخرة بُنيت عام 691م وتعد تحفة معمارية إسلامية.",
              en: "Al-Aqsa Mosque was built during the reign of Umayyad Caliph Abd al-Malik ibn Marwan. Its area is 144 dunams and includes several buildings and domes. The Dome of the Rock was built in 691 CE and is considered an Islamic architectural masterpiece.",
              transliteration: "Al-Masjid al-Aqsa buniya fi 'ahd al-Khalifa al-Umawi...",
            },
          },
          {
            id: "jrs-land-2",
            title: {
              ar: "كنيسة القيامة",
              en: "Church of the Holy Sepulchre",
              transliteration: "Kanisat Al-Qiyama",
            },
            description: {
              ar: "أقدس موقع مسيحي في العالم. تقع في قلب البلدة القديمة وتضم موقع الصلب والقبر المقدس.",
              en: "The holiest Christian site in the world. Located in the heart of the Old City, it contains the site of crucifixion and the Holy Tomb.",
              transliteration: "Aqdas mawqi' Masihi fi al-'alam...",
            },
            kidsVersion: {
              ar: "كنيسة القيامة مكان مهم جداً للمسيحيين من كل أنحاء العالم! ⛪",
              en: "Church of the Holy Sepulchre is a very important place for Christians from all over the world! ⛪",
              transliteration: "Kanisat al-Qiyama makan muhimm jiddan lil-Masihiyyin...",
            },
            deepDiveContent: {
              ar: "بُنيت الكنيسة الأولى في عهد الإمبراطور قسطنطين عام 335م. دُمرت وأُعيد بناؤها عدة مرات. ست طوائف مسيحية تتشارك إدارتها وفق اتفاقية 'الوضع الراهن' منذ 1852.",
              en: "The original church was built during Emperor Constantine's reign in 335 CE. It was destroyed and rebuilt several times. Six Christian denominations share its administration according to the 'Status Quo' agreement since 1852.",
              transliteration: "Buniyat al-kanisa al-ula fi 'ahd al-Imbaratur Qustantin...",
            },
          },
        ],
      },
    },
    {
      type: "sayings",
      content: {
        title: {
          ar: "أمثال مقدسية",
          en: "Jerusalemite Proverbs",
          transliteration: "Amthal Maqdisiyya",
        },
        description: {
          ar: "حكم وأمثال توارثها أهل القدس عبر الأجيال",
          en: "Wisdom and proverbs passed down by Jerusalemites through generations",
          transliteration: "Hikam wa-amthal tawarathaha ahl al-Quds...",
        },
        items: [
          {
            id: "jrs-say-1",
            title: {
              ar: "القدس بتضل قدس",
              en: "Jerusalem remains Jerusalem",
              transliteration: "Al-Quds btidall Quds",
            },
            description: {
              ar: "مهما تغيرت الأحوال، تبقى القدس عاصمة فلسطين الأبدية",
              en: "No matter how circumstances change, Jerusalem remains Palestine's eternal capital",
              transliteration: "Mahma taghayyarat al-ahwal, tabqa al-Quds...",
            },
            deepDiveContent: {
              ar: "يُقال هذا المثل للتأكيد على الهوية الفلسطينية للقدس وارتباطها الروحي والتاريخي بشعبها",
              en: "This saying is used to affirm Jerusalem's Palestinian identity and its spiritual and historical connection to its people",
              transliteration: "Yuqal hadha al-mathal lit-ta'kid 'ala al-huwiyya...",
            },
          },
          {
            id: "jrs-say-2",
            title: {
              ar: "اللي بيزرع بيحصد",
              en: "Who sows, reaps",
              transliteration: "Illi bizra' biyuhsud",
            },
            description: {
              ar: "العمل الجاد يؤتي ثماره، والصبر مفتاح الفرج",
              en: "Hard work bears fruit, and patience is the key to relief",
              transliteration: "Al-'amal al-jadd yu'ti thamarahu...",
            },
            deepDiveContent: {
              ar: "مثل فلسطيني شائع يحث على العمل والاجتهاد. يُستخدم لتشجيع الشباب والتأكيد على قيمة الصبر.",
              en: "A common Palestinian proverb encouraging work and diligence. Used to motivate youth and emphasize the value of patience.",
              transliteration: "Mathal Filastini sha'i' yahuth 'ala al-'amal...",
            },
          },
        ],
      },
    },
    {
      type: "famous_people",
      content: {
        title: {
          ar: "شخصيات مقدسية",
          en: "Jerusalemite Figures",
          transliteration: "Shakhsiyyat Maqdisiyya",
        },
        description: {
          ar: "أبناء القدس الذين تركوا بصمة في التاريخ والثقافة",
          en: "Sons and daughters of Jerusalem who left a mark on history and culture",
          transliteration: "Abna' al-Quds alladhina taraku basma...",
        },
        items: [
          {
            id: "jrs-fam-1",
            title: {
              ar: "إدوارد سعيد",
              en: "Edward Said",
              transliteration: "Edward Said",
            },
            description: {
              ar: "مفكر ومنظر أدبي فلسطيني-أمريكي، مؤلف كتاب 'الاستشراق'",
              en: "Palestinian-American intellectual and literary theorist, author of 'Orientalism'",
              transliteration: "Mufakkir wa-munathir adabi Filastini-Amriki...",
            },
            kidsVersion: {
              ar: "كاتب مشهور من القدس علّم الناس عن الثقافة العربية! 📚",
              en: "A famous writer from Jerusalem who taught people about Arab culture! 📚",
              transliteration: "Katib mashhur min al-Quds...",
            },
            deepDiveContent: {
              ar: "وُلد إدوارد سعيد في القدس عام 1935. كتابه 'الاستشراق' (1978) غيّر الدراسات الأكاديمية حول الشرق. كان مدافعاً عن القضية الفلسطينية وعضواً في المجلس الوطني الفلسطيني.",
              en: "Edward Said was born in Jerusalem in 1935. His book 'Orientalism' (1978) transformed academic studies about the East. He was an advocate for the Palestinian cause and a member of the Palestinian National Council.",
              transliteration: "Wulida Edward Said fi al-Quds 'aam 1935...",
            },
          },
          {
            id: "jrs-fam-2",
            title: {
              ar: "الحاج أمين الحسيني",
              en: "Haj Amin al-Husseini",
              transliteration: "Al-Hajj Amin al-Husayni",
            },
            description: {
              ar: "مفتي القدس ورئيس المجلس الإسلامي الأعلى، قاد المقاومة في الثلاثينيات",
              en: "Grand Mufti of Jerusalem and head of the Supreme Muslim Council, led resistance in the 1930s",
              transliteration: "Mufti al-Quds wa-ra'is al-Majlis al-Islami al-A'la...",
            },
            kidsVersion: {
              ar: "قائد ديني مهم دافع عن القدس وفلسطين! 🕌",
              en: "An important religious leader who defended Jerusalem and Palestine! 🕌",
              transliteration: "Qa'id dini muhimm dafa'a 'an al-Quds wa-Filastin...",
            },
            deepDiveContent: {
              ar: "عُيّن مفتياً للقدس عام 1921. قاد ثورة 1936-1939 ضد الانتداب البريطاني والهجرة الصهيونية. شخصية مثيرة للجدل بسبب مواقفه خلال الحرب العالمية الثانية.",
              en: "Appointed Grand Mufti of Jerusalem in 1921. He led the 1936-1939 revolt against British Mandate and Zionist immigration. A controversial figure due to his positions during World War II.",
              transliteration: "'Uyyin Muftian lil-Quds 'aam 1921...",
            },
          },
        ],
      },
    },
    {
      type: "before_after",
      content: {
        title: {
          ar: "القدس قبل وبعد",
          en: "Jerusalem Then and Now",
          transliteration: "Al-Quds Qabl wa-Ba'd",
        },
        description: {
          ar: "شاهد كيف تغيرت المدينة المقدسة عبر العقود",
          en: "See how the Holy City has changed over the decades",
          transliteration: "Shahid kayfa taghayyarat al-Madina al-Muqaddasa...",
        },
        items: [
          {
            id: "jrs-ba-1",
            title: {
              ar: "حي القطمون",
              en: "Qatamon Neighborhood",
              transliteration: "Hayy al-Qatamon",
            },
            description: {
              ar: "كان حياً راقياً سكنته العائلات المقدسية الثرية. هُجّر سكانه عام 1948.",
              en: "Was an upscale neighborhood inhabited by wealthy Jerusalemite families. Its residents were displaced in 1948.",
              transliteration: "Kana hayyan raqiyan sakanahu al-'a'ilat al-Maqdisiyya ath-thariyya...",
            },
            kidsVersion: {
              ar: "كان حياً جميلاً فيه بيوت كبيرة وحدائق. الناس اضطروا لتركه.",
              en: "It was a beautiful neighborhood with big houses and gardens. People had to leave it.",
              transliteration: "Kana hayyan jamilan fihi buyut kabira...",
            },
            deepDiveContent: {
              ar: "القطمون كان من أرقى أحياء القدس، سكنته عائلات مثل الناشاشيبي والخالدي والداودي. كان فيه مدارس ومستشفيات ودور سينما. بعد 1948، حوّلته إسرائيل إلى حي يهودي يُسمى 'غونين'.",
              en: "Qatamon was one of Jerusalem's most upscale neighborhoods, inhabited by families like the Nashashibis, Khalidis, and Daoudis. It had schools, hospitals, and cinemas. After 1948, Israel converted it into a Jewish neighborhood called 'Gonen'.",
              transliteration: "Al-Qatamon kana min arqa ahya' al-Quds...",
            },
          },
          {
            id: "jrs-ba-2",
            title: {
              ar: "باب العامود",
              en: "Damascus Gate",
              transliteration: "Bab al-'Amud",
            },
            description: {
              ar: "أجمل بوابات البلدة القديمة وأكثرها حيوية. لا يزال نابضاً بالحياة رغم القيود.",
              en: "The most beautiful and vibrant gate of the Old City. Still bustling with life despite restrictions.",
              transliteration: "Ajmal bawwabat al-Balda al-Qadima...",
            },
            kidsVersion: {
              ar: "بوابة كبيرة وجميلة يمر منها الناس كل يوم للذهاب للسوق! 🚪",
              en: "A big beautiful gate where people pass every day to go to the market! 🚪",
              transliteration: "Bawwaba kabira wa-jamila yamurr minha an-nas kull yawm...",
            },
            deepDiveContent: {
              ar: "بُني باب العامود في عهد السلطان سليمان القانوني عام 1537. كان في العصر الروماني يقف عمود ضخم أمامه، ومنه جاء اسمه. اليوم، المنطقة أمامه تشهد توترات متكررة بسبب قيود الاحتلال على التجمعات.",
              en: "Damascus Gate was built during Sultan Suleiman the Magnificent's reign in 1537. In Roman times, a huge column stood before it, hence its name. Today, the area in front of it witnesses frequent tensions due to occupation restrictions on gatherings.",
              transliteration: "Buniya Bab al-'Amud fi 'ahd as-Sultan Sulayman al-Qanuni...",
            },
          },
        ],
      },
    },
  ],
};
