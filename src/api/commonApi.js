import { POST } from './baseApi';

const downloadData = () => {
  return POST('banner/yzs-admin/export');
};

export {
  downloadData,
}