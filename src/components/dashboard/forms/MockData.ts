import { MultiChoiceQuestion, CheckBoxQuestion, SGAForm } from './interfaces';

export const mockFormsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(formId => {

  const questionIds = [1, 2, 3].map(x => formId * 10 + x);

  return {
    id: formId,
    title: "Test One",
    description: "This is a test description",
    questions: [
      {
        id: questionIds[0],
        formId: formId,
        order: 1,
        type: 'Text',
        description: "What's your name?",
      },
      {
        id: questionIds[1],
        formId: formId,
        order: 2,
        type: 'MultipleChoice',
        description: "What's your favorite Food?",
        choices: [{
          id: 10 * questionIds[1] + 1,
          description: 'Rice',
        }, {
          id: 10 * questionIds[1] + 2,
          description: 'Orange',
        }]
      } as MultiChoiceQuestion,
      {
        id: questionIds[2],
        formId: formId,
        order: 3,
        type: 'CheckBox',
        description: "What's your prefer colors?",
        choices: [{
          id: 10 * questionIds[2] + 1,
          description: 'Purple',
        }, {
          id: 10 * questionIds[2] + 2,
          description: 'Green',
        }]
      } as CheckBoxQuestion
    ]
  }
}) as SGAForm[];
