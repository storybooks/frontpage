import React from 'react';
import { storiesOf } from '@storybook/react';

import BenefitItem from './BenefitItem';
import Badge from './Badge';

storiesOf('Screens/IndexScreen/BenefitItem', module)
  .add('default', () => (
    <BenefitItem
      image={<img src="home/build-canvas.png" />}
      title="Build components in isolation"
      desc="Create components without needing to stand up screens, fuss with data, or build business logic."
    />
  ))
  .add('w/children', () => (
    <BenefitItem
      image={<img src="home/build-cases.png" />}
      title="Build components in isolation"
      desc="Create components without needing to stand up screens, fuss with data, or build business logic."
    >
      <Badge status="positive">Coming soon</Badge>
    </BenefitItem>
  ));