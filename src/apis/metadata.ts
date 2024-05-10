import instance from './instance';

export const metadataApi = {
  getYearSelect: async (): Promise<any> => {
    const url = 'metadata/year';
    try {
      const res = await instance.get(url);
      if (res.data && res.data.success === true) {
        return res.data.data;
      } else {
        return [];
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
