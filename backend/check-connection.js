const mongoose = require('mongoose');

const checkConnection = async () => {
  const uri = 'mongodb+srv://navya:1234@careerpath.zmgkjvj.mongodb.net/?retryWrites=true&w=majority&appName=Careerpath';
  
  console.log('🔍 MongoDB Connection Status Check');
  console.log('=' .repeat(50));
  
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 10000
    });
    
    console.log('✅ STATUS: CONNECTED');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('🔌 Port:', mongoose.connection.port);
    console.log('🔗 Ready State:', mongoose.connection.readyState);
    
    // Test database operations
    const ping = await mongoose.connection.db.admin().ping();
    console.log('🏓 Ping Test: SUCCESS');
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected successfully');
    
  } catch (error) {
    console.log('❌ STATUS: DISCONNECTED');
    console.log('📝 Error:', error.message.split('\n')[0]);
    
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.log('\n💡 SOLUTION: Add your IP address to MongoDB Atlas whitelist');
      console.log('   1. Go to MongoDB Atlas Dashboard');
      console.log('   2. Navigate to Network Access');
      console.log('   3. Add your current IP address');
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\n💡 SOLUTION: SSL/TLS configuration issue');
      console.log('   1. Check network connectivity');
      console.log('   2. Try from different network');
      console.log('   3. Contact MongoDB Atlas support');
    }
  }
  
  console.log('=' .repeat(50));
};

checkConnection();