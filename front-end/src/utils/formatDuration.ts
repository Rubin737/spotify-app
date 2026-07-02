export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remSeconds = Math.floor(seconds % 60);  // Math.floor here
  return `${minutes}:${remSeconds.toString().padStart(2, "0")}`;
};