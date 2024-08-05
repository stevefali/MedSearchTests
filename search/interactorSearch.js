const getInteractorMatch = (fdaString, query) => {
  // Remove everything inside []'s and numbers inside ()'s, but leave words inside ()'s.
  const cleanedFdaString = fdaString.replace(
    /(\[.*?\])|(\([^a-z].*?\))|(\s\d\.\d*?\s)|(^\d)/g,
    ""
  );

  const sentences = cleanedFdaString.split(/(\.)([^e.g.,])/);
  const foundSentences = [];

  sentences.forEach((sentence) => {
    if (sentence.toLowerCase().includes(query.toLowerCase())) {
      foundSentences.push(sentence);
    }
  });
  return foundSentences;
};

module.exports = getInteractorMatch;
