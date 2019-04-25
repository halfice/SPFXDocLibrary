/// <reference types="react" />
import * as React from 'react';
import { IAthformswpProps } from './IAthformswpProps';
import "video-react/dist/video-react.css";
export default class Athformswp extends React.Component<IAthformswpProps, {}> {
    state: IAthformswpProps;
    constructor(props: any, context: any);
    getfoldericonurl(): string;
    getfoldericonurlDoc(): string;
    gettheFolders(folderurl: any): void;
    gettheFoldersWithFiles(folderurl: any): void;
    gettheFoldersInner(event: any): void;
    componentDidMount(): void;
    private _onBreadcrumbItemClicked;
    private downloadDocument(filenames, url);
    private _onColumnClick;
    private _copyAndSort<T>(items, columnKey, isSortedDescending?);
    private _onItemInvoked(item);
    fillmonitorcolumns(): void;
    private _showPanel;
    private _hidePanel;
    render(): React.ReactElement<IAthformswpProps>;
}
