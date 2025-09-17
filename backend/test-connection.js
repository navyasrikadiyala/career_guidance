const connectDB = require('./config/database');
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB Connection...');
console.log('================================');

connectDB()
  .then(() => {
    console.log('✅ Connection Status: SUCCESS');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🔗 Ready State:', mongoose.connection.readyState);
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ Connection Status: FAILED');
    console.log('📝 Error:', error.message);
    
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.log('\n💡 Solution: Add your IP to MongoDB Atlas whitelist');
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\n💡 Solution: SSL/TLS issue - Check network or MongoDB Atlas settings');
    }
    
    process.exit(1);
  });