const mongoose = require('mongoose');

const uri = 'mongodb+srv://navya:1234@careerpath.zmgkjvj.mongodb.net/?retryWrites=true&w=majority&appName=Careerpath';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: false,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

console.log('🔄 Testing MongoDB connection...');
console.log('📍 URI:', uri.replace(/\/\/.*:.*@/, '//***:***@'));

mongoose.connect(uri, options)
  .then(() => {
    console.log('\n✅ MongoDB Connection: SUCCESS');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🔗 Connection State:', mongoose.connection.readyState);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('🔌 Port:', mongoose.connection.port);
    
    // Test a simple operation
    return mongoose.connection.db.admin().ping();
  })
  .then(() => {
    console.log('🏓 Database Ping: SUCCESS');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ MongoDB Connection: FAILED');
    console.error('🔍 Error Type:', err.name);
    console.error('📝 Error Message:', err.message);
    
    if (err.message.includes('SSL') || err.message.includes('TLS')) {
      console.error('\n💡 SSL/TLS Issue Detected:');
      console.error('   - Check if MongoDB Atlas allows your IP');
      console.error('   - Verify SSL certificates');
      console.error('   - Try connecting from a different network');
    }
    
    if (err.message.includes('authentication')) {
      console.error('\n🔐 Authentication Issue:');
      console.error('   - Verify username and password');
      console.error('   - Check database user permissions');
    }
    
    process.exit(1);
  });

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected');
});