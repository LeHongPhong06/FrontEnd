export const calcFileSize = (size: number) => {
  const fileSizeInMB = size / (1024 * 1024);
  if (fileSizeInMB < 1) {
    return `${size} KB`;
  } else if (fileSizeInMB < 1024) {
    return `${fileSizeInMB.toFixed(2)} MB`;
  } else {
    return `${(fileSizeInMB / 1024).toFixed(2)} GB`;
  }
};
