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
var ReactDom = require("react-dom");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = require("AthformswpWebPartStrings");
var Athformswp_1 = require("./components/Athformswp");
require('./panelclassoverrides.scss');
var React = require("react");
var AthformswpWebPart = (function (_super) {
    __extends(AthformswpWebPart, _super);
    function AthformswpWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AthformswpWebPart.prototype.render = function () {
        var element = React.createElement(Athformswp_1.default, {
            description: this.properties.description,
            SiteUrl: this.properties.targetsite,
            spHttpClient: this.context.spHttpClient,
            LibraryName: this.properties.ListNames,
        });
        this.context.statusRenderer.displayLoadingIndicator(this.domElement, this.properties.ListNames);
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(AthformswpWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AthformswpWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('Library Name', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        },
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('ListNames', {
                                    label: "ListName"
                                }),
                            ],
                        },
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('targetsite', {
                                    label: "targetsite"
                                }),
                            ],
                        },
                    ]
                }
            ]
        };
    };
    return AthformswpWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = AthformswpWebPart;

//# sourceMappingURL=AthformswpWebPart.js.map
