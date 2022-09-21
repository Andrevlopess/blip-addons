import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseFeature } from '../../BaseFeature';
import { FlowCommentsButton } from './FlowCommentsButton';
import { FlowCommentsSidebar } from './FlowCommentsSidebar';
import {
  getFlowBlockById,
  interceptFunction,
  getAllFlowBlock,
  getBlockById,
  getContrastColor,
  hexToRgb,
  getSelectedNodes,
  getFlow
} from '~/Utils';

const BLIPS_BUTTON_ID = 'flowcomments-button';
const BLIPS_SIDEBAR_ID = 'flowcomments-sidebar';

export class AddFlowCommentsSidebar extends BaseFeature {
  public static shouldRunOnce = true;

  /**
   * Gets the sidebar
   */
  private getSidebar(): HTMLElement {
    return document.getElementById(BLIPS_SIDEBAR_ID);
  }

  /**
   * Gets the icon
   */
  private getIcon(): HTMLElement {
    return document.getElementById(BLIPS_BUTTON_ID);
  }

  private getComments(): any {
    const onboardingBlock = getBlockById('onboarding');
    return onboardingBlock.addonsComments;
  }

  private onRemoveComment(updatedComments: any, removedComment: any): void {
    console.log('updatedComments: ')
    console.log(updatedComments)
    console.log('removedComment: ')
    console.log(removedComment)
  }

  private onEditComment(updatedComments: any): void {
    console.log('updatedComments: ')
    console.log(updatedComments)
  }

  /**
   * Opens the sidebar by adding it into the DOM
   */
  private openSidebar = (): void => {
    if (!this.getSidebar()) {
      // Creates and append the sidebar to the dom
      const blipsSidebar = document.createElement('div');
      const commentsObj = this.getComments();

      console.log('>> Comentários carregados: ');
      console.log(commentsObj);

      blipsSidebar.setAttribute('id', BLIPS_SIDEBAR_ID);
      ReactDOM.render(
        <FlowCommentsSidebar onClose={this.closeSidebar} commentsObj={commentsObj} onRemoveComment={this.onRemoveComment} onEditComment={this.onEditComment}/>,
        blipsSidebar
      );

      const mainArea = document.getElementById('main-content-area');
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

  /**
   * Closes the sidebar by removing it from the DOM
   */
  private closeSidebar = (): void => {
    const sidebar = this.getSidebar();

    if (sidebar) {
      sidebar.children
        .item(0)
        .classList.add('ng-animate', 'ng-leave', 'ng-leave-active');

      setTimeout(() => {
        sidebar.remove();
      }, 200);
    }
  };

  /**
   * Adds the functionality to copy the block
   */
  public handle(): boolean {
    if (!this.getIcon()) {
      const buttonsList = document.querySelector(
        '.icon-button-list, .builder-icon-button-list'
      );
      const blipsDiv = document.createElement('div');

      blipsDiv.setAttribute('id', BLIPS_BUTTON_ID);
      ReactDOM.render(<FlowCommentsButton onClick={this.openSidebar} />, blipsDiv);
      buttonsList.appendChild(blipsDiv);

      return true;
    }

    return false;
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup(): void {
    const blipsButton = document.getElementById(BLIPS_BUTTON_ID);

    if (blipsButton) {
      blipsButton.remove();
    }

    this.closeSidebar();
  }
}
