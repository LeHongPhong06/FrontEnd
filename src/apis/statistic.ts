import instance from './instance';

export const statisticApi = {
  getStatisticMonth: async (payload: any) => {
    const url = 'statistic/month';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error) {}
  },
  getStatisticYear: async (payload: any) => {
    const url = 'statistic/year';
    try {
      const res = await instance.post(url, payload);
      return res.data;
    } catch (error) {}
  },
};
