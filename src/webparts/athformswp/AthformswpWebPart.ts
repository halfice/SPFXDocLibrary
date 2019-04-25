import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AthformswpWebPartStrings';
import Athformswp from './components/Athformswp';
import { IAthformswpProps } from './components/IAthformswpProps';
require('./panelclassoverrides.scss');

import * as React from 'react';



export interface IAthformswpWebPartProps {
  description: string;
  ListNames: string;
  targetsite: string;

}

export default class AthformswpWebPart extends BaseClientSideWebPart<IAthformswpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAthformswpProps> = React.createElement(
      Athformswp,
      {
        description: this.properties.description,
        SiteUrl: this.properties.targetsite,
        spHttpClient: this.context.spHttpClient,
        LibraryName: this.properties.ListNames,

      }
    );
    this.context.statusRenderer.displayLoadingIndicator(this.domElement,this.properties.ListNames);
    ReactDom.render(element, this.domElement);
    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Library Name', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListNames', {
                  label: "ListName"
                }

                ),
                
              ],
             
               
              
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('targetsite', {
                  label: "targetsite"
                }

                ),
                
              ],
             
               
              
            },
          ]
        }
      ]
    };
  }
}
