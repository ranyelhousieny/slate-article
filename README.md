Main Article at https://www.linkedin.com/pulse/basic-rich-text-editor-using-slate-rany-elhousieny-phd%25E1%25B4%25AC%25E1%25B4%25AE%25E1%25B4%25B0

Let's create a react app to use slate in it.

npx create-react-app slate-article

Add alt text
No alt text provided for this image

After It finishes, change the directory and npm start

cd slate-article

npm start
Installing Slate:

npm i slate slate-react slate-history immutable
Now let’s instantiate the core component, which is the Editor object.

Create a folder for the components under src and inside it, create a file named BasicEditor.jsx

Add alt text
No alt text provided for this image
Inside BasicEditor.jsx, create a react functional component using (rafce)

Add alt text
No alt text provided for this image

Add alt text
No alt text provided for this image
Let's render the BasicEditor component inside App;jsx as follows:

import BasicEditor from './components/BasicEditor'

function App() {
return (
<div>
<BasicEditor />
</div>
);
}

export default App;

Add alt text
No alt text provided for this image
Of course, you will only see the word BasicEditor on the browser.

Add alt text
No alt text provided for this image
createEditor

createEditor() is the Slate Editor factory. It will create the basic SlateJS editor instance. We will use this instance to add to the basic editor, as we will see later.

First, we need to import createEditor from Slate inside the BasicEditor.jsx file.

import { createEditor } from 'slate'
To create an Editor object, we use createEditor().

const editor =
createEditor();
Next up is to render a <Slate> context provider as follows:

import { Slate } from 'slate-react';

      <Slate
        editor={
          editor
        }></Slate>

Add alt text
No alt text provided for this image

However, nothing will show on the screen because we did not pass an initial value to the Editor. To do that, we need to create an initial document using the Slate schema as follows:

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
The schema has a type (ex: paragraph) and children (ex: the text in this paragraph)

We will pass this document to the value attribute as follows:

<Slate
editor={editor}
value={
initialDocument
}></Slate>

Add alt text
No alt text provided for this image

Finally, we need to add the <Editable /> component. Editable is the component that renders the document hierarchy for editing.

import { createEditor } from 'slate';
import {
Editable,
Slate,
} from 'slate-react';

const Editor = () => {
const editor =
createEditor();

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

return (
<>
<div>Editor</div>
<Slate
editor={editor}
value={
initialDocument
}>
<Editable />
</Slate>
</>
);
};

export default Editor;

Add alt text
No alt text provided for this image

You will find the browser as follows (note you will be able to add text but can not delete)

Add alt text
No alt text provided for this image
To make it fully editable, you need to use withReact() plugin as follows:

// dependencies imported as below.
import { withReact } from "slate-react";

const editor = withReact(createEditor());

Add alt text
No alt text provided for this image
withReact is a SlateJS plugin that adds React and DOM behaviors to the editor object. Now, you will be able to add and delete as follows:

Add alt text
No alt text provided for this image
Convert to Typescript

To convert Editor.jsx to Typescript Editor.tsx, we need to extend the Editor with ReactEditor and add annotations as per the documentation on TypeScript. The example below also includes the custom types required for the rest of this example. To define a custom Element or Text type, extend the CustomTypes interface in the slate module like this.

// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
interface CustomTypes {
Editor: BaseEditor & ReactEditor
Element: CustomElement
Text: CustomText
}
}
Annotate the editor’s initial document w/ Descendant[].

(alias) type Descendant = CustomText | CustomElement

import Descendant from ‘slate’

The Descendant union type represents nodes that are descendants in the tree. It is returned as a convenience in certain cases to narrow a value further than the more generic Node union.

import { Descendant } from 'slate'
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
Here is the Editor.tsx

import {
createEditor,
BaseEditor, //For Typescript
Descendant, //For Typescript
} from 'slate';
import {
Editable,
Slate,
withReact,
ReactEditor, //For Typescript
} from 'slate-react';

//For Typescript: Defining paragraph and Text

type CustomElement = {
type: 'paragraph';
children: CustomText[];
};

type CustomText = {
text: string;
};

//For Typescript: Slate interface
declare module 'slate' {
interface CustomTypes {
Editor: BaseEditor &
ReactEditor;
Element: CustomElement;
Text: CustomText;
}
}

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

const Editor = () => {
const editor = withReact(
createEditor()
);

return (
<>
<div>Editor</div>
<Slate
editor={editor}
value={
initialDocument
}>
<Editable />
</Slate>
</>
);
};

export default Editor;
