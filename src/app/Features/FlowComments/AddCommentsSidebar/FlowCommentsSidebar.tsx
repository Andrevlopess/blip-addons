import * as React from 'react';
import { BdsButton, BdsIcon, BdsInput } from 'blip-ds/dist/blip-ds-react';
import {
  Block,
  Flex,
  HorizontalStack,
  Input,
  Paragraph,
  Stack,
  BlipAccordion,
  BlipAccordionItem,
  BlipAccordionHeader,
  BlipAccordionButton,
  BlipAccordionBody,
} from '@components';
import { showSuccessToast } from '~/Utils';
//import { GlobalInactivityForm } from '~/Features/SetInactivity/GlobalInactivityForm';

export type FlowCommentsSidebarProps = {
  onClose: () => void;
  commentsObj: any;
  onRemoveComment: (updatedComments: any, removedComment: any) => any;
  onEditComment: (updatedComments: any) => any;
};

export const FlowCommentsSidebar = ({
  onClose,
  commentsObj,
  onRemoveComment,
  onEditComment,
}: FlowCommentsSidebarProps): JSX.Element => {
  const [comments, setComments] = React.useState(commentsObj);
  const [isEditingCommentsArray, setIsEditingCommentsArray] = React.useState(new Array(Object.values(commentsObj).length).fill(false));

  const removeLine = (index: string): void => {
    const updatedComments = comments.filter((_, i) => i !== index); // Mudar isso aquiiiiiiiii
    const removedComment = comments.filter((_, i) => i === index);
    setComments(updatedComments);
    onRemoveComment(updatedComments, removedComment);
    showSuccessToast('Comentário salvo com sucesso!');
  };

  return (
    <>
      <div
        id="blips-custom-flowcommentsidebar"
        className="sidebar-content-component left-entrance-animation position-left builder-sidebar ng-enter"
      >
        <div className="sidebar-content-header background-text-dark-5 bp-c-white ph5 pt2">
          <div className="sidebar-helper-header">
            <input
              className="bp-c-white w-100 sidebar-title"
              id="flowcomments-sidebar-title"
              maxLength={50}
              type="text"
              name="nodeName"
              value="Comentários"
              readOnly
            />

            <div className="sidebar-helper-header__actions">
              <span>
                <i
                  className="icon-close cursor-pointer"
                  id="blipaddons-flowcomment-menu-close"
                  onClick={onClose}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="sidebar-content-body">
          <Block paddingX={2.5} paddingY={1}>
            <p>Teste</p>
            <p>{isEditingCommentsArray}</p>
          </Block>

          <Block width="100%">
            {Object.values(comments).map((field: string, index: number) => {
              return (
                <HorizontalStack marginTop={2} key={field}>
                  {/*<BdsInput
                    value={comments[field]}
                    //disabled={true}
                    onChange={() => removeLine(field)}
                    onSubmit={() => removeLine(field)}
                    label="Insira o seu comentário"
                    type="text"
                    isTextarea={true}
                    rows={5}
              />*/}
                  { isEditingCommentsArray[index] ? 
                    <p>{comments[field]}</p> :
                    <BdsInput
                    value={comments[field]}
                    //disabled={true}
                    onChange={() => removeLine(field)}
                    onSubmit={() => removeLine(field)}
                    label="Insira o seu comentário"
                    type="text"
                    isTextarea={true}
                    rows={5}
              />

                  }
                  <Flex className="justify-between">
                    <div style={{ alignSelf: 'center', cursor: 'pointer' }}>
                      <BdsIcon
                        name="trash"
                        color="red"
                        onClick={() => removeLine(field)}
                      />
                    </div>
                    <div style={{ alignSelf: 'center', cursor: 'pointer' }}>
                      <BdsIcon
                        name="edit"
                        color="black"
                        onClick={() => removeLine(field)}
                      />
                    </div>
                  </Flex>
                </HorizontalStack>
              );
            })}
          </Block>
          <Block paddingX={2.5} paddingY={1}>
            <p>Teste 2</p>
          </Block>
        </div>
      </div>
    </>
  );
};

/*
comments.map((field, index) => {
                return (
                  <BlipAccordionItem borderTop={0} key={field.id}>
                    <BlipAccordionHeader>
                      <Flex className="justify-between">
                        <BlipAccordionButton
                          title={field.key || 'Novo Snippet'}
                        />
                        <div style={{ alignSelf: 'center', cursor: 'pointer' }}>
                          <BdsIcon
                            name="trash"
                            color="red"
                            onClick={() => removeLine(index)}
                          />
                        </div>
                      </Flex>
                    </BlipAccordionHeader>
                    <BlipAccordionBody>
                      <Flex gap={1} style={{ marginBottom: '12px' }}>
                        <div style={{ width: '95%' }}>
                          <Input
                            value={field.key}
                            onChange={(e) => {
                              setComments(
                                comments.map((personalSnippets, i) => {
                                  return i === index
                                    ? {
                                        ...personalSnippets,
                                        key: e.target.value,
                                      }
                                    : personalSnippets;
                                })
                              );

                              field.key = e.target.value;
                            }}
                            label="Insira o comentário"
                            type="text"
                          />
                        </div>
                      </Flex>
                    </BlipAccordionBody>
                  </BlipAccordionItem>
                );
              })
*/
