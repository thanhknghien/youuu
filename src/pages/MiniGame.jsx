import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function MiniGame() {
  const [score, setScore] = useState(0);
  const [emojis, setEmojis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojis((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * (window.innerWidth - 50),
          y: Math.random() * (window.innerHeight - 50),
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEmojiClick = (id) => {
    setScore(score + 1);
    setEmojis(emojis.filter((emoji) => emoji.id !== id));
    if (score + 1 >= 10) {
      setTimeout(() => navigate('/gift'), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 relative overflow-hidden">
      <div className="absolute top-4 left-4 text-2xl font-poppins text-pink-600">
        DUNG LAM TRAI TIM A DAU :)))
        Điểm: {score}
      </div>
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute text-4xl cursor-pointer"
          style={{ left: emoji.x, top: emoji.y }}
          onClick={() => handleEmojiClick(emoji.id)}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          ❤️
        </motion.div>
      ))}
      {score >= 10 && (
        <div className="absolute inset-0 flex items-center justify-center bg-pink-500 bg-opacity-75">
          <h2 className="text-3xl font-poppins text-white">
            Bạn đã mở được quà bí mật! 🎉
          </h2>
        </div>
      )}
    </div>
  );
}

export default MiniGame;