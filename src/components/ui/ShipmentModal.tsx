import React, { useState } from "react";
import { CheckCircle2, Leaf, X } from "lucide-react";

interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  herbName?: string;
}

export const ShipmentModal: React.FC<ShipmentModalProps> = ({ isOpen, onClose, herbName = "Đinh lăng" }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#FDFBF9] rounded-2xl border border-[#E6DDD0] shadow-2xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 text-[#B85037]">
              <Leaf className="w-6 h-6" />
              <span className="font-sans font-bold text-xs tracking-wider uppercase">Đối tác VIETMEC</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#4F433A] tracking-tight">
                Gửi thông tin lô hàng thu mua
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Kết nối trực tiếp đến phòng thu mua của <strong className="text-[#B85037]">VIETMEC</strong>. Chuyên viên sẽ gọi lại định giá và khảo sát trong 24h.
              </p>
            </div>

            <div className="bg-[#F5ECE1] p-3 rounded-lg border border-[#E6DDD0] text-sm text-[#4F433A] font-sans">
              Dược liệu cần bán: <strong className="text-[#B85037]">{herbName}</strong>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                  Họ và tên người liên hệ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0912345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                    Sản lượng dự kiến
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 500kg, 2 tấn"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                  Vùng trồng / Địa chỉ ruộng vườn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Huyện Hải Hậu, Nam Định"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                  Mô tả tình trạng (Độ tuổi củ, độ ẩm, cách sấy...)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Đinh lăng nếp 4 năm tuổi, đã băm nhỏ phơi ráo ẩm khoảng 13%, hàng có sẵn tại kho..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 border border-[#E6DDD0] rounded-lg text-[#4F433A] hover:bg-gray-100 transition-colors font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-[#B85037] hover:bg-[#9F3E28] text-white rounded-lg transition-colors font-bold shadow-md"
              >
                Gửi thông tin ngay
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#4F433A]">
              Gửi thông tin thành công!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Cảm ơn bà con <strong className="text-[#4F433A]">{fullName}</strong> ({phone}). Thông tin lô hàng <strong className="text-[#B85037]">{herbName}</strong> đã được gửi thẳng tới bộ phận thu mua của <strong className="text-[#B85037]">VIETMEC</strong>.
            </p>
            <p className="text-sm text-gray-500 italic">
              Chuyên viên kỹ thuật khu vực sẽ chủ động liên hệ hỗ trợ báo giá chính xác nhất trong vài giờ tới.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-[#B85037] hover:bg-[#9F3E28] text-white rounded-lg transition-colors font-semibold shadow-xs"
            >
              Đóng cửa sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
