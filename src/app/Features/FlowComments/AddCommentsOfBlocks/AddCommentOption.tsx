import * as React from 'react';

export type AddCommentOptionProps = {
  onClick: () => void;
};

export const AddCommentOption = ({
  onClick,
}: AddCommentOptionProps): JSX.Element => {
  return (
    <div className="addcomment-block-option">
      <span onClick={() => onClick()}>Comentar</span>
    </div>
  );
};
