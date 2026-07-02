import { HerbalMedicine, RegionData, WikiArticle, WikiHub } from "../types";

export const SITE_OWNER = "Nguyễn Việt Lộc";
export const OWNER_EMAIL = "lien-he@nguyenvietloc.com";
export const OWNER_URL = "nguyenvietloc.com";
export const PARTNER_COMPANY = {
  name: "VIETMEC",
  fullName: "Công ty Cổ phần Dược liệu Việt Nam (VIETMEC)",
  stockCode: "Mã DVM (HNX)",
  facility: "Nhà máy GMP-WHO Phú Ninh, Phú Thọ",
  experience: "Hơn 15 năm kinh nghiệm hoạt động trong ngành dược liệu",
  desc: "VIETMEC là đơn vị hàng đầu Việt Nam sở hữu chuỗi liên kết bền vững từ vùng trồng đạt chuẩn GACP-WHO đến nhà máy chế biến quy mô hiện đại, cam kết bao tiêu đầu ra lâu dài cho bà con.",
  bullets: [
    "Cam kết bao tiêu sản phẩm bằng hợp đồng dài hạn với giá ổn định.",
    "Hỗ trợ giống đạt chuẩn, kỹ thuật canh tác và quy trình thu hoạch tối ưu dược tính.",
    "Hệ thống nhà máy GMP-WHO đạt chuẩn xuất khẩu Châu Âu, xử lý sấy lạnh khép kín.",
    "Hỗ trợ nông dân và hợp tác xã tiếp cận nguồn vốn hỗ trợ nông nghiệp bền vững."
  ]
};

