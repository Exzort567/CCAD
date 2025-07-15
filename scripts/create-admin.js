const bcrypt = require('bcryptjs');

async function createHashedPassword() {
  // Change this to your desired admin password
  const plainPassword = 'ccad#567';
  
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    
    console.log('=== ADMIN USER SETUP ===');
    console.log('Plain password:', plainPassword);
    console.log('Hashed password:', hashedPassword);
    console.log('\n=== MONGODB SETUP ===');
    console.log('Copy this document to your MongoDB users collection:');
    console.log('');
    console.log(JSON.stringify({
      username: 'admin',
      password: hashedPassword
    }, null, 2));
    console.log('');
    console.log('=== MongoDB Command ===');
    console.log('db.users.insertOne({');
    console.log(`  "username": "admin",`);
    console.log(`  "password": "${hashedPassword}"`);
    console.log('})');
    
  } catch (error) {
    console.error('Error creating hashed password:', error);
  }
}

createHashedPassword(); 