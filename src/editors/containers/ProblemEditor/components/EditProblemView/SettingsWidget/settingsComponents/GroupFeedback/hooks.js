import { useState, useEffect } from 'react';
import _ from 'lodash-es';
import messages from './messages';
import * as module from './hooks';

export const state = {
  summary: (val) => useState(val),
};

export const groupFeedbackCardHooks = (groupFeedbacks, updateSettings, answerslist) => {
  const [summary, setSummary] = module.state.summary({ message: messages.noGroupFeedbackSummary, values: {} });

  useEffect(() => {
    if (groupFeedbacks.length === 0) {
      setSummary({ message: messages.noGroupFeedbackSummary, values: {} });
    } else {
      const feedbacksInList = groupFeedbacks.map(({ answers, feedback }) => {
        const answerIDs = answerslist.map((a) => a.id);
        const answersString = answers.filter((value) => answerIDs.includes(value));
        return `${answersString} ${feedback}\n`;
      });
      setSummary({
        message: messages.groupFeedbackSummary,
        values: { groupFeedback: feedbacksInList },
      });
    }
  }, [groupFeedbacks, answerslist]);

  const handleAdd = () => {
    let newId = 0;
    if (!_.isEmpty(groupFeedbacks)) {
      newId = Math.max(...groupFeedbacks.map(feedback => feedback.id)) + 1;
    }
    const groupFeedback = { id: newId, answers: [], feedback: '' };
    const modifiedGroupFeedbacks = [...groupFeedbacks, groupFeedback];
    updateSettings({ groupFeedbackList: modifiedGroupFeedbacks });
  };

  return {
    summary,
    handleAdd,
  };
};

export const groupFeedbackRowHooks = ({ id, groupFeedbacks, updateSettings }) => {
  // Hooks for the answers associated with a groupfeedback
  const addSelectedAnswer = ({ value }) => {
    const oldGroupFeedback = groupFeedbacks.find(x => x.id === id);
    const newAnswers = [...oldGroupFeedback.answers, value];
    const newFeedback = { ...oldGroupFeedback, answers: newAnswers };
    const remainingFeedbacks = groupFeedbacks.filter((item) => (item.id !== id));
    const updatedFeedbackList = [newFeedback, ...remainingFeedbacks].sort((a, b) => a.id - b.id);

    updateSettings({ groupFeedbackList: updatedFeedbackList });
  };
  const removedSelectedAnswer = ({ value }) => {
    const oldGroupFeedback = groupFeedbacks.find(x => x.id === id);
    const newAnswers = oldGroupFeedback.answers.filter(item => item !== value);
    const newFeedback = { ...oldGroupFeedback, answers: newAnswers };
    const remainingFeedbacks = groupFeedbacks.filter((item) => (item.id !== id));
    const updatedFeedbackList = [newFeedback, ...remainingFeedbacks].sort((a, b) => a.id - b.id);

    updateSettings({ groupFeedbackList: updatedFeedbackList });
  };
  const handleAnswersSelectedChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      addSelectedAnswer({ value });
    } else {
      removedSelectedAnswer({ value });
    }
  };

  // Delete Button
  const handleDelete = () => {
    const modifiedGroupFeedbacks = groupFeedbacks.filter((item) => (item.id !== id));
    updateSettings({ groupFeedbackList: modifiedGroupFeedbacks });
  };

  // Hooks for the feedback associated with a groupfeedback
  const handleFeedbackChange = (event) => {
    const { value } = event.target;
    const modifiedGroupFeedback = groupFeedbacks.map(groupFeedback => {
      if (groupFeedback.id === id) {
        return { ...groupFeedback, feedback: value };
      }
      return groupFeedback;
    });
    updateSettings({ groupFeedbackList: modifiedGroupFeedback });
  };

  return {
    handleAnswersSelectedChange, handleFeedbackChange, handleDelete,
  };
};
