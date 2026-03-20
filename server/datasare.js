const { execSync } = require('child_process');

const collections = ['learners', 'otps', 'questionsets', 'reasoningquestions', 'signup'];
const localURI = 'mongodb://127.0.0.1:27017/studymate';
const remoteURI = 'mongodb+srv://kalmodiyahirdesh:Hirdesh%408236@cluster0.efsmzpg.mongodb.net/studymate';

collections.forEach((collection) => {
  const file = `${collection}.json`;
  try {
    console.log(`📤 Exporting ${collection} from localhost...`);
    execSync(`mongoexport --uri="${localURI}" --collection=${collection} --out=${file} --jsonArray`);
    
    console.log(`📥 Importing ${collection} to Atlas...`);
    execSync(`mongoimport --uri="${remoteURI}" --collection=${collection} --file=${file} --jsonArray`);
    
    console.log(`✅ ${collection} migrated successfully!\n`);
  } catch (err) {
    console.error(`❌ Error migrating ${collection}:`, err.message);
  }
});