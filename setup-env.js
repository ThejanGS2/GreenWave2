const fs = require('fs');

const content = `// Contentful Configuration
const SPACE_ID = '${process.env.CONTENTFUL_SPACE_ID || ''}';
const ACCESS_TOKEN = '${process.env.CONTENTFUL_ACCESS_TOKEN || ''}';

var client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});
`;

fs.writeFileSync('js/contentful-config.js', content);
console.log('js/contentful-config.js created successfully!');
