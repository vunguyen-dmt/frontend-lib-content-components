import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({

  solutionWidgetTitle: {
    id: 'authoring.problemEditor.explanationwidget.explanationWidgetTitle',
    defaultMessage: 'Explanation',
    description: 'Explanation Title',
  },
  solutionDescriptionText: {
    id: 'authoring.problemEditor.solutionwidget.solutionDescriptionText',
    defaultMessage: 'Provide an explanation for the correct answer',
    description: 'Description of the solution widget',
  },
  placeholder: {
    id: 'authoring.problemEditor.questionwidget.placeholder',
    defaultMessage: 'Enter your question',
    description: 'Placeholder text for tinyMCE editor',
  },
});

export default messages;
