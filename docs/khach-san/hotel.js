/*
 * Toàn bộ nội dung trang nằm ở file này. Sửa chữ, giá, ảnh ở đây là trang tự đổi.
 * - Chữ có hai thứ tiếng: { vi: "...", en: "..." }. Chỉ cần tiếng Việt thì viết chuỗi thường.
 * - Ảnh: đặt file vào thư mục img/ rồi ghi tên file vào mảng images (ảnh đầu tiên là ảnh bìa).
 */
window.HOTEL = {
  sample: true, // true = hiện dải "Bản mẫu" trên đầu trang; đổi thành false khi đã thay nội dung thật
  name: "Lam Hà Boutique Hotel",
  tagline: { vi: "Nghỉ dưỡng yên bình giữa lòng phố cổ", en: "A quiet retreat in the heart of the old town" },
  intro: {
    vi: "Khách sạn boutique 24 phòng, cách phố cổ 5 phút đi bộ và biển 10 phút đi xe. Hồ bơi giữa vườn dừa, bữa sáng món Việt mỗi ngày và đội ngũ luôn sẵn sàng giúp bạn lên lịch trình.",
    en: "A 24-room boutique hotel, a 5-minute walk from the old town and 10 minutes by car from the beach. A pool among coconut palms, Vietnamese breakfast every day and a team happy to plan your trip."
  },
  location: { vi: "Hội An, Quảng Nam", en: "Hoi An, Vietnam" },
  address: "Số 00 Đường Mẫu, phường Minh An, Hội An",
  phone: "0900 000 000",
  zalo: "https://zalo.me/0900000000",
  messenger: "https://m.me/",
  email: "booking@example.com",
  mapQuery: "Hoi An Ancient Town",
  heroImages: ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg"],
  // Ảnh toàn màn hình cho từng trạm khi cuộn (máy quay dừng ở đây)
  heroStill: "hero-1.jpg",
  whereStill: "hero-3.jpg",
  facts: [
    { icon: "clock", vi: "Nhận phòng 14:00 · Trả phòng 12:00", en: "Check-in 14:00 · Check-out 12:00" },
    { icon: "walk", vi: "5 phút đi bộ tới phố cổ", en: "5 min walk to the old town" },
    { icon: "wifi", vi: "Wi-Fi miễn phí toàn khách sạn", en: "Free Wi-Fi throughout" },
    { icon: "car", vi: "Đón sân bay Đà Nẵng", en: "Da Nang airport pickup" }
  ],
  categories: [
    { id: "phong", still: "suite-1.jpg", vi: "Phòng nghỉ", en: "Rooms", note: { vi: "24 phòng, 4 hạng phòng", en: "24 rooms, 4 room types" } },
    { id: "am-thuc", still: "restaurant-1.jpg", vi: "Ẩm thực", en: "Dining", note: { vi: "Bữa sáng và nhà hàng", en: "Breakfast and restaurant" } },
    { id: "thu-gian", still: "hero-2.jpg", vi: "Thư giãn", en: "Relax", note: { vi: "Hồ bơi, spa, quầy bar", en: "Pool, spa, bar" } },
    { id: "dich-vu", still: "tour-1.jpg", vi: "Dịch vụ & trải nghiệm", en: "Services & experiences", note: { vi: "Đưa đón, xe đạp, tour", en: "Transfers, bikes, tours" } }
  ],
  items: [
    {
      id: "superior-double", cat: "phong",
      name: { vi: "Phòng Superior Giường Đôi", en: "Superior Double" },
      short: { vi: "Ấm cúng, giường lớn, hợp cho cặp đôi", en: "Cosy with a large bed, ideal for couples" },
      price: { vi: "từ 850.000đ / đêm", en: "from 850,000 VND / night" },
      facts: { vi: ["22 m²", "2 khách", "1 giường đôi 1m8", "View vườn"], en: ["22 m²", "2 guests", "1 king bed", "Garden view"] },
      desc: {
        vi: "Phòng gọn gàng với tông gỗ ấm, đèn vàng dịu và giường lớn nệm dày. Cửa sổ nhìn ra vườn, yên tĩnh cả ngày.",
        en: "A tidy room in warm wood tones with soft lighting and a large, thick-mattress bed. The window looks onto the quiet garden."
      },
      amenities: { vi: ["Điều hoà", "Smart TV", "Minibar", "Máy sấy tóc", "Ấm đun nước", "Két an toàn"], en: ["Air conditioning", "Smart TV", "Minibar", "Hair dryer", "Kettle", "Safe"] },
      images: ["superior-1.jpg", "superior-2.jpg", "bath-1.jpg"]
    },
    {
      id: "deluxe-twin", cat: "phong",
      name: { vi: "Phòng Deluxe Hai Giường", en: "Deluxe Twin" },
      short: { vi: "Hai giường đơn, cửa sổ lớn nhìn ra vườn dừa", en: "Two single beds, big windows onto the palm garden" },
      price: { vi: "từ 1.050.000đ / đêm", en: "from 1,050,000 VND / night" },
      facts: { vi: ["28 m²", "2 khách", "2 giường đơn 1m2", "View vườn dừa"], en: ["28 m²", "2 guests", "2 single beds", "Palm garden view"] },
      desc: {
        vi: "Rộng rãi, nhiều ánh sáng tự nhiên. Hợp cho bạn bè đi cùng nhau hoặc khách công tác cần bàn làm việc.",
        en: "Spacious and bright. Great for friends travelling together or business guests who need a desk."
      },
      amenities: { vi: ["Điều hoà", "Bàn làm việc", "Smart TV", "Minibar", "Bồn tắm đứng", "Áo choàng tắm"], en: ["Air conditioning", "Work desk", "Smart TV", "Minibar", "Walk-in shower", "Bathrobes"] },
      images: ["twin-1.jpg", "twin-2.jpg", "bath-2.jpg"]
    },
    {
      id: "family", cat: "phong",
      name: { vi: "Phòng Gia Đình", en: "Family Room" },
      short: { vi: "Phòng ngủ và góc sofa riêng cho gia đình 4 người", en: "Bedroom plus a sofa lounge for a family of four" },
      price: { vi: "từ 1.450.000đ / đêm", en: "from 1,450,000 VND / night" },
      facts: { vi: ["38 m²", "4 khách", "1 giường đôi + 2 giường đơn", "Ban công"], en: ["38 m²", "4 guests", "1 double + 2 singles", "Balcony"] },
      desc: {
        vi: "Không gian rộng có góc sofa để cả nhà ngồi chơi. Trẻ dưới 6 tuổi ở miễn phí khi dùng giường có sẵn.",
        en: "A roomy space with a sofa corner for the whole family. Children under 6 stay free using existing beds."
      },
      amenities: { vi: ["Ban công", "Sofa", "Tủ lạnh", "Smart TV", "Nôi em bé (theo yêu cầu)", "Bồn tắm"], en: ["Balcony", "Sofa", "Fridge", "Smart TV", "Baby cot (on request)", "Bathtub"] },
      images: ["family-1.jpg", "family-2.jpg"]
    },
    {
      id: "suite", cat: "phong",
      name: { vi: "Lam Hà Suite", en: "Lam Ha Suite" },
      short: { vi: "Phòng khách riêng, giường bốn cột, bồn tắm lớn", en: "Separate living room, four-poster bed, large tub" },
      price: { vi: "từ 2.400.000đ / đêm", en: "from 2,400,000 VND / night" },
      facts: { vi: ["55 m²", "2–3 khách", "Giường bốn cột 2m", "View hồ bơi"], en: ["55 m²", "2–3 guests", "Four-poster bed", "Pool view"] },
      desc: {
        vi: "Hạng phòng cao nhất: phòng khách tách biệt, phòng tắm hai bồn rửa và bồn tắm nằm. Tặng trái cây chào mừng và trà chiều.",
        en: "Our top category: separate living room, double-vanity bathroom and soaking tub. Welcome fruit and afternoon tea included."
      },
      amenities: { vi: ["Phòng khách riêng", "Bồn tắm nằm", "Máy pha cà phê", "Loa Bluetooth", "Trà chiều miễn phí", "Nhận phòng sớm (nếu còn phòng)"], en: ["Separate living room", "Soaking tub", "Coffee machine", "Bluetooth speaker", "Free afternoon tea", "Early check-in (subject to availability)"] },
      images: ["suite-1.jpg", "suite-2.jpg", "bath-3.jpg", "suite-3.jpg"]
    },
    {
      id: "breakfast", cat: "am-thuc",
      name: { vi: "Bữa sáng buffet", en: "Breakfast buffet" },
      short: { vi: "Món Việt và Âu, 6:30–10:00 mỗi ngày", en: "Vietnamese and Western, 6:30–10:00 daily" },
      price: { vi: "Đã gồm trong giá phòng", en: "Included in room rate" },
      facts: { vi: ["6:30–10:00", "Cao lầu, bánh mì, phở", "Trái cây tươi"], en: ["6:30–10:00", "Cao lau, banh mi, pho", "Fresh fruit"] },
      desc: {
        vi: "Quầy món nóng nấu tại chỗ: cao lầu, mì Quảng, phở, trứng theo yêu cầu. Bánh mì nướng mỗi sáng, nước ép và cà phê phin.",
        en: "Live cooking station: cao lau, mi Quang, pho and eggs your way. Fresh-baked bread, juices and Vietnamese drip coffee."
      },
      amenities: { vi: ["Món chay", "Ghế em bé", "Giao bữa sáng lên phòng (+50.000đ)"], en: ["Vegetarian options", "High chairs", "Breakfast in room (+50,000 VND)"] },
      images: ["breakfast-1.jpg", "breakfast-2.jpg", "breakfast-3.jpg"]
    },
    {
      id: "restaurant", cat: "am-thuc",
      name: { vi: "Nhà hàng Hiên Nhà", en: "Hien Nha Restaurant" },
      short: { vi: "Món Hội An truyền thống, hiên mát nhìn ra vườn", en: "Traditional Hoi An dishes on a shady garden veranda" },
      price: { vi: "Món chính từ 120.000đ", en: "Mains from 120,000 VND" },
      facts: { vi: ["11:00–22:00", "60 chỗ", "Nhận đặt tiệc"], en: ["11:00–22:00", "60 seats", "Private events"] },
      desc: {
        vi: "Thực đơn theo mùa từ chợ Hội An: cơm gà, hoành thánh, bánh xèo, hải sản Cửa Đại. Có lớp học nấu ăn buổi chiều.",
        en: "A seasonal menu from Hoi An market: chicken rice, wontons, banh xeo and Cua Dai seafood. Afternoon cooking classes available."
      },
      amenities: { vi: ["Lớp học nấu ăn", "Thực đơn trẻ em", "Đặt bàn qua Zalo"], en: ["Cooking class", "Kids menu", "Book via Zalo"] },
      images: ["restaurant-1.jpg", "restaurant-2.jpg", "restaurant-3.jpg"]
    },
    {
      id: "pool", cat: "thu-gian",
      name: { vi: "Hồ bơi vườn dừa", en: "Palm garden pool" },
      short: { vi: "Hồ bơi ngoài trời, ghế tắm nắng, quầy nước", en: "Outdoor pool, sun loungers and a drinks bar" },
      price: { vi: "Miễn phí cho khách lưu trú", en: "Free for hotel guests" },
      facts: { vi: ["6:00–21:00", "Khu trẻ em", "Khăn tắm miễn phí"], en: ["6:00–21:00", "Kids area", "Free towels"] },
      desc: {
        vi: "Hồ bơi giữa vườn dừa, nước được lọc mỗi ngày. Buổi chiều có quầy nước dừa và cocktail ngay cạnh hồ.",
        en: "A pool among the coconut palms, filtered daily. In the afternoon a poolside bar serves coconut water and cocktails."
      },
      amenities: { vi: ["Ghế tắm nắng", "Khu trẻ em", "Quầy nước", "Phòng thay đồ"], en: ["Sun loungers", "Kids area", "Pool bar", "Changing room"] },
      images: ["pool-1.jpg", "hero-2.jpg", "pool-2.jpg"]
    },
    {
      id: "spa", cat: "thu-gian",
      name: { vi: "Lam Spa", en: "Lam Spa" },
      short: { vi: "Massage tinh dầu, xông đá, chăm sóc da", en: "Aromatherapy massage, hot stones, facials" },
      price: { vi: "Massage 60 phút từ 390.000đ", en: "60-min massage from 390,000 VND" },
      facts: { vi: ["10:00–22:00", "4 phòng trị liệu", "Giảm 15% cho khách lưu trú"], en: ["10:00–22:00", "4 treatment rooms", "15% off for guests"] },
      desc: {
        vi: "Liệu trình dùng thảo mộc địa phương. Có phòng đôi cho cặp đôi và gói thư giãn nửa ngày.",
        en: "Treatments with local herbs. Couple rooms and half-day relaxation packages available."
      },
      amenities: { vi: ["Phòng đôi", "Xông hơi", "Trà thảo mộc"], en: ["Couple room", "Steam room", "Herbal tea"] },
      images: ["spa-1.jpg", "spa-2.jpg"]
    },
    {
      id: "bar", cat: "thu-gian",
      name: { vi: "Rooftop Bar", en: "Rooftop Bar" },
      short: { vi: "Ngắm hoàng hôn trên phố cổ", en: "Sunset views over the old town" },
      price: { vi: "Cocktail từ 95.000đ", en: "Cocktails from 95,000 VND" },
      facts: { vi: ["16:00–23:00", "Happy hour 17–19h", "Nhạc acoustic tối thứ 7"], en: ["16:00–23:00", "Happy hour 5–7pm", "Live acoustic Saturdays"] },
      desc: {
        vi: "Sân thượng tầng 5 với cocktail theo mùa và đồ ăn nhẹ. Đẹp nhất lúc hoàng hôn khi đèn lồng phố cổ bắt đầu sáng.",
        en: "A fifth-floor terrace with seasonal cocktails and bites. Best at sunset when the old-town lanterns light up."
      },
      amenities: { vi: ["Cocktail", "Bia thủ công", "Đồ ăn nhẹ"], en: ["Cocktails", "Craft beer", "Small plates"] },
      images: ["bar-1.jpg", "bar-2.jpg"]
    },
    {
      id: "transfer", cat: "dich-vu",
      name: { vi: "Đưa đón sân bay", en: "Airport transfer" },
      short: { vi: "Xe riêng từ sân bay Đà Nẵng, 45 phút", en: "Private car from Da Nang airport, 45 min" },
      price: { vi: "350.000đ / chiều (xe 4 chỗ)", en: "350,000 VND one way (4-seat car)" },
      facts: { vi: ["24/7", "Xe 4, 7, 16 chỗ", "Đón có biển tên"], en: ["24/7", "4, 7 or 16 seats", "Name-sign pickup"] },
      desc: {
        vi: "Báo số hiệu chuyến bay qua Zalo, tài xế đón tận cửa ra với biển tên. Miễn phí một chiều cho khách ở từ 3 đêm.",
        en: "Send your flight number on Zalo and the driver meets you at arrivals with a name sign. Free one way for stays of 3+ nights."
      },
      amenities: { vi: ["Nước suối", "Ghế trẻ em (theo yêu cầu)"], en: ["Bottled water", "Child seat (on request)"] },
      images: ["shuttle-1.jpg"]
    },
    {
      id: "bike", cat: "dich-vu",
      name: { vi: "Xe đạp miễn phí", en: "Free bicycles" },
      short: { vi: "Đạp xe ra phố cổ, đồng lúa, biển An Bàng", en: "Ride to the old town, rice fields and An Bang beach" },
      price: { vi: "Miễn phí", en: "Free" },
      facts: { vi: ["20 xe", "Có giỏ và khoá", "Bản đồ cung đường"], en: ["20 bikes", "Basket and lock", "Route map"] },
      desc: {
        vi: "Lấy xe ở quầy lễ tân, nhận kèm bản đồ ba cung đường gợi ý: phố cổ, làng rau Trà Quế và biển An Bàng.",
        en: "Pick up a bike at reception with a map of three suggested routes: the old town, Tra Que vegetable village and An Bang beach."
      },
      amenities: { vi: ["Mũ bảo hiểm", "Thuê xe máy (150.000đ/ngày)"], en: ["Helmets", "Motorbike rental (150,000 VND/day)"] },
      images: ["bike-1.jpg"]
    },
    {
      id: "tour", cat: "dich-vu",
      name: { vi: "Tour phố cổ về đêm", en: "Old town night tour" },
      short: { vi: "Thả đèn hoa đăng, chợ đêm, ẩm thực đường phố", en: "Lantern release, night market and street food" },
      price: { vi: "290.000đ / người", en: "290,000 VND per person" },
      facts: { vi: ["18:00–21:00", "Nhóm tối đa 8 người", "Hướng dẫn viên tiếng Việt / Anh"], en: ["6–9pm", "Max 8 people", "Vietnamese / English guide"] },
      desc: {
        vi: "Đi bộ cùng hướng dẫn viên qua phố đèn lồng, thả đèn hoa đăng trên sông Hoài và nếm 5 món ăn đường phố.",
        en: "A guided walk through the lantern streets, a lantern release on the Hoai River and five street-food tastings."
      },
      amenities: { vi: ["Vé tham quan", "5 món ăn", "Đèn hoa đăng"], en: ["Entry tickets", "5 tastings", "Floating lantern"] },
      images: ["tour-1.jpg", "tour-2.jpg"]
    }
  ]
};
