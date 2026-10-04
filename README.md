# Yieldnote

Website nội dung kiếm tiền (tài chính, đầu tư, bảo hiểm, crypto, thu nhập online…) xây trên **Astro**, gom các dự án mã nguồn mở tốt nhất thành một repo thống nhất. Mọi nguồn thu bật/tắt trong **một file**: `src/site.config.js`.

## Chạy thử

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build tĩnh vào dist/ + tạo chỉ mục tìm kiếm Pagefind
npm run preview   # xem bản build (cần build trước để tìm kiếm hoạt động)
```

Deploy: kết nối repo với **Cloudflare Pages**, **Netlify** hoặc **Vercel** — build command `npm run build`, output `dist`.

## Các dự án mã nguồn mở được tích hợp

| Chức năng | Dự án | Cách tích hợp |
|---|---|---|
| Framework, SEO tĩnh | [withastro/astro](https://github.com/withastro/astro) | Nền tảng; mỗi bài/công cụ là một trang HTML riêng |
| Sitemap | [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) | Tự tạo `/sitemap-index.xml` |
| RSS | [@astrojs/rss](https://github.com/withastro/astro/tree/main/packages/astro-rss) | `/rss.xml`, dùng cho RSS-to-email |
| Tìm kiếm | [Pagefind/pagefind](https://github.com/Pagefind/pagefind) | Chạy sau build, trang `/search/` |
| CMS soạn bài | [sveltia/sveltia-cms](https://github.com/sveltia/sveltia-cms) (kế thừa Decap CMS) | `/admin/`, sửa Markdown trong `src/content/articles` qua GitHub |
| Cookie consent (GDPR) | [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent) | GA4 + AdSense chỉ tải khi người đọc đồng ý |
| Newsletter tự host | [knadh/listmonk](https://github.com/knadh/listmonk) | Form đăng ký gửi thẳng vào listmonk; hoặc dùng Beehiiv/Kit/MailerLite |
| Analytics không cookie | [umami-software/umami](https://github.com/umami-software/umami) | Điền `umami.src` + `websiteId`; theo dõi click affiliate và đăng ký email |
| Bình luận | [giscus/giscus](https://github.com/giscus/giscus) | Bình luận lưu trong GitHub Discussions |
| Link affiliate | Tự xây `/go/<offer>/`; tùy chọn [shlinkio/shlink](https://github.com/shlinkio/shlink) | Link gọn, `noindex`, đổi đối tác ở một chỗ |

Listmonk, Umami, Shlink là dịch vụ chạy riêng (Docker). Site chỉ cần URL của chúng; để trống thì tính năng tương ứng tự tắt.

## Nguồn thu

| Nguồn | Nằm ở đâu | Bật bằng |
|---|---|---|
| Quảng cáo hiển thị | Leaderboard, giữa bài (tự chèn), sidebar | `adsense.client` + `slots` |
| Affiliate | Ô "Partner pick" trong bài, chủ đề, công cụ | `affiliates.<key>` |
| Danh sách email | Trang chủ, sidebar | `newsletter` |
| Sản phẩm số | `/shop/` | `products[].checkoutUrl` (Gumroad, Lemon Squeezy) |
| Thành viên | `/premium/` | `membership[].url` (Stripe Payment Links) |
| Tài trợ | `/advertise/` | `sponsorRates` |
| Tư vấn, tip | Contact, Premium | `bookingUrl`, `donateUrl` |

Trang `/playbook/` (không index) liệt kê 12 mô hình doanh thu kèm công cụ ước tính.

## Cấu trúc

```
src/
  site.config.js          # MỌI cấu hình kiếm tiền + tích hợp
  content/articles/*.md   # 24 bài viết (soạn tay hoặc qua /admin)
  lib/                    # catalog chủ đề/offer, công cụ tính, playbook, script trình duyệt
  components/  layouts/  pages/  styles/
public/admin/             # Sveltia CMS
```

## Trước khi ra mắt

1. Sửa `name`, `url`, `contactEmail` trong `src/site.config.js` và `site_url` trong `public/admin/config.yml`.
2. Viết đủ 20–30 bài gốc, rồi xin duyệt AdSense; điền mã publisher.
3. Dán link affiliate, link thanh toán, endpoint newsletter.
4. Đặt `showPlaceholders: false`.
5. Gửi `sitemap-index.xml` lên Google Search Console.

Nội dung là thông tin chung, không phải tư vấn tài chính. Trang Privacy là mẫu — cần rà soát theo luật nơi bạn hoạt động (GDPR, Nghị định 13/2023…).
