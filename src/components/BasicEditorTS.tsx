import React from 'react';
import {
  createEditor,
  BaseEditor,
  Descendant,
} from 'slate';
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
} from 'slate-react';

const editor = withReact(
  createEditor()
);

const BasicEditorTS = () => {
  return (
    <Slate
      editor={editor}
      value={initialDocument}>
      {' '}
      <Editable />
    </Slate>
  );
};

const initialDocument: Descendant[] =
  [
    {
      type: 'paragraph',
      children: [
        {
          text: 'This is the text from the initial document',
        },
      ],
    },
  ];

type CustomElement = {
  type: 'paragraph';
  children: CustomText[];
};
type CustomText = {
  text: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export default BasicEditorTS;
