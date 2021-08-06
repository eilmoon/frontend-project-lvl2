const parser = {
  '.json': JSON.parse
};

const getParser = format =>
  (data) => {
    const parse = parser[format];
    if (!parse) {
      throw new Error(`File has unsupported format: ${format}`);
    }
    return parse(data);
  };

export default getParser;
