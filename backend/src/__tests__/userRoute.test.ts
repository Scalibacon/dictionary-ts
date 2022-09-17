import path from 'path';
import fs from 'fs';
import request from 'supertest';
import app from '../app';
import User from '../types/User';
import DBConnection from '../database/DBConnection';

const dbConnection = new DBConnection();

beforeAll(async () => {
  await dbConnection.createConnection();
});

afterAll(async () => {
  await dbConnection.closeConnection();
  const filepath = path.join(__dirname, '..', 'database', 'database-test.sqlite');

  if (fs.existsSync(filepath))
    await fs.promises.unlink(filepath);
});

describe('user route test', () => {
  let userJwt: string;

  let user = {
    name: 'Testheus',
    email: 'email@teste.com',
    password: 'teste'
  } as User;

  it('should create a user', async () => {
    const result = await request(app)
      .post('/auth/signup')
      .send(user)
      .expect(201);

    expect(result.body).toHaveProperty('user_id');
    expect(result.body).toHaveProperty('token');
    expect(result.body.name).toEqual(user.name);

    user.user_id = result.body.user_id;
    userJwt = result.body.token;
  });

  it('should log in', async () => {
    const result = await request(app)
      .post('/auth/signin')
      .send(user)
      .expect(200);

    expect(result.body).toHaveProperty('user_id');
    expect(result.body).toHaveProperty('token');
    expect(result.body.name).toEqual(user.name);
  });

  it('should get user info', async () => {
    const result = await request(app)
      .get('/user/me')
      .set('x-access-token', userJwt)
      .send(user)
      .expect(200);

    expect(result.body).toHaveProperty('user_id');
    expect(result.body).toHaveProperty('name');
    expect(result.body).not.toHaveProperty('password')
    expect(result.body.name).toEqual(user.name);
  });

  it('should\'n get user info (no jwt)', async () => {
    const result = await request(app)
      .get('/user/me')
      .send(user)
      .expect(400);
  });

  it('should\'n get user info (wrong jwt)', async () => {
    const result = await request(app)
      .get('/user/me')
      .set('x-access-token', userJwt + 'errooou')
      .send(user)
      .expect(400);
  });

  it('should get word list', async () => {
    const result = await request(app)
      .get('/entries/en?search=memen')
      .expect(200);

    expect(result.body).toHaveProperty('results');
    expect(result.body.results.length).toBeGreaterThan(0);
    expect(result.body.results).toContain('memento');
  });

  it('should get word info', async () => {
    const result = await request(app)
      .get('/entries/en/memento')
      .set('x-access-token', userJwt)
      .expect(200);

    expect(result.body).toHaveProperty('word');
    expect(result.body).toHaveProperty('meanings');
  });

  it('should get word history', async () => {
    const result = await request(app)
      .get('/user/me/history')
      .set('x-access-token', userJwt)
      .expect(200);

      expect(result.body.length).toEqual(1);
      expect(result.body[0].word).toContain('memento');
  });

  it('should favorite a word', async () => {
    const result = await request(app)
      .post('/entries/en/knight/favorite')
      .set('x-access-token', userJwt)
      .expect(201);

      expect(result.body).toHaveProperty('message');
  });

  it('should list one favorited word', async () => {
    const result = await request(app)
      .get('/user/me/favorites')
      .set('x-access-token', userJwt)
      .expect(200);

      expect(result.body.length).toEqual(1);
      expect(result.body[0].word).toEqual('knight');
  });

  it('should unfavorite a word', async () => {
    const result = await request(app)
      .delete('/entries/en/knight/unfavorite')
      .set('x-access-token', userJwt)
      .expect(200);

      expect(result.body).toHaveProperty('message');
  });

  it('should list no favorited word', async () => {
    const result = await request(app)
      .get('/user/me/favorites')
      .set('x-access-token', userJwt)
      .expect(200);

      expect(result.body.length).toEqual(0);
  });
});