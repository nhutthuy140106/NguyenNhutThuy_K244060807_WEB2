// Bổ sung trường createdAt cho các Fashion chưa có (dữ liệu mẫu của chương 7).
// Chạy:  npm run seed            -> chỉ bổ sung createdAt
//        npm run seed -- --clean -> đồng thời xóa các bản ghi rỗng/test (thiếu tiêu đề hoặc style)
const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const col = client.db('FashionData').collection('Fashion');

  if (process.argv.includes('--clean')) {
    const r = await col.deleteMany({ $or: [
      { fashion_subject: { $exists: false } }, { style: { $exists: false } },
      { fashion_subject: '' }, { style: '' }] });
    console.log('Đã xóa bản ghi rỗng:', r.deletedCount);
  }

  const missing = await col.find({ createdAt: { $exists: false } }).sort({ _id: 1 }).toArray();
  const now = Date.now();
  let i = 0;
  for (const f of missing) {
    const d = new Date(now - (missing.length - i) * 86400000); // mỗi bản ghi cách nhau 1 ngày
    await col.updateOne({ _id: f._id }, { $set: { createdAt: d } });
    i++;
  }
  console.log('Đã thêm createdAt cho', missing.length, 'bản ghi. Tổng:', await col.countDocuments());
  await client.close();
})();
