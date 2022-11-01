import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import { BaseFeature } from '../../BaseFeature';
import { AddCommentsSidebar } from './AddCommentsSidebar';
import {
  interceptFunction,
  getAllFlowBlock,
  getBlockById,
  getSelectedNodes
} from '~/Utils';
import { AddCommentOption } from './AddCommentOption';
import * as Constants from './Constants';

export class AddCommentsOfBlocks extends BaseFeature {
  public static shouldRunOnce = true;
  private idsList = [];

  private getSidebar(): HTMLElement {
    return document.getElementById(Constants.ADD_COMMENT_SIDEBAR_ID);
  }

  private openSidebar = (): void => {
    if (!this.getSidebar()) {
      // Creates and append the sidebar to the dom
      const blipsSidebar = document.createElement('div');

      blipsSidebar.setAttribute('id', Constants.ADD_COMMENT_SIDEBAR_ID);
      ReactDOM.render(
        <AddCommentsSidebar
          onEditComment={this.onEditComment}
          onClose={this.closeSidebar}
        />,
        blipsSidebar
      );

      const mainArea = document.getElementById(Constants.MAIN_CONTENT_AREA);
      mainArea.appendChild(blipsSidebar);

      // Waits for a moment and then fades the sidebar in
      const customSidebar = this.getSidebar().children.item(0);
      interceptFunction('closeSidebar', this.closeSidebar);

      setTimeout(() => {
        customSidebar.classList.add('ng-enter-active');
      }, 200);
    } else {
      return this.closeSidebar();
    }
  };

  private closeSidebar = (): void => {
    const sidebar = this.getSidebar();

    if (sidebar) {
      sidebar.remove();
    }
  };

  // Parei aqui
  private onEditComment = (text: string): void => {
    console.log('Recebido comentário com o texto: ' + text)
    
    const onboardingBlock = getBlockById('onboarding');
    const newCommentId = uuid();

    if(onboardingBlock.addonsComments) {
      onboardingBlock.addonsComments[newCommentId] = text;
    } else {
      onboardingBlock.addonsComments = {};
      onboardingBlock.addonsComments[newCommentId] = text;
    }

    for(const id of this.idsList){
      const block = getBlockById(id);   
      if(block.addonsSettings && block.addonsSettings.commentsIdList){
        block.addonsSettings.commentsIdList.push(newCommentId);
      } else {
        block.addonsSettings = {
          ...block.addonsSettings, commentsIdList: [newCommentId]
        };
      }
    }
  };

  private createBlockOptionsDiv(): HTMLElement {
    const blipsDiv = document.createElement('div');
    blipsDiv.setAttribute('class', Constants.CONTEXT_MENU_OPTION_CLASSES);
    return blipsDiv;
  }

  public menuOptionElementHandle = (): void => {
    this.idsList = getSelectedNodes();
    this.openSidebar();
  };

  private addEditOptionOnBlockById(id: string): void {
    const menuOptionsList = document.querySelector(
      `${Constants.BUILDER_HTML_BLOCK_TAG}[id="${id}"]:not(.subflow-block) .${Constants.BUILDER_NODE_MENU} .${Constants.CONTEXT_MENU_CLASS}`
    );

    if (menuOptionsList) {
      const editOption = menuOptionsList.querySelector(Constants.ADD_COMMENT_CLASS);

      if (!editOption) {
        const menuOptionElement = this.createBlockOptionsDiv();
        ReactDOM.render(
          <AddCommentOption onClick={this.menuOptionElementHandle} />,
          menuOptionElement
        );
        menuOptionsList.insertBefore(
          menuOptionElement,
          menuOptionsList.children[Constants.DELETE_OPTION_BLOCK_POSITION]
        );
      }
    }
  }

  private addEditOptionInAllBlocks = (): void => {
    const blocks = getAllFlowBlock();
    for (const block of blocks) {
      this.addEditOptionOnBlockById(block.id);
    }
  };

  public handle(): boolean {
    this.addEditOptionInAllBlocks();
    return true;
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup(): void {
    this.closeSidebar();
  }
}
