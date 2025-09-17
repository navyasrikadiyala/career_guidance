const mongoose = require('mongoose');

// Test different connection approaches
const testConnections = async () => {
  const uri = 'mongodb+srv://navya:1234@careerpath.zmgkjvj.mongodb.net/?retryWrites=true&w=majority&appName=Careerpath';
  
  console.log('🔍 MongoDB Connection Diagnostics\n');
  
  // Test 1: Basic connection
  console.log('Test 1: Basic SSL connection...');
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Basic connection: SUCCESS');
    await mongoose.disconnect();
  } catch (err) {
    console.log('❌ Basic connection: FAILED -', err.message.split('\n')[0]);
  }
  
  // Test 2: Disable SSL validation
  console.log('\nTest 2: SSL with invalid certificates allowed...');
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ SSL bypass connection: SUCCESS');
    console.log('📊 Database:', mongoose.connection.name);
    await mongoose.disconnect();
  } catch (err) {
    console.log('❌ SSL bypass connection: FAILED -', err.message.split('\n')[0]);
  }
  
  // Test 3: Try without SSL
  console.log('\nTest 3: Connection without SSL...');
  const noSslUri = uri.replace('mongodb+srv://', 'mongodb://').replace('/?retryWrites=true&w=majority&appName=Careerpath', '');
  try {
    await mongoose.connect(noSslUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: false,
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ No SSL connection: SUCCESS');
    await mongoose.disconnect();
  } catch (err) {
    console.log('❌ No SSL connection: FAILED -', err.message.split('\n')[0]);
  }
  
  console.log('\n📋 Connection Status Summary:');
  console.log('   - MongoDB Atlas cluster appears to have SSL/TLS configuration issues');
  console.log('   - This could be due to:');
  console.log('     • IP address not whitelisted in MongoDB Atlas');
  console.log('     • Network firewall blocking MongoDB ports');
  console.log('     • MongoDB Atlas cluster configuration issues');
  console.log('     • Local SSL/TLS certificate problems');
  
  console.log('\n💡 Recommended Solutions:');
  console.log('   1. Check MongoDB Atlas Network Access settings');
  console.log('   2. Add your current IP to the whitelist');
  console.log('   3. Try connecting from a different network');
  console.log('   4. Contact MongoDB Atlas support if issues persist');
};

testConnections().catch(console.error);