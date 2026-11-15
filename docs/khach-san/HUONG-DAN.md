# Trang giới thiệu khách sạn: cách thay nội dung

Trang tĩnh, không cần cài đặt. Mọi nội dung nằm trong `hotel.js`.

1. **Thông tin chung:** sửa `name`, `tagline`, `intro`, `address`, `phone`, `zalo` (dạng `https://zalo.me/<số điện thoại>`), `email`, `mapQuery` (tên hoặc địa chỉ để hiện bản đồ).
2. **Phòng và dịch vụ:** mỗi mục trong `items` là một thẻ. `cat` chọn nhóm trong `categories`. Thêm hoặc xoá mục tuỳ ý.
3. **Ảnh:** bỏ ảnh thật vào `img/` (ảnh ngang, rộng khoảng 1400px, dưới 400 KB), rồi ghi tên file vào `images` của từng mục. Ảnh đầu tiên là ảnh bìa. Ảnh nền đầu trang nằm ở `heroImages`.
4. **Ngôn ngữ:** chữ dạng `{ vi: "...", en: "..." }`. Khách mở trang bằng máy cài tiếng Anh sẽ thấy tiếng Anh, có nút đổi VI/EN.
5. **Khi đã thay hết bằng nội dung thật:** đổi `sample: true` thành `sample: false`, và trong `credits.js` đổi thành `window.CREDITS = [];` (xoá ảnh minh hoạ trong `img/`).

Ảnh minh hoạ hiện tại lấy từ Wikimedia Commons (giấy phép CC), nguồn ghi trong `credits.js` và cuối trang.
