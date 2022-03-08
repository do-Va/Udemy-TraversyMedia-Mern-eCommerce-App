import mongoose from 'mongoose';
import dotenv from 'dotenv';

/* Data */
import users from './data/users.js';
import products from './data/products.js';

/* Models */
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

/* Connect DataBase */
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Bütün veri tabanını siliyoruz.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // User adlı veritabanımıza users dosyasının içerisindeki verileri aktarıyoruz.
    const createdUser = await User.insertMany(users);

    // createdUser objesinin içerisindeki ilk elemanı adminUser'a atıyoruz.
    const adminUser = createdUser[0]._id;

    // Admin ürünler üzerinde güncelleme yapabilmesi için bütün ürünlere admini ekliyoruz.
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const DestroyData = async () => {
  try {
    // Bütün veri tabanını siliyoruz.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  DestroyData();
} else {
  importData();
}
