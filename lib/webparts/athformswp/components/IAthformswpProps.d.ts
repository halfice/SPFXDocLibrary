import { SPHttpClient } from '@microsoft/sp-http';
import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
export interface IAthformswpProps {
    description: string;
    LibraryName: string;
    SiteUrl: string;
    spHttpClient: SPHttpClient;
    FolderList: IBreadcrumbItem[];
    BreaCrumArray: IBreadcrumbItem[];
    FolderColumns: IColumn[];
    _items: Array<object>;
    FlagStageForBreadCrum: Number;
    ParentLibraryUrl: string;
    showPanel: boolean;
    CurrentVideoUrl: string;
    VideoHeading: string;
}
