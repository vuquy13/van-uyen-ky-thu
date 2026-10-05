const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function readPosts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

function writePosts(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

function seedPosts() {
  if (fs.existsSync(DATA_FILE)) return;

  const posts = [
    {
      id: 1,
      title: 'Đêm Thu Vọng Nguyệt',
      author: 'Sưu tầm',
      category: 'Thi Đàn & Xướng Họa',
      content: 'Trăng soi bóng nước lạnh lùng trôi,\nGió thoảng hương thu gợi nhớ ai.\nNon nước ngút ngàn mờ khói tỏa,\nMấy vần thơ cũ gửi cho đời.',
      status: 'approved'
    },
    {
      id: 2,
      title: 'Khúc Chiều Mùa Hạ',
      author: 'Lan Chi',
      category: 'Thi Đàn & Xướng Họa',
      content: 'Con đi suốt mấy dặm đường dài,\nMới hiểu lòng quê nặng tháng năm...',
      status: 'approved'
    },
    {
      id: 3,
      title: '1. Lầu Tần (Tần Lầu)',
      author: 'Ban Biên Tập',
      category: 'Điển Tích & Điển Cố',
      content: 'Chỉ gác cao, cung điện thâm nghiêm hoặc chốn lầu xanh trong thơ ca cổ, biểu tượng cho sự xa cách, hoài niệm hoặc chốn phồn hoa.',
      status: 'approved'
    },
    {
      id: 4,
      title: '2. Gót Chân Achilles',
      author: 'Ban Biên Tập',
      category: 'Điển Tích & Điển Cố',
      content: 'Điển tích Hy Lạp chỉ điểm yếu chí mạng của một cá nhân, hệ thống hay tổ chức dẫu bề ngoài có mạnh mẽ đến đâu.',
      status: 'approved'
    },
    {
      id: 5,
      title: 'Nhận Định Về Nam Cao & Chí Phèo',
      author: 'Hội Văn Học',
      category: 'Dẫn Chứng & Nhận Định',
      content: '"Nam Cao đã dũng cảm vạch trần bộ mặt tàn ác của xã hội thực dân phong kiến đè nén con người, đồng thời phát hiện ra bản chất lương thiện cao đẹp ẩn giấu sâu kín bên trong những kẻ cùng đường."',
      status: 'approved'
    },
    {
      id: 6,
      title: 'Ánh Sáng Nhân Tính Trong Chí Phèo',
      author: 'Hà An',
      category: 'Góc Bình Phẩm Văn Chương',
      content: 'Chí Phèo không đơn thuần là tiếng kêu cứu đòi làm người, mà còn là bản cáo trạng đanh thép về xã hội tàn nhẫn bóp nghẹt phần con lẫn phần người...',
      status: 'approved'
    },
    {
      id: 7,
      title: 'Sự Lặng Lẽ Của Yêu Thương',
      author: 'Minh Quân',
      category: 'Góc Sáng Tác & Bút Ký',
      content: 'Trong bộn bề cuộc sống hiện đại, đôi khi chúng ta quên mất sức mạnh của một ánh nhìn thấu cảm và những trang văn chữa lành tâm hồn...',
      status: 'approved'
    }
  ];

  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  writePosts(posts);
}

seedPosts();

app.get('/api/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { title, author, category, content } = req.body || {};

  if (!title || !author || !category || !content) {
    return res.status(400).json({ message: 'Thiếu thông tin bài viết.' });
  }

  const posts = readPosts();
  const newPost = {
    id: Date.now(),
    title: title.trim(),
    author: author.trim(),
    category,
    content: content.trim(),
    status: 'pending'
  };

  posts.push(newPost);
  writePosts(posts);

  res.status(201).json({ message: 'Bài viết đã được gửi để duyệt.', post: newPost });
});

app.patch('/api/posts/:id/approve', (req, res) => {
  const { id } = req.params;
  const posts = readPosts();
  const index = posts.findIndex((post) => String(post.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
  }

  posts[index].status = 'approved';
  writePosts(posts);

  res.json({ message: 'Bài viết đã được duyệt.', post: posts[index] });
});

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let posts = readPosts();
  const originalLength = posts.length;
  posts = posts.filter((post) => String(post.id) !== String(id));

  if (posts.length === originalLength) {
    return res.status(404).json({ message: 'Không tìm thấy bài viết để xóa.' });
  }

  writePosts(posts);
  res.json({ message: 'Bài viết đã được xóa.' });
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};

  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Đăng nhập thành công.' });
  }

  return res.status(401).json({ success: false, message: 'Mật khẩu không chính xác.' });
});

app.get('/api/admin/password', (req, res) => {
  res.json({ password: ADMIN_PASSWORD });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
