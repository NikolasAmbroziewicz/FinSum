import { describe, it, expect } from 'vitest';
import BaseTemplate, { IBaseTemplate } from './BaseTemplate';

const templateProps: IBaseTemplate = {
  sampleTextProp: 'text'
};

describe('BaseTemplate', () => {
  it('defined', () => {
    expect(BaseTemplate(templateProps)).toMatchSnapshot();
  });
});
