const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('../models/Service');

const services = [
  {
    name: 'บริการทำความสะอาดบ้านรายวัน',
    description: 'ทำความสะอาดห้องทั่วไป กวาด ถูปัดฝุ่น จัดระเบียบ',
    price: 500,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%234F46E5" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3EDaily Cleaning%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'บริการทำความสะอาดลึก (Deep Cleaning)',
    description: 'ทำความสะอาดทั้งบ้านอย่างลึกซึ้ง รวมถึงมุมและที่ยากจะถึง',
    price: 1200,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%236D28D9" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3EDeep Cleaning%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'บริการซักอบรีด',
    description: 'ซักและอบผ้า รีดผ้าให้เรียบร้อย',
    price: 800,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%2306B6D4" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3ELaundry%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'ทำความสะอาดห้องน้ำและครัว',
    description: 'ทำความสะอาดเฉพาะห้องน้ำและครัว ฟอกความสกปรก',
    price: 600,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%2314B8A6" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3EBathroom %26 Kitchen%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'ทำความสะอาดหลังการปรับปรุง',
    description: 'ทำความสะอาดหลังการสร้าง ปรับปรุง หรือซ่อมแซม',
    price: 1500,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%23EA580C" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3EPost Renovation%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'บริการทำความสะอาดสำนักงาน',
    description: 'ทำความสะอาดสำนักงาน เศษกระดาษ ทำให้สะอาดทั่วไป',
    price: 900,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%2359B3D3" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3EOffice Cleaning%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'ทำความสะอาดพื้นและพรม',
    description: 'ล้างพื้น ขัดพื้น ทำความสะอาดพรมและเก้าอี้',
    price: 700,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%238B5CF6" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3EFloor %26 Carpet%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'บริการทำความสะอาดหน้าต่างและกระจก',
    description: 'ล้างหน้าต่าง กระจก และผนังที่มีสกปรก',
    price: 400,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%2315803D" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="white" text-anchor="middle" dy=".3em" font-family="Arial"%3EWindow %26 Glass%3C/text%3E%3C/svg%3E'
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
