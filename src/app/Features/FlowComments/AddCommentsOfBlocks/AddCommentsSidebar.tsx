import { BdsButton } from 'blip-ds/dist/blip-ds-react';
import * as React from 'react';
import { Block, Input, HorizontalStack, Paragraph } from '~/Components';
import { showSuccessToast } from '~/Utils';

export type AddCommentsSidebarProps = {
  onEditComment: (text: string) => void;
  onClose: () => void;
};

export const AddCommentsSidebar = ({
  onEditComment,
  onClose,
}: AddCommentsSidebarProps): JSX.Element => {
  const [textComment, setTextComment] = React.useState('');

  const handleSubmit = (): void => {
    onEditComment(textComment);
    showSuccessToast('Comentário salvo com sucesso!');
  };

  return (
    <>
      <div
        id="blips-custom-sidebar"
        className="sidebar-content-component left-entrance-animation position-left builder-sidebar ng-enter"
      >
        <div className="sidebar-content-header background-text-dark-5 bp-c-white ph5 pt2">
          <div className="sidebar-helper-header">
            <input
              className="bp-c-white w-100 sidebar-title"
              id="sidebar-title"
              maxLength={50}
              type="text"
              name="nodeName"
              value="Editor de comentários"
              readOnly
            />

            <div className="sidebar-helper-header__actions">
              <span>
                <i
                  className="icon-close cursor-pointer"
                  id="addictions-menu-close"
                  onClick={onClose}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="sidebar-content-body">
          <Block paddingX={2.5} paddingY={1}>
            <Paragraph>
              Insira o seu comentário abaixo. <br/>
              O comentário deve conter apenas texto.
            </Paragraph>
            <div className="ml2" style={{ marginTop: '4px' }}>
              <Input
                value={textComment}
                onChange={(e) => setTextComment(e.target.value)}
                //onSubmit={(e) => setTextComment(e.target.value)}
                label="Insira o seu comentário"
                type="text"
                isTextarea={true}
                rows={30}
              />
            </div>
          </Block>

          <HorizontalStack marginTop={2} style={{ paddingLeft: '2rem' }}>
            <BdsButton type="submit" variant="primary" onClick={handleSubmit}>
              Salvar
            </BdsButton>
          </HorizontalStack>
        </div>
      </div>
    </>
  );
};
