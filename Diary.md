- install `react router dom` for convenient routes

```python
File 
next.config.mjs
 là trung tâm điều khiển các thiết lập hệ thống của Next.js. Các thông số hiện tại trong file của bạn được cấu hình tối ưu để đưa ứng dụng web lên GitHub Pages dưới dạng một trang web tĩnh (Static Site).

Dưới đây là giải thích chi tiết từng phần logic:

1. output: 'export'
Ý nghĩa: Đây là thiết lập quan trọng nhất để deploy lên GitHub Pages.
Logic: Bình thường Next.js cần một máy chủ Node.js để chạy (SSR). Khi đặt export, Next.js sẽ chuyển toàn bộ mã nguồn của bạn thành các file HTML/CSS/JS thuần túy và bỏ vào thư mục out. GitHub Pages chỉ cần đọc các file tĩnh này là có thể chạy được web mà không cần server.
2. basePath: '/jaden-blog'
Ý nghĩa: Xác định "địa chỉ gốc" của dự án trên URL.
Logic: Vì GitHub Pages thường có dạng username.github.io/ten-repo/, nên mọi đường dẫn ảnh, script trong code của bạn cần được bắt đầu bằng /ten-repo/. Nếu không có cái này, trình duyệt sẽ tìm file ở username.github.io/ và gây ra lỗi trắng trang hoặc mất ảnh.
3. images: { unoptimized: true }
Ý nghĩa: Tắt tính năng tự động nén và tối ưu ảnh của Next.js.
Logic: Tính năng next/image mặc định cần một server Node.js để xử lý việc nén ảnh "on-the-fly". Vì chúng ta đã dùng output: 'export' (không có server), Next.js buộc bạn phải tắt tính năng này để nó dùng thẻ <img> truyền thống.
4. reactCompiler: true
Ý nghĩa: Kích hoạt trình biên dịch mới của React (React 19).
Logic: Đây là tính năng hiện đại giúp tự động tối ưu hóa việc render linh kiện (Components) mà bạn không cần phải dùng useMemo hay useCallback thủ công nhiều. Nó giúp blog chạy mượt hơn.
5. remotePatterns (Trong images)
Ý nghĩa: Danh sách "trắng" các tên miền ảnh bên thứ ba.
Logic: Để bảo mật, Next.js yêu cầu bạn khai báo các host ảnh bên ngoài (như Unsplash) mà bạn định dùng. Nếu không khai báo, Next.js sẽ chặn không cho hiển thị ảnh từ các nguồn đó.
6. devIndicators: true
Ý nghĩa: Hiển thị các ký hiệu trạng thái khi bạn đang lập trình (như biểu tượng đang build ở góc màn hình).
Logic: Giúp bạn biết hệ thống có đang cập nhật hay không khi bạn sửa code.
```