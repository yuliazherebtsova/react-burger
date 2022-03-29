function getHowLongAgoDate(dateString: string): string {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat([], { timeStyle: 'long' });

  const diffDays = Math.round(
    Math.abs((today.valueOf() - date.valueOf()) / oneDay)
  );

  if (diffDays < 1) {
    return `Сегодня, ${formatter.format(date)}`;
  }
  if (diffDays >= 1 && diffDays < 2) {
    return `Вчера, ${formatter.format(date)}`;
  }
  return `${diffDays} дн. назад, ${formatter.format(date)}`;
}

export default getHowLongAgoDate;
