import { useNavigate } from 'react-router-dom';

function MessagePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-poppins text-pink-600">
          Gửi Bạn!
        </h2>
        <p className="text-gray-700 my-4">
          Cảm ơn vì đã xem! Rốt cuộc Page này Thành làm ra chi để test! =)))
        </p>
        <img
          src="/chibi-friend.jpg"
          alt="Funny Cat"
          className="w-40 mx-auto my-4"
        />
        <button
          onClick={() => navigate('/game')}
          className="bg-mint-500 text-white py-2 px-4 rounded-full hover:bg-mint-600"
        >
          Tiếp Tục Khám Phá!
        </button>
      </div>
    </div>
  );
}

export default MessagePage;