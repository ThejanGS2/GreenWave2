// Contentful Configuration
const SPACE_ID = 'skk2kaw6e0hy';
const ACCESS_TOKEN = 'rzZOr8efg8ncUoA_b5bWvir2yL9LiizL8as02MBTd_E';

var client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});