export const HERBS_DATA: HerbalMedicine[] = [
  {
    id: "dinh-lang",
    slug: "dinh-lang",
    name: "Đinh lăng",
    scientificName: "Polyscias fruticosa",
    priceRange: "35.000 - 180.000 VNĐ/kg",
    shortDesc: "Được ví như 'nhân sâm của người nghèo'. Thu hoạch toàn bộ từ lá, thân đến rễ củ từ 3 năm tuổi trở lên.",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=600&auto=format&fit=crop",
    description: "Cây Đinh lăng nếp (lá nhỏ) là loại dược liệu truyền thống cực kỳ phổ biến tại Việt Nam. Toàn bộ các bộ phận của cây đều có giá trị sử dụng và thu mua. Đặc biệt, rễ củ Đinh lăng từ 3 - 5 năm tuổi trở lên chứa lượng saponin cao tương tự nhân sâm, rất được thị trường ưa chuộng.",
    stats: [
      { label: "Thời gian thu hoạch", value: "3 - 5 năm (đối với rễ củ)" },
      { label: "Đất trồng thích hợp", value: "Đất cát pha, đất thịt nhẹ, thoát nước tốt" },
      { label: "Bộ phận thu hoạch", value: "Rễ củ, thân cành, lá khô" },
      { label: "Nhiệt độ lý tưởng", value: "22°C - 35°C" }
    ],
    prices: [
      { grade: "Rễ củ Loại 1", specification: "Củ đạt trọng lượng >1.5kg, trên 5 năm tuổi, không nấm mốc", priceRange: "140.000 - 180.000", unit: "kg", trend: "up" },
      { grade: "Rễ củ Loại 2", specification: "Củ nặng từ 0.8kg - 1.5kg, từ 3-4 năm tuổi", priceRange: "85.000 - 120.000", unit: "kg", trend: "stable" },
      { grade: "Thân cành già", specification: "Cắt khúc 3-5cm, phơi khô đạt độ ẩm <12%", priceRange: "35.000 - 45.000", unit: "kg", trend: "up" },
      { grade: "Lá Đinh lăng khô", specification: "Phơi khô tự nhiên hoặc sấy sạch, thơm, không lẫn tạp chất", priceRange: "25.000 - 32.000", unit: "kg", trend: "stable" }
    ],
    regions: [
      { regionSlug: "dong-bac", regionName: "Đông Bắc", provinces: ["Phú Thọ", "Tuyên Quang"], outputEstimate: "450 tấn/năm" },
      { regionSlug: "tay-bac", regionName: "Tây Bắc", provinces: ["Sơn La", "Hòa Bình"], outputEstimate: "300 tấn/năm" },
      { regionSlug: "dong-bang-song-hong", regionName: "Đồng bằng Sông Hồng", provinces: ["Nam Định", "Thái Bình"], outputEstimate: "800 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-dinh-lang",
    standards: [
      "Không chứa dư lượng thuốc bảo vệ thực vật hóa học (đạt chuẩn GACP-WHO).",
      "Độ ẩm dược liệu khô phải dưới 12% để tránh nấm mốc phát triển.",
      "Rễ củ không bị thối hỏng ruột, giữ nguyên vẹn vỏ củ ngoài.",
      "Lá khô giữ nguyên màu xanh nhạt hoặc vàng cỏ úa, không bị đen sẫm."
    ],
    faq: [
      { question: "Nên bán Đinh lăng tươi hay phơi khô thì có giá hơn?", answer: "Thông thường, rễ củ kích thước lớn (>1.5kg) nên bán tươi cho các đơn vị làm quà tặng hoặc ngâm rượu sẽ được giá cao hơn. Ngược lại, thân cành và lá nên phơi sấy khô theo quy chuẩn độ ẩm <12% để bán số lượng lớn cho các nhà máy chiết xuất dược liệu của VIETMEC." },
      { question: "Thời gian thu hoạch Đinh lăng tối ưu nhất là khi nào?", answer: "Để thu hoạch rễ củ chất lượng tốt nhất, bà con nên thu hoạch vào cuối thu hoặc mùa đông (từ tháng 10 đến tháng 12). Lúc này cây ngừng sinh trưởng mạnh, chất dinh dưỡng tích tụ đậm đặc nhất tại phần rễ củ." }
    ]
  },
  {
    id: "ba-kich",
    slug: "ba-kich",
    name: "Ba kích",
    scientificName: "Morinda officinalis",
    priceRange: "120.000 - 320.000 VNĐ/kg",
    shortDesc: "Dây leo bằng thân quấn, rễ phình lớn thành củ thắt chuỗi. Ưa bóng râm dưới tán rừng tự nhiên.",
    image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=600&auto=format&fit=crop",
    description: "Ba kích tím là loại thảo dược quý hiếm nổi tiếng với công dụng bổ thận tráng dương, tăng cường sinh lực. Cây phát triển tốt dưới tán rừng ẩm đồi núi phía Bắc, cần thời gian canh tác ít nhất 3-5 năm để củ tích tụ đủ dược tính hoạt chất anthraglycosid quý.",
    stats: [
      { label: "Thời gian thu hoạch", value: "3 - 4 năm trồng từ bầu cây giống" },
      { label: "Đất trồng thích hợp", value: "Đất đồi núi xốp, nhiều mùn rừng, thoát nước cực tốt" },
      { label: "Bộ phận thu hoạch", value: "Rễ củ (đã bỏ lõi khi chế biến sâu)" },
      { label: "Nhiệt độ lý tưởng", value: "18°C - 28°C" }
    ],
    prices: [
      { grade: "Ba kích tươi Loại 1", specification: "Củ to, đường kính củ >1.5cm, thắt chuỗi đều, trồng trên 4 năm", priceRange: "260.000 - 320.000", unit: "kg", trend: "up" },
      { grade: "Ba kích tươi Loại 2", specification: "Đường kính củ từ 0.8 - 1.2cm, từ 3 năm tuổi", priceRange: "180.000 - 240.000", unit: "kg", trend: "stable" },
      { grade: "Củ khô rút lõi", specification: "Sấy sạch, rút bỏ phần lõi gỗ cứng bên trong, độ ẩm <11%", priceRange: "550.000 - 680.000", unit: "kg", trend: "up" }
    ],
    regions: [
      { regionSlug: "dong-bac", regionName: "Đông Bắc", provinces: ["Quảng Ninh", "Bắc Giang"], outputEstimate: "180 tấn/năm" },
      { regionSlug: "tay-bac", regionName: "Tây Bắc", provinces: ["Yên Bái", "Lào Cai"], outputEstimate: "120 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-ba-kich",
    standards: [
      "Độ ẩm sản phẩm khô dưới 12%, không mốc xanh mốc đỏ.",
      "Kích thước củ đều, không dập nát, không lẫn bùn đất.",
      "Để đạt giá trị cao nhất cho dược phẩm, củ Ba kích cần được bóc tách rút phần lõi gỗ bên trong trước khi sấy khô."
    ],
    faq: [
      { question: "Tại sao phải bỏ lõi Ba kích trước khi sử dụng?", answer: "Lõi của củ Ba kích không chứa hoạt chất bổ dưỡng mà ngược lại chứa một số độc chất nhẹ có thể gây kích ứng tim mạch và làm giảm chất lượng thuốc sấy khô. Do đó, tất cả các đơn vị thu mua lớn như VIETMEC đều yêu cầu hoặc ưu tiên mua củ đã rút lõi." }
    ]
  },
  {
    id: "ha-thu-o",
    slug: "ha-thu-o",
    name: "Hà thủ ô đỏ",
    scientificName: "Fallopia multiflora",
    priceRange: "90.000 - 250.000 VNĐ/kg",
    shortDesc: "Dây leo cuốn sống lâu năm, nổi tiếng với công dụng làm đen tóc, bổ huyết, đẹp da.",
    image: "https://images.unsplash.com/photo-1622219808011-8be9426f00db?q=80&w=600&auto=format&fit=crop",
    description: "Hà thủ ô đỏ là loại thảo dược mọc hoang rải rác khắp vùng núi phía Bắc và hiện nay đang được phát triển mạnh thành vùng trồng chuyên canh rộng lớn tại Hà Giang, Sơn La. Trồng Hà thủ ô đỏ đòi hỏi giàn leo vững chắc và thời gian từ 3 đến 5 năm để có chất lượng củ nặng nhất.",
    stats: [
      { label: "Thời gian thu hoạch", value: "3 - 5 năm trở lên" },
      { label: "Đất trồng thích hợp", value: "Đất đồi dốc nhẹ, nhiều mùn ẩm" },
      { label: "Bộ phận thu hoạch", value: "Củ rễ" },
      { label: "Nhiệt độ lý tưởng", value: "15°C - 30°C" }
    ],
    prices: [
      { grade: "Củ tươi Loại lớn", specification: "Trọng lượng củ đơn lẻ >2kg, vỏ nhẵn đỏ nâu sẫm", priceRange: "180.000 - 250.000", unit: "kg", trend: "up" },
      { grade: "Củ tươi Loại thường", specification: "Trọng lượng củ từ 0.8kg - 1.8kg", priceRange: "90.000 - 130.000", unit: "kg", trend: "stable" },
      { grade: "Lát Hà thủ ô sấy", specification: "Thái lát dày 3-5mm, phơi sấy đạt độ ẩm chuẩn <12%", priceRange: "280.000 - 350.000", unit: "kg", trend: "stable" }
    ],
    regions: [
      { regionSlug: "tay-bac", regionName: "Tây Bắc", provinces: ["Sơn La", "Điện Biên"], outputEstimate: "200 tấn/năm" },
      { regionSlug: "dong-bac", regionName: "Đông Bắc", provinces: ["Hà Giang", "Cao Bằng"], outputEstimate: "350 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-ha-thu-o",
    standards: [
      "Không nhầm lẫn với Hà thủ ô trắng (ít giá trị kinh tế hơn).",
      "Củ chắc chắn, cắt ra bên trong có màu hồng đỏ nhẹ, có chứa vân bột đặc trưng.",
      "Hàm lượng tanin và các anthranoid đạt tiêu chuẩn Dược điển Việt Nam."
    ],
    faq: [
      { question: "Làm thế nào để phân biệt Hà thủ ô đỏ và Hà thủ ô trắng?", answer: "Hà thủ ô đỏ có củ giống khoai lang, vỏ ngoài màu nâu đỏ sẫm, nhiều nếp nhăn sâu, bên trong màu đỏ hồng có nhiều bột. Hà thủ ô trắng củ dài dẹt hơn, vỏ màu xám sáng, khi cắt ra có nhựa mủ màu trắng chảy ra, vị rất chát và không có công dụng bổ huyết bằng hà thủ ô đỏ." }
    ]
  },
  {
    id: "actiso",
    slug: "actiso",
    name: "Actiso",
    scientificName: "Cynara scolymus",
    priceRange: "50.000 - 220.000 VNĐ/kg",
    shortDesc: "Được trồng phổ biến tại các vùng cao ôn đới mát mẻ quanh năm như Lâm Đồng, Sa Pa.",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=600&auto=format&fit=crop",
    description: "Actiso là loài thảo dược có xuất xứ từ Địa Trung Hải, phát triển hoàn hảo ở vùng khí hậu mát mẻ ôn đới. Toàn bộ các bộ phận như rễ, thân, lá và đặc biệt là hoa đều thu hoạch để làm trà, làm cao dược liệu giải độc gan cực kỳ đắt khách.",
    stats: [
      { label: "Thời gian thu hoạch", value: "6 - 8 tháng cho lá, 1 năm cho hoa rễ" },
      { label: "Đất trồng thích hợp", value: "Đất đỏ Bazan mùn xốp phong phú dinh dưỡng" },
      { label: "Bộ phận thu hoạch", value: "Hoa, lá tươi, rễ củ" },
      { label: "Nhiệt độ lý tưởng", value: "15°C - 22°C" }
    ],
    prices: [
      { grade: "Hoa Actiso tươi", specification: "Hoa búp to tròn, chưa nở bung cánh tím, tươi rói không héo", priceRange: "150.000 - 220.000", unit: "kg", trend: "up" },
      { grade: "Lá tươi làm cao", specification: "Lá bánh tẻ thu hoạch định kỳ đạt hàm lượng cynarin cao", priceRange: "8.000 - 12.000", unit: "kg", trend: "stable" },
      { grade: "Thân rễ khô thái lát", specification: "Phơi hoặc sấy khô sạch tạp chất, thơm mát đặc trưng", priceRange: "80.000 - 110.000", unit: "kg", trend: "stable" }
    ],
    regions: [
      { regionSlug: "tay-nguyen", regionName: "Tây Nguyên", provinces: ["Lâm Đồng"], outputEstimate: "1.200 tấn/năm" },
      { regionSlug: "tay-bac", regionName: "Tây Bắc", provinces: ["Lào Cai (Sa Pa)"], outputEstimate: "400 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-actiso",
    standards: [
      "Lá thu hoạch làm dược liệu không phun thuốc bảo vệ thực vật cận ngày hái.",
      "Hoa tươi không dập nát thối rữa, đóng gói rổ tre thông thoáng.",
      "Hàm lượng chất đắng và cynarin đạt chuẩn xuất khẩu."
    ],
    faq: [
      { question: "Trồng Actiso ở vùng đồng bằng nắng nóng được không?", answer: "Không nên. Actiso là loại liên ôn đới bắt buộc phải có khí hậu lạnh dịu dưới 25 độ C để sinh trưởng tốt và ra hoa. Ở vùng đồng bằng nhiệt đới nóng bức, cây sẽ nhanh chóng héo lụi, không phát triển được và tỷ lệ chết gần như 100%." }
    ]
  },
  {
    id: "nam-linh-chi",
    slug: "nam-linh-chi",
    name: "Nấm linh chi",
    scientificName: "Ganoderma lucidum",
    priceRange: "300.000 - 1.200.000 VNĐ/kg",
    shortDesc: "Nấm dược liệu cao cấp, được nuôi cấy tỉ mỉ trên mùn cưa hữu cơ hoặc thu hoạch tự nhiên.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
    description: "Nấm linh chi Việt Nam được nghiên cứu nuôi trồng thành công tại nhiều Hợp tác xã công nghệ cao, mang lại giá trị kinh tế khổng lồ. Yêu cầu kỹ thuật nhà màng khép kín, giữ ẩm cực tốt và vô trùng phôi giống nghiêm ngặt.",
    stats: [
      { label: "Thời gian thu hoạch", value: "3 - 4 tháng từ khi cấy phôi" },
      { label: "Đất trồng thích hợp", value: "Nuôi trong nhà xưởng màng, giá thể gỗ mùn cưa cao su" },
      { label: "Bộ phận thu hoạch", value: "Mũ nấm còn nguyên lớp bào tử quý giá" },
      { label: "Nhiệt độ lý tưởng", value: "22°C - 30°C" }
    ],
    prices: [
      { grade: "Linh chi Đỏ hữu cơ", specification: "Còn nguyên lớp phấn bào tử nâu trên bề mặt tai nấm, tai dày dai", priceRange: "700.000 - 950.000", unit: "kg", trend: "up" },
      { grade: "Linh chi Việt tự nhiên", specification: "Khai thác trực tiếp từ rừng Lim tự nhiên vùng Tây Nguyên/Quảng Nam", priceRange: "1.200.000 - 1.800.000", unit: "kg", trend: "up" },
      { grade: "Linh chi loại B", specification: "Tai nấm hơi mỏng hoặc rụng bớt bào tử do thu hoạch muộn", priceRange: "300.000 - 450.000", unit: "kg", trend: "stable" }
    ],
    regions: [
      { regionSlug: "tay-nguyen", regionName: "Tây Nguyên", provinces: ["Kon Tum", "Gia Lai"], outputEstimate: "80 tấn/năm" },
      { regionSlug: "dong-nam-bo", regionName: "Đông Nam Bộ", provinces: ["Đồng Nai", "Bình Dương"], outputEstimate: "150 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-nam-linh-chi",
    standards: [
      "Tuyệt đối không phun thuốc hóa học diệt nấm hại khi quả thể đang phát triển.",
      "Tai nấm hóa gỗ hoàn toàn, đường kính >8cm, không bị sâu mọt ăn rỗng ruột.",
      "Thu hoạch nhẹ tay tránh làm bay mất lớp phấn bào tử cực kỳ quý giá bám trên mũ nấm."
    ],
    faq: [
      { question: "Tại sao bào tử bám trên mặt nấm lại có giá trị cao?", answer: "Lớp phấn mỏng màu nâu bám trên bề mặt tai nấm chính là bào tử nấm linh chi. Nghiên cứu khoa học chứng minh lớp bào tử này có hàm lượng hoạt chất polysaccharide và triterpenoid cao gấp 10-20 lần so với chính tai nấm, quyết định chất lượng thượng hạng của sản phẩm." }
    ]
  },
  {
    id: "bac-ha",
    slug: "bac-ha",
    name: "Bạc hà Á",
    scientificName: "Mentha arvensis",
    priceRange: "15.000 - 45.000 VNĐ/kg",
    shortDesc: "Thân thảo sinh trưởng cực nhanh, cho sản lượng lá tươi lớn dùng để chưng cất tinh dầu menthol.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&auto=format&fit=crop",
    description: "Bạc hà là cây dược liệu ngắn ngày lý tưởng cho canh tác luân canh của nông dân đồng bằng. Cây sinh trưởng tốt trong điều kiện nhiều nắng, đất ẩm, dễ thu hoạch bằng liềm sấy khô chiết tinh dầu hoặc cung cấp trực tiếp cho các xưởng chiết dược mỹ phẩm.",
    stats: [
      { label: "Thời gian thu hoạch", value: "45 - 60 ngày sau gieo trồng" },
      { label: "Đất trồng thích hợp", value: "Đất phù sa sông bồi đắp ẩm mịn thoát nước" },
      { label: "Bộ phận thu hoạch", value: "Thân lá trên mặt đất tươi hoặc sấy khô" },
      { label: "Nhiệt độ lý tưởng", value: "20°C - 32°C" }
    ],
    prices: [
      { grade: "Lá Bạc hà khô", specification: "Lá xanh ráo nước, phơi bóng râm sấy nhẹ giữ màu xanh thơm đậm, độ ẩm <12%", priceRange: "38.000 - 45.000", unit: "kg", trend: "stable" },
      { grade: "Cành lá tươi nguyên", specification: "Vừa thu cắt tại ruộng sạch cỏ dại, bốc dỡ nhanh trong ngày", priceRange: "8.000 - 12.000", unit: "kg", trend: "down" },
      { grade: "Tinh dầu Bạc hà mộc", specification: "Chưng cất lôi cuốn hơi nước trực tiếp tại HTX, hàm lượng menthol >65%", priceRange: "650.000 - 800.000", unit: "lít", trend: "stable" }
    ],
    regions: [
      { regionSlug: "dong-bang-song-hong", regionName: "Đồng bằng Sông Hồng", provinces: ["Hưng Yên", "Hà Nam"], outputEstimate: "2.500 tấn/năm" },
      { regionSlug: "bac-trung-bo", regionName: "Bắc Trung Bộ", provinces: ["Nghệ An (Nghĩa Đàn)"], outputEstimate: "1.100 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-bac-ha",
    standards: [
      "Không bị lẫn các loài cỏ dại thơm khác.",
      "Không dính bùn bẩn, đất ruộng cát đen khi thu hoạch.",
      "Hàm lượng tinh dầu trong lá khô phải đạt từ 1.5% trở lên."
    ],
    faq: [
      { question: "Cây bạc hà trồng một lần thu hoạch được mấy đợt?", answer: "Bạc hà có thể thu hoạch gốc liên tục 3-4 đợt mỗi năm nếu được chăm sóc tưới tiêu và bón phân hữu cơ đầy đủ sau mỗi chu kỳ cắt. Cắt sát gốc khoảng 5cm, cây sẽ nhanh chóng đâm chồi mới mạnh mẽ." }
    ]
  },
  {
    id: "ca-gai-leo",
    slug: "ca-gai-leo",
    name: "Cà gai leo",
    scientificName: "Solanum procumbens",
    priceRange: "30.000 - 75.000 VNĐ/kg",
    shortDesc: "Thảo dược dây leo gai sắc nhọn, khắc tinh của các bệnh lý xơ gan, viêm gan vi rút.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    description: "Cà gai leo là loại thảo dược bản địa có sức sống bền bỉ tuyệt vời trên vùng đất đồi sỏi đá cằn cỗi của miền Trung Việt Nam. Các hoạt chất glycoalcaloid trong cà gai leo cực mạnh giúp bảo vệ tế bào gan, hạ men gan vô cùng hiệu quả, nhu cầu tiêu thụ công nghiệp cực cao.",
    stats: [
      { label: "Thời gian thu hoạch", value: "5 - 6 tháng sau khi trồng" },
      { label: "Đất trồng thích hợp", value: "Đất đồi sỏi đá, nghèo dinh dưỡng thoát nước nhanh" },
      { label: "Bộ phận thu hoạch", value: "Toàn bộ phần thân lá cành già" },
      { label: "Nhiệt độ lý tưởng", value: "25°C - 38°C" }
    ],
    prices: [
      { grade: "Thân cành lá khô", specification: "Chặt đoạn khúc phơi khô giòn thơm, không lẫn tạp chất hay cỏ dại", priceRange: "50.000 - 68.000", unit: "kg", trend: "up" },
      { grade: "Thân lá tươi nguyên ruộng", specification: "Thu hoạch tươi phục vụ trực tiếp cho xưởng nấu cao cô đặc", priceRange: "12.000 - 16.000", unit: "kg", trend: "stable" }
    ],
    regions: [
      { regionSlug: "bac-trung-bo", regionName: "Bắc Trung Bộ", provinces: ["Quảng Trị", "Nghệ An"], outputEstimate: "1.800 tấn/năm" },
      { regionSlug: "dong-bac", regionName: "Đông Bắc", provinces: ["Bắc Giang"], outputEstimate: "600 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-ca-gai-leo",
    standards: [
      "Không chứa tạp chất bụi đất sỏi cát rác hữu cơ quá 1%.",
      "Màu vàng xanh nhạt sấy thơm mát đặc trưng, không có mùi ẩm mốc cũ nát.",
      "Cây đạt tuổi trưởng thành đủ ra hoa kết quả đỏ mọng để tích lũy lượng Glycoalcaloid tối ưu nhất."
    ],
    faq: [
      { question: "Tại sao Cà gai leo miền Trung lại có giá trị dược tính cao nhất?", answer: "Do vùng khí hậu khô cằn khắc nghiệt cùng lượng bức xạ mặt trời cực lớn tại Quảng Trị, Nghệ An khiến cây buộc phải tích tụ tự vệ bằng các hoạt chất sinh học tự nhiên dồi dào, từ đó khiến nồng độ chất glycoalcaloid cao hơn rõ rệt so với các vùng đất ẩm mướt màu mỡ." }
    ]
  },
  {
    id: "kim-ngan-hoa",
    slug: "kim-ngan-hoa",
    name: "Kim ngân hoa",
    scientificName: "Lonicera japonica",
    priceRange: "180.000 - 450.000 VNĐ/kg",
    shortDesc: "Được coi là 'kháng sinh thực vật quý'. Thu hái chính ở hoa búp sắp nở vàng trắng đan xen.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop",
    description: "Kim ngân là loại dây leo hoa tuyệt đẹp, khi nở đổi màu từ trắng tinh khôi sang vàng óng ả sang trọng. Búp hoa khô chứa lượng flavonoid dồi dào là vị thuốc kháng viêm, giải nhiệt kháng khuẩn hữu hiệu bậc nhất trong y học cổ truyền.",
    stats: [
      { label: "Thời gian thu hoạch", value: "1 năm sau khi giâm cành bám giàn leo" },
      { label: "Đất trồng thích hợp", value: "Đất vườn xốp nhẹ ẩm, đất phù sa bồi dốc nhẹ" },
      { label: "Bộ phận thu hoạch", value: "Hoa búp (Kim ngân hoa) và cành già (Kim ngân cuống)" },
      { label: "Nhiệt độ lý tưởng", value: "20°C - 35°C" }
    ],
    prices: [
      { grade: "Kim ngân hoa Loại 1", specification: "Hoa nguyên búp sắp nở, phơi sấy râm giữ nguyên màu trắng vàng nhạt thơm, độ ẩm <11%", priceRange: "380.000 - 450.000", unit: "kg", trend: "up" },
      { grade: "Kim ngân hoa sấy diêm sinh nhẹ", specification: "Quy trình sấy chống nấm mốc đông y truyền thống đạt tiêu chuẩn", priceRange: "240.000 - 300.000", unit: "kg", trend: "stable" },
      { grade: "Dây cành Kim ngân khô", specification: "Cành chặt khúc phơi giòn vàng thơm, độ ẩm <12%", priceRange: "45.000 - 60.000", unit: "kg", trend: "stable" }
    ],
    regions: [
      { regionSlug: "dong-bac", regionName: "Đông Bắc", provinces: ["Lạng Sơn", "Bắc Giang"], outputEstimate: "90 tấn/năm" },
      { regionSlug: "dong-bang-song-hong", regionName: "Đồng bằng Sông Hồng", provinces: ["Nam Định"], outputEstimate: "150 tấn/năm" }
    ],
    techniquesLink: "ky-thuat-trong-kim-ngan-hoa",
    standards: [
      "Thu hoạch khi búp hoa đã phát triển tối đa nhưng cánh hoa còn đóng kín chưa nở bung nhị nhụy.",
      "Màu sắc hoa sấy không bị đen cháy hay vàng đen lụi thâm xỉn.",
      "Tuyệt đối không có tạp chất và dư lượng kim loại nặng vượt quá quy chuẩn kiểm nghiệm dược."
    ],
    faq: [
      { question: "Tại sao búp hoa Kim ngân có giá bán đắt gấp chục lần phần thân dây cành?", answer: "Búp hoa tích tụ nồng độ hoạt chất lonicerin, tinh dầu tự nhiên và các flavonoid chống viêm cực cao, gánh vác tới 90% công năng điều trị của cây dược phẩm. Phần cành lá chỉ có giá trị làm mát tiêu độc nhẹ nên giá trị thương mại thấp hơn rất nhiều." }
    ]
  }
];

export const REGIONS_DATA: RegionData[] = [
  {
    slug: "tay-bac",
    name: "Tây Bắc",
    characteristics: "Địa hình núi cao hiểm trở xen kẽ các thung lũng sâu, khí hậu cận nhiệt đới và ôn đới ẩm độc đáo. Đất đồi dốc dồi dào sỏi đá nhiều mùn thích hợp các dòng cây rễ sâu thảo mộc hoang dã dẻo dai.",
    advantages: "Lượng bức xạ nhiệt mặt trời dồi dào, biên độ nhiệt độ ngày và đêm rất lớn giúp thảo mộc tự nhiên tổng hợp nồng độ hoạt chất vô cùng đậm đặc khác biệt hoàn toàn đất đồng bằng.",
    commonHerbs: ["Hà thủ ô đỏ", "Ba kích", "Đinh lăng", "Actiso"],
    provinces: [
      { name: "Sơn La", area: "1.200 ha chuyên canh", harvestPeriod: "Tháng 10 - Tháng 12", activeCooperatives: "15 Hợp tác xã dược liệu liên kết" },
      { name: "Hòa Bình", area: "850 ha chuyên canh", harvestPeriod: "Quanh năm (thu hoạch luân phiên)", activeCooperatives: "9 Hợp tác xã kiểu mới" },
      { name: "Lào Cai (Sa Pa)", area: "500 ha ôn đới", harvestPeriod: "Tháng 8 - Tháng 11", activeCooperatives: "8 Tác tổ dược sâm bản địa" }
    ]
  },
  {
    slug: "dong-bac",
    name: "Đông Bắc",
    characteristics: "Các dãy núi hình cánh cung đón gió mùa lạnh mùa đông từ phía Bắc, lượng mưa đều, thổ nhưỡng rừng sâu nguyên sinh dồi dào dinh dưỡng khoáng chất thích hợp thảo dược rừng và các loại củ dưới tán cây rừng ẩm.",
    advantages: "Hệ thống rừng tự nhiên phong phú lý tưởng tuyệt đối để áp dụng mô hình liên kết trồng thảo mộc dưới tán rừng tự nhiên của VIETMEC, bảo tồn hệ sinh thái bản địa tối ưu.",
    commonHerbs: ["Ba kích", "Đinh lăng", "Hà thủ ô đỏ", "Kim ngân hoa"],
    provinces: [
      { name: "Quảng Ninh", area: "950 ha rừng liên kết", harvestPeriod: "Tháng 11 - Tháng 2 năm sau", activeCooperatives: "12 Tổ sản xuất huyện Ba Chẽ" },
      { name: "Hà Giang", area: "1.400 ha núi đá", harvestPeriod: "Tháng 9 - Tháng 12", activeCooperatives: "22 Hợp tác xã người Mông liên kết" },
      { name: "Phú Thọ", area: "750 ha chuyên canh", harvestPeriod: "Quanh năm", activeCooperatives: "Phân vùng nhà máy GMP VIETMEC đóng đô" }
    ]
  },
  {
    slug: "tay-nguyen",
    name: "Tây Nguyên",
    characteristics: "Các cao nguyên Bazan bằng phẳng màu mỡ có độ cao từ 500m - 1500m so với mực nước biển, chia thành hai mùa mưa nắng rõ rệt, thích nghi tuyệt vời với cây sâm cao cấp và mô hình nấm sạch công nghệ cao.",
    advantages: "Diện tích đất trống và đồi rừng còn lớn, khí hậu cao nguyên mát mẻ ôn hòa lý tưởng bậc nhất cho nấm linh chi hữu cơ và sâm bản địa phát triển quy mô trang trại khổng lồ.",
    commonHerbs: ["Actiso", "Nấm linh chi"],
    provinces: [
      { name: "Lâm Đồng", area: "2.100 ha Actiso", harvestPeriod: "Tháng 1 - Tháng 5", activeCooperatives: "35 Trang trại công nghệ cao Đà Lạt" },
      { name: "Kon Tum", area: "800 ha sâm rừng", harvestPeriod: "Tháng 11 - Tháng 1", activeCooperatives: "11 Hợp tác xã liên doanh" }
    ]
  },
  {
    slug: "bac-trung-bo",
    name: "Bắc Trung Bộ",
    characteristics: "Dải đất cát sỏi đồi dốc gồ ghề ven biển dốc ngược Tây sang Đông chịu khí hậu chuyển giao khắc nghiệt khô nóng đặc thù và chịu ảnh hưởng trực tiếp của gió phơn Lào bỏng rát mùa hè.",
    advantages: "Đất đồi sỏi sấy khô kiệt sừng cùng bức xạ nắng chói chang chính là 'bí thuật sinh tồn' thúc ép cây cà gai leo, ba kích, đinh lăng tăng sinh hàm lượng glycoalcaloid tự nhiên cực kỳ mạnh mẽ.",
    commonHerbs: ["Cà gai leo", "Bạc hà Á"],
    provinces: [
      { name: "Quảng Trị", area: "1.100 ha chuyên canh", harvestPeriod: "Tháng 5 - Tháng 9", activeCooperatives: "14 Liên hiệp HTX Cà gai leo sạch" },
      { name: "Nghệ An", area: "1.500 ha hỗn hợp", harvestPeriod: "Tháng 6 - Tháng 10", activeCooperatives: "19 Tổ hợp thu mua vùng Phủ Quỳ" }
    ]
  }
];

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    id: "ky-thuat-say-duoc-lieu",
    slug: "ky-thuat-say-duoc-lieu-chuan-gacp",
    title: "Kỹ thuật sấy khô và bảo quản dược liệu đạt chuẩn GACP-WHO hạn chế hao hụt hoạt chất",
    category: "Chế biến sau thu hoạch",
    author: "Nguyễn Việt Lộc",
    readTime: "7 phút đọc",
    date: "15/06/2026",
    excerpt: "Sấy khô là bước sống còn quyết định giá trị thương mại của lô dược liệu. Chuyên gia Nguyễn Việt Lộc phân tích chi tiết quy trình sấy lạnh khép kín chống ẩm mốc đạt tiêu chuẩn thu mua khắt khe.",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=600&auto=format&fit=crop",
    contentSections: [
      {
        heading: "1. Tại sao khâu phơi sấy lại quyết định 90% giá trị thương phẩm?",
        paragraphs: [
          "Bà con thường chỉ tập trung vào chăm bón ruộng đồng mà quên mất rằng, chỉ một cơn mưa giông đột xuất hay quá trình ủ bạt sấy kém kỹ thuật có thể biến hàng tấn Đinh lăng, Ba kích thành phế phẩm nấm mốc đen rữa rượi.",
          "Dược liệu đạt tiêu chuẩn thu mua công nghiệp của VIETMEC bắt buộc phải giữ được màu sắc tự nhiên, mùi hương thảo mộc đặc trưng nguyên vẹn, và quan trọng nhất là bảo tồn nguyên vẹn nồng độ hoạt chất Saponin hay Flavonoid. Sấy không đúng cách, nhiệt độ quá cao sẽ làm phân hủy nhiệt các chất quý này."
        ],
        highlight: "Tuyệt đối không phơi trực tiếp dược liệu có chứa tinh dầu thơm (bạc hà, hương nhu...) dưới nắng gắt trực tiếp 12h trưa vì tia UV sẽ làm bay hơi cạn kiệt lượng dầu quý báu."
      },
      {
        heading: "2. Quy trình 3 bước sấy lạnh chuyên nghiệp tại Hợp tác xã",
        paragraphs: [
          "Bước 1: Làm sạch sơ chế phân loại. Loại bỏ toàn bộ cỏ dại lẫn bám, rửa sạch bùn đất bám vào khe củ rễ, thái lát độ dày đồng đều 3-5mm để luồng khí đối lưu đều đặn.",
          "Bước 2: Xếp vỉ thông thoáng. Không xếp chồng chất chồng đè nén quá 2 lớp lát cắt trên một diện tích lưới, đảm bảo luồng không khí ẩm thoát ra thuận lợi.",
          "Bước 3: Điều khiển dải nhiệt độ. Sấy lạnh tuần hoàn khép kín ở mức nhiệt ổn định 35°C - 45°C. Đây là khoảng nhiệt vàng giúp rễ củ thoát hơi nước tự nhiên, không bị cháy khét bên ngoài mà vẫn ẩm ướt thối bên trong."
        ]
      }
    ],
    standardsTable: [
      { factor: "Cây thân lá (Bạc hà, Cà gai)", standard: "Độ ẩm <12%, màu xanh nhạt tự nhiên, không bụi cát bám.", notes: "Sấy mát dải nhiệt 30-38°C là đẹp nhất." },
      { factor: "Rễ củ già (Đinh lăng, Hà thủ ô)", standard: "Độ ẩm <11%, thớ gỗ chắc, mùi thơm đậm, không ẩm mốc thâm.", notes: "Cần thái lát mỏng phơi râm ráo sạch rồi mới nạp lò." }
    ],
    faq: [
      { question: "Mưa kéo dài 3-4 ngày không phơi được thì xử lý thế nào cứu nguy?", answer: "Trong trường hợp mưa kéo dài, tuyệt đối không được ủ đống dược liệu ẩm vì vi khuẩn và nấm mốc sẽ sinh sôi chỉ trong 8-12 tiếng. Bà con phải trải mỏng sản phẩm ra kệ thông gió, bật quạt gió liên tục tốc độ cao kết hợp lò sưởi nhiệt nhẹ hoặc chuyển gấp đến xưởng sấy điện công nghiệp gần nhất của VIETMEC cứu hộ." }
    ]
  },
  {
    id: "lien-ket-ba-ben-vietmec",
    slug: "lien-ket-kinh-te-ba-ben-vietmec",
    title: "Mô hình liên kết ba bên: Nông dân - Hợp tác xã - VIETMEC tháo gỡ điểm nghẽn đầu ra",
    category: "Chính sách & Thị trường",
    author: "Nguyễn Việt Lộc",
    readTime: "6 phút đọc",
    date: "22/05/2026",
    excerpt: "Làm thế nào để tránh tình trạng 'được mùa mất giá'? Nguyễn Việt Lộc chia sẻ bí quyết tham gia chuỗi cung ứng bền vững bao tiêu của Tập đoàn dược liệu uy tín VIETMEC.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop",
    contentSections: [
      {
        heading: "1. Nghịch lý trồng tự phát và thảm cảnh bị thương lái ép giá rẻ mạt",
        paragraphs: [
          "Suốt nhiều năm lăn lộn đi thực địa khắp các bản làng Tây Bắc, Đông Bắc, tôi đã chứng kiến biết bao giọt nước mắt đổ xuống bên những đồi Ba kích, hà thủ ô ngút ngàn. Bà con rủ nhau trồng ồ ạt theo phong trào không ký kết bao tiêu, đến khi thu hoạch rầm rộ thì thương lái thu mua ép giá từ 150.000đ xuống còn 20.000đ/kg hoặc bỏ mặc nông sản thối rữa tại ruộng.",
          "Nguyên nhân cốt lõi là do thiếu tính liên kết chặt chẽ và không nắm rõ tiêu chuẩn kỹ thuật kiểm định chất lượng của các nhà máy sản xuất thuốc đông dược quy mô lớn."
        ],
        highlight: "Để ổn định cuộc sống và làm giàu vững chắc, chuyển dịch từ trồng tự phát sang tham gia Hợp tác xã ký hợp đồng bao tiêu cùng VIETMEC là con đường duy nhất đúng đắn."
      },
      {
        heading: "2. Cách thức ký kết hợp đồng bao tiêu bền vững cùng VIETMEC",
        paragraphs: [
          "Bà con thành lập hoặc gia nhập các Hợp tác xã nông nghiệp kiểu mới có pháp nhân đại diện rõ ràng để ký kết hợp đồng bao tiêu ba bên trực tiếp với tập đoàn dược liệu Việt Nam VIETMEC.",
          "Doanh nghiệp sẽ cung ứng nguồn giống cấy mô chất lượng xuất xứ chuẩn GACP, cử cán bộ kỹ sư nông nghiệp giàu kinh nghiệm về tận vườn giám sát thực địa định kỳ, bồi dưỡng kỹ thuật miễn phí và kiểm tra định kỳ dư lượng hóa chất đầu ra, cam kết mua lại toàn bộ sản lượng theo mức giá sàn quy định chặt chẽ có lợi nhất cho người nông dân."
        ]
      }
    ],
    faq: [
      { question: "Hợp tác xã quy mô bao nhiêu ha thì VIETMEC chấp nhận về ký liên kết?", answer: "VIETMEC ưu tiên các Hợp tác xã tập trung có tổng diện tích quy hoạch đất trồng liên kết từ 5 héc-ta trở lên để dễ dàng thiết lập quản lý quy chuẩn GACP-WHO thống nhất và điều động xe container vận tải chuyên dụng chở nguyên liệu về nhà máy tiết kiệm nhất." }
    ]
  },
  {
    id: "phan-biet-cay-duoc-lieu-gia",
    slug: "canh-giac-chieu-tro-giong-cay-duoc-lieu-gia",
    title: "Cảnh giác chiêu trò lừa đảo cung cấp hạt giống, cây giống giả tràn lan mạng xã hội",
    category: "Cảnh báo nông nghiệp",
    author: "Nguyễn Việt Lộc",
    readTime: "5 phút đọc",
    date: "10/06/2026",
    excerpt: "Rất nhiều bà con nông dân nhẹ dạ cả tin mua giống Ba kích tím giả, giống sâm Trung Quốc lai mầm mọc yếu ớt trên facebook. Nguyễn Việt Lộc hướng dẫn cách truy xuất nguồn gốc chuẩn.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&auto=format&fit=crop",
    contentSections: [
      {
        heading: "1. Thảm cảnh mất trắng sau 3 năm trồng giống Ba kích xơ xác trôi nổi",
        paragraphs: [
          "Trang tin của tôi liên tục nhận được phản ánh đau lòng từ các nông hộ tại Nghệ An, Thanh Hóa mua cây giống rao bán rẻ mạt chỉ 2.000đ/cây từ các trang facebook nặc danh quảng cáo là Ba kích tím Quảng Ninh chuẩn. Đến khi trồng ròng rã suốt 3 năm tốn bao mồ hôi và phân bón, đào lên mới tá hỏa củ rễ chỉ có lõi gỗ khô khốc xơ mướp, không hề có hoạt chất tím bổ dưỡng quý báu nào.",
          "Đây là loại giống Ba kích trắng hoặc dây ruột gà dại hoang dã dán mác lừa đảo bà con để trục lợi bất chính."
        ]
      }
    ],
    faq: [
      { question: "Làm sao để biết vườn ươm giống có giấy chứng nhận pháp lý chuẩn hay không?", answer: "Bà con hãy yêu cầu cơ sở bán giống cung cấp đầy đủ 3 loại giấy tờ pháp lý tối thiểu: Giấy phép đăng ký kinh doanh ngành nghề giống cây trồng; Giấy chứng nhận nguồn gốc xuất xứ lô giống (C/O) do cơ quan kiểm lâm hoặc nông nghiệp tỉnh cấp; và cam kết kiểm nghiệm độ sạch bệnh cây giống thực tế." }
    ]
  }
];

export const WIKI_HUBS: WikiHub[] = [
  {
    id: "ky-thuat-trong-dinh-lang",
    slug: "ky-thuat-trong-dinh-lang-dat-nang-suat-cao",
    herbSlug: "dinh-lang",
    herbName: "Đinh lăng",
    title: "Cẩm nang Kỹ thuật trồng và chăm sóc Đinh lăng nếp từ A-Z đạt chuẩn GACP-WHO",
    intro: "Tài liệu kỹ thuật canh tác độc quyền đúc kết từ cựu kỹ sư nông nghiệp thực địa của Nguyễn Việt Lộc và dữ liệu quy chuẩn sản xuất sạch của đối tác bao tiêu hàng đầu VIETMEC.",
    standards: [
      { stage: "Chọn đất trồng", criteria: "Đất dốc nhẹ thoát nước cực nhanh, đất cát pha thịt nhẹ độ pH lý tưởng đạt dải từ 5.5 - 6.5.", controlMethod: "Bón vôi bột khử chua, cày sâu phơi ải trước khi lên luống vồng cao ít nhất 30-35cm." },
      { stage: "Kỹ thuật bón phân", criteria: "Tuyệt đối cấm sử dụng phân hóa học hóa thạch, ưu tiên 100% phân chuồng ủ hoai mục bằng nấm đối kháng Trichoderma kết hợp tro bếp.", controlMethod: "Bón lót kỹ trước khi cắm cành giâm gốc, bón thúc định kỳ vào đầu mùa mưa hàng năm." },
      { stage: "Mật độ trồng tối ưu", criteria: "Hàng cách hàng 60cm, cây cách cây 50cm. Mật độ tương đương đạt từ 25.000 - 30.000 cây trên mỗi héc-ta.", controlMethod: "Bố trí rãnh nước chạy dọc quanh rặng luống đảm bảo tưới ẩm đầy đủ nhưng không bao giờ ứ đọng nước lâu làm úng rễ." }
    ],
    pests: [
      { pestName: "Sâu róm hại lá Đinh lăng", symptoms: "Sâu róm xám rậm lông bâu bám ăn khuyết trụi lủi lá non bánh tẻ vào mùa xuân ấm ẩm.", remedy: "Bà con ưu tiên bắt thủ công bằng tay hoặc phun chế phẩm sinh học vi nấm hại côn trùng BT (Bacillus thuringiensis) cực sạch lành tính." },
      { pestName: "Thối đen rễ do úng ngập", symptoms: "Lá ngả vàng lụi nhanh dần, rễ củ dưới đất mềm nhũn chảy nước đen có mùi thối rữa nồng.", remedy: "Khẩn trương khơi rãnh tháo cạn nước đọng, rắc bột lân hữu cơ vi sinh đối kháng nấm tơ hại và nhổ bỏ tiêu hủy ngay các cây hỏng nặng tránh lây lan diện rộng." }
    ],
    faq: [
      { question: "Cây Đinh lăng nếp trồng bao nhiêu năm thì đào bán củ lãi nhất?", answer: "Chu kỳ vàng để thu hoạch Đinh lăng nếp là từ 3.5 năm đến 5 năm tuổi. Trồng sớm quá củ chưa phình lớn và nồng độ chất saponin chưa đạt, bón sấy khô bị teo tóp đen xỉn giảm giá trị rõ rệt. Trồng quá 6 năm nếu không bón phân bồi đất thì củ có hiện tượng hóa xơ giảm chất lượng." }
    ]
  },
  {
    id: "ky-thuat-trong-ba-kich",
    slug: "ky-thuat-trong-ba-kich-tim-duoi-tan-rung",
    herbSlug: "ba-kich",
    herbName: "Ba kích",
    title: "Cẩm nang Kỹ thuật trồng Ba kích tím dưới tán rừng và làm giàn leo hiện đại",
    intro: "Dây leo Ba kích tím cần điểm tựa vững vàng để leo bám thụ phấn và tổng hợp diệp lục tốt. Chuyên gia Nguyễn Việt Lộc chia sẻ kỹ thuật đúc kết từ vùng trồng kiểu mẫu tại Ba Chẽ, Quảng Ninh.",
    standards: [
      { stage: "Thiết kế giàn leo", criteria: "Dùng cọc tre tầm vông chắc chắn bọc nilon bảo vệ đầu cọc hoặc dựng hệ thống lưới cước đan vuông dẻo dai bám chặt.", controlMethod: "Cố định cọc sâu xuống luống đất trước khi dây bắt đầu vươn dài bám cuốn." },
      { stage: "Che phủ tạo tán", criteria: "Ba kích là cây ưa bóng bán phần từ 30% - 50%, kỵ ánh nắng xói trực tiếp bỏng rát.", controlMethod: "Nên tận dụng trồng dưới tán rừng cây keo tràm già hoặc làm lưới đen nông nghiệp chống nắng giăng phía trên giàn." }
    ],
    pests: [
      { pestName: "Rệp sáp bám hút nhựa ngọn", symptoms: "Các mảng phấn trắng mềm bu bám chi chít ở đầu ngọn non làm ngọn xoăn tít lùn còi không bò giàn được.", remedy: "Phun nước tỏi ớt gừng ngâm cay diệt sạch mộc mạc hoặc dùng xà phòng dầu neem organic xịt rửa nhẹ buổi sớm mát trời." }
    ],
    faq: [
      { question: "Chi phí đầu tư giàn leo lưới cước cho 1 sào Bắc Bộ Ba kích hết khoảng bao nhiêu?", answer: "Chi phí làm giàn dã chiến bằng cọc tre tầm vông gia cố dây thép gai kết hợp lưới cước đan sẵn rất rẻ, chỉ dao động từ 1.2 triệu - 1.8 triệu đồng cho 1 sào Bắc Bộ (360m2) và có thể tái sử dụng độ bền lên tới 2-3 mùa thu hoạch dài lâu." }
    ]
  }
];
