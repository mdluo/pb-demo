export const mockData = {
  bars: [30, 60, 80],
  buttons: [10, -20, 15, -40],
  limit: 120,
};

export default async function request() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      resolve({
        data: mockData,
      });
    });
  });
}
