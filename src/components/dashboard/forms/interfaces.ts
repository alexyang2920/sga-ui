export interface SGAForm {
  id: number;
  title: string;
  description: string;
  questions: SGAQuestion[];
}

export type QUESTION_TEXT = 'Text';
export type QUESTION_MC = 'MultipleChoice';
export type QUESTION_CB = 'CheckBox';
export type QUESTION_FU = 'FileUpload';
export type QUESTION_DT = 'DateTime';

export interface SGAQuestion {
  id: number;
  formId: number;
  description: string;
  required?: boolean;
  order: number;
  type: QUESTION_TEXT | QUESTION_MC | QUESTION_CB | QUESTION_FU | QUESTION_DT;
}

export interface ChoiceOption {
  id: number;
  description: string;
  order: number;
}

export interface TextQuestion extends SGAQuestion {
  maxLength: number | null;
}

export interface MultiChoiceQuestion extends SGAQuestion {
  choices: ChoiceOption[];
}

export interface CheckBoxQuestion extends SGAQuestion {
  choices: ChoiceOption[];
}

export interface DateTimeQuestion extends SGAQuestion {
  start: string | null;
  end: string | null;
}

export interface FileUploadQuestion extends SGAQuestion {
  fileType: string;
  maxFileSize: number;
}

export interface SGAFormResponse {
  id: number;
  formId: number;
  userId: number;
}

export interface SGAAnswer {
  id: number;
  responseId: number;
	questionId: number;
}

export interface TextAnswer extends SGAAnswer {
  value: string | null;
}

export interface MultipleChoiceAnswer extends SGAAnswer {
  value: number | null;
}

export interface CheckBoxAnswer extends SGAAnswer {
  value: number[];
}

export interface DateTimeAnswer extends SGAAnswer {
  value: string | null;
}

export interface FileUploadAnswer extends SGAAnswer {
  value: string | null; // path location.
}
