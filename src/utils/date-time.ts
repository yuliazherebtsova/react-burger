function getHowLongAgoDate(dateString: string): string {
  const oneDay = 24 * 60 * 60 * 1000;
  const todayDate = new Date();
  const otherDate = new Date(dateString);
  const formatter = new Intl.DateTimeFormat([], { timeStyle: 'long' });

  const diffDays = Math.round(
    Math.abs((todayDate.valueOf() - otherDate.valueOf()) / oneDay)
  );

  if (
    otherDate.getDate() === todayDate.getDate() &&
    otherDate.getMonth() === todayDate.getMonth() &&
    otherDate.getFullYear() === todayDate.getFullYear()
  ) {
    return `Сегодня, ${formatter.format(otherDate)}`;
  }
  if (diffDays < 2) {
    return `Вчера, ${formatter.format(otherDate)}`;
  }
  return `${diffDays} дн. назад, ${formatter.format(otherDate)}`;
}

export default getHowLongAgoDate;
