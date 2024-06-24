import { StrictDict } from '../../utils';
import { buttons, plugins } from '../../data/constants/tinyMCE';

const mapToolbars = toolbars => toolbars.map(toolbar => toolbar.join(' ')).join(' | ');

const pluginConfig = ({ isLibrary, placeholder, editorType }) => {
  const image = isLibrary ? '' : plugins.image;
  const imageTools = isLibrary ? '' : plugins.imagetools;
  const imageUploadButton = isLibrary ? '' : buttons.imageUploadButton;
  const editImageSettings = isLibrary ? '' : buttons.editImageSettings;
  const codePlugin = editorType === 'text' ? plugins.code : '';
  const codeButton = editorType === 'text' ? buttons.code : '';
  const labelButton = editorType === 'question' ? buttons.customLabelButton : '';
  const quickToolbar = editorType === 'expandable' ? plugins.quickbars : '';
  const inline = editorType === 'expandable';
  const toolbar = editorType !== 'expandable';
  const defaultFormat = (editorType === 'question' || editorType === 'expandable') ? 'div' : 'p';

  return (
    StrictDict({
      plugins: [
        plugins.link,
        plugins.lists,
        plugins.codesample,
        plugins.emoticons,
        plugins.table,
        plugins.hr,
        plugins.charmap,
        codePlugin,
        plugins.autoresize,
        image,
        imageTools,
        quickToolbar,
        plugins.a11ychecker,
        plugins.powerpaste,
        plugins.embediframe,
        plugins.media
      ].join(' '),
      menubar: false,
      toolbar: toolbar ? mapToolbars([
        [buttons.undo, buttons.redo],
        [buttons.formatSelect],
        [buttons.fontselect],
        [buttons.fontsizeselect],
        [labelButton],
        [buttons.bold, buttons.italic, buttons.underline, buttons.strikethrough, buttons.foreColor, buttons.backColor],
        [
          buttons.align.left,
          buttons.align.center,
          buttons.align.right,
          buttons.align.justify,
        ],
        [
          buttons.bullist,
          buttons.numlist,
          buttons.outdent,
          buttons.indent,
        ],
        [buttons.image, buttons.media, buttons.link, buttons.unlink, buttons.blockQuote, buttons.codeBlock],
        [buttons.table, buttons.emoticons, buttons.charmap, buttons.wirisMathType, buttons.wirisChemType, buttons.hr],
        [buttons.removeFormat, codeButton, buttons.a11ycheck, buttons.embediframe],
      ]) : false,
      // imageToolbar: mapToolbars([
      //   // [buttons.rotate.left, buttons.rotate.right],
      //   // [buttons.flip.horiz, buttons.flip.vert],
      //   [editImageSettings],
      // ]),
      imageToolbar: false,
      quickbarsInsertToolbar: toolbar ? false : mapToolbars([
        [buttons.undo, buttons.redo],
        [buttons.formatSelect],
        [buttons.fontselect],
        [buttons.fontsizeselect],
        [buttons.bold, buttons.italic, buttons.underline, buttons.foreColor],
        [
          buttons.align.justify,
          buttons.bullist,
          buttons.numlist,
        ],
        [buttons.image, buttons.media, buttons.blockQuote, buttons.codeBlock],
        [buttons.table, buttons.emoticons, buttons.charmap, buttons.wirisMathType, buttons.wirisChemType, buttons.removeFormat, buttons.a11ycheck],
      ]),
      quickbarsSelectionToolbar: toolbar ? false : mapToolbars([
        [buttons.undo, buttons.redo],
        [buttons.formatSelect],
        [buttons.fontselect],
        [buttons.fontsizeselect],
        [buttons.bold, buttons.italic, buttons.underline, buttons.foreColor],
        [
          buttons.align.justify,
          buttons.bullist,
          buttons.numlist,
        ],
        [buttons.image, buttons.media, buttons.blockQuote, buttons.codeBlock],
        [buttons.table, buttons.emoticons, buttons.charmap, buttons.wirisMathType, buttons.wirisChemType, buttons.removeFormat, buttons.a11ycheck],
      ]),
      config: {
        branding: false,
        height: '100%',
        menubar: false,
        toolbar_mode: 'sliding',
        toolbar_sticky: true,
        toolbar_sticky_offset: 76,
        relative_urls: true,
        convert_urls: false,
        placeholder,
        inline,
        block_formats: 'Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6;Div=div;Paragraph=p;Preformatted=pre',
        forced_root_block: defaultFormat,
        powerpaste_allow_local_images: true,
        powerpaste_word_import: 'prompt',
        powerpaste_html_import: 'prompt',
        powerpaste_googledoc_import: 'prompt',
        external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
        draggable_modal: true,
      },
      audio_template_callback: function(data) {
        return `<audio controls="controls"><source src="${data.source}" /></audio>`;
      },
      video_template_callback: function(data) {
        reject({msg: 'Vui lòng sử dụng thành phần Video. Please use Video component instead.'});
        return "";
      },
      file_browser_callback_types: false
    })
  );
};

export default pluginConfig;
