import './UserStatus.scss';
import React from 'react';
import { Label, Persona, PersonaSize } from '@fluentui/react';

export function UserStatus({ id, name }) {
  return (
    <div className="userStatusContainer">
      <Label>你的身份</Label>
      <Persona className="profile" text={name} size={PersonaSize.size32} />
    </div>
  );
}
