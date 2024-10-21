import server from '../src/index';
import request from 'supertest';



describe('testing the tester', () => {

	test('receives request', async () => {
		const res = await request(server).get('/users');

		expect(res.statusCode).toBe(200);
	})
}); 