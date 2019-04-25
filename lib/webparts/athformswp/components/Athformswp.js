"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Athformswp_module_scss_1 = require("./Athformswp.module.scss");
var sp_pnp_js_1 = require("sp-pnp-js");
var Breadcrumb_1 = require("office-ui-fabric-react/lib/Breadcrumb");
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Symbol = require('es6-symbol/polyfill');
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
require("video-react/dist/video-react.css"); // import css
var video_react_1 = require("video-react");
var Athformswp = (function (_super) {
    __extends(Athformswp, _super);
    function Athformswp(props, context) {
        var _this = _super.call(this, props) || this;
        _this._onBreadcrumbItemClicked = function (ev, item) {
            ev.preventDefault();
            var BreadCrumsitems = [];
            BreadCrumsitems = _this.state.FolderList;
            var CompleteItemArray = BreadCrumsitems;
            CompleteItemArray = CompleteItemArray.filter(function (CompleteItemArray) {
                return CompleteItemArray["key"] == item.key;
            });
            _this.gettheFoldersWithFiles(CompleteItemArray[0]["key"]);
            var temBCarray = [];
            temBCarray = BreadCrumsitems;
            var finalBcarray = [];
            for (var x = 0; x < temBCarray.length; x++) {
                var NewData11 = {
                    text: temBCarray[x]["text"],
                    key: temBCarray[x]["key"],
                    onClick: _this._onBreadcrumbItemClicked
                };
                finalBcarray.push(NewData11);
                if (temBCarray[x].key == CompleteItemArray[0]["key"])
                    break;
            }
            if (finalBcarray.length == 0) {
                var NewData1 = {
                    text: _this.props.LibraryName,
                    key: _this.state.ParentLibraryUrl,
                    onClick: _this._onBreadcrumbItemClicked
                };
                finalBcarray.push(NewData1);
            }
            _this.setState({
                FolderList: finalBcarray,
            });
        };
        _this._onColumnClick = function (ev, column) {
            var _a = _this.state, FolderColumns = _a.FolderColumns, _items = _a._items;
            var newColumns = FolderColumns.slice();
            var currColumn = newColumns.filter(function (currCol) { return column.key === currCol.key; })[0];
            newColumns.forEach(function (newCol) {
                if (newCol === currColumn) {
                    currColumn.isSortedDescending = !currColumn.isSortedDescending;
                    currColumn.isSorted = true;
                }
                else {
                    newCol.isSorted = false;
                    newCol.isSortedDescending = true;
                }
            });
            var newItems = _this._copyAndSort(_items, currColumn.fieldName, currColumn.isSortedDescending);
            _this.setState({
                FolderColumns: newColumns,
                _items: newItems
            });
        };
        /* List View Work End */
        //panel
        _this._showPanel = function (name, url) {
            _this.setState({
                VideoHeading: name,
                CurrentVideoUrl: url,
                showPanel: true
            });
        };
        _this._hidePanel = function () {
            _this.setState({ showPanel: false });
        };
        _this.state = {
            spHttpClient: _this.props.spHttpClient,
            description: "",
            SiteUrl: _this.props.SiteUrl,
            FolderList: [],
            LibraryName: _this.props.LibraryName,
            BreaCrumArray: [],
            FolderColumns: [],
            _items: [],
            FlagStageForBreadCrum: 0,
            ParentLibraryUrl: _this.props.LibraryName,
            showPanel: false,
            CurrentVideoUrl: "",
            VideoHeading: "",
        };
        _this.gettheFolders = _this.gettheFolders.bind(_this);
        _this._onItemInvoked = _this._onItemInvoked.bind(_this);
        return _this;
    }
    ;
    Athformswp.prototype.getfoldericonurl = function () {
        return "https://spoprod-a.akamaihd.net/files/odsp-next-prod_2019-04-12-sts_20190412.001/odsp-media/images/itemtypes/20/folder.svg";
    };
    Athformswp.prototype.getfoldericonurlDoc = function () {
        return "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/39-512.png";
    };
    Athformswp.prototype.gettheFolders = function (folderurl) {
        var _this = this;
        var NewISiteUrl = this.props.SiteUrl;
        var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
        var webx = new sp_pnp_js_1.Web(NewSiteUrl);
        var CheckCurrentNumberNavigation = this.state.FlagStageForBreadCrum;
        var Arraysx = [];
        var Arraysx1 = [];
        var counterlist = 1;
        webx.getFolderByServerRelativeUrl(folderurl)
            .expand("Folders, Files").get().then(function (r) {
            r.Folders.forEach(function (item) {
                var FinalName = "234" + counterlist;
                var NewData = {
                    key: counterlist,
                    name: FinalName,
                    "Name": item.Name,
                    index: 1,
                    id: counterlist,
                    iconName: _this.getfoldericonurl(),
                    serverurls: item.ServerRelativeUrl,
                };
                if (item.Name != "Forms") {
                    Arraysx1.push(NewData);
                    counterlist++;
                }
            }); //get folders only
            var NewData1 = {
                text: _this.props.LibraryName,
                key: _this.state.ParentLibraryUrl,
                onClick: _this._onBreadcrumbItemClicked
            };
            Arraysx.push(NewData1);
            //now getting files
            var FinalName1 = "234item" + counterlist;
            r.Files.forEach(function (item) {
                var NewData = {
                    key: counterlist,
                    name: FinalName1,
                    "Name": item.Name,
                    index: 1,
                    id: counterlist,
                    iconName: _this.getfoldericonurlDoc(),
                    serverurls: item.ServerRelativeUrl,
                };
                Arraysx1.push(NewData);
                counterlist++;
            });
            var newItems = _this._copyAndSort(Arraysx1, "Name", false);
            _this.setState({
                _items: newItems
            });
            _this.setState({
                FolderList: Arraysx,
                _items: newItems,
            });
        });
    };
    Athformswp.prototype.gettheFoldersWithFiles = function (folderurl) {
        var _this = this;
        var NewISiteUrl = this.props.SiteUrl;
        var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
        var webx = new sp_pnp_js_1.Web(NewSiteUrl);
        var CheckCurrentNumberNavigation = this.state.FlagStageForBreadCrum;
        var Arraysx = [];
        var Arraysx1 = [];
        var counterlist = 1;
        webx.getFolderByServerRelativeUrl(folderurl)
            .expand("Folders, Files").get().then(function (r) {
            r.Folders.forEach(function (item) {
                var FinalName = "234" + counterlist;
                var NewData = {
                    key: counterlist,
                    name: FinalName,
                    "Name": item.Name,
                    index: 1,
                    id: counterlist,
                    iconName: _this.getfoldericonurl(),
                    serverurls: item.ServerRelativeUrl,
                };
                if (item.Name != "Forms") {
                    Arraysx1.push(NewData);
                    counterlist++;
                }
            }); //get folders only     
            //now getting files
            var FinalName1 = "234item" + counterlist;
            r.Files.forEach(function (item) {
                var NewData = {
                    key: counterlist,
                    name: FinalName1,
                    "Name": item.Name,
                    index: 1,
                    id: counterlist,
                    iconName: _this.getfoldericonurlDoc(),
                    serverurls: item.ServerRelativeUrl,
                };
                Arraysx1.push(NewData);
                counterlist++;
            });
            var newItems = _this._copyAndSort(Arraysx1, "Name", false);
            _this.setState({
                _items: newItems
            });
            _this.setState({
                _items: newItems,
            });
        });
    };
    Athformswp.prototype.gettheFoldersInner = function (event) {
        var NewISiteUrl = this.props.SiteUrl; //"https://arabtec.sharepoint.com/sites/ATH";// this.props.SiteUrl;
        var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
        var webx = new sp_pnp_js_1.Web(NewSiteUrl);
        var CheckCurrentNumberNavigation = this.state.FlagStageForBreadCrum;
        var Arraysx = [];
        var Arraysx1 = [];
        var counterlist = 1;
        var folderurl = event.target.id;
        webx.getFolderByServerRelativeUrl(folderurl)
            .expand("Folders, Files").get().then(function (r) {
            r.Files.forEach(function (item) {
                console.log(item.ServerRelativeUrl);
            });
        });
    };
    Athformswp.prototype.componentDidMount = function () {
        if (this.props.SiteUrl != null && this.props.SiteUrl != undefined) {
            this.fillmonitorcolumns();
            this.gettheFolders(this.props.LibraryName);
        }
    };
    Athformswp.prototype.downloadDocument = function (url) {
        var link = document.createElement("a");
        link.download = name;
        link.href = url;
        link.click();
    };
    Athformswp.prototype._copyAndSort = function (items, columnKey, isSortedDescending) {
        var key = columnKey;
        return items.slice(0).sort(function (a, b) { return ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1); });
    };
    Athformswp.prototype._onItemInvoked = function (item) {
        var BreadCrumsitems = [];
        BreadCrumsitems = this.state.FolderList;
        var CompleteItemArray = this.state._items;
        CompleteItemArray = CompleteItemArray.filter(function (CompleteItemArray) {
            return CompleteItemArray["Name"] == item.Name;
        });
        if (CompleteItemArray[0]["Name"].indexOf(".mp4") > -1) {
            this._showPanel(CompleteItemArray[0]["Name"], CompleteItemArray[0]["serverurls"]);
            return;
        }
        if (CompleteItemArray[0]["Name"].indexOf(".pptx") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".pdf") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".docx") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".psd") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".txt") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".ttf") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".ppt") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".jpg") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".otf") > -1 ||
            CompleteItemArray[0]["Name"].indexOf(".doc") > -1) {
            this.downloadDocument(CompleteItemArray[0]["Name"]);
        }
        else {
            this.gettheFoldersWithFiles(CompleteItemArray[0]["serverurls"]);
            //serverurls
            var NewData1 = {
                text: CompleteItemArray[0]["Name"],
                key: CompleteItemArray[0]["serverurls"],
                onClick: this._onBreadcrumbItemClicked
            };
            BreadCrumsitems.push(NewData1);
            this.setState({
                FolderList: BreadCrumsitems,
            });
        }
    };
    /* List View Work  Start */
    Athformswp.prototype.fillmonitorcolumns = function () {
        var Tempcolumns = [];
        var counter = 1;
        var newData = {
            key: ".",
            name: ".",
            iconName: 'Page',
            isIconOnly: true,
            fieldName: "iconName",
            minWidth: 20,
            maxWidth: 60,
            isResizable: true,
            onColumnClick: this._onColumnClick,
        };
        Tempcolumns.push(newData);
        var newData2 = {
            key: "Name",
            name: "Name",
            fieldName: "Name",
            minWidth: 20,
            maxWidth: 300,
            isResizable: true,
            onColumnClick: this._onColumnClick,
        };
        Tempcolumns.push(newData2);
        counter++;
        this.setState({
            FolderColumns: Tempcolumns,
        });
    };
    //panel end
    Athformswp.prototype.render = function () {
        /*List work Inside Render */
        function _renderItemColumnMonitor(item, index, column) {
        }
        /* List Work Inside Render End */
        return (React.createElement("div", { className: Athformswp_module_scss_1.default.MyDvWholeClassName },
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(Panel_1.Panel, { isOpen: this.state.showPanel, type: Panel_1.PanelType.smallFluid, onDismiss: this._hidePanel, headerText: this.state.VideoHeading },
                        React.createElement("span", null,
                            React.createElement("div", { className: Athformswp_module_scss_1.default.foldersdivpadding },
                                React.createElement(office_ui_fabric_react_1.PrimaryButton, { onClick: this._hidePanel.bind(this) }, "Close")),
                            React.createElement(video_react_1.Player, { playsInline: true, poster: "/assets/poster.png", src: this.state.CurrentVideoUrl }))))),
            React.createElement("div", { className: "panelclassoverrides" },
                React.createElement(Breadcrumb_1.Breadcrumb, { items: this.state.FolderList, ariaLabel: 'Breadcrumb with no maxDisplayedItems' }),
                React.createElement(DetailsList_1.DetailsList, { items: this.state._items, columns: this.state.FolderColumns, setKey: "set", layoutMode: DetailsList_1.DetailsListLayoutMode.fixedColumns, selectionPreservedOnEmptyClick: true, ariaLabelForSelectionColumn: "Toggle selection", ariaLabelForSelectAllCheckbox: "Toggle selection for all items", onItemInvoked: this._onItemInvoked, onRenderItemColumn: _renderItemColumn })))); // return end
        function _renderItemColumn(item, index, column) {
            var fieldContent = item[column.fieldName || ''];
            var tempname = column.fieldName;
            var CheckIsIemorNot = "";
            switch (column.key) {
                case '.':
                    if (item.name.indexOf("item") > -1) {
                        if (item.serverurls.indexOf(".pdf") > -1) {
                            return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/pdf.png", width: "35px", height: "40px" }));
                        }
                        if (item.serverurls.indexOf(".doc") > -1 || item.serverurls.indexOf(".docx") > -1) {
                            return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/dox.png", width: "40px", height: "40px" }));
                        }
                        if (item.serverurls.indexOf(".pptx") > -1) {
                            return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/pptx.png", width: "40px", height: "40px" }));
                        }
                        if (item.serverurls.indexOf(".mp4") > -1) {
                            return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/mp4.png", width: "40px", height: "40px" }));
                        }
                        if (item.serverurls.indexOf(".otf") > -1 || item.serverurls.indexOf(".ttf") > -1) {
                            return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/fonts.png", width: "40px", height: "40px" }));
                        }
                        if (item.serverurls.indexOf(".xlsx") > -1 || item.serverurls.indexOf(".xls") > -1) {
                            return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/excel.png", width: "40px", height: "40px" }));
                        }
                        return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/fonts.png", width: "40px", height: "40px" }));
                    }
                    else {
                        return (React.createElement("img", { src: "https://arabtec.sharepoint.com/sites/ATH/SiteAssets/folder.png", width: "40px", height: "60px" }));
                    }
                case 'Name':
                    if (item.name.indexOf("item") > -1) {
                        return (item.Name);
                    }
                    else {
                        return (item.Name);
                    }
            }
        }
    };
    return Athformswp;
}(React.Component));
exports.default = Athformswp;

//# sourceMappingURL=Athformswp.js.map
