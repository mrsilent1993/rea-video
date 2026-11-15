# Xưởng Phong Cách: cách thêm và sửa phong cách

Trang tĩnh, không cần cài đặt hay build. Toàn bộ dữ liệu nằm trong `styles.js`.

## Thêm một phong cách
1. Mở `styles.js`, chép một mục trong `window.STYLES` rồi sửa:
   - `id`: chữ thường không dấu, nối bằng gạch ngang (dùng làm đường dẫn `#id`).
   - `cat`: một `id` trong `window.CATEGORIES`.
   - `imagePrompt`, `videoPrompt`: viết `{chu_de}` ở chỗ cần điền chủ đề người dùng gõ.
   - `palette`: 4 mã màu, màu đầu là màu nền.
   - `image` (tuỳ chọn): đường dẫn ảnh mẫu, ví dụ `img/dong-ho.jpg`. Không có ảnh thì trang tự vẽ hình nền theo `palette` và `motif`.
2. Bỏ ảnh mẫu (nếu có) vào thư mục `img/`, nên dùng ảnh ngang 4:3, dưới 300 KB.

## Thêm một nhóm (trạm)
Thêm `{ id, name, note }` vào `window.CATEGORIES`. Thứ tự trong mảng là thứ tự trạm trên trang.

## Xem thử trên máy
Mở thẳng `index.html` bằng trình duyệt là chạy được.
