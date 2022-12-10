export const truncate = (text: any, limit?: number) => {
  if (typeof text !== 'string' || !limit) {
    return text;
  }

  if (text.length <= limit) {
    return text;
  }

  return text.slice(0, limit) + '...';
};
