import * as React from "react";
import { DefaultButton, 
  Dropdown, 
  TextField, 
  IDropdownStyles, 
  DropdownMenuItemType, 
  ChoiceGroup,
  IChoiceGroupOption, 
  IDropdownOption, 
  Checkbox,
  DatePicker, 
  TimePicker } from "@fluentui/react";


  // export interface HAEmailProps {
  //   subject: string;
  //   isOfficeInitialized: boolean;
  // }


const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const DropDownClassificationOptions = [
  { key: 'apple', text: 'Clinical' },
  { key: 'banana', text: 'Test' },
  { key: 'grape', text: 'Calc' },

];


const DropDownCountryOptions = [
  { key: 'US', text: 'US'},
  { key: 'UK', text: 'United Kingdom' },
  { key: 'CN', text: 'China' },

];

const ChoiceGroupHealtAuthorityOptions: IChoiceGroupOption[] = [
  { key: 'To', text: 'To Health Authority' },
  { key: 'From', text: 'From Health Authority' },
];

const DropDownAgencyOptions: IChoiceGroupOption[] = [
  { key: 'To', text: 'FDA' },
  { key: 'From', text: 'CDC' },
];



function onClassificationChange(ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void {
  console.dir(option, ev);
}

function onHealthAuthorityChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option, ev);
}



export default class HAEmail extends React.Component {

  render() {
    // const { children, items, message } = this.props;
    //const { message  } = this.props;
    const  message  = Office.context.mailbox.item;

    return (
      <div>

        <TextField 
          placeholder="Please choose a file"
          id="file"
          iconProps={ { iconName: 'Folder'  } }
          disabled= { true }
          value={ message.subject }
        />

        <Checkbox 
            id="uploadSeparately"
            label="Upload Attachments Separately"
            disabled = {  message.attachments != undefined 
              &&  message.attachments != null 
              && message.attachments.length == 0 }
        />

        <Checkbox 
            id="uploadMessageAlso"
            label="Upload Message Also"
        />
          
        <TextField 
          label="Message To"
          id="messageTo"
          disabled= { true }
          value={ message.to[0].emailAddress }
        />

        <TextField 
          label="Message From"
          id="messageFrom"
          disabled= { true }
          value={ message.sender.emailAddress }
        />

        <Dropdown
              placeholder="Select classification"
              label="Classification"
              //selectedKeys={selectedKeys}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={ onClassificationChange }
              multiSelect
              options={DropDownClassificationOptions}
              styles={dropdownStyles}
              required={true}
        />

        <DatePicker
          label="Contact Date"
          id="contactDate"
          //formatDate={ 'YYYY-MM-DD HH:'  }
          isRequired= { true }
          value={ message.dateTimeCreated }
        />

        <TimePicker 
          label="Contact Time"
          id="contactTime"
          allowFreeform={ true }
          defaultValue={ message.dateTimeCreated}
        />
  
        <ChoiceGroup defaultSelectedKey="B" 
            options={ChoiceGroupHealtAuthorityOptions} 
            onChange={ onHealthAuthorityChange } 
            label="To or From" required={true} />

        <ChoiceGroup
            id="country"
            options={DropDownCountryOptions} 
            onChange={ onHealthAuthorityChange } 
            label="Country" 
            required={true}

        />



        <ChoiceGroup
            id="agency"
            options={ DropDownAgencyOptions } 
            onChange={ onHealthAuthorityChange } 
            label="Agency (Used in doc name)" 
            />

        <TextField 
          placeholder="Veeva Doc Name"
          id="file"
          iconProps={ { iconName: 'Folder'  } }
          required={ true }
          disabled= { true }
        />
      </div>
    );
  }
}
