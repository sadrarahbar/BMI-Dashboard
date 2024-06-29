import { Form, FormItemProps } from 'antd';
import React, { useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';

interface TinyMceEditorProps extends FormItemProps {
  name: string;
  label: string;
  initialValue?: string;
  required?: boolean;
}

const TinyMceEditor: React.FC<TinyMceEditorProps> = ({
  name,
  label,
  initialValue = '',
  required = false,
  ...restProps
}) => {
  const editorRef = useRef(null);
  //     const log = () => {
  //         if (editorRef.current) {
  //             console.log(editorRef.current.getContent());
  //         }
  //     };
  // console.log('object');
  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={initialValue}
      rules={[{ required, message: `${label} را وارد کنید` }]}
      valuePropName="data"
      getValueFromEvent={(e) => e.target.getContent()}
      {...restProps}
    >
      <Editor
        apiKey="q453lwkhxfhertnx0w8i3kkipy5usvn8dc4796binfjomtya"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          menubar: false,
          width: '100%',
          height: 300,
          plugins: [
            'advlist',
            'autolink',
            'link',
            'image',
            'lists',
            'charmap',
            'preview',
            'anchor',
            'pagebreak',
            'searchreplace',
            'wordcount',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'emoticons',
            'help',
          ],
          toolbar:
            'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
            'forecolor backcolor emoticons | help | code',
        }}
      />
    </Form.Item>
  );
};

export default TinyMceEditor;
