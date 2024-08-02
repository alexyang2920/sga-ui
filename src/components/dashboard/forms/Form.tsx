import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Anchor, Checkbox, Group, Input, Radio, Stack, Text } from '@mantine/core';
import { CheckBoxAnswer, CheckBoxQuestion, SGAForm } from './interfaces';
import { mockFormsData } from './MockData';

export function DashboardForm() {
  const { id } = useParams<{ id: string }>();
  const formId = Number(id);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<SGAForm | null>(null);
  useEffect(() => {
    const items = mockFormsData.filter(x => x.id === formId);
    if (items.length > 0) {
      setForm(items[0]);
    }
  }, [id]);



  const questions = form?.questions.map((question) => {

    return (
      <>
        <Text size='md' fw={600}>{question.description}</Text>
        {
          question.type === 'Text' && (
            <Input.Wrapper>
              <Input placeholder="Input inside Input.Wrapper" />
            </Input.Wrapper>
          )
        }
        {
          question.type === 'MultipleChoice' && (
            <Radio.Group
              name="favoriteFramework"
            >
              <Group mt="xs">
                <Radio value="react" label="React" />
                <Radio value="svelte" label="Svelte" />
                <Radio value="ng" label="Angular" />
                <Radio value="vue" label="Vue" />
              </Group>
            </Radio.Group>
          )
        }
        {
          question.type === 'CheckBox' && (
            <Stack>
              <Checkbox checked={false} onChange={() => { }} label="Default checkbox" />
              <Checkbox checked={false} onChange={() => { }} indeterminate label="Indeterminate checkbox" />
              <Checkbox checked onChange={() => { }} label="Checked checkbox" />
              <Checkbox checked variant="outline" onChange={() => { }} label="Outline checked checkbox" />
            </Stack>
          )
        }
      </>
    );
  });

  return (
    <>
      {form && (
        <>
          <Text size="xl" fw={900}>
            {form.title}
          </Text>
          <Anchor onClick={() => { setEditing(!editing); }}>
            {editing ? 'Save' : 'Edit'}
          </Anchor>
          <Text>{form.description}</Text>
          {questions}
        </>
      )}
      {!form && (
        <Text>Loading...</Text>
      )}
    </>
  );
}

function renderCheckBoxQuestion(question: CheckBoxQuestion) {
  const [answer, setAnswer] = useState<CheckBoxAnswer>();

  return (
    <Stack>
    <Checkbox onChange={() => { }} label="Default checkbox" />
    <Checkbox onChange={() => { }} indeterminate label="Indeterminate checkbox" />
    <Checkbox checked onChange={() => { }} label="Checked checkbox" />
    <Checkbox checked variant="outline" onChange={() => { }} label="Outline checked checkbox" />
  </Stack>
  );
}