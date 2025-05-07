import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomImageGame() {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  const targetScore = 10;
  const navigate = useNavigate();
  const playerImage = "/mewmew.jpg";

  const itemImages = [
    "/item1.jpg",
    "/item2.jpg",
    "/item3.jpg",
    "/item4.jpg",
  ];
  
  const navigateToGift = () => {
    navigate('/gift');
  };
  
  // Tạo vật phẩm mới theo thời gian
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;
      
      setItems((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * 90,
          y: -10,
          imageIndex: Math.floor(Math.random() * itemImages.length), 
          rotation: Math.random() * 360, 
          scale: 0.8 + Math.random() * 0.4, 
        },
      ]);
    }, 800);
    
    return () => clearInterval(interval);
  }, [gameOver]);
  
  useEffect(() => {
    if (gameOver) return;
    
    const gameLoop = setInterval(() => {
      setItems((prevItems) => {
        return prevItems
          .map((item) => {
            // Kiểm tra va chạm với người chơi
            if (
              item.y > 75 && 
              item.y < 90 && 
              item.x > playerPosition - 12 && 
              item.x < playerPosition + 12
            ) {
              // Tăng điểm khi bắt được vật phẩm
              setScore((prevScore) => prevScore + 1);
              return null; // Loại bỏ vật phẩm đã bắt được
            }
            
            // Di chuyển vật phẩm xuống
            return {
              ...item,
              y: item.y + 2,
            };
          })
          .filter((item) => item !== null && item.y < 100); // Loại bỏ vật phẩm đã ra khỏi màn hình
      });
    }, 50);
    
    return () => clearInterval(gameLoop);
  }, [playerPosition, gameOver]);
  
  // Kiểm tra điều kiện chiến thắng
  useEffect(() => {
    if (score >= targetScore) {
      setGameOver(true);
    }
  }, [score]);
  
  // Di chuyển người chơi theo chuột/cảm ứng
  const handlePointerMove = (e) => {
    if (gameOver) return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const position = ((e.clientX - container.left) / container.width) * 100;
    setPlayerPosition(Math.min(Math.max(10, position), 90));
  };
  
  // Xử lý chạm màn hình cho thiết bị di động
  const handleTouch = (e) => {
    if (gameOver) return;
    
    const touch = e.touches[0];
    const container = e.currentTarget.getBoundingClientRect();
    const position = ((touch.clientX - container.left) / container.width) * 100;
    setPlayerPosition(Math.min(Math.max(10, position), 90));
  };
  
  // Di chuyển người chơi bằng phím mũi tên
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        setPlayerPosition((prev) => Math.max(10, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerPosition((prev) => Math.min(90, prev + 5));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);
  
  const resetGame = () => {
    setScore(0);
    setItems([]);
    setPlayerPosition(50);
    setGameOver(false);
  };
  
  // Xử lý lỗi ảnh
  const handleImageError = (e) => {
    // Thay thế bằng ảnh mặc định nếu không tìm thấy ảnh
    e.target.src = "/api/placeholder/100/100";
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-100 p-4">
      <div className="mb-4 text-xl md:text-2xl text-center font-bold text-blue-800">
        Điểm: {score}/{targetScore}
      </div>
      
      <div 
        className="relative w-full h-64 sm:h-80 md:h-96 max-w-xs sm:max-w-md md:max-w-lg bg-gradient-to-b from-blue-300 to-blue-100 border-4 border-blue-500 rounded-lg overflow-hidden"
        onMouseMove={handlePointerMove}
        onTouchMove={handleTouch}
      >
        {/* Các vật phẩm rơi */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            style={{ 
              left: `${item.x}%`, 
              top: `${item.y}%`, 
              transform: `rotate(${item.rotation}deg) scale(${item.scale})` 
            }}
          >
            <img 
              src={itemImages[item.imageIndex]} 
              alt="Item" 
              className="w-full h-full object-contain"
              onError={handleImageError}
            />
          </div>
        ))}
        
        {/* Người chơi */}
        <div
          className="absolute w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bottom-1"
          style={{ left: `${playerPosition}%`, transform: 'translateX(-50%)' }}
        >
          <img 
            src={playerImage} 
            alt="Player" 
            className="w-full h-full object-cover rounded-full border-2 border-white"
            onError={handleImageError}
          />
        </div>
        
        {/* Màn hình chiến thắng */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-500 bg-opacity-75 z-10 p-4">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 text-center">
              Chúc mừng bé iu đã hàn thành!
            </div>
            <div className="text-base sm:text-lg md:text-xl text-white mb-4 sm:mb-5 md:mb-6 text-center">
              EIU đã nhặt đủ {targetScore} vật phẩm!
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={navigateToGift}
                className="px-4 sm:px-5 md:px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base md:text-lg font-medium"
              >
                Mời Eiu nhận phần quà to bự!
              </button>
              <button
                onClick={resetGame}
                className="px-4 sm:px-5 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base md:text-lg"
              >
                HOk chịu bé chơi lại!
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-gray-700 text-sm sm:text-base">
        <p>Hãy nhặt {targetScore} vật phẩm để nhận quà!</p>
      </div>
      
    </div>
  );
}