export default {
  get: jest.fn(() => Promise.resolve({ data: null })),
  post: jest.fn(() => Promise.resolve({ data: null })),
  create: jest.fn(() => {})
};
