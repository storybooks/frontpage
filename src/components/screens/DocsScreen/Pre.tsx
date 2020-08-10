import React, { useEffect, useRef, useState } from 'react';
import { CodeSnippets as DesignSystemCodeSnippets } from '@storybook/design-system';

import { CODE_SNIPPET_CLASSNAME } from './CodeSnippets';

const getIsNestedCodeSnippet = (element) => {
  const { parentElement } = element;

  if (parentElement.tagName === 'BODY') {
    return false;
  }

  if (parentElement.classList.contains(CODE_SNIPPET_CLASSNAME)) {
    return true;
  }

  return getIsNestedCodeSnippet(parentElement);
};

export function Pre({ children }) {
  const [content, setContent] = useState(null);
  const preRef = useRef();

  useEffect(() => {
    if (preRef.current) {
      const isNestedCodeSnippet = getIsNestedCodeSnippet(preRef.current);
      const baseContent = <pre className={children.props.className}>{children}</pre>;

      if (isNestedCodeSnippet) {
        setContent(baseContent);
        return;
      }

      setContent(<DesignSystemCodeSnippets snippets={[{ id: '1', Snippet: () => baseContent }]} />);
    }
  }, [preRef.current]);

  return <div ref={preRef}>{content}</div>;
}