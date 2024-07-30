import React, { Suspense } from 'react';
import { JsonComponent } from '../types';
import componentMap from './componentMap';

// Render Functions
const FormGenerator: React.FC<{ json: JsonComponent; props?: any }> = ({ json, props = {} }) => {
  const { type, props: componentProps, children } = json;
  const Component = componentMap[type];

  if (!Component) {
    return null;
  }

  // Resolve dynamic props
  const resolvedProps = { ...componentProps };
  for (let key in resolvedProps) {
    if (resolvedProps.hasOwnProperty(key)) {
      switch (resolvedProps[key]) {
        case 'handleClose':
          resolvedProps[key] = () => {
            props.setOpen(false);
            props.setCurrentRecord(null);
          };
          break;
        default:
          if (key === 'open') {
            resolvedProps[key] = props.open;
          }
          break;
      }
    }
  }

  if (children && children.length > 0) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...resolvedProps}>
          {children.map((child, index) => (
            <FormGenerator key={index} json={child} props={props} />
          ))}
        </Component>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...resolvedProps} />
    </Suspense>
  );
};
export default FormGenerator;
