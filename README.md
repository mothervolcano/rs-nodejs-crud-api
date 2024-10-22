# Instructions

### 1. Clone the Branch

```bash
git clone <repository-url>
```
(After cloning you might need to manually get the branch. In that case you can do the following)
```bash
git branch -r
git checkout -b dev origin/dev
git pull
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create your own .env file with:
```bash
PORT=4000 //or any other available port you prefer
```

### 4. Start the Server
#### Development mode:
```bash
npm run start:dev
```

#### Production mode:
```bash
npm run start:prod
```

### 5. Run the tests
```bash
npm run test
```

### Cross-checking
You could test the project in two ways:

#### A) Unit Tests
1. Quickly and easily add your tests inside the tests folder.
2. This project uses supertest. Example test structure:

```bash
import request from 'supertest';
import { createServer } from '../src/index';

const res = await request(server).get('/api/users');
```

3. To send a payload with the request, chain the .send() method:

```bash
const res = await request(server)
  .post('/api/users')
  .send({ username: 'Joe', age: 50 });
```

#### B) Manual Testing (e.g., Curl or Postman)

1. In index.ts, comment out the following block of code to prevent clustering:

```bash
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  createServer();
}
```

2. Start a single server process by directly calling:

```bash
createServer();
```

#### Note

Most requests should return related user data, from which you can retrieve the uuid required for subsequent requests.


#### Final Note:

Feel free to deduct 50 points for not having finished implementing the load balancer and a couple more for the trouble 😅
