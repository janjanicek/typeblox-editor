// src/App.jsx

import { EVENTS } from "./.core/constants";
import { useEffect, useState } from "react";
import { EditorProvider, useEditor } from "./utils/EditorContext";
// import { toggleStyle } from "./.core/utils/dom";

const MenuBar = () => {
  const { editor } = useEditor();

  // State to track the current styles
  const [activeStyle, setActiveStyle] = useState(editor.getSelectionStyle());

  useEffect(() => {
    if (!editor) return;

    // Handler to update state on style changes
    const handleStyleChange = () => {
      setActiveStyle(editor.getSelectionStyle());
    };
    editor.on(EVENTS.selectionChange, handleStyleChange);
    handleStyleChange();

    return () => {
      editor.off(EVENTS.selectionChange, handleStyleChange);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  // catchStyleChange and update Style.

  return (
    <div className="control-group">
      <div className="flex gap-2 p-5">
        <button
          onClick={() => {
            editor.getCurrentBlock()?.toggleBold();
          }}
          className={`${
            activeStyle.isBold ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          Bold
        </button>
        <button
          onClick={() => {
            editor.getCurrentBlock()?.toggleItalic();
          }}
          className={`${
            activeStyle.isItalic ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          Italic
        </button>
        <button
          onClick={() => {
            editor.getCurrentBlock()?.toggleStrike();
          }}
          className={`${
            activeStyle.isStrikeout ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          Strike
        </button>
        <button
          onClick={() => {
            editor.getCurrentBlock()?.toggleUnderline();
          }}
          className={`${
            activeStyle.isUnderline ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          Underline
        </button>
        <button
          onClick={() => {
            editor.getCurrentBlock()?.toggleType("headline1");
          }}
          className={`${
            activeStyle.isH1 ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          H1
        </button>
        <button
          onClick={() => {
            editor.getCurrentBlock()?.toggleType("headline2");
          }}
          className={`${
            activeStyle.isH2 ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          H2
        </button>
        <button
          onClick={() => editor.getCurrentBlock()?.toggleType("headline3")}
          className={`${
            activeStyle.isH3 ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          H3
        </button>
        <button
          onClick={() => editor.getCurrentBlock()?.toggleType("text")}
          className={`${
            activeStyle.isParagraph ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.getCurrentBlock()?.toggleType("code")}
          className={`${
            activeStyle.isCode ? "bg-blue-500" : "bg-gray-300"
          } ' hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          Code
        </button>
        <button
          onClick={() => editor.handleUndo()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Undo
        </button>
        <button
          onClick={() => editor.handleRedo()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Redo
        </button>
        <button
          onClick={() => editor.format().clearFormat()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

function App() {
  // const sampleContent = `<p><span style="color: #000000; font-family: 'Helvetica Neue'; font-size: 13px; font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align);">You can install and start using Usetiful tours in just 3 steps</span></p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="474"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">A. Add the script to your pages</span></span></p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="476"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">B.&nbsp;<a style="color: #387dff; text-decoration-line: none;" href="https://help.usetiful.com/a/solutions/articles/77000197863" target="_blank" rel="noopener noreferrer">Create and preview a tour (opens in new tab)</a></span></span></p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="479"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">C.&nbsp;<a style="color: #387dff; text-decoration-line: none;" href="https://help.usetiful.com/a/solutions/articles/77000197926" target="_blank" rel="noopener noreferrer">Publish your tour (opens in new tab)</a></span></span></p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="482"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">&nbsp;</span></span><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">&nbsp;</span></span></p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: normal; word-break: normal; overflow-wrap: break-word; padding-top: 4px; font-stretch: normal; font-family: 'Helvetica Neue';" data-identifyelement="523"><span style="color: #000000;">Please note:</span></p>
  // <ul style="padding: 0px 0px 0px 40px; margin: 8px 0px 4px; list-style-position: outside; list-style-image: initial; line-height: 17px;" data-identifyelement="525">
  // <li style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">if you wish to segment your users to target your tours,&nbsp;<a style="color: #387dff; text-decoration-line: none;" href="https://help.usetiful.com/a/solutions/articles/77000487860" target="_blank" rel="noopener noreferrer">follow these instructions</a>.</span></span></li>
  // <li style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">if you wish to personalize messages to your users,&nbsp;<a style="color: #387dff; text-decoration-line: none;" href="https://help.usetiful.com/a/solutions/articles/77000494491" target="_blank" rel="noopener noreferrer">follow these instructions</a>.</span></span></li>
  // <li style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">if you want to leverage the user Id feature for cross-device tour synchronization,&nbsp;<a style="color: #387dff; text-decoration-line: none;" href="https://help.usetiful.com/a/solutions/articles/77000514872" target="_blank" rel="noopener noreferrer">follow these instructions</a>.</span></span></li>
  // </ul>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="482"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">&nbsp;</span></span></p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="484"><span style="color: #000000;"><span style="font-family: 'Helvetica Neue';">Here's a quick video on how to install Usetiful&nbsp;</span></span></p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="486">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="486"><span style="color: #000000;"><span dir="ltr" style="font-family: 'Helvetica Neue';"><span class="fr-video fr-deletable fr-fvc fr-dvb fr-draggable" style="text-align: center; position: relative; display: block; clear: both;"><iframe src="https://www.youtube.com/embed/C4yT3jo1If4?&amp;wmode=opaque" width="640" height="360" frameborder="0" allowfullscreen="allowfullscreen" style="box-sizing: content-box; border-width: initial; border-style: none; max-width: 100%;"></iframe></span><br data-identifyelement="487"></span></span></p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="492">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="495">A. Adding the script to your pages</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="497">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="500">Usetiful works by adding a javascript code to your application that allows to show tour content you build to users. You can find your script on the Overview page after login.<br data-identifyelement="502"><br data-identifyelement="503"></p>
  // <ul style="padding: 0px 0px 0px 40px; margin: 8px 0px 4px; list-style-position: outside; list-style-image: initial; line-height: 17px;" data-identifyelement="504">
  // <li style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;">Click on the "Install to your site" button, and the code will show up.</li>
  // <li style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;">Copy it and paste to the end of all pages where the Usetiful should show the content; immediately before the &lt;/body&gt; element.</li>
  // </ul>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 16px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px; color: #292929; font-family: 'Open Sans';" data-identifyelement="567">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77056061278/original/TgA9c7hvkkxSCVyXK1yAu2ibP1bt_gTXiA.png?1637152199" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fic fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; display: block; float: none; width: auto; height: 380.537px;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77056061278/original/TgA9c7hvkkxSCVyXK1yAu2ibP1bt_gTXiA.png?1637152199" data-id="77056061278" data-attachment="[object Object]" data-identifyelement="511" data-index="0"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="470">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="516">Copy the code in the window and add the code to any page on which you plan to have tours, smart tips or checklists.</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="518">Usetiful tours will not work on a page where the script is not present.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px; min-height: 15px;" data-identifyelement="534">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="537">Once you installed Usetiful, you can start to publish product tours and begin collecting data for their analysis. The only thing you need to do is to embed a bit of javascript to your website. Tools like Google Tag Manager can make it even easier.</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="537">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 1em; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px; color: #292929; font-family: 'Open Sans';" data-identifyelement="472"><strong style="font-weight: bold;">Using Google Tag Manager to install Usetiful</strong></p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="539">Google Tag Manager (GTM) is a free tool that allows you manage and deploy tags (snippets of code or tracking pixels) on your website (or mobile app) without having to modify the code. Using GTM requires to be registered and have their javascript code added on your website. Then you can manage your code online.</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px; min-height: 15px;" data-identifyelement="540">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="542">1. To add the Usetiful code to&nbsp;GTM, login to your GTM account and select the appropriate container for your website.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="543">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="545">2. Open your&nbsp;Tags&nbsp;section from the menu and add a new tag.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="548">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704059/original/AsMtupDx_U-oNxYquMJolExpN8AiqawqbA.png?1636291674" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; display: block; float: none; width: auto; height: 243.551px;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704059/original/AsMtupDx_U-oNxYquMJolExpN8AiqawqbA.png?1636291674" data-attachment="[object Object]" data-id="77054704059" data-identifyelement="549" data-index="1"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="550">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="552">3. Edit tag configuration and choose tag type Custom &gt; Custom HTML.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 16px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px; color: #292929; font-family: 'Open Sans';" data-identifyelement="500">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704072/original/XHXIjx355yqLcAdBagoXgNYJ9habulDz7A.png?1636291704" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; float: none; width: auto; height: 323.06px; display: block;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704072/original/XHXIjx355yqLcAdBagoXgNYJ9habulDz7A.png?1636291704" data-attachment="[object Object]" data-id="77054704072" data-identifyelement="553" data-index="2"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="555">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704093/original/b-ewQzUCFhEGWjp5bO5dTynnUgHm4rjR-A.png?1636291751" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; display: block; float: none; width: auto; height: 337.225px;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704093/original/b-ewQzUCFhEGWjp5bO5dTynnUgHm4rjR-A.png?1636291751" data-attachment="[object Object]" data-id="77054704093" data-identifyelement="556" data-index="3"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="508">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="559">4. Paste your code to the HTML text area. It should look similar to the picture below:</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="562">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704110/original/WUkFdT8Om5Gu6bHJHwCPjiCFB0NT4EDhyA.png?1636291802" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; display: block; float: none; width: auto; height: 319.861px;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704110/original/WUkFdT8Om5Gu6bHJHwCPjiCFB0NT4EDhyA.png?1636291802" data-attachment="[object Object]" data-id="77054704110" data-identifyelement="563" data-index="4"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="521">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="567">5. Now, we need to ensure that the script is called once all the elements on your site are loaded. Therefore click on the Triggering section and add a new trigger of type DOM ready. If you want to trigger the script just on specific sites or pages, select the option This trigger fires on &gt; Some DOM Ready Events and specify the configuration.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="568">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704264/original/7WsA2u3i6jsfv2zwJfIiyjonQp2E2VjcSw.png?1636292165" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; display: block; float: none; width: auto; height: 356.874px;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704264/original/7WsA2u3i6jsfv2zwJfIiyjonQp2E2VjcSw.png?1636292165" data-attachment="[object Object]" data-id="77054704264" data-identifyelement="569" data-index="5"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="571">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704277/original/8JsGg2c0d71YlgmaT023ey44IlduPaoJwg.png?1636292204" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; display: block; float: none; width: auto; height: 277.822px;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704277/original/8JsGg2c0d71YlgmaT023ey44IlduPaoJwg.png?1636292204" data-attachment="[object Object]" data-id="77054704277" data-identifyelement="572" data-index="6"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 16px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px; color: #292929; font-family: 'Open Sans';" data-identifyelement="539">&nbsp;</p>
  // <div class="image-container " style="line-height: 18px; margin: 0px; word-break: normal; overflow-wrap: break-word;"><a class="image-enlarge-link" style="color: #387dff; text-decoration-line: none;" href="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704286/original/gCmDTkeCoUSIiuaOKWrGJFHAqWrXr_YsdQ.png?1636292229" target="_blank" rel="noopener" aria-describedby=""><img class="fr-fil fr-dib lightbox-image" style="max-width: 100%; vertical-align: top; border: 0px; margin: 5px auto; display: block; float: none; width: auto; height: 244.57px;" src="https://s3-eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77054704286/original/gCmDTkeCoUSIiuaOKWrGJFHAqWrXr_YsdQ.png?1636292229" data-attachment="[object Object]" data-id="77054704286" data-identifyelement="574" data-index="7"></a></div>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; line-height: 18px; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="544">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="577">6.&nbsp;Save&nbsp;the new trigger.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="578">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="580">7. Select the new trigger, so it shows up below the box with Usetiful code.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="581">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="583">8.&nbsp;Save&nbsp;the created tag.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="584">&nbsp;</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="586">9. Publish this change clicking on the&nbsp;Submit&nbsp;button. After a few seconds should be code embedded to your website.</p>
  // <p style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="587">&nbsp;</p>
  // <p dir="ltr" style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-stretch: normal; line-height: normal; font-family: 'Helvetica Neue'; word-break: normal; overflow-wrap: break-word; padding-top: 4px;" data-identifyelement="589"><strong style="font-weight: bold;">Please note: Google Tag Manager is being filtered out by some Ad Block plugins. This is, unfortunately, outside of control of Usetiful.</strong></p>`;

  const sampleContent = "<p>aaa</p>";

  const onChangeHandler = (updatedHTMLString: string) => {
    sessionStorage.setItem("tempEditorContent", updatedHTMLString);
  };

  return (
    <>
      <div>
        <EditorProvider
          slotBefore={<MenuBar />}
          content={sessionStorage.getItem("tempEditorContent") ?? sampleContent}
          onChange={onChangeHandler}
        ></EditorProvider>
      </div>
    </>
  );
}

export default App;
