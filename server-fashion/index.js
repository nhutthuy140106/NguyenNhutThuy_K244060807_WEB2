const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const client = new MongoClient('mongodb://127.0.0.1:27017');
const fashions = client.db('FashionData').collection('Fashion');

// Ghi chú cấu trúc 1 document Fashion:
// { _id, style, fashion_subject (tiêu đề), fashion_detail (HTML), fashion_image (thumbnail), createdAt }

const toId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);
const wrap = (fn) => (req, res) =>
  fn(req, res).catch((e) => {
    console.error(e);
    res.status(500).json({ message: e.message });
  });

app.get('/', (req, res) => res.send('server-fashion is running on port ' + port));

// 1. Toàn bộ Fashion, sắp xếp theo ngày tạo giảm dần
app.get('/fashions', wrap(async (req, res) => {
  res.json(await fashions.find({}).sort({ createdAt: -1 }).toArray());
}));

// 2. Lọc theo Style (không phân biệt hoa thường)
app.get('/fashions/style/:style', wrap(async (req, res) => {
  const style = req.params.style.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  res.json(await fashions
    .find({ style: { $regex: '^' + style + '$', $options: 'i' } })
    .sort({ createdAt: -1 }).toArray());
}));

// Danh sách Style (cho dropdown)
app.get('/styles', wrap(async (req, res) => {
  res.json((await fashions.distinct('style')).filter(Boolean).sort());
}));

// 3. Một Fashion theo ObjectId
app.get('/fashions/:id', wrap(async (req, res) => {
  const _id = toId(req.params.id);
  if (!_id) return res.status(400).json({ message: 'Id không hợp lệ' });
  const f = await fashions.findOne({ _id });
  if (!f) return res.status(404).json({ message: 'Không tìm thấy Fashion' });
  res.json(f);
}));

// 4. Thêm mới
app.post('/fashions', wrap(async (req, res) => {
  const { style, fashion_subject, fashion_detail, fashion_image } = req.body;
  const doc = {
    style, fashion_subject, fashion_detail,
    fashion_image: fashion_image || '',
    createdAt: new Date(),
  };
  const r = await fashions.insertOne(doc);
  res.status(201).json({ ...doc, _id: r.insertedId });
}));

// 5. Chỉnh sửa
app.put('/fashions', wrap(async (req, res) => {
  const _id = toId(req.body._id);
  if (!_id) return res.status(400).json({ message: 'Id không hợp lệ' });
  const { style, fashion_subject, fashion_detail, fashion_image } = req.body;
  await fashions.updateOne({ _id }, { $set: { style, fashion_subject, fashion_detail, fashion_image } });
  res.json(await fashions.findOne({ _id }));
}));

// 6. Xóa theo id
app.delete('/fashions/:id', wrap(async (req, res) => {
  const _id = toId(req.params.id);
  if (!_id) return res.status(400).json({ message: 'Id không hợp lệ' });
  const r = await fashions.deleteOne({ _id });
  res.json({ deleted: r.deletedCount });
}));

client.connect()
  .then(() => app.listen(port, () => console.log(`server-fashion listening on port ${port}`)))
  .catch((e) => { console.error('Không kết nối được MongoDB:', e.message); process.exit(1); });
