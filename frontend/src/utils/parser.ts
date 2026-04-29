export const parseStreamingContent = (fullText: string) => {
  const answerMatch = fullText.match(/<ANSWER>([\s\S]*?)<\/ANSWER>/);
  const followUpsMatch = fullText.match(/<FOLLOW_UPS>([\s\S]*?)<\/FOLLOW_UPS>/);
  const sourcesMatch = fullText.match(/<SOURCES>([\s\S]*?)<\/SOURCES>/);
  
  // Clean up the follow-ups into an array
  const questions = followUpsMatch 
    ? [...followUpsMatch[1].matchAll(/<question>(.*?)<\/question>/g)].map(m => m[1])
    : [];

  return {
    answer: answerMatch ? answerMatch[1].trim() : fullText.replace(/<[\s\S]*?>/g, '').trim(),
    followUps: questions,
    sources: sourcesMatch ? JSON.parse(sourcesMatch[1].trim()) : [],
  };
};

export default parseStreamingContent;