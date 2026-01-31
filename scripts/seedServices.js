const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('../models/Service');

const services = [
  {
    name: 'บริการทำความสะอาดบ้านรายวัน',
    description: 'ทำความสะอาดห้องทั่วไป กวาด ถูปัดฝุ่น จัดระเบียบ',
    price: 500,
    imageUrl: 'https://d1baueb6wfhxkz.cloudfront.net/6452041cddf7bc004a3ba775/large/1721670724617531.jpg'
  },
  {
  name: 'บริการทำความสะอาดลึก (Deep Cleaning)',
  description: 'ทำความสะอาดทั้งบ้านอย่างลึกซึ้ง รวมถึงมุมและที่ยากจะถึง',
  price: 1200,
  imageUrl: 'https://www.advancegroupasia.com/wp-content/uploads/2024/08/messageImage_1721990475548-1024x1012.jpg'
},
  {
    name: 'บริการซักอบรีด',
    description: 'ซักและอบผ้า รีดผ้าให้เรียบร้อย',
    price: 800,
    imageUrl: 'https://www.happywash.co/wp-content/uploads/2017/05/img-service-1.jpg'
  },
  {
    name: 'ทำความสะอาดห้องน้ำและครัว',
    description: 'ทำความสะอาดเฉพาะห้องน้ำและครัว ฟอกความสกปรก',
    price: 600,
    imageUrl: 'https://www.image-gbh.com/images/content/21/3.jpg'
  },
  {
    name: 'ทำความสะอาดหลังการปรับปรุง',
    description: 'ทำความสะอาดหลังการสร้าง ปรับปรุง หรือซ่อมแซม',
    price: 1500,
    imageUrl: 'https://www.napservice.com/service-thai/ewExternalFiles/NAP%20Service2%20Thumb.jpg'
  },
  {
    name: 'บริการทำความสะอาดสำนักงาน',
    description: 'ทำความสะอาดสำนักงาน เศษกระดาษ ทำให้สะอาดทั่วไป',
    price: 900,
    imageUrl: 'https://janitor-cleaning.com/wp-content/uploads/2025/01/pro_1501.jpg'
  },
  {
    name: 'ทำความสะอาดพื้นและพรม',
    description: 'ล้างพื้น ขัดพื้น ทำความสะอาดพรมและเก้าอี้',
    price: 700,
    imageUrl: 'https://www.sofaboyservice.com/wp-content/uploads/2022/12/AdobeStock_200664959-scaled.jpeg'
  },
  {
    name: 'บริการทำความสะอาดหน้าต่างและกระจก',
    description: 'ล้างหน้าต่าง กระจก และผนังที่มีสกปรก',
    price: 400,
    imageUrl: 'https://carecleans.com/wp-content/uploads/2022/10/CareCleans-SEO-OCT-C01-1.jpg'
  }
];

async function seedServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');

    // Insert new services
    const created = await Service.insertMany(services);
    console.log(`✅ Created ${created.length} cleaning services:`);
    created.forEach(s => console.log(`  - ${s.name} (${s.price} บาท)`));

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedServices();
