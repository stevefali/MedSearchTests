const getInteractorMatch = (interactions, query) => {
  const sentences = interactions.split(".");
  const foundSentences = [];

  sentences.forEach((sentence) => {
    if (sentence.toLowerCase().includes(query.toLowerCase())) {
      foundSentences.push(sentence);
    }
  });
  return foundSentences;
};

module.exports = getInteractorMatch;
