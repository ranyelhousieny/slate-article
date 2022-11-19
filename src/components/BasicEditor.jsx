import React from 'react';
import { createEditor } from 'slate';
import {
  Slate,
  Editable,
  withReact,
} from 'slate-react';

const editor = withReact(
  createEditor()
);

const BasicEditor = () => {
  return (
    <Slate
      editor={editor}
      value={initialDocument}>
      {' '}
      <Editable />
    </Slate>
  );
};

const initialDocument = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is the text from the initial document',
      },
    ],
  },
];

export default BasicEditor;
