import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  contentSaveFailed: {
    id: 'authoring.editorfooter.save.error',
    defaultMessage: 'Error: Content save failed. Please check recent changes and try again later.',
    description: 'Error message displayed when content fails to save.',
  },
  cancelButtonAriaLabel: {
    id: 'authoring.editorfooter.cancelButton.ariaLabel',
    defaultMessage: 'Discard changes and return to learning context',
    description: 'Screen reader label for cancel button',
  },
  cancelButtonLabel: {
    id: 'authoring.editorfooter.cancelButton.label',
    defaultMessage: 'Cancel',
    description: 'Label for cancel button',
  },
  saveButtonAriaLabel: {
    id: 'authoring.editorfooter.savebutton.ariaLabel',
    defaultMessage: 'Save changes and return to learning context',
    description: 'Screen reader label for save button',
  },
  saveButtonLabel: {
    id: 'authoring.editorfooter.savebutton.label',
    defaultMessage: 'Save',
    description: 'Label for Save button',
  },
});

export default messages;
