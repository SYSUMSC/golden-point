import './NumberStatus.scss';
import { Label } from '@fluentui/react';
import React from 'react';

export function NumberStatus({ number }) {
  return (
    <div className="numberStatusContainer">
      <Label>你的数字</Label>
      <div className="number">
        <code>{number}</code>
      </div>
    </div>
  );
}
