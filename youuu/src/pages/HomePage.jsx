import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

function HomePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleOpenGift = () => {
    setShowConfetti(true);
    setTimeout(() => navigate('/message'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-mint-200 flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-poppins text-center text-pink-600 animate-bounce mb-6">
        Hộp Quà Siêu Xịn Cho Bạn!
      </h1>
      <video
        src="/yapping-cat.mp4"
        alt="Funny Yapping Cat"
        className="w-full max-w-md my-6"
        autoPlay
        loop
        playsInline
      />
      <button
        onClick={handleOpenGift}
        className="bg-pink-500 text-white text-lg font-poppins py-3 px-6 rounded-full hover:scale-110 transition-transform"
      >
        Mở Quà Ngay!
      </button>
    </div>
  );
}

export default HomePage;