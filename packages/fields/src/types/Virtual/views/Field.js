/** @jsx jsx */

import { jsx } from '@emotion/core';
import { Component } from 'react';

import { colors, gridSize } from '@arch-ui/theme';
import { ShieldIcon } from '@arch-ui/icons';

import { FieldContainer } from '@arch-ui/fields';
import PrettyData from '../prettyData';

export const FieldLabel = props => {
  const accessError = (props.errors || []).find(
    error => error instanceof Error && error.name === 'AccessDeniedError'
  );
  return (
    <span
      css={{
        color: colors.N60,
        fontSize: '0.9rem',
        fontWeight: 500,
        paddingBottom: gridSize,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      htmlFor={props.htmlFor}
    >
      {props.field.label}
      {accessError ? (
        <ShieldIcon title={accessError.message} css={{ color: colors.N20, marginRight: '1em' }} />
      ) : null}
    </span>
  );
};

export default class VirtualField extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { field, errors, value: serverValue } = this.props;
    const value = serverValue || '';
    const canRead = errors.every(
      error => !(error instanceof Error && error.name === 'AccessDeniedError')
    );

    return (
      <FieldContainer>
        <FieldLabel field={field} errors={errors} />
        <PrettyData data={canRead ? value : undefined} />
      </FieldContainer>
    );
  }
}
