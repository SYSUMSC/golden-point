import React, { useState } from 'react';
import { PrimaryButton, Slider } from '@fluentui/react';
import { makeApiPath } from '../../utils';
import './NumberInput.scss';

async function submitNumber(userId, number) {
  return fetch(makeApiPath('number'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ id: userId, appliedNumber: number })
  });
}

export function NumberInput({ onNumberSubmitted, userId }) {
  const [number, setNumber] = useState(Math.floor(Math.random() * 98) + 1);
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="controlContainer">
      <Slider
        className="slider"
        label="你的数字"
        showValue
        min={1}
        max={99}
        value={number}
        disabled={submitting}
        onChange={(value) => setNumber(value)}
      />
      <PrimaryButton
        className="button"
        text={submitting ? '提交中' : '提交'}
        disabled={submitting}
        onClick={() => {
          setSubmitting(true);
          submitNumber(userId, number)
            .then(() => onNumberSubmitted(number))
            .catch(() => setSubmitting(false));
        }}
      />
    </div>
  );
}
