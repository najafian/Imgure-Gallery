export default function UniqueID(prefix = 'CustomWidget-') {
  const newID = 'xxxx-xxxx-xx'.replace(/[x]/g, function () {
    const random = Math.random() * 16 | 0;
    return random.toString(16);
  });
  return `${prefix}${newID}`;
}

