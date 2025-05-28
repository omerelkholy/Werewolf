import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { GiScrollUnfurled } from 'react-icons/gi';

export function HowToPlay({ onClose }) {
  const [lang, setLang] = useState('en');
  const [isClosing, setIsClosing] = useState(false);

  const instructions = {
    en: `Welcome to Howling Hollow village...
    
    - Night log password: moonlight (use it wisely)
    - The minimum number of players is 6 .
    - Roles get assigned for each player secretly and randomly, don't show and let anyone know your role.
    - Perform your action, know your role and what you should do through the game and the result of your actions.
    - The day discussion starts and everyone should discuss what happened through the night.
    - You vote for a play that you decided to eliminate
    - Villagers win if a Werewolf is caught. Werewolves win if they survive!

    Use your logic, trust no one and try to find the truth... or not?.`,

    ar: `...أهلاً بيك في قرية المستذئب الشقي

    باسورد اللوجز: moonlight.
    .أقل عدد للعب 6 أفراد
    .الأدوار بتتوزع عليكو بشكل عشوائي وبسرية. اعرف دورك وماتعرفش حد
    .بتقدر تشوف أنت بقيت ايه في الراوند وتقدر تعمل ايه في الراوند
    بعد ماكله بيعمل الأكشنز بتاعته وبيعرف دوره في اللعبة بيبدأ النهار وبتحاولو تكتشفو مين هو المستذئب في اللعبة وطبعا لو أنت من تيم المستذئبين بتحاول تضلل اللعيبة
    .بتصوتو علي اللاعب اللي متوقعين انه المستذئب
    بتكتشفو بعدها كل واحد كان دوره ايه وبقي دوره ايه ولو اللي اختارتوه كان مستذئب تيم الفلاحين يكسب ولو مش مستذئب تيم المستذئبين هو اللي حط عليكو

    شغل دماغك. ماتثقش في حد. حاول تعرف الحقيقة...  أو لا؟ وماتنساش تصلي علي النبي :)`
  };

  const roleOrder = {
    en: `Werewolf → Minion → Mason → Sentinel → Clone → MysticWolf → Seer → Robber → TroubleMaker → Witch → Drunk → Insomniac → Joker → DreamWolf`,

    ar: `مستذئب ← التابع ← المايسونز ← المدافع ← المستنسخ ← المستذئب المشعوذ ← عرفة الشواف ← الحرامي ← بتاع المشاكل ← الدجالة ← الخمورجي ← أبو أرق ← الكلاون ← مستذئب الاحلام
`
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -50,
      transition: {
        duration: 0.5
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={handleClose}
          key="modal-backdrop"
        >
          <motion.div
            className="relative w-11/12 max-w-xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={scrollVariants}
            onClick={(e) => e.stopPropagation()}
            key="modal-content"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-amber-800 text-5xl">
              <GiScrollUnfurled />
            </div>

            <div
              className="bg-[#f8e9c1] border-4 border-amber-900/40 text-amber-950 rounded-xl shadow-2xl w-full p-8 pt-10 relative font-[Cardo] overflow-y-auto max-h-[80vh]"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/parchment.png")',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)'
              }}
            >
              <motion.button
                onClick={handleClose}
                className="absolute top-2 right-3 text-3xl text-red-800 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <IoClose />
              </motion.button>

              <div className="flex justify-end gap-2 mb-4">
                <motion.button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-md border-2 ${lang === 'en'
                    ? 'bg-amber-700 text-amber-50 border-amber-800'
                    : 'bg-amber-100 text-amber-900 border-amber-300'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  English
                </motion.button>
                <motion.button
                  onClick={() => setLang('ar')}
                  className={`px-3 py-1 rounded-md border-2 ${lang === 'ar'
                    ? 'bg-amber-700 text-amber-50 border-amber-800'
                    : 'bg-amber-100 text-amber-900 border-amber-300'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  العربية
                </motion.button>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-center font-[Cinzel] text-amber-900 border-b-2 border-amber-800/30 pb-2">
                {lang === 'en' ? 'How to Play' : 'بتتلعب ازاي'}
              </h2>

              <motion.p
                className={`whitespace-pre-line text-lg ${lang === 'ar' ? 'text-right' : ''} leading-relaxed`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {instructions[lang]}
              </motion.p>

              <h2 className="text-3xl mt-3 font-bold mb-6 text-center font-[Cinzel] text-amber-900 border-b-2 border-amber-800/30 pb-2">
                {lang === 'en' ? 'Role Order of the game' : 'ترتيب الأدوار في اللعبة'}
              </h2>
              <motion.p
                className={`whitespace-pre-line text-lg ${lang === 'ar' ? 'text-right' : ''} leading-relaxed`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {roleOrder[lang]}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}