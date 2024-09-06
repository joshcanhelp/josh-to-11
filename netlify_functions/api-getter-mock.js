export default async () => {
  return JSON.stringify({
    data: [
      {
        date: "2024-02-12",
        content: "Here is the content for today",
        randomNumber: 412,
      },
      {
        date: "2024-01-02",
        content: "Here is the content for today",
        randomNumber: 123,
      },
      {
        date: "2023-11-20",
        content: "Here is the content for today",
        randomNumber: 172,
      },
      {
        date: "2023-09-19",
        content: "Here is the content for today",
        randomNumber: 9912,
      },
      {
        date: "2023-04-27",
        content: "Here is the content for today",
        randomNumber: 1,
      },
    ],
    total: 5,
  });
};

export const config = {
  path: "api/api-getter-mock.json",
};
