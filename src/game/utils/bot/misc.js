export const slugify = message => message
  .toLowerCase()
  .replace(/\s/gi, '-')
  .replace(/é|è|ê|ë/gi, 'e')
  .replace(/à/gi, 'a')
  .replace(/ù/gi, 'u')
  .replace(/ñ/gi, 'n')
  .replace(/ç/gi, 'c')
  .replace(/ñ/gi, 'n')
  .replace(/î|ï/gi, 'i')
  .replace(/[\W]|[0-9]|-$/g, '');
