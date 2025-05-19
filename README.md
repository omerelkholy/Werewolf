# 🐺 Werewolf: The Ultimate Night

**Werewolf: The Ultimate Night** is a party-style social deduction game built with React and Vite. Play locally or share a device with friends — bluff, deduce, and survive the night!

> ⚔️ *"Trust no one. Reveal everything. Only the cunning survive the night."*

---

## 🚀 Live Demo
**Play here:** [https://werewolf-nu.vercel.app/](https://werewolf-nu.vercel.app/)

---

## 🎮 Game Features

- 🧠 **Role-Based Gameplay**: Each player gets a secret role with unique night actions.
- 🌙 **Night Phase Logic**: All roles act in a specific sequence with proper resolution.
- 🗳️ **Voting Phase**: Discuss, accuse, and vote to eliminate a suspect.
- 📜 **Final Reveal**: See what happened at night and who truly won.

---

## 🧩 Implemented Roles

| Team        | Roles                                                                 |
|-------------|-----------------------------------------------------------------------|
| Werewolf    | `Werewolf`, `Minion`, `DreamWolf`, `MysticWolf`                      |
| Village     | `Mason`, `Sentinel`, `Seer`, `Robber`, `TroubleMaker`, `Insomniac`   |
| Chaos       | `Drunk`, `Witch`, `Clone`, `Joker`                                   |

---

## 🛠️ Tech Stack

- ⚡ [Vite](https://vitejs.dev/) for fast development
- ⚛️ [React](https://reactjs.org/) for UI
- 🎨 [Tailwind CSS](https://tailwindcss.com/) for styling
- 💡 State-based phase system for game logic
- 🔄 Modular component design for each role


---

## 🧪 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/omerelkholy/Werewolf.git

# Navigate to the project
cd Werewolf

# Install dependencies
npm install

# Start the dev server
npm run dev