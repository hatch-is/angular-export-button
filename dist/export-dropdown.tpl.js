(function(window, document, undefined) {

    angular.module('ngExportButton.directive').run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('templates/fileName-modal.tpl.html', '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title">Please select the file name</h4></div><div class="modal-body">Please insert your file name without extension:<br><small>(or left blank to use default file name)</small><br><br><input type="text" class="form-control" placeholder="filename" data-ng-model="fileName"></div><div class="modal-footer"><button type="button" class="btn btn-success" ng-csv="getSCVArray()" csv-header="CSVheaders" filename="{{ fileName }}.csv" >Download CSV</button><button type="button" class="btn btn-success" data-ng-click="downloadPDF(fileName)" >Download PDF</button><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>');
            $templateCache.put('templates/export-button.tpl.html', '<button type="button" class="btn btn-xs btn-success" data-animation="am-flip-x" data-template="templates/export-dropdown.tpl.html"  bs-dropdown>Export</button>');
            $templateCache.put('templates/export-dropdown.tpl.html', '<ul tabindex="-1" class="dropdown-menu" role="menu"><li><a href="#" onclick="event.preventDefault();" data-ng-click="showModal()">DOWNLOAD</a></li><li class="divider"></li><li><a href="#" onclick="event.preventDefault();" data-ng-click="printPDF()" >Print</a> </li></ul>');
        }
    ]);

})(window, document);
