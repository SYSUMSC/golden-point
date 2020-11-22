import React, { useState } from 'react';
import { PrimaryButton, TextField } from '@fluentui/react';
import { makeApiPath } from '../../utils';

async function submitName(name) {
  return fetch(makeApiPath('join'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ name })
  })
    .then((response) => response.json())
    .then((r) => r?.id);
}

export function NameInput({ onNameSubmitted }) {
  const [name, setName] = useState('');
  const [submittingName, setSubmittingName] = useState(false);
  return (
    <div className="controlContainer">
      <TextField
        className="textField"
        value={name}
        onChange={(_, newValue) => setName(newValue)}
        disabled={submittingName}
        placeholder="输入你的大名"
      />
      <PrimaryButton
        className="button"
        text={submittingName ? '提交中' : '提交'}
        disabled={submittingName || !name}
        onClick={() => {
          setSubmittingName(true);
          submitName(name)
            .then((id) => onNameSubmitted([id, name]))
            .catch(() => setSubmittingName(false));
        }}
      />
    </div>
  );
}
