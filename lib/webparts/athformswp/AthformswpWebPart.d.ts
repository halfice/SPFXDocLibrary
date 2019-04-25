import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IAthformswpWebPartProps {
    description: string;
    ListNames: string;
    targetsite: string;
}
export default class AthformswpWebPart extends BaseClientSideWebPart<IAthformswpWebPartProps> {
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
