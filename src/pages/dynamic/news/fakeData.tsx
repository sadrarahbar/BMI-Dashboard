import { ProFormProps } from "@ant-design/pro-components"
import { JsonComponent } from "../types"
import { Button, message } from "antd"
// Define the handleCancel function
const handleCancel = () => {
        message.info('Form has been reset');
        // Additional logic for handling cancel can be added here
      };
      
      // Define the submitHandler function
      const submitHandler = (data: any) => {
        console.log('Form submitted with data:', data);
        // Additional logic for form submission can be added here
      };
export const updateNewsJson: JsonComponent =  {
        type: 'Card',
        props: {},
        children: [
          {
            type: 'ProForm',
            props: {
              submitter: {
                searchConfig: {
                  resetText: 'reset',
                  submitText: 'submit',
                },
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                render: (props: ProFormProps) => (
                  <div className="footer">
                    <Button key="submit" type="primary" onClick={() => props.form?.submit()}>
                      Create
                    </Button>
                    <Button key="rest" htmlType="reset" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                ),
              },
              onFinish: (data: any) => submitHandler(data),
            },
            children: [
              {
                type: 'ProFormUploadDragger',
                props: {
                  label: 'Upload Image',
                  name: 'file',
                  rules: [
                    {
                      required: true,
                      message: 'This field is required',
                    },
                  ],
                  title: 'Click or drag file to this area to upload',
                  description: 'jpg - png - jpeg',
                },
              },
              {
                type: 'ProFormText',
                props: {
                  name: 'name',
                  label: 'Name',
                  value:"sara",
                  rules: [
                    {
                      required: true,
                      message: 'This field is required',
                    },
                  ],
                },
              },
              {
                type: 'ProFormSelect',
                props: {
                  name: 'category',
                  label: 'Category',
                  options: [
                    { value: 0, label: 'Category 0' },
                    { value: 1, label: 'Category 1' },
                    { value: 2, label: 'Category 2' },
                  ],
                  rules: [
                    {
                      required: true,
                      message: 'This field is required',
                    },
                  ],
                },
              },
              {
                type: 'ProFormSelect',
                props: {
                  name: 'tags',
                  label: 'Tags',
                  options: [
                    { value: 0, label: 'Tag 0' },
                    { value: 1, label: 'Tag 1' },
                    { value: 2, label: 'Tag 2' },
                  ],
                  mode: 'multiple',
                },
              },
              {
                type: 'ProFormSelect',
                props: {
                  name: 'status',
                  label: 'Status',
                  options: [
                    { value: 'available', label: 'Available' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'sold', label: 'Sold' },
                  ],
                },
              },
            ],
          },
        ],
      }