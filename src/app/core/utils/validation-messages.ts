export const errorMessages = {
  required: () => 'მოცემული ველი არის სავალდებულო',
  minlength: value => `სავალდებულოა მინიმუმ ${value} სიმბოლო`,
  maxlength: value => `დასაშვებია მაქსიმუმ ${value} სიმბოლო`,
  languagePattern: () => 'გთხოვთ წეროთ მხოლოდ არჩეული ენით',
  numberPattern: () => 'გთხოვთ შეიყვანოთ მხოლოდ რიცხვები',
  mobilePattern: () =>
    `მობილურის ნომერი უნდა იწყებოდეს 5-ით და შეიცავდეს მხოლოდ ციფრებს`,
};
