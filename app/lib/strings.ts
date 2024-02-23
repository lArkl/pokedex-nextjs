export const capitalize = (sentence: string): string => {
  return sentence
    .split(' ')
    .map((word) => {
      if (word.length > 1) {
        return word[0].toUpperCase() + word.substring(1)
      }
      if (word.length === 1) {
        return word[0].toUpperCase()
      }
      return word
    })
    .join(' ')
}
