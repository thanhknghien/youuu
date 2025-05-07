function FinalGift() {
  const shareGift = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hộp Quà Siêu Xịn!',
        text: 'Xem món quà đặc biệt mình làm cho bạn nhé!',
        url: window.location.href,
      });
    } else {
      alert('Chia sẻ bằng cách sao chép link nhé!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-200 to-pink-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-poppins text-pink-600 text-center">
        Món Quà Bí Mật! 🎁
      </h1>
      <img
        src="/memory-photo.jpg"
        alt="Memory"
        className="w-64 rounded-2xl my-6 shadow-lg"
      />
      <p className="text-center text-gray-700 max-w-md">
        Hy vọng bạn thích món quà này! Tụi mình sẽ còn nhiều kỷ niệm nữa nhé! 😽
      </p>
      <button
        onClick={shareGift}
        className="bg-pink-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-pink-600"
      >
        Chia Sẻ Niềm Vui!
      </button>
    </div>
  );
}

export default FinalGift;