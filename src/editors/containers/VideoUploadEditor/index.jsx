import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Icon, IconButton } from '@edx/paragon';
import './index.scss';
import { useDispatch } from 'react-redux';
import { ArrowForward, Close, FileUpload } from '@edx/paragon/icons';
import * as hooks from './hooks';
import messages from '../../messages';
import * as editorHooks from '../EditorContainer/hooks';

export const VideoUploader = ({ onUpload, errorMessage }) => {
  const [, setUploadedFile] = useState();
  const [textInputValue, setTextInputValue] = useState('');
  const onUrlUpdatedHook = hooks.onUrlUploaded();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const uploadfile = acceptedFiles[0];
        setUploadedFile(uploadfile);
        onUpload(uploadfile);
      }
    },
  });

  const handleInputChange = (event) => {
    setTextInputValue(event.target.value);
  };

  const handleSaveButtonClick = () => {
    onUrlUpdatedHook(textInputValue);
  };

  if (errorMessage) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center text-center error-message">{errorMessage}</div>
    );
  }

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center p-4 w-100 min-vh-100" {...getRootProps()}>
        <div className={`d-flex flex-column justify-content-center align-items-center gap-2 text-center min-vh-100 w-100
         dropzone-middle ${isDragActive ? 'active' : ''}`}
        >
          <div className="d-flex justify-content-center align-items-center bg-light rounded-circle file-upload">
            <Icon src={FileUpload} className="text-muted" />
          </div>
          <div className="d-flex align-items-center justify-content-center gap-1 flex-wrap flex-column pt-5">
            <span style={{ fontSize: '20px' }}><FormattedMessage {...messages.dropVideoFileHere} /></span>
            <span style={{ fontSize: '12px' }}><FormattedMessage {...messages.info} /></span>
          </div>
          <div className="d-flex align-items-center mt-3">
            <span className="mx-2 text-dark">OR</span>
          </div>
        </div>
        <input {...getInputProps()} data-testid="fileInput" />
      </div>
      <div className="d-flex video-id-container">
        <div className="d-flex video-id-prompt">
          <input
            type="text"
            placeholder="Paste your video ID or URL"
            value={textInputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveButtonClick()}
            onClick={(event) => event.preventDefault()}
          />
          <button className="border-start-0" type="button" onClick={handleSaveButtonClick} data-testid="inputSaveButton">
            <Icon src={ArrowForward} className="rounded-circle text-dark" />
          </button>
        </div>
      </div>
    </div>
  );
};

VideoUploader.propTypes = {
  onUpload: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

const VideoUploadEditor = ({ intl, onClose }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleCancel = () => {
    editorHooks.handleCancel({ onClose });
  };

  const handleDrop = (file) => {
    if (!file) {
      console.log('No file selected.');
      return;
    }

    const extToMime = {
      mp4: 'video/mp4',
      mov: 'video/quicktime',
    };
    const supportedFormats = Object.keys(extToMime);

    function getFileExtension(filename) {
      return filename.slice(Math.abs(filename.lastIndexOf('.') - 1) + 2);
    }

    const ext = getFileExtension(file.name);
    const type = extToMime[ext] || '';
    const newFile = new File([file], file.name, { type });

    if (supportedFormats.includes(ext)) {
      hooks.uploadVideo({ dispatch, supportedFiles: [newFile] });
    } else {
      const errorMsg = 'Video must be an MP4 or MOV file';
      console.log(errorMsg);
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="marked-area">
      <div className="d-flex justify-content-end close-button-container">
        <IconButton
          src={Close}
          iconAs={Icon}
          onClick={handleCancel}
        />
      </div>
      <VideoUploader onUpload={handleDrop} errorMessage={errorMessage} intl={intl} />
    </div>
  );
};

VideoUploadEditor.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default injectIntl(VideoUploadEditor);
